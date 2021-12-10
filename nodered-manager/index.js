const express = require('express');
const cors = require('cors');
var jwt = require('express-jwt');
var fs = require('fs');

require('dotenv').config();

const app = express();
const port = 3000;
const cleanUpInterval = 20 * 1000; 

app.use(cors());
var publicKey = fs.readFileSync(process.env.PATH_TO_PUBLIC_KEY);
app.use(jwt({   secret: publicKey, 
                audience: process.env.AUTH0_AUDIENCE,
                issuer: process.env.AUTH0_ISSUER,
                algorithms: ['RS256'], 
                requestProperty: 'auth' }));

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('invalid token');
    }
});
                  

const exec = require('child_process').exec;

var currPort = 1880;

var users = [];

exec('./cleanup.sh', (err, stdout, stderr) => {
    if (!err) {
        console.log('Stopped every running container');
    } else {
        console.log('No containers were running');
    }
});

app.get('/api/nodered', (req, res) => {
    console.log(req.auth);
    const userId = req.auth.sub.split('|')[1];
    const index = users.findIndex(el => el.userId === userId)
    if(index >= 0) {
        const user = users[index];
        user.active = true;
        res.status(200).send({port: user.port});
        return;
    }
    currPort++;
    exec(`./create.sh -u ${userId} -p ${currPort}`, (err, stdout, stderr) => {
        if(!err) {
            users.push({userId, active: true, port: currPort});
            res.status(200).send({url: `http://localhost:${currPort}`});
        } else {
            res.status(500).send();
        }
    });
});

const stopInstance = (userId) => {
    exec(`./stop.sh ${userId}`, (err, stdout, stderr) => {
        if(!err) {
            console.log('Stopped: ',stdout);
        } else {
            console.error(stderr);
        }
    });
}

setInterval(() => {
    const usersCopy = users.slice();

    users.forEach(({userId, active}) => {
        if (!active) {
            const index = usersCopy.findIndex(el => el.userId === userId);
            if (index >= 0) {
                usersCopy.splice(index, 1);
            }
            stopInstance(userId);
        } else {
            const index = usersCopy.findIndex(el => el.userId === userId);
            if (index >= 0) {
                usersCopy[index].active = false;
            }

        }
    });
    users = usersCopy;

}, cleanUpInterval)



app.listen(port, () => {
  console.log(`Node-red Manager listening at http://localhost:${port}`)
})
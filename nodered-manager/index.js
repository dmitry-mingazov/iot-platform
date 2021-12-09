const express = require('express');
const app = express();
const port = 3000;
const cleanUpInterval = 20 * 1000; 

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

app.get('/api/nodered/:userId', (req, res) => {
    // console.log(req.params.userId);
    const userId = req.params.userId;
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
import React from "react";
import { Menu, MenuItem } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Typography, CardActionArea, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import { useNavigate } from "react-router-dom";
import DeviceService from "../services/DeviceService";
import DeviceInfoDialog from "./DeviceInfoDialog";

const useStyles = makeStyles({
  circle: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    width: "72px",
    height: "72px",
    backgroundColor: "#8f0000",
    borderRadius: "50%",
    marginTop: "30px",
    marginBottom: "5px",
  },
});

function Device(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openInformation, setOpenInformation] = React.useState(false);
  const [deviceInfo, setDeviceInfo] = React.useState(undefined);

  const openInfo = () => {
    DeviceService.getDevice(props._id).then((dv) => {
      setOpenInformation(true);
      setDeviceInfo(dv);
    });
  };

  const exportToNodered = () => {
    console.log('Export to node not implemented');
  }

  const menuItems = [
    {
      title: "View information",
      fn: openInfo,
    },
    {
      title: "Export to Node-Red",
      fn: exportToNodered,
    }
  ];

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Card elevation={4} sx={{ maxWidth: 260 }}>
        <CardActionArea
          onClick={(e) => {
            handleClick(e);
          }}
        >
          <div className={classes.circle}>
            <EmojiObjectsIcon
              fontSize="large"
              style={{ color: "white" }}
            ></EmojiObjectsIcon>
          </div>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.deviceName}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{ vertical: "center", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MenuItem disabled key={props.deviceName} value={props.deviceName}>
          {props.deviceName}
        </MenuItem>
        <Divider></Divider>
        {menuItems.map((item) => (
          <MenuItem
            onClick={() => {
              item.fn();
            }}
            key={item.title}
            value={item.title}
          >
            {item.title}
          </MenuItem>
        ))}
      </Menu>
      <DeviceInfoDialog
        openInformation={openInformation}
        deviceInfo={deviceInfo}
        handleClose={() => {
          setOpenInformation(false);
        }}
      />
    </div>
  );
}

export default Device;

import React from "react";
import {
  Paper,
  Grow,
  Popper,
  ClickAwayListener,
  MenuList,
  MenuItem,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Typography, CardActionArea, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import { useNavigate } from "react-router-dom";
import DeviceService from "../services/DeviceService";
import DeviceInfoDialog from "./DeviceInfoDialog";
import Checkbox from "@mui/material/Checkbox";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

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

function DeviceCard(props) {
  const classes = useStyles();
  const [openInformation, setOpenInformation] = React.useState(false);
  const [deviceInfo, setDeviceInfo] = React.useState(undefined);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const prevOpen = React.useRef(open);

  //Popper menu management
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  //Popper menu management
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  //Popper menu management
  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  //Popper menu management
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const openInfo = () => {
    DeviceService.getDevice(props._id).then((dv) => {
      setOpenInformation(true);
      setDeviceInfo(dv);
    });
  };

  const menuItems = [
    {
      title: "View information",
      fn: openInfo,
    },
    {
      title: "Export to Node-Red",
      fn: props.exportToNodered,
    },
    {
      title: "Export to JSON",
      fn: props.exportToJSON
    },
    {
      title: "Export to TTL",
      fn: props.exportToTTL
    }
  ];

  return (
    <div>
      <Card elevation={4} sx={{ maxWidth: 260 }}>
        <CardActionArea
          ref={anchorRef}
          onClick={props.exportSelectMode ? props.exportSelectedOnChange : handleToggle}
        >
          {props.exportSelectMode ? (
            <Checkbox
              disableRipple
              checked={props.exportSelected}
              style={{
                position: "absolute",
                left: "78%",
                right: 0,
                height: "28%",
                transform: "scale(1.2)",
              }}
              icon={<RadioButtonUncheckedIcon />}
              checkedIcon={<CheckCircleIcon />}
            />
          ) : null}
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
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom"
        transition
        modifiers={[{ name: "offset", options: { offset: [0, -90] } }]}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper elevation={6}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem
                    disabled
                    key={props.deviceName}
                    value={props.deviceName}
                  >
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
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
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

export default DeviceCard;

import { useAuth0 } from "@auth0/auth0-react";
import { Chip, Popover, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import ErrorIcon from "@mui/icons-material/Error";
import { createElement, useState } from "react";

const statuses = {
  NOT_READY: 'Not ready yet',
  FAULTY: 'Error in the creation',
  READY: 'Ready to use',
}

const NRInstanceStatus = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const [anchorEl, setAnchorEl] = useState(null);
  const [nodeRedStatus, setNodeRedStatus] = useState(statuses.NOT_READY);

  const getMessage = () => nodeRedStatus || 'Error in getting the right popover message';

  const displayIcon = () => {
    let component = ErrorIcon;
    let color = 'black';

    switch (nodeRedStatus) {
      case statuses.FAULTY:
        component = ErrorIcon;
        color = '#8F0000';
        break;
      case statuses.NOT_READY:
        component = PendingIcon;
        color = 'grey';
        break;
      case statuses.READY:
        component = CheckCircleIcon;
        color = 'green';
        break;
    }

    return createElement(component, {
      onMouseEnter: handlePopoverOpen,
      onMouseLeave: handlePopoverClose,
      style: {color}
    });
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  //TO REMOVE JUST FOR TESTING
  /*setTimeout(() => {
    setNodeRedStatus(statuses.READY);
  }, 4000);*/

  return isLoading
    ? null
    : isAuthenticated && (
        <div style={{ marginRight: 24 }}>
          <Chip
            label="Node-RED instance: "
            onDelete={() => {}}
            deleteIcon={displayIcon()}
            sx={{ backgroundColor: "white", fontWeight: "bold" }}
          ></Chip>
          <Popover
            id="mouse-over-popover"
            sx={{
              pointerEvents: "none",
            }}
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            style={{ borderRadius: 25 }}
            onClose={handlePopoverClose}
            disableRestoreFocus
            disableScrollLock
          >
            <Typography fontSize={15} sx={{ p: 1 }}>
              {getMessage()}
            </Typography>
          </Popover>
        </div>
      );
};

export default NRInstanceStatus;

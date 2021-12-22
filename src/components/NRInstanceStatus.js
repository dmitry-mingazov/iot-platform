import { useAuth0 } from "@auth0/auth0-react";
import { Chip, Popover, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import ErrorIcon from "@mui/icons-material/Error";
import { useState } from "react";

const NRInstanceStatus = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isReady, setIsReady] = useState(0.5);

  const getMessage = () => {
    switch (isReady) {
      case 0:
        return "Error in the creation";
      case 0.5:
        return "Not ready yet";
      case 1:
        return "Ready to use";
      default:
        return "Error in getting the popover message";
    }
  };

  const displayIcon = () => {
    switch (isReady) {
      case 0:
        return (
          <ErrorIcon
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
            style={{ color: "#8F0000" }}
          />
        );
      case 0.5:
        return (
          <PendingIcon
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
            style={{ color: "grey" }}
          />
        );
      case 1:
        return (
          <CheckCircleIcon
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
            style={{ color: "green" }}
          />
        );
      default:
        break;
    }
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  //TO REMOVE JUST FOR TESTING
  setTimeout(() => {
    setIsReady(1);
  }, 4000);

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

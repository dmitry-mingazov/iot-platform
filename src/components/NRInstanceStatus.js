import { useAuth0 } from "@auth0/auth0-react";
import { Chip, Popover, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { useState } from "react";

const NRInstanceStatus = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  //TO REMOVE JUST FOR TESTING
  setTimeout(() => {
    setIsReady(true);
  }, 4000);

  return isLoading
    ? null
    : isAuthenticated && (
        <div style={{ marginRight: 24 }}>
          <Chip
            label="Node-RED instance: "
            onDelete={() => {}}
            deleteIcon={
              isReady ? (
                <CheckCircleIcon
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                  style={{ color: "green" }}
                />
              ) : (
                <ErrorIcon
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                  style={{ color: "#8F0000" }}
                />
              )
            }
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
              {isReady ? "Ready to use" : "Not ready yet"}
            </Typography>
          </Popover>
        </div>
      );
};

export default NRInstanceStatus;

import * as React from "react";
import { useNavigate /*useLocation*/ } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";
import InsightsIcon from '@mui/icons-material/Insights';
import CloseIcon from "@mui/icons-material/Close";
import Logout from "./Logout";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import NRInstanceStatus from "./NRInstanceStatus";
import { SnackbarContext } from "./context/SnackbarContext";
import { useNodeRed } from "../components/context/NodeRedContext";

const drawerWidth = 240;
const scrollbarWidth = window.innerWidth - document.body.clientWidth;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    minWidth: `calc(99.99vw - ${scrollbarWidth}px)`,
    minHeight: `100vh - mui--appbar-height`,
    marginTop: "64px",
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

//Component
export default function Layout({ children }) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const { snackbar, closeSnackbar } = React.useContext(SnackbarContext);
  const { updateFlows } = useNodeRed();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <CloseIcon color="primary" />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem
            button
            key={"Devices"}
            onClick={() => {
              navigate("/");
              handleDrawerClose();
            }}
          >
            <ListItemIcon>{<DevicesOtherIcon color="primary" />}</ListItemIcon>
            <ListItemText primary={"Devices"} />
          </ListItem>
          <ListItem
            button
            key={"Flows"}
            onClick={() => {
              navigate("/flows");
              handleDrawerClose();
            }}
          >
            <ListItemIcon>{<InsightsIcon color="primary" />}</ListItemIcon>
            <ListItemText primary={"Flows"} />
          </ListItem>
        </List>
      </Drawer>
      <Stack>
        <AppBar position="fixed" open={open} color="primary">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              onClick={() => {
                navigate("/");
              }}
              sx={{ flexGrow: 1, "&:hover": { cursor: "pointer" } }}
            >
              IoT Platform
            </Typography>
            <NRInstanceStatus />
            <Logout />
          </Toolbar>
        </AppBar>
        <Main open={open}>
          {children}
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={snackbar.open}
            autoHideDuration={5000}
            onClose={closeSnackbar}
          >
            <Alert
              onClose={closeSnackbar}
              severity={snackbar.severity}
              sx={{ width: "100%" }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Main>
      </Stack>
    </Box>
  );
}

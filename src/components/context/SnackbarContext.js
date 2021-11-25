import React from "react";

const SnackbarContext = React.createContext(null);

const SnackbarStateContext = (props) => {
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    severity: "",
    message: "",
  });

  //Close snackbar
  const closeSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    const newState = {
      open: false,
      severity: "",
      message: "",
    };
    setSnackbar(newState);
  };

  return (
    <SnackbarContext.Provider value={{ snackbar, setSnackbar, closeSnackbar }}>
      {props.children}
    </SnackbarContext.Provider>
  );
};

export { SnackbarContext, SnackbarStateContext };

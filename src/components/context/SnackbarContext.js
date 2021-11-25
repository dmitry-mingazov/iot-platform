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
    const newSnackbar = {
      ...snackbar,
      open: false,
    };
    setSnackbar(newSnackbar);
  };

  const openSuccessSnackbar = (message) => {
    setSnackbar({
      open: true,
      severity: 'success',
      message 
    });
  }

  const openErrorSnackbar = (message) => {
    setSnackbar({
      open: true,
      severity: 'error',
      message
    });
  }

  return (
    <SnackbarContext.Provider 
      value={{snackbar, closeSnackbar, openSuccessSnackbar, openErrorSnackbar }}>
      {props.children}
    </SnackbarContext.Provider>
  );
};

export { SnackbarContext, SnackbarStateContext };

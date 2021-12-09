import React from "react";
import {
  Typography,
  DialogContent,
  DialogTitle,
  Dialog,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  CircularProgress,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function DeviceInfoDialog(props) {
  const generateTableRow = (key, label, value) => {
    return (
      <TableRow key={key}>
        <TableCell component="th" scope="row" sx={{ minWidth: 130 }}>
          <Typography fontWeight={"bold"} fontSize={15}>
            {label}
          </Typography>
        </TableCell>
        <TableCell align="left">{value}</TableCell>
      </TableRow>
    );
  };

  const generateServicesDivider = (title) => {
    return (
      <TableRow key={title}>
        <TableCell component="th">
          <Typography fontWeight={"bold"} color="primary">
            {title}
          </Typography>
        </TableCell>
        <TableCell></TableCell>
      </TableRow>
    );
  };

  const formatMetadataLabel = (metadata) => {
    let finalLabel = metadata.charAt(0).toUpperCase() + metadata.slice(1);
    finalLabel = finalLabel.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
    let words = finalLabel.split(" ");
    if (words.length >= 2) {
      finalLabel = words[0];
      for (let i = 1; i < words.length; i++) {
        words[i] = words[i].charAt(0).toLowerCase() + words[i].slice(1);
        finalLabel = finalLabel + " " + words[i];
      }
    }
    return finalLabel;
  };

  const generateServicesTableRows = (services) => {
    let servicesTableRows = [];
    for (let i = 0; i < services.length; i++) {
      servicesTableRows.push(generateServicesDivider("Service #" + (i + 1)));
      servicesTableRows.push(
        generateTableRow(
          "InterfaceType#" + i,
          "Interface type",
          services[i].interfaceType
        )
      );
      services[i].metadata.forEach((metadata) => {
        servicesTableRows.push(
          generateTableRow(
            metadata.metadataType + i,
            formatMetadataLabel(metadata.metadataType),
            metadata.value
          )
        );
      });
    }
    return servicesTableRows;
  };

  return (
    <div>
      <BootstrapDialog
        onClose={props.handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.openInformation}
        fullWidth
      >
        {props.deviceInfo ? (
          <div>
            <BootstrapDialogTitle
              id="customized-dialog-title"
              onClose={props.handleClose}
              color="primary"
              fontWeight="bold"
            >
              {props.deviceInfo.name + " information"}
            </BootstrapDialogTitle>
            <DialogContent dividers>
              <TableContainer component={Paper}>
                <Table aria-label="device info table">
                  <TableBody>
                    {generateTableRow("Name", "Name", props.deviceInfo.name)}
                    {generateTableRow(
                      "Description",
                      "Description",
                      props.deviceInfo.description
                    )}
                    {generateTableRow("Type", "Type", props.deviceInfo.devtype)}
                    {generateServicesTableRows(props.deviceInfo.services)}
                  </TableBody>
                </Table>
              </TableContainer>
            </DialogContent>
          </div>
        ) : (
          <CircularProgress color="primary" />
        )}
      </BootstrapDialog>
    </div>
  );
}

export default DeviceInfoDialog;

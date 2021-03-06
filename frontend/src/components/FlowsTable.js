import { DataGrid } from "@mui/x-data-grid";
import { Stack, IconButton } from "@mui/material";
import { useState, useContext } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import EditIcon from "@mui/icons-material/Edit";
import FlowEditDialog from "./FlowEditDialog";
import { useNodeRed } from "../components/context/NodeRedContext";
import { useSnackbar } from "../components/context/SnackbarContext";
import { useNavigate } from 'react-router-dom';

export default function FlowsTable(props) {
  const [openEdit, setOpenEdit] = useState(false);
  const [currentFlowId, setCurrentFlowId] = useState("");
  const [currentComment, setCurrentComment] = useState("");
  const { updateComment } = useNodeRed();
  const [loading, setLoading] = useState(false);
  const { openSuccessSnackbar, openErrorSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleOpenEdit = (flowId, comment) => {
    setCurrentFlowId(flowId);
    setCurrentComment(comment);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleSaveEdit = async () => {
    setLoading(true);
    updateComment(currentFlowId, currentComment).then((_) => {
      openSuccessSnackbar("Comment updated successfully");
    }).catch((_) => {
      openErrorSnackbar("Something went wrong!");
    });
    setLoading(false);
    setOpenEdit(false);
  };

  const onCommentChange = (event) => {
    const newValue = event.target.value;
    setCurrentComment(newValue);
  };

  const renderActions = (params) => {
    return (
      <Stack direction="row" spacing={1}>
        <IconButton
          aria-label="edit"
          onClick={() => {
            handleOpenEdit(params.row.id, params.row.comment);
          }}
        >
          <EditIcon color="primary" />
        </IconButton>
        <IconButton
          aria-label="export"
          onClick={() => {
            // console.log("Not yet implemented.");
            navigate(`/node-red/${params.row.id}`)
          }}
        >
          <OpenInNewIcon color="primary" />
        </IconButton>
      </Stack>
    );
  };

  const columns = [
    { field: "flow", headerName: "Name", flex: 0.7 },
    { field: "comment", headerName: "Comment", flex: 0.9 },
    { field: "devices", headerName: "Devices", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.2,
      renderCell: renderActions,
      align: "center",
    },
  ];

  return [
    <DataGrid
      key="DataGrid"
      rows={props.rows}
      rowsPerPageOptions={[100]}
      disableSelectionOnClick
      columns={columns}
      scrollbarSize={17}
      sx={{
        "&.MuiDataGrid-root .MuiDataGrid-columnHeader, &.MuiDataGrid-root .MuiDataGrid-cell":
          {
            outline: "none",
          },
      }}
    ></DataGrid>,
    <FlowEditDialog
      key="EditDialog"
      open={openEdit}
      handleClose={handleCloseEdit}
      handleSave={handleSaveEdit}
      comment={currentComment}
      onCommentChange={onCommentChange}
      loading={loading}
    />,
  ];
}

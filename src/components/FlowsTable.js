import { DataGrid } from "@mui/x-data-grid";
import { Stack, IconButton } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import EditIcon from "@mui/icons-material/Edit";

export default function FlowsTable(props) {
  const renderActions = (params) => {
    return (
      <Stack direction="row" spacing={1}>
        <IconButton
          aria-label="edit"
          onClick={() => {
            console.log("Not yet implemented.");
          }}
        >
          <EditIcon color="primary" />
        </IconButton>
        <IconButton
          aria-label="export"
          onClick={() => {
            console.log("Not yet implemented.");
          }}
        >
          <OpenInNewIcon color="primary" />
        </IconButton>
      </Stack>
    );
  };

  const columns = [
    { field: "col1", headerName: "Name", flex: 0.7 },
    { field: "col2", headerName: "Comment", flex: 0.9 },
    { field: "col3", headerName: "Devices", flex: 1 },
    {
      field: "col4",
      headerName: "Actions",
      flex: 0.2,
      renderCell: renderActions,
      align: "center",
    },
  ];

  return (
    <DataGrid
      rows={props.rows}
      rowsPerPageOptions={[100]}
      disableSelectionOnClick
      columns={columns}
      sx={{
        "&.MuiDataGrid-root .MuiDataGrid-columnHeader, &.MuiDataGrid-root .MuiDataGrid-cell":
          {
            outline: "none",
          },
      }}
    ></DataGrid>
  );
}

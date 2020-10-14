import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { DropzoneArea } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { importAttendance } from "../../redux/actions/attendence.action";

const useStyles = makeStyles((theme) => ({
  snackBar: {
    "&.MuiSnackbar-root": {
      zIndex: theme.zIndex.drawer + 1,
      maxWidth: "400px",
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: `#fff`,
  },
  previewChip: {
    minWidth: 160,
    maxWidth: 210,
  },
}));

const AttendanceUpload = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const [file, setFile] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbar, setSnackbar] = useState({});

  const handleChange = (files = []) => {
    setFile(files[0] || {});
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", file);
    props.importAttendance(formData, onSuccess, onFail);    
  };

  const onSuccess = () => {
    showSnackbar({ type: "success", message: "Import Success!" });
    history.goBack();
  };

  const onFail = (error = {}) => {
    showSnackbar({ message: error.message });
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const showSnackbar = (d) => {
    setOpenSnackbar(true);
    setSnackbar(d);
  };

  const handleCancel = () => {
    history.goBack();
  };

  return (
    <>
      <div style={{ margin: "10px" }}>
        <div>
          <DropzoneArea
            onChange={handleChange}
            alertSnackbarProps={{
              anchorOrigin: { vertical: "bottom", horizontal: "center" },
              classes: { root: classes.snackBar },
              autoHideDuration: 3000,
            }}
            acceptedFiles={[".xlsx", ".xls", ".csv"]}
            maxFileSize={10000000}
            filesLimit={1}
            showPreviews={true}
            showPreviewsInDropzone={false}
            useChipsForPreview
            previewGridProps={{ container: { spacing: 1, direction: "row" } }}
            previewChipProps={{ classes: { root: classes.previewChip } }}
            previewText="Selected file"
            dropzoneText="Drag and drop a file (max 10 MB each) here or click"
          />
        </div>
        <div style={{ height: "40px" }}></div>
        <div>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleUpload}
            disabled={!file.name}
          >
            Upload
          </Button>
        </div>
        <div style={{ height: "20px" }}></div>
        <div>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
        <Backdrop open={props.loading} className={classes.backdrop}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.type || "error"}
        >
          {snackbar.message || "Something went wrong!! Please try again."}
        </Alert>
      </Snackbar>
    </>
  );
};
const mapStateToProps = ({ Attendence }) => {
  return {
    loading: Attendence.importLoading,
  };
};

export default connect(mapStateToProps, { importAttendance })(AttendanceUpload);

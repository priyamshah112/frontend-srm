import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { DropzoneArea } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import GalleryService from "./GalleryService";
import BackdropLoader from "../common/ui/backdropLoader/BackdropLoader";

const useStyles = makeStyles((theme) => ({
  snackBar: {
    "&.MuiSnackbar-root": {
      zIndex: theme.zIndex.drawer + 1,
      maxWidth: "400px",
    },
  },
  previewChip: {
    minWidth: 160,
    maxWidth: 210,
  },
}));

const ImageUpload = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [fileList, setFileList] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (files) => {
    setFileList(files);
  };
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleUpload = async () => {
    const imageFormData = new FormData();
    for (var i in fileList) {
      imageFormData.append("img_name[]", fileList[i]);
    }
    try {
      setIsUploading(true);
      const response = await GalleryService.uploadImage(
        imageFormData,
        props.token
      );
      console.log(response);
      setIsUploading(false);

      history.goBack();
    } catch (e) {
      setIsUploading(false);
      console.log(e);
    }
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
            acceptedFiles={["image/*"]}
            maxFileSize={10000000}
            filesLimit={10}
            showPreviews={true}
            showPreviewsInDropzone={false}
            useChipsForPreview
            previewGridProps={{ container: { spacing: 1, direction: "row" } }}
            previewChipProps={{ classes: { root: classes.previewChip } }}
            previewText="Selected files"
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
            disabled={fileList.length === 0}
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
        <BackdropLoader open={isUploading} />
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    selectedRole: state.auth.selectedRole,
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(ImageUpload);

import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { DropzoneArea } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";
import axios from "axios";
const BACKEND_API_URL = process.env.REACT_APP_BACKEND_API_URL;
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
    console.log();
    // console.log(await toBase64(fileList[0]));
    const base=await toBase64(fileList[0])
    const token = localStorage.getItem("srmToken");
    // const response = await axios.post(
    //   `${BACKEND_API_URL}/feed-gallery`,
    //   {
    //     file: `data:image/png;base64,${blobInfo.base64()}`,
    //     type: "news",
    //   },
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${props.token}`,
    //     },
    //   }
    // );
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
      </div>
    </>
  );
};

export default ImageUpload;

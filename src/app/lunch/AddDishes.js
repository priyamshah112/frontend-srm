import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import BackIcon from "../../assets/images/Back.svg";
import { connect } from "react-redux";
import { IconButton } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import LunchIcon from "../../assets/images/lunch/Lunch.svg";
import { AddDishInDishes } from "../redux/actions/attendence.action";
import { removeLunchImage } from "../redux/actions/attendence.action";
import { updateDishInDishes } from "../redux/actions/attendence.action";
import { SnackBarRef } from "../../SnackBar";
import imageCompression from "browser-image-compression";
import { showDishListInDishes } from "../redux/actions/attendence.action";
import { CircularProgress } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const useStyle = makeStyles((theme) => ({
  formStyle: {
    margin: "0 20px 85px 20px !important",
    marginBottom: "85px",
    backgroundColor: "white",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: "5px",
  },
  backImg: {
    float: "left",
    transform: "translate(0px, 7px)",
    cursor: "pointer",
  },
  adornmentColor: {
    color: "rgba(0, 0, 0, 0.54)",
  },
  themeColor: {
    color: `${theme.palette.common.deluge}`,
    padding: 0,
    margin: 0,
  },
  errorColor: {
    color: "red",
  },
  titleText: {
    textAlign: "center",
    margin: "auto",
    fontFamily: "Avenir Medium",
    fontize: "1.2rem",
    color: "#1C1C1E",
  },
  fieldStyle: {
    width: "100%",
    margin: "auto",
    fontFamily: "Avenir Book",
    fontSize: " 1rem",
    "& .MuiInput-underline:before": {
      borderBottom: "2px solid #eaeaea",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: "2px solid #7B72AF",
      transitionProperty: "border-bottom-color",
      transitionDuration: "500ms",
      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },
  snackBar: {
    "&.MuiSnackbar-root": {
      zIndex: theme.zIndex.drawer + 1,
      maxWidth: "400px",
    },
  },
  previewChip: {
    minWidth: 300,
    maxWidth: 400,
  },
  inputBorder: {
    height: "50px",
  },
  datePicker: {
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  paper: {
    display: "flex",
    minHeight: "40px",
    backgroundColor: "none",
    justifyContent: "left",
    flexWrap: "wrap",
    listStyle: "none",
    border: `1px solid ${theme.palette.common.deluge}`,
    padding: theme.spacing(0.5),
    margin: "auto",
  },

  showIn: {
    paddingTop: "5px",
  },
  textArea: {
    width: "100%",
  },
  paperShowIn: {
    display: "flex",
    minHeight: "40px",
    backgroundColor: "none",
    justifyContent: "left",
    flexWrap: "wrap",
    listStyle: "none",

    padding: theme.spacing(0.5),
    margin: "auto",
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  paperBoxShadow: {
    boxShadow: `2px 2px 2px 0 #E5E5EA`,
  },
  textAlignLeft: {
    textAlign: "left",
    color: "rgba(0, 0, 0, 0.54)",
  },
  contentCenter: {
    justifyContent: "left",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  publishBtns: {
    textAlign: "right",
    justifyContent: "right",
  },

  sideMargins: {
    marginLeft: "20px",
    marginRight: "20px",
  },
  sideMarginright: {
    marginRight: "50px",
  },
  radio: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  dropzone: {
    border: "solid !important",
    minHeight: "0px !important",
    width: "150px !important",
  },
  margin: {
    marginTop: "30px !important",
    [theme.breakpoints.down("xs")]: {
      marginTop: "10px",
    },
    "& .publishBtn": {
      borderRadius: "3px",
      width: "inherit",
      margin: 0,
      [theme.breakpoints.down("xs")]: {
        marginTop: "10px",
        marginRight: 0,
        width: "100%",
      },
    },
    "& .publishLaterBtn": {
      backgroundColor: `${theme.palette.common.white}`,
      border: `1px solid ${theme.palette.common.adornment}`,
      marginRight: "5px",
    },
  },
  imageDrop: {
    border: "1px solid rgba(0,0,0,0.30)",
    height: "90px",
    lineHeight: "80px",
    display: "flex",
    textAlign: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontFamily: "Avenir book",
    color: "#7B72AF",
    cursor: "pointer",
  },
  imageUpload: {
    width: "123px",
  },
  imageHandler: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
  },
  img: {
    marginRight: "5px",
    marginBottom: "5px",
    width: "123px",
    height: "90px",
  },
  rupeeSign: {
    fontSize: 20,
    fontFamily: "Avenir book",
  },
  imageContainer: {
    display: "flex",
    marginRight: "10px",
  },
  delImgContainer: {
    cursor: "pointer",
    height: "21px",
    border: "1px solid #7B72AF",
    borderRadius: "50%",
    marginLeft: "-30px",
    marginTop: "3px",
    backgroundColor: "#7B72AF",
  },
  heading:{
    margin:'20px'
  }
}));

function AddDishes(props) {
  const IMAGE_BASE_URL = process.env.REACT_APP_BACKEND_IMAGE_URL;
  const classes = useStyle();
  const [errMessage, setError] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Veg");
  const [fileList, setFileList] = useState([]);
  const { loading, class_id, school_id, updateLoading } = props;
  const {
    edit,
    setEdit,
    editId,
    updateName,
    updateStatus,
    updatePrice,
    updateDesc,
    updateImage,
  } = props;

  console.log("updateImage", updateImage);

  useEffect(() => {
    if (edit) {
      setTitle(updateName);
      setPrice(updatePrice);
      setDescription(updateDesc);
      setStatus(updateStatus);
      handleUpdateImage();
    }
  }, []);

  const validForm = () => {
    if (!title && !price && !description && fileList[0]) {
      setError("All field are mandatory ");
    } else if (!title && !price && description) {
      setError("All field are mandatory ");
    } else if (!price && !description && !fileList[0]) {
      setError("All field are mandatory ");
    } else if (!title && !description && !fileList[0]) {
      setError("All field are mandatory ");
    } else if (!title && !price && !fileList[0]) {
      setError("All field are mandatory ");
    } else if (!title && !price) {
      setError("All field are mandatory ");
    } else if (!price && !description) {
      setError("All field are mandatory ");
    } else if (!description && !fileList[0]) {
      setError("All field are mandatory ");
    } else if (!title && !fileList[0]) {
      setError("All field are mandatory ");
    } else if (!title) {
      setError("All field are mandatory ");
    } else if (!price) {
      setError("All field are mandatory ");
    } else if (!description) {
      setError("All field are mandatory ");
    } else if (!fileList[0]) {
      setError("All field are mandatory ");
    } else {
      return true;
    }
  };

  const handleChange = async (e) => {
    console.log("change files", e.target.files);
    setError("");
    const file = e.target.files;
    const filesArray = [];
    const options = {
      maxSizeMB: 0.5,
      useWebWorker: true,
    };
    for (let i = 0; i < file.length; i++) {
      try {
        const compressedImage = await imageCompression(file[i], options);
        const imageString = await toBase64(compressedImage);
        filesArray.push(imageString);
      } catch (e) {
        SnackBarRef.open("", false, e);
        console.log("error", e);
      }
    }
    if (!fileList[0]) {
      setFileList(filesArray);
    } else {
      const array = fileList.concat(filesArray);
      setFileList(array);
    }
  };

  const handleUpdateImage = () => {
    const images = [];
    updateImage.map((item) => {
      let imagePath = `${IMAGE_BASE_URL}/${item.img_path}/${item.img_name}`;
      images.push(imagePath);
    });
    console.log("updateImage", images);
    setFileList(images);
  };
  const handleDeleteImg = (index, imageUrl) => {
    const imgArray = [...fileList];
    const removeImg = imgArray.splice(index, 1);
    console.log("fileList remove", removeImg, imgArray);
    setFileList(imgArray);

    updateImage.map((item) => {
      let imagePath = `${IMAGE_BASE_URL}/${item.img_path}/${item.img_name}`;
      if (imagePath === imageUrl) {
        props.removeLunchImage(item.id);
      }
    });
  };

  const renderPhotos = (source) => {
    console.log("updateImage source", source);
    return source.map((photo, index) => {
      return (
        <div className={classes.imageContainer}>
          <img src={photo} key={photo} className={classes.img} style={{}} />
          <div
            onClick={() => handleDeleteImg(index, photo)}
            className={classes.delImgContainer}
          >
            <CloseIcon style={{ color: "white" }} fontSize="small" />
          </div>
        </div>
      );
    });
  };

  const fetchData = () => {
    props.AddDishInDishes();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChangePrice = (e) => {
    setPrice(e.target.value);
    setError("");
  };
  const handleChangeRadio = (e) => {
    setStatus(e.target.value);
    setError("");
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
    setError("");
  };
  const handleBack = () => {
    if (edit) {
      setEdit(!edit);
    } else {
      props.close();
    }
  };
  const handleChangeInput = (event) => {
    setTitle(event.target.value);
    setError("");
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleSuccess = () => {
    if (edit) {
      SnackBarRef.open("", true, "Dish updated successfully");
      setEdit(false);
    } else {
      SnackBarRef.open("", true, "Dish added successfully");
      handleBack();
    }
    props.showDishListInDishes(school_id);
  };
  const handleFail = (error) => {
    console.log("error", error);
    if (error) {
      SnackBarRef.open("", false, error.message);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    let fileArray = [];
    fileList.map((item, index) => {
      let includeArray = item.includes("lunch-image");
      if (!includeArray) {
        fileArray.push(item);
      }
    });
    if (validForm()) {
      const data = {
        school_id: school_id,
        class_id: class_id,
        name: title,
        price: price,
        status: status,
        description: description,
        image: fileArray,
      };
      if (edit) {
        console.log("array2 fileList", fileArray);
        props.updateDishInDishes(
          data,
          editId,
          class_id,
          school_id,
          handleSuccess,
          handleFail
        );
      } else {
        props.AddDishInDishes(data, handleSuccess, handleFail);
      }
    }
  };

  const GreenRadio = withStyles({
    root: {
      "&$checked": {
        color: "#7B72AF",
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);

  return (
    <div>
      <div className={classes.heading}>
        <img
          src={BackIcon}
          alt="Back"
          className={classes.backImg}
          onClick={handleBack}
        />
        <Typography
          variant="h5"
          className={`${classes.themeColor} ${classes.titleText}`}
        >
          {edit ? "Update Dish" : "Add Dish"}
        </Typography>
      </div>
      <form className={classes.formStyle}>
        {errMessage ? (
          <Box className={classes.margin} pt={2}>
            <div>
              <Typography className={`${classes.errorColor}`}>
                {errMessage}
              </Typography>
            </div>
          </Box>
        ) : (
          ""
        )}
        <Box className={`${classes.margin} ${classes.sideMargins}`}>
          <FormControl className={classes.fieldStyle}>
            <TextField
              id="title"
              name="title"
              className={classes.inputBorder}
              style={{marginTop:'20px'}}
              value={title}
              onChange={handleChangeInput}
              required={true}
              label="Dish Name"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <img style={{ width: 19, height: 19 }} src={LunchIcon} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
        </Box>
        <Box className={`${classes.margin} ${classes.sideMargins}`}>
          <FormControl className={classes.fieldStyle}>
            <TextField
              id="price"
              name="price"
              className={classes.inputBorder}
              value={price}
              onChange={handleChangePrice}
              required={true}
              label="Price"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <div className={classes.rupeeSign}>₹</div>
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
        </Box>
        <Box className={`${classes.margin} ${classes.sideMargins}`}>
          <Grid className={classes.fieldStyle}>
            <Typography className={classes.textAlignLeft}>
              Description
            </Typography>
            <TextField
              className={classes.textArea}
              id="outlined-multiline-static"
              label=""
              multiline
              rows={5}
              placeholder="Description"
              value={description}
              onChange={handleDescription}
              variant="outlined"
            />
          </Grid>
        </Box>
        <Box
          className={`${classes.margin} ${classes.sideMargins} ${classes.radio}`}
        >
          <FormControl component="fieldset">
            <RadioGroup
              className={classes.radio}
              aria-label="radiotype"
              name="radiotype1"
              value={status}
              onChange={handleChangeRadio}
            >
              <FormControlLabel
                checked={status === "Veg"}
                value="Veg"
                control={<GreenRadio />}
                label="Veg"
              />
              <FormControlLabel
                checked={status === "Non_veg"}
                value="Non_veg"
                control={<GreenRadio />}
                label="Non Veg"
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box className={`${classes.margin} ${classes.sideMargins}`}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <Typography
              component="p"
              style={{
                textAlign: "left",
                fontFamily: "Avenir medium",
                fontSize: "1rem",
                marginBottom: "5px",
                color: "rgba(0,0,0,0.54)",
              }}
            >
              Images
            </Typography>
            <div className={classes.imageHandler}>
              {renderPhotos(fileList)}
              <input
                accept="image/*"
                id="input"
                multiple
                type="file"
                onChange={handleChange}
                // value={fileList}
                style={{ display: "none" }}
              />
              <label htmlFor="input" className={classes.imageUpload}>
                <div className={classes.imageDrop}>+ Add Image</div>
              </label>
            </div>
          </div>
        </Box>
        <Box className={`${classes.margin} ${classes.sideMargins}`}>
          <Grid
            container
            className={classes.fieldStyle}
            direction="row-reverse"
          >
            <Grid item sm={6} xs={12} className={classes.publishBtns}>
              {loading || updateLoading ? (
                <CircularProgress />
              ) : (
                <Button
                  id="publishBtn"
                  variant="contained"
                  className={`${classes.fieldStyle} ${"publishBtn"}`}
                  color="primary"
                  type="submit"
                  onClick={handleSave}
                  disableElevation
                >
                  {edit ? "Update" : "Save"}
                </Button>
              )}
            </Grid>
            <Grid item sm={6} xs={12} className={classes.textAlignLeft}>
              <br />
              <br />
            </Grid>

            <br />
            <br />
            <br />
          </Grid>
        </Box>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  const {
    add_dish_in_dishes = [],
    addDishInDishesLoading,
    updateDishInDishesLoading,
    removeLunchImageLoading,
  } = state.Attendence;
  return {
    data: add_dish_in_dishes,
    loading: addDishInDishesLoading,
    updateLoading: updateDishInDishesLoading,
    removeImageLoading: removeLunchImageLoading,
    class_id: state.auth.userInfo.user_classes.class_id,
    school_id: state.auth.userInfo.user_classes.school_id,
  };
};

export default connect(mapStateToProps, {
  AddDishInDishes,
  showDishListInDishes,
  updateDishInDishes,
  removeLunchImage,
})(AddDishes);

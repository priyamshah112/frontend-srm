import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import DosaImg from "./images/Dosa.jpg";
import EditIcon from "../../assets/images/Edit.svg";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import MasalaDosaImg from "./images/Masala-Dosa.jpg";
import ChickenTikka from "./images/Chicken-Tikka-Masala.jpg";
import { connect } from "react-redux";
import { showDishListInDishes } from "../redux/actions/attendence.action";
import { deleteDishInDishes } from "../redux/actions/attendence.action";
import { CircularProgress } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { SnackBarRef } from "../../SnackBar";
import AddDishes from "./AddDishes";

const useStyles = makeStyles((theme) => ({
  loading: {
    display: "flex",
    justifyContent: "center",
    marginLeft: "50px",
    marginTop: "50px",
  },
  root: {
    // maxWidth: 345,
    marginTop: "15px",
    marginLeft: "2%",
    width: "47%",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      margin: "15px 15px 0 15px",
    },
  },
  container: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    marginBottom: "75px",
  },
  editBtn: {
    marginLeft: "auto",
    width: "19px",
    height: "19px",
    paddingLeft: "10px",
    transform: "translateY(4px)",
    cursor: "pointer",
    marginBottom: "7px",
  },
  deleteBtn: {
    color: "rgb(175,175,175)",
    marginBottom: "-3px",
    cursor: "pointer",
  },

  desc: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: "5px",
    paddingRight: "5px",
    marginLeft: "5px",
    marginRight: "5px",
  },
  img: {
    height: "90px",
    width: "40%",
  },
  header: {
    display: "flex",
    padding: "10px",
    justifyContent: "flex-start",
    float: "right",
    width: "90%",
  },
  heading: {
    fontFamily: "Avenir medium",
    fontSize: 14,
  },
  heading1: {
    width: "70%",
  },
  heading2: {
    width: "30%",
    display: "flex",
    justifyContent: "flex-end",
  },
  red: {
    color: "#f44336",
  },
  green: {
    color: "#14ee14",
  },
  circle: {
    padding: "4px",
    borderRadius: "50%",
    height: "0px",
    marginTop: "5px",
    marginRight: "4px",
  },
  circleRed: {
    backgroundColor: "#f44336",
  },
  circleGreen: {
    backgroundColor: "#14ee14",
  },
  message: {
    fontFamily: "Avenir book",
    fontSize: 14,
    textAlign: "center",
    marginLeft: "21%",
    paddingTop: "6px",
  },
}));

function DishesCard(props) {
  const { school_id, data, loading } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");
  const [updateDesc, setUpdateDesc] = useState("");
  const [updatePrice, setUpdatePrice] = useState("");
  const [updateImage, setUpdateImage] = useState([]);

  useEffect(() => {
    props.setEdit(edit);
  }, [edit]);

  const IMAGES_BASE_URL = process.env.REACT_APP_BACKEND_IMAGE_URL;

  const handleSuccess = () => {
    SnackBarRef.open("", true, "Dish deleted successfully");
    props.showDishListInDishes(school_id);
    setOpen(false);
    setDeleteId("");
  };
  const handleFail = (error) => {
    setDeleteId("");
    console.log("error", error);
    if (error) {
      SnackBarRef.open("", false, error.message);
    }
  };
  console.log("deleteId", deleteId);
  const handleDelete = () => {
    console.log("Deleting dish");
    props.deleteDishInDishes(deleteId, handleSuccess, handleFail);
  };

  const fetchData = () => {
    props.showDishListInDishes(school_id);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClickOpen = (id) => {
    setOpen(true);
    setDeleteId(id);
  };
  const handleCloseNO = () => {
    setOpen(false);
  };

  return (
    <>
      {edit ? (
        <AddDishes
          edit={edit}
          setEdit={setEdit}
          editId={editId}
          updateName={updateName}
          updateStatus={updateStatus}
          updatePrice={updatePrice}
          updateDesc={updateDesc}
          updateImage={updateImage}
        />
      ) : (
        <>
          <Dialog
            open={open}
            onClose={handleCloseNO}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure you want to delete?"}
            </DialogTitle>
            {props.deleteLoading ? (
              <LinearProgress />
            ) : (
              <DialogActions>
                <Button onClick={handleCloseNO} color="primary" autoFocus>
                  NO
                </Button>
                <Button onClick={handleDelete} color="primary">
                  YES
                </Button>
              </DialogActions>
            )}
          </Dialog>
          {loading ? (
            <div className={classes.loading}>
              <CircularProgress />
            </div>
          ) : !data[0] ? (
            <Typography className={classes.message} variant="h5" component="h2">
              No dishes available yet!
            </Typography>
          ) : (
            <div className={classes.container}>
              {data.map((item) => (
                // data[0]?
                <Card className={classes.root}>
                  <CardActionArea
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <div className={classes.header}>
                      <div className={classes.heading1}>
                        <Typography
                          className={classes.heading}
                          variant="h5"
                          component="h2"
                          style={{ fontSize: 16 }}
                        >
                          {item.name}
                        </Typography>
                      </div>
                      <div className={classes.heading2}>
                        <div
                          className={
                            item.status === "Veg"
                              ? `${classes.circleGreen} ${classes.circle}`
                              : `${classes.circleRed} ${classes.circle}`
                          }
                        ></div>
                        <Typography
                          className={
                            item.status === "Veg"
                              ? `${classes.green} ${classes.heading}`
                              : `${classes.red} ${classes.heading}`
                          }
                          variant="h5"
                          component="h2"
                        >
                          {item.status === "Veg" ? "Veg" : "Non Veg"}
                        </Typography>
                      </div>
                    </div>
                    <CardContent
                      style={{
                        display: "flex",
                        paddingTop: "5px",
                        paddingBottom: "5px",
                      }}
                    >
                      <CardMedia
                        className={classes.img}
                        component="img"
                        alt="dish image"
                        height="50"
                        width="40"
                        image={
                          item.lunch_images[0]
                            ? `${IMAGES_BASE_URL}/${item.lunch_images[0].img_path}/${item.lunch_images[0].img_name}`
                            : ""
                        }
                        title="Dish Image"
                      />
                      <div className={classes.desc}>
                        <Typography
                          style={{
                            fontSize: 14,
                            fontFamily: "Avenir",
                            color: "black",
                          }}
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {item.description}
                        </Typography>
                        <Typography
                          style={{
                            fontSize: 14,
                            fontFamily: "Avenir",
                            marginTop: "7px",
                            marginBottom: "7px",
                            color: "black",
                          }}
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          Price - ₹{item.price}/-
                        </Typography>
                      </div>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <img
                      src={EditIcon}
                      className={classes.editBtn}
                      onClick={() => {
                        setEdit(true);
                        setEditId(item.id);
                        setUpdateName(item.name);
                        setUpdateStatus(item.status);
                        setUpdateDesc(item.description);
                        setUpdatePrice(item.price);
                        setUpdateImage(item.lunch_images);
                      }}
                    />
                    <DeleteOutlineOutlinedIcon
                      onClick={() => handleClickOpen(item.id)}
                      className={classes.deleteBtn}
                      fontSize={"medium"}
                    />
                  </CardActions>
                </Card>
                // :<Typography className={classes.message}>No dishes available yet!</Typography>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  const {
    show_dish_list_in_dishes = [],
    showDishListInDishesLoading,
    deleteDishInDishesLoading,
  } = state.Attendence;
  return {
    data: show_dish_list_in_dishes,
    loading: showDishListInDishesLoading,
    deleteLoading: deleteDishInDishesLoading,
    class_id: state.auth.userInfo.user_classes.class_id,
    school_id: state.auth.userInfo.user_classes.school_id,
  };
};

export default connect(mapStateToProps, {
  showDishListInDishes,
  deleteDishInDishes,
})(DishesCard);

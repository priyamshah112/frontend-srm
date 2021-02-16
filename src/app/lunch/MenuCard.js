import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from "../../assets/images/Edit.svg";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import { connect } from "react-redux";
import { deleteMenuInList } from "../redux/actions/attendence.action";
import { lunchMenuAll } from "../redux/actions/attendence.action";
import { CircularProgress } from "@material-ui/core";
import { SnackBarRef } from "../../SnackBar";
import LinearProgress from "@material-ui/core/LinearProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import AddMenu from "./AddMenu";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    //   maxWidth: 345,
    margin: "20px 20px 0 20px",
    width: "100%",
    paddingBottom: "10px",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      margin: "15px 15px 0 15px",
    },
  },
  container: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    marginBottom: "85px",
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
    width: "80%",
  },
  img: {
    height: "100px",
    width: "20%",
  },
  header: {
    display: "flex",
    padding: "0 10px 10px 10px",
    justifyContent: "flex-start",
    float: "right",
    width: "100%",
  },
  heading: {
    fontFamily: "Avenir medium",
    fontSize: 14,
  },
  heading1: {
    width: "70%",
  },
  heading2: {
    width: "20%",
    display: "flex",
    justifyContent: "flex-start",
    paddingLeft: "20px",
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
    marginTop: "20px",
  },
  message2: {
    fontFamily: "Avenir book",
    fontSize: 14,
    textAlign: "center",
    // marginTop: "20px",
  },
  cardHeader: {
    display: "flex",
  },
  content: {
    fontSize: 14,
    fontFamily: "Avenir",
    color: "black",
  },
  contentCard: {
    display: "flex",
    width: "100%",
  },
  description: {
    width: "80%",
    padding: "10px",
  },
  price: {
    padding: "10px",
    display: "flex",
    marginRight: "15px",
    justifyContent: "flex-end",
    width: "30%",
  },
  cardAction: {
    // position: "absolute",
    // right: "3px",
  },
  actionHead: {
    fontFamily: "Avenir medium",
    fontSize: 18,
    marginLeft: "10px",
    textAlign: "center",
  },
  statusText: {
    fontFamily: "Avenir medium",
    fontSize: 18,
  },
  actionArea: {
    cursor: "default",
    display: "flex",
    paddingTop: "15px",
    paddingBottom: "15px",
    justifyContent: "space-between",
  },
  actionAreaStu: {
    cursor: "default",
    display: "flex",
    paddingTop: "15px",
    paddingBottom: "15px",
    justifyContent: "center",
  },
  cardContent: {
    display: "flex",
    paddingTop: "5px",
    paddingBottom: "5px",
    width: "100%",
    cursor: "pointer",
  },
  status: {
    marginLeft: "20px",
    textTransform: "capitalize",
    color: "rgba(0,0,0,0.54)",
  },
}));

function MenuCard(props) {
  const IMAGE_BASE_URL = process.env.REACT_APP_BACKEND_IMAGE_URL;
  const [open, setOpen] = useState(false);
  const [menuId, setMenuId] = useState("");

  const classes = useStyles();
  const history = useHistory();
  const { school_id, class_id, deleteLoading } = props;
  const menuDataLoading = props.menuDataLoading;
  const data = props.menuData || {};
  const menuResult = Object.entries(data);
  const [edit, setEdit] = useState(false);
  const [updateDay, setUpdateDay] = useState("");
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateClasses, setUpdateClasses] = useState([]);
  const [updateDish, setUpdateDish] = useState([]);
  const selectedRole = props.selectedRole;
  useEffect(() => {
    props.setEdit(edit);
  }, [edit]);

  console.log("lunch menu data", menuResult, props.menuData);

  const handleCloseEdit = () => {
    setEdit(false);
  };
  const handleEditDishes = (menuId) => {
    setMenuId(menuId);
    setEdit(true);
  };
  const handleClickOpen = (id) => {
    setOpen(true);
    setMenuId(id);
  };
  const handleCloseNO = () => {
    setOpen(false);
  };
  const handleSuccess = () => {
    SnackBarRef.open("", true, "Lunch menu deleted successfully");
    props.lunchMenuAll(school_id, class_id);
    handleCloseNO();
  };
  const handleFail = (error) => {
    console.log("error", error);
    if (error) {
      SnackBarRef.open("", false, error.message);
    }
  };
  const handleDeleteMenu = () => {
    props.deleteMenuInList(
      menuId,
      school_id,
      class_id,
      handleSuccess,
      handleFail
    );
  };

  return (
    <>
      {edit ? (
        <AddMenu
          class_id={class_id}
          updateDay={updateDay}
          updateTitle={updateTitle}
          updateClasses={updateClasses}
          updateDish={updateDish}
          close={handleCloseEdit}
          lunchMenuId={menuId}
          edit={edit}
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
            {deleteLoading ? (
              <LinearProgress />
            ) : (
              <DialogActions>
                <Button onClick={handleCloseNO} color="primary" autoFocus>
                  NO
                </Button>
                <Button onClick={handleDeleteMenu} color="primary">
                  YES
                </Button>
              </DialogActions>
            )}
          </Dialog>
          {menuDataLoading ||
          props.menuFilterLoading ||
          props.classesLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "50px",
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            <>
              {menuResult[0] ? (
                <div className={classes.container}>
                  {menuResult.map((item) =>
                    item[1][0] ? (
                      <Card className={classes.root}>
                        <CardActionArea
                          className={
                            selectedRole === "teacher" ||
                            selectedRole === "admin"
                              ? `${classes.actionArea}`
                              : classes.actionAreaStu
                          }
                        >
                          {selectedRole === "teacher" ||
                          selectedRole === "admin" ? (
                            <div className={classes.status}>
                              <Typography className={classes.statusText}>
                                {item[1][0] ? item[1][0].lunch_menu.status : ""}
                              </Typography>
                            </div>
                          ) : (
                            ""
                          )}
                          <Typography className={classes.actionHead}>
                            {item[1][0] ? item[1][0].lunch_menu.name : ""}
                          </Typography>
                          {selectedRole === "teacher" ||
                          selectedRole === "admin" ? (
                            <CardActions className={classes.cardAction}>
                              <img
                                src={EditIcon}
                                className={classes.editBtn}
                                onClick={() => {
                                  let arrayDish = [];
                                  handleEditDishes(item[1][0].lunch_menu_id);
                                  setUpdateDay(
                                    item[1][0].lunch_menu.weekday_id
                                  );
                                  setUpdateTitle(item[1][0].lunch_menu.name);
                                  setUpdateClasses(
                                    item[1][0].lunch_menu.class_mapping
                                  );
                                  item[1].map((dishes) => {
                                    if (dishes.lunch_dishes[0]) {
                                      console.log(
                                        "dishes map",
                                        dishes.lunch_dishes[0],
                                        dishes
                                      );
                                      arrayDish.push(dishes.lunch_dishes[0]);
                                    }
                                  });
                                  setUpdateDish(arrayDish);
                                }}
                              />
                              <DeleteOutlineOutlinedIcon
                                className={classes.deleteBtn}
                                onClick={() =>
                                  handleClickOpen(item[1][0].lunch_menu_id)
                                }
                                fontSize={"medium"}
                              />
                            </CardActions>
                          ) : (
                            ""
                          )}
                        </CardActionArea>
                        {item[1].map((content) =>
                          content.lunch_dish_id ? (
                            <CardContent
                              className={classes.cardContent}
                              onClick={() => {
                                history.push(`/lunch/${content.lunch_dish_id}`);
                              }}
                            >
                              <CardMedia
                                className={classes.img}
                                component="img"
                                alt="Dish Images"
                                height="50"
                                width="40"
                                image={
                                  content.lunch_dishes[0]
                                    ? `${IMAGE_BASE_URL}/${content.lunch_dishes[0].lunch_images[0].img_path}/${content.lunch_dishes[0].lunch_images[0].img_name}`
                                    : ""
                                }
                                title="Dish Image"
                              />

                              <div className={classes.desc}>
                                <div className={classes.header}>
                                  <Typography
                                    className={classes.heading}
                                    variant="h5"
                                    component="h2"
                                    style={{ fontSize: 16 }}
                                  >
                                    {content.lunch_dishes[0]
                                      ? content.lunch_dishes[0].name
                                      : ""}
                                  </Typography>
                                  <div className={classes.heading2}>
                                    <div
                                      className={
                                        !content.lunch_dishes[0]
                                          ? ""
                                          : content.lunch_dishes[0].status ===
                                            "Veg"
                                          ? `${classes.circleGreen} ${classes.circle}`
                                          : `${classes.circleRed} ${classes.circle}`
                                      }
                                    ></div>
                                    <Typography
                                      className={
                                        !content.lunch_dishes[0]
                                          ? ""
                                          : content.lunch_dishes[0].status ===
                                            "Veg"
                                          ? `${classes.green} ${classes.heading}`
                                          : `${classes.red} ${classes.heading}`
                                      }
                                      variant="h5"
                                      component="h2"
                                    >
                                      {content.lunch_dishes[0]
                                        ? content.lunch_dishes[0].status ===
                                          "Veg"
                                          ? "Veg"
                                          : "Non Veg"
                                        : ""}
                                    </Typography>
                                  </div>
                                </div>
                                <div className={classes.contentCard}>
                                  <div className={classes.description}>
                                    <Typography
                                      className={classes.content}
                                      variant="body2"
                                      color="textSecondary"
                                      component="p"
                                    >
                                      {content.lunch_dishes[0]
                                        ? content.lunch_dishes[0].description
                                        : ""}
                                    </Typography>
                                  </div>
                                  <div className={classes.price}>
                                    <Typography
                                      className={classes.content}
                                      variant="body2"
                                      color="textSecondary"
                                      component="p"
                                    >
                                      Price - ₹
                                      {content.lunch_dishes[0]
                                        ? content.lunch_dishes[0].price
                                        : ""}
                                      /-
                                    </Typography>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          ) : (
                            ""
                          )
                        )}
                      </Card>
                    ) : (
                      ""
                    )
                  )}
                </div>
              ) : (
                <Typography
                  className={classes.message}
                  variant="h5"
                  component="h2"
                >
                  No menu available yet!
                </Typography>
              )}
            </>
          )}
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  const { deleteMenuLoading } = state.Attendence;
  const userInfo = state.auth.userInfo || {};
  const userClasses = userInfo.user_classes || {};
  const selectRole = state.auth || {};
  return {
    deleteLoading: deleteMenuLoading,
    // class_id: userClasses.class_id,
    school_id: userClasses.school_id,
    selectedRole: selectRole.selectedRole,
  };
};

export default connect(mapStateToProps, { deleteMenuInList, lunchMenuAll })(
  MenuCard
);

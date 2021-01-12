import React from "react";
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

const useStyles = makeStyles((theme) => ({
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

function DishesCard() {
  const classes = useStyles();

  const dummyData = [
    {
      heading: "Sada Dosa",
      type: "Veg",
      image: MasalaDosaImg,
      desc: "Sada Dosa with Sambhar, Chutney and Bhaji.",
      price: "100",
    },
    {
      heading: "Chiken Tikka",
      type: "Non Veg",
      image: ChickenTikka,
      desc: "Sada Dosa with Sambhar, Chutney and Bhaji.",
      price: "100",
    },
    {
      heading: "Rava Dosa",
      type: "Veg",
      image: DosaImg,
      desc: "Sada Dosa with Sambhar, Chutney and Bhaji.",
      price: "150",
    },
    {
      heading: "Special Dosa",
      type: "Veg",
      image: MasalaDosaImg,
      desc: "Sada Dosa with Sambhar, Chutney and Bhaji.",
      price: "100",
    },
    {
      heading: "Sada Roti",
      type: "Veg",
      image: DosaImg,
      desc: "Sada Dosa with Sambhar, Chutney and Bhaji.",
      price: "300",
    },
    {
      heading: "Chicken Tikka Masala",
      type: "Non Veg",
      image: ChickenTikka,
      desc: "Sada Dosa with Sambhar, Chutney and Bhaji.",
      price: "200",
    },
  ];

  const handleEditDishes = () => {};

  return (
    <>
      {!dummyData ? (
        <Typography className={classes.message} variant="h5" component="h2">
          No dishes available yet!
        </Typography>
      ) : (
        <div className={classes.container}>
          {dummyData.map((item) => (
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
                      style={{fontSize:16}}
                    >
                      {item.heading}
                    </Typography>
                  </div>
                  <div className={classes.heading2}>
                    <div
                      className={
                        item.type === "Veg"
                          ? `${classes.circleGreen} ${classes.circle}`
                          : `${classes.circleRed} ${classes.circle}`
                      }
                    ></div>
                    <Typography
                      className={
                        item.type === "Veg"
                          ? `${classes.green} ${classes.heading}`
                          : `${classes.red} ${classes.heading}`
                      }
                      variant="h5"
                      component="h2"
                    >
                      {item.type}
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
                    alt="Contemplative Reptile"
                    height="50"
                    width="40"
                    image={item.image}
                    title="Contemplative Reptile"
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
                      {item.desc}
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
                      Price-{item.price}/-
                    </Typography>
                  </div>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <img
                  src={EditIcon}
                  className={classes.editBtn}
                  onClick={handleEditDishes}
                />
                <DeleteOutlineOutlinedIcon
                  className={classes.deleteBtn}
                  fontSize={"medium"}
                />
              </CardActions>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}

export default DishesCard;

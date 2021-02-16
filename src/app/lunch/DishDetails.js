import React, { useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import BackIcon from "../../assets/images/Back.svg";
import { connect } from "react-redux";
import { menuDishDetails } from "../redux/actions/attendence.action";
import { CircularProgress } from "@material-ui/core";
import { useHistory, useParams } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    // margin: "15px 15px 0 15px",
    width: "100%",
    paddingBottom: "10px",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      margin: "15px 15px 0 15px",
    },
  },
  container: {
    display: "flex",
    // width: "100%",
    margin:'20px',
    justifyContent:'center',
    flexWrap: "wrap",
    marginBottom: "75px",
  },
  bachBtn: {
    marginLeft: "0",
    width: "19px",
    height: "19px",
    paddingLeft: "3px",
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
  },
  img: {
    height: "100px",
    width: "120px",
    marginRight: "15px",
    marginTop: "15px",
  },
  media: {
    display: "flex",
    flexWrap: "wrap",
  },
  header: {
    display: "flex",
    paddingBottom: "15px",
    justifyContent: "flex-start",
    float: "right",
  },
  heading: {
    fontFamily: "Avenir medium",
    fontSize: 16,
  },
  heading1: {
    width: "80%",
  },
  heading2: {
    width: "20%",
    display: "flex",
    justifyContent: "flex-end",
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
  },
  cardHeader: {
    display: "flex",
  },
  content: {
    fontSize: 14,
    fontFamily: "Avenir",
    color:'black'
  },
  contentCard: {
    display: "flex",
    width: "100%",
    // marginBottom: "10px",
  },
  description: {
    width: "80%",
  },
  price: {
    display: "flex",
    justifyContent: "flex-end",
    width: "20%",
  },
  cardAction: {
    position: "absolute",
    left: "3px",
  },
  actionHead: {
    fontFamily: "Avenir medium",
    fontSize: 18,
  },
  actionArea: {
    display: "flex",
    paddingTop: "15px",
    paddingBottom: "15px",
  },
  CircularProgress: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "50px",
  },
}));

function DishDetails(props) {
  const IMAGE_BASE_URL = process.env.REACT_APP_BACKEND_IMAGE_URL;
	const { id } = useParams()
  const classes = useStyles();
  const history = useHistory()
  const { data, loading, class_id, school_id } = props;
  const dishImages = data[0] ? data[0].lunch_images : [];
  let status = data[0] ? data[0].status : "";

  console.log("details data", data);

  const fetchData = () => {
    props.menuDishDetails(id);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={classes.container}>
      {loading ? (
        <div className={classes.CircularProgress}>
          <CircularProgress />
        </div>
      ) : (
        <Card className={classes.root}>
          <CardActionArea className={classes.actionArea}>
            <CardActions className={classes.cardAction}>
              <img
                src={BackIcon}
                className={classes.bachBtn}
                onClick={() => history.replace('/lunch')}
              />
            </CardActions>
            <div>
              <Typography className={classes.actionHead}>
                Dish Details
              </Typography>
            </div>
          </CardActionArea>
          <CardContent
            style={{
              display: "flex",
              flexDirection: "column",
              paddingTop: "5px",
              paddingBottom: "5px",
            }}
          >
            <div className={classes.desc}>
              <div className={classes.header}>
                <div className={classes.heading1}>
                  <Typography
                    className={classes.heading}
                    variant="h5"
                    component="h2"
                  >
                    {data[0] ? data[0].name : ""}
                  </Typography>
                </div>
                <div className={classes.heading2}>
                  <div
                    className={
                      status === "Veg"
                        ? `${classes.circleGreen} ${classes.circle}`
                        : `${classes.circleRed} ${classes.circle}`
                    }
                  ></div>
                  <Typography
                    className={classes.heading}
                    className={
                      status === "Veg"
                        ? `${classes.green} ${classes.heading}`
                        : `${classes.red} ${classes.heading}`
                    }
                    variant="h5"
                    component="h2"
                  >
                    {status === "Veg" ? "Veg" : "Non Veg"}
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
                    {data[0] ? data[0].description : ""}
                  </Typography>
                </div>
                <div className={classes.price}>
                  <Typography
                    className={classes.content}
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Price - ₹{data[0] ? data[0].price : ""}/-
                  </Typography>
                </div>
              </div>
            </div>
            <div className={classes.media}>
              {dishImages.map((item) => (
                <CardMedia
                  className={classes.img}
                  component="img"
                  alt="Contemplative Reptile"
                  height="50"
                  width="40"
                  image={`${IMAGE_BASE_URL}/${item.img_path}/${item.img_name}`}
                  title="Contemplative Reptile"
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// export default DishDetails;

const mapStateToProps = (state) => {
  const { menuDishDetails = [], menuDishDetailsLoading } = state.Attendence;
  const userInfo = state.auth.userInfo || {};
  const userClasses = userInfo.user_classes || {};
  return {
    data: menuDishDetails,
    loading: menuDishDetailsLoading,
    class_id: userClasses.class_id,
    school_id: userClasses.school_id,
  };
};

export default connect(mapStateToProps, { menuDishDetails })(DishDetails);

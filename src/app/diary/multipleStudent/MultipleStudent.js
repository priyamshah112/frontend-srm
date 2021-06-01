import React, { useState, useEffect } from "react";
import AddIcon from "../../../assets/images/Filled Add.svg";
import { Typography, makeStyles } from "@material-ui/core";
import MultiStudentCard from "./MultiStudentCard";
import { connect } from "react-redux";
import { postDiaryMultiple } from "../../redux/actions/attendence.action";
import BackdropLoader from "../../common/ui/backdropLoader/BackdropLoader";
import { useHistory } from "react-router-dom";
import { getDiaryMultiple } from "../../redux/actions/attendence.action";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
    overflow: "auto",
  },
  formControl: {
    marginTop: "8px",
    marginRight: "15px",
    width: "169px",
    position: "absolute",
    left: "20px",
  },

  header: {
    // position: "relative",
    display: "flex",
    flexDirection: "column",
    paddingRight: "20px",
    paddingLeft: "20px",
    paddingTop: "20px",
    // textAlign: "left",
    justifyContent: "center",
  },

  addNew: {
    color: theme.palette.common.deluge,
    // position: "absolute",
    // right: "20px",
    // marginTop: "15px",
    // marginRight: "20px",
    width: "70px",
    cursor: "pointer",
    "& .new": {
      float: "right",
      fontSize: "14px",
      padding: "5px 5px 0 5px",
    },
    "& img": {
      margin: "5px 5px 0 5px",
      height: "20px",
      cursor: "pointer",
    },
  },

  menuContainer: {
    backgroundColor: theme.palette.common.darkGray,
    color: "black",
    minWidth: "150px",
    "&.MuiPaper-rounded": {
      boxShadow: "0px 6px 6px #00000029",
    },
    [theme.breakpoints.down("md")]: {
      minWidth: "150px",
    },
    [theme.breakpoints.down("sm")]: {
      minWidth: "150px",
    },
  },
  menuList: {
    width: "100% !important",
    padding: 0,
  },
  home: {
    // marginRight: "100px",
    fontFamily: "Avenir medium",
    fontSize: 18,
    textAlign: "center",
  },
  fieldStyle: {
    width: "185px",
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
    ".MuiInputBase-input": {
      color: "#eaeaea",
    },
  },
  newContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "15px",
  },
}));

function MultipleStudent(props) {
  const classes = useStyles();
  const history = useHistory();
  const { loading, selectedRole } = props;
  const [data, setData] = useState([]);
  const [paginationInfo, setInfo] = useState({});
  const [dataLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  console.log("data :>> ", data, paginationInfo);
  const handleSuccess = (result) => {
    history.push(`/multiple-student/edit/${result.data.id}`);
  };
  const handleNewOpen = () => {
    props.postDiaryMultiple(handleSuccess);
  };

  const onSuccess = (result) => {
    console.log("result :>> ", result);
    if (result) {
      setLoading(false);
      setData([...data, ...result.data.data]);
      setInfo(result.data);
    }
  };
  const fetchData = (currentPage) => {
    if (currentPage) {
      props.getDiaryMultiple(currentPage, onSuccess);
    } else {
      const page = 1;
      props.getDiaryMultiple(page, onSuccess);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleLoadMore = (e) => {
    // console.log("event", e);
    // console.log("clientHeigh :>> ", e.target.clientHeigh);
    // console.log("scrollTop :>> ", e.target.scrollTop);
    // console.log("scrollHeight :>> ", e.target.scrollHeight);
    let bottom =
      e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop < 20;
    console.log("bottom :>> ", bottom);
    if (paginationInfo.last_page > currentPage) {
      if (bottom && !dataLoading) {
        console.log("paginationInfo :>> ", paginationInfo);
        let page = currentPage + 1;
        fetchData(page);
        setLoading(true);
        setCurrentPage(page);
      }
    }
  };

  return (
    <>
      {loading ? (
        <BackdropLoader open={loading} />
      ) : (
        <div onScroll={handleLoadMore} className={classes.container}>
          <div className={classes.header}>
            <div className={classes.home}>Diary</div>
            <div className={classes.newContainer}>
              <div className={classes.addNew} onClick={handleNewOpen}>
                <img src={AddIcon} alt="add" />
                <Typography className="new">New</Typography>
              </div>
            </div>
          </div>
          <MultiStudentCard data={data} dataLoading={dataLoading} />
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  const { postDiaryMultipleLoading, classesLoading } = state.Attendence;
  const userInfo = state.auth.userInfo || {};
  const userClasses = userInfo.user_classes || {};
  return {
    loading: postDiaryMultipleLoading,
    classesLoading: classesLoading,
    selectedRole: state.auth.selectedRole,
    school_id: userClasses.school_id,
  };
};

export default connect(mapStateToProps, {
  postDiaryMultiple,
  getDiaryMultiple,
})(MultipleStudent);

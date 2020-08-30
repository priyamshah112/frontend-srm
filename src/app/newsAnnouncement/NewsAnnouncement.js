import React, { useEffect, useState } from "react";
import { useLocation, useRouteMatch, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import AnnouncementSection from "./AnnouncementSection";
import AnnouncementService from "./AnnouncementService";
import Box from "@material-ui/core/Grid";
import CreateAnnouncement from "./teacher/CreateAnnouncement";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    backgroundColor: theme.palette.mainBackground,
    height: "100%",
    marign: "0",
    padding: "0",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  content: {
    flexGrow: "1",
    display: "flex",
    flexDirection: "column",
    minHeight: "0",
    padding: "0 20px 20px 20px",
  },
  panel: {
    flexGrow: "1",
    overflow: "auto",
    minHeight: "100%",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
}));
const NewsAnnouncement = (props) => {
  const classes = useStyles();
  const location = useLocation();
  const { id } = useParams();
  const [classState, setClassState] = useState(null);
  const [category, setcategory] = useState(null);
  const [isClassLoading, setIsClassLoading] = useState(true);
  useEffect(() => {
    const fetchClasses = async () => {
      const classesResponse = await AnnouncementService.fetchClasses(
        props.token
      );
      let initialClassState = {};
      classesResponse.data.data.forEach((className) => {
        initialClassState[className.class_name] = false;
      });

      const categoryResponse = await AnnouncementService.fetchCategories(
        props.token
      );
      let categoryList = {};
      categoryResponse.data.data.forEach((categoryData) => {
        categoryList[categoryData.category_name] = categoryData.id;
      });
      setcategory({ ...categoryList });
      setClassState({ ...initialClassState });
    };
    if (location.pathname === `/create-announcement/${id}`) {
      fetchClasses();
    }
  }, []);
  useEffect(() => {
    if (classState !== null && category != null) {
      setIsClassLoading(false);
    }
  }, [classState, category]);

  return (
    <div className={classes.container} id="scrollable">
      {location.pathname === "/news" ? (
        <AnnouncementSection />
      ) : location.pathname === `/create-announcement/${id}` &&
        isClassLoading === false ? (
        <Box p={3}>
          <CreateAnnouncement classState={classState} categories={category} />
          <br />
          <br />
          <br />
        </Box>
      ) : (
        ""
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(NewsAnnouncement);

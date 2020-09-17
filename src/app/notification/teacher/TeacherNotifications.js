import React, { useState, useRef, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { makeStyles, AppBar, Tabs, Tab, Box } from "@material-ui/core";
import { connect } from "react-redux";
import TeacherNotificationsContainer from "./TeacherNotificationsContainer";
import NotificationCard from "../NotificationCard";
import CreateNotification from "./CreateNotification";
import AnnouncementService from "../../newsAnnouncement/AnnouncementService";

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
  notificationContainer: {
    width: "95%",
    height: "auto",
    margin: "0 auto 100px",
    padding: 0,
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

  tabBar: {
    backgroundColor: theme.palette.mainBackground,
    color: theme.palette.common.deluge,
    boxShadow: "none",
    // '& .Mui-selected': {
    //   borderBottomWidth: '3px',
    // },
  },

  eventsTab: {
    padding: "6px 0px",
    borderBottom: "1px solid #aeaeb2",

    "& .MuiTab-wrapper": {
      height: "30px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "11px",
    },
  },

  borderRight: {
    "& .MuiTab-wrapper": {
      borderRight: "1px solid  #aeaeb2",
    },
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const TeacherNotifications = (props) => {
  const classes = useStyles();
  const location = useLocation();
  const { id } = useParams();
  const [value, setValue] = useState(0);
  const tabref = useRef(null);
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
        initialClassState[className.class_name] = className.id;
      });

      const categoryResponse = await AnnouncementService.fetchCategories(
        props.token,
        "notifications"
      );
      let categoryList = {};
      categoryResponse.data.data.forEach((categoryData) => {
        categoryList[categoryData.id] = categoryData.category_name;
      });
      console.log(categoryList);
      setcategory({ ...categoryList });
      setClassState({ ...initialClassState });
    };
    if (location.pathname === `/create-notification/${id}`) {
      fetchClasses();
    }
  }, []);

  useEffect(() => {
    if (classState !== null && category !== null) {
      setIsClassLoading(false);
    }
  }, [classState, category]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.container}>
      {location.pathname === "/notifications" ? (
        <>
          <AppBar position="sticky" className={classes.tabBar}>
            <Tabs
              centered
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab
                label="For me"
                {...a11yProps(0)}
                className={`${classes.eventsTab} ${classes.borderRight}`}
              />
              <Tab
                label="By me"
                {...a11yProps(1)}
                className={classes.eventsTab}
              />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <TeacherNotificationsContainer key={0} created_by={false} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TeacherNotificationsContainer key={1} created_by={true} />
          </TabPanel>
          <br />
          <br />
          <br />
        </>
      ) : location.pathname === `/create-notification/${id}` &&
        isClassLoading === false ? (
        <Box>
          <CreateNotification categories={category} classState={classState} />
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
    selectedRole: state.auth.selectedRole,
    token: state.auth.token,
  };
};
export default connect(mapStateToProps)(TeacherNotifications);

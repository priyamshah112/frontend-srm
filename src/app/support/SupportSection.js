import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { AppBar, Tabs, Tab, Box } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import SupportDetails from "./SupportDetails";
import SupportComments from "./SupportComments";
import SupportHistory from "./SupportHistory";
import { connect } from "react-redux";
import { getSingleSupport } from "../redux/actions/support.action";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyle = makeStyles((theme) => ({
  container: {
    width: "100%",
    backgroundColor: theme.palette.mainBackground,
    height: "100%",
    marign: "0",
    padding: "0",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: 0,
    },
  },
  supportContainer: {
    width: "95%",
    height: "100%",
    margin: "0 auto",
  },
  commentsSection: {
    marginTop: "30px",
  },
  appbarRoot: {
    backgroundColor: theme.palette.common.white,
    boxShadow: "none",
    color: theme.palette.common.blackRussian,
    borderTopLeftRadius: "3px",
    borderTopRightRadius: "3px",
  },
  tabBar: {
    backgroundColor: theme.palette.common.white,
    boxShadow: "none",
  },

  eventsTab: {
    padding: "6px 0px",
    borderBottom: "1px solid #aeaeb2",
    fontWeight: 500,

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

const SupportSection = (props) => {
  const [supportData, setSupportData] = useState({});
  const [error, setError] = useState("");
  const [value, setValue] = useState(0);

  const { id } = useParams();
  const classes = useStyle();
  const history = useHistory();

  useEffect(() => {
    props.getSingleSupport(id, onGet, onGetFail);
  }, []);

  const onGet = (data = {}) => {
    setSupportData(data.data || {});
  };

  const onGetFail = (err = {}) => {
    setError(err.message || "Something Went Wrong");
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const addNewComment = (comment) => {
    const comment_lists = [...supportData.comment_lists];
    comment_lists.push(comment);
    setSupportData({ ...supportData, comment_lists });
  };

  return (
    <div className={classes.container}>
      <div className={classes.supportContainer}>
        <SupportDetails
          data={supportData || {}}
          loading={props.loading}
          id={id}
        />
        {supportData.status !== "draft" && (
          <div className={classes.commentsSection}>
            <AppBar
              position="static"
              className={classes.tabbar}
              classes={{ root: classes.appbarRoot }}
            >
              <Tabs
                centered
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                variant="fullWidth"
              >
                <Tab
                  label="Comments"
                  {...a11yProps(0)}
                  className={`${classes.eventsTab} ${classes.borderRight}`}
                />
                <Tab
                  label="History"
                  {...a11yProps(1)}
                  className={classes.eventsTab}
                />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              <SupportComments
                onComment={addNewComment}
                id={id}
                data={supportData.comment_lists || []}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <SupportHistory data={supportData.history_lists || []} />
            </TabPanel>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ Supports }) => {
  const { singleSupportLoading } = Supports;
  return {
    loading: singleSupportLoading,
  };
};

export default connect(mapStateToProps, { getSingleSupport })(SupportSection);

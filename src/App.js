import React, { useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";

import theme from "./app/common/ui/theme/Theme";
import Layout from "./hoc/Layout";
import * as authActions from "./app/auth/store/actions";
import LoginForm from "./app/auth/LoginForm";
import Register from "./app/auth/registration/Register";
import ChangePwd from "./app/auth/ChangePwd";
import Otp from "./app/auth/Otp";
import ChangePwdUser from "./app/auth/ChangePwdUser";
import RoleSelection from "./app/auth/RoleSelection";
import Home from "./app/home/Home";
import Notification from "./app/notification/Notification";
import NewsAnnouncement from "./app/newsAnnouncement/NewsAnnouncement";
import Assignment from "./app/Assignment/Assignment";
import NewsDetails from "./app/home/studentHome/NewsDetails";
import Announcements from "./app/home/studentHome/Announcements";
import Gallery from "./app/gallery/GalleryIndex";
import ImageUpload from "./app/gallery/ImageUpload";
import Profile from "./app/profile/Profile";
import Details from "./app/notification/Details";
import {
  requestFirebaseNotificationPermission,
  onMessageListener,
  tokenRefresh,
} from "./firebaseInit";
import "react-image-lightbox/style.css";
import Faq from "./app/faq/FaqContainer";
import FaqEditor from "./app/faq/teacher/FaqEditor";
import Support from "./app/support/Support";
import CreateSupport from "./app/support/CreateSupport";
import SupportSection from "./app/support/SupportSection";
import Leave from "./app/leave/LeaveContainer";
import LeaveCreateContainer from "./app/leave/LeaveCreateContainer";
import Attendance from "./app/Attendance/Attendance";
import Syllabus from "./app/syllabus/Syllabus";
import EditChapter from "./app/syllabus/teacher/editChapter";
import { Chat } from 'react-chat-popup';
import ChatFullScreen from "./app/chatUsers/ChatFullScreen";
import ReportContainer from "./app/report/student/ReportContainer";
// import StudentCard from "./app/report/student/StudentCard";
import StudentCard from "./app/report/student/StudentReport";
import ReportUpload from "./app/report/student/ReportUpload";
import TimeTable from "./app/timeTable/timeTable";

function App(props) {
  const { onAutoSignup } = props;

  useEffect(() => {
    onAutoSignup(props.isAuthenticated);
  }, [onAutoSignup, props.isAuthenticated]);
  if (props.isAuthenticated) {
    requestFirebaseNotificationPermission()
      .then((firebaseToken) => {
        // console.log(firebaseToken);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const protectedRoutes = () => (
    <>
      <Layout>
        <Switch>
          <Route path="/home" exact component={Home} />
          <Route path="/notifications" exact component={Notification} />
          <Route
            path="/create-notification/:id"
            exact
            component={Notification}
          />
          <Route path="/notifications/:id" exact component={Details} />
          <Route path="/news/:id" exact component={NewsDetails} />
          <Route
            path="/announcement"
            exact
            component={() => <Typography>announcement</Typography>}
          />
          <Route path="/assignment" exact component={Assignment} />
          <Route path="/create-homework/:id" exact component={Assignment} />

          <Route path="/attendance" exact component={Attendance} />
          <Route
            path="/events"
            exact
            component={() => <Typography>Events Home</Typography>}
          />
          <Route path="/news" exact component={NewsAnnouncement} />
          <Route
            path="/create-announcement/:id"
            exact
            component={NewsAnnouncement}
          />
          <Route path="/syllabus" exact component={Syllabus} />
          <Route path="/syllabus/:id/edit/:eid" exact component={EditChapter} />
          <Route
            path="/syllabus/add/:id/class/:classid"
            exact
            component={EditChapter}
          />
          <Route
            path="/transport"
            exact
            component={() => <Typography>Transport Home</Typography>}
          />

          <Route path="/gallery" exact component={Gallery} />
          <Route path="/gallery/upload" exact component={ImageUpload} />

          {/* <Route
            path="/curriculum"
            exact
            component={() => <Typography>Curriculum Home</Typography>}
          /> */}
          <Route
            path="/payments"
            exact
            component={() => <Typography>Payments Home</Typography>}
          />
          <Route
            path="/timetable"
            exact
            component={(TimeTable)}
          />
          <Route path="/leave/" exact component={Leave} />
          <Route path="/leave/create/" exact component={LeaveCreateContainer} />
          <Route path="/faq" exact component={Faq} />
          <Route path="/faq/create/" exact component={FaqEditor} />
          <Route path="/faq/edit/:id" exact component={FaqEditor} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/support" exact component={Support} />
          <Route path="/support/create" exact component={CreateSupport} />
          <Route path="/support/create/:id" exact component={CreateSupport} />
          <Route path="/support/:id" exact component={SupportSection} />
          <Route path="/chat" exact component={ChatFullScreen} />
          <Route path="/report" exact component={ReportContainer} />
          <Route path="/report-card" exact component={StudentCard} />
          <Route path="/report-upload" exact component={ReportUpload} />
        </Switch>
      </Layout>
    </>
  );
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route path="/" exact component={LoginForm} />
        <Route path="/login" exact component={LoginForm} />
        <Route path="/register" exact component={Register} />
        <Route path="/changepwd" exact component={ChangePwd} />
        <Route path="/otp" exact component={Otp} />
        <Route path="/changepwdotp" component={ChangePwdUser} />
        <Route path="/roleselection" component={RoleSelection} />


        <Route component={protectedRoutes} />
      </Switch>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAutoSignup: (isAuthenticated) =>
      dispatch(authActions.authCheckState(isAuthenticated)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

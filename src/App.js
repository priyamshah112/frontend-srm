import React, { useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';

import theme from './app/common/ui/theme/Theme';
import Layout from './hoc/Layout';
import * as authActions from './app/auth/store/actions';
import LoginForm from './app/auth/LoginForm';
import Register from './app/auth/registration/Register';
import ChangePwd from './app/auth/ChangePwd';
import Otp from './app/auth/Otp';
import ChangePwdUser from './app/auth/ChangePwdUser';
import RoleSelection from './app/auth/RoleSelection';
import Home from './app/home/Home';
import Notification from './app/notification/Notification';
import NewsAnnouncement from './app/newsAnnouncement/NewsAnnouncement';
import Assignment from './app/Assignment/Assignment';
import NewsDetails from './app/home/studentHome/NewsDetails';
import Announcements from './app/home/studentHome/Announcements';
import Gallery from './app/gallery/GalleryIndex';
import ImageUpload from './app/gallery/ImageUpload';
import Profile from './app/profile/Profile';

import 'react-image-lightbox/style.css';
import Faq from './app/faq/FaqContainer';
import FaqEditor from './app/faq/teacher/FaqEditor';
import Support from './app/support/Support';
import CreateSupport from './app/support/CreateSupport';
import SupportSection from './app/support/SupportSection';

function App(props) {
  const { onAutoSignup } = props;

  useEffect(() => {
    onAutoSignup(props.isAuthenticated);
  }, [onAutoSignup, props.isAuthenticated]);

  const protectedRoutes = () => (
    <>
      <Layout>
        <Switch>
          <Route path='/home' exact component={Home} />
          <Route path='/notifications' exact component={Notification} />
          <Route
            path='/create-notification/:id'
            exact
            component={Notification}
          />
          <Route path='/news/:id' exact component={NewsDetails} />
          <Route
            path='/announcement'
            exact
            component={() => <Typography>announcement</Typography>}
          />
          <Route path='/assignment' exact component={Assignment} />
          <Route path='/create-homework/:id' exact component={Assignment} />

          <Route
            path='/attendance'
            exact
            component={() => <Typography>Attendance Home</Typography>}
          />
          <Route
            path='/events'
            exact
            component={() => <Typography>Events Home</Typography>}
          />
          <Route path='/news' exact component={NewsAnnouncement} />
          <Route
            path='/create-announcement/:id'
            exact
            component={NewsAnnouncement}
          />
          <Route
            path='/syllabus'
            exact
            component={() => <Typography>Syllabus Home</Typography>}
          />
          <Route
            path='/transport'
            exact
            component={() => <Typography>Transport Home</Typography>}
          />

          <Route path='/gallery' exact component={Gallery} />
          <Route path='/gallery/upload' exact component={ImageUpload} />

          <Route
            path='/curriculum'
            exact
            component={() => <Typography>Curriculum Home</Typography>}
          />
          <Route
            path='/payments'
            exact
            component={() => <Typography>Payments Home</Typography>}
          />
          <Route
            path='/timetable'
            exact
            component={() => <Typography>Timetable Home</Typography>}
          />
          <Route
            path='/leave'
            exact
            component={() => <Typography>Leave Home</Typography>}
          />
          <Route path='/faq' exact component={Faq} />
          <Route path='/faq/create/' exact component={FaqEditor} />
          <Route path='/faq/edit/:id' exact component={FaqEditor} />
          <Route path='/profile' exact component={Profile} />
          <Route path='/support' exact component={Support} />
          <Route path='/create-support/:id' exact component={CreateSupport} />
          <Route path='/support/:id' exact component={SupportSection} />
        </Switch>
      </Layout>
    </>
  );
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route path='/' exact component={LoginForm} />
        <Route path='/login' exact component={LoginForm} />
        <Route path='/register' exact component={Register} />
        <Route path='/changepwd' exact component={ChangePwd} />
        <Route path='/otp' exact component={Otp} />
        <Route path='/changepwdotp' component={ChangePwdUser} />
        <Route path='/roleselection' component={RoleSelection} />

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

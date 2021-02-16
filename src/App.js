import React, { useEffect } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import theme from './app/common/ui/theme/Theme'
import Layout from './hoc/Layout'
import * as authActions from './app/auth/store/actions'
import LoginForm from './app/auth/LoginForm'
import Register from './app/auth/registration/Register'
import ChangePwd from './app/auth/ChangePwd'
import Otp from './app/auth/Otp'
import ChangePwdUser from './app/auth/ChangePwdUser'
import RoleSelection from './app/auth/RoleSelection'
import Home from './app/home/Home'
import Notification from './app/notification/Notification'
import NewsAnnouncement from './app/newsAnnouncement/NewsAnnouncement'
import Transport from './app/Transport/Transport'
import Assignment from './app/Assignment/Assignment'
import NewsDetails from './app/home/studentHome/NewsDetails'
import Gallery from './app/gallery/Gallery'
import FileMove from './app/gallery/fileMove'
import Payments from './app/payments/Payments'
import PaymentDetails from './app/payments/PaymentDetails'
import ImageUpload from './app/gallery/ImageUpload'
import Profile from './app/profile/Profile'
import Details from './app/notification/Details'
import { requestFirebaseNotificationPermission } from './firebaseInit'
import 'react-image-lightbox/style.css'
import Faq from './app/faq/FaqContainer'
import FaqEditor from './app/faq/teacher/FaqEditor'
import Support from './app/support/Support'
import CreateSupport from './app/support/CreateSupport'
import SupportSection from './app/support/SupportSection'
import Leave from './app/leave/LeaveContainer'
import LeaveCreateContainer from './app/leave/LeaveCreateContainer'
import Attendance from './app/Attendance/Attendance'
import Planning from './app/planning/Planning'
import CreatePlanning from './app/planning/teacher/createPlanning'
import ChatFullScreen from './app/chatUsers/ChatFullScreen'
import ReportContainer from './app/report/student/ReportContainer'
import StudentCard from './app/report/student/StudentCard'
import ReportUpload from './app/report/student/ReportUpload'
import AttendanceUpload from './app/Attendance/teacherAttendance/AttendanceUpload'
import DateSheet from './app/dateSheet/dateSheet'
import UpdateGroupUsers from './app/chatUsers/UpdateGroupUsers'
import { paths } from './Constants/Routes'
import WeeklyTimeTable from './app/weeklyTimeTable/teacher/WeeklyTimeTable'
import Diary from './app/diary/teacher/Diary'
import Library from './app/diary/library/Library'
import AddBook from './app/diary/library/AddBook'
import HolidayCalender from './app/diary/teacher/HolidayCalender'
import Miscellaneous from './app/diary/teacher/Miscellaneous'
import MultipleStudent from './app/diary/multipleStudent/MultipleStudent'
import Dishes from './app/lunch/Dishes'
import Menu from './app/lunch/Menu'
import DishDetails from './app/lunch/DishDetails'
import MiscellDetails from './app/diary/teacher/MiscellDetails'
import AddNewMulti from './app/diary/multipleStudent/AddNewMulti'
import MultiDiaryDetails from './app/diary/multipleStudent/MultiDiaryDetails'
import TabBar from './app/diary/TabBar'
import NewDiaryEntry from './app/diary/teacher/NewDiaryEntry'
import DiaryDetails from './app/diary/teacher/DiaryDetails'
import StudentDiary from './app/diary/StudentDiary'

function App(props) {
  const { onAutoSignup } = props;

  useEffect(() => {
    onAutoSignup(props.isAuthenticated);
  }, [onAutoSignup, props.isAuthenticated]);
  if (props.isAuthenticated) {
    requestFirebaseNotificationPermission()
      .then((firebaseToken) => {
        console.log(firebaseToken);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const protectedRoutes = () => (
    <>
      <Layout>
        <Switch>
          <Route path={paths.HOME} exact component={Home} />
          <Route path={paths.NOTIFICATIONS} exact component={Notification} />
          <Route
            path={`${paths.CREATE_NOTIFICATIONS}/:id`}
            exact
            component={Notification}
          />
          <Route
            path={`${paths.NOTIFICATIONS}/:id`}
            exact
            component={Details}
          />
          <Route path={`${paths.NEWS}/:id`} exact component={NewsDetails} />
          <Route
            path={paths.ANNOUNCEMENT}
            exact
            component={() => <Typography>announcement</Typography>}
          />
          <Route path={paths.ASSIGNMENT} exact component={Assignment} />
          <Route
            path={`${paths.CREATE_HOMEWORK}/:id`}
            exact
            component={Assignment}
          />
          <Route path={paths.ATTENDANCE} exact component={Attendance} />
          <Route
            path={paths.ATTENDANCE_UPLOAD}
            exact
            component={AttendanceUpload}
          />
          <Route
            path={paths.EVENTS}
            exact
            component={() => <Typography>Events Home</Typography>}
          />
          <Route path={paths.NEWS} exact component={NewsAnnouncement} />
          <Route
            path={`${paths.CREATE_ANNOUNCEMENT}/:id`}
            exact
            component={NewsAnnouncement}
          />
          <Route path={paths.PLANNING} exact component={Planning} />
          <Route
            path={`${paths.CREATE_PLANNING}/:id`}
            exact
            component={Planning}
          />
          {/* <Route
						path={`${paths.PLANNING}/edit/:id/class/:classid`}
						exact
						component={EditChapter}
					/> */}
					<Route path={paths.TRANSPORT} exact component={Transport} />
					<Route path={paths.GALLERY} exact component={Gallery} />
					<Route path={paths.GALLERY_UPLOAD} exact component={ImageUpload} />
					<Route path={paths.GALLERY_MOVE} exact component={FileMove} />
					<Route path={paths.PAYMENTS} exact component={Payments} />
					<Route
						path={`${paths.PAYMENTS}/:id`}
						exact
						component={PaymentDetails}
					/>
					<Route path={paths.DATE_SHEET} exact component={DateSheet} />
					<Route path={paths.LEAVE} exact component={Leave} />
					<Route
						path={paths.CREATE_LEAVE}
						exact
						component={LeaveCreateContainer}
					/>
					<Route path={paths.FAQ} exact component={Faq} />
					<Route path={`${paths.CREATE_FAQ}/:id`} exact component={FaqEditor} />
					<Route path={`${paths.FAQ_EDIT}/:id`} exact component={FaqEditor} />
					<Route path={paths.PROFILE} exact component={Profile} />
					<Route path={paths.SUPPORT} exact component={Support} />
					<Route path={paths.CREATE_SUPPORT} exact component={CreateSupport} />
					<Route
						path={`${paths.CREATE_SUPPORT}/:id`}
						exact
						component={CreateSupport}
					/>
					<Route
						path={`${paths.SUPPORT}/:id`}
						exact
						component={SupportSection}
					/>
					<Route path={paths.CHAT} exact component={ChatFullScreen} />
					<Route path={paths.REPORT} exact component={ReportContainer} />
					<Route path={paths.REPORT_CARD} exact component={StudentCard} />
					<Route path={paths.REPORT_UPLOAD} exact component={ReportUpload} />
					<Route path={`${paths.CHAT}/:id`} exact component={ChatFullScreen} />
					<Route path={paths.UPDATE_GROUP} exact component={UpdateGroupUsers} />
					<Route
						path={paths.WEEKLY_TIME_TABLE}
						exact
						component={WeeklyTimeTable}
					/>
					<Route path={`/library/:student_id/edit/:id`} exact component={AddBook} />
					<Route path='/holiday-calender' exact component={HolidayCalender} />
					<Route path='/miscellaneous' exact component={Miscellaneous} />
					<Route path={`/miscellaneous/:id`} exact component={MiscellDetails} />
					<Route path='/multiple-student' exact component={MultipleStudent} />
					<Route path={`/multiple-student/:id`} exact component={MultiDiaryDetails} />
					<Route path={`/multiple-student/edit/:id`} exact component={AddNewMulti} />
					<Route path='/dishes' exact component={Dishes} />
					<Route path='/menu' exact component={Menu} />
					<Route path={`/menu/:id`} exact component={DishDetails} />
					<Route path='/lunch' exact component={Menu} />
					<Route path={`/lunch/:id`} exact component={DishDetails} />
					{props.selectedRole==="teacher" || props.selectedRole==="admin"?
					<>
					{/* <Route path='/diary-entry' exact component={Diary} /> */}
					<Route path='/individual-diary' exact component={Diary} />
					<Route path={`/diary/:id`} exact component={TabBar} />
					<Route path={`/diary/:student_id/diary-details/:id`} exact component={DiaryDetails} />
					<Route path={`/diary/:student_id/edit/:id`} exact component={NewDiaryEntry} />
					<Route path={`/library/:studentId`} exact component={Library} />
					</>:<>
					<Route path='/individual-diary' exact component={Diary} />
					{props.selectedRole==="parent"?<Route path={`/diary`} exact component={TabBar} />:<Route path={`/diary`} exact component={StudentDiary} />}
					<Route path={`/diary/diary-details/:id`} exact component={DiaryDetails} />
					<Route path={`/diary/edit/:id`} exact component={NewDiaryEntry} />
					<Route path={`/library`} exact component={Library} />
					</>}
					

				</Switch>
			</Layout>
		</>
	)
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
    selectedRole: state.auth.selectedRole,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAutoSignup: (isAuthenticated) =>
      dispatch(authActions.authCheckState(isAuthenticated)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

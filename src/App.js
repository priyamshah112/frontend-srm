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
import Settings from './app/settings'
import HomeworkLimit from './app/settings/homework/homeworkLimit'
import SelectHomework from './app/Assignment/SelectHomework'
import FeedbackHomework from './app/Assignment/teacher/feedbackHomework'
import SeenTab from './app/Assignment/teacher/seenContainer'
import CreatePayment from './app/payments/teacher/CreatePayment'
import NewPayment from './app/payments/teacher/NewPayment'
import CreatePaymentDetails from './app/payments/teacher/CreatePaymentDetails'
import ManuallyPay from './app/payments/teacher/ManuallyPay'
import MiscellUpdate from './app/diary/teacher/MiscellUpdate'
import StudentProfile from './app/diary/Profile'
import Leaves from './app/diary/Leaves'
import AssignmentReport from './app/adminReport/assignment/Assignment'
import CreateAssignment from './app/adminReport/assignment/CreateAssignment'
import AssignmentDetails from './app/adminReport/assignment/AssignmentDetails'
import NewsReport from './app/adminReport/news/News'
import CreateNews from './app/adminReport/news/CreateNews'
import NewsReportDetails from './app/adminReport/news/NewsDetails'
import AttendanceReport from './app/adminReport/attendance/Attendance'
import CreateAttendanceReport from './app/adminReport/attendance/CreateAttendance'
import AttendanceReportDetails from './app/adminReport/attendance/AttendanceDetails'
import PaymentReport from './app/adminReport/payment/Payment'
import CreatePaymentReport from './app/adminReport/payment/CreatePayment'
import PaymentReportDetails from './app/adminReport/payment/PaymentDetails'

function App(props) {
  const { onAutoSignup } = props

  useEffect(() => {
    onAutoSignup(props.isAuthenticated)
  }, [onAutoSignup, props.isAuthenticated])
  if (props.isAuthenticated) {
    requestFirebaseNotificationPermission()
      .then((firebaseToken) => {
        console.log(firebaseToken)
      })
      .catch((e) => {
        console.log(e)
      })
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
            path={`${paths.ASSIGNMENT}${paths.VIEW}`}
            exact
            component={SelectHomework}
          />
          <Route
            path={`${paths.ASSIGNMENT}${paths.DETAILS}`}
            exact
            component={FeedbackHomework}
          />
          <Route path={`${paths.ASSIGNMENT}/:id`} exact component={SeenTab} />
          <Route
            path={`${paths.CREATE_HOMEWORK}/:id`}
            exact
            component={Assignment}
          />
          <Route path={paths.SETTINGS} exact component={Settings} />
          <Route
            path={`${paths.SETTINGS}${paths.HOMEWORK}/:id`}
            exact
            component={HomeworkLimit}
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
          <Route path="/create-payment" exact component={CreatePayment} />

          {/* report routes below */}
          <Route path="/assignment-report" exact component={AssignmentReport} />
          <Route
            path={`/assignment-report/edit/:id`}
            exact
            component={CreateAssignment}
          />
          <Route
            path={`/assignment-report/details/:id`}
            exact
            component={AssignmentDetails}
          />

          <Route path="/news-report" exact component={NewsReport} />
          <Route path={`/news-report/edit/:id`} exact component={CreateNews} />
          <Route
            path={`/news-report/details/:id`}
            exact
            component={NewsReportDetails}
          />

          <Route path="/attendance-report" exact component={AttendanceReport} />
          <Route
            path={`/attendance-report/edit/:id`}
            exact
            component={CreateAttendanceReport}
          />
          <Route
            path={`/attendance-report/details/:id`}
            exact
            component={AttendanceReportDetails}
          />

          <Route path="/payment-report" exact component={PaymentReport} />
          <Route
            path={`/payment-report/edit/:id`}
            exact
            component={CreatePaymentReport}
          />
          <Route
            path={`/payment-report/details/:id`}
            exact
            component={PaymentReportDetails}
          />

          {/* report routes above */}

          <Route
            path={`/view-payment/tab/:selectedTab`}
            exact
            component={Payments}
          />
          <Route
            path={`/create-payment/payment-details/:id`}
            exact
            component={CreatePaymentDetails}
          />
          <Route
            path={`/create-payment/payment/:id`}
            exact
            component={ManuallyPay}
          />
          <Route
            path={`/create-payment/edit/:id`}
            exact
            component={NewPayment}
          />
          <Route
            path={`${paths.PAYMENTS}/tab/:selectedTab`}
            exact
            component={Payments}
          />
          <Route
            path={`${paths.PAYMENTS}/tab/:selectedTab/:id`}
            exact
            component={PaymentDetails}
          />
          <Route path={paths.DATE_SHEET} exact component={DateSheet} />
          <Route path={paths.LEAVE} exact component={Leave} />
          <Route path="/student-leaves" exact component={Leave} />
          <Route
            path={paths.CREATE_LEAVE}
            exact
            component={LeaveCreateContainer}
          />
          <Route path={paths.FAQ} exact component={Faq} />
          <Route path={`${paths.CREATE_FAQ}/:id`} exact component={FaqEditor} />
          <Route path={`${paths.FAQ_EDIT}/:id`} exact component={FaqEditor} />
          <Route path={paths.PROFILE} exact component={Profile} />
          <Route path="/students-profile" exact component={Profile} />
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
          <Route
            path={`/student-profile/:id`}
            exact
            component={StudentProfile}
          />
          <Route path={`/student-leave/:id`} exact component={Leaves} />
          <Route path="/diary-entry" exact component={Diary} />
          <Route
            path={`/diary/:id/tab/:selectedTab`}
            exact
            component={TabBar}
          />
          <Route
            path={`/diary/tab/:selectedTab/diary-details/:id`}
            exact
            component={DiaryDetails}
          />
          <Route
            path={`/diary/:student_id/edit/:id`}
            exact
            component={NewDiaryEntry}
          />
          <Route path="/holiday-calender" exact component={HolidayCalender} />
          <Route path="/miscellaneous" exact component={Miscellaneous} />
          <Route path={`/miscellaneous/:id`} exact component={MiscellDetails} />
          <Route
            path={`/miscellaneous/:id/edit`}
            exact
            component={MiscellUpdate}
          />
          <Route path="/multiple-student" exact component={MultipleStudent} />
          <Route
            path={`/multiple-student/:student_id/tab/:selectedTab/details/:id`}
            exact
            component={MultiDiaryDetails}
          />
          <Route
            path={`/multiple-student/edit/:id`}
            exact
            component={AddNewMulti}
          />
          <Route
            path={`/diary/diary-details/:id`}
            exact
            component={DiaryDetails}
          />
          <Route path="/dishes" exact component={Dishes} />
          <Route path="/menu" exact component={Menu} />
          <Route path={`/menu/:id`} exact component={DishDetails} />
          <Route path="/lunch" exact component={Menu} />
          <Route path={`/lunch/:id`} exact component={DishDetails} />
          <Route path={`/library`} exact component={Library} />
          {props.selectedRole === 'teacher' ||
          props.selectedRole === 'admin' ? (
            <>
              <Route
                path={`${paths.DIARY}/tab/:selectedTab`}
                exact
                component={TabBar}
              />
              {/* <Route path='/diary-entry' exact component={Diary} /> */}
              <Route path="/individual-diary" exact component={Diary} />
              <Route
                path={`/diary/:id/tab/:selectedTab`}
                exact
                component={TabBar}
              />
              <Route path="/student-profile" exact component={StudentProfile} />
              <Route path="/student-leave" exact component={Leaves} />

              <Route
                path={`/diary/:student_id/tab/:selectedTab/diary-details/:id`}
                exact
                component={DiaryDetails}
              />
              <Route
                path={`/diary/:student_id/edit/:id`}
                exact
                component={NewDiaryEntry}
              />
              {/*<Route path='/library' exact component={Diary} />*/}
              <Route path={`/library/:studentId`} exact component={Library} />
              <Route
                path={`/library/:studentId/edit/:id`}
                exact
                component={AddBook}
              />
            </>
          ) : (
            <>
              <Route path="/individual-diary" exact component={Diary} />
              {props.selectedRole === 'parent' ? (
                <Route
                  path={`/diary/tab/:selectedTab`}
                  exact
                  component={TabBar}
                />
              ) : (
                <Route path={`/diary`} exact component={StudentDiary} />
              )}
              <Route
                path={`/diary/tab/:selectedTab/diary-details/:id`}
                exact
                component={DiaryDetails}
              />
              <Route path={`/diary/edit/:id`} exact component={NewDiaryEntry} />
            </>
          )}
        </Switch>
      </Layout>
    </>
  )
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
  )
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    selectedRole: state.auth.selectedRole,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAutoSignup: (isAuthenticated) =>
      dispatch(authActions.authCheckState(isAuthenticated)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))

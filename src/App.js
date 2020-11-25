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
import Gallery from './app/gallery/GalleryIndex'
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
import Syllabus from './app/syllabus/Syllabus'
import EditChapter from './app/syllabus/teacher/editChapter'
import ChatFullScreen from './app/chatUsers/ChatFullScreen'
import ReportContainer from './app/report/student/ReportContainer'
import StudentCard from './app/report/student/StudentCard'
import ReportUpload from './app/report/student/ReportUpload'
import AttendanceUpload from './app/Attendance/teacherAttendance/AttendanceUpload'
import TimeTable from './app/timeTable/timeTable'
import UpdateGroupUsers from './app/chatUsers/UpdateGroupUsers'
import { paths } from './Constants/Routes'

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
					<Route path={paths.SYLLABUS} exact component={Syllabus} />
					<Route
						path={`${paths.SYLLABUS}/:id/edit/:eid`}
						exact
						component={EditChapter}
					/>
					<Route
						path={`${paths.SYLLABUS}/add/:id/class/:classid`}
						exact
						component={EditChapter}
					/>
					<Route path={paths.TRANSPORT} exact component={Transport} />
					<Route path={paths.GALLERY} exact component={Gallery} />
					<Route path={paths.GALLERY_UPLOAD} exact component={ImageUpload} />
					<Route path={paths.PAYMENTS} exact component={Payments} />
					<Route
						path={`${paths.PAYMENTS}/:id`}
						exact
						component={PaymentDetails}
					/>
					<Route path={paths.TIME_TABLE} exact component={TimeTable} />
					<Route path={paths.LEAVE} exact component={Leave} />
					<Route
						path={paths.CREATE_LEAVE}
						exact
						component={LeaveCreateContainer}
					/>
					<Route path={paths.FAQ} exact component={Faq} />
					<Route path={paths.CREATE_FAQ} exact component={FaqEditor} />
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

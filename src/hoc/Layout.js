import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link, useHistory } from 'react-router-dom'
import { addNotificationCount } from '../app/notification/store/action'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import { makeStyles, useTheme } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone'
import {
  IconButton,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Hidden,
  useMediaQuery,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import CloseIcon from '@material-ui/icons/Close'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ChevronRightSharpIcon from '@material-ui/icons/ChevronRightSharp'
import Slide from '@material-ui/core/Slide'
import Snackbar from '@material-ui/core/Snackbar'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'
import HomeIcon from '../assets/images/navigation/DesktopHome.svg'
import NotificationIcon from '../assets/images/navigation/DesktopNotification.svg'
import AssignmentIcon from '../assets/images/navigation/DesktopAssignment.svg'
import EventsIcon from '../assets/images/navigation/DesktopEvents.svg'
import LunchIcon from '../assets/images/lunch/Lunch.svg'
import DesktopCurriculum from '../assets/images/navigation/DesktopCurriculum.svg'
import ReportIcons from '../assets/images/report/report.svg'
import NewsIcon from '../assets/images/navigation/DesktopNews.svg'
import GalleryIcon from '../assets/images/navigation/DesktopGallery.svg'
import TransportIcon from '../assets/images/navigation/DesktopTransport.svg'
import PaymentIcon from '../assets/images/navigation/DesktopPayment.svg'
import SyllabusIcon from '../assets/images/navigation/DesktopSyllabus.svg'
import TimetableIcon from '../assets/images/navigation/DesktopTimetable.svg'
import ReportIcon from '../assets/images/report/report_card.svg'
import SupportIcon from '../assets/images/support/support.svg'
import FAQIcon from '../assets/images/faq/faq.svg'
import Logo from '../assets/images/Logo.png'
import DesktopAttendanceIcon from '../assets/images/navigation/DesktopAttendance.svg'
import HamburgerIcon from '../assets/images/navigation/Hamburger.svg'
import DesktopMessageIcon from '../assets/images/navigation/DesktopMessage.svg'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import Logout from '../app/auth/Logout'
import ChildSelection from '../app/auth/ChildSelection'
import RoleSelection from '../app/auth/RoleSelection'
import { authInitiateRoleSelection } from '../app/auth/store/actions'
import ChatIndex from '../app/chat/ChatIndex'
import ChatPopup from '../app/chatUsers/ChatPopup'
import ChatService from '../app/chat/ChatService'
import { paths } from '../Constants/Routes'
import { Lang } from '../Constants/Languages/English'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import {
  getContacts,
  getChatUsers,
  updateChat,
} from '../app/redux/actions/chat.action'
import { subscribeChannel } from '../pusherinit'

var CryptoJS = require('crypto-js')

// default was 360
const drawerWidth = 340
const drawerRightWidth = 340

function ElevationScroll(props) {
  const { children } = props
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  })
  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  })
}

function snackTransision(props) {
  return <Slide {...props} direction="left" />
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
  },
  grow: {
    flexGrow: 1.7,
  },
  grow2: {
    flexGrow: 1.5,
  },
  title: {
    display: 'block',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    fontWeight: 900,
    fontStyle: 'normal',
    fontSize: '1.125rem',
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'inline-flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  sectionItems: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  marginLeft20: {
    marginLeft: '20px',
  },
  marginLeft5: {
    marginLeft: '5px',
  },
  menuContainer: {
    backgroundColor: theme.palette.common.white,
    color: 'white',
    minWidth: '243px',
    '&.MuiPaper-rounded': {
      borderRadius: '0px 4px 0px 2px',
      boxShadow: '0px 6px 6px #00000029',
    },
    [theme.breakpoints.down('md')]: {
      minWidth: '150px',
    },
    [theme.breakpoints.down('sm')]: {
      minWidth: '150px',
    },
  },
  menuItem: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.blackRussian,
    '&:hover': {
      backgroundColor: theme.palette.common.quartz,
    },
    margin: '5px',
    borderRadius: '6px',
    fontSize: '0.875rem',
    fontWeight: 300,
  },
  profileName: {
    fontWeight: 500,
    fontSize: '0.625rem',
    color: theme.palette.common.white,
  },
  profileButton: {
    textTransform: 'none',
  },
  drawer: {
    width: drawerWidth,

    flexShrink: 0,
    [theme.breakpoints.down('sm')]: {
      width: 280,
      flexShrink: 0,
    },
    [theme.breakpoints.down('md')]: {
      width: 280,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.down('sm')]: {
      width: 280,
    },
    [theme.breakpoints.down('md')]: {
      width: 280,
    },
  },
  drawerContainer: {
    overflow: 'auto',
  },
  drawerRight: {
    width: drawerRightWidth,
    flexShrink: 0,
    [theme.breakpoints.down('sm')]: {
      width: 0,
      flexShrink: 0,
    },
    [theme.breakpoints.down('md')]: {
      width: 280,
    },
  },
  chat: {
    width: 500,
    [theme.breakpoints.down('sm')]: {
      width: 0,
    },
    [theme.breakpoints.down('md')]: {
      width: 280,
    },
  },
  drawerRightPaper: {
    width: drawerRightWidth,
    [theme.breakpoints.down('sm')]: {
      width: 0,
    },
    [theme.breakpoints.down('md')]: {
      width: 280,
    },
  },

  drawerRightContainer: {
    overflow: 'auto',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  listItemText: {
    fontWeight: 500,
    fontSize: '1.125rem',
    color: theme.palette.common.blackRussian,
    [theme.breakpoints.down('md')]: {
      fontSize: '1.00rem',
    },
  },
  mainContainer: {
    height: '100%',
    marginLeft: drawerWidth,
    overflow: 'auto',
    width: `calc(100% - ${drawerWidth}px - ${drawerWidth}px )`,
    padding: 0,
    position: 'fixed',
    [theme.breakpoints.down('md')]: {
      marginLeft: 280,
      width: `calc(100% - ${280}px - ${280}px )`,
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      width: '100%',
    },
    backgroundColor: theme.palette.common.whiteSmoke,
    '&::-webkit-scrollbar': {
      display: 'none',
      width: 0,
    },
  },
  menuButton: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  listContainer: {
    marginLeft: '13px',
    marginRight: '12px',
    marginTop: '20px',
  },
  listItem: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.blackRussian,
    '&:hover': {
      backgroundColor: theme.palette.common.quartz,
    },
    borderRadius: '6px',
    fontSize: '0.875rem',
    fontWeight: 300,
  },
  listItemIcon: {
    '&.MuiListItemIcon-root': {
      minWidth: '45px',
    },
  },
  avatar: {
    width: '40px',
    height: '40px',
  },
  mobileToolbar: {
    backgroundColor: theme.palette.common.deluge,
    ...theme.mixins.toolbar,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    '& div': {
      margin: '5px',
    },
  },
  menu: {
    zIndex: theme.zIndex.modal + 1,
  },
  listItemSelected: {
    '&.Mui-selected': {
      backgroundColor: theme.palette.common.quartz,
    },
  },
  snackbar: {
    cursor: 'pointer',
    '& .MuiSnackbarContent-root': {
      backgroundColor: '#fff',
      color: `${theme.palette.common.blackRussian}`,
      borderRadius: '9px',
    },
  },
  snackBarDescription: {
    color: `${theme.palette.common.lightFont}`,
  },
  reportMenu: {
    marginLeft: '45px',
    color: '#8E8E93',
    fontSize: '10px',
    marginRight: '5px',
  },
  reportName: {
    color: '#8E8E93',
    fontSize: '18px',
  },
  Logo: {
    width: '137px',
    height: '40px',
  },
  widthStyleDiv: {
    width: '10px',
  },
  divStyleWidth: {
    width: '20px',
  },
  ChevronRightSharpIcon: {
    color: 'white',
  },
  ExpandLess: {
    fontSize: 20,
    color: 'gray',
  },
  imgColorStyle: {
    color: 'white',
  },
  listItemMargin: {
    marginLeft: '25px',
  },
}))

const Layout = (props) => {
  const classes = useStyles()
  const theme = useTheme()
  const history = useHistory()
  const [anchorEl, setAnchorEl] = useState(null)
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [selectedItem, setSelectedItem] = useState(0)
  const [individualItem, setIndividualItem] = useState(0)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [selectRoleModel, setSelectRoleModel] = useState(true)
  const [snackbarId, setSnackBarId] = useState('')
  const [reportItem, setReportItem] = React.useState(false)
  const [report, setReport] = React.useState(false)
  const [lunch, setLunch] = React.useState(false)
  const [diaryItem, setDiaryItem] = React.useState(false)
  const [paymentItem, setPaymentItem] = React.useState(false)
  const [lunchItem, setLunchItem] = React.useState(false)
  const [individual, setIndividual] = React.useState(false)
  const [isOpen_child, setisOpen_child] = React.useState(false)
  const [snackbarTitle, setSnackbarTitle] = useState('')
  const [snackbarDescription, setSnackbarDescription] = useState('')
  const [snackbarClick, setSnackbarClick] = useState('')
  const [selectedChat, setSelectedChat] = useState(null)
  const schoolName = localStorage.getItem('schoolName')
  const schoolLogo = localStorage.getItem('schoolLogo')
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'))
  const [refreshChat, setRefreshChat] = useState(false)
  const [studentId, setStudentId] = useState('')
  const [show, setShow] = useState(false)
  const srmChild_dict = JSON.parse(localStorage.getItem('srmChild_dict')) || []
  const srmSelected_Child_token = localStorage.getItem(
    'srmSelected_Child_token',
  )
  const srmSelected_Child = localStorage.getItem('srmSelected_Child')
  const selectedStudent = localStorage.getItem('selectedStudent')
  const selectedChild = srmChild_dict[srmSelected_Child] || {}
  const selectedChildDetails = selectedChild.userDetails || {}
  const selectedChildId = selectedChildDetails.id
  const isMenuOpen = Boolean(anchorEl)

  const [profileUrl, setProfileUrl] = useState(`/student-profile/`)
  const [diaryUrl, setDiaryUrl] = useState(`/diary/tab/0`)
  const [libraryUrl, setLibraryUrl] = useState(`/library/`)
  const [leaveUrl, setLeaveUrl] = useState(`/student-leave/`)
  console.log('selectedStudent :>> ', selectedStudent)

  useEffect(() => {
    if (props.selectedRole === 'teacher' || props.selectedRole === 'admin') {
      if (selectedStudent) {
        setProfileUrl(`/student-profile/${selectedStudent}`)
        setDiaryUrl(`/diary/${selectedStudent}/tab/0`)
        setLibraryUrl(`/library/${selectedStudent}`)
        setLeaveUrl(`/student-leave/${selectedStudent}`)
      }
    }
  }, [selectedStudent])

  useEffect(() => {
    if (!props.userInfo.id) {
      return
    }
    const channel = subscribeChannel(props.userInfo.id)
    console.log('Chat Subcribed !!', props.userInfo.id)
    channel.bind('App\\Events\\Chat', function (data) {
      console.log('Received data:', data)
      props.updateChat(data.singleChatUser)
    })
  }, [props.userInfo.id])

  useEffect(() => {
    if (props.selectedRole === 'parent') {
      if (selectedChildId) {
        setProfileUrl(`/student-profile/${selectedChildId}`)
        setLeaveUrl(`/student-leave/${selectedChildId}`)
      }
    }
    if (props.selectedRole === 'student') {
      setProfileUrl(`/students-profile`)
      setLeaveUrl(`/student-leaves`)
      setDiaryUrl(`/diary`)
    }
  }, [])

  let url
  if (window) {
    url = window.location.href
  }

  useEffect(() => {
    props.getContacts(
      {
        current_role: props.selectedRole,
        get_by: 'user',
      },
      true,
      {
        Authorization: `Bearer ${localStorage.getItem('srmToken')}`,
      },
    )
    props.getChatUsers(
      {
        current_role: props.selectedRole,
      },
      true,
      {
        Authorization: `Bearer ${localStorage.getItem('srmToken')}`,
      },
    )
  }, [])

  const getPlainMessage = (message, chat) => {
    var bytes = CryptoJS.AES.decrypt(message, 'chat' + chat)
    var msg = bytes.toString(CryptoJS.enc.Utf8)
    return msg
  }

  useEffect(() => {
    // console.log('url1', url)
    if (url) {
      let searchStringProfile = url.includes('/student-profile')
      let searchStringProfiles = url.includes('/students-profile')
      let searchStringDiary = url.includes('/diary')
      let searchStringLibrary = url.includes('/library')
      let searchStringLeave = url.includes('/student-leave')
      let searchStringLeaves = url.includes('/student-leaves')
      let searchStringHoliday = url.includes('/holiday-calender')
      let searchStringMiscellaneous = url.includes('/miscellaneous')
      let searchStringMultiple = url.includes('/multiple-student')
      let searchStringDishes = url.includes('/dishes')
      let searchStringLunch = url.includes('/lunch')
      let searchStringMenu = url.includes('/menu')
      let searchStringCreatePayment = url.includes('/create-payment')
      let searchStringViewPayment = url.includes('/view-payment')
      let searchStringPayment = url.includes('/payments')
      let searchStringAssignment = url.includes('/assignment-report')
      let searchStringNews = url.includes('/news-report')
      let searchStringAttendance = url.includes('/attendance-report')
      let searchStringPaymentReport = url.includes('/payment-report')
      if (
        searchStringLeave ||
        searchStringHoliday ||
        searchStringMiscellaneous ||
        searchStringMultiple ||
        searchStringProfiles ||
        searchStringLeaves
      ) {
        setDiaryItem(true)
      }
      if (
        (searchStringDishes || searchStringLunch || searchStringMenu) &&
        (props.selectedRole === 'admin' || props.selectedRole === 'teacher')
      ) {
        setLunch(true)
      }
      if (
        (searchStringCreatePayment ||
          searchStringViewPayment ||
          searchStringPayment) &&
        (props.selectedRole === 'admin' || props.selectedRole === 'teacher')
      ) {
        setPaymentItem(true)
      }

      if (
        searchStringAssignment ||
        searchStringNews ||
        searchStringAttendance ||
        searchStringPaymentReport
      ) {
        setReport(true)
      }
      if (searchStringProfile) {
        let splite = url.split('/student-profile/')[1]
        setStudentId(splite)
        setShow(true)
        setDiaryItem(true)
      }
      if (searchStringDiary) {
        let splite = url.split('/diary/')[1]
        setStudentId(splite)
        setShow(true)
        setDiaryItem(true)
      }
      if (searchStringLibrary) {
        let splite = url.split('/library/')[1]
        setStudentId(splite)
        setShow(true)
        setDiaryItem(true)
      }
      if (props.selectedRole === 'parent' || props.selectedRole === 'student') {
        setShow(true)
      }
    }
  }, [url])
  // onMessageListener()
  //   .then(async (payload) => {
  //     let data = JSON.parse(payload.data.data);
  //     if (data.type == "silent") {
  //       if (data.chat != undefined) {
  //         setRefreshChat(true);
  //         props.onUpdateChat(data.chat);
  //       }
  //       return;
  //     }
  //     setSnackBarId(data.entity_id);
  //     setSnackbarTitle(payload.notification.title);
  //     setSnackbarClick(payload.notification.click_action);
  //     if (data.type == "chat") {
  //       setSnackbarDescription(
  //         getPlainMessage(payload.notification.body, data.entity_id)
  //       );
  //       const token = localStorage.getItem("srmToken");
  //       const response = await ChatService.fetchChat(data.entity_id, token);
  //       if (response.status === 200) {
  //         const { data } = response;
  //         setSelectedChat(data.chat);
  //         setRefreshChat(true);
  //         props.onUpdateChat(data.chat);
  //       }
  //     } else {
  //       setSnackbarDescription(
  //         getPlainMessage(payload.notification.body, data.entity_id)
  //       );
  //       props.onNotificationReceive();
  //     }
  //     setSnackbarOpen(true);
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') return

    setSnackbarOpen(false)
    return
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleProfile = (event) => {
    localStorage.setItem('srmCurrentRoute', '/profile')
    history.push('/profile')
  }

  const handleReportMenu = () => {
    setReportItem(!reportItem)
    // history.push("/report-card");
  }
  const handleReport = () => {
    setReport(!report)
  }
  const handleLunchMenu = () => {
    setLunch(!lunch)
    // history.push("/lunch");
  }
  const handleDiaryMenu = () => {
    setDiaryItem(!diaryItem)
    // history.push("/diary");
  }
  const handlePaymentsMenu = () => {
    setPaymentItem(!paymentItem)
    // history.push("/diary");
  }
  const handleIndividualMenu = () => {
    setLunchItem(!lunchItem)
    setIndividual(!individual)
    // history.push("/diary");
  }

  const handleOpenLogoutDialog = () => {
    setOpenLogoutDialog(true)
    handleMenuClose()
  }

  const handleCloseLogoutDialog = () => {
    setOpenLogoutDialog(false)
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleChangeRole = () => {
    setSelectRoleModel(true)
    props.authInitiateRoleSelection()
    handleMenuClose()
  }
  const handleChangeRole_child = (state) => {
    setisOpen_child(state)
    handleMenuClose()
  }

  const handleChange = (newValue) => {
    setSelectedItem(() => newValue)
  }
  const handleIndividualChange = (newValue) => {
    setIndividualItem(() => newValue)
  }
  const defaultTab = 0
  const listItems = [
    {
      name: Lang.HOME.HOME,
      icon: <img src={HomeIcon} alt="Menu" width="24" height="24" />,
      linkTo: paths.HOME,
      itemIndex: 0,
    },
    {
      name: Lang.NOTIFICATIONS,
      icon: <img src={NotificationIcon} alt="Menu" width="24" height="24" />,
      linkTo: paths.NOTIFICATIONS,
      itemIndex: 1,
    },
    {
      name: Lang.ASSIGNMENT,
      icon: <img src={AssignmentIcon} alt="Menu" width="24" height="24" />,
      linkTo: '/assignment',
      itemIndex: 2,
    },
    {
      name: Lang.ATTENDANCE,
      icon: (
        <img src={DesktopAttendanceIcon} alt="Menu" width="24" height="24" />
      ),
      linkTo: '/attendance',
      itemIndex: 3,
    },

    {
      name: Lang.EVENTS_ANNOUNCEMENTS,
      icon: <img src={NewsIcon} alt="Menu" width="24" height="24" />,
      linkTo: '/news',
      itemIndex: 4,
    },
    {
      name: Lang.PLANNING,
      icon: <img src={SyllabusIcon} alt="Menu" width="24" height="24" />,
      linkTo: '/planning',
      itemIndex: 5,
    },
    {
      name: Lang.TRANSPORT,
      icon: <img src={TransportIcon} alt="Menu" width="24" height="24" />,
      linkTo: '/transport',
      itemIndex: 6,
    },
    {
      name: Lang.GALLERY,
      icon: <img src={GalleryIcon} alt="Menu" width="24" height="24" />,
      linkTo: '/gallery',
      itemIndex: 7,
    },
    {
      name: Lang.PAYMENTS,
      icon: <img src={PaymentIcon} alt="Menu" width="24" height="24" />,
      linkTo: `/payments/tab/${defaultTab}`,
      itemIndex: 9,
    },
    {
      name: 'Create Payment',
      icon: <img src={PaymentIcon} alt="Menu" width="24" height="24" />,
      linkTo: '/create-payment',
      itemIndex: 28,
    },
    {
      name: 'View Payment',
      icon: <img src={PaymentIcon} alt="Menu" width="24" height="24" />,
      linkTo: `/view-payment/tab/${defaultTab}`,
      itemIndex: 29,
    },
    {
      name: Lang.DATE_SHEET,
      icon: <img src={TimetableIcon} alt="Menu" width="24" height="24" />,
      linkTo: paths.DATE_SHEET,
      itemIndex: 10,
    },
    {
      name: Lang.LEAVE,
      icon: <img src={EventsIcon} alt="Menu" width="24" height="24" />,
      linkTo: '/leave',
      itemIndex: 11,
    },
    {
      name: Lang.FAQ,
      icon: <img src={FAQIcon} alt="Menu" width="24" height="24" />,
      linkTo: '/faq',
      itemIndex: 12,
    },
    {
      name: Lang.SUPPORT,
      icon: <img src={SupportIcon} alt="Menu" width="24" height="24" />,
      linkTo: '/support',
      itemIndex: 13,
    },

    {
      name: Lang.STUDENT_REPORT_CARD,
      icon: <img src={ReportIcon} alt="Menu" width="24" height="24" />,
      linkTo: '/report',
      itemIndex: 14,
    },
    {
      name: Lang.STUDENT_REPORTS,
      icon: <img src={EventsIcon} alt="Menu" width="24" height="24" />,
      linkTo: '/report-card',
      itemIndex: 15,
    },
    {
      name: Lang.BULK_UPLOAD,
      icon: <img src={EventsIcon} alt="Menu" width="24" height="24" />,
      linkTo: '/report-upload',
      itemIndex: 16,
    },
    {
      name: Lang.WEEKLY_TIME_TABLE,
      icon: <img src={EventsIcon} alt="Menu" width="24" height="24" />,
      linkTo: '/weekly-time-table',
      itemIndex: 17,
    },
    {
      name: Lang.DIARY,
      icon: <img src={DesktopCurriculum} alt="Menu" width="24" height="24" />,
      linkTo: '/diarys',
      itemIndex: 18,
    },
    {
      name: 'Diary Entry',
      icon: <img src={DesktopCurriculum} alt="Menu" width="24" height="24" />,
      linkTo: diaryUrl,
      itemIndex: 20,
    },
    {
      name: 'Library',
      icon: <img src={DesktopCurriculum} alt="Menu" width="24" height="24" />,
      linkTo: libraryUrl,
      itemIndex: 21,
    },
    {
      name: 'Leaves',
      icon: <img src={DesktopCurriculum} alt="Menu" width="24" height="24" />,
      linkTo: leaveUrl,
      itemIndex: 30,
    },
    {
      name: 'Student Profile',
      icon: <img src={DesktopCurriculum} alt="Menu" width="24" height="24" />,
      linkTo: profileUrl,
      itemIndex: 19,
    },
    {
      name: 'Holiday Calender',
      icon: <img src={DesktopCurriculum} alt="Menu" width="24" height="24" />,
      linkTo: '/holiday-calender',
      itemIndex: 22,
    },
    {
      name: 'Miscellaneous',
      icon: <img src={DesktopCurriculum} alt="Menu" width="24" height="24" />,
      linkTo: '/miscellaneous',
      itemIndex: 23,
    },
    // {
    //   name: 'Multiple Student',
    //   icon: <img src={DesktopCurriculum} alt="Menu" width="24" height="24" />,
    //   linkTo: '/multiple-student',
    //   itemIndex: 24,
    // },
    {
      name: 'Lunch',
      icon: <img src={LunchIcon} alt="Menu" />,
      linkTo: '/lunch',
      itemIndex: 25,
    },
    {
      name: 'Dishes',
      icon: <img src={LunchIcon} alt="Menu" />,
      linkTo: '/dishes',
      itemIndex: 26,
    },
    {
      name: 'Menu',
      icon: <img src={LunchIcon} alt="Menu" />,
      linkTo: '/menu',
      itemIndex: 27,
    },
    {
      name: 'Report',
      icon: <img src={ReportIcons} alt="Menu" width="24" height="24" />,
      linkTo: '/report',
      itemIndex: 31,
    },
    {
      name: 'Assignment Report',
      icon: <img src={ReportIcons} alt="Menu" width="24" height="24" />,
      linkTo: '/assignment-report',
      itemIndex: 32,
    },
    {
      name: 'News Report',
      icon: <img src={ReportIcons} alt="Menu" width="24" height="24" />,
      linkTo: '/news-report',
      itemIndex: 33,
    },
    {
      name: 'Attendance Report',
      icon: <img src={ReportIcons} alt="Menu" width="24" height="24" />,
      linkTo: '/attendance-report',
      itemIndex: 34,
    },
    {
      name: 'Payment Report',
      icon: <img src={ReportIcons} alt="Menu" width="24" height="24" />,
      linkTo: '/payment-report',
      itemIndex: 35,
    },
  ]

  const change_selected_child = (child) => {
    setisOpen_child(false)
    var a = srmChild_dict.indexOf(child)
    localStorage.setItem('srmSelected_Child', a)
    localStorage.setItem('srmSelected_Child_token', child.access_token)
    history.push(paths.HOME)
  }
  /*
   Use effect to stay on the correct menu item during refresh.
  */
  useEffect(() => {
    ;[...listItems].forEach((route) => {
      switch (window.location.pathname) {
        case `${route.linkTo}`:
          if (selectedItem !== route.itemIndex) {
            setSelectedItem(route.itemIndex)
            localStorage.setItem('srmCurrentRoute', route.linkTo)
          } else if (selectedItem === 0 && route.itemIndex === 0) {
            localStorage.setItem('srmCurrentRoute', route.linkTo)
          }
          break
        default:
          break
      }
    })
  }, [selectedItem, listItems])

  useEffect(() => {
    if (window.location.pathname.includes('/gallery/')) {
      if (selectedItem !== 7) {
        setSelectedItem(7)
      }
    }
  }, [window.location.pathname])
  // useEffect(() => {
  //   if (props.chat.id != undefined) {
  //     setSelectedChat(props.chat)
  //     setRefreshChat(true)
  //   }
  // }, [props.chat])

  const handleOpenAssignment = () => {
    localStorage.setItem('srmCurrentRoute', '/settings')
    history.push({
      pathname: `${paths.SETTINGS}`,
      state: { selectedSetting: 'HomeWork' },
    })
  }

  const renderMenu = (
    <Menu
      classes={{ paper: classes.menuContainer }}
      anchorEl={anchorEl}
      id="desktopMenu"
      keepMounted
      anchorReference="anchorPosition"
      anchorPosition={{ top: 65, left: 2000 }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      marginThreshold={0}
    >
      <MenuItem onClick={handleProfile} classes={{ root: classes.menuItem }}>
        Profile
      </MenuItem>
      {props.isAuthenticated && props.userInfo.roles.length > 1 ? (
        <MenuItem
          onClick={handleChangeRole}
          classes={{ root: classes.menuItem }}
        >
          Change Role (currently {props.selectedRole})
        </MenuItem>
      ) : null}
      {props.isAuthenticated &&
      props.selectedRole === 'parent' &&
      srmChild_dict.length > 1 ? (
        <MenuItem
          onClick={() => handleChangeRole_child(true)}
          classes={{ root: classes.menuItem }}
        >
          Change Child (currently{' '}
          {srmChild_dict[parseInt(srmSelected_Child)].userDetails.firstname})
        </MenuItem>
      ) : (
        <span></span>
      )}
      {props.selectedRole === 'admin' ? (
        <MenuItem
          onClick={handleOpenAssignment}
          classes={{ root: classes.menuItem }}
        >
          Settings
        </MenuItem>
      ) : null}
      <MenuItem
        onClick={handleOpenLogoutDialog}
        classes={{ root: classes.menuItem }}
      >
        Logout
      </MenuItem>
    </Menu>
  )

  const renderMobileMenu = (
    <Menu
      classes={{ paper: classes.menuContainer }}
      anchorEl={anchorEl}
      id="mobileMenu"
      keepMounted
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      marginThreshold={0}
      style={{ zIndex: 1301 }}
    >
      <MenuItem onClick={handleProfile} classes={{ root: classes.menuItem }}>
        Profile
      </MenuItem>
      {props.isAuthenticated && props.userInfo.roles.length > 1 ? (
        <MenuItem
          onClick={handleChangeRole}
          classes={{ root: classes.menuItem }}
        >
          Change Role (currently {props.selectedRole})
        </MenuItem>
      ) : null}
      {props.isAuthenticated &&
      props.selectedRole === 'parent' &&
      srmChild_dict.length > 1 ? (
        <MenuItem
          onClick={() => handleChangeRole_child(true)}
          classes={{ root: classes.menuItem }}
        >
          Change Child (currently{' '}
          {srmChild_dict[parseInt(srmSelected_Child)].userDetails.firstname})
        </MenuItem>
      ) : (
        <span></span>
      )}
      {props.selectedRole === 'admin' ? (
        <MenuItem
          onClick={handleOpenAssignment}
          classes={{ root: classes.menuItem }}
        >
          Settings
        </MenuItem>
      ) : null}
      <MenuItem
        onClick={handleOpenLogoutDialog}
        classes={{ root: classes.menuItem }}
      >
        Logout
      </MenuItem>
    </Menu>
  )

  const drawer = (
    <>
      <Toolbar disableGutters>
        <div className={classes.mobileToolbar}>
          <div className={classes.widthStyleDiv}></div>
          <div>
            <Avatar
              src={
                props.userInfo.thumbnail
                  ? props.userInfo.thumbnail
                  : '/broken-image.jpg'
              }
              className={classes.avatar}
            />
          </div>
          <div>
            <Typography noWrap className={classes.profileName}>
              Hi {props.userInfo.firstname} {props.userInfo.lastname}
            </Typography>
          </div>
          <div className={classes.divStyleWidth}></div>
          <div>
            <Button
              size="small"
              onClick={handleProfileMenuOpen}
              disableRipple
              className={classes.profileButton}
            >
              <ChevronRightSharpIcon
                className={classes.ChevronRightSharpIcon}
                fontSize="small"
              />
            </Button>
          </div>
        </div>
      </Toolbar>

      <div className={classes.drawerContainer}>
        <div>
          <List className={classes.listContainer}>
            {listItems.map((item, index) => {
              if (item.name === 'Events & Announcements') {
                if (
                  props.selectedRole === 'teacher' ||
                  props.selectedRole === 'admin'
                ) {
                  return (
                    <ListItem
                      button
                      key={item.name}
                      component={Link}
                      to={item.linkTo}
                      className={classes.listItem}
                      onClick={() => handleChange(item.itemIndex)}
                      selected={selectedItem === item.itemIndex}
                      classes={{ selected: classes.listItemSelected }}
                    >
                      <ListItemIcon classes={{ root: classes.listItemIcon }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.name}
                        className={classes.listItemText}
                      />
                    </ListItem>
                  )
                }
              } else if (item.name === 'Transport') {
                if (
                  props.selectedRole === 'parent' ||
                  props.selectedRole === 'teacher'
                ) {
                  return (
                    <ListItem
                      button
                      key={item.name}
                      component={Link}
                      to={item.linkTo}
                      className={classes.listItem}
                      onClick={() => handleChange(item.itemIndex)}
                      selected={selectedItem === item.itemIndex}
                      classes={{ selected: classes.listItemSelected }}
                    >
                      <ListItemIcon classes={{ root: classes.listItemIcon }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.name}
                        className={classes.listItemText}
                      />
                    </ListItem>
                  )
                }
              } else if (item.name === 'Leave') {
                if (
                  props.selectedRole === 'teacher' ||
                  props.selectedRole === 'admin' ||
                  props.selectedRole === 'student' ||
                  props.selectedRole === 'parent'
                ) {
                  return (
                    <ListItem
                      button
                      key={item.name}
                      component={Link}
                      to={item.linkTo}
                      className={classes.listItem}
                      onClick={() => handleChange(item.itemIndex)}
                      selected={selectedItem === item.itemIndex}
                      classes={{ selected: classes.listItemSelected }}
                    >
                      <ListItemIcon classes={{ root: classes.listItemIcon }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.name}
                        className={classes.listItemText}
                      />
                    </ListItem>
                  )
                }
              } else if (item.name === 'Weekly Time Table') {
                if (
                  props.selectedRole === 'teacher' ||
                  props.selectedRole === 'admin' ||
                  props.selectedRole === 'student' ||
                  props.selectedRole === 'parent'
                ) {
                  return (
                    <ListItem
                      button
                      key={item.name}
                      component={Link}
                      to={item.linkTo}
                      className={classes.listItem}
                      onClick={() => handleChange(item.itemIndex)}
                      selected={selectedItem === item.itemIndex}
                      classes={{ selected: classes.listItemSelected }}
                    >
                      <ListItemIcon classes={{ root: classes.listItemIcon }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.name}
                        className={classes.listItemText}
                      />
                    </ListItem>
                  )
                }
              } else if (
                (props.selectedRole === 'admin' ||
                  props.selectedRole === 'teacher') &&
                (item.name === 'Student Report Card' ||
                  item.name === 'Student Reports' ||
                  item.name === 'Bulk Upload')
              ) {
                if (item.itemIndex === 14) {
                  return (
                    <ListItem
                      button
                      key={item.name}
                      // component={Link}
                      // to={item.linkTo}
                      className={classes.listItem}
                      onClick={() => {
                        handleChange(item.itemIndex)
                        handleReportMenu()
                      }}
                    >
                      <ListItemIcon classes={{ root: classes.listItemIcon }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.name}
                        className={classes.listItemText}
                      />
                      {reportItem ? (
                        <ExpandLess className={classes.ExpandLess} />
                      ) : (
                        <ExpandMore />
                      )}
                    </ListItem>
                  )
                }
                if (item.itemIndex === 15) {
                  return (
                    <Collapse in={reportItem} timeout="auto" unmountOnExit>
                      <ListItem
                        button
                        key={item.name}
                        component={Link}
                        to={item.linkTo}
                        className={classes.listItem}
                        onClick={() => handleChange(item.itemIndex)}
                        selected={selectedItem === item.itemIndex}
                        classes={{ selected: classes.listItemSelected }}
                      >
                        <FiberManualRecordIcon className={classes.reportMenu} />
                        <ListItemText
                          primary={item.name}
                          className={classes.reportName}
                        />
                      </ListItem>
                    </Collapse>
                  )
                }
                if (item.itemIndex === 16) {
                  return (
                    <Collapse in={reportItem} timeout="auto" unmountOnExit>
                      <ListItem
                        button
                        key={item.name}
                        component={Link}
                        to={item.linkTo}
                        className={classes.listItem}
                        onClick={() => handleChange(item.itemIndex)}
                        selected={selectedItem === item.itemIndex}
                        classes={{ selected: classes.listItemSelected }}
                      >
                        <FiberManualRecordIcon className={classes.reportMenu} />
                        <ListItemText
                          primary={item.name}
                          className={classes.reportName}
                        />
                      </ListItem>
                    </Collapse>
                  )
                }
              } else if (
                ((props.selectedRole === 'admin' ||
                  props.selectedRole === 'teacher') &&
                  item.name === 'Lunch') ||
                item.name === 'Dishes' ||
                item.name === 'Menu'
              ) {
                if (item.itemIndex === 25) {
                  return (
                    <ListItem
                      button
                      key={item.name}
                      // component={Link}
                      // to={item.linkTo}
                      className={classes.listItem}
                      onClick={() => {
                        handleChange(item.itemIndex)
                        handleLunchMenu()
                      }}
                    >
                      <ListItemIcon classes={{ root: classes.listItemIcon }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.name}
                        className={classes.listItemText}
                      />
                      {lunch ? (
                        <ExpandLess className={classes.ExpandLess} />
                      ) : (
                        <ExpandMore />
                      )}
                    </ListItem>
                  )
                }
                if (item.itemIndex === 26) {
                  return (
                    <Collapse in={lunch} timeout="auto" unmountOnExit>
                      <ListItem
                        button
                        key={item.name}
                        component={Link}
                        to={item.linkTo}
                        className={classes.listItem}
                        onClick={() => handleChange(item.itemIndex)}
                        selected={selectedItem === item.itemIndex}
                        classes={{ selected: classes.listItemSelected }}
                      >
                        <FiberManualRecordIcon className={classes.reportMenu} />
                        <ListItemText
                          primary={item.name}
                          className={classes.reportName}
                        />
                      </ListItem>
                    </Collapse>
                  )
                }
                if (item.itemIndex === 27) {
                  return (
                    <Collapse in={lunch} timeout="auto" unmountOnExit>
                      <ListItem
                        button
                        key={item.name}
                        component={Link}
                        to={item.linkTo}
                        className={classes.listItem}
                        onClick={() => handleChange(item.itemIndex)}
                        selected={selectedItem === item.itemIndex}
                        classes={{ selected: classes.listItemSelected }}
                      >
                        <FiberManualRecordIcon className={classes.reportMenu} />
                        <ListItemText
                          primary={item.name}
                          className={classes.reportName}
                        />
                      </ListItem>
                    </Collapse>
                  )
                }
              } else if (
                ((props.selectedRole === 'admin' ||
                  props.selectedRole === 'teacher') &&
                  item.name === 'Payments') ||
                item.name === 'Create Payment' ||
                item.name === 'View Payment'
              ) {
                if (item.itemIndex === 9) {
                  console.log('itempayment', item.itemIndex)
                  return (
                    <ListItem
                      button
                      key={item.name}
                      // component={Link}
                      // to={item.linkTo}
                      className={classes.listItem}
                      onClick={() => {
                        handleChange(item.itemIndex)
                        handlePaymentsMenu()
                      }}
                    >
                      <ListItemIcon classes={{ root: classes.listItemIcon }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.name}
                        className={classes.listItemText}
                      />
                      {paymentItem ? (
                        <ExpandLess className={classes.ExpandLess} />
                      ) : (
                        <ExpandMore />
                      )}
                    </ListItem>
                  )
                }
                if (item.itemIndex === 28) {
                  console.log('itemindex', item.itemIndex)
                  return (
                    <Collapse in={paymentItem} timeout="auto" unmountOnExit>
                      <ListItem
                        button
                        key={item.name}
                        component={Link}
                        to={item.linkTo}
                        className={classes.listItem}
                        onClick={() => handleChange(item.itemIndex)}
                        selected={selectedItem === item.itemIndex}
                        classes={{ selected: classes.listItemSelected }}
                      >
                        <FiberManualRecordIcon className={classes.reportMenu} />
                        <ListItemText
                          primary={item.name}
                          className={classes.reportName}
                        />
                      </ListItem>
                    </Collapse>
                  )
                }
                if (item.itemIndex === 29) {
                  return (
                    <Collapse in={paymentItem} timeout="auto" unmountOnExit>
                      <ListItem
                        button
                        key={item.name}
                        component={Link}
                        to={item.linkTo}
                        className={classes.listItem}
                        onClick={() => handleChange(item.itemIndex)}
                        selected={selectedItem === item.itemIndex}
                        classes={{ selected: classes.listItemSelected }}
                      >
                        <FiberManualRecordIcon className={classes.reportMenu} />
                        <ListItemText
                          primary={item.name}
                          className={classes.reportName}
                        />
                      </ListItem>
                    </Collapse>
                  )
                }
              } else if (item.name === 'Payments') {
                if (props.selectedRole === 'parent') {
                  return (
                    <ListItem
                      button
                      key={item.name}
                      component={Link}
                      to={item.linkTo}
                      className={classes.listItem}
                      onClick={() => handleChange(item.itemIndex)}
                      selected={selectedItem === item.itemIndex}
                      classes={{ selected: classes.listItemSelected }}
                    >
                      <ListItemIcon classes={{ root: classes.listItemIcon }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.name}
                        className={classes.listItemText}
                      />
                    </ListItem>
                  )
                }
              } else if (
                (props.selectedRole === 'admin' && item.name === 'Report') ||
                item.name === 'Assignment Report' ||
                item.name === 'News Report' ||
                item.name === 'Attendance Report' ||
                item.name === 'Payment Report'
              ) {
                if (item.itemIndex === 31) {
                  return (
                    <ListItem
                      button
                      key={item.name}
                      // component={Link}
                      // to={item.linkTo}
                      className={classes.listItem}
                      onClick={() => {
                        handleChange(item.itemIndex)
                        handleReport()
                      }}
                    >
                      <ListItemIcon classes={{ root: classes.listItemIcon }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.name}
                        className={classes.listItemText}
                      />
                      {report ? (
                        <ExpandLess className={classes.ExpandLess} />
                      ) : (
                        <ExpandMore />
                      )}
                    </ListItem>
                  )
                }
                if (item.itemIndex === 32) {
                  return (
                    <Collapse in={report} timeout="auto" unmountOnExit>
                      <ListItem
                        button
                        key={item.name}
                        component={Link}
                        to={item.linkTo}
                        className={classes.listItem}
                        onClick={() => handleChange(item.itemIndex)}
                        selected={selectedItem === item.itemIndex}
                        classes={{ selected: classes.listItemSelected }}
                      >
                        <FiberManualRecordIcon className={classes.reportMenu} />
                        <ListItemText
                          primary={item.name}
                          className={classes.reportName}
                        />
                      </ListItem>
                    </Collapse>
                  )
                }
                if (item.itemIndex === 33) {
                  return (
                    <Collapse in={report} timeout="auto" unmountOnExit>
                      <ListItem
                        button
                        key={item.name}
                        component={Link}
                        to={item.linkTo}
                        className={classes.listItem}
                        onClick={() => handleChange(item.itemIndex)}
                        selected={selectedItem === item.itemIndex}
                        classes={{ selected: classes.listItemSelected }}
                      >
                        <FiberManualRecordIcon className={classes.reportMenu} />
                        <ListItemText
                          primary={item.name}
                          className={classes.reportName}
                        />
                      </ListItem>
                    </Collapse>
                  )
                }
                if (item.itemIndex === 34) {
                  return (
                    <Collapse in={report} timeout="auto" unmountOnExit>
                      <ListItem
                        button
                        key={item.name}
                        component={Link}
                        to={item.linkTo}
                        className={classes.listItem}
                        onClick={() => handleChange(item.itemIndex)}
                        selected={selectedItem === item.itemIndex}
                        classes={{ selected: classes.listItemSelected }}
                      >
                        <FiberManualRecordIcon className={classes.reportMenu} />
                        <ListItemText
                          primary={item.name}
                          className={classes.reportName}
                        />
                      </ListItem>
                    </Collapse>
                  )
                }
                if (item.itemIndex === 35) {
                  return (
                    <Collapse in={report} timeout="auto" unmountOnExit>
                      <ListItem
                        button
                        key={item.name}
                        component={Link}
                        to={item.linkTo}
                        className={classes.listItem}
                        onClick={() => handleChange(item.itemIndex)}
                        selected={selectedItem === item.itemIndex}
                        classes={{ selected: classes.listItemSelected }}
                      >
                        <FiberManualRecordIcon className={classes.reportMenu} />
                        <ListItemText
                          primary={item.name}
                          className={classes.reportName}
                        />
                      </ListItem>
                    </Collapse>
                  )
                }
              } else if (item.name === 'Report') {
                if (props.selectedRole === 'admin') {
                  return (
                    <ListItem
                      button
                      key={item.name}
                      component={Link}
                      to={item.linkTo}
                      className={classes.listItem}
                      onClick={() => handleChange(item.itemIndex)}
                      selected={selectedItem === item.itemIndex}
                      classes={{ selected: classes.listItemSelected }}
                    >
                      <ListItemIcon classes={{ root: classes.listItemIcon }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.name}
                        className={classes.listItemText}
                      />
                    </ListItem>
                  )
                }
              } else if (
                ((props.selectedRole === 'admin' ||
                  props.selectedRole === 'teacher' ||
                  props.selectedRole === 'parent' ||
                  props.selectedRole === 'student') &&
                  item.name === 'Diary') ||
                item.name === 'Student Profile' ||
                item.name === 'Diary Entry' ||
                item.name === 'Library' ||
                item.name === 'Leaves' ||
                item.name === 'Holiday Calender' ||
                item.name === 'Miscellaneous'
                // item.name === 'Multiple Student'
              ) {
                if (item.itemIndex === 18) {
                  return (
                    <ListItem
                      button
                      key={item.name}
                      // component={Link}
                      // to={item.linkTo}
                      className={classes.listItem}
                      onClick={() => {
                        handleChange(item.itemIndex)
                        handleDiaryMenu()
                      }}
                    >
                      <ListItemIcon classes={{ root: classes.listItemIcon }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.name}
                        className={classes.listItemText}
                      />
                      {diaryItem ? (
                        <ExpandLess className={classes.ExpandLess} />
                      ) : (
                        <ExpandMore />
                      )}
                    </ListItem>
                  )
                }
                if (item.itemIndex === 19) {
                  return (
                    <Collapse in={diaryItem} timeout="auto" unmountOnExit>
                      <ListItem
                        button
                        key={item.name}
                        component={Link}
                        to={item.linkTo}
                        className={classes.listItem}
                        onClick={() => handleChange(item.itemIndex)}
                        selected={selectedItem === item.itemIndex}
                        classes={{ selected: classes.listItemSelected }}
                      >
                        <FiberManualRecordIcon className={classes.reportMenu} />
                        <ListItemText
                          primary={item.name}
                          className={classes.reportName}
                        />
                      </ListItem>
                    </Collapse>
                  )
                }
                if (item.itemIndex === 20) {
                  return (
                    <Collapse in={diaryItem} timeout="auto" unmountOnExit>
                      <ListItem
                        button
                        key={item.name}
                        component={Link}
                        to={item.linkTo}
                        className={`${classes.listItem}`}
                        onClick={() => handleChange(item.itemIndex)}
                        selected={selectedItem === item.itemIndex}
                        classes={{ selected: classes.listItemSelected }}
                      >
                        <FiberManualRecordIcon className={classes.reportMenu} />
                        <ListItemText
                          primary={item.name}
                          className={classes.reportName}
                        />
                      </ListItem>
                    </Collapse>
                  )
                }
                if (item.itemIndex === 21) {
                  return (
                    <Collapse in={diaryItem} timeout="auto" unmountOnExit>
                      <ListItem
                        button
                        key={item.name}
                        component={Link}
                        to={item.linkTo}
                        className={`${classes.listItem}`}
                        onClick={() => handleChange(item.itemIndex)}
                        selected={selectedItem === item.itemIndex}
                        classes={{ selected: classes.listItemSelected }}
                      >
                        <FiberManualRecordIcon className={classes.reportMenu} />
                        <ListItemText
                          primary={item.name}
                          className={classes.reportName}
                        />
                      </ListItem>
                    </Collapse>
                  )
                }
                if (item.itemIndex === 30) {
                  return (
                    <Collapse in={diaryItem} timeout="auto" unmountOnExit>
                      <ListItem
                        button
                        key={item.name}
                        component={Link}
                        to={item.linkTo}
                        className={`${classes.listItem}`}
                        onClick={() => handleChange(item.itemIndex)}
                        selected={selectedItem === item.itemIndex}
                        classes={{ selected: classes.listItemSelected }}
                      >
                        <FiberManualRecordIcon className={classes.reportMenu} />
                        <ListItemText
                          primary={item.name}
                          className={classes.reportName}
                        />
                      </ListItem>
                    </Collapse>
                  )
                }
                if (item.itemIndex === 22) {
                  return (
                    <Collapse in={diaryItem} timeout="auto" unmountOnExit>
                      <ListItem
                        button
                        key={item.name}
                        component={Link}
                        to={item.linkTo}
                        className={classes.listItem}
                        onClick={() => handleChange(item.itemIndex)}
                        selected={selectedItem === item.itemIndex}
                        classes={{ selected: classes.listItemSelected }}
                      >
                        <FiberManualRecordIcon className={classes.reportMenu} />
                        <ListItemText
                          primary={item.name}
                          className={classes.reportName}
                        />
                      </ListItem>
                    </Collapse>
                  )
                }
                if (item.itemIndex === 23) {
                  return (
                    <Collapse in={diaryItem} timeout="auto" unmountOnExit>
                      <ListItem
                        button
                        key={item.name}
                        component={Link}
                        to={item.linkTo}
                        className={classes.listItem}
                        onClick={() => handleChange(item.itemIndex)}
                        selected={selectedItem === item.itemIndex}
                        classes={{ selected: classes.listItemSelected }}
                      >
                        <FiberManualRecordIcon className={classes.reportMenu} />
                        <ListItemText
                          primary={item.name}
                          className={classes.reportName}
                        />
                      </ListItem>
                    </Collapse>
                  )
                }
              } else if (
                item.name !== 'News & Announcements' &&
                item.name !== 'Events' &&
                item.name !== 'Bulk Upload' &&
                item.name !== 'Student Report Card'
              ) {
                return (
                  <ListItem
                    button
                    key={item.name}
                    component={Link}
                    to={item.linkTo}
                    className={classes.listItem}
                    onClick={() => handleChange(item.itemIndex)}
                    selected={selectedItem === item.itemIndex}
                    classes={{ selected: classes.listItemSelected }}
                  >
                    <ListItemIcon classes={{ root: classes.listItemIcon }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.name}
                      className={classes.listItemText}
                    />
                  </ListItem>
                )
              }
            })}
          </List>
        </div>
      </div>
    </>
  )

  const rightDrawer = (
    <>
      <Toolbar />
      <div className={classes.drawerContainer}>
        <ChatIndex
          setRefreshChat={setRefreshChat}
          refreshChat={refreshChat}
          selectChat={setSelectedChat}
          {...props}
        />
      </div>
    </>
  )
  return (
    <>
      {!props.isAuthenticated ? <Redirect to="/login" /> : ''}

      <ElevationScroll>
        <div className={classes.grow}>
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <img
                  className={classes.imgColorStyle}
                  src={HamburgerIcon}
                  alt="Menu"
                />
              </IconButton>
              <Hidden smDown implementation="css">
                <img
                  src={schoolLogo !== 'null' ? schoolLogo : Logo}
                  className={classes.Logo}
                  alt="Logo"
                />
              </Hidden>

              <div className={classes.grow} />
              <Typography className={classes.title} variant="h6" noWrap>
                {matchesSm ? schoolName : schoolName}
              </Typography>
              <div className={classes.grow2} />
              <div className={classes.sectionDesktop}>
                <IconButton
                  aria-label="show 2 new notifications"
                  color="inherit"
                >
                  <Badge
                    badgeContent={props.notificationCount}
                    color="secondary"
                  >
                    <NotificationsNoneIcon
                      onClick={() => {
                        history.push(paths.NOTIFICATIONS)
                      }}
                    />
                  </Badge>
                </IconButton>
                <div
                  className={`${classes.sectionItems} ${classes.marginLeft20}`}
                >
                  <Avatar
                    src={
                      props.userInfo.thumbnail
                        ? props.userInfo.thumbnail
                        : '/broken-image.jpg'
                    }
                    className={classes.avatar}
                  />
                </div>
                <div
                  className={`${classes.sectionItems} ${classes.marginLeft5}`}
                >
                  <Button
                    size="small"
                    onClick={handleProfileMenuOpen}
                    disableRipple
                    className={classes.profileButton}
                  >
                    <Typography noWrap className={classes.profileName}>
                      Hi {props.userInfo.firstname} {props.userInfo.lastname}
                    </Typography>
                    <ExpandMoreIcon
                      className={classes.imgColorStyle}
                      fontSize="small"
                    />
                  </Button>
                </div>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show 2 new notifications"
                  color="inherit"
                >
                  <Badge
                    badgeContent={props.notificationCount}
                    color="secondary"
                  >
                    <NotificationsNoneIcon
                      onClick={() => {
                        history.push(paths.NOTIFICATIONS)
                      }}
                    />
                  </Badge>
                </IconButton>
                <IconButton color="inherit">
                  <img src={DesktopMessageIcon} alt="Menu" />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          {matchesSm ? renderMobileMenu : renderMenu}
        </div>
      </ElevationScroll>
      <div className={classes.toolbarMargin}></div>

      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
            PaperProps={{ elevation: 3 }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <nav className={classes.drawerRight}>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerRightPaper,
            }}
            variant="permanent"
            open
            anchor="right"
            PaperProps={{ elevation: 3 }}
          >
            {rightDrawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.mainContainer}>{props.children}</main>
      {props.singleChatUser != null && (
        <ChatPopup selectedChat={props.singleChatUser} />
      )}
      {snackbarOpen ? (
        <Snackbar
          open={snackbarOpen}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          message={
            <div onClick={() => history.push(snackbarClick)}>
              <Typography>{snackbarTitle}</Typography>
              <Typography className={classes.snackBarDescription}>
                {snackbarDescription}
              </Typography>
            </div>
          }
          onClose={handleCloseSnack}
          className={classes.snackbar}
          TransitionComponent={snackTransision}
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseSnack}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      ) : (
        ''
      )}
      {openLogoutDialog ? (
        <Logout open={openLogoutDialog} handleClose={handleCloseLogoutDialog} />
      ) : (
        ''
      )}

      {props.changeRole ? (
        <RoleSelection
          open={selectRoleModel}
          handleClose={handleCloseLogoutDialog}
          handleCloseRoleModel={() => setSelectRoleModel(false)}
        />
      ) : null}
      {isOpen_child ? (
        <ChildSelection
          open={true}
          handleClose={handleChangeRole_child}
          data={srmChild_dict}
          change_child={change_selected_child}
        />
      ) : null}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.auth.userInfo,
    token: state.auth.token,
    isAuthenticated: state.auth.token !== null,
    selectedRole: state.auth.selectedRole,
    changeRole: state.auth.changeRole,
    notificationCount: state.notification.notificationCount,
    contacts: state.Chat.contacts,
    singleChatUser: state.Chat.singleChatUser,
  }
}

export default connect(mapStateToProps, {
  addNotificationCount,
  authInitiateRoleSelection,
  getContacts,
  getChatUsers,
  updateChat,
})(Layout)

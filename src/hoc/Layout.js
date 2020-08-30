import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles, useTheme } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ChevronRightSharpIcon from '@material-ui/icons/ChevronRightSharp';

import HomeIcon from '../assets/images/navigation/DesktopHome.svg';
import AssignmentIcon from '../assets/images/navigation/DesktopAssignment.svg';
import EventsIcon from '../assets/images/navigation/DesktopEvents.svg';
import NewsIcon from '../assets/images/navigation/DesktopNews.svg';
import CurriculumIcon from '../assets/images/navigation/DesktopCurriculum.svg';
import GalleryIcon from '../assets/images/navigation/DesktopGallery.svg';
import TransportIcon from '../assets/images/navigation/DesktopTransport.svg';
import PaymentIcon from '../assets/images/navigation/DesktopPayment.svg';
import SyllabusIcon from '../assets/images/navigation/DesktopSyllabus.svg';
import TimetableIcon from '../assets/images/navigation/DesktopTimetable.svg';

import DesktopAttendanceIcon from '../assets/images/navigation/DesktopAttendance.svg';
import HamburgerIcon from '../assets/images/navigation/Hamburger.svg';
import DesktopMessageIcon from '../assets/images/navigation/DesktopMessage.svg';

import Logout from '../app/auth/Logout';
import RoleSelection from '../app/auth/RoleSelection';
import * as actions from '../app/auth/store/actions';
import ChatIndex from '../app/chat/ChatIndex';

const drawerWidth = 360;
const drawerRightWidth = 360;

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
  },
  grow: {
    flexGrow: 1,
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
}));

const Layout = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = useState(0);

  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));

  const isMenuOpen = Boolean(anchorEl);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpenLogoutDialog = () => {
    setOpenLogoutDialog(true);
    handleMenuClose();
  };

  const handleCloseLogoutDialog = () => {
    setOpenLogoutDialog(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleChangeRole = () => {
    props.onChangeRoleStart();
    handleMenuClose();
  };

  const handleChange = (newValue) => {
    setSelectedItem(newValue);
  };

  const listItems = [
    {
      name: 'Home',
      icon: <img src={HomeIcon} alt='Menu' width='24' height='24' />,
      linkTo: '/home',
      itemIndex: 0,
    },
    {
      name: 'Assignment',
      icon: <img src={AssignmentIcon} alt='Menu' width='24' height='24' />,
      linkTo: '/assignment',
      itemIndex: 1,
    },
    {
      name: 'Attendance',
      icon: (
        <img src={DesktopAttendanceIcon} alt='Menu' width='24' height='24' />
      ),
      linkTo: '/attendance',
      itemIndex: 2,
    },

    {
      name: 'Events & Announcements',
      icon: <img src={NewsIcon} alt='Menu' width='24' height='24' />,
      linkTo: '/news',
      itemIndex: 4,
    },
    {
      name: 'Syllabus',
      icon: <img src={SyllabusIcon} alt='Menu' width='24' height='24' />,
      linkTo: '/syllabus',
      itemIndex: 5,
    },
    {
      name: 'Transport',
      icon: <img src={TransportIcon} alt='Menu' width='24' height='24' />,
      linkTo: '/transport',
      itemIndex: 6,
    },
    {
      name: 'Gallery',
      icon: <img src={GalleryIcon} alt='Menu' width='24' height='24' />,
      linkTo: '/gallery',
      itemIndex: 7,
    },
    {
      name: 'Curriculum',
      icon: <img src={CurriculumIcon} alt='Menu' width='24' height='24' />,
      linkTo: '/curriculum',
      itemIndex: 8,
    },
    {
      name: 'Payments',
      icon: <img src={PaymentIcon} alt='Menu' width='24' height='24' />,
      linkTo: '/payments',
      itemIndex: 9,
    },
    {
      name: 'Timetable',
      icon: <img src={TimetableIcon} alt='Menu' width='24' height='24' />,
      linkTo: '/timetable',
      itemIndex: 10,
    },
    {
      name: 'Leave',
      icon: <img src={EventsIcon} alt='Menu' width='24' height='24' />,
      linkTo: '/leave',
      itemIndex: 11,
    },
    {
      name: 'FAQ',
      icon: <img src={EventsIcon} alt='Menu' width='24' height='24' />,
      linkTo: '/faq',
      itemIndex: 12,
    },
  ];

  /*
   Use effect to stay on the correct menu item during refresh.
  */
  useEffect(() => {
    [...listItems].forEach((route) => {
      switch (window.location.pathname) {
        case `${route.linkTo}`:
          if (selectedItem !== route.itemIndex) {
            setSelectedItem(route.itemIndex);
            localStorage.setItem('srmCurrentRoute', route.linkTo);
          }
          break;
        default:
          break;
      }
    });
  }, [selectedItem, listItems]);

  useEffect(() => {
    if (window.location.pathname.includes('/gallery/')) {
      if (selectedItem !== 7) {
        setSelectedItem(7);
      }
    }
  }, [window.location.pathname]);

  const renderMenu = (
    <Menu
      classes={{ paper: classes.menuContainer }}
      anchorEl={anchorEl}
      id='desktopMenu'
      keepMounted
      anchorReference='anchorPosition'
      anchorPosition={{ top: 65, left: 2000 }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      marginThreshold={0}
    >
      <MenuItem onClick={handleMenuClose} classes={{ root: classes.menuItem }}>
        Profile
      </MenuItem>
      <MenuItem onClick={handleMenuClose} classes={{ root: classes.menuItem }}>
        Settings
      </MenuItem>
      {props.isAuthenticated && props.userInfo.roles.length > 1 ? (
        <MenuItem
          onClick={handleChangeRole}
          classes={{ root: classes.menuItem }}
        >
          Change Role (currently {props.selectedRole})
        </MenuItem>
      ) : null}
      <MenuItem
        onClick={handleOpenLogoutDialog}
        classes={{ root: classes.menuItem }}
      >
        Logout
      </MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      classes={{ paper: classes.menuContainer }}
      anchorEl={anchorEl}
      id='mobileMenu'
      keepMounted
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      //PopoverClasses={{ root: classes.menu }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      marginThreshold={0}
      style={{ zIndex: 1301 }}
    >
      <MenuItem onClick={handleMenuClose} classes={{ root: classes.menuItem }}>
        Profile
      </MenuItem>
      <MenuItem onClick={handleMenuClose} classes={{ root: classes.menuItem }}>
        Settings
      </MenuItem>
      {props.isAuthenticated && props.userInfo.roles.length > 1 ? (
        <MenuItem
          onClick={handleChangeRole}
          classes={{ root: classes.menuItem }}
        >
          Change Role (currently {props.selectedRole})
        </MenuItem>
      ) : null}
      <MenuItem
        onClick={handleOpenLogoutDialog}
        classes={{ root: classes.menuItem }}
      >
        Logout
      </MenuItem>
    </Menu>
  );

  const drawer = (
    <>
      <Toolbar disableGutters>
        <div className={classes.mobileToolbar}>
          <div style={{ width: '10px' }}></div>
          <div>
            <Avatar src='/broken-image.jpg' className={classes.avatar} />
          </div>
          <div>
            <Typography noWrap className={classes.profileName}>
              Hi {props.userInfo.username}
            </Typography>
          </div>
          <div style={{ width: '20px' }}></div>
          <div>
            <Button
              size='small'
              onClick={handleProfileMenuOpen}
              disableRipple
              className={classes.profileButton}
            >
              <ChevronRightSharpIcon
                style={{ color: 'white' }}
                fontSize='small'
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
                  );
                }
              } else if (
                item.name !== 'News & Announcements' &&
                item.name !== 'Events'
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
                );
              }
            })}
          </List>
        </div>
      </div>
    </>
  );

  const rightDrawer = (
    <>
      <Toolbar />
      <div className={classes.drawerContainer}>
        <ChatIndex />
      </div>
    </>
  );

  return (
    <>
      {!props.isAuthenticated ? <Redirect to='/login' /> : ''}
      <ElevationScroll>
        <div className={classes.grow}>
          <AppBar position='fixed' className={classes.appBar}>
            <Toolbar>
              <IconButton
                color='inherit'
                aria-label='open drawer'
                edge='start'
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <img
                  src={HamburgerIcon}
                  alt='Menu'
                  style={{ color: 'white' }}
                />
              </IconButton>
              <Hidden smDown implementation='css'>
                <Typography>LOGO</Typography>
              </Hidden>

              <div className={classes.grow} />
              <Typography className={classes.title} variant='h6' noWrap>
                {matchesSm ? 'PSBB' : 'PSBB Learning Leadership Academy'}
              </Typography>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <IconButton
                  aria-label='show 2 new notifications'
                  color='inherit'
                >
                  <Badge badgeContent={2} color='secondary'>
                    <NotificationsNoneIcon />
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
                    size='small'
                    onClick={handleProfileMenuOpen}
                    disableRipple
                    className={classes.profileButton}
                  >
                    <Typography noWrap className={classes.profileName}>
                      Hi {props.userInfo.username}
                    </Typography>
                    <ExpandMoreIcon
                      style={{ color: 'white' }}
                      fontSize='small'
                    />
                  </Button>
                </div>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label='show 2 new notifications'
                  color='inherit'
                >
                  <Badge badgeContent={2} color='secondary'>
                    <NotificationsNoneIcon />
                  </Badge>
                </IconButton>
                <IconButton color='inherit'>
                  <img src={DesktopMessageIcon} alt='Menu' />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          {matchesSm ? renderMobileMenu : renderMenu}
        </div>
      </ElevationScroll>
      <div className={classes.toolbarMargin}></div>

      <nav className={classes.drawer}>
        <Hidden smUp implementation='css'>
          <Drawer
            variant='temporary'
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
        <Hidden smDown implementation='css'>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant='permanent'
            open
            PaperProps={{ elevation: 3 }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>

      <nav className={classes.drawerRight}>
        <Hidden smDown implementation='css'>
          <Drawer
            classes={{
              paper: classes.drawerRightPaper,
            }}
            variant='permanent'
            open
            anchor='right'
            PaperProps={{ elevation: 3 }}
          >
            {rightDrawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.mainContainer}>{props.children}</main>

      {openLogoutDialog ? (
        <Logout open={openLogoutDialog} handleClose={handleCloseLogoutDialog} />
      ) : (
        ''
      )}

      {props.changeRole ? (
        <RoleSelection open={true} handleClose={handleCloseLogoutDialog} />
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.auth.userInfo,
    isAuthenticated: state.auth.token !== null,
    selectedRole: state.auth.selectedRole,
    changeRole: state.auth.changeRole,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeRoleStart: () => dispatch(actions.authInitiateRoleSelection()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);

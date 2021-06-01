import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import StudentImage from '../../lunch/images/dummy.png'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    '& .MuiBox-root': {
      padding: '0px !important',
    },
    '& .PrivateTabIndicator-colorSecondary': {
      backgroundColor: '#7B72AF',
    },
    '& .MuiTabs-indicator': {
      backgroundColor: '#7B72AF !important',
    },
  },
  rootCard: {
    margin: '20px 0 20px 0',
    display: 'flex',
  },
  Avatar: {
    margin: '20px 0 20px 20px',
  },
  name: {
    fontFamily: 'Avenir Heavy',
    fontSize: 16,
    marginTop: '15px',
    marginLeft: '10px',
  },
  class_name: {
    // fontFamily: "Avenir Roman",
    // fontSize: 14,
    // marginTop: "4px",
    // marginLeft: "10px",
  },
  stuName: {
    fontFamily: 'Avenir medium',
    fontSize: 14,
    marginTop: '-32px',
    marginLeft: '10px',
  },
  borderLeft: {
    borderLeft: '1px solid #aeaeb2',
    height: '48px',
    textAlign: 'center',
  },
  stuClass: {
    fontFamily: 'Avenir Roman',
    fontSize: 14,
    position: 'absolute',
    marginTop: '14px',
    right: '41px',
    textTransform: 'uppercase',
    color: 'rgba(0,0,0,0.54)',
  },
  tabPanel: {
    '& .MuiBox-root:before': {
      padding: 'none !important',
    },
  },
  tabBar: {
    backgroundColor: theme.palette.mainBackground,
    color: theme.palette.common.deluge,
    boxShadow: 'none',
  },
  eventsTab: {
    padding: '6px 0px',
    borderBottom: '1px solid #aeaeb2',

    '& .MuiTab-wrapper': {
      height: '30px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
      fontFamily: 'Avenir medium',
    },
  },
  borderRight: {
    '& .MuiTab-wrapper': {
      borderRight: '1px solid  #aeaeb2',
    },
  },
  display: {
    display: 'none',
  },
  message: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Avenir Book',
    padding: '20px',
  },
}))

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  }
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault()
      }}
      {...props}
    />
  )
}

export default function NavTabs(props) {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const { seenUsers, unseenUsers } = props

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        className={classes.tabBar}
        style={{ backgroundColor: 'none', color: 'black' }}
      >
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
          className={classes.tabs}
        >
          <LinkTab
            className={`${classes.eventsTab} ${classes.borderRight}`}
            label={seenUsers ? `Seen (${seenUsers.length})` : 'Seen (0)'}
            href="/drafts"
            {...a11yProps(0)}
          />
          <LinkTab
            className={`${classes.eventsTab}`}
            label={
              unseenUsers ? `Unseen (${unseenUsers.length})` : 'Unseen (0)'
            }
            href="/trash"
            {...a11yProps(1)}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} className={classes.tabPanel}>
        {seenUsers ? (
          seenUsers.map((item) => (
            <Card className={classes.rootCard}>
              <div style={{ width: '7%' }}>
                <Avatar
                  className={classes.Avatar}
                  alt="Student image"
                  src={item.thumbnail ? `${item.thumbnail}` : StudentImage}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <CardContent>
                  <Typography className={classes.name}>
                    {item.firstname}
                  </Typography>
                </CardContent>
                {/* <CardContent>
                <div
                  className={
                    item.role === "Parent"
                      ? `${classes.borderLeft}`
                      : `${classes.display}`
                  }
                ></div>
                <Typography className={classes.stuName} variant="body2">
                  {item.childName}
                </Typography>
              </CardContent> */}
                <CardContent>
                  <Typography className={classes.stuClass}>
                    {item.lastname}
                  </Typography>
                </CardContent>
              </div>
            </Card>
          ))
        ) : (
          <Typography className={classes.message}>
            No students available yet!
          </Typography>
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {unseenUsers ? (
          unseenUsers.map((item) => (
            <Card className={classes.rootCard}>
              <div style={{ width: '7%' }}>
                <Avatar
                  className={classes.Avatar}
                  alt="Student image"
                  src={item.thumbnail ? `${item.thumbnail}` : StudentImage}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <CardContent>
                  <Typography className={classes.name}>
                    {item.firstname}
                  </Typography>
                </CardContent>
                {/* <CardContent>
                <div
                  className={
                    item.role === "Parent"
                      ? `${classes.borderLeft}`
                      : `${classes.display}`
                  }
                ></div>
                <Typography className={classes.stuName} variant="body2">
                  {item.childName}
                </Typography>
              </CardContent> */}
                <CardContent>
                  <Typography
                    className={classes.stuClass}
                    variant="body2"
                    component="p"
                  >
                    {item.lastname}
                  </Typography>
                </CardContent>
              </div>
            </Card>
          ))
        ) : (
          <Typography className={classes.message}>
            No students available yet!{' '}
          </Typography>
        )}
      </TabPanel>
    </div>
  )
}

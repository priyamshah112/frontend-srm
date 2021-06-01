import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { makeStyles, Typography } from '@material-ui/core'
import Box from '@material-ui/core/Grid'
import TabBarSection from './TabBarSection'
import { useHistory, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import Dropdown from './Dropdown'

const useStyles = makeStyles((theme) => ({
  sectionContainer: {
    height: '100%',
    width: '100%',
  },
  tabBar: {
    backgroundColor: theme.palette.mainBackground,
    color: theme.palette.common.deluge,
    boxShadow: 'none',
    marginTop: '20px',
    padding: '0 20px',
  },
  eventsTab: {
    padding: '6px 0px',
    borderBottom: '1px solid #aeaeb2',

    '& .MuiTab-wrapper': {
      height: '30px',
      fontSize: 14,
      fontFamily: 'Avenir book',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
  borderRight: {
    '& .MuiTab-wrapper': {
      borderRight: '1px solid  #aeaeb2',
    },
  },
  tabContainer: {
    // padding: "20px",
  },
  backImg: {
    cursor: 'pointer',
    position: 'absolute',
    left: '20px',
    top: '25px',
  },
  heading: {
    fontFamily: 'Avenir Medium',
    fontSize: 18,
    textAlign: 'center',
    color: '#1C1C1E',
    marginTop: '20px',
  },
  dropdownContainer: {
    margin: '20px',
  },
  selectStudent: {
    fontFamily: 'Avenir book',
    fontSize: 14,
    margin: '20px',
    textAlign: 'center',
  },
}))

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={4}>{children}</Box>}
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  }
}

function TabBar(props) {
  const classes = useStyles()
  const { id, selectedTab } = useParams()
  const student_id = id
  const history = useHistory()
  const [value, setValue] = useState(0)
  const [menuVal, setMenuVal] = useState('general')
  const { selectedRole } = props
  const selectedStudent = localStorage.getItem('selectedStudent')
  const diaryType = localStorage.getItem('diaryType')
  let tabValue = parseInt(selectedTab)

  const handleChange = (event, newValue) => {
    setValue(newValue)
    if (selectedRole === 'teacher' || selectedRole === 'admin') {
      history.push(`/diary/${student_id}/tab/${newValue}`)
    } else {
      history.push(`/diary/tab/${newValue}`)
    }
  }
  const handleMenuChange = (e) => {
    setMenuVal(e.target.value)
    localStorage.setItem('diaryType', e.target.value)
  }
  return (
    <div className={classes.tabContainer}>
      <div>
        <Typography className={classes.heading}>Diary</Typography>
      </div>
      <AppBar position="sticky" className={classes.tabBar}>
        {props.selectedRole === 'teacher' || props.selectedRole === 'admin' ? (
          <Tabs
            centered
            value={tabValue}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab
              label="Teacher"
              {...a11yProps(0)}
              className={`${classes.eventsTab} ${classes.borderRight}`}
            />
            <Tab
              label="Parent"
              {...a11yProps(1)}
              className={classes.eventsTab}
            />
          </Tabs>
        ) : (
          <Tabs
            centered
            value={tabValue}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab
              label="Parent"
              {...a11yProps(0)}
              className={`${classes.eventsTab} ${classes.borderRight}`}
            />
            <Tab
              label="Teacher"
              {...a11yProps(1)}
              className={classes.eventsTab}
            />
          </Tabs>
        )}
      </AppBar>
      {[...Array(2).keys()].map((id) => (
        <TabPanel value={tabValue} index={id} key={id}>
          {selectedRole === 'admin' || selectedRole === 'teacher' ? (
            selectedStudent ? (
              <TabBarSection
                selectedTab={tabValue}
                menuVal={diaryType ? diaryType : menuVal}
                handleMenuChange={handleMenuChange}
                student_id={student_id}
                createdBy={!id}
                selectedTab={value}
              />
            ) : (
              <div className={classes.dropdownContainer}>
                <Dropdown />
                <Typography className={classes.selectStudent}>
                  Please select student first!
                </Typography>
              </div>
            )
          ) : (
            <TabBarSection
              selectedTab={tabValue}
              menuVal={diaryType ? diaryType : menuVal}
              handleMenuChange={handleMenuChange}
              student_id={student_id}
              createdBy={!id}
              selectedTab={value}
            />
          )}

          <br />
          <br />
          <br />
        </TabPanel>
      ))}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    selectedRole: state.auth.selectedRole,
  }
}

export default connect(mapStateToProps, {})(TabBar)

import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { AppBar, Tabs, Tab, Box } from '@material-ui/core'
import PaymentSection from './PaymentsSection'
import { useHistory, useParams } from 'react-router'

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
      {value === index && <Box>{children}</Box>}
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  }
}

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100%',
    backgroundColor: theme.palette.mainBackground,
    height: '100%',
    marign: '0',
    padding: '0',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },

  eventsTab: {
    padding: '6px 0',
    borderBottom: '1px solid #aeaeb2',

    '@media (min-width: 600px)': {
      minWidth: '100px',
    },
    '& .MuiTab-wrapper': {
      height: '30px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '11px',
    },
  },
  tabBar: {
    backgroundColor: theme.palette.mainBackground,
    color: theme.palette.common.deluge,
    boxShadow: 'none',
  },
  borderRight: {
    '& .MuiTab-wrapper': {
      borderRight: '1px solid  #aeaeb2',
    },
  },
}))
const Payments = () => {
  const classes = useStyles()
  let history = useHistory()
  const [value, setValue] = useState(0)
  let { selectedTab } = useParams()
  console.log('selectedTab :>> ', typeof selectedTab, parseInt(selectedTab))
  let tabValue = parseInt(selectedTab)
  const handleChange = (event, newValue) => {
    setValue(newValue)
    history.push(`/payments/tab/${newValue}`)
  }
  return (
    <div className={classes.container}>
      <AppBar position="sticky" className={classes.tabBar}>
        <Tabs
          centered
          value={tabValue}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab
            label="all"
            {...a11yProps(0)}
            className={`${classes.eventsTab} ${classes.borderRight}`}
          />
          <Tab
            label="open"
            {...a11yProps(1)}
            className={`${classes.eventsTab} ${classes.borderRight}`}
          />
          <Tab label="close" {...a11yProps(2)} className={classes.eventsTab} />
        </Tabs>
      </AppBar>
      <TabPanel value={tabValue} index={0}>
        <PaymentSection selectedTab={tabValue} key={0} status={'all'} />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <PaymentSection
          selectedTab={tabValue}
          key={1}
          filter={0}
          status={'open'}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <PaymentSection
          selectedTab={tabValue}
          key={2}
          filter={1}
          status={'close'}
        />
      </TabPanel>
    </div>
  )
}

export default Payments

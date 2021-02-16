import React,{ useState } from 'react'
import { makeStyles, AppBar, Tabs, Tab, Box } from '@material-ui/core'
import StudentGalleryContainer from './galleryStudent'
import SharedGalleryContainer from './sharedGalleryStudent'

const useStyles = makeStyles((theme) => ({
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
			fontSize: '11px',
		},
	},

	borderRight: {
		'& .MuiTab-wrapper': {
			borderRight: '1px solid  #aeaeb2',
		},
	},
}))

function TabPanel(props) {
    const { children, value, index, ...other } = props

    return (
        <div
            role='tabpanel'
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

const StudentGallery = () =>{   
    const classes = useStyles() 
    const [tabValue,setTabValue] = useState(0)
    const handleChange = (event, newValue) => {
		setTabValue(newValue);
	};
    return (
        <>
            <AppBar position='sticky' className={classes.tabBar}>
                <Tabs
                    centered
                    value={tabValue}
                    onChange={handleChange}
                    indicatorColor='primary'
                    textColor='primary'
                    variant='fullWidth'
                >
                    <Tab
                        label='My Gallery'
                        {...a11yProps(0)}
                        className={`${classes.eventsTab} ${classes.borderRight}`}
                    />
                    <Tab
                        label='Shared with Me'
                        {...a11yProps(1)}
                        className={classes.eventsTab}
                    />
                </Tabs>
            </AppBar>
            <TabPanel value={tabValue} index={0}>
                <StudentGalleryContainer key={0} created_by={false} />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
                <SharedGalleryContainer key={1} created_by={true} />
            </TabPanel>
        </>
    )

}

export default StudentGallery;
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import MyLocationRoundedIcon from '@material-ui/icons/MyLocationRounded'
import GoogleMapReact from 'google-map-react'
import BackIcon from '../../assets/images/Back.svg'

const useStyles = makeStyles((theme) => ({
	container: {
		width: '95%',
		backgroundColor: theme.palette.mainBackground,
		height: '100%',
		marign: '0',
		padding: '3%',
		overflowY: 'auto',
	},
	backImg: {
		float: 'left',
		transform: 'translateY(7px)',
		cursor: 'pointer',
		width: '15px',
	},
	tabBar: {
		backgroundColor: theme.palette.mainBackground,
		color: theme.palette.common.deluge,
		boxShadow: 'none',
	},
	ui_back: {
		width: '30px',
	},
	ui_tabs: {
		backgroundColor: 'purple',
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
	formControl: {
		marginTop: '15px',
	},
}))

function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		'aria-controls': `full-width-tabpanel-${index}`,
	}
}
const Transport_mode = (props) => {
	const classes = useStyles()
	const [value, setValue] = useState(0)
	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	const defaultProps = {
		center: {
			lat: 59.95,
			lng: 30.33,
		},
		zoom: 11,
	}
	return (
		<div className={classes.container}>
			<AppBar position='sticky' className={classes.tabBar}>
				<Tabs
					centered
					value={value}
					onChange={handleChange}
					indicatorColor='primary'
					textColor='primary'
					variant='fullWidth'
				>
					<div className={classes.ui_back}>
						<img
							src={BackIcon}
							alt='Back'
							className={classes.backImg}
							onClick={() => {
								props.change_mode(false)
							}}
						/>
					</div>
					<Tab
						label='Add Stop'
						{...a11yProps(0)}
						className={`${classes.eventsTab} ${classes.borderRight}`}
					/>
					<Tab
						label='Change Route'
						{...a11yProps(1)}
						className={classes.eventsTab}
					/>
				</Tabs>
			</AppBar>

			<FormControl fullWidth={true} className={classes.formControl}>
				<InputLabel>Search</InputLabel>

				<Input
					id='standard-adornment-password'
					endAdornment={
						<InputAdornment position='end'>
							<IconButton aria-label='toggle password visibility'>
								<MyLocationRoundedIcon />
							</IconButton>
						</InputAdornment>
					}
				/>
			</FormControl>

			<GoogleMapReact
				bootstrapURLKeys={{ key: 'AIzaSyDOT2Bw7_GZKku97EQR42lC-x4xB5q8xpQ' }}
				defaultCenter={defaultProps.center}
				defaultZoom={defaultProps.zoom}
			></GoogleMapReact>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {}
}

export default connect(mapStateToProps)(Transport_mode)

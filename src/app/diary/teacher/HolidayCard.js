import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import * as moment from 'moment'

const useStyle = makeStyles((theme) => ({
	span: {
		textTransform: 'capitalize',
	},
	typography: {
		margin: '16px 0',
		marginTop: '-9px',
	},
	card: {
		width: '100%',
		marginTop: '15px',
		borderRadius: 0,
		boxShadow: 'none',
		marginLeft: '35px',
	},
	reminder: {
		width: '100%',
		textAlign: 'right',
		cursor: 'pointer',
	},
	NewsHeader: {
		padding: '8px 16px 8px 16px !important',
		'& span': {
			cursor: 'pointer',
		},
		[theme.breakpoints.down('sm')]: {
			padding: '8px 16px 8px 16px !important',
			'& span': {
				fontSize: '16px',
			},
		},
	},
	cardContent: {
		padding: '20px 20px 12px !important',
		margin: '10px',
		// marginTop: '20px',
		marginLeft: '55px',
		overflow: 'auto',
		backgroundColor:'white'
	},
	contentMargin: {
		marginTop: '16px',
	},
	announcementText: {
		fontStyle: 'normal',
	},
	announcementImg: {
		justifyContent: 'center',
		textAlign: 'center',
		'& img': {
			maxWidth: '100%',
			border: `1px solid ${theme.palette.common.deluge}`,
			borderRadius: '4px',
		},
	},
	statusText: {
		fontStyle: 'normal',
		textTransform: 'uppercase',
		paddingTop: '10px',
		[theme.breakpoints.down('xs')]: {
			fontSize: '13px',
		},
	},
	cardActionStyle: {
		padding: '8px 16px 8px 16px',
		color: '#6C757D',
	},
	contentCenter: {
		textAlign: 'right',
		height: '50%',

		'& img': {
			marginTop: '25px',
			width: '25px',
			cursor: 'pointer',

			[theme.breakpoints.down('xs')]: {
				marginTop: '10px',
			},
		},
		[theme.breakpoints.down('xs')]: {
			textAlign: 'right',
		},
	},
	createdDate: {
		padding: '5px 0 5px 0',
	},
	editBtnGrid: {
		textAlign: 'right',
	},
	deleteIcon: {
		marginLeft: '10px',
	},
	editBtn: {
		marginLeft: 'auto',
		cursor: 'pointer',
	},
	cardHeader: {
		padding: '20px 20px 10px',
	},
	labelText: {
		fontStyle: 'normal',
		color: '#000',
	},

	editBtnDiv: {
		marginLeft: 'auto',
		transform: 'translateY(4px)',
	},
	editBtn: {
		width: '19px',
		height: '19px',
		paddingLeft: '10px',
		transform: 'translateY(4px)',
		cursor: 'pointer',
	},
	deleteBtn: {
		width: '19px',
		height: '19px',
		paddingLeft: '5px',
		// transform: 'translateY(4px)',
		cursor: 'pointer',
	},
	normalText: {
		fontStyle: 'normal',
		color: `${theme.palette.common.blackRussian}`,
		fontWeight: 500,
		opacity: 1,
	},
	textAlignRight: {
		textAlign: 'right',
		color: '#AEAEB2',
		fontSize: '0.85rem',
	},
	textAlignRight1: {
		textAlign: 'left',
		color: '#AEAEB2',
		fontSize: '0.85rem',
		paddingLeft: '50px',
	},
	gridContainer:{
		display:'flex',
		justifyContent:'flex-end',
	},
	imgGrid: {
		position: 'relative',
	},
	imgDiv: {
		bottom: '0px',
		right: '35px',
		position: 'absolute',
		margin: '16px 0',
	},
	imgDiv_del: {
		bottom: 0,
		right: 0,
		position: 'absolute',
		margin: '16px 0',
		transform: 'translateY(5px)',
		cursor: 'pointer',
		color: '#AEAEB2',
	},
	circle: {
		display: 'flex',
		justifyContent: 'center',
		backgroundColor: '#7B72AF',
		color: 'white',
		borderRadius: '50%',
		padding: '25px',
		width: '18px',
		position: 'absolute',
		left: '15px',
		marginTop: '-10px',
	},
}))

export default function HolidayCard() {
	const classes = useStyle()
	const title = 'New Year'
	const created_at = '1 Jan 2021'

	return (
		<Grid
			container
			direction='row'
			justify='center'
			alignContent='center'
			className={classes.cardContainer}
		>
			<div className={classes.card}>
				<div className={classes.cardContent}>
					<div className={classes.circle}>
						<span className={classes.span}>26</span>
					</div>
					<Grid container className={classes.gridContainer}>
						<Grid item xs={7}>
							<span>
								{title ? (
									<Typography variant='body1'>{title}</Typography>
								) : (
									<Typography variant='body1'>N/A</Typography>
								)}
							</span>
						</Grid>
						<Grid item xs={4}>
							<Typography
								className={`${classes.textAlignRight}`}
								variant='body2'
							>
								Created at: {moment(created_at).format('DD MMM YY')}
							</Typography>
						</Grid>
					</Grid>
					<Grid container className={classes.gridContainer}>
						<Grid item xs={7}>
							<Typography
								style={{ fontSize: '.8rem' }}
								className={classes.labelText}
								variant='body2'
							>
								<Typography
									className={`${classes.typography}`}
									variant='body2'
								></Typography>
								1 Jan 2021
							</Typography>
						</Grid>
						<Grid item xs={4}></Grid>
					</Grid>
				</div>
				<div className={classes.cardContent}>
					<div className={classes.circle}>
						<span className={classes.span}>26</span>
					</div>
					<Grid container className={classes.gridContainer}>
						<Grid item xs={7}>
							<span>
								{title ? (
									<Typography variant='body1'>{title}</Typography>
								) : (
									<Typography variant='body1'>N/A</Typography>
								)}
							</span>
						</Grid>
						<Grid item xs={4}>
							<Typography
								className={`${classes.textAlignRight}`}
								variant='body2'
							>
								Created at: {moment(created_at).format('DD MMM YY')}
							</Typography>
						</Grid>
					</Grid>
					<Grid container className={classes.gridContainer}>
						<Grid item xs={7}>
							<Typography
								style={{ fontSize: '.8rem' }}
								className={classes.labelText}
								variant='body2'
							>
								<Typography
									className={`${classes.typography}`}
									variant='body2'
								></Typography>
								1 Jan 2021
							</Typography>
						</Grid>
						<Grid item xs={4}></Grid>
					</Grid>
				</div>
			</div>
		</Grid>
	)
}

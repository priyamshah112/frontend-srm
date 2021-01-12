import React, { useState } from 'react'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import * as moment from 'moment'
import EditIcon from '../../../assets/images/Edit.svg'

const useStyle = makeStyles((theme) => ({
	span: {
		textTransform: 'capitalize',
	},
	typography: {
		margin: '16px 0',
	},
	card: {
		width: '100%',
		margin: '15px',
		marginTop: '20px',
		borderRadius: 0,
		boxShadow: 'none',
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
		padding: '0px 16px 0px 16px',
		margin: '10px',
		overflow: 'auto',
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
		color: '#8E8E93',
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
	cardContent: {
		padding: '20px 20px 12px !important',
		margin: '10px',
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
}))

export default function LibraryCard() {
	const classes = useStyle()
	const title = 'English Book V'
	const created_at = '10 Dec 20'
	const status = 'Borrowed'
	const [open, setOpen] = useState(false)
	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleCloseNO = () => {
		setOpen(false)
	}
	const handleCloseYES = () => {
		setOpen(false)
	}

	return (
		<>
			<Dialog
				open={open}
				onClose={handleCloseNO}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>
					{'Are you sure you want to delete?'}
				</DialogTitle>
				<DialogActions>
					<Button onClick={handleCloseNO} color='primary' autoFocus>
						NO
					</Button>
					<Button onClick={handleCloseYES} color='primary'>
						YES
					</Button>
				</DialogActions>
			</Dialog>

			<Grid
				container
				direction='row'
				justify='center'
				alignContent='center'
				className={classes.cardContainer}
			>
				<Card className={classes.card}>
					<CardContent className={classes.cardContent}>
						<Grid container>
							<Grid item xs={8}>
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
						<Grid container>
							<Grid item xs={12}>
								<Typography
									className={`${classes.labelText} ${classes.textAlignRight}`}
									variant='body2'
								>
									Status : <span className={`${classes.span}`}>{status}</span>
								</Typography>
							</Grid>
						</Grid>
						<Grid container>
							<Grid item xs={8}>
								<Typography className={classes.labelText} variant='body2'>
									<Typography
										className={`${classes.typography}`}
										variant='body2'
									></Typography>
									10 Dec - 15 Dec 2020
								</Typography>
							</Grid>
							<Grid item xs={4} className={classes.imgGrid}>
								{status !== 'published' ? (
									<>
										<div
											className={`${classes.imgDiv_del}`}
											// onClick={()=>handledeleteHomework(id)}
											onClick={handleClickOpen}
										>
											{/* <img
                                        src={DeleteIcon}
                                        className={classes.deleteBtn}
                                        onClick={()=>handledeleteHomework(id)}
                                    /> */}
											<DeleteOutlineOutlinedIcon fontSize={'medium'} />
										</div>
										<div
											className={`${classes.imgDiv} ${classes.textAlignRight}`}
										>
											<img
												src={EditIcon}
												className={classes.editBtn}
												// onClick={handleEditHomework}
											/>
										</div>
									</>
								) : (
									''
								)}
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			</Grid>
		</>
	)
}

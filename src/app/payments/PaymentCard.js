import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import { Typography, makeStyles, Grid } from '@material-ui/core'
import NumberFormat from 'react-number-format'
import GreenTick from '../../assets/images/greenTick.svg'

const useStyles = makeStyles((theme) => ({
	card: {
		boxShadow: 'none',
		background: '#FFFFFF 0% 0% no-repeat padding-box',
		borderRadius: '10px',
		marginTop: '20px',
	},
	cardHeader: {
		padding: '15px 20px 0 20px',
	},
	iconButtonRoot: {
		padding: '8px',
	},
	titleIconSpan: {
		marginRight: '8px',
	},
	titleIcon: {
		transform: 'translateY(3px)',
	},
	greentick: {
		padding: '5px 5px 0px 0px',
	},
	cardTitle: {
		fontSize: '16px',
		fontStyle: 'normal',
		fontWeight: 500,
		cursor: 'pointer',
		'&:hover': {
			textDecoration: 'underline',
		},
	},
	cardActions: {
		padding: '0 20px 20px 20px',
	},
	cardContent: {
		padding: '5px 20px 20px 20px',
		'&:last-child': {
			paddingBottom: '20px',
		},
	},
	menuItem: {
		paddingLeft: '10px',
		paddingRight: '10px',
		colour: '#1C1C1E',
	},
	borderBottomDiv: {
		width: '90%',
		height: '30px',
		margin: 'auto',
		marginTop: '5px',
		borderBottom: '1px solid #D1D1D6',
	},
	borderBottomLastDiv: {
		width: '90%',
		height: '30px',
		margin: 'auto',
		marginTop: '5px',
	},
	menuTopItemMargin: {
		marginTop: '5px',
	},
	menuItemRoot: {
		padding: 0,
	},
	menuContainer: {
		backgroundColor: theme.palette.common.darkGray,
		color: 'black',
		minWidth: '150px',
		'&.MuiPaper-rounded': {
			boxShadow: '0px 6px 6px #00000029',
		},
		[theme.breakpoints.down('md')]: {
			minWidth: '150px',
		},
		[theme.breakpoints.down('sm')]: {
			minWidth: '150px',
		},
	},
	menuList: {
		width: '100% !important',
		padding: 0,
	},
	contentStyle: {
		color: `${theme.palette.common.lightFont}`,
		fontSize: '14px',
		fontStyle: 'normal',
	},
	readClass: {
		textAlign: 'right',
		position: 'relative',
	},
	amount: {
		color: `${theme.palette.common.lightFont}`,
		position: 'absolute',
		bottom: '0px',
		right: '0px',
	},
}))

const PaymentCard = (props) => {
	const classes = useStyles()
	const history = useHistory()

	return (
		<Card className={classes.card}>
			<CardHeader
				className={classes.cardHeader}
				action={
					<>
						{props.payments.status === '1' ? (
							<img src={GreenTick} alt='done' className={classes.greentick} />
						) : (
							''
						)}
					</>
				}
				title={
					<>
						<Typography
							className={classes.cardTitle}
							onClick={() => history.push(`/payments/${props.payments.id}`)}
						>
							{props.payments.payment_title}
						</Typography>
					</>
				}
			/>
			<CardContent classes={{ root: classes.cardContent }}>
				<Grid container>
					<Grid item xs={9}>
						<Typography className={classes.contentStyle}>
							{props.payments.payment_summary}
						</Typography>
					</Grid>
					<Grid item xs={3} className={classes.readClass}>
						<Typography variant='body2' className={classes.amount}>
							<span>&#8377;</span>

							<span>&nbsp;</span>
							<NumberFormat
								value={parseInt(props.payments.amount) / 100}
								displayType={'text'}
								thousandSeparator={true}
								thousandsGroupStyle='lakh'
							/>
						</Typography>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	)
}
const mapStateToProps = (state) => {
	return {
		selectedRole: state.auth.selectedRole,
		token: state.auth.token,
	}
}

export default connect(mapStateToProps)(PaymentCard)

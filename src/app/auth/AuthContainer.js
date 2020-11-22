import React from 'react'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { makeStyles } from '@material-ui/core/styles'

import Background from '../../assets/images/login/background.svg'
import FooterImage from '../../assets/images/login/footer.svg'
import MobileFooterImage from '../../assets/images/login/mobileFooter.svg'

const useStyle = makeStyles((theme) => ({
	cardStyle: {
		width: '400px',
		margin: 'auto',
		boxShadow: 'none',
		backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%237B72AFFF' stroke-width='2' stroke-dasharray='7' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
		borderRadius: 0,
		background: '#fbfaff',
		textAlign: 'center',
		zIndex: '1',
		position: 'relative',
		display: 'block',
		padding: 0,
		[theme.breakpoints.down('xs')]: {
			padding: 0,
			width: '90%',
		},
	},
	cardContentStyle: {
		padding: 0,
	},
	authContainer: {
		marginTop: '10px',
	},
	loginContainer: {
		backgroundImage: `url(${Background})`,
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		width: '100%',
		minHeight: '100%',
		margin: '0px',
		padding: '0px',
		textAlign: 'center',
		'& .imageContainer': {
			width: '100%',
			textAlign: 'center',
			position: 'absolute',
			bottom: '0px',
			[theme.breakpoints.down('xs')]: {
				position: 'relative',
				marginTop: '30px',
			},
		},
		'& h1': {
			margin: 0,
			padding: 0,
		},
	},

	loginForm: {
		paddingTop: '40px',
		[theme.breakpoints.down('xs')]: {
			paddingTop: '10px',
		},
	},

	boxMargin: {
		marginTop: '30px',
		paddingTop: '20px',
		[theme.breakpoints.down('xs')]: {
			marginTop: '10px',
		},
	},
	footerImage: {
		width: '100%',
		[theme.breakpoints.down('xs')]: {
			display: 'none',
		},
	},
	mobileFooterImage: {
		width: '80%',
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},
	boxHeadingContainer: {
		...theme.boxHeadingContainer,
	},
}))

const AuthContainer = (props) => {
	const classes = useStyle()
	return (
		<div className={classes.loginContainer}>
			<Box className={classes.loginForm}>
				<h1>Logo</h1>

				<Container className={classes.authContainer}>
					<Card raised={false} className={classes.cardStyle}>
						<CardContent className={classes.cardContentStyle}>
							<Box className={classes.boxMargin}>
								<span className={classes.boxHeadingContainer}>
									{props.title}
								</span>
							</Box>
							{props.children}
						</CardContent>
					</Card>
				</Container>
			</Box>
			<div className='imageContainer'>
				<img
					className={classes.footerImage}
					src={FooterImage}
					alt='Desktop Footer'
				/>
				<img
					className={classes.mobileFooterImage}
					src={MobileFooterImage}
					height='200px'
					alt='Mobile Footer'
				/>
			</div>
		</div>
	)
}

export default AuthContainer

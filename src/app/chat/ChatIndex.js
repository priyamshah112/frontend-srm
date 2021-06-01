import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { makeStyles, Typography, Input, ListItem } from '@material-ui/core'
import UserIcon from '../../assets/images/chat/User.svg'
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded'
import { Lang } from '../../Constants/Languages/English'
import Chat from './Chat'
import Contacts from './Contacts'

const useStyles = makeStyles((theme) => ({
	cursorPointer: {
		cursor: 'pointer',
	},
	root: {
		marginLeft: '13px',
		marginTop: '15px',
		marginRight: '13px',
	},
	headingContainer: {
		display: 'flex',
		alignItems: 'center',
		'& div': {
			margin: '3px',
		},
		width: '100%',
	},
	headingText: {
		fontWeight: 400,
		fontSize: '1rem',
		fontStyle: 'normal',
		color: theme.palette.common.bastille,
		width: '55%',
	},
	addTaskIcon: {
		cursor: 'pointer',
		bottom: 0,
	},
	newGroup: {
		verticalAlign: 'middle',
		justifyContent: 'center',
		color: theme.palette.primary.main,
	},
}))

const ChatIndex = (props) => {
	const {
		contacts,
		chatUsers,
	} = props

	const classes = useStyles()
	const [newGroup, setNewGroup] = useState(false)	

	return (
		<>
			<div className={classes.root}>
				{!newGroup && (
					<div className={classes.headingContainer}>
						<div>
							<img src={UserIcon} alt='User' />
						</div>
						<Typography className={classes.headingText}>
							{' '}
							{Lang.HOME.CHATS}
						</Typography>
						<AddCircleRoundedIcon
							color='primary'
							className={classes.addTaskIcon}
							onClick={() => setNewGroup(true)}
						/>
						<div className={classes.newGrpPosition}>
							<Typography className={[classes.newGroup].join(' ')}>
								<span
									className={classes.cursorPointer}
									onClick={() => setNewGroup(true)}
								>
									{Lang.HOME.NEW_GROUP}
								</span>
							</Typography>
						</div>
					</div>
				)}

				{
					!newGroup ? 
						<Chat
							userInfo={props.userInfo}
							chatUsers={chatUsers}
						/>
					:  	
						<Contacts 
							current_user_id={props.userInfo.id}
							contacts={contacts}	
							setGroup={setNewGroup}			
						/>
				}
			</div>
		</>
	)
}

const mapStateToProps = ({Chat}) => {
	const { contacts,chatUsers } = Chat;
	return {
	  	contacts: contacts,
	  	chatUsers: chatUsers,
	}
}

export default connect(mapStateToProps)(ChatIndex)

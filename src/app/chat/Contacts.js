import React, { useEffect, useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge'

const StyledBadge = withStyles((theme) => ({
	badge: {
		backgroundColor: '#44b700',
		color: '#44b700',
		boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
		'&::after': {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			borderRadius: '50%',
			content: '""',
		},
	},
}))(Badge)

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',

		backgroundColor: theme.palette.background.paper,
	},
	inline: {
		display: 'inline',
	},
	listItem: {
		backgroundColor: theme.palette.common.whiteSmoke,
		color: theme.palette.common.blackRussian,
		'&:hover': {
			backgroundColor: theme.palette.common.quartz,
		},
		borderRadius: '10px',
		fontSize: '0.875rem',
		fontWeight: 300,
		marginBottom: '12px',
	},
}))

const list = [
	{
		name: 'Akshay Srinivas',
		avatar: '/static/images/avatar/1.jpg',
		message: 'Are you attending class today?',
		status: 'Online',
	},
	{
		name: 'Isha Roy',
		avatar: '/static/images/avatar/2.jpg',
		message: 'Need project details. Share with me?',
		status: '',
	},
	{
		name: 'Cindy Baker',
		avatar: '/static/images/avatar/3.jpg',
		message: 'Are you attending class today?',
		status: '',
	},
]

export default function Contacts({ filter }) {
	const classes = useStyles()
	const [Chats, setChats] = useState(list)
	const [filteredChat, setFilteredChats] = useState(list)

	useEffect(() => {
		if (filter == '') {
			setFilteredChats([...Chats])
		} else {
			let chat = Chats.filter((c) => {
				return c.name.toLowerCase().includes(filter.toLowerCase())
			})

			setFilteredChats([...chat])
		}
	}, [filter])

	return (
		<>
			<List className={classes.root}></List>
			<List className={classes.root}>
				{filteredChat.map((chat) => {
					return (
						<ListItem alignItems='flex-start' className={classes.listItem}>
							<ListItemAvatar>
								<StyledBadge
									overlap='circle'
									anchorOrigin={{
										vertical: 'bottom',
										horizontal: 'right',
									}}
									variant={chat.status == 'Online' ? 'dot' : ''}
								>
									<Avatar alt={chat.name} src={chat.avatar} />
								</StyledBadge>
							</ListItemAvatar>
							<ListItemText primary={chat.name} secondary={chat.message} />
						</ListItem>
					)
				})}
			</List>
		</>
	)
}

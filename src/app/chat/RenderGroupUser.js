import React from 'react'
import Typography from '@material-ui/core/Typography'
import { Avatar, Badge, ListItemAvatar } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'

const StyledBadge = withStyles((theme) => ({
	badge: {
		backgroundColor: theme.palette.grey[400],
		color: theme.palette.grey[200],
		padding: 10,
		boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
		'&::after': {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			borderRadius: '50%',
			fontSize: 20,
			content: '"\u00D7"',
		},
		borderRadius: '50%',
	},
}))(Badge)

const styles = {
	centerText: {
		textAlign: 'center',
		cursor: 'pointer',
		maxWidth: 75,
	},
}

const RenderUsers = ({ user, removeContact }) => {
	return (
		<ListItemAvatar
			onClick={() => removeContact(user)}
			style={styles.centerText}
		>
			<StyledBadge
				overlap='circle'
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				variant={(user.status = 'dot')}
			>
				<Avatar alt={user.firstname} src={user.avatar} />
			</StyledBadge>
			<Typography style={styles.centerText}>
				{user.firstname} {user.lastname}
			</Typography>
		</ListItemAvatar>
	)
}

export default RenderUsers

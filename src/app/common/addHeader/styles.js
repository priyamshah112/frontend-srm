import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
	header: {   
		textAlign: 'right',
		paddingBottom: '5px',
	},
	addNew: {
		color: theme.palette.common.deluge,
		'& .new': {
			float: 'right',
			fontSize: '14px',
			padding: '5px',
		},
		'& img': {
			margin: '5px',
			height: '20px',
			cursor: 'pointer',
		},
	},
	addNewDiv: {
		cursor: 'pointer',
		width: 'fit-content',
		marginLeft: 'auto',
	},
}))

export default useStyles;
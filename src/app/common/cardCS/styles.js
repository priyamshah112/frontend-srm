import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(() => ({
	card: {
		width: '100%',
		margin: 'auto',
		marginTop: '10px',
		marginBottom: '10px',
		borderRadius: '5px',
		boxShadow: 'none',
		padding: '20px',
		boxSizing: 'border-box',
	},
}))

export default useStyles;
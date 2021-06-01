import { makeStyles } from '@material-ui/styles'
import { colors } from '../../common/ui/appStyles'

const useStyles = makeStyles(() => ({
	card: {
		width: '100%',
		margin: 'auto',
		borderRadius: 5,
		boxShadow: 'none',
		backgroundColor: colors.white,	
		padding: '20px',
		boxSizing: 'border-box',
	},
}))

export default useStyles;
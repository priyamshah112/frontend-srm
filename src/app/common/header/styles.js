import { makeStyles } from '@material-ui/styles'
import { colors, fonts } from '../ui/appStyles'

const useStyles = makeStyles(() => ({
	header: {
		width: '100%',
		paddingBottom: '10px',
	},
	header_title:{
		fontSize: '18px',
		fontFamily: fonts.avenirMedium,
		color: colors.lightBlack,
		textAlign: 'center',
	}
}))

export default useStyles;
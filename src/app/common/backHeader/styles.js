import { makeStyles } from '@material-ui/styles'
import { colors } from '../../common/ui/appStyles'

const useStyles = makeStyles(() => ({
	backImg: {		
		height: '18px',
		width: '10px',
		float: 'left',
		transform: 'translate(0px, 2px)',
		cursor: 'pointer',
	},
	titleText: {
		textAlign: 'center',
		margin: 'auto',
		color: colors.lightBlack,
	},
}));

export default useStyles;
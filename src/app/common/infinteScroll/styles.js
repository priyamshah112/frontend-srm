import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({	
	InfiniteScroll: {
		overflow: 'revert !important',
		'& .infinite-scroll-component': {
			overflow: 'revert !important',
		},
	},	
	loading: {
		width: '100%',
		textAlign: 'center',
		paddingTop: '8px',
		fontSize: '20px',
	},
}))

export default useStyles;
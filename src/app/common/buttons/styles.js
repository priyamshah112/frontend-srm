import { makeStyles } from '@material-ui/core/styles'

const useStyle = makeStyles((theme) => ({
    dateTimeContainer: {
		minWidth: '200px',

		'& .MuiInput-underline:before': {
			borderBottom: '2px solid #eaeaea',
		},
		'& .MuiInput-underline:hover:not(.Mui-disabled):before': {
			borderBottom: '2px solid #7B72AF',
			transitionProperty: 'border-bottom-color',
			transitionDuration: '500ms',
			transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
		},		
	},
	toolbar:{
		'& .MuiTypography-h3':{
			fontSize: '3rem',
		},
		'& .MuiTypography-subtitle1':{
			fontSize: '1rem',
		}
	},
	dialogActionsContainer: {
		'&.MuiDialogActions-root': {
			justifyContent: 'center',
			marginBottom: '10px',
		},
	},
	button: {
		minWidth: '80px',
		textTransform: 'none',
	},
	confirmationText: {
		fontWeight: 500,
		fontSize: '1rem',
		color: '#000000',
	},
	dialogContent: {
		textAlign: 'center',
	},   
    publishBtn: {
        borderRadius: '3px',
        width: 'inherit',
        margin: 0,
		textTransform: "none",
    },
    publishLaterBtn: {
        backgroundColor: `${theme.palette.common.white}`,
        border: `1px solid ${theme.palette.common.adornment}`,
        marginRight: '20px',
    },
}))

export default useStyle;
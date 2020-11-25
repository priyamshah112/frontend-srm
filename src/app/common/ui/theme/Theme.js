import { createMuiTheme } from '@material-ui/core/styles'

const srmDeluge = '#7B72AF'
const srmBlackRussian = '#1C1C1E'
const srmBastille = '#2C2C2E'
const srmWhite = '#FFFFFF'
const roleCardUnselected = '#ECEBF3'
const roleCardSelected = '#A09AC2'
const mainBackground = '#F4F4F4'
const srmQuartz = '#F2F0FA'
const srmAdornment = '#AEAEB2'
const srmDarkGray = '#F1F1F7'
const srmlightFont = '#8E8E93'
export default createMuiTheme({
	palette: {
		common: {
			deluge: `${srmDeluge}`,
			blackRussian: `${srmBlackRussian}`,
			bastille: `${srmBastille}`,
			white: `${srmWhite}`,
			quartz: `${srmQuartz}`,
			adornment: `${srmAdornment}`,
			whiteSmoke: `${mainBackground}`,
			darkGray: `${srmDarkGray}`,
			lightFont: `${srmlightFont}`,
		},
		roleCards: {
			roleCardUnselected: `${roleCardUnselected}`,
			roleCardSelected: `${roleCardSelected}`,
		},
		mainBackground: `${mainBackground}`,

		primary: {
			main: `${srmDeluge}`,
		},
	},
	typography: {
		fontFamily: [
			'Avenir',
			'Avenir Book',
			'Avenir Black Oblique',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
		].join(','),
		body1: {
			fontFamily: 'Avenir Medium',
			fontSize: '1rem',
		},
		body2: {
			fontFamily: 'Avenir Book',
			fontSize: '1rem',
		},
	},
	boxHeadingContainer: {
		fontFamily: 'Avenir',
		fontSize: '1.75rem',
		fontWeight: 500,
		fontStyle: 'normal',
		color: `${srmBlackRussian}`,
	},
})

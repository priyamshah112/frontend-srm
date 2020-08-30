import { createMuiTheme } from "@material-ui/core/styles";

const srmDeluge = "#7B72AF";
const srmBlackRussian = "#1C1C1E";
const srmBastille = "#2C2C2E";
const srmWhite = "#FFFFFF";
const roleCardUnselected = "#ECEBF3";
const roleCardSelected = "#A09AC2";
const mainBackground = "#F4F4F4";
const srmQuartz = "#F2F0FA";
const srmAdornment = "#AEAEB2";
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
      "Avenir",
      "Avenir Book",
      "Avenir Black Oblique",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
  boxHeadingContainer: {
    fontFamily: "Avenir",
    fontSize: "1.75rem",
    fontWeight: 500,
    fontStyle: "normal",
    color: `${srmBlackRussian}`,
  },
});

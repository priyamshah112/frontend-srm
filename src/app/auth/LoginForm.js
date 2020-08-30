import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { connect } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import AuthContainer from "./AuthContainer";
import * as actions from "./store/actions";

import phoneSvg from "../../assets/images/Desktop Phone number.svg";
import passwordSvg from "../../assets/images/Desktop Password.svg";
import BackdropLoader from "../common/ui/backdropLoader/BackdropLoader";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyle = makeStyles((theme) => ({
  formStyle: {
    margin: "auto",
    width: "100%",
    justifyContent: "center",
    textAlign: "center",
  },
  boxMargin: {
    marginTop: "30px",
    "@media (max-width:400px)": {
      marginTop: "10px",
    },
  },
  fieldStyle: {
    width: "80%",
    margin: "auto",
    "& .MuiInput-underline:before": {
      borderBottom: "2px solid #eaeaea",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: "2px solid #7B72AF",
      transitionProperty: "border-bottom-color",
      transitionDuration: "500ms",
      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },
  inputBorder: {
    height: "50px",
  },

  fgtPass: {
    marginBottom: "15px",
    marginTop: "30px",
    "& a": {
      color: "#707070",
      textDecoration: "none",
    },
    "& a:hover": {
      textDecoration: "underline",
    },
    "@media (max-width:400px)": {
      marginTop: "10px",
      marginBottom: 0,
    },
  },
  margin: {
    marginTop: "30px",
    "@media (max-width:400px)": {
      marginTop: "10px",
    },

    "& .loginBtn": {
      borderRadius: "6px",
      // opacity: '0.5',
    },
  },
  error: {
    color: "red",
  },
}));

const LoginForm = (props) => {
  const classes = useStyle();
  const history = useHistory();
  const [isDisable, setDisable] = useState(true);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

  const submitForm = (event) => {
    event.preventDefault();
    /* let email = "";
    let phone_no = "";
    let userId = "";
    const email_re = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;
    let email_res = email_re.test(user);
    if (email_res) {
      email = user;
    } else {
      const phone_re = /(?:\s+|)((0|(?:(\+|)91))(?:\s|-)*(?:(?:\d(?:\s|-)*\d{9})|(?:\d{2}(?:\s|-)*\d{8})|(?:\d{3}(?:\s|-)*\d{7}))|\d{10})(?:\s+|)/gm;
      let phone_res = phone_re.test(user);
      if (phone_res) {
        phone_no = user.substr(user.length - 10);
      } else {
        userId = user;
      }
    }
    console.log("email:", email, "phone:", phone_no, "userId:", userId); */
    props.onLoginSubmit(user, password);
  };

  useEffect(() => {
    let queryString = props.history.location.search;
    let params = new URLSearchParams(queryString);
    let fgtpass = params.get("fgtpass");
    if (fgtpass !== null) {
      if (fgtpass === "true") {
        setSuccessSnackbarOpen(true);
      }
      if (fgtpass === "false") {
        setErrorSnackbarOpen(true);
      }
    }
  }, []);

  useEffect(() => {
    if (user.length > 0 && password.length > 0) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [user, password]);

  const validate = (event) => {
    let name = event.target.name;
    if (name === "user") {
      setUser(event.target.value);
    }
    if (name === "password") {
      setPassword(event.target.value);
    }
  };

  const handleForgotPassword = (event) => {
    event.preventDefault();
    history.push("/changepwdotp");
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessSnackbarOpen(false);
    setErrorSnackbarOpen(false);
  };
  /*  if (props.redirectUrl) {
    return <Redirect to={props.redirectUrl} />;
  } */

  let errorDesc = "";
  if (props.error) {
    errorDesc = (
      <Typography className={classes.error}>{props.error}</Typography>
    );
  }

  return (
    <AuthContainer title="LOGIN">
      <div>
        <Box className={classes.boxMargin}></Box>

        <form className={classes.formStyle} onSubmit={submitForm}>
          <Box className={classes.margin}>
            {errorDesc}
            <FormControl className={classes.fieldStyle}>
              <Input
                id="user"
                name="user"
                className={classes.inputBorder}
                type="text"
                value={user}
                onChange={validate}
                placeholder="Email, Phone or User ID"
                startAdornment={
                  <InputAdornment position="start">
                    <img src={phoneSvg} width="40px" alt="Phone SVG" />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
          <Box className={classes.margin}>
            <FormControl className={classes.fieldStyle}>
              <Input
                id="password"
                name="password"
                className={classes.inputBorder}
                type="password"
                value={password}
                onChange={validate}
                placeholder="Enter Password"
                startAdornment={
                  <InputAdornment position="start">
                    <img src={passwordSvg} width="40px" alt="Phone SVG" />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
          <Box className={classes.margin}>
            <Button
              id="loginBtn"
              type="submit"
              variant="contained"
              className={`${classes.fieldStyle} ${"loginBtn"}`}
              color="primary"
              disabled={isDisable}
              disableElevation
            >
              SUBMIT
            </Button>
          </Box>
          <Box className={`${classes.Margin} ${classes.fgtPass}`}>
            <Link href="#" onClick={handleForgotPassword}>
              <Typography>Forgot Password?</Typography>
            </Link>
          </Box>
        </form>
      </div>
      <BackdropLoader open={props.loading} />
      <Snackbar
        open={successSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          Password updated successfully
        </Alert>
      </Snackbar>
      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="error">
          Failed to update the password
        </Alert>
      </Snackbar>
    </AuthContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    loading: state.auth.loading,
    isAuthenticated: state.auth.token !== null,
    redirectUrl: state.auth.redirectUrl,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginSubmit: (userId, password) =>
      dispatch(actions.authUser(userId, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

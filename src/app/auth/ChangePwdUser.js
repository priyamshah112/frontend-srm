import React, { useState, useRef, useEffect } from "react";

import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/styles";

import AuthContainer from "./AuthContainer";
import ChangePwdOTP from "./ChangePwdOTP";
import AuthService from "./AuthService";
import { emailValidate, phoneValidate } from "../../shared/userIdValidate";
import ParentDetails from "./ParentDetails";
import Spinner from "../common/ui/spinner/Spinner";

import phoneSvg from "../../assets/images/Desktop Phone number.svg";
import { Typography } from "@material-ui/core";
import BackdropLoader from "../common/ui/backdropLoader/BackdropLoader";

const useStyle = makeStyles((theme) => ({
  formStyle: {
    margin: "auto",
    width: "100%",
    justifyContent: "center",
    textAlign: "center",
    paddingBttom: "20px",
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

  errorColor: {
    color: "red",
  },
  inputBorder: {
    height: "50px",
    "& span": {
      paddingLeft: "10px",
    },
  },
  margin: {
    marginTop: "30px",
    "@media (max-width:400px)": {
      marginTop: "10px",
    },

    "& .loginBtn": {
      borderRadius: "6px",
      marginTop: "10px",
      marginBotton: "10px",
      // opacity: '0.5',
    },
  },
}));

const ChangePwdUser = (props) => {
  const classes = useStyle();
  const [userSubmit, setUserSubmit] = useState(false);
  const [user, setUser] = useState("");
  const [isPhone, setIsPhone] = useState(false);
  const [isChild, setIsChild] = useState(false);
  const [token, setToken] = useState("");
  const [errMessage, setError] = useState("");
  const [parentContacts, setParentContacts] = useState([]);
  const [selectedParentContact, setSelectedParentContact] = useState("");
  const [isLoading, setLoading] = useState(false);

  async function getOtpFunction(userData) {
    try {
      console.log("Send OTP Function for user: ", userData);
      handleLoading(true);
      const response = await AuthService.sendOtp({ username: userData });
      console.log("OTP is: ", response.data.data.otp);
      setToken(response.data.data.access_token);
      handleLoading(false);

      if (response.status === 200) {
        console.log("OTP Sent Successfully");
        setUserSubmit(true);
      }
    } catch (error) {
      console.log(error);
      setError("User not found");
      handleLoading(false);
    }
  }

  // function getParent() {
  //   console.log("Get Parent for: ", user);
  //   handleLoading(true);
  //   AuthService.getParents({ username: user })
  //     .then((response) => {
  //       //Check if data is available
  //       const resultData = response.data.data;
  //       // console.log(response.data.data, response.data.data[0]);
  //       if (resultData.length === 0) {
  //         setError("No parent details found.");
  //       } else {
  //         const contacts = [];
  //         resultData.map((parent) => {
  //           console.log("Parent", parent.phone);
  //           if (parent.phone !== null && parent.phone.length) {
  //             contacts.push(parent.phone);
  //           }
  //           if (parent.email !== null && parent.email.length) {
  //             contacts.push(parent.email);
  //           }

  //           return "";
  //         });
  //         setParentContacts(contacts);
  //         handleLoading(false);
  //         if (contacts.length > 1) {
  //           setIsChild(true);
  //         } else {
  //           getOtpFunction(contacts[0]);
  //         }
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setError("User not found");
  //       handleLoading(false);
  //     });
  // }

  // const setParentContact = (contactData) => {
  //   setSelectedParentContact(contactData);
  //   getOtpFunction(contactData);
  // };

  const handleCloseParentDetails = () => {
    setIsChild(false);
  };

  const submitForm = (event) => {
    event.preventDefault();
    getOtpFunction(user);
    // if (emailValidate(user)) {
    //   getOtpFunction(user);
    // } else if (phoneValidate(user)) {
    //   setUser(user.substr(user.length - 10));
    //   setIsPhone(true);
    // } else {
    //   getParent();
    // }
  };

  const handleLoading = (load) => {
    setLoading(load);
  };

  const handleForm = (event) => {
    setError("");
    setUser(event.target.value);
  };
  useEffect(() => {
    if (isPhone) {
      getOtpFunction(user);
    }
  }, [isPhone]);

  const renderOtp = (
    <>
      <AuthContainer title="Forgot Password?">
        <div>
          <Box className={classes.boxMargin}></Box>
          <Typography className={`${classes.errorColor}`}>
            {errMessage}
          </Typography>
          <form className={classes.formStyle} onSubmit={submitForm}>
            <Box className={classes.margin}>
              <FormControl className={classes.fieldStyle}>
                <Input
                  id="username"
                  name="username"
                  className={classes.inputBorder}
                  type="text"
                  onChange={handleForm}
                  placeholder="Enter Username"
                  startAdornment={
                    <InputAdornment position="start">
                      <img src={phoneSvg} width="40px" alt="Phone SVG" />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>

            <Box className={classes.margin}>
              <Button
                id="phoneSubmit"
                type="submit"
                variant="contained"
                className={`${classes.fieldStyle} ${"loginBtn"}`}
                color="primary"
                disableElevation
              >
                SUBMIT
              </Button>
            </Box>
          </form>
        </div>
      </AuthContainer>
    </>
  );

  return (
    <>
      {userSubmit ? (
        <ChangePwdOTP user={user} handleLoading={handleLoading} token={token} />
      ) : (
        renderOtp
      )}
      <BackdropLoader open={isLoading} />
    </>
  );
};

export default ChangePwdUser;

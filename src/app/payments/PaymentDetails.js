import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

import {
  IconButton,
  Typography,
  makeStyles,
  Grid,
  Button,
} from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import NumberFormat from "react-number-format";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import PaymentService from "./PaymentService";
import GreenTick from "../../assets/images/greenTick.svg";
import BackIcon from "../../assets/images/Back.svg";

const REACT_APP_RAZORPAY_KEY_ID = process.env.REACT_APP_RAZERPAY_KEY_ID;

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  sectionContainer: {
    padding: "0px 24px 24px 24px",
    [theme.breakpoints.down("sm")]: {
      padding: "16px",
    },
    height: "100%",
  },
  descriptionContent: {
    color: `${theme.palette.common.lightFont}`,
    fontFamily: "Avenir Book",
  },
  gridContainer: {
    paddingTop: "8px",
  },
  buttonContainer: {
    width: "100%",
    paddingTop: "15px",
  },
  button: {
    width: "100%",
  },
  card: {
    boxShadow: "none",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    borderRadius: "10px",
    margin: "20px",
  },
  mainHeader: {
    width: "100%",
    paddingTop: "15px",
  },
  mainHeadertext: {
    width: "100%",
    textAlign: "center",
  },
  backImg: {
    paddingLeft: "15px",
    paddingTop: "5px",
    cursor: "pointer",
  },
  card: {
    boxShadow: "none",
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    borderRadius: "10px",
    marginTop: "20px",
  },
  cardHeader: {
    padding: "15px 20px 0 20px",
  },
  iconButtonRoot: {
    padding: "8px",
  },
  titleIconSpan: {
    marginRight: "8px",
  },
  titleIcon: {
    transform: "translateY(3px)",
  },
  greentick: {
    padding: "15px 5px 0px 0px",
  },
  cardTitle: {
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: 500,
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  cardActions: {
    padding: "0 20px 20px 20px",
  },
  cardContent: {
    padding: "5px 20px 20px 20px",
    "&:last-child": {
      paddingBottom: "20px",
    },
  },
  menuItem: {
    paddingLeft: "10px",
    paddingRight: "10px",
    colour: "#1C1C1E",
  },
  borderBottomDiv: {
    width: "90%",
    height: "30px",
    margin: "auto",
    marginTop: "5px",
    borderBottom: "1px solid #D1D1D6",
  },
  borderBottomLastDiv: {
    width: "90%",
    height: "30px",
    margin: "auto",
    marginTop: "5px",
  },
  menuTopItemMargin: {
    marginTop: "5px",
  },
  menuItemRoot: {
    padding: 0,
  },
  menuContainer: {
    backgroundColor: theme.palette.common.darkGray,
    color: "black",
    minWidth: "150px",
    "&.MuiPaper-rounded": {
      boxShadow: "0px 6px 6px #00000029",
    },
    [theme.breakpoints.down("md")]: {
      minWidth: "150px",
    },
    [theme.breakpoints.down("sm")]: {
      minWidth: "150px",
    },
  },
  menuList: {
    width: "100% !important",
    padding: 0,
  },
  contentStyle: {
    color: `${theme.palette.common.lightFont}`,
    fontSize: "14px",
    fontStyle: "normal",
  },
  readClass: {
    textAlign: "right",
    width: "100%",
  },
  amount: {
    color: `${theme.palette.common.lightFont}`,
  },
}));

const PaymentDetails = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [payment, setPayment] = useState(null);
  const [successPayment, setSuccessPayment] = useState(false);
  const [failurePayment, setFailurePayment] = useState(false);
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem("srmToken");
        const response = await PaymentService.fetchPaymentById(token, id);
        if (response.status === 200) {
          setPayment(response.data.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchDetails();
  }, []);
  useEffect(() => {
    if (payment) {
      setIsLoading(false);
    }
  }, [payment]);

  const handlePay = async (event) => {
    try {
      event.preventDefault();
      const token = localStorage.getItem("srmToken");
      const response = await PaymentService.fetchOrderId(
        token,
        payment.notification_id,
        payment.id,
        payment.amount
      );

      if (response.status === 200) {
        console.log(response.data.data.razorpay_order_id);
        const options = {
          key: REACT_APP_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
          amount: payment.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: "INR",
          name: "SRM",
          description: "Test Transaction",
          order_id: response.data.data.razorpay_order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          handler: async (response) => {
            try {
              const statusResponse = await PaymentService.verifySignature(
                token,
                {
                  ...response,
                  id: payment.id,
                  notification_id: payment.notification_id,
                }
              );

              if (statusResponse.status === 200) {
                setPayment(statusResponse.data.data);
                setSuccessPayment(true);
              }
            } catch (e) {
              console.log(e);
            }
          },
          theme: {
            color: "#7B72AF",
          },
        };

        const razerPay = new window.Razorpay(options);
        razerPay.on("payment.failed", function (response) {
          console.log(response.error);
          setFailurePayment(true);
        });
        razerPay.open();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handdleSuccessClose = () => {
    setSuccessPayment(false);
    setFailurePayment(false);
  };
  return (
    <div className={classes.sectionContainer}>
      {!isLoading ? (
        <>
          <Card className={classes.card}>
            <div className={classes.mainHeader}>
              <Grid container>
                <Grid item xs={1}>
                  <img
                    src={BackIcon}
                    alt="Back"
                    className={classes.backImg}
                    onClick={() => {
                      history.push("/payments");
                    }}
                  />
                </Grid>
                <Grid item xs={10}>
                  <div className={classes.mainHeadertext}>
                    <Typography variant="h6">Payment Details</Typography>
                  </div>
                </Grid>
                <Grid item xs={1}></Grid>
              </Grid>
            </div>
            <CardHeader
              className={classes.cardHeader}
              action={
                <>
                  {payment.status === "1" ? (
                    <img
                      src={GreenTick}
                      alt="done"
                      className={classes.greentick}
                    />
                  ) : (
                    ""
                  )}
                </>
              }
              title={
                <>
                  {/* <img
                    src={BackIcon}
                    alt="Back"
                    className={classes.backImg}
                    onClick={() => {
                      history.push("/notifications");
                    }}
                  /> */}
                  <Typography className={classes.cardTitle}>
                    {payment.payment_title}
                  </Typography>
                </>
              }
            />
            <CardContent classes={{ root: classes.cardContent }}>
              <Grid container direction="row" className={classes.gridContainer}>
                <div
                  className={`${classes.descriptionContent}`}
                  dangerouslySetInnerHTML={{
                    __html: payment.main_content,
                  }}
                />
              </Grid>

              <hr
                style={{
                  marginBottom: "0px",
                  color: "#8E8E93",
                  fontFamily: "Avenir Book",
                }}
              />
              <Grid container direction="row" className={classes.gridContainer}>
                <div className={classes.readClass}>
                  <Typography variant="body2" className={classes.amount}>
                    {"Amount: "}
                    <span>&#8377;</span>

                    <span>&nbsp;</span>
                    <NumberFormat
                      value={parseInt(payment.amount) / 100}
                      displayType={"text"}
                      thousandSeparator={true}
                      thousandsGroupStyle="lakh"
                    />
                  </Typography>
                </div>
              </Grid>
            </CardContent>
          </Card>
          {payment.status !== "1" ? (
            <div className={classes.buttonContainer}>
              <Button
                color="primary"
                variant="contained"
                className={classes.button}
                onClick={handlePay}
              >
                Pay
              </Button>
            </div>
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
      <Snackbar
        open={successPayment}
        onClose={handdleSuccessClose}
        autoHideDuration={4000}
      >
        <Alert severity="success" onClose={handdleSuccessClose}>
          Payment Successful
        </Alert>
      </Snackbar>
      <Snackbar
        open={failurePayment}
        onClose={handdleSuccessClose}
        autoHideDuration={4000}
      >
        <Alert severity="error" onClose={handdleSuccessClose}>
          Payment Unsuccessfull
        </Alert>
      </Snackbar>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    selectedRole: state.auth.selectedRole,
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(PaymentDetails);

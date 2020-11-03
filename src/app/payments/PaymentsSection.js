import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";

import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import InfiniteScroll from "react-infinite-scroll-component";
import PaymentCard from "./PaymentCard";
import PaymentService from "./PaymentService";
const useStyles = makeStyles((theme) => ({
  sectionContainer: {
    height: "100%",
    width: "100%",
  },
  cardBoxPadding: {
    padding: "0px 24px 24px 24px",
    [theme.breakpoints.down("sm")]: {
      padding: "16px",
    },
  },
  loading: {
    width: "100%",
    textAlign: "center",
    paddingTop: "8px",
    fontSize: "20px",
  },
  emptyView: {
    width: "100%",
    textAlign: "center",
    paddingTop: "100px",
    fontSize: "20px",
  },  
}));
const PaymentSection = (props) => {
  const classes = useStyles();
  const [payments, setPayments] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem("srmToken");
        if (props.filter==0 || props.filter==1) {
          const response = await PaymentService.fetchFilterPayments(
            token,
            props.filter,
            currentPage
          );
          if (response.status === 200) {
            setPayments(response.data.data.data);
            if (
              response.data.data.current_page === response.data.data.last_page
            ) {
              setHasMore(false);
            } else {
              setCurrentPage(currentPage + 1);
            }
          }
        } else {
          const response = await PaymentService.fetchPayments(
            token,
            currentPage
          );
          if (response.status === 200) {
            setPayments(response.data.data.data);
            if (
              response.data.data.current_page === response.data.data.last_page
            ) {
              setHasMore(false);
            } else {
              setCurrentPage(currentPage + 1);
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchPayments();
  }, []);

  const fetchPaymentOnScroll = async () => {
    try {
      const token = localStorage.getItem("srmToken");
      if (props.filter==0 || props.filter==1) {
        const response = await PaymentService.fetchFilterPayments(
          token,
          props.filter,
          currentPage
        );
        console.log(response);
        if (response.status === 200) {
          setPayments(response.data.data.data);
          if (
            response.data.data.current_page === response.data.data.last_page
          ) {
            setHasMore(false);
          } else {
            setCurrentPage(currentPage + 1);
          }
        }
      } else {
        const response = await PaymentService.fetchPayments(token, currentPage);
        if (response.status === 200) {
          setPayments(response.data.data.data);
          if (
            response.data.data.current_page === response.data.data.last_page
          ) {
            setHasMore(false);
          } else {
            setCurrentPage(currentPage + 1);
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  let content = payments.map((payment) => (
    <PaymentCard payments={payment} key={payment.id} />
  ));
  return (
    <div className={classes.sectionContainer} id="scrollable">
      <Box className={classes.cardBoxPadding}>
        <InfiniteScroll
          dataLength={payments.length}
          next={fetchPaymentOnScroll}
          hasMore={hasMore}
          loader={
            <>
              <div className={classes.loading}>
                <CircularProgress color="primary" size={30} />
              </div>
              <br />
            </>
          }
          scrollableTarget="scrollable"
          scrollThreshold={0.2}
        >
            {!payments.length ? (
            <div className={classes.emptyView}>
              <Typography>Don't have any Payments.</Typography>
            </div>
          ) : content}
          
        </InfiniteScroll>
      </Box>
      <br />
      <br />
      <br />
    </div>
  );
};
export default PaymentSection;

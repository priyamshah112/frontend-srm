import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";

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
}));
const PaymentSection = () => {
  const classes = useStyles();
  return (
    <div className={classes.sectionContainer} id="scrollable">
      <Box className={classes.cardBoxPadding}>
        <InfiniteScroll
          dataLength={notifications.length}
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
          {content}
        </InfiniteScroll>
      </Box>
    </div>
  );
};
export default PaymentSection;

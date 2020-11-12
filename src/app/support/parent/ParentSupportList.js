import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles";
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from "@material-ui/core/CircularProgress";
import SupportCard from "../SupportCard";
import { getSupports } from "../../redux/actions/support.action";
import { Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  loading: {
    width: "100%",
    textAlign: "center",
    paddingTop: "8px",
    fontSize: "20px",
  },
  emptyList: {
    fonTize: "1rem",
    fontFamily: "Avenir Medium",
    fontWeight: "400",
    lineHeight: "1.5",
    paddingLeft:"25px",

    // fontSize: "14px",
    // color: "#1C1C1E",
    // fontFamily: "Avenir",
    display: "flex",
    flex: 1,
    height: "500px",
    justifyContent: "center",
    alignItems: "center",
  },
  clickHere: {
    color: "#0000FF",
    fontFamily: "Avenir-Book",
    padding: "0 5px",
    cursor: "pointer",
  },
}));

const ParentSupportList = (props) => {
  const {
    loading,
    data = [],
    listInfo = {},
    paginationLoading,
    refetch,
    role,
  } = props;
  const { current_page, last_page } = listInfo;

  const classes = useStyles();
  const history = useHistory();
  const handleCreateNew = (event) => {
    history.push("/support/create");
  };

  useEffect(() => {
    getData(null, true);
  }, []);

  useEffect(() => {
    if (refetch) {
      getData();
    }
  }, [refetch]);

  const getData = (data = {}, showLoading) => {
    const params = { ...data };
    if (role === "teacher") {
      params.created_by = true;
    }
    props.getSupports(params, showLoading);
  };

  const onEndReached = () => {
    if (current_page !== last_page && !loading) {
      console.log("onEndReached props", listInfo);
      getData({ page: current_page + 1 });
    }
  };

  const emptyList = () => (
    <Typography className={classes.emptyList}>
      You do not have any tickets to view.{" "}
      <span onClick={handleCreateNew} className={classes.clickHere}>
        {" "}
        Click here{" "}
      </span>{" "}
      to raise a new ticket
    </Typography>
  );

  if (loading) {
    return (
      <div className={classes.loading}>
        <CircularProgress color="primary" size={30} />
      </div>
    );
  }

  if (!data.length) {
    return emptyList();
  }

  const content = data.map((item, index) => {
    return <SupportCard item={item} index={index} />;
  });

  return (
    <InfiniteScroll
      dataLength={data.length}
      next={onEndReached}
      hasMore={current_page !== last_page}
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
  );
};

const mapStateToProps = ({ Supports, auth }) => {
  const {
    supports = [],
    supportsListInfo = {},
    supportLoading,
    supportPaginationLoading,
    refetchSupports,
  } = Supports;
  const { selectedRole } = auth;
  return {
    data: supports,
    listInfo: supportsListInfo,
    loading: supportLoading,
    paginationLoading: supportPaginationLoading,
    refetch: refetchSupports,
    role: selectedRole,
  };
};

export default connect(mapStateToProps, { getSupports })(ParentSupportList);

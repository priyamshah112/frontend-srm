import React, { useEffect, useState } from "react";

import Details from "./Details";
import HomeService from "../HomeSerivce";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    backgroundColor: theme.palette.mainBackground,
    height: "100%",
    marign: "0",
    padding: "0",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
}));

const NewsDetails = (props) => {
  const classes = useStyles();
  const {
    match: { params },
  } = props;
  const newsId = params.id;

  return (
    <>
      <div className={classes.container}>
        <Details newsId={newsId} />
      </div>
    </>
  );
};

export default NewsDetails;

import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  tableHeader: {
    display: "flex",
    textAlign: "center",
    margin: "0px",
    padding: "10px 20px",
    fontSize: "20px",
    backgroundColor: "lightgrey",
    height: "20px",
    font: "normal normal medium 16px/21px Avenir",
    letterSpacing: "-0.26px",
    color: "#000000",
    opacity: "1",
  },
  tableHeadermid: {
    width: "100%",
  },
  tableHeaderBtn: {
    cursor: "pointer",
  },
  tableHeaderBtn_dis: {
    // cursor: "pointer",
    color:'grey'
  },
}));

const TableTopHead = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.tableHeader}>
      <Typography onClick={props.onPrevious} className={classes.tableHeaderBtn}>
        Previous
      </Typography>
      {props.renderFilter ? (
        props.renderFilter
      ) : (
      <Typography className={classes.tableHeadermid}>Weekly {props.selectedMonth}</Typography>
      )}
      {
        props.isnext?
        (<Typography onClick={props.onNext} className={classes.tableHeaderBtn}>
          Next
        </Typography>)
        :
        (<Typography className={classes.tableHeaderBtn_dis}>
          Next
        </Typography>)
      }
      
    </div>
  );
};

export default TableTopHead;

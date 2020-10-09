import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Paper } from "@material-ui/core";
import SummaryIcon from "../../../assets/images/attendance/summary.svg";

const useStyles = makeStyles((theme) => ({
  summaryHerderTitle: {
    display: "flex",
  },
  summaryIcon: {
    color: "rgb(142 142 147)",
  },
  summaryTitle: {
    textAlign: "left",
    font: "normal normal 900 15px Avenir",
    letterSpacing: "0px",
    color: "#2C2C2E",
    padding: "3px 0px 0px 3px",
  },
  summaryContent: {
    marginTop: "10px",
    borderRadius: "10px",
    padding: "10px",
    marginBottom: "30px",
  },
  contentRow: {
    display: "flex",
    padding: "20px 10px 0px 10px",
  },
  dayNum: {
    background: "rgb(123 114 175 / 0.2) 0% 0% no-repeat padding-box;",
    borderRadius: "4px",
    padding: "1px 6px",
    width: "fit-content",
    fontSize: "14px",
    letterSpacing: "0px",
    color: "#2C2C2E",
    margin: "0px 20px 0px 10px",
  },
  summaryMainContent: {
    textAlign: "left",
    font: "normal normal 300 14px/24px Avenir",
    letterSpacing: "0px",
    color: "#1C1C1E",
  },
  loaderView: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    padding: "30px",
  },
}));

const Summary = (props) => {
  const { data = {}, loading } = props;
  const { percentageData = [] } = data;
  const classes = useStyles();
  return (
    <>
      <div className={classes.summaryHerderTitle}>
        <img src={SummaryIcon} alt="Menu" width="24" height="24" />
        <Typography className={classes.summaryTitle}>SUMMARY</Typography>
      </div>
      <Paper className={classes.summaryContent}>
        {!loading ? (
          <>
            <div className={classes.contentRow}>
              <Typography>Total Class Days</Typography>
              <Typography className={classes.dayNum}>
                {data.allClasses}
              </Typography>
              <Typography>Holidays</Typography>
              <Typography className={classes.dayNum}>{data.holiday}</Typography>
              <Typography>Days Attended</Typography>
              <Typography className={classes.dayNum}>{data.present}</Typography>
              <Typography>Days Absent</Typography>
              <Typography className={classes.dayNum}>{data.absent}</Typography>
            </div>
            <div className={classes.contentRow}>
              <Typography className={classes.summaryMainContent}>
                {percentageData.map((item) => (
                  <span>
                    {item.subject} -{" "}
                    <b>
                      {item.percentage ? Number(item.percentage).toFixed(2) : 0}
                      %
                    </b>
                    ,{" "}
                  </span>
                ))}
              </Typography>
            </div>
          </>
        ) : (
          <div className={classes.loaderView}>
            <CircularProgress />
          </div>
        )}
      </Paper>
    </>
  );
};

export default Summary;

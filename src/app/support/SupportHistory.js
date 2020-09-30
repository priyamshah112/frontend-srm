import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Typography,
  Box,
  Grid,
  CardContent,
  CardActions,
  CardHeader,
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import moment from "moment";

const useStyle = makeStyles((theme) => ({
  card: {
    boxShadow: "none",
    borderBottomLeftRadius: "3px",
    borderBottomRightRadius: "3px",
    minHeight: "50px",
  },
  labelText: {
    fontSize: "14px",
    fontStyle: "normal",
    color: `${theme.palette.common.blackRussian}`,
    opacity: 0.5,
  },
  normalText: {
    fontSize: "14px",
    fontStyle: "normal",
    color: `${theme.palette.common.blackRussian}`,
    opacity: 1,
  },
  cardContent: {
    padding: "20px !important",
  },
  textAlignRight: {
    textAlign: "right",
  },
  borderBottom: {
    margin: "0 20px 0 20px",
    borderBottom: "1px solid #707070",
  },
}));

const SupportHistory = (props) => {
  const classes = useStyle();

  const { data = [] } = props;

  return (
    <Card className={classes.card}>
      {data.map((item, index) => {
        const { user_data = {} } = item;
        return (
          <>
            <CardContent className={classes.cardContent}>
              <Grid container>
                <Grid item sm={8}>
                  <Typography className={classes.labelText}>
                    {`${user_data.firstname} ${user_data.lastname}`}
                  </Typography>
                  <Typography className={classes.normalText}>
                    Status Change To {item.status}
                  </Typography>
                </Grid>
                <Grid item sm={4}>
                  <Typography
                    className={`${classes.labelText} ${classes.textAlignRight}`}
                  >
                    {moment(item.updated_at).format("DD MMM, HH:mm A")}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            {data.length !== index + 1 && (
              <div className={classes.borderBottom}></div>
            )}
          </>
        );
      })}
    </Card>
  );
};

export default SupportHistory;

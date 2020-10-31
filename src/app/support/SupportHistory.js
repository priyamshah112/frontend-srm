import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Typography,
  Grid,
  CardContent,
  CircularProgress,
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import moment from "moment";
import { connect } from "react-redux";
import { getSupportsHistory } from "../redux/actions/support.action";

const useStyle = makeStyles((theme) => ({
  card: {
    boxShadow: "none",
    borderBottomLeftRadius: "3px",
    borderBottomRightRadius: "3px",
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
  loader: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '25px',
    paddingBottom: '25px',
  }
}));

const SupportHistory = (props) => {
  const [history, setHistory] = useState([]);
  const classes = useStyle();

  useEffect(() => {
    props.getSupportsHistory({ support_id: props.id }, onGet, onFail);
  }, []);

  const onGet = (d = {}) => {
    setHistory(d.data || []);
  };

  const onFail = () => {};

  const { data = [], loading } = props;

  return (
    <Card className={classes.card}>
      {!loading && !history.length && (
        <Typography className={classes.emptyMsg}>
          This ticket has no history yet.
        </Typography>
      )}
      {!loading ? (
        history.map((item, index) => {
          return (
            <>
              <CardContent className={classes.cardContent}>
                <Grid container>
                  <Grid item sm={8}>
                    <Typography className={classes.labelText}>
                      {`${item.firstname} ${item.lastname}`}
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
              {history.length !== index + 1 && (
                <div className={classes.borderBottom}></div>
              )}
            </>
          );
        })
      ) : (
        <div className={classes.loader}>
          <CircularProgress />
        </div>
      )}
    </Card>
  );
};

const mapStateToProps = ({ Supports, auth }) => {
  const { supportHistoryLoading } = Supports;
  return {
    loading: supportHistoryLoading,
  };
};

export default connect(mapStateToProps, { getSupportsHistory })(SupportHistory);

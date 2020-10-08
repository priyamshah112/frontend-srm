import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { CircularProgress, Typography } from "@material-ui/core";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
  error: {
    fontSize: "10px",
  },
}))(TableCell);

const classNames = {
  absent: "absentStatus",
  present: "presentStatus",
  holiday: "holidayStatus",
};

const AttendanceDot = ({ status, onClick, loading, error }) => {
  const onPress = () => {
    if (!classNames[status] || loading) return;
    onClick();
  };
  return (
    <StyledTableCell onClick={onPress} align="center">
      {loading ? (
        <CircularProgress size={12} />
      ) : (
        <FiberManualRecordIcon
          className={classNames[status] || "emptyStatus"}
        />
      )}
      {error ? (
        <Typography className="error">
          <div className="error">{error}</div>
        </Typography>
      ) : null}
    </StyledTableCell>
  );
};

export default AttendanceDot;

import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const classNames = {
  absent: "absentStatus",
  present: "presentStatus",
  holiday: "holidayStatus",
}

const AttendanceDot = ({ status, onClick }) => (
  <StyledTableCell onClick={onClick} align="center">
    <FiberManualRecordIcon
      className={classNames[status] || "presentStatus"}
    />
  </StyledTableCell>
);

export default AttendanceDot;

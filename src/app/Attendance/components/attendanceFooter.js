import React from "react";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

const AttendanceFooter = () => (
  <div className="tableBottom">
    <div className="stateRow">
      <FiberManualRecordIcon className="presentStatus" />
      <p className="rollStatus">Present</p>
    </div>
    <div className="stateRow">
      <FiberManualRecordIcon className="absentStatus" />
      <p className="rollStatus">Absent</p>
    </div>
    <div className="stateRow">
      <FiberManualRecordIcon className="holidayStatus" />
      <p className="rollStatus">Holiday</p>
    </div>
  </div>
);

export default AttendanceFooter;

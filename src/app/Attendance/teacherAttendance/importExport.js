import React from "react";
import { IconButton } from "@material-ui/core";
import VerticalAlignBottomIcon from "@material-ui/icons/VerticalAlignBottom";
import VerticalAlignTopIcon from "@material-ui/icons/VerticalAlignTop";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { exportAttendance } from "../../redux/actions/attendence.action";

const useStyles = makeStyles((theme) => ({
  topButton: {
    float: "right",
    padding: "0px 20px 0px 0px",
  },
  menuButton: {
    margin: "5px",
  },
}));

const ImportExport = (props) => {
  const classes = useStyles();

  const handleClick = () => {
    console.log("click");
  };

  const onExport = () => {
    const params = {
      from_date: props.from_date,
      to_date: props.to_date,
      class_id: props.class_id,
    };
    props.exportAttendance(params);
  };

  return (
    <div className={classes.topButton}>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleClick}
        className={classes.menuButton}
      >
        <VerticalAlignTopIcon style={{ color: "#ababaf" }} />
      </IconButton>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={onExport}
        className={classes.menuButton}
      >
        <VerticalAlignBottomIcon style={{ color: "#ababaf" }} />
      </IconButton>
    </div>
  );
};

const mapStateToProps = ({ Attendence }) => {
  const { exportLoading, importLoading } = Attendence;
  return {
    exportLoading,
    importLoading,
  };
};

export default connect(mapStateToProps, { exportAttendance })(ImportExport);

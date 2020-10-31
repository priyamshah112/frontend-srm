import React, { useEffect } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";
import {ChevronRightSharp, ExpandMore} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  tableHeadermid: {
    width: "100%",
  },
  tableHeaderBtn: {
    cursor: "pointer",
  },
  span: {
    cursor: "pointer",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  downArrow: {
    textTransform: "none",
  },
  cont: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}));

const filters = {
  week: "Weekly",
  month: "Monthly",
};

const WeekMonthFilter = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();

  const { selected } = props;

  useEffect(() => {
    props.onSelect("week");
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSelect = (f) => {
    handleClose();
    props.onSelect(f);
  };

  return (
    <div className={classes.tableHeadermid}>
      <div className={classes.cont}>
        <Typography>
          <span onClick={handleClick} className={classes.span} >
            {filters[selected]}
          <ExpandMore onClick={handleClick} style={{ color: "black", cursor: 'pointer' }} fontSize="small" />
          </span>
        </Typography>
      </div>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {Object.keys(filters).map((f) => (
          <MenuItem onClick={() => onSelect(f)}>{filters[f]}</MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default WeekMonthFilter;

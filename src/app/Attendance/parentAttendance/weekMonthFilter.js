import React, { useEffect } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  tableHeadermid: {
    width: "100%",
  },
  tableHeaderBtn: {
    cursor: "pointer",
  },
  span: {
    cursor: 'pointer',
  }
}));

const filters = {
  week: "Weekly",
  month: "Monthly",
};

const WeekMonthFilter = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();

  const {selected} = props;

  useEffect(() => {
    props.onSelect('week');
  }, [])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSelect = (f) => {
    handleClose();
    props.onSelect(f)
  };

  return (
    <div className={classes.tableHeadermid}>
      <Typography>
  <span className={classes.span} onClick={handleClick}>{filters[selected]}</span>
      </Typography>
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

import React, { useEffect, useState } from "react";
import { getSingleClass } from "../../../redux/actions/attendence.action";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const useStyle = makeStyles((theme) => ({
  categoryClass: {
    "& span": {
      textAlign: "left",
    },
  },

  categorySelect: {
    textAlign: "left",
  },
}));

const SubjectsDropdown = (props) => {
  const [data, setData] = useState([]);
  const classes = useStyle();

  const { loading } = props;

  useEffect(() => {
    fetchData();
  }, [props.class_id]);

  const fetchData = () => {
    if (!props.class_id) return;
    props.getSingleClass(props.class_id, onGet, onFail);
  };

  const onGet = (d = {}) => {
    const { data = {} } = d;
    const { subject_lists = [] } = data;
    setData(subject_lists);

    if (!subject_lists.length) return;
    const first = subject_lists[0] || {};
    const { subject_data = {} } = first;
    props.onChange(subject_data.id);
  };

  const onFail = () => {
    fetchData();
  };

  const handleClassChange = (event) => {
    props.onChange && props.onChange(event.target.value);
  };

  const renderData = () =>
    data.map((item) => {
      const { subject_data = {} } = item;
      return <MenuItem value={subject_data.id}>{subject_data.name}</MenuItem>;
    });

  return (
    <Select
      labelId="Categories"
      id="demo-simple-select-helper"
      value={props.value}
      onChange={handleClassChange}
      className={classes.categoryClass}
      classes={{ select: classes.categorySelect }}
    >
      {loading ? (
        <MenuItem disabled value="">
          Loading...
        </MenuItem>
      ) : null}
      {!loading ? renderData() : null}
    </Select>
  );
};

const mapStateToProps = ({ Attendence }) => {
  const { subjects = [], singleClassLoading } = Attendence;
  return {
    data: subjects,
    loading: singleClassLoading,
  };
};

export default connect(mapStateToProps, { getSingleClass })(SubjectsDropdown);

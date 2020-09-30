import React, { useEffect } from "react";
import NativeSelect from "@material-ui/core/NativeSelect";
import { getClasses } from "../../../redux/actions/attendence.action";
import { connect } from "react-redux";

const ClassesDropdown = (props) => {
  const { data = [], loading } = props;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    props.getClasses();
  };

  const handleClassChange = (event) => {
    props.onChange && props.onChange(event.target.value);
  };

  const renderData = () =>
    data.map((item) => <option value={item.id}>{item.class_name}</option>);

  return (
    <NativeSelect
      value={props.value}
      onChange={handleClassChange}
      name="classNum"
      inputProps={{ "aria-label": "classNum" }}
    >
      {loading && <option disabled>Loading...</option>}
      {renderData()}
    </NativeSelect>
  );
};

const mapStateToProps = ({ Attendence }) => {
  const { classes = [], classesLoading } = Attendence;
  return {
    data: classes,
    loading: classesLoading,
  };
};

export default connect(mapStateToProps, { getClasses })(ClassesDropdown);

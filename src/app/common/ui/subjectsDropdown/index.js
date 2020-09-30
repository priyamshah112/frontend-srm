import React, { useEffect } from "react";
import NativeSelect from "@material-ui/core/NativeSelect";
import { getSubjects } from "../../../redux/actions/attendence.action";
import { connect } from "react-redux";

const SubjectsDropdown = (props) => {
  const { data = [], loading } = props;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    props.getSubjects();
  };

  const handleClassChange = (event) => {
    props.onChange && props.onChange(event.target.value);
  };

  const renderData = () =>
    data.map((item) => <option value={item.id}>{item.name}</option>);

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
  const { subjects = [], subjectsLoading } = Attendence;
  return {
    data: subjects,
    loading: subjectsLoading,
  };
};

export default connect(mapStateToProps, { getSubjects })(SubjectsDropdown);

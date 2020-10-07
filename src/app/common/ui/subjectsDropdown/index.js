import React, { useEffect, useState } from "react";
import NativeSelect from "@material-ui/core/NativeSelect";
import { getSingleClass } from "../../../redux/actions/attendence.action";
import { connect } from "react-redux";

const SubjectsDropdown = (props) => {
  const [data, setData] = useState([]);
  const { loading } = props;

  useEffect(() => {
    fetchData();
  }, [props.class_id]);

  const fetchData = () => {
    if (!props.class_id) return;
    props.getSingleClass(props.class_id, onGet, onFail);
  };

  const onGet = (d = {}) => {
    console.log("SubjectsDropdown onGet", { d, props });
    const { data = {} } = d;
    const { subject_lists = [] } = data;
    setData(subject_lists);

    if(!subject_lists.length) return;
    const first = subject_lists[0] || {};
    const {subject_data={}} = first;
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
      const {subject_data={}} = item;
      return <option value={subject_data.id}>{subject_data.name}</option>;
    });

  return (
    <NativeSelect
      value={props.value}
      onChange={handleClassChange}
      name="classNum"
      inputProps={{ "aria-label": "classNum" }}
    >
      {loading && <option disabled>Loading...</option>}
      {!loading ? renderData() : null}
    </NativeSelect>
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

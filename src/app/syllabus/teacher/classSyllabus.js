import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import SyllabusService from "../SyllabusService";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import SubjectSyllabus from "./subjectSyllabus";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    backgroundColor: theme.palette.mainBackground,
    height: "100%",
    marign: "0",
    padding: "0",
    overflowY: "auto",
  },
  subjectTitle: {
    marginBottom: "20px",
  },
  loading: {
    width: "100%",
    textAlign: "center",
    paddingTop: "8px",
    fontSize: "20px",
  },
}));

const ClassSyllabus = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [classID, setClass] = useState(2);
  const [classList, setClasses] = useState(null);
  const [subjects, setSubjects] = useState(null);
  const [syllabusDetails, setSyllabusDetails] = useState(null);
  const token = localStorage.getItem("srmToken");

  const classes = useStyles();

  const fetchClassSyllabus = async (id) => {
    try {
      if (subjects) {
        const response = await SyllabusService.getSyllabusByClass(
          token,
          id
        );

        if (response.status === 200) {
          let tempSyllabusDetails = [];
          Object.keys(subjects).forEach((key) => {
            let subjectDetails = {};
            subjectDetails[key] = response.data.data.map((chapterDetails) => {
              if (chapterDetails.subject_id == key) {
                return {
                  chapter: chapterDetails.chapters.chapter,
                  term: chapterDetails.chapters.term,
                  editId: chapterDetails.id,
                  mainContent: chapterDetails.main_content
                };
              }
            });
            subjectDetails[key] = subjectDetails[key].filter(
              (value) => value !== undefined
            );
            tempSyllabusDetails.push(subjectDetails);
          });

          setLoading(false);

          setSyllabusDetails([...tempSyllabusDetails]);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    setClass(event.target.value);
    setLoading(true);
    fetchClassSyllabus(event.target.value);
  };

  const fetchSubjects = async () => {
    const response = await SyllabusService.getSubjects(token);
    if (response.status === 200) {
      if (response.data.success && isLoading) {
        console.log("fetchSubjects -> " + response.data);
        const data = response.data.data.data;

        setSubjects(data);
      }
    }
  };
  useEffect(() => {
    fetchClassSyllabus(classID);
  }, [subjects]);
  const fetchClasses = async () => {
    const response = await SyllabusService.fetchClasses(token);
    if (response.status === 200) {
      //console.log("fetchClasses -> "+ response.data)

      if (response.data.status == "success" && isLoading && classList == null) {
        //console.log(response.data.data)
        setClasses(response.data.data);
      }
    }
  };

  const table =
    isLoading == false && syllabusDetails !== null
      ? syllabusDetails.map(function (subject, index) {
        //console.log(subjects[Object.keys(subject)[0]])
          return (
            <div key={index}>
              <div style={{ background: "#fff" }}>
                <SubjectSyllabus
                  class_id={classID}
                  subjectDetails={Object.values(subject)[0]}
                  subjectName={subjects[Object.keys(subject)[0]].name}
                  subjectID={subjects[Object.keys(subject)[0]].id}
                />
              </div>
              <br />
              <br />
            </div>
          );
        })
      : null;

  useEffect(() => {
    if (classList == null) {
      fetchClasses();
    }
    fetchSubjects();
  }, []);

  return (
    <div className={classes.container}>
      <div style={{ margin: 20 }}>
        <InputLabel id="demo-simple-select-label">Class</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={classID}
          onChange={handleChange}
        >
          {classList != null
            ? Object.keys(classList).map(function (key, index) {
                return (
                  <MenuItem key={index} value={classList[key].id}>
                    {classList[key].class_name}
                  </MenuItem>
                );
              })
            : null}
        </Select>
        <br />
        {isLoading ? (
          <div className={classes.loading}>
            <CircularProgress color="primary" size={30} />
          </div>
        ) : null}
        <br />
        {table}
        <br />
        <br />
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    selectedRole: state.auth.selectedRole,
  };
};

export default connect(mapStateToProps)(ClassSyllabus);

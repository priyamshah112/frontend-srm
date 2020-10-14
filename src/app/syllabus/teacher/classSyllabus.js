import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
  const location = useLocation();
  const classes = useStyles();
  const [isLoading, setLoading] = useState(true);
  const [classID, setClass] = useState(
    new URLSearchParams(location.search).get("cid") || 1
  );
  const [classList, setClasses] = useState(null);
  const [subjects, setSubjects] = useState(null);
  const [syllabusDetails, setSyllabusDetails] = useState(null);
  const token = localStorage.getItem("srmToken");

  const fetchClassSyllabus = async (id, isMounted) => {
    try {
      if (subjects) {
        const response = await SyllabusService.getSyllabusByClass(token, id);

        if (response.status === 200) {
          let tempSyllabusDetails = [];
          subjects.forEach((subject) => {
            let subjectDetails = {};

            subjectDetails[subject.id] = response.data.data.map(
              (chapterDetails) => {
                if (chapterDetails.subject_id == subject.id) {
                  return {
                    chapter: chapterDetails.chapters.chapter,
                    term: chapterDetails.chapters.term,
                    editId: chapterDetails.id,
                    mainContent: chapterDetails.main_content,
                  };
                }
              }
            );
            subjectDetails[subject.id] = subjectDetails[subject.id].filter(
              (value) => value !== undefined
            );
            subjectDetails.subjectName = subject.name;
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
    console.log("changed");
    setClass(event.target.value);
    setLoading(true);
    fetchClassSyllabus(event.target.value);
  };

  const fetchSubjects = async (isMounted) => {
    const response = await SyllabusService.getSubjects(token);
    if (response.status === 200) {
      if (response.data.success && isLoading) {
        const data = response.data.data.data;

        setSubjects(data);
      }
    }
  };

  const fetchClasses = async (isMounted) => {
    const response = await SyllabusService.fetchClasses(token);
    if (response.status === 200) {
      // console.log("fetchClasses -> "+ response.data)

      if (response.data.status == "success" && isLoading && classList == null) {
        //console.log(response.data.data)

        setClasses(response.data.data);
      }
    }
  };

  const table =
    isLoading == false && syllabusDetails !== null
      ? syllabusDetails.map(function (subject, index) {
        return (
          <div key={`${classID}${index}`}>
            <div style={{ background: "#fff" }}>
              <SubjectSyllabus
                class_id={classID}
                key={`${classID}${index}`}
                subjectDetails={Object.values(subject)[0]}
                subjectName={subject.subjectName}
                subjectID={Object.keys(subject)[0]}
              />
            </div>
            <br />
            <br />
          </div>
        );
      })
      : null;

  useEffect(() => {
    let isMounted = true;

    if (classList == null) {
      fetchClasses(isMounted);
    }
    fetchSubjects(isMounted);

    return () => {
      isMounted = false;
    };
  }, []);
  useEffect(() => {
    let isMounted = true;

    fetchClassSyllabus(classID, isMounted);

    return () => {
      isMounted = false;
    };
  }, [subjects]);
  return (
    <div className={classes.container}>
      <div style={{ margin: 20 }}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={classID}
          onChange={handleChange}
          style={{ width: "50%" }}
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "center",
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "center",
            },
            getContentAnchorEl: null,
          }}
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

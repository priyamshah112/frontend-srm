import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import SyllabusService from "../SyllabusService";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    backgroundColor: theme.palette.mainBackground,
    height: "100%",

    padding: "0",
    overflowY: "auto",
  },
  detailsHeader: {
    borderLeft: "1px solid rgba(224, 224, 224, 1)",
  },
  selectHeader: {
    width: "100%",
  },
  select: {
    width: "50%",
  },
}));

const StudentSyllabus = (props) => {
  const [syllabus, setSyllabus] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [subject, setSubject] = useState(1); //Choose Subject ID
  const [subjects, setSubjects] = useState(null); //subjects ARRAY
  const [classList, setClasses] = useState(null);
  const [classID, setClass] = useState(1);
  const token = localStorage.getItem("srmToken");

  const handleChange = (event) => {
    setSubject(event.target.value);
    setLoading(true);
  };

  const fetchClassSyllabus = async (subject_id) => {
    const response = await SyllabusService.getSyllabusBySubject(
      token,

      subject_id
    );
    if (response.status === 200) {
      if (response.data.data.length === 0) {
        setSyllabus(null);
      } else {
        setSyllabus(response.data.data);
      }

      setLoading(false);
    }
  };

  const fetchSubjects = async () => {
    const response = await SyllabusService.getSubjects(token);
    if (response.status === 200) {
      if (response.data.success && isLoading) {
        const data = response.data.data.data;

        setSubjects(data);
      }
    }
  };

  useEffect(() => {
    fetchClassSyllabus(subject);
  }, [subjects, subject]);
  useEffect(() => {
    fetchSubjects();
  }, []);

  const classes = useStyles();
  const table =
    isLoading == false ? (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="center" width="15%">
                <Typography variant="subtitle1">
                  <b>Term</b>
                </Typography>
              </TableCell>
              <TableCell
                align="center"
                width="85%"
                colSpan={2}
                className={classes.detailsHeader}
              >
                <Typography variant="subtitle1">
                  <b>Details</b>
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {syllabus != null
              ? syllabus.map((chapter, index) => (
                  <TableRow key={index}>
                    <TableCell
                      component="th"
                      align="center"
                      scope="row"
                      width="15%"
                    >
                      <Typography variant="subtitle1">
                        Term {chapter.chapters.term}
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="left"
                      width="25%"
                      className={classes.detailsHeader}
                    >
                      <Typography variant="subtitle1" gutterBottom>
                        Chapter {chapter.chapters.chapter}
                      </Typography>
                    </TableCell>
                    <TableCell align="left" width="60%">
                      <Typography variant="subtitle1" gutterBottom>
                        {chapter.main_content}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    ) : null;
  return (
    <div className={classes.container}>
      <div style={{ margin: 20 }}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={subject}
          onChange={handleChange}
          className={classes.select}
          style={{ marginRight: "10%" }}
        >
          {subjects !== null
            ? Object.keys(subjects).map(function (key, index) {
                return (
                  <MenuItem key={index} value={subjects[key].id}>
                    {subjects[key].name}
                  </MenuItem>
                );
              })
            : null}
        </Select>

        <br />
        <br />

        {table}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    selectedRole: state.auth.selectedRole,
  };
};

export default connect(mapStateToProps)(StudentSyllabus);

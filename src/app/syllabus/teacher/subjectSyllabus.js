import React, { useState, useEffect } from "react";
import { IconButton, makeStyles } from "@material-ui/core";
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
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { useHistory } from "react-router-dom";
import CreateTwoToneIcon from "@material-ui/icons/CreateTwoTone";
import Delete from "@material-ui/icons/Delete";

const SubjectSyllabus = (props) => {
  const history = useHistory();
  const [subjectData, setSubjectData] = useState([]);
  let content;

  //setSyllabus(syllabus => ({...syllabus, subjectID:data}))
  useEffect(() => {
    setSubjectData([...props.subjectDetails]);
  }, [props.subjectDetails]);

  const deleteRow = async (id) => {
    try {
      const token = localStorage.getItem("srmToken");
      setSubjectData(subjectData.filter((row) => row.editId !== id));
      const response = await SyllabusService.deleteChapter(token, id);

      if (response.status === 200) {
        console.log("deleted");
      }
    } catch (e) {
      console.log(e);
    }
  };

  content = subjectData.map((row, index) => {
    return (
      <TableRow key={index}>
        <TableCell component="th" align="center" scope="row" width="15%">
          <Typography variant="subtitle1">
            <b>{row.term}</b>
          </Typography>
        </TableCell>
        <TableCell
          align="left"
          width="65%"
          style={{ borderLeft: "1px solid rgba(224, 224, 224, 1)" }}
        >
          <Typography variant="h6" gutterBottom>
            Chapter {row.chapter}
          </Typography>
          <Typography variant="subtitle1" style={{   "white-space": "pre-wrap" }} gutterBottom>
            {row.mainContent}
          </Typography>
        </TableCell>
        <TableCell align="left" width="20%">
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton
              aria-label="edit"
              onClick={(event) => {
                history.push(`/syllabus/${props.subjectID}/edit/${row.editId}`);
              }}
            >
              <CreateTwoToneIcon color="primary" />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={(event) => {
                deleteRow(row.editId);
              }}
            >
              <Delete color="primary" />
            </IconButton>
          </div>
        </TableCell>
      </TableRow>
    );
  });

  const fetchSyllabus = () => {
    //console.log(props.subjectDetails);
    if (props.subjectDetails.length !== 0) {
      return (
        <TableContainer>
          <Table aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="subtitle1">
                    <b>Term</b>
                  </Typography>
                </TableCell>
                <TableCell
                  align="center"
                  width="100%"
                  colSpan={2}
                  style={{ borderLeft: "1px solid rgba(224, 224, 224, 1)" }}
                >
                  <Typography variant="subtitle1">
                    <b>{props.subjectName}</b>
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{content}</TableBody>
          </Table>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={{ padding: 20 }}
          >
            <Button
              variant="outlined"
              color="primary"
              disableElevation
              alignself="center"
              style={{ width: "70%" }}
              onClick={(event) => {
                history.push(
                  `/syllabus/add/${props.subjectID}/class/${props.class_id}`
                );
              }}
            >
              Add Chapters & Description
            </Button>
          </Grid>
        </TableContainer>
      );
    } else {
      return (
        <div>
          <Table aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="subtitle1">
                    <b>Term</b>
                  </Typography>
                </TableCell>
                <TableCell
                  align="center"
                  width="100%"
                  style={{ borderLeft: "1px solid rgba(224, 224, 224, 1)" }}
                >
                  <Typography variant="subtitle1">
                    <b>{props.subjectName}</b>
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
          <br />
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={{ paddingBottom: 20 }}
          >
            <Button
              variant="outlined"
              color="primary"
              disableElevation
              alignself="center"
              style={{ width: "70%" }}
              onClick={(event) => {
                history.push(
                  `/syllabus/add/${props.subjectID}/class/${props.class_id}`
                );
              }}
            >
              Add Chapters & Description
            </Button>
          </Grid>
        </div>
      );
    }
  };
  const tableData = fetchSyllabus();

  return tableData;
};
export default SubjectSyllabus;

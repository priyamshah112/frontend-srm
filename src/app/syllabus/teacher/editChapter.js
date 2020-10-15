import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import SyllabusService from "../SyllabusService";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import SubjectSyllabus from "./subjectSyllabus";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";

import { useParams, useLocation, useHistory } from "react-router-dom";

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
  fieldStyle: {
    width: "100%",
    "& .MuiInputBase-root": {
      color: "rgba(0, 0, 0, 0.54)",
    },
  },
}));

const EditChapter = (props) => {
  const location = useLocation();
  const params = useParams();
  const history = useHistory();
  const classes = useStyles();

  const [syllabus, setSyllabus] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [subject, setSubject] = useState(0);
  const [chapterID, setChapter] = useState("");
  const [termID, setTerm] = useState("");
  const [submitBtn, setSubmitBtn] = useState("Submit");
  const [mainContent, setMainContent] = useState("");
  const [classID, setClassID] = useState(null);
  const [editType, setEditType] = useState(null);
  const token = localStorage.getItem("srmToken");
  const chaptersItems = [];

  const handleChange = (event) => {
    setChapter(event.target.value);
  };
  const handleTermChange = (event) => {
    setTerm(event.target.value);
  };

  const handleMainContent = (event) => {
    setMainContent(event.target.value);
  };
  const fetchSyllabus = async (subject_id, editId) => {
    const response = await SyllabusService.getSyllabusBySubject(
      token,
      subject_id
    );
    if (response.status === 200) {
      const chapterDetails = response.data.data.find((row) => {
        return row.id == editId;
      });

      if (response.data.success && isLoading) {
        setSyllabus(chapterDetails);
        setChapter(chapterDetails.chapters.chapter);
        setTerm(chapterDetails.chapters.term);
        setMainContent(chapterDetails.main_content);
        setClassID(chapterDetails.class_id);
        setLoading(false);
      }
    }
  };

  const updateChapter = async () => {
    setSubmitBtn("Submitting..");
    const response = await SyllabusService.updateChapter(token, params.eid, {
      chapters: { term: termID, chapter: chapterID },
      main_content: mainContent,
    });
    if (response.status === 200) {
      setSubmitBtn("Submit");

      if (response.data.success) {
        goBack();
      }
    }
  };

  const saveChapter = async () => {
    setSubmitBtn("Submitting..");

    const response = await SyllabusService.saveChapter(token, {
      subject_id: subject,
      class_id: classID,
      chapters: { term: termID, chapter: chapterID },
      main_content: mainContent,
    });
    if (response.status === 200) {
      setSubmitBtn("Submit");
      console.log(response.data);
      if (response.data.success) {
        goBack();
      }
    }
  };

  const goBack = () => {
    history.push(`/syllabus?cid=${classID}`);
  };

  useEffect(() => {
    setSubject(params.id);

    if (location.pathname.indexOf("/add/") > -1) {
      setClassID(params.classid);
      setTerm(1);
      setChapter(1);
      setEditType("New");
    } else if (location.pathname.indexOf("/edit/") > -1) {
      fetchSyllabus(params.id, params.eid);
      setEditType("Edit");
    }

    /*
    Dynamic MenuItem not working!
    for(var i = 1; i < 101; i++) {
      chaptersItems.push("Chapter "+i);
    }
    */
  }, [subject]);

  return (
    <div className={classes.container}>
      <div style={{ margin: 20, background: "#fff", padding: 20 }}>
        <FormControl className={classes.fieldStyle}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select-term"
            value={termID}
            onChange={handleTermChange}
            style={{ width: "100%" }}
          >
            {[...Array(11).keys()].map((chapter) => (
              <MenuItem key={chapter + 1} value={chapter + 1}>
                {`Term ${chapter + 1}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <br />
        <FormControl className={classes.fieldStyle}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select-chapter"
            value={chapterID}
            onChange={handleChange}
            style={{ width: "100%" }}
          >
            {[...Array(101).keys()].map((chapter) => (
              <MenuItem key={chapter + 1} value={chapter + 1}>
                {`Chapter ${chapter + 1}`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <br />
        <FormControl className={classes.fieldStyle}>
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={4}
            defaultValue={mainContent}
            variant="outlined"
            style={{ width: "100%" }}
            onChange={handleMainContent}
          />
        </FormControl>
        <br />
        <br />
        <Button
          variant="outlined"
          color="primary"
          style={{ marginRight: 20 }}
          onClick={() => goBack()}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => (editType == "New" ? saveChapter() : updateChapter())}
        >
          {submitBtn}
        </Button>
      </div>
    </div>
  );
};

export default EditChapter;

import React, { useState, useEffect } from "react";
import BackIcon from "../../../assets/images/Back.svg";
import {
  makeStyles,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Container,
  FormControl,
  TextField,
  Box,
  CircularProgress,
} from "@material-ui/core";
import RichTextEditor from "../../../shared/richTextEditor";
import PublishLater from "./PublishLater";
import FaqService from "../FaqService";
import { connect } from "react-redux";
import { useParams, useLocation, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "100%",
    margin: 0,
    padding: 0,
    overflow: "auto",
  },
  padding: {
    padding: "15px",
    paddingBottom: "100px",
  },
  editorCard: {
    padding: "20px",
  },
  cardContentRoot: {
    padding: "0px",
  },
  fieldStyle: {
    width: "100%",
    margin: "auto",
    "& .MuiInput-underline:before": {
      borderBottom: "2px solid #eaeaea",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: "2px solid #7B72AF",
      transitionProperty: "border-bottom-color",
      transitionDuration: "500ms",
      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    },
  },
  backImg: {
    float: "left",
    transform: "translate(0px, 2px)",
    cursor: "pointer",
  },
  themeColor: {
    color: "#1C1C1E",
    padding: 0,
    margin: 0,
  },
  titleText: {
    fontSize: "18px",
    fontFamily: "Avenir Medium",
    textAlign: "center",
    margin: "auto",
  },
  inputMargin: {
    marginTop: "20px",
  },
  textAlignLeft: {
    color: "rgba(0, 0, 0, 0.54)",
  },
  adornmentColor: {
    color: theme.palette.common.adornment,
  },
  cardAction: {
    padding: "20px",
    paddingRight: "0px",
  },
  alignLeft: {
    textAlign: "left",
  },
  alignRight: {
    textAlign: "right",
  },
  Cardtitle: {
    textAlign: "center",
  },
  publishLaterBtn: {
    border: "1px solid black",
    backgroundColor: "white",
    color: "black",
    marginRight: "20px",
  },
  publishBtn:{
			textTransform: 'none',
  },
	CircularProgress: {
		position: 'absolute',
		left: '50%',
		top: '50%',
		zIndex: '1',
	},
}));

const FaqEditor = (props) => {
  const classes = useStyles();
	const [isLoading, setLoading] = useState(true)
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [ status, setStatus ] = useState("draft");
  const [ publishDate, setPublishedDate ] = useState(null);
  const [isEditPage, setIsEditPage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openPubLater, setOpenPubLater] = useState(false);
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();

  const fetchFaq = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem("srmToken");
      const response = await FaqService.fetchFaq(token, id);
      if (response.status === 200) {
        setQuestion(response.data.data.question);
        setAnswer(response.data.data.answer);
        setStatus(response.data.data.status);
        setPublishedDate(response.data.data.published_date);
      }
    } catch (error) {
      console.error("Unhandled Error: ", error);
    }
    setLoading(false)
  };

  const saveFaq = async ({ published_date, status }) => {
    try {
      const token = localStorage.getItem("srmToken");
      let payload = {};
      if ((status === "draft" && published_date) || (status === "active" && published_date)) {
        payload = {
          question,
          answer,
          status,
          published_date: status === 'active' ? published_date : null,
        };
      } else {
        payload = {
          question,
          answer,
          status,
        };
      }
      await FaqService.updateFaq(token, id, payload);
    } catch (error) {
      console.error("Unhandled Error: ", error);
    }
  };

  
  useEffect(() => {
    fetchFaq(id);
  }, [id]);

  useEffect(() => {
    const saveDataInterval = setInterval(() => {
      saveFaq({ 
        status: status , 
        published_date: publishDate,
       });
    }, 10000);

    return () => {
      clearInterval(saveDataInterval);
    };
  }, [question, answer, status, publishDate]);

  const handleDescription = (data) => {
    setAnswer(data);
  };

  const handleOpenPubLater = (_event) => {
    if (question === "" || answer === "") {
      setErrorMessage("Fill all data");
    } else {
      setOpenPubLater(true);
    }
  };

  const handleClosePubLater = () => {
    setOpenPubLater(false);
  };

  const handlePublishLater = async() => {
    await saveFaq({
      published_date: publishDate,
      status: "active",
    });
    history.push("/faq");
  };

  const handlePublishNow = async(_event) => {
    if (question === "" || answer === "") {
      setErrorMessage("Fill all data");
    } else {
      await saveFaq({ status: "published" });
      history.push("/faq");
    }
  };

  const handleBackBtn = async(_event) => {
    await saveFaq({ status: status,published_date: publishDate });
    history.push("/faq");
  };

  return (
    <Box className={classes.container}>
      {isLoading === true ? (
				<div className={classes.loder}>
					<CircularProgress
						color='primary'
						thickness={5}
						className={classes.CircularProgress}
					/>
				</div>
			) : (
      <Container classes={{ root: classes.padding }}>
        <Card variant="outlined" className={classes.editorCard}>
          <Box className={`${classes.margin}`}>
            <Box>
              <img
                src={BackIcon}
                alt="Back"
                className={classes.backImg}
                onClick={handleBackBtn}
              />
              <Typography
                variant="h5"
                className={`${classes.themeColor} ${classes.titleText}`}
              >
                {isEditPage ? "Edit FAQ" : "Create FAQ"}
              </Typography>
            </Box>
          </Box>
          <CardContent classes={{ root: classes.cardContentRoot }}>
            {errorMessage !== "" ? (
              <Box style={{ marginTop: "30px", textAlign: "center" }} pt={2}>
                <Box>
                  <Typography style={{ color: "red" }}>
                    {errorMessage}
                  </Typography>
                </Box>
              </Box>
            ) : null}
            <Box className={classes.inputMargin}>
              <FormControl className={classes.fieldStyle}>
                <TextField
                  id="question"
                  name="question"
                  label="Question"
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  required={true}
                />
              </FormControl>
            </Box>
            <Box className={classes.inputMargin}>
              <Typography className={classes.textAlignLeft}>Answer</Typography>
              <RichTextEditor
                handleDescription={handleDescription}
                value={answer}
                token={props.token}
              />
            </Box>
          </CardContent>
          <CardActions className={classes.cardAction}>
            <Box style={{ width: "100%", textAlign: "right" }}>
              <Box>
                <Button
                  className={`${classes.publishLaterBtn} ${classes.publishBtn}`}
                  variant="contained"
                  disableElevation={true}
                  onClick={handleOpenPubLater}
                >
                  Publish Later
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  className={classes.publishBtn}
                  disableElevation={true}
                  onClick={handlePublishNow}
                >
                  Publish Now
                </Button>
              </Box>
            </Box>
          </CardActions>
        </Card>
      </Container>
      )
    }
      {openPubLater ? (
        <PublishLater
          open={openPubLater}
          publishDate={publishDate}
          handleClose={handleClosePubLater}
          handlePublishDate={setPublishedDate}
          handlePublishLater={handlePublishLater}
        />
      ) : null}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedRole: state.auth.selectedRole,
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(FaqEditor);

import React, { useState, useEffect, Fragment } from "react";
import Container from "@material-ui/core/Container";
import {
  makeStyles,
  Grid,
  Typography,
  CircularProgress,
  Box,
  Input,
  IconButton,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import FaqCard from "./FaqCard";
import FaqService from "../FaqService";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    height: "100%",
    margin: 0,
    padding: "0 10px",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  headerText: {
    marginTop: "20px",
    textAlign: "center",
    fontSize: "20px",
  },
  loading: {
    textAlign: "center",
    justifyContent: "center",
    margin: "20px auto",
  },
  cardGridStyle: {
    marginTop: "20px",
  },
  emptyView: {
    width: "100%",
    textAlign: "center",
    paddingTop: "100px",
    fontSize: "20px",
  },
  searchForm: {
    width: "100%",
    marginTop: "20px",
  },
  searchContainer: {
    width: "100%",
    display: "flex",
  },
  search: {
    width: "100% !important",
    padding: "7px 8px",
    backgroundColor: "white",
    borderRadius: "5px 0px 0px 5px",
    [theme.breakpoints.up("sm")]: {
      width: "auto",
    },
  },
  searchIcon: {
    color: "white",
    backgroundColor: "#7B72AF",
    borderRadius: "0px 5px 5px 0px",
    "&:hover": {
      backgroundColor: "#7B72AF",
    },
  },
}));

const Header = ({ title }) => {
  const classes = useStyles();
  return <Typography className={classes.headerText}>{title}</Typography>;
};

const Spinner = ({ isLoading }) => {
  const classes = useStyles();
  if (!isLoading) return null;
  return (
    <Box className={classes.loading}>
      <CircularProgress color="primary" size={30} />
    </Box>
  );
};

const SearchBar = ({ handleSearch, handleSearchChange }) => {
  const classes = useStyles();
  return (
    <Box
      component="form"
      className={classes.searchForm}
      onSubmit={handleSearch}
    >
      <Box className={classes.searchContainer}>
        <Input
          placeholder="Search…"
          className={classes.search}
          disableUnderline={true}
          onChange={handleSearchChange}
        />
        <IconButton type="submit" className={classes.searchIcon}>
          <SearchIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

const AllCards = ({ faqs }) => {
  const classes = useStyles();
  return (
    <Fragment>
      {faqs.map((faq) => (
        <Grid key={faq.id} className={classes.cardGridStyle}>
          <FaqCard id={faq.id} question={faq.question} answer={faq.answer} />
        </Grid>
      ))}
    </Fragment>
  );
};

const StudentFaq = () => {
  const classes = useStyles();
  const [allFaqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    async function fetchAllFaqs() {
      try {
        setLoading(true);
        const role = localStorage.getItem("srmSelectedRole");
        const token =
          role === "parent"
            ? localStorage.getItem("srmSelected_Child_token")
            : localStorage.getItem("srmToken");
        const response = await FaqService.fetchAllFaqs(token);
        setFaqs(response.data.data.data);
      } catch (error) {
        console.warn("Error: ", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAllFaqs();
  }, []);

  const handleSearchChange = (event) => {
    if (event.target.value === "") {
      setSearchQuery(event.target.value);
      setSearchResults([]);
      setNoResults(false);
    } else {
      setSearchQuery(event.target.value);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const filteredFaqs = allFaqs.filter(
      (faq) => faq.question.toLowerCase().search(searchQuery) !== -1
    );
    if (filteredFaqs.length === 0) {
      setSearchResults(filteredFaqs);
      setNoResults(true);
    } else {
      setSearchResults(filteredFaqs);
    }
  };

  return (
    <Container className={classes.container} id="scrollable">
      <Header title="Frequently Asked Questions" />
      <SearchBar
        handleSearch={handleSearch}
        handleSearchChange={handleSearchChange}
      />
      <Spinner isLoading={loading} />
      {searchResults.length === 0 && !noResults ? (
        <AllCards faqs={allFaqs} />
      ) : (
        <AllCards faqs={searchResults} />
      )}
      {(!loading && !allFaqs.length) || noResults ? (
        <div className={classes.emptyView}>
          <Typography>Don't have any FAQ.</Typography>
        </div>
      ) : null}
      <br />
      <br />
      <br />
      <br />
      <br />
    </Container>
  );
};

export default StudentFaq;

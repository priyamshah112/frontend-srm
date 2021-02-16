import React from "react";
import { makeStyles, Box, Input, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
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

export default SearchBar;

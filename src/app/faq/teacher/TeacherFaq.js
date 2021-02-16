import React, { useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import {
  makeStyles,
  Container,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import InfiniteScroll from 'react-infinite-scroll-component'
import FaqCard from "../components/FaqCard";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import NoFAQ from "../components/NoFAQ";
import FaqService from "../FaqService";
import SearchContainer from "../components/searchContainer";


const useStyles = makeStyles((theme) => ({
	container: {
	  width: "100%",
	  height: "100%",
	  padding: "20px",
	  overflowY: "auto",
	  "&::-webkit-scrollbar": {
		display: "none",
	  },
	},
	loading: {
		  width: '100%',
		  height: '100px',
		  textAlign: 'center',
		  paddingTop: '20px',
		  fontSize: '20px',
	  },
  }));
  

  const AllCards = ({ faqs, handleDelete }) => {
	return (
	  <Fragment>
		{faqs.map((faq) => (
		  <Grid key={faq.id}>
			<FaqCard
			  key={faq.id}
			  id={faq.id}
			  status={faq.status}
			  question={faq.question}
			  answer={faq.answer}
			  showActions={true}
			  handleDelete={handleDelete}
			/>
		  </Grid>
		))}
	  </Fragment>
	);
  };  

const TeacherFaq = () => {	
	const classes = useStyles();
	const history = useHistory();
	const [allFaqs, setFaqs] = useState([]);
	const [loading, setLoading] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [searchView, setSearchView] = useState(false)
	const [ refetch, setRefetch ] = useState(false)
	const [hasMore, setHasMore] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)
	const role = JSON.parse(localStorage.getItem("srmSelectedRole"));
	const token =
		role === "parent"
		? localStorage.getItem("srmSelected_Child_token")
		: localStorage.getItem("srmToken");

	const fetchAllFaqs = async() => {
		try {
			setLoading(true);
			const response = await FaqService.fetchAllFaqs(token,currentPage,role);
			if(response.status === 200){
				setFaqs(response.data.data.data);
				if (response.data.data.current_page !== response.data.data.last_page){
				setCurrentPage(currentPage + 1)
				console.log(response)
				}else {
				setHasMore(false)
				}
			}
		} catch (error) {
			console.warn("Error: ", error);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchAllFaqs();
	}, []);


	const handleDelete = () => {
		fetchAllFaqs();
	};	

	const handleSearchChange = (event) => {
		if (event.target.value === "") {
		  setSearchQuery(event.target.value);
		  setSearchView(false);
		  setRefetch(false)
		} else {
		  setSearchQuery(event.target.value);
		}
	};

	const handleSearch = (event) => {
		event.preventDefault();
		if(searchQuery !== ''){
			if(searchView){
				setRefetch(true)
			}
			else{
				setSearchView(true);
			}
		}	
	};	

	const handleCreateNewFaq = async (_event) => {
		try {
			const response = await FaqService.createFaq(token)
			const { id } = response.data.data
			history.push(`/faq/create/${id}`)
		} catch (error) {
			console.error(`Unhandled error: ${error}`)
		}
	}
	const fetchFaqsOnScroll = async() => {
		try {
			const response = await FaqService.fetchAllFaqs(
				token,
				currentPage,
				role	
			)
			if (response.status === 200) {
				setFaqs([...allFaqs, ...response.data.data.data])
				if (response.data.data.current_page !== response.data.data.last_page){
					setCurrentPage(currentPage + 1)
				}else {
					setHasMore(false)
				}
			}
		} catch (e) {
			console.log(e)
		}
		setLoading(false)
	}
	return (
		<Container className={classes.container} id="scrollable">
			<Header
			title="Frequently Asked Questions"
			newLeaveBtnHandler={(_event) => history.push("/faq/create")}
			newFaqBtnHandler={handleCreateNewFaq}
			/>
			<SearchBar
			handleSearch={handleSearch}
			handleSearchChange={handleSearchChange}
			/>
			{                
			loading ? (
					<div className={classes.loading}>
						<CircularProgress color='primary' size={30} />
					</div>
			): searchView ? <SearchContainer searchQuery={searchQuery} searchView={searchView} refetch={refetch} onsetRefetch={setRefetch}/>  : (
				<InfiniteScroll
					dataLength={allFaqs.length}
					next={fetchFaqsOnScroll}
					hasMore={hasMore}
					style={{ overflow: 'hidden'}}
					loader={
						<>
							<div
								className={classes.loading}
								style={{
									width: '100%',
									textAlign: 'center',
									marginTop: '8px',
								}}
							>
								<CircularProgress color='primary' size={30} />
							</div>
							<br />
						</>
					}
					scrollableTarget='scrollable'
					scrollThreshold={0.5}
				>   
					{!allFaqs.length ? <NoFAQ /> : <AllCards faqs={allFaqs} handleDelete={handleDelete} />}
				</InfiniteScroll>
			) 
		} 
		
		</Container>
	);	
}

export default TeacherFaq

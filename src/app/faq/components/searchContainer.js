import React, { useState, useEffect, Fragment } from "react";
import {
  makeStyles,
  Grid,
  CircularProgress,
} from "@material-ui/core";
import InfiniteScroll from 'react-infinite-scroll-component'
import FaqCard from "./FaqCard";
import NoFAQ from "../components/NoFAQ";
import FaqService from "../FaqService";


const useStyles = makeStyles((theme) => ({
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
  const AllStudentCards = ({ faqs }) => {
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
			  showActions={false}
			  student={true}
			/>
		  </Grid>
		))}
	  </Fragment>
	);
  };
  
const SearchContainer = (props) => {
	const { searchQuery,searchView,refetch } = props;	
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const [allFaqs, setFaqs] = useState([]);
	const [hasMore, setHasMore] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)
	const role = JSON.parse(localStorage.getItem("srmSelectedRole"));
	const token =
		role === "parent"
		? localStorage.getItem("srmSelected_Child_token")
		: localStorage.getItem("srmToken");

	const fetchAllFaqs = async(page) => {
		try {
			setLoading(true);
			const response = await FaqService.fetchSearchedFaq(token,page,role,searchQuery);
			if(response.status === 200){
				setFaqs(response.data.data.data);
				if (response.data.data.current_page !== response.data.data.last_page){
					setCurrentPage(page + 1)
					setHasMore(true)
				}else {
					setHasMore(false)
				}
				props.onsetRefetch(false)
			}
		} catch (error) {
			console.warn("Error: ", error);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchAllFaqs(1);
	},[searchView]);
	useEffect(()=>{
		if(searchView && refetch){
			fetchAllFaqs(1);
		}
	},[refetch])


	const handleDelete = () => {
		fetchAllFaqs(1);
	};	
	

	const fetchFaqsOnScroll = async() => {
		try {
			const response = await FaqService.fetchSearchedFaq(token,currentPage,role,searchQuery)
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
		<>
		{                
			loading ? (
					<div className={classes.loading}>
						<CircularProgress color='primary' size={30} />
					</div>
			) : 
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
					{ !allFaqs.length ? 
						<NoFAQ /> 
					: role === "teacher" || role === "admin" ? 
						<AllCards faqs={allFaqs} handleDelete={handleDelete} /> 
						: <AllStudentCards faqs={allFaqs}/>
					}      
				</InfiniteScroll>
		}
	</>
		
	);	
}

export default SearchContainer

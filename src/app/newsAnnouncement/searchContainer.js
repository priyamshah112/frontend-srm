import 'date-fns'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import { Box,Input,IconButton} from '@material-ui/core'
import SearchIcon from "@material-ui/icons/Search";
import { Typography } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import InfiniteScroll from 'react-infinite-scroll-component'
import AnnouncementService from './AnnouncementService'
import AddIcon from '../../assets/images/Filled Add.svg'
import AnnouncementCard from '../home/studentHome/AnnouncementCard'
import NewsCard from './teacher/NewsCard'

const useStyles = makeStyles((theme) => ({
	datePicker: {
		width: '25%',
		paddingRight: '10px',
	},
	sectionContainer: {
		height: '100%',
		width: '100%',
		padding: '20px',
		boxSizing: 'border-box',
	},

	header: {
		textAlign: 'right',
		paddingBottom: '10px',
	},
	cardBoxPadding: {
		padding: '0px',
	},
	addNew: {
		color: theme.palette.common.deluge,
		cursor: 'pointer',
		'& .new': {
			float: 'right',
			fontSize: '14px',
			padding: '5px',
			paddingRight: '0px',
			paddingBottom: '10px'
		},
		'& img': {
			margin: '5px',
			height: '20px',
			cursor: 'pointer',
		},
	},
	loading: {
		width: '100%',
		textAlign: 'center',
		paddingTop: '8px',
		fontSize: '20px',
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
  searchForm: {
    width: "100%",
	paddingBottom: "10px",
	boxSizing: 'border-box'
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
  emptyView: {
	  width: '100%',
	  textAlign: 'center',
	  paddingTop: '100px',
	  fontSize: '20px',
  },
}))

const SearchContainer = (props) => {
	const { searchInput,searchView,refetch } = props;	
	const classes = useStyles()
	const history = useHistory()
	const [hasMore, setHasMore] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)
	const [announcements, setAnnouncements] = useState([])
	const [loading, setLoading] = useState(true)
	const token = localStorage.getItem('srmToken')
	const selectedRole = props.selectedRole
	const createdBy = props.createdBy
	
    const fetchData = async () => {
        setLoading(true)
        try {	
            let params = {}
            if (createdBy) {
                params = { selectedRole, currentPage, createdBy }
            } else {
                params = { selectedRole, currentPage }
            }

            const response = await AnnouncementService.fetchSearchAnnouncements(
                params,
                token,
                searchInput,
            )
            if (response.status === 200) {
                setAnnouncements(response.data.data.data)
                if (
                    response.data.data.current_page !== response.data.data.last_page
                ) {
                    setCurrentPage(currentPage + 1)
					setHasMore(true)
                } else {
                    setHasMore(false)
                }
				props.onsetRefetch(false)
            }
        } catch (e) {
            console.log(e)
        }
        setLoading(false)
    }	
    
    useEffect(() => {
		fetchData(1);
	},[searchView]);

	useEffect(()=>{
		if(searchView && refetch){
			fetchData(1);
		}
	},[refetch])

	const refresh = async () =>{
		setCurrentPage(1)
        fetchData()
	} 
	const fetchAnnouncementOnScroll = async () => {
		try {
			let params = {}
			if (createdBy) {
				params = { selectedRole, currentPage, createdBy }
			} else {
				params = { selectedRole, currentPage }
			}

			const response = await AnnouncementService.fetchSearchAnnouncements(
				params,
				token,
                searchInput
			)

			if (response.status === 200) {
				if (response.data.data.current_page !== response.data.data.last_page) {
					setAnnouncements([...announcements, ...response.data.data.data])
					setCurrentPage(currentPage + 1)
				} else {
					setAnnouncements([...announcements, ...response.data.data.data])
					setHasMore(false)
				}
			}
		} catch (error) {
			console.log(error)
		}
	}

	let content

	if (props.createdBy) {
		content = announcements.map((announcement, index) => (
				<NewsCard
					key={announcement.id}
					createdBy={props.createdBy}
					announcement={announcement}
					refresh={refresh}
				/>
			)
		)
	} else {
		content = announcements.map((announcement, index) => {
			return (
				<AnnouncementCard key={announcement.id} announcement={announcement} />
			)
		})
	}

	return (
            <InfiniteScroll
                dataLength={announcements.length}
                next={fetchAnnouncementOnScroll}
                hasMore={hasMore}
                loader={
                    <>
                        <div className={classes.loading}>
                            <CircularProgress color='primary' size={30} />
                        </div>
                        <br />
                    </>
                }
                scrollableTarget='scrollable'
                scrollThreshold={0.2}
            >
                {loading ? (
                    <>
                        <br />
                        <div className={classes.loading}>
                            <CircularProgress color='primary' size={30} />
                        </div>
                        <br />
                    </>
                ) : !announcements.length ? (
                    <div className={classes.emptyView}>
                        <Typography>No news available</Typography>
                    </div>
                ) : null}					
                { loading ? null : content}
            </InfiniteScroll>
	)
}

const mapStateToProps = (state) => {
	return {
		selectedRole: state.auth.selectedRole,
	}
}

export default connect(mapStateToProps)(SearchContainer)

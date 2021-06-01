import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import AddIcon from '../../assets/images/Filled Add.svg'
import { Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import AddDishes from './AddDishes'
import DishesCard from './DishesCard'
import { showDishListInDishes } from '../redux/actions/attendence.action'

const useStyles = makeStyles((theme) => ({
  container: {
    // margin: "15px",
    display: 'flex',
    flexDirection: 'column',
    // height: "100%",
    // overflow: "auto",
  },
  datePicker: {
    width: '25%',
    paddingRight: '10px',
  },
  sectionContainer: {
    height: '100%',
    width: '100%',
  },

  header: {
    display: 'inline block',
  },
  cardBoxPadding: {
    padding: '24px',
    [theme.breakpoints.down('sm')]: {
      padding: '16px',
    },
  },
  style: {
    fonTize: '1rem',
    fontFamily: 'Avenir Medium',
    fontWeight: '400',
    color: '#1C1C1E',
    textAlign: 'center',
  },
  addNew: {
    color: theme.palette.common.deluge,
    // float: "right",
    display: 'flex',
    justifyContent: 'flex-end',
    cursor: 'pointer',
    marginRight: '15px',
    '& .new': {
      float: 'right',
      fontSize: '14px',
      padding: '5px',
      fontWeight: 500,
    },
    '& img': {
      margin: '5px',
      height: '20px',
      cursor: 'pointer',
    },
  },
  InfiniteScroll: {
    overflow: 'revert !important',
    '& .infinite-scroll-component': {
      overflow: 'revert !important',
    },
  },
  loading: {
    width: '100%',
    textAlign: 'center',
    paddingTop: '8px',
    fontSize: '20px',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '50%',
  },
  head: {
    margin: '20px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
  heading1: {
    fontSize: '18px',
    fontFamily: 'Avenir medium',
    textAlign: 'center',
  },
  heading2: {
    fontFamily: 'Avenir medium',
    fontSize: '18px',
    color: 'rgb(150, 150, 150)',
  },
  heading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Avenir',
  },
  heading21: {
    position: 'absolute',
    width: '100px',
    right: 0,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  new: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))

function Dishes(props) {
  const classes = useStyles()
  const [openAdd, setOpenAdd] = useState(false)
  const [edit, setEdit] = useState(false)
  const { selectedRole, school_id } = props
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [paginationInfo, setPaginationInfo] = useState({})
  const [refetch, setRefetch] = useState(false)

  console.log('data :>> ', data)
  const handleAdd = () => {
    setOpenAdd(true)
  }
  const handleCloseAdd = () => {
    setOpenAdd(false)
  }

  const onSuccess = (result) => {
    console.log('result :>> ', { result, data })
    if (result) {
      setLoading(false)
      setData([...data, ...result.data.data])
      setPaginationInfo(result.data)
    }
  }
  const fetchData = (currentPage, froms) => {
    if (loading) return
    setLoading(true)
    console.log('fetchData', froms)
    props.showDishListInDishes(currentPage, school_id, onSuccess)
  }

  useEffect(() => {
    if (school_id) {
      fetchData(1, 'useEffect')
    }
  }, [])

  useEffect(() => {
    if (refetch) {
      fetchData(1, 'fetchDataOnSuccess')
    }
  }, [refetch])

  const fetchDataOnSuccess = () => {
    setData([])
    setCurrentPage(1)
    setPaginationInfo({})
    setRefetch(Math.random())
  }
  const handleLoadMore = (e) => {
    // console.log("event", e);
    // console.log("clientHeigh :>> ", e.target.clientHeigh);
    // console.log("scrollTop :>> ", e.target.scrollTop);
    // console.log("scrollHeight :>> ", e.target.scrollHeight);
    let bottom =
      e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop < 20
    console.log('bottom :>> ', bottom)
    if (paginationInfo.last_page > currentPage) {
      if (bottom && !loading && !edit) {
        // console.log("paginationInfo :>> ", paginationInfo);
        let page = currentPage + 1
        fetchData(page, 'pagination')
        setLoading(true)
        setCurrentPage(page)
      }
    }
  }

  return (
    <div onScroll={handleLoadMore} style={{ height: '100%', overflow: 'auto' }}>
      {openAdd ? (
        <AddDishes fetchData={fetchDataOnSuccess} close={handleCloseAdd} />
      ) : (
        <div className={classes.container}>
          {edit ? (
            ''
          ) : (
            <div className={classes.head}>
              <div className={classes.heading}>
                <span className={classes.heading1}>Dishes</span>
              </div>
            </div>
          )}
          {edit ? (
            ''
          ) : selectedRole === 'teacher' || selectedRole === 'admin' ? (
            <div className={classes.new}>
              <div className={classes.addNew} onClick={handleAdd}>
                <img src={AddIcon} alt="add" />
                <Typography className="new">Add Dishes</Typography>
              </div>
            </div>
          ) : (
            ''
          )}
          {selectedRole === 'teacher' || selectedRole === 'admin' ? (
            <DishesCard
              refetch={fetchDataOnSuccess}
              data={data}
              loading={loading}
              setEdit={setEdit}
            />
          ) : (
            ''
          )}
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  const userInfo = state.auth.userInfo || {}
  const userClasses = userInfo.user_classes || {}
  return {
    selectedRole: state.auth.selectedRole,
    school_id: userClasses.school_id,
  }
}

export default connect(mapStateToProps, { showDishListInDishes })(Dishes)

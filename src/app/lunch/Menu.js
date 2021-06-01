import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import AddIcon from '../../assets/images/Filled Add.svg'
import { Typography } from '@material-ui/core'
import { FormControl } from '@material-ui/core'
import { connect } from 'react-redux'
import AddMenu from './AddMenu'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import MenuCard from './MenuCard'
import { getLunchMenuId } from '../redux/actions/attendence.action'
import { lunchMenuGetByWeek } from '../redux/actions/attendence.action'
import { lunchMenuAll } from '../redux/actions/attendence.action'
import { lunchMenuAllStu } from '../redux/actions/attendence.action'
import { lunchMenuSearch } from '../redux/actions/attendence.action'
import BackdropLoader from '../common/ui/backdropLoader/BackdropLoader'
import ClassesDropdown from '../common/ui/classesDropdown'
import Autocomplete from '@material-ui/lab/Autocomplete'

const useStyles = makeStyles((theme) => ({
  container: {},
  datePicker: {
    width: '25%',
    paddingRight: '10px',
  },
  sectionContainer: {
    height: '100%',
    width: '100%',
    // marginBottom: "10px",
  },

  header: {
    display: 'inline block',
    marginRight: '20px',
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
    float: 'right',
    // marginTop: '15px',
    // marginRight: "20px",
    cursor: 'pointer',
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
  fieldStyle: {
    width: '170px',
    marginleft: '15px',
    fontFamily: 'Avenir Book',
    fontSize: ' 1rem',
    '& .MuiInput-underline:before': {
      borderBottom: '2px solid #eaeaea',
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottom: '2px solid #7B72AF',
      transitionProperty: 'border-bottom-color',
      transitionDuration: '500ms',
      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
  menuItem: {
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 0.54)',
    marginRight: '20px',
  },
  loading: {
    width: '100%',
    textAlign: 'center',
    paddingTop: '8px',
    fontSize: '20px',
  },
  formControl: {
    marginLeft: '5px',
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
  dropdown: {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: '20px',
    width: '50%',
  },
}))

function Menu(props) {
  const classes = useStyles()
  const [openAdd, setOpenAdd] = useState(false)
  const [day, setDay] = useState('All')
  const [edit, setEdit] = useState(false)

  const [class_id, setClassId] = useState('')
  const [name, setClassName] = useState('')
  // const [schoolId, setSchoolId] = useState("");

  const { data, loading } = props
  const lunch_menu_id = data.lunch_menu_id
  const menuValue = JSON.parse(localStorage.getItem('menuValue'))
  const {
    selectedRole,
    weekday,
    school_id,
    lunchMenuData,
    lunchMenuLoading,
    lunchMenuAllData,
    lunchMenuAllLoading,
    classesLoading,
  } = props

  useEffect(() => {
    if (menuValue) {
      setClassId(menuValue.class_id)
      setDay(menuValue.day)
      localStorage.removeItem('menuValue')
    }
  }, [])

  let menuData = day === 'All' ? lunchMenuAllData || {} : lunchMenuData || {}
  menuData = menuData.lunch_menu

  const handleAdd = () => {
    props.getLunchMenuId()
    setOpenAdd(true)
  }
  const handleCloseAdd = () => {
    setOpenAdd(false)
  }
  const handleChange = (event) => {
    setDay(event.target.value)
  }

  const fetchWeekData = () => {
    if (day === 'All' && class_id) {
      props.lunchMenuAll(school_id, class_id)
    }
    if (selectedRole === 'parent' || selectedRole === 'student') {
      props.lunchMenuAllStu()
    }
  }
  const fetchData = () => {
    if (day != 'All') {
      props.lunchMenuSearch(day, class_id, school_id)
    }
  }

  const fetchWeek = () => {
    props.lunchMenuGetByWeek()
  }
  useEffect(() => {
    fetchWeek()
  }, [])

  useEffect(() => {
    fetchData()
  }, [day, class_id])

  useEffect(() => {
    fetchWeekData()
  }, [class_id])

  const onChangeClass = (id, classname) => {
    setClassId(id)
    setClassName(classname.class_name)
    // setSchoolId(classname.school_id);
  }

  return (
    <>
      <div>
        {openAdd ? (
          loading ? (
            <BackdropLoader open={loading} />
          ) : (
            <AddMenu
              day={day}
              lunchMenuId={lunch_menu_id}
              class_id={class_id}
              close={handleCloseAdd}
            />
          )
        ) : (
          <div className={classes.container}>
            {edit ? (
              ''
            ) : (
              <div className={classes.head}>
                <div className={classes.heading}>
                  <span className={classes.heading1}>Menu</span>
                </div>
              </div>
            )}
            {edit ? (
              ''
            ) : (
              <div className={classes.sectionContainer}>
                <div className={classes.header}>
                  <div className={classes.filterForm}>
                    {selectedRole === 'teacher' || selectedRole === 'admin' ? (
                      <div className={classes.addNew} onClick={handleAdd}>
                        <img src={AddIcon} alt="add" />
                        <Typography className="new">Add</Typography>
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className={classes.dropdown}>
                  {selectedRole === 'teacher' || selectedRole === 'admin' ? (
                    <div className={classes.header}>
                      <div className={classes.filterForm}>
                        <FormControl className={classes.fieldStyle}>
                          <ClassesDropdown
                            className={classes.menuItem}
                            onChange={onChangeClass}
                            value={class_id}
                          />
                        </FormControl>
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                  <div className={classes.header}>
                    <div className={classes.filterForm}>
                      <FormControl className={classes.fieldStyle}>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={day}
                          className={classes.menuItem}
                          onChange={handleChange}
                        >
                          <MenuItem value="All">All</MenuItem>
                          {weekday.map((item) => (
                            <MenuItem value={item.id}>{item.name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <MenuCard
              day={day}
              class_id={class_id}
              setEdit={setEdit}
              menuData={menuData}
              classesLoading={classesLoading}
              menuFilterLoading={lunchMenuLoading}
              menuDataLoading={lunchMenuAllLoading}
            />
          </div>
        )}
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  const {
    getLunchMenuId,
    lunchMenuAll = [],
    lunchMenuAllLoading,
    getLunchMenuIdLoading,
    lunchMenuGetByWeek = [],
    lunchMenuSearch = [],
    lunchMenuSearchLoading,
    classesLoading,
  } = state.Attendence
  const userInfo = state.auth.userInfo || {}
  const userClasses = userInfo.user_classes || {}
  return {
    weekday: lunchMenuGetByWeek,
    lunchMenuData: lunchMenuSearch,
    lunchMenuLoading: lunchMenuSearchLoading,
    lunchMenuAllData: lunchMenuAll,
    lunchMenuAllLoading: lunchMenuAllLoading,
    data: getLunchMenuId,
    loading: getLunchMenuIdLoading,
    classesLoading: classesLoading,
    selectedRole: state.auth.selectedRole,
    school_id: userClasses.school_id,
  }
}

export default connect(mapStateToProps, {
  lunchMenuGetByWeek,
  getLunchMenuId,
  lunchMenuSearch,
  lunchMenuAll,
  lunchMenuAllStu,
})(Menu)

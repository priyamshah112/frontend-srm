import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  Box,
  Grid,
  CardContent,
  CardActions,
  CircularProgress,
} from '@material-ui/core';
import Card from '@material-ui/core/Card';

import taskBookIcon from '../../../../assets/images/home/teacher/TaskBook.svg';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import * as moment from 'moment';
import { useHistory } from 'react-router-dom';
import HomeSerivce from '../../HomeSerivce';
import { closestIndexTo } from 'date-fns/fp';

const useStyle = makeStyles((theme) => ({
  homeworkDiv: {
    height: '100%',
    display: 'table',
    width: '100%',
  },
  title: {
    textTransform: 'uppercase',
    fontWeight: 800,
    letterSpacing: '1px',
    color: `${theme.palette.common.bastille}`,
  },
  homeworkIcon: {
    transform: 'translateY(5px)',
  },
  homeworkheader: {
    width: '100%',
    display: 'table-row',
    height: '30px',
  },
  homeworks: {
    width: '100%',
    height: '100%',
    display: 'table-row',
    marginTop: '10px',
  },
  cardContentStyle: {
    cursor: 'pointer',
    padding: '8px',
  },
  addhomeworkIcon: {
    float: 'right',
    cursor: 'pointer',
    bottom: 0,
  },
  // cardTitle: {
  //   fontWeight: 600,
  // },
  homeworkCard: {
    borderRadius: '10px',
    height: '100px',
    overflow: 'none',
    width: '95%',
    boxShadow: 'none',
    // overflow: 'none',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '0',
    },
    backgroundColor: '#F7DDCC',
    '& .0': {
      color: 'red',

      backgroundColor: '#F7DDCC',
    },

    [theme.breakpoints.down('sm')]: {
      marginTop: '10px',
    },
  },
  loading: {
    textAlign: 'center',
    justifyContent: 'center',
    margin: 'auto',
    marginTop: '20px',
  },

  1: {
    color: 'red',
    backgroundColor: '#F8E7C1 !important',
  },
  2: {
    backgroundColor: '#D4DbD8',
  },
  CardContent: {
    padding: '0 0 0 10px !important',
    margin: '10px 0 0 0',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '0',
    },
  },
  homeworkContentStyle: {
    cursor: 'pointer',
  },
  homeworkCardView: {
    maxWidth: '32.5%'
  },
  homeworksView: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  }
}));

const Homework = (props) => {
  const classes = useStyle();
  const history = useHistory();
  const [homework, setHomework] = useState([]);
  const [showNoContent, setShowNoContent] = useState(false);
  const [loading, setLoading] = useState(true);

  const cardColors = ['#F7DDCC', '#F8E7C1', '#D4DbD8'];
  const cardMargins = ['0 auto 0 0', '0 auto', '0 0 0 auto'];

  useEffect(() => {
    let isHomeworkLoading = true;
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('srmToken');
        const response = await HomeSerivce.fetchTeacherHomework(
          token,
          props.selectedRole
        );
        setLoading(false);
        if (response.status === 200) {
          let homeworkSet = false;
          if (response.data.data.data.length === 0) {
            setShowNoContent(true);
          }
          if (isHomeworkLoading) {
            setHomework(response.data.data.data);
            homeworkSet = true;
          }
        }
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    };
    fetchData();
    return () => {
      isHomeworkLoading = false;
    };
  }, []);

  const handleCreateHomework = async () => {
    try {
      const token = localStorage.getItem('srmToken');
      const response = await HomeSerivce.createHomework(token);
      history.push(`/create-homework/${response.data.homework_id}`);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={classes.homeworkDiv}>
      <div className={classes.homeworkheader}>
        <Typography className={classes.title} variant='body1'>
          <img
            src={taskBookIcon}
            alt='homework Icon'
            className={classes.homeworkIcon}
          />
          <span className={classes.titleName}>&nbsp;Homeworks</span>
          <AddCircleRoundedIcon
            color='primary'
            className={classes.addhomeworkIcon}
            onClick={handleCreateHomework}
          />
        </Typography>
      </div>
      <div className={classes.homeworks}>
        <Grid container>
          {!loading && !homework.length ? (
            <Grid item sm={12} className={classes.homeworkCardGrid}>
              <Card
                className={`${classes.homeworkCard}`}
                onClick={handleCreateHomework}>
                <CardContent className={classes.cardContentStyle}>
                  <Typography className={classes.cardTitle} variant='body1'>
                    Click here to create homework
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ) : (
            ''
          )}
          {loading ?  <div className={classes.loading}>
            <CircularProgress color="primary" size={30} />
          </div> : null}
          <div className={classes.homeworksView}>
          {homework.map((hw, index) => {
            if (index < 3) {
              return (
                <Grid
                  item
                  sm={4}
                  xs={12}
                  key={index}
                  className={classes.homeworkCardGrid}>
                  <Card
                    className={`${classes.homeworkCard} ${index}`}
                    style={{
                      backgroundColor: cardColors[index],
                      margin: cardMargins[index],
                    }}
                    onClick={(event) => {
                      history.push('/assignment');
                    }}>
                    <CardContent className={classes.cardContentStyle}>
                      <Typography className={classes.cardTitle} variant='body1'>
                        {hw.title ? hw.title : 'N/A'}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Typography variant='body2'>
                        {hw.submission_date
                          ? `Due: ${moment(hw.submission_date).format(
                              'DD/MM/YY hh:mm A'
                            )}`
                          : 'Due: N/A'}
                      </Typography>
                    </CardActions>
                  </Card>
                </Grid>
              );
            }
          })}
          </div>
        </Grid>
      </div>

      <br />
      <br />
      <br />
      <br />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    selectedRole: state.auth.selectedRole,
  };
};

export default connect(mapStateToProps)(Homework);

// import React, { useState, useEffect } from 'react';
// import { connect } from 'react-redux';
// import { makeStyles } from '@material-ui/styles';
// import {
//   Typography,
//   Box,
//   Grid,
//   CardContent,
//   CardActions,
// } from '@material-ui/core';
// import Card from '@material-ui/core/Card';

// import taskBookIcon from '../../../../assets/images/home/teacher/TaskBook.svg';
// import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
// import * as moment from 'moment';
// import { useHistory } from 'react-router-dom';
// import HomeSerivce from '../../HomeSerivce';
// import { closestIndexTo } from 'date-fns/fp';

// const useStyle = makeStyles((theme) => ({
//   homeworkDiv: {
//     height: '100%',
//     display: 'table',
//     width: '100%',
//   },
//   title: {
//     textTransform: 'uppercase',
//     fontWeight: 800,
//     letterSpacing: '1px',
//     color: `${theme.palette.common.bastille}`,
//   },
//   homeworkIcon: {
//     transform: 'translateY(5px)',
//   },
//   homeworkheader: {
//     width: '100%',
//     display: 'table-row',
//     height: '35px',
//   },
//   homeworks: {
//     width: '100%',
//     height: '100%',
//     display: 'table-row',
//     marginTop: '10px',
//   },
//   cardContentStyle: {
//     cursor: 'pointer',
//     padding: '8px',
//   },
//   cardContentStyle1: {
//     cursor: 'pointer',
//     padding: '5px',
//     textAlign:'center',
//     transform: 'translateY(30px)'
//   },
//   addhomeworkIcon: {
//     float: 'right',
//     cursor: 'pointer',
//     bottom: 0,
//   },
//   cardTitle: {
//     fontWeight: 600,
//   },
//   homeworkCard: {
//     borderRadius: '10px',
//     height: '100px',
//     overflow: 'none',
//     // width: '95%',
//     margin: 'auto',
//     boxShadow: 'none',
//     // overflow: 'none',
//     overflowY: 'auto',
//     '&::-webkit-scrollbar': {
//       width: '0',
//     },
//     backgroundColor: '#F7DDCC',
//     '& .0': {
//       color: 'red',

//       backgroundColor: '#F7DDCC',
//     },

//     [theme.breakpoints.down('sm')]: {
//       marginTop: '10px',
//     },
//   },
//   loading: {
//     textAlign: 'center',
//     justifyContent: 'center',
//     margin: 'auto',
//   },

//   1: {
//     color: 'red',
//     backgroundColor: '#F8E7C1 !important',
//   },
//   2: {
//     backgroundColor: '#D4DbD8',
//   },
//   CardContent: {
//     padding: '0 0 0 10px !important',
//     margin: '10px 0 0 0',
//     overflow: 'auto',
//     '&::-webkit-scrollbar': {
//       width: '0',
//     },
//     // '&::-webkit-scrollbar-track': {
//     //   '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.2)',
//     //   outline: 'none',
//     //   borderRadius: '5px',
//     // },
//     // '&::-webkit-scrollbar-thumb': {
//     //   backgroundColor: `${theme.palette.primary.main}`,
//     //   borderRadius: '5px',
//     // },
//   },
//   homeworkContentStyle: {
//     cursor: 'pointer',
//   },
// }));

// const Homework = (props) => {
//   const classes = useStyle();
//   const history = useHistory();
//   const [homework, setHomework] = useState([]);
//   const [hasMore, setHasMore] = useState(false);
//   const [latestHw, setLatestHw] = useState([]);
//   const [showNoContent, setShowNoContent] = useState(false);

//   const cardColors = ['#F7DDCC', '#F8E7C1', '#D4DbD8'];
//   const cardMargins = ['0 auto 0 0','0 auto','0 0 0 auto']

//   useEffect(() => {
//     let isHomeworkLoading = true;
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem('srmToken');
//         const response = await HomeSerivce.fetchTeacherHomework(
//           token,
//           props.selectedRole
//         );
//         if (response.status === 200) {
//           let homeworkSet = false;
//           if (response.data.data.data.length === 0) {
//             setShowNoContent(true);
//           }
//           if (isHomeworkLoading) {
//             setHomework(response.data.data.data);
//             homeworkSet = true;
//           }
//         }
//       } catch (e) {
//         console.log(e);
//       }
//     };
//     fetchData();
//     return () => {
//       isHomeworkLoading = false;
//     };
//   }, []);

//   const handleCreateHomework = async () => {
//     try {
//       const token = localStorage.getItem('srmToken');
//       const response = await HomeSerivce.createHomework(token);
//       history.push(`/create-homework/${response.data.homework_id}`);
//     } catch (e) {
//       console.log(e);
//     }
//   };
//   return (
//     <div className={classes.homeworkDiv}>
//       <div className={classes.homeworkheader}>
//         <Typography className={classes.title}>
//           <img
//             src={taskBookIcon}
//             alt='homework Icon'
//             className={classes.homeworkIcon}
//           />
//           <span className={classes.titleName}>&nbsp;Homeworks</span>
//           <AddCircleRoundedIcon
//             color='primary'
//             className={classes.addhomeworkIcon}
//             onClick={handleCreateHomework}
//           />
//         </Typography>
//       </div>
//       <div className={classes.homeworks}>
//         <Grid container>
//           {showNoContent ? (
//             <Grid item sm={12} className={classes.homeworkCardGrid}>
//               <Card
//                 className={`${classes.homeworkCard}`}
//                 onClick={handleCreateHomework}
//               >
//                 <CardContent className={classes.cardContentStyle1}>
//                   <Typography >
//                     Click here to create homework
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ) : (
//             ''
//           )}
//           {homework.map((hw, index) => {
//             if (index < 3) {
//               return (
//                 <Grid
//                   item
//                   sm={4}
//                   xs={12}
//                   key={index}
//                   className={classes.homeworkCardGrid}
//                 >
//                   <Card
//                     className={`${classes.homeworkCard} ${index}`}
//                     style={{ backgroundColor: cardColors[index], margin:cardMargins[index] }}
//                     onClick={(event) => {
//                       history.push('/assignment');
//                     }}
//                   >
//                     <CardContent className={classes.cardContentStyle}>
//                       <Typography className={classes.cardTitle}>
//                         {hw.title ? hw.title : 'N/A'}
//                       </Typography>
//                     </CardContent>
//                     <CardActions>
//                       <Typography>
//                         {hw.submission_date
//                           ? `Due: ${moment(hw.submission_date).format(
//                               'DD/MM/YY hh:mm A'
//                             )}`
//                           : 'Due: N/A'}
//                       </Typography>
//                     </CardActions>
//                   </Card>
//                 </Grid>
//               );
//             }
//           })}
//         </Grid>
//       </div>

//       <br />
//       <br />
//       <br />
//       <br />
//     </div>
//   );
// };
// const mapStateToProps = (state) => {
//   return {
//     token: state.auth.token,
//     selectedRole: state.auth.selectedRole,
//   };
// };

// export default connect(mapStateToProps)(Homework);

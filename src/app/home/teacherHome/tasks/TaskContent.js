import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Box, Grid, Card } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import InfiniteScroll from 'react-infinite-scroll-component';

import CircularProgress from '@material-ui/core/CircularProgress';
import RedFlagIcon from '../../../../assets/images/home/teacher/RedFlag.svg';
import YellowFlagIcon from '../../../../assets/images/home/teacher/YellowFlag.svg';
import GreenTickIcon from '../../../../assets/images/home/teacher/GreenTick.svg';

import TaskEditor from './TaskEditor';

import HomeSerivce from '../../HomeSerivce';

const useStyle = makeStyles((theme) => ({
  taskDiv: {
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
  taskIcon: {
    transform: 'translateY(5px)',
  },
  flag: {
    cursor: 'pointer',
    width: '14px',
  },
  taskheader: {
    width: '100%',
    display: 'table-row',
    height: '30px',
  },
  tasks: {
    width: '100%',
    height: '100%',
    display: 'table-row',
  },
  addTaskIcon: {
    float: 'right',
    cursor: 'pointer',
    bottom: 0,
  },
  taskCard: {
    borderRadius: '10px',
    height: '365px',
  },
  loading: {
    textAlign: 'center',
    justifyContent: 'center',
    margin: 'auto',
  },

  taskCard: {
    borderRadius: '10px',
    margin: '0 10px 0 10px',
    height: '365px',
    [theme.breakpoints.down('xs')]: {
      margin: '10px 0 0 0',
    },
  },
  clickCard: {
    cursor: 'pointer',
    padding: '0 !important',
    margin: 0,
    width: '100%',
    height: '100%',
  },
  clickHere: {
    width: '100%',
    transform: 'translateY(160px)',
    // padding: '50%, 0',
    textAlign: 'center',
  },
  clickContent: {
    // paddingTop: '35%',
  },
  cardTitle: {
    fontWeight: 500,
    fontSize: '20px',
    marginTop: '10px',
    textAlign: 'center',
  },
  CardContent: {
    borderTop: '1px solid rgba(0,0,0,0.2)',
    margin: '0 0 10px !important',
    paddingTop: 0,
    height: '280px',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '0.4em',
    },
    '&::-webkit-scrollbar-track': {
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.2)',
      outline: 'none',
      borderRadius: '5px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: `${theme.palette.primary.main}`,
      borderRadius: '5px',
    },
    '& .taskContentDiv': {
      marginTop: '10px',
    },
  },
  taskContentStyle: {
    display: 'flex',
  },
  taskContDiv: {
    marginLeft: '20px',
    cursor: 'pointer',
  },
}));

const TaskContent = (props) => {
  const classes = useStyle();
  const [hasMore, setHasMore] = useState(true);
  const [openEditor, setOpenEditor] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showNoContent, setShowNoContent] = useState(false);

  const styleContent = {
    done: ['line-through', '#C0C0C3'],
    pending: ['none', 'black'],
    'on-going': ['none', 'black'],
  };
  const fetchTask = async () => {
    const token = localStorage.getItem('srmToken');
    const response = await HomeSerivce.getTask(token);
    setTasks(response.data.data.data);
    let next_page_url = response.data.data.next_page_url;
    if (next_page_url === null) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  };

  async function updateFlag(idTask, contentTask, statusTask) {
    const token = localStorage.getItem('srmToken');
    // console.log('Update Flag: ', idTask, contentTask, statusTask);
    const response = await HomeSerivce.updateTask(token, idTask, {
      content: contentTask,
      status: statusTask,
    });
    fetchTask();
    closeEditor();
  }

  useEffect(() => {
    // console.log('Task Content');
    let isAnnouncementLoading = true;
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem('srmToken');
        const response = await HomeSerivce.getTask(token);
        if (isAnnouncementLoading) {
          if (response.data.data.data.length === 0) {
            setShowNoContent(true);
          }
          setTasks(response.data.data.data);
          let next_page_url = response.data.data.next_page_url;
          if (next_page_url === null) {
            setHasMore(false);
          } else {
            setHasMore(true);
          }
          setIsLoading(false);

          setNextUrl(response.data.data.next_page_url);
          // console.log(response.data.data.data);
        }
      } catch (error) {
        console.log('Error: ', error);
      }
    };
    fetchTask();
    return () => {
      isAnnouncementLoading = false;
    };
  }, []);

  const closeEditor = () => {
    setOpenEditor(false);
  };

  const fetchMoreTasks = () => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('srmToken');
      const response = await HomeSerivce.getMoreTask(token, nextUrl);
      let nextData = response.data.data.data;
      setTasks([...tasks, ...response.data.data.data]);
      setIsLoading(false);
      let next_page_url = response.data.data.next_page_url;
      if (next_page_url === null) {
        setHasMore(false);
      }
    };
    fetchTasks();
  };

  const handleChangeFlag = (event, statusTask, idTask, contentTask) => {
    if (statusTask === 'pending') {
      updateFlag(idTask, contentTask, 'on-going');
    }
    if (statusTask === 'on-going') {
      updateFlag(idTask, contentTask, 'done');
    }
    if (statusTask === 'done') {
      updateFlag(idTask, contentTask, 'pending');
    }
  };

  const setFlag = (status, id, content) => {
    if (status === 'pending') {
      return (
        <img
          src={RedFlagIcon}
          alt='Pending task'
          className={classes.flag}
          onClick={(event) => {
            handleChangeFlag(event, status, id, content);
          }}
        />
      );
    } else if (status === 'on-going') {
      return (
        <img
          src={YellowFlagIcon}
          alt='Pending task'
          className={classes.flag}
          onClick={(event) => {
            handleChangeFlag(event, status, id, content);
          }}
        />
      );
    } else {
      return (
        <img
          src={GreenTickIcon}
          alt='Pending task'
          className={classes.flag}
          onClick={(event) => {
            handleChangeFlag(event, status, id, content);
          }}
        />
      );
    }
  };

  return (
    <>
      {showNoContent ? (
        <Card className={classes.taskCard}>
          <CardContent
            className={classes.clickCard}
            onClick={(event) => {
              props.handleCreateNew();
            }}
          >
            <Box className={classes.clickHere}>
              <Typography
                color='primary'
                variant='h6'
                className={classes.clickContent}
              >
                Create your first task by clicking here
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ) : (
        <Grid container>
          <Grid item md={6}>
            <Card className={classes.taskCard}>
              <Typography className={classes.cardTitle}>
                Pending Tasks
              </Typography>
              <CardContent className={classes.CardContent} id='scrollable'>
                <InfiniteScroll
                  dataLength={tasks.length}
                  next={fetchMoreTasks}
                  hasMore={hasMore}
                  loader={
                    <>
                      <div className={classes.loading}>
                        <CircularProgress />
                      </div>
                      <br />
                    </>
                  }
                  scrollableTarget='scrollable'
                  scrollThreshold={0.5}
                >
                  {isLoading === false
                    ? tasks.map((task) => {
                        return (
                          <Box key={task.id} className='taskContentDiv'>
                            <Grid container>
                              <Grid
                                item
                                xs={12}
                                className={classes.taskContentStyle}
                              >
                                <div>
                                  <span>
                                    {setFlag(
                                      task.status,
                                      task.id,
                                      task.content
                                    )}
                                  </span>
                                </div>
                                <div className={classes.taskContDiv}>
                                  <Typography>
                                    <span
                                      className={classes.taskContent}
                                      onClick={(event) => {
                                        props.handleEditTask(
                                          task.id,
                                          task.content,
                                          task.status
                                        );
                                      }}
                                      style={{
                                        textDecoration:
                                          styleContent[task.status][0],
                                        textDecorationColor: '#C0C0C3',
                                        color: styleContent[task.status][1],
                                      }}
                                    >
                                      {task.content}
                                    </span>
                                  </Typography>
                                </div>

                                {tasks.length === 0 && hasMore === false ? (
                                  <Typography variant='h6'>
                                    No task available
                                  </Typography>
                                ) : (
                                  ''
                                )}
                              </Grid>
                            </Grid>
                          </Box>
                        );
                      })
                    : ''}
                </InfiniteScroll>

                <br />
                <br />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={6}>
            <Card className={classes.taskCard}>
              <Typography className={classes.cardTitle}>Done Tasks</Typography>
              <CardContent
                className={classes.CardContent}
                id='secondScrollable'
              >
                <InfiniteScroll
                  dataLength={tasks.length}
                  next={fetchMoreTasks}
                  hasMore={hasMore}
                  loader={
                    <>
                      <div className={classes.loading}>
                        <CircularProgress />
                      </div>
                      <br />
                    </>
                  }
                  scrollableTarget='secondScrollable'
                  scrollThreshold={0.5}
                >
                  {isLoading === false
                    ? tasks.map((task) => {
                        return (
                          <Box key={task.id} className='taskContentDiv'>
                            <Grid container>
                              <Grid
                                item
                                xs={12}
                                className={classes.taskContentStyle}
                              >
                                <div>
                                  <span>
                                    {setFlag(
                                      task.status,
                                      task.id,
                                      task.content
                                    )}
                                  </span>
                                </div>
                                <div className={classes.taskContDiv}>
                                  <Typography>
                                    <span
                                      className={classes.taskContent}
                                      onClick={(event) => {
                                        props.handleEditTask(
                                          task.id,
                                          task.content,
                                          task.status
                                        );
                                      }}
                                      style={{
                                        textDecoration:
                                          styleContent[task.status][0],
                                        textDecorationColor: '#C0C0C3',
                                        color: styleContent[task.status][1],
                                      }}
                                    >
                                      {task.content}
                                    </span>
                                  </Typography>
                                </div>

                                {tasks.length === 0 && hasMore === false ? (
                                  <Typography variant='h6'>
                                    No task available
                                  </Typography>
                                ) : (
                                  ''
                                )}
                              </Grid>
                            </Grid>
                          </Box>
                        );
                      })
                    : ''}
                </InfiniteScroll>

                <br />
                <br />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default TaskContent;

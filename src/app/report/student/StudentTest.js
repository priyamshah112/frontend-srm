
import React, { useState, useEffect, Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBackIos';
import ReportLogo from '../../../assets/images/report/ReportLogo.svg';
import medal from '../../../assets/images/Medal.png'
import ReportService from '../ReportService';
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import BackdropLoader from "../../common/ui/backdropLoader/BackdropLoader";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '2%',
        overflowY: 'auto',
        height: props => props.height
    },
    gridRoot: {
        marginTop: '40px'
    },
    gridItem: {
        padding: '0% 7%'
    },
    card: {
        border: '1px solid #7B72AF',
        borderRadius: '3px',
        display: 'flex',
        justifyItems: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        background: '#fff',
        padding: '8px',
        cursor: 'pointer'
    },
    badgeWrapper: {
        width: '100%',
        height: '100%',
        borderRadius: '3px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5px'
    },
    name: {
        flexBasis: '20%',
        textAlign: 'center'
    },
    flex1: {
        flexBasis: '75%',
        width: '100%',
        height: '100%',
    },
    flex2: {
        flexBasis: '25%',
        width: '100%',
        height: '100%',
    },
    navigationBack: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    headerIcon: {
        fill: '#1c1c1c',
        fontSize: '18px',
        cursor: 'pointer'
    },
    headerTitle: {
        textAlign: 'center'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        cursor: 'pointer'
    }
}));


const StudentTest = (props) => {
    const styleProps = {
        height: window.innerHeight - 70 + 'px'
    };

    const classes = useStyles(styleProps);
    const [testDate, setTestData] = useState([]);
    const [errMessage, setError] = useState('');
    const [isLoading, setLoading] = useState(true);

    // const { searchData, userInfo } = props;
  var role = String(JSON.parse(localStorage.getItem('srmSelectedRole')));
    var string1 = "parent";
    if (String(role)===String(string1)){    
        const srmChild_dict = JSON.parse(localStorage.getItem("srmChild_dict"));
        const srmSelected_Child = localStorage.getItem("srmSelected_Child");
        console.log(srmChild_dict[parseInt(srmSelected_Child)]);
        var searchData = srmChild_dict[parseInt(srmSelected_Child)].userDetails;
        var userInfo = srmChild_dict[parseInt(srmSelected_Child)].userDetails;
    }
    else{
    var {searchData, userInfo } = props;

    }



    const goToSearch = () => {
        props.home();
    }

    const onTest = (obj) => {
        if (obj) {
            props.getTest(obj)
        }
    }

    /* for admin | teacher*/
    useEffect(() => {
        if (searchData && searchData.user_classes) {
            let loading = true;
            const id = searchData.user_id;
            const { school_id, class_id } = searchData.user_classes;
            async function getStudentReportCard() {
                try {
                    const response = await ReportService.fetchStudentList(props.token, school_id, class_id, id);

                    if (response.status === 200) {
                        if (loading) {
                            setTestData(response.data.data.data || []);
                            setLoading(false);
                        }
                    }
                } catch (error) {
                    console.log(error);
                    setError('Error in student test');
                    setLoading(false);
                }
            }
            getStudentReportCard();
        }
    }, []);

    /* for student*/

    useEffect(() => {
        let loading = true;

        if (props.selectedRole === 'student') {
            async function getStudentReportCard() {
                try {
                    const response = await ReportService.fetchStudentTest(props.token);

                    if (response.status === 200) {
                        if (loading) {
                            setTestData(response.data.data.data || []);
                            setLoading(false);
                        }
                    }
                } catch (error) {
                    console.log(error);
                    setError('Error in student test');
                    setLoading(false);
                }
            }
            getStudentReportCard();
        }
        if (props.selectedRole === 'parent') {
            async function getStudentReportCard() {
                try {
                    const token_child = localStorage.getItem('srmSelected_Child_token');
                    // console.log("child token");
                    const response = await ReportService.fetchStudentTest(token_child);

                    if (response.status === 200) {
                        if (loading) {
                            setTestData(response.data.data.data || []);
                            // console.log(testDate);
                            setLoading(false);
                        }
                    }
                } catch (error) {
                    console.log(error);
                    setError('Error in student test');
                    setLoading(false);
                }
            }
            getStudentReportCard();
        }
    }, []);


    const renderSubheader = () => {
        return (
            <Fragment>
                {props.selectedRole !== 'student' || props.selectedRole !== 'parent'?
                    <div className={classes.navigationBack}>
                        {
                            props.selectedRole === 'parent' || props.selectedRole === 'student'  ?
                            (<div  className={classes.headerIcon}></div>)
                            :
                        (<ArrowBack className={classes.headerIcon} onClick={goToSearch} />)
                        }
                        <Typography>{searchData.firstname} {searchData.lastname}</Typography>
                        <div>&nbsp;</div>
                    </div> 
                    :
                    <div className={classes.headerTitle}>
                        {userInfo.firstname && <Typography>{userInfo.firstname} {userInfo.lastname}</Typography>}
                    </div>
                }
            </Fragment>
        )
    }

    const renderGrid = () => {
        return (
            <div className={classes.gridRoot} >
                <Grid container spacing={3}>
                    {testDate != null ?
                        testDate.map((obj, key) => {
                            return (
                                <Grid item xs={12} lg={4} sm={6} md={6} xl={3} key={key}>
                                    <Paper className={classes.paper} onClick={() => onTest(obj)} elevation={0}>
                                        <img src={medal} alt="medalavt" maxwidth='59px' maxheight="78px" />
                                        <Typography style={{ color: '#1C1C1E', font: 'normal normal medium 18px/25px Avenir', letterSpacing: "0px" }}> {obj.name}</Typography>
                                    </Paper>
                                </Grid>
                            )
                        }) : null}
                </Grid>
            </div>
        )
    }

    return (
        <div className={classes.container}>
            {renderSubheader()}
            {renderGrid()}
            <BackdropLoader open={isLoading} />
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        userInfo: state.auth.userInfo,
        selectedRole: state.auth.selectedRole
    };
};

export default connect(mapStateToProps)(StudentTest);


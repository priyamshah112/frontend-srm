
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBackIos';
import ReportLogo from '../../../assets/images/report/ReportLogo.svg';
import ReportService from '../ReportService';
import Grid from "@material-ui/core/Grid";

import BackdropLoader from "../../common/ui/backdropLoader/BackdropLoader";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '2%',
        height: '100%',
        overflowY: 'auto'
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
    }
}));


const StudentTest = (props) => {
    const classes = useStyles(props);
    const [testDate, setTestData] = useState([]);
    const [errMessage, setError] = useState('');

    const goToSearch = () => {
        props.home();
    }

    const onTest = (obj) => {
        if (obj) {
            props.getTest(obj)
        }
    }

    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        let loading = true;

        if (props.searchData && props.searchData.user_classes) {
            const { school_id, class_id, id } = props.searchData.user_classes;
            async function getStudentReportCard() {
                try {
                    const response = await ReportService.fetchStudentTest(props.token, school_id, class_id, id);

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
        } else {
            setLoading(false);
        }
        return () => {
            loading = false;
        };
    }, []);

    const renderSubheader = () => {
        return (
            <div className={classes.navigationBack}>
                <ArrowBack className={classes.headerIcon} onClick={goToSearch} />
                <Typography>{props.searchData.firstname} {props.searchData.lastname}</Typography>
                <span />
            </div>
        )
    }

    const renderGrid = () => {
        return (
            <div className={classes.gridRoot} >
                <Grid container>
                    {
                        testDate.map((obj, key) => {
                            return (
                                <Grid item xs={6} sm={3} key={key}>
                                    <div className={classes.gridItem}>
                                        <div className={classes.card} onClick={() => onTest(obj)} key={key}>
                                            <div className={classes.flex1}>
                                                <div className={classes.badgeWrapper}>
                                                    <img src={ReportLogo} alt='report logo' height={78} width={59} />
                                                </div>
                                            </div>
                                            <div className={classes.flex2}>
                                                <Typography className={classes.name}>
                                                    {obj.name}
                                                </Typography>
                                            </div>
                                        </div>
                                    </div>
                                </Grid>
                            )
                        })
                    }
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
        userInfo: state.auth.userInfo
    };
};

export default connect(mapStateToProps)(StudentTest);


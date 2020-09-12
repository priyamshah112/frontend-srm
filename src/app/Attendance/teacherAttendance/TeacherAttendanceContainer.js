import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormHelperText from '@material-ui/core/FormHelperText';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import VerticalAlignBottomIcon from '@material-ui/icons/VerticalAlignBottom';
import VerticalAlignTopIcon from '@material-ui/icons/VerticalAlignTop';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import './Attendance.css';

const useStyles = makeStyles((theme) => ({
    container: {
        width: '100%',
        backgroundColor: theme.palette.mainBackground,
        height: '100%',
        marign: '0',
        padding: '0',
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flexGrow: '1',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '0',
        padding: '0 20px 20px 20px',
    },
    topButton: {
        float: 'right',
        padding: '0px 20px 0px 0px', 
    },
    panel: {
        flexGrow: '1',
        overflow: 'auto',
        minHeight: '100%',
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },
    marginTop: {
        marginTop: '20px',
    },
    topPanelRow: {
        marginTop: '20px',
    },
    middlePanelRow: {
        marginTop: '20px',
        backgroundColor: '#e6e6e6',
        borderRadius: '10px',
        display: 'block'
    },
    panelCol: {
        width: '100%',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    menuButton: {
        margin: '5px',
    },
    table: {
        minWidth: 700,
      },
    tableHeader: {
        display: 'flex',
        textAlign: 'center',
        margin: '0px',
        padding: '10px 20px',
        fontSize: '20px',
        backgroundColor: 'lightgrey',
        height: '20px',
        font: 'normal normal medium 16px/21px Avenir',
        letterSpacing: '-0.26px',
        color: '#000000',
        opacity: '1',
    },
    tableHeadermid: {
        width: '100%',
    },
    tableHeaderBtn: {
        cursor: 'pointer',
    },
    tableTitle: {
        backgroundColor: 'white !important',
        color: 'var(--unnamed-color-1c1c1e)',
        textAlign: 'center',
        font: 'normal normal normal 14px/21px Avenir',
        letterSpacing: '-0.22px',
        color: '#1C1C1E !important',
        opacity: '1',
    },
    tableNameColumn: {
        textAlign: 'center',
        font: 'normal normal normal 12px/16px Avenir',
        letterSpacing: '0px',
        color: '#808082',
        opacity: '1'
    },
    tableNoColumn: {
        textAlign: 'center',
        font: 'normal normal normal 12px/16px Avenir',
        letterSpacing: '0px',
        color: '#808082',
        opacity: '1'
    },
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    },
    body: {
    fontSize: 14,
    },
}))(TableCell);
    
const StyledTableRow = withStyles((theme) => ({
    root: {
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    },
}))(TableRow);
    
function createData(no, name, mon, tue, wed, thu, fri, sat, sun) {
    return {no, name, mon, tue, wed, thu, fri, sat, sun };
}

const TeacherAttendanceContainer = (props) => {
    
    const [state, setState] = React.useState({
        classNum: '',
        name: 'hai',
        study: '',
        studyName: 'Social studies',

    });

    const classes = useStyles();
    const selectedRole = props.selectedRole;
    const handleClassChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };
    const handleStudyChange = (event) => {
        console.log(event.target);
        const studyName = event.target.name;
        setState({
          ...state,
          [studyName]: event.target.value,
        });
    };

    const handleClick = () => {
        console.log("click");
    }

    // 1=present, 0=absent, 2=holiday, 3=empty
    const rows = [
        createData('01', 'Samarth Atmakur', 1, 0, 2, 3, 1, 3, 3),
        createData('02', 'Jishnu Karunakar', 1, 0, 2, 3, 1, 3, 3),
        createData('03', 'Prathyusha Atmakur', 1, 0, 2, 3, 1, 3, 3),
        createData('04', 'Leena Mahadevan', 1, 0, 2, 3, 1, 3, 3),
        createData('05', 'Manohar Ramarao', 1, 0, 2, 3, 1, 3, 3),
        createData('06', 'Vishwananath G', 1, 0, 2, 3, 1, 3, 3),
        createData('07', 'Samarth Atmakur', 1, 0, 2, 3, 1, 3, 3),
        createData('08', 'Jishnu Karunakar', 1, 0, 2, 3, 1, 3, 3),
        createData('09', 'Prathyusha Atmakur', 1, 0, 2, 3, 1, 3, 3),
        createData('10', 'Leena Mahadevan', 1, 0, 2, 3, 1, 3, 3),
        createData('11', 'Manohar Ramarao', 1, 0, 2, 3, 1, 3, 3),
        createData('12', 'Vishwananath G', 1, 0, 2, 3, 1, 3, 3),
        createData('13', 'Samarth Atmakur', 1, 0, 2, 3, 1, 3, 3),
        createData('14', 'Jishnu Karunakar', 1, 0, 2, 3, 1, 3, 3),
        createData('15', 'Prathyusha Atmakur', 1, 0, 2, 3, 3, 3, 3),
        createData('16', 'Leena Mahadevan', 1, 0, 2, 3, 1, 3, 3),
        createData('17', 'Manohar Ramarao', 1, 0, 2, 3, 1, 3, 3),
        createData('18', 'Vishwananath G', 1, 0, 2, 3, 1, 3, 3),
        createData('19', 'Samarth Atmakur', 1, 0, 2, 3, 1, 3, 3),
    ];

    return (
        <div className={classes.container}>
            <Grid container className={classes.content}>
                <Grid item sm={12} className={classes.panel}>
                    <Grid container className={classes.topPanelRow}>
                        <Grid
                            item
                            xs={12}
                            className={classes.panelCol}
                        >
                            {/* for class select */}
                            <FormControl className={classes.formControl}>
                                <NativeSelect
                                    value={state.classNum}
                                    onChange={handleClassChange}
                                    name="classNum"
                                    className={classes.selectEmpty}
                                    inputProps={{ 'aria-label': 'classNum' }}
                                >
                                    <option value="">None</option>
                                    <option value={10}>Class 01</option>
                                    <option value={20}>Class 02</option>
                                    <option value={30}>Class 03</option>
                                    <option value={40}>Class 04</option>
                                    <option value={50}>Class 05</option>
                                    <option value={60}>Class 06</option>
                                    <option value={70}>Class 07</option>
                                    <option value={80}>Class 08</option>
                                </NativeSelect>
                                <FormHelperText>Please select your class</FormHelperText>
                            </FormControl>

                            {/* for select social studies */}
                            <FormControl className={classes.formControl}>
                                <NativeSelect
                                    value={state.study}
                                    onChange={handleStudyChange}
                                    name="study"
                                    className={classes.selectEmpty}
                                    inputProps={{ 'aria-label': 'study' }}
                                >
                                    <option value="">None</option>
                                    <option value={10}>Html</option>
                                    <option value={20}>PHP</option>
                                    <option value={30}>Javascript</option>
                                    <option value={40}>React.js</option>
                                    <option value={50}>Node.js</option>
                                    <option value={60}>CSS</option>
                                </NativeSelect>
                                <FormHelperText>Please select your study field</FormHelperText>
                            </FormControl>
                        
                        
                            <div className={classes.topButton}>
                                <IconButton
                                    color='inherit'
                                    aria-label='open drawer'
                                    edge='start'
                                    onClick={handleClick}
                                    className={classes.menuButton}
                                >
                                    <VerticalAlignTopIcon style={{ color: '#ababaf' }}/>
                                </IconButton>
                                <IconButton
                                    color='inherit'
                                    aria-label='open drawer'
                                    edge='start'
                                    onClick={handleClick}
                                    className={classes.menuButton}
                                >
                                    <VerticalAlignBottomIcon style={{ color: '#ababaf' }}/>
                                </IconButton>
                            </div>
                        </Grid>
                    </Grid>

                    <TableContainer component={Paper}>
                        <div className={classes.tableHeader}>
                            <Typography className={classes.tableHeaderBtn}>Preview</Typography>
                            <Typography className={classes.tableHeadermid}>Weekly</Typography>
                            <Typography className={classes.tableHeaderBtn}>Next</Typography>
                        </div>
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow className="tableRowHeader">
                                    <StyledTableCell className={classes.tableTitle}>Roll No</StyledTableCell>
                                    <StyledTableCell className={classes.tableTitle} align="center">Name</StyledTableCell>
                                    <StyledTableCell className={classes.tableTitle} align="center"><p>01</p><span>(M)</span></StyledTableCell>
                                    <StyledTableCell className={classes.tableTitle} align="center"><p>02</p><span>(T)</span></StyledTableCell>
                                    <StyledTableCell className={classes.tableTitle} align="center"><p>03</p><span>(W)</span></StyledTableCell>
                                    <StyledTableCell className={classes.tableTitle} align="center"><p>04</p><span>(T)</span></StyledTableCell>
                                    <StyledTableCell className={classes.tableTitle} align="center"><p>05</p><span>(F)</span></StyledTableCell>
                                    <StyledTableCell className={classes.tableTitle} style={{color: '#d1d1d6'}} align="center"><p>06</p><span>(S)</span></StyledTableCell>
                                    <StyledTableCell className={classes.tableTitle} style={{color: '#d1d1d6'}} align="center"><p>07</p><span>(S)</span></StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, rowIndex) => (
                                    <StyledTableRow key={rowIndex} className="statusTable">
                                        <StyledTableCell className={classes.tableNoColumn}>{row.no}</StyledTableCell>
                                        <StyledTableCell component="th" scope="row" className={classes.tableNameColumn}>
                                            {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="center"><FiberManualRecordIcon className={row.mon == 0 ? 'absentStatus' : row.mon == 1 ? 'presentStatus' : row.mon == 2 ? 'holidayStatus' : 'emptyStatus'}/></StyledTableCell>
                                        <StyledTableCell align="center"><FiberManualRecordIcon className={row.tue == 0 ? 'absentStatus' : row.tue == 1 ? 'presentStatus' : row.tue == 2 ? 'holidayStatus' : 'emptyStatus'}/></StyledTableCell>
                                        <StyledTableCell align="center"><FiberManualRecordIcon className={row.wed == 0 ? 'absentStatus' : row.wed == 1 ? 'presentStatus' : row.wed == 2 ? 'holidayStatus' : 'emptyStatus'}/></StyledTableCell>
                                        <StyledTableCell align="center"><FiberManualRecordIcon className={row.thu == 0 ? 'absentStatus' : row.thu == 1 ? 'presentStatus' : row.thu == 2 ? 'holidayStatus' : 'emptyStatus'}/></StyledTableCell>
                                        <StyledTableCell align="center"><FiberManualRecordIcon className={row.fri == 0 ? 'absentStatus' : row.fri == 1 ? 'presentStatus' : row.fri == 2 ? 'holidayStatus' : 'emptyStatus'}/></StyledTableCell>
                                        <StyledTableCell align="center"><FiberManualRecordIcon className={row.sat == 0 ? 'absentStatus' : row.sat == 1 ? 'presentStatus' : row.sat == 2 ? 'holidayStatus' : 'emptyStatus'}/></StyledTableCell>
                                        <StyledTableCell align="center"><FiberManualRecordIcon className={row.sun == 0 ? 'absentStatus' : row.sun == 1 ? 'presentStatus' : row.sun == 2 ? 'holidayStatus' : 'emptyStatus'}/></StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <div className="tableBottom">
                            <div className="stateRow"><FiberManualRecordIcon className="presentStatus"/><p className="rollStatus">Present</p></div>
                            <div className="stateRow"><FiberManualRecordIcon className="absentStatus"/><p className="rollStatus">Absent</p></div>
                            <div className="stateRow"><FiberManualRecordIcon className="holidayStatus"/><p className="rollStatus">Holiday</p></div>
                            
                        </div>
                    </TableContainer>
                </Grid>
            </Grid>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
      selectedRole: state.auth.selectedRole,
    };
  };

export default connect(mapStateToProps)(TeacherAttendanceContainer);

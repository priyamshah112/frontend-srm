import React from 'react'
import { connect } from 'react-redux'
import { Typography, makeStyles } from '@material-ui/core'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme) => ({
  hr: {
    color: '#1C1C1E',
  },
  recieptContainer: {
    padding: '20px',
  },
  header: {
    textAlign: 'center',
  },
  tableContainer: {
    '& .MuiPaper-elevation1': {
      boxShadow: 'none',
    },
    '& .MuiPaper-root': {
      backgroundColor: 'transparent',
    },
    '& .MuiPaper-rounded': {
      borderRadius: 0,
    },
  },
  table: {
    '& .MuiTableCell-root': {
      textAlign: 'center',
      border: '1px solid #1C1C1E',
    },
    '& .MuiTableCell-alignRight': {
      textAlign: 'center',
    },
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  rowDiv: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  text: {
    width: '75%',
    marginBottom: '10px',
  },
  font: {
    fontFamily: 'Avenir Book',
    fontSize: 14,
    color: '#1C1C1E',
  },
  headText: {
    fontFamily: 'Avenir Medium',
    fontSize: 14,
    color: '#1C1C1E',
  },
  reciept: {
    fontFamily: 'Avenir Heavy',
    fontSize: 14,
    color: '#1C1C1E',
  },
  tableHeadText: {},
}))

const Reciept = (props) => {
  const classes = useStyles()
  const receipt = props.receipt || {}
  console.log('payment', receipt)
  const invoices = receipt.invoices || []
  const user_class = receipt.user_class || {}
  const school_data = user_class.school_data || {}
  const user = receipt.user||{}

  let totalAmount = 0

  invoices.map((item) => {
    if (item.amount_paid) {
      totalAmount = totalAmount + item.amount_paid / 100
    }
  })

  return (
    <div className={classes.recieptContainer}>
      <div className={classes.header}>
        <Typography className={classes.reciept}>Reciept</Typography>
        <br />
        <Typography className={classes.headText}>
          {school_data.name}
        </Typography>{' '}
        <br />
        <Typography className={classes.font}></Typography>
      </div>
      <br />
      <Typography className={classes.headText}>
        Reciept No. {receipt.id}
      </Typography>
      <hr className={classes.hr} />
      <br />
      <div className={classes.rowDiv}>
        <Typography className={classes.headText}>Student Name</Typography>
        <div className={`${classes.text} ${classes.font}`}>
          {user.fullName}
          <hr className={classes.hr} />
        </div>
      </div>
      <div className={classes.rowDiv}>
        <Typography className={classes.headText}>Parent Name</Typography>
        <div className={`${classes.text} ${classes.font}`}>
          {receipt.assign_to?receipt.assign_to[0].parents_data.fullName:""}
          <hr className={classes.hr} />
        </div>
      </div>
      <div className={classes.rowDiv}>
        <Typography className={classes.headText}>Class</Typography>
        <div className={`${classes.text} ${classes.font}`}>
          {user_class.className}
          <hr className={classes.hr} />
        </div>
      </div>
      <div className={classes.rowDiv}>
        <Typography className={classes.headText}>Date OF Payment</Typography>
        <div className={`${classes.text} ${classes.font}`}>
          {receipt.paid_date}
          <hr className={classes.hr} />
        </div>
      </div>
      <div className={classes.tableContainer}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.headText}>Sr. No.</TableCell>
                <TableCell className={classes.headText}>Particular</TableCell>
                <TableCell className={classes.headText}>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.map((item, index) => (
                <TableRow key={index}>
                  <TableCell
                    className={classes.font}
                    component="th"
                    scope="row"
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell className={classes.font}>
                    {receipt.payment_title}
                  </TableCell>
                  <TableCell className={classes.font}>
                    {item.amount_paid ? item.amount_paid / 100 : 0}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell component="th" scope="row"></TableCell>
                <TableCell className={classes.headText}>Total</TableCell>
                <TableCell className={classes.font}>{totalAmount}/-</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <br />
      <Typography className={classes.headText}>
        Paid By: {receipt.mode}
      </Typography>
      <br />
      <Typography className={classes.headText}>
        Remarks if any: {receipt.remarks}
      </Typography>
      <br />
      <br />
      <div className={classes.footer}>
        <Typography className={classes.headText}>
          Signature of Teacher
        </Typography>
        <Typography className={classes.headText}>
          Signature of Principal
        </Typography>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    selectedRole: state.auth.selectedRole,
    token: state.auth.token,
  }
}

export default connect(mapStateToProps)(Reciept)

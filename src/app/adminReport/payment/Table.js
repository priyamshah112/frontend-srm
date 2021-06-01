import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { Typography } from '@material-ui/core'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#7B72AF',
    color: theme.palette.common.white,
    textAlign: 'center',
  },
  body: {
    fontSize: 14,
    textAlign: 'center',
  },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#FFFFFF',
    },
    '&:nth-of-type(even)': {
      backgroundColor: '#FFFFFF',
    },
  },
}))(TableRow)

const useStyles = makeStyles({
  table: {
    border: '1px solid #707070',
  },
  border: {
    borderLeft: '1px solid #FFFFFF',
    borderRight: '1px solid #FFFFFF',
  },
  columnBorder: {
    borderLeft: '1px solid #707070',
    borderRight: '1px solid #707070',
  },
  message: {
    fontFamily: 'Avenir Book',
    fontSize: 14,
  },
})

export default function PaymentTable(props) {
  const classes = useStyles()
  const rows = props.report || []

  return (
    <TableContainer className={classes.table} component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Date</StyledTableCell>
            <StyledTableCell align="center" className={classes.border}>
              Student Name
            </StyledTableCell>
            <StyledTableCell align="center">Parent Name</StyledTableCell>
            <StyledTableCell className={classes.border}>Class</StyledTableCell>
            <StyledTableCell align="center" className={classes.border}>
              Payment
            </StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length ? (
            rows.map((row, index) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  style={{
                    padding:
                      rows.length === index + 1
                        ? '16px 5px 16px 5px'
                        : '16px 5px 0 5px',
                  }}
                >
                  {row.date}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  className={classes.columnBorder}
                  style={{
                    padding:
                      rows.length === index + 1
                        ? '16px 5px 16px 5px'
                        : '16px 5px 0 5px',
                  }}
                >
                  {row.student_name}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  style={{
                    padding:
                      rows.length === index + 1
                        ? '16px 5px 16px 5px'
                        : '16px 5px 0 5px',
                  }}
                >
                  {row.parent_name}
                </StyledTableCell>
                <StyledTableCell
                  component="th"
                  scope="row"
                  className={classes.columnBorder}
                  style={{
                    padding:
                      rows.length === index + 1
                        ? '16px 5px 16px 5px'
                        : '16px 5px 0 5px',
                  }}
                >
                  {row.student_class}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  className={classes.columnBorder}
                  style={{
                    padding:
                      rows.length === index + 1
                        ? '16px 5px 16px 5px'
                        : '16px 5px 0 5px',
                  }}
                >
                  ₹ {row.payment / 100}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  style={{
                    padding:
                      rows.length === index + 1
                        ? '16px 5px 16px 5px'
                        : '16px 5px 0 5px',
                  }}
                >
                  {row.status}
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : !props.loading ? (
            <StyledTableCell
              component="th"
              scope="row"
              colSpan={6}
              style={{
                padding: '16px 5px 16px 5px',
              }}
            >
              <Typography className={classes.message}>
                No report available yet!
              </Typography>
            </StyledTableCell>
          ) : (
            ''
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

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

export default function NewsTable(props) {
  const classes = useStyles()
  const rows = props.report || []

  return (
    <TableContainer className={classes.table} component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Sr No.</StyledTableCell>
            <StyledTableCell align="center" className={classes.border}>
              Date
            </StyledTableCell>
            <StyledTableCell align="center">News ID</StyledTableCell>
            <StyledTableCell className={classes.border}>
              Published By
            </StyledTableCell>
            <StyledTableCell align="center" className={classes.border}>
              Published To
            </StyledTableCell>
            <StyledTableCell align="center">News Title</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length ? (
            rows.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell
                  component="th"
                  scope="row"
                  style={{
                    padding:
                      rows.length === index + 1
                        ? '16px 7px 16px'
                        : '16px 7px 0',
                  }}
                >
                  {row.sr_no}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  className={classes.columnBorder}
                  style={{
                    padding:
                      rows.length === index + 1
                        ? '16px 7px 16px'
                        : '16px 7px 0',
                  }}
                >
                  {row.date}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  style={{
                    padding:
                      rows.length === index + 1
                        ? '16px 7px 16px'
                        : '16px 7px 0',
                  }}
                >
                  {row.news_id}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  className={classes.columnBorder}
                  style={{
                    padding:
                      rows.length === index + 1
                        ? '16px 7px 16px'
                        : '16px 7px 0',
                  }}
                >
                  {row.published_by}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  className={classes.columnBorder}
                  style={{
                    padding:
                      rows.length === index + 1
                        ? '16px 7px 16px'
                        : '16px 7px 0',
                  }}
                >
                  {row.published_to}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  style={{
                    padding:
                      rows.length === index + 1
                        ? '16px 7px 16px'
                        : '16px 7px 0',
                  }}
                >
                  {row.news_title}
                </StyledTableCell>
              </StyledTableRow>
            ))
          ) : !props.loading ? (
            <StyledTableCell
              component="th"
              scope="row"
              colSpan={6}
              style={{
                padding: '16px 7px 16px',
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

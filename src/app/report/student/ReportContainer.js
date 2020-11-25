import React from 'react'
import { withRouter } from 'react-router'

function ReportContainer(props) {
	const naviagateReportCard = () => {
		props.history.push('/report-card')
	}
	return <div>{naviagateReportCard()}</div>
}

export default withRouter(ReportContainer)

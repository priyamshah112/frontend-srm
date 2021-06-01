import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import { Typography } from '@material-ui/core'
import HomeworkService from '../HomeworkService'
import HomeworkCard from '../components/HomeworkCard'
import { Container, Header,AddHeader, InfiniteRoll } from '../../common'

const useStyles = makeStyles((theme) => ({
	datePicker: {
		width: '25%',
		paddingRight: '10px',
	},
	style: {
		fontSize: '1rem',
		fontFamily: 'Avenir Medium',
		fontWeight: '400',
		color: '#1C1C1E',
		textAlign: 'center',
	},
}))

const HomeworkSection = (props) => {
	const classes = useStyles()
	const history = useHistory()
	const [hasMore, setHasMore] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)
	const [noHomeworkMsg, setNoHomeworkMsg] = useState(false)
	const [homeworks, setHomeworks] = useState([])
	const selectedRole = JSON.parse(localStorage.getItem('srmSelectedRole'))

	useEffect(() => {
		let isHomeworkLoading = true
		const fetchData = async () => {
			try {
				const token = localStorage.getItem('srmToken')
				const selectedRole = props.selectedRole
				const response = await HomeworkService.fetchHomework(
					{ 
						current_role: selectedRole, 
						page: currentPage, 
						created_by: selectedRole === 'teacher' || selectedRole === 'admin' ? true : false,
					},
					token
				)
				if (response.status === 200) {
					if (
						response.data.data.current_page === response.data.data.last_page
					) {
						if (isHomeworkLoading) {
							setHomeworks([...homeworks, ...response.data.data.data])
							if (response.data.data.data.length === 0) {
								setNoHomeworkMsg(true)
							}
							setHasMore(false)
						}
					} else {
						if (isHomeworkLoading) {
							setHomeworks([...homeworks, ...response.data.data.data])
							setCurrentPage(currentPage + 1)
						}
					}
				}
			} catch (e) {
				console.log(e)
			}
		}
		fetchData()

		return () => {
			isHomeworkLoading = false
		}
	}, [])

	const fetchHomeworkOnScroll = async () => {
		try {
			const token = localStorage.getItem('srmToken')
			const selectedRole = props.selectedRole
			const response = await HomeworkService.fetchHomework(
				{ 
					current_role: selectedRole, 
					page: currentPage, 
					created_by: selectedRole === 'teacher' || selectedRole === 'admin'  ? true : false,
				},
				token
			)
			if (response.status === 200) {
				if (response.data.data.current_page !== response.data.data.last_page) {
					setHomeworks([...homeworks, ...response.data.data.data])
					setCurrentPage(currentPage + 1)
				} else {
					setHomeworks([...homeworks, ...response.data.data.data])
					setHasMore(false)
				}
			}
		} catch (error) {
			console.log(error)
		}
	}

	const handleCreateHomework = async () => {
		try {
			const token = localStorage.getItem('srmToken')
			const response = await HomeworkService.createHomework(token)
			console.log('response :>> ', response);
			history.push(`/create-homework/${response.data.data}`)
		} catch (e) {
			console.log(e)
		}
	}

	let content = homeworks.map((homework, index) => {
		return (
			<HomeworkCard
				key={homework.id}
				homework={homework}
			/>
		)
	})

	return (
		<Container>
            <Header>Assignment</Header>
			<AddHeader add={handleCreateHomework}/>
				<InfiniteRoll data={homeworks} onScroll={fetchHomeworkOnScroll} hasMore={hasMore}>
					{content}
				</InfiniteRoll>
				{noHomeworkMsg ? (
					<Typography variant='body1' color='primary' className={classes.style}>
						Click on new button to create homework
					</Typography>
				) : (
					''
				)}
		</Container>
	)
}

const mapStateToProps = (state) => {
	return {
		selectedRole: state.auth.selectedRole,
	}
}

export default connect(mapStateToProps)(HomeworkSection)

import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import { Typography } from '@material-ui/core'
import HomeworkService from '../HomeworkService'
import HomeworkCard from './HomeworkCard'
import { Container, EmptyData, Header, InfiniteRoll } from '../../common'

const useStyles = makeStyles((theme) => ({
	datePicker: {
		width: '25%',
		paddingRight: '10px',
	},
	style: {
		fonTize: '1rem',
		fontFamily: 'Avenir Medium',
		fontWeight: '400',
		color: '#1C1C1E',
		textAlign: 'center',
	},
}))

const HomeworkSection = () => {
	const classes = useStyles()
	const history = useHistory()
	const [hasMore, setHasMore] = useState(true)
	const [currentPage, setCurrentPage] = useState(1)
	const [noHomeworkMsg, setNoHomeworkMsg] = useState(false)
	const [homeworks, setHomeworks] = useState([])
	const selectedRole = JSON.parse(localStorage.getItem('srmSelectedRole'))
	let token = localStorage.getItem('srmToken')
	if(selectedRole === 'parent'){
		token = localStorage.getItem('srmSelected_Child_token')
	}

	useEffect(() => {
		let isHomeworkLoading = true
		const fetchData = async () => {
			try {
				const response = await HomeworkService.fetchHomework(
					{ 
						current_role:selectedRole, 
						page:currentPage
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
			const response = await HomeworkService.fetchHomework(
				{ 
					current_role: selectedRole, 
					page: currentPage
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
				<InfiniteRoll data={homeworks} onScroll={fetchHomeworkOnScroll} hasMore={hasMore}>
					{content}
				</InfiniteRoll>
				{noHomeworkMsg ? (
					<EmptyData>No homework available</EmptyData>
				) : (
					''
				)}
		</Container>
	)
}


export default HomeworkSection

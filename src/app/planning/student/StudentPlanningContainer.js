import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { connect } from 'react-redux'
import PlanningService from '../PlanningService'
import {Container,Typography,RadioGroup,FormControlLabel ,Radio, FormControl} from '@material-ui/core'
import BackIcon from '../../../assets/images/Back.svg'
import { useHistory } from 'react-router-dom'
import { CircularProgress } from '@material-ui/core'
import Dropdown from '../dropdown'
import SubjectPlanning from './subjectPlanning'

const useStyles = makeStyles((theme) => ({
	container: {
		width: '100%',
		backgroundColor: theme.palette.mainBackground,
		height: '100%',
		marign: '0',
		overflowY: 'auto',
		padding: '24px 0px',
		paddingBottom: '50px',
	},
	subjectTitle: {
		marginBottom: '20px',
	},
	loading: {
		width: '100%',
		textAlign: 'center',
		paddingTop: '8px',
		fontSize: '20px',
	},
	background: {
		background: '#fff',
		borderRadius: '5px',
	},
	select: {
		width: '50%',
	},
	header: {
		display: 'inline block',
	},
	backImg: {
		float: 'left',
		transform: 'translate(0px, 4px)',
		cursor: 'pointer',
	},
	header_title:{
		fonTize: '1rem',
		fontFamily: 'Avenir Medium',
		fontWeight: '400',
		color: '#1C1C1E',
		textAlign: 'center',

	},
	addNew: {
		color: theme.palette.common.deluge,
		float: 'right',
		cursor: 'pointer',
		'& .new': {
			float: 'right',
			fontSize: '14px',
			padding: '0px 5px',
			fontWeight: 500,
		},
		'& img': {
			height: '20px',
			cursor: 'pointer',
		},
	},
	radioContainer:{
		'width': '50%',
		'& label':{
			marginLeft: '0px',
		},
		'& .MuiSvgIcon-root':{
			'fontSize':'1.3rem',
		},
		'& span':{
			'fontSize': '0.8rem',
		}

	},
	radio: {
		'padding': '0px',
		'margin': '10px 10px 10px 0px',
		'&:hover': {
		  backgroundColor: 'transparent',
		},
		'& span': {
			color:'#7b72af'
		},
	  },
	  option:{
		  'display':'flex',
		  'width': '99%',
		  'paddingTop': '20px',
		  'marginBottom': '20px',
		  'overflowX': 'hidden',
	  },
	  menu:{	  
		  'width':'50%'
	  }
}))

const StudentPlanning = (props) => {
	const history = useHistory()
	const classes = useStyles()	
	const [mounted,setMounted] = useState(false)
	const [isLoading, setLoading] = useState(true)
	const [classID, setClassID] = useState('')
	const [className, setClassName] = useState('Class')
	const [get_by,setGet_by]= useState('subject')
	const [menuList,setMenuList]= useState([])
	const [menuLoading,setMenuLoading]= useState(false)
	const [menuSelected,setMenuSelected]= useState('All')
	const [planningDetails, setPlanningDetails] = useState(null);
	let token = localStorage.getItem('srmToken');
	if (props.selectedRole === 'parent') {
		token = localStorage.getItem('srmSelected_Child_token')
	}
	const fetchClassPlanning = async (id) => {
		setLoading(true)
		setPlanningDetails(null)
		try {
			const response = await PlanningService.getPlanning(token,id,get_by)
			if (response.status === 200) {
				// console.log("PlanningDtl",response.data.data.planning)	
				setPlanningDetails(response.data.data.planning)	
			}			
		} catch (e) {
			console.log(e)
		}
		setLoading(false)
	}
	const handleBack = (event) => {
		history.push('/planning')
	}
	const fetchMenuSelected = async(id) =>{
		try {
			const response = await PlanningService.get_by(token,id,'subject')
			if (response.status === 200) {
				let data = response.data.data
				setMenuList(data)
				setMenuSelected('All')
			}
			setLoading(false)
			
		} catch (e) {
			console.log(e)
		}
	}
	const handleOptionChange = async (event)=>{
		let get_by = event.target.value
		setGet_by(get_by)
		setMenuLoading(true);
		try {
			const response = await PlanningService.get_by(token,classID,get_by)
			if (response.status === 200) {
				let data = response.data.data
				setMenuList(data)
				setMenuSelected('All')
			}

				setLoading(false)
				// setPlanningDetails([...tempPlanningDetails])
			
		} catch (e) {
			console.log(e)
		}
		setMenuLoading(false);

	}
	const handleMenuSelected = async(value)=>{
		setMenuSelected(value)
		setPlanningDetails(null)
		setLoading(true)
		if(value === 'All'){
			try {
				const response = await PlanningService.getPlanning(token,classID,get_by)
				if (response.status === 200) {
					console.log(response)
					setPlanningDetails(response.data.data.planning)	
				}			
			} catch (e) {
				console.log(e)
			}
		}
		else{
			try {
				const response = await PlanningService.get_by_search(token,value,classID,get_by)
				if (response.status === 200) {
					console.log(response)
					setPlanningDetails(response.data.data.planning)	
				}			
			} catch (e) {
				console.log(e)
			}
		}
		setLoading(false)
	}

	const fetchClasses = async () => {
		try{
			const response = await PlanningService.fetchClasses(token)
			if (response.status === 200) {
				if (response.data.status == 'success') {
					let data = response.data.data[0]
					setClassID(data.id) 
					setClassName(data.class_name) 
					fetchMenuSelected(data.id)
				}
			}
						
		} catch (e) {
			console.log(e)
		}
	}
	
	useEffect(() => {
		if(classID !== null && classID !== '' && classID !== undefined){
			fetchClassPlanning(classID)
		}
		if(!mounted){			
			if (classID === '' || classID === null) {
				fetchClasses()
			}
			setMounted(true)
		}
	}, [classID,get_by])

	const StyledRadio = (props) =>{

		return (
			<Radio
			className={classes.radio}
			{...props}
			/>
		);
	}

	const table =
		isLoading == false && planningDetails !== null
			? Object.entries(planningDetails).map(function ([key,value], index) {
					return (
						<div key={`${classID}${index}`}>
							<div className={classes.background}>
								<SubjectPlanning
									class_id={classID}
									key={`${classID}${index}`}
									planningDetails={value}
									title={key}
									get_by={get_by}
								/>
							</div>
							<br />
							<br />
						</div>
					)
			  })
			: null
			
	return (	
		<Container>
			<div className={classes.container}>
				<div className={classes.header}>
					<div className={classes.filterForm}>
						<Typography className={classes.header_title}>
							{className}: Term Plan
						</Typography>					
					</div>
				</div>	
				<div className={classes.option}>
					<RadioGroup row className={classes.radioContainer} value={get_by} onChange={handleOptionChange}>
						<FormControlLabel value="subject" control={<StyledRadio />} label="By Subject" />
						<FormControlLabel value="term" control={<StyledRadio />} label="By Term" />
						<FormControlLabel value="month" control={<StyledRadio />} label="By Month" />
					</RadioGroup>
					<FormControl className={classes.menu}>
						<Dropdown data={menuList} loading={menuLoading} onChange={handleMenuSelected} makeDisable={false} initialValue="All" value={menuSelected}/>
					</FormControl>
				</div>
				<div>
					{isLoading ? (
						<div className={classes.loading}>
							<CircularProgress color='primary' size={30} />
						</div>
					) : null}
					<br />
					{table}
				</div>
			</div>
		</Container>
	)
}
const mapStateToProps = (state) => {
	return {
		selectedRole: state.auth.selectedRole,
	}
}

export default connect(mapStateToProps)(StudentPlanning)

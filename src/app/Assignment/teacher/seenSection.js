import React, { useEffect, useState } from 'react'
import HomeworkService from '../HomeworkService'
import { Container, EmptyData,Loader } from '../../common'
import SeenContainerCard from '../components/seenContainerCard'

const SeenSection = (props) =>{
    const { id,seen_by } = props
    const [ seenList, setSeenList ] = useState([])
    const [ isLoading, setLoading ] = useState(true)
    const token = localStorage.getItem('srmToken')

    useEffect(()=>{
        fetchData()
    },[seen_by])

    const fetchData = async() =>{
        setLoading(true)
        try{
            const res = await HomeworkService.fetchSeenHomework({id, seen_by},token)
            console.log(res)
			if (res.status === 200) {
                if(seen_by === 'parent'){ 
                    res.data.data.seen_parent ? setSeenList(res.data.data.seen_parent) : setSeenList([])
                }
                else{                    
                    res.data.data.seen_student ? setSeenList(res.data.data.seen_student) : setSeenList([])
                }
            }
        } catch (e) {
			console.log(e)
		}
        setLoading(false)
    }

    return(
        <Container>
            {
                isLoading ? 
                    <Loader /> 
                :   
                    seenList.length > 0 ? 
                        seenList.map((item,index)=>(
                            <SeenContainerCard item={item}/>
                        ))   
                    :
                    <EmptyData>No Data</EmptyData>                
            }
        </Container>
    )
} 

export default SeenSection;
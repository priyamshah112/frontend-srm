import React from 'react'
import TeacherSelectHomework from './teacher/TeacherSelectHomework'
import StudentSelectHomework from './student/StudentSelectHomework'

const SelectHomework = (props) =>{
	const role = JSON.parse(localStorage.getItem('srmSelectedRole'))
	return (
		<>
			{
				role === 'admin' || role === 'teacher' ?
					<TeacherSelectHomework/>
				:
					<StudentSelectHomework/>
			}
		</>
	)
}

export default SelectHomework;
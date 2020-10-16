import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import TeacherTimeTable from './teacher/timeTable';
import StudentTestList from './students/testList';





const TimeTable = (props) => {
    const selectedRole = props.selectedRole;

    return (
        <div>

            {selectedRole === "teacher" ?

                <TeacherTimeTable /> : ''}
            {selectedRole === "student" ?

                <StudentTestList /> : ''}

        </div>


    );
};

const mapStateToProps = (state) => {
    return {
        selectedRole: state.auth.selectedRole,
    };
};

export default connect(mapStateToProps)(TimeTable);


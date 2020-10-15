import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import TeacherTimeTable from './teacher/timeTable';





const TimeTable = (props) => {
    const selectedRole = props.selectedRole;

    return (
        <div>

            {/* {selectedRole === "parent" ?

                <TeacherTimeTable /> : ''} */}
            {selectedRole === "student" ?

                <TeacherTimeTable /> : ''}

        </div>


    );
};

const mapStateToProps = (state) => {
    return {
        selectedRole: state.auth.selectedRole,
    };
};

export default connect(mapStateToProps)(TimeTable);


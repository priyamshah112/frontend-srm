import React, { useState } from 'react';
import { connect } from 'react-redux';
import StudentSearch from './StudentSearch';
import StudentTest from './StudentTest';
import StudentReport from './StudentReport';

const StudentCard = (props) => {

    const defaultView = props.selectedRole === 'student' || 'parent' ? 'test' : 'search'
    const [view, setView] = useState(defaultView);
    const [searchValue, setSearchValue] = useState(props.userInfo);
    const [testValue, setTestValue] = useState({});

    const handleSearch = (value) => {
        if (value.id) {
            setSearchValue(value);
            setView('test');
        }
    }

    const handleTest = (value) => {
        if (value.id) {
            setTestValue(value);
            setView('report');
        }
    }

    const RenderPage = () => {
        switch (view) {
            case 'search':
                return (
                    <StudentSearch
                        getSearch={handleSearch}
                    />
                )
            case 'test':
                return (
                    <StudentTest
                        searchData={searchValue}
                        getTest={handleTest}
                        home={() => { setView('search') }}
                    />
                )
            case 'report':
                return (
                    <StudentReport
                        searchData={searchValue}
                        testData={testValue}
                        home={() => { setView('test') }}
                    />
                )
            default:
                break;
        }
    }
    return (
        <RenderPage />
    );
};

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
        selectedRole: state.auth.selectedRole,
        userInfo: state.auth.userInfo,
    };
};

export default connect(mapStateToProps)(StudentCard);



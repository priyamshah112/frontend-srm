import React, { useState } from 'react';

import StudentSearch from './StudentSearch';
import StudentTest from './StudentTest';
import StudentReport from './StudentReport';

const StudentCard = () => {
    const [view, setView] = useState('search');
    const [searchValue, setSearchValue] = useState({});
    const [testValue, setTestValue] = useState({});

    const handleSearch = (value) => {
        if (value.id) {
            setSearchValue(value);
            setView('test');
        }
    }

    const handleTest = (value) => {
        console.log("value", value);

        if (value.id) {
            setTestValue(value);
            setView('report');
        }
    }

    const renderPage = () => {
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
        <>
            {renderPage()}
        </>
    );
};

export default StudentCard;

import React, { useState } from 'react';
import { connect } from "react-redux";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/styles';

import NotificationService from "../../notification/NotificationService";

const useStyle = makeStyles((theme) => ({
    searchContainer: {
        height: '80%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down("xs")]: {
            marginTop: "10px",
        }
    },
    fieldStyle: {
        width: "50%",
        margin: "auto",
        "& .MuiInput-underline:before": {
            borderBottom: "2px solid #eaeaea",
        },
        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
            borderBottom: "2px solid #7B72AF",
            transitionProperty: "border-bottom-color",
            transitionDuration: "500ms",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        },
    }
}));

const StudentSearch = (props) => {
    const classes = useStyle();
    const [searchData, setSearchData] = useState([]);
    const [openUserSearch, setOpenUserSearch] = useState(false);
    const loadingUsers = openUserSearch && searchData.length === 0;


    const suggestions = {
        options: searchData,
        getOptionLabel: (option) => option.username,
    };

    const fetchSearchAPI = async (event) => {
        if (event.target.value) {
            if (event.target.value && event.target.value.length % 2 === 0) {
                try {
                    const response = await NotificationService.searchUser(
                        event.target.value,
                        props.token
                    );
                    const dataExits = response && response.data && response.data.data[0] && response.data.data[0].roles[0];
                    if (dataExits) {
                        setSearchData([...searchData, ...response.data.data]);
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        }
    }

    const onChange = (event, value) => {
        if (value) {
            console.log("props=>", props);
            props.getSearch(value)
        }
    }

    return (
        <div className={classes.searchContainer}>
            <div className={classes.fieldStyle}>
                <Autocomplete
                    {...suggestions}
                    open={openUserSearch}
                    onOpen={() => {
                        setOpenUserSearch(true);
                    }}
                    onClose={() => {
                        setOpenUserSearch(false);
                    }}
                    id="select-on-focus"
                    loading={loadingUsers}
                    selectOnFocus
                    onInputChange={fetchSearchAPI}
                    onChange={onChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="standard"
                            label="Search - Name / User ID"
                        />
                    )}
                />
            </div>
        </div>
    );
}



const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    };
};
export default connect(mapStateToProps)(StudentSearch);


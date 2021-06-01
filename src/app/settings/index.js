import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Container, Header, DropdownCS } from '../common';
import SettingHomeWork from './homework';

const useStyles = makeStyles(() => ({
	dropdown:{
        width: '100%',
        paddingBottom: '10px',
    }
}))

const Settings = () =>{
    const classes = useStyles()
    const [ selected, setSelected ] = useState('Homework')
    const menuList = [
        {id: 'Homework',name:'Homework'}
    ]
    const handleMenuChange = (value) =>{
        setSelected(value)
    }
    return(
        <Container>
            <Header>My Settings</Header>
            <div className={classes.dropdown}>
                <DropdownCS 
                    data={menuList} 
                    value={selected} 
                    onChange={handleMenuChange} 
                    loading={false} 
                    makeDisable={true}
                />
            </div>
            {
                selected === 'Homework' ? <SettingHomeWork /> : null
            }
        </Container>
    )
}

export default Settings;
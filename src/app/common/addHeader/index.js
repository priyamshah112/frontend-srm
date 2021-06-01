import React from 'react'
import useStyle from './styles'
import Typography from '@material-ui/core/Typography'
import AddIcon from '../../../assets/images/Filled Add.svg'

const AddHeader = (props) =>{
    const classes = useStyle()
    const { add } = props
	const role = JSON.parse(localStorage.getItem("srmSelectedRole"));
    return (
        <div className={classes.header}>
            {role === 'teacher' || role === 'admin' ? (
                <div className={classes.addNew}>
                    <div
                        onClick={add}
                        className={classes.addNewDiv}
                    >
                        <img src={AddIcon} alt='add' />
                        <Typography className='new'>New</Typography>
                    </div>
                </div>
            ) : (
                ''
            )}
        </div>
    )
}

export default AddHeader;
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  CardContent,
  Button,
} from '@material-ui/core';
import Card from '@material-ui/core/Card';

import userIcon from '../../assets/images/transport/User.svg';
import bus_detail from '../../assets/images/transport/Bus Details.svg';
import bus_route from '../../assets/images/transport/Bus Route.svg';
import edit from '../../assets/images/Edit Button.svg';

import Transport_mode from './Transport_mode';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
const useStyle = makeStyles((theme) => ({
  profileDiv: {
    marginTop: '32px',
    paddingLeft:'2%',
    paddingRight:'2%',
    paddingBottom:'2%',

  },
  profileDiv_1: {
    marginTop: '0px',
    paddingLeft:'2%',
    paddingRight:'2%',
    paddingBottom:'2%',

  },
  header: {
    display: 'flex',
  },
  cardHeader: {
    marginLeft: '4px',
    padding:'3px',
  },
  profileTitle: {
    font: 'normal normal 900 14px/19px Avenir',
    display: 'inline',
    marginLeft: '5px',
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  iconStyle: {
    width: '17px',
    height: '19px',
    transform: 'translateY(4px)',
    padding:'3px',
  },
  iconStyle_m: {
    width: '22px',
    height: '22px',
    transform: 'translateY(4px)',
    paddingBottom:'5px',
  },
  iconStyle_1: {
    width: '11px',
    height: '11px',
    transform: 'translateY(4px)',
    padding:'3px',
  },
  profile: {
  },
  card: {
    boxShadow: 'none',
    borderRadius: '10px',
  },
  cardContent: {
    padding: '0px !important',  
  },
  card1_content1 : {
    top: '145px',
    left: '24px',
    width: '81px',
    height: '16px',
    textAlign: 'left',
    font:' normal normal normal 14px/20px Avenir',
    letterSpacing: '0px',
    color: '#2C2C2E',
    opacity: '1',
    fontWeight: 650,
    padding: '1px ',
    paddingBottom:'2px',
  },
  card1_content2_part_1 :{
    top: '0px',
    left: '0px',
    width: '33px',
    height: '19px',
    textAlign: 'left',
    font:' normal normal normal 14px/20px Avenir',
    letterSpacing: '0px',
    color: '#8E8E93',
    padding: '1px ',
  },
  card1_content2_part_2 :{
    "width":"52px","height":"19px","color":"#1C1C1E","textAlign":"left","font":"normal normal normal 14px/20px Avenir","letterSpacing":"0px",
    'padding': '1px ',
    'fontWeight': '600',
  },
  card_left : {
    width:'80%',
    float : 'left',
  },
  card_left_1 : {
    width:'80%',
    float : 'left',
  },
  pad:{
    padding:'10px',
  },
  card_right : {
    width:'20%',
    float : 'right',
    textAlign: 'center',

  },
  card_right_1 : {
    width:'20%',
    float : 'right',
    textAlign: 'center',
    
  },
  card_action:{
    "width":"100%","height":"80px","background":"#CAC7DF 0% 0% no-repeat padding-box","borderRadius":"0px 10px 10px 0px","opacity":"1",
  },
  card_action_content:{
    cursor: 'pointer',
    fontWeight: 500,
    "color":"#1C1C1E","textAlign":"center","font":"normal normal normal 14px/14px Avenir","letterSpacing":"0px","opacity":"1"},
  profilePictureDiv: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    margin: 'auto',
    border: '1px solid',
  },
  buttonContainer: {
    width: "100%",
    padding:"3%",
  },
  button: {
    width: "94%",
  },
  card2_content1:{fontWeight: '700',"textAlign":"left",    font:' normal normal normal 14px/20px Avenir'  ,"letterSpacing":"0px","color":"#2C2C2E","opacity":"1"},
  card2_content2:{fontWeight: '550',"color":"#1C1C1E","textAlign":"left","font":"normal normal normal 14px/20px Avenir","letterSpacing":"0px","opacity":"1","width":"164px","height":"40px"},
  card3_content1:{fontWeight: '700',"width":"100%","height":"100%","textAlign":"left",    font:' normal normal normal 14px/20px Avenir',  "letterSpacing":"0px","color":"#2C2C2E","opacity":"1"},
  card3_content2:{fontWeight: '550',"top":"441px","left":"37px","width":"100%","height":"17px","color":"#1C1C1E","textAlign":"left","font":"normal normal 300 14px/20px Avenir","letterSpacing":"0px","opacity":"1"},

}));


const Subscribred = (props) => {  
  const classes = useStyle();
  const [mode, setmode] = useState(false);

  const openmaps=(mode)=>{
    console.log(mode);
    setmode(mode);
  }

  return (
  <>  
      {
          mode ?
                <div>
                 <Transport_mode change_mode={openmaps} />
                </div>
          : 
          (
            <div>
                    <div className={classes.profileDiv}>
                      <div className={classes.header}>
                        <div className={classes.cardHeader}>
                          <img src={bus_route} className={classes.iconStyle} />
                          <Typography className={classes.profileTitle}>BUS ROUTE</Typography>
                        </div>
                        
                      </div>
                      <div className={classes.profile}>
                        <Card className={classes.card}>
                          <CardContent className={classes.cardContent}>
                              <div className={classes.card_left}>
                                <div className={classes.pad}>
                                  
                                  <div className={classes.card1_content1}>Route # 349</div>
                                  <div>
                                  <span className={classes.card1_content2_part_1}>Start: </span> 
                                  <span className={classes.card1_content2_part_2}>  Arekere</span> 
                                  </div>
              
                                  <div>
                                  <span className={classes.card1_content2_part_1}>End:</span> 
                                  <span className={classes.card1_content2_part_2}>  Capital Public School</span> 
                                  </div>
                                </div>
              
                              </div>
                              <div className={classes.card_right}>
                                <div className={classes.card_action}>
                                <div className={classes.card_action_content} onClick = {()=>openmaps('modify')}>
                                  <br/>
                                  <img src={edit} className={classes.iconStyle_m} />
                                          <br/>              
                                Modify<br/> Route
                                </div>
                                </div>
                              </div>
                                  
                          </CardContent>
                        </Card>
                      </div>
                    </div>
          
                    <div className={classes.profileDiv_1}>
                      <div className={classes.header}>
                        <div className={classes.cardHeader}>
                          <img src={bus_detail} className={classes.iconStyle} />
                          <Typography className={classes.profileTitle}>Bus details</Typography>
                        </div>
                        
                      </div>
                      <div className={classes.profile}>
                        <Card className={classes.card}>
                          <CardContent className={classes.cardContent}>
                                  <div className={classes.card_left}>
                                <div className={classes.pad}>
                                  
                                  <div className={classes.card2_content1}>KA 04 4837</div>
                                  <div className={classes.card2_content2}>Tata motors starbus skool, 26 seater, AC Diesel Bus</div>
                                  
                                </div>
              
                              </div>
                                  <div className={classes.card_right}>
                                    <div className={classes.card_action}>
                                      <div className={classes.card_action_content} onClick = {()=>openmaps('track')}>
                                      <br/>
                                          {/* <img src={bus_detail} className={classes.iconStyle} /> */}
                                          <LocationOnOutlinedIcon className={classes.iconStyle_m}/>
                                          <br/>
                                      Track <br/>Bus
                                      </div>
                                    </div>
                                    </div>
                              
              
                                  
                          </CardContent>
                        </Card>
                      </div>
                    </div>
          
                    <div className={classes.profileDiv_1}>
                      <div className={classes.header}>
                        <div className={classes.cardHeader}>
                          <img src={userIcon} className={classes.iconStyle} />
                          <Typography className={classes.profileTitle}>DRIVER details</Typography>
                        </div>
                        
                      </div>
                      <div className={classes.profile}>
                        <Card className={classes.card}>
                          <CardContent className={classes.cardContent}>
                              <div className={classes.card_left_1}>
                                <div className={classes.pad}>
                                  
                                  <div className={classes.card3_content1}>Manjunath Kumar 4.8 <img src={bus_detail} className={classes.iconStyle_1} /> </div>
                                  <div className={classes.card3_content2}><img src={bus_detail} className={classes.iconStyle_1} />  Arekere, Bengaluru 76</div>
                                <div className={classes.card3_content2}>  <img src={bus_detail} className={classes.iconStyle_1} /> +91 93837 48273</div>
              
                                  
                                </div>
              
                              </div>
                              <div className={classes.card_right_1}>
                              <div className={classes.pad}>
                              <div
                                  className={classes.profilePictureDiv}
                                  style={{
                                    backgroundImage: `url(https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940)`,
                                    'backgroundRepeat': 'no-repeat',
                                    'backgroundSize': 'cover',
                                    'backgroundPosition': 'center',
                                  }}
                                >
                              </div>
                              </div>
              
                              </div>
              
                                  
                          </CardContent>
                        </Card>
                      </div>
                    </div>
          
                      <br/>
                      <br/>
                      <br/>
  
                    <div className={classes.buttonContainer}>
                <Button
                  color="primary"
                  variant="contained"
                  className={classes.button}
                  onClick={()=>props.handle(false)}
                >
                  Unsubscribe
                </Button>
              </div>
           
            </div>
          )
       }
  
          

  </>
  );
};
 
export default Subscribred;

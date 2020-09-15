import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import SyllabusService from "../SyllabusService";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import SubjectSyllabus from "./subjectSyllabus";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { useParams, useLocation, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    container: {
      width: "100%",
      backgroundColor: theme.palette.mainBackground,
      height: "100%",
      marign: "0",
      padding: "0",
      overflowY: "auto",
    },
    subjectTitle: {
      marginBottom: "20px",
    },
    loading: {
      width: "100%",
      textAlign: "center",
      paddingTop: "8px",
      fontSize: "20px",
    },
  }));

  
  const EditChapter = (props) => {
    const location = useLocation()
    const params = useParams()
    const history = useHistory()
    const classes = useStyles();

    const [syllabus, setSyllabus] = useState(0);
    const [isLoading, setLoading] = useState(true);
    const [subject, setSubject] = useState(0);
    const [chapterID, setChapter] = useState(null);
    const [termID, setTerm] = useState(null);
    const [submitBtn,setSubmitBtn] = useState('Submit');
    const [mainContent, setMainContent] = useState('')
    const [classID, setClassID] = useState(null)
    const [editType, setEditType] = useState(null)
    const token = localStorage.getItem("srmToken")
    const chaptersItems = [];

  const handleChange = (event) => {
    setChapter(event.target.value);
  };
  const handleTermChange = (event) => {
    setTerm(event.target.value);
  };

  const handleMainContent = (event) => {
      setMainContent(event.target.value)
  }
  const fetchSyllabus = async (subject_id) => {
    const response = await SyllabusService.getSyllabus(token,subject_id);
    console.log(response);
    if (response.status === 200) {
      if(response.data.success && isLoading){
        console.log("Subject ID - "+response.data.data.subject_id)
        setSyllabus(response.data.data)
        setChapter(response.data.data.chapters.chapter)
        setTerm(response.data.data.chapters.term)
        setMainContent(response.data.data.main_content)
        setClassID(response.data.data.class_id)
        setLoading(false)
       }
    }
}

  const updateChapter = async () => {
    setSubmitBtn("Submitting..")
    const response = await SyllabusService.updateChapter(token,subject,{
        "chapters":{"term":termID,"chapter":chapterID},
        "main_content":mainContent
    }
        );
    if (response.status === 200) {
        setSubmitBtn('Submit')
        console.log(response.data)
      if (response.data.success) {
        goBack()
      }
    }
  };

  const saveChapter = async () => {
    setSubmitBtn("Submitting..")
    const response = await SyllabusService.saveChapter(token,{
        "subject_id": subject,
        "class_id": classID,
        "chapters":{"term":termID,"chapter":chapterID},
        "main_content":mainContent
    }
        );
    if (response.status === 200) {
        setSubmitBtn('Submit')
        console.log(response.data)
      if (response.data.success) {
        goBack()
      }
    }
  };

  const goBack = () => {
    history.push(`/syllabus`);
  }

  useEffect(() => {
    setSubject(params.id)
    if (location.pathname.indexOf("/add/") > -1) {
        setClassID(params.classid)
        setTerm(1)
        setChapter(1)
        setEditType("New")
    }else if(location.pathname.indexOf("/edit/") > -1){
        console.log(params.id+" / edit")
        fetchSyllabus(params.id)
        setEditType("Edit")
    }
    
    /*
    Dynamic MenuItem not working!
    for(var i = 1; i < 101; i++) {
      chaptersItems.push("Chapter "+i);
    }
    */
        
  }, [subject]);

    return (
        <div className={classes.container}>
              <div style={{ margin: 20, background:'#fff', padding:20 }}>
              <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select-term"
          value={termID}
          onChange={handleTermChange}
          style={{width:'100%'}}
        >
          <MenuItem key={1} value={1}>Term 1</MenuItem>
<MenuItem key={2} value={2}>Term 2</MenuItem>
<MenuItem key={3} value={3}>Term 3</MenuItem>
<MenuItem key={4} value={4}>Term 4</MenuItem>
<MenuItem key={5} value={5}>Term 5</MenuItem>
<MenuItem key={6} value={6}>Term 6</MenuItem>
<MenuItem key={7} value={7}>Term 7</MenuItem>
<MenuItem key={8} value={8}>Term 8</MenuItem>
<MenuItem key={9} value={9}>Term 9</MenuItem>
<MenuItem key={10} value={10}>Term 10</MenuItem>
            </Select>    
            <br/><br/>

              <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select-chapter"
          value={chapterID}
          onChange={handleChange}
          style={{width:'100%'}}
        >
            <MenuItem key={1} value={1}>Chapter 1</MenuItem>
<MenuItem key={2} value={2}>Chapter 2</MenuItem>
<MenuItem key={3} value={3}>Chapter 3</MenuItem>
<MenuItem key={4} value={4}>Chapter 4</MenuItem>
<MenuItem key={5} value={5}>Chapter 5</MenuItem>
<MenuItem key={6} value={6}>Chapter 6</MenuItem>
<MenuItem key={7} value={7}>Chapter 7</MenuItem>
<MenuItem key={8} value={8}>Chapter 8</MenuItem>
<MenuItem key={9} value={9}>Chapter 9</MenuItem>
<MenuItem key={10} value={10}>Chapter 10</MenuItem>
<MenuItem key={11} value={11}>Chapter 11</MenuItem>
<MenuItem key={12} value={12}>Chapter 12</MenuItem>
<MenuItem key={13} value={13}>Chapter 13</MenuItem>
<MenuItem key={14} value={14}>Chapter 14</MenuItem>
<MenuItem key={15} value={15}>Chapter 15</MenuItem>
<MenuItem key={16} value={16}>Chapter 16</MenuItem>
<MenuItem key={17} value={17}>Chapter 17</MenuItem>
<MenuItem key={18} value={18}>Chapter 18</MenuItem>
<MenuItem key={19} value={19}>Chapter 19</MenuItem>
<MenuItem key={20} value={20}>Chapter 20</MenuItem>
<MenuItem key={21} value={21}>Chapter 21</MenuItem>
<MenuItem key={22} value={22}>Chapter 22</MenuItem>
<MenuItem key={23} value={23}>Chapter 23</MenuItem>
<MenuItem key={24} value={24}>Chapter 24</MenuItem>
<MenuItem key={25} value={25}>Chapter 25</MenuItem>
<MenuItem key={26} value={26}>Chapter 26</MenuItem>
<MenuItem key={27} value={27}>Chapter 27</MenuItem>
<MenuItem key={28} value={28}>Chapter 28</MenuItem>
<MenuItem key={29} value={29}>Chapter 29</MenuItem>
<MenuItem key={30} value={30}>Chapter 30</MenuItem>
<MenuItem key={31} value={31}>Chapter 31</MenuItem>
<MenuItem key={32} value={32}>Chapter 32</MenuItem>
<MenuItem key={33} value={33}>Chapter 33</MenuItem>
<MenuItem key={34} value={34}>Chapter 34</MenuItem>
<MenuItem key={35} value={35}>Chapter 35</MenuItem>
<MenuItem key={36} value={36}>Chapter 36</MenuItem>
<MenuItem key={37} value={37}>Chapter 37</MenuItem>
<MenuItem key={38} value={38}>Chapter 38</MenuItem>
<MenuItem key={39} value={39}>Chapter 39</MenuItem>
<MenuItem key={40} value={40}>Chapter 40</MenuItem>
<MenuItem key={41} value={41}>Chapter 41</MenuItem>
<MenuItem key={42} value={42}>Chapter 42</MenuItem>
<MenuItem key={43} value={43}>Chapter 43</MenuItem>
<MenuItem key={44} value={44}>Chapter 44</MenuItem>
<MenuItem key={45} value={45}>Chapter 45</MenuItem>
<MenuItem key={46} value={46}>Chapter 46</MenuItem>
<MenuItem key={47} value={47}>Chapter 47</MenuItem>
<MenuItem key={48} value={48}>Chapter 48</MenuItem>
<MenuItem key={49} value={49}>Chapter 49</MenuItem>
<MenuItem key={50} value={50}>Chapter 50</MenuItem>
<MenuItem key={51} value={51}>Chapter 51</MenuItem>
<MenuItem key={52} value={52}>Chapter 52</MenuItem>
<MenuItem key={53} value={53}>Chapter 53</MenuItem>
<MenuItem key={54} value={54}>Chapter 54</MenuItem>
<MenuItem key={55} value={55}>Chapter 55</MenuItem>
<MenuItem key={56} value={56}>Chapter 56</MenuItem>
<MenuItem key={57} value={57}>Chapter 57</MenuItem>
<MenuItem key={58} value={58}>Chapter 58</MenuItem>
<MenuItem key={59} value={59}>Chapter 59</MenuItem>
<MenuItem key={60} value={60}>Chapter 60</MenuItem>
<MenuItem key={61} value={61}>Chapter 61</MenuItem>
<MenuItem key={62} value={62}>Chapter 62</MenuItem>
<MenuItem key={63} value={63}>Chapter 63</MenuItem>
<MenuItem key={64} value={64}>Chapter 64</MenuItem>
<MenuItem key={65} value={65}>Chapter 65</MenuItem>
<MenuItem key={66} value={66}>Chapter 66</MenuItem>
<MenuItem key={67} value={67}>Chapter 67</MenuItem>
<MenuItem key={68} value={68}>Chapter 68</MenuItem>
<MenuItem key={69} value={69}>Chapter 69</MenuItem>
<MenuItem key={70} value={70}>Chapter 70</MenuItem>
<MenuItem key={71} value={71}>Chapter 71</MenuItem>
<MenuItem key={72} value={72}>Chapter 72</MenuItem>
<MenuItem key={73} value={73}>Chapter 73</MenuItem>
<MenuItem key={74} value={74}>Chapter 74</MenuItem>
<MenuItem key={75} value={75}>Chapter 75</MenuItem>
<MenuItem key={76} value={76}>Chapter 76</MenuItem>
<MenuItem key={77} value={77}>Chapter 77</MenuItem>
<MenuItem key={78} value={78}>Chapter 78</MenuItem>
<MenuItem key={79} value={79}>Chapter 79</MenuItem>
<MenuItem key={80} value={80}>Chapter 80</MenuItem>
<MenuItem key={81} value={81}>Chapter 81</MenuItem>
<MenuItem key={82} value={82}>Chapter 82</MenuItem>
<MenuItem key={83} value={83}>Chapter 83</MenuItem>
<MenuItem key={84} value={84}>Chapter 84</MenuItem>
<MenuItem key={85} value={85}>Chapter 85</MenuItem>
<MenuItem key={86} value={86}>Chapter 86</MenuItem>
<MenuItem key={87} value={87}>Chapter 87</MenuItem>
<MenuItem key={88} value={88}>Chapter 88</MenuItem>
<MenuItem key={89} value={89}>Chapter 89</MenuItem>
<MenuItem key={90} value={90}>Chapter 90</MenuItem>
<MenuItem key={91} value={91}>Chapter 91</MenuItem>
<MenuItem key={92} value={92}>Chapter 92</MenuItem>
<MenuItem key={93} value={93}>Chapter 93</MenuItem>
<MenuItem key={94} value={94}>Chapter 94</MenuItem>
<MenuItem key={95} value={95}>Chapter 95</MenuItem>
<MenuItem key={96} value={96}>Chapter 96</MenuItem>
<MenuItem key={97} value={97}>Chapter 97</MenuItem>
<MenuItem key={98} value={98}>Chapter 98</MenuItem>
<MenuItem key={99} value={99}>Chapter 99</MenuItem>
<MenuItem key={100} value={100}>Chapter 100</MenuItem>
            </Select>    
            <br/><br/>

              <TextField
          id="outlined-multiline-static"
          multiline
          rows={4}
          defaultValue={mainContent}
          variant="outlined"
          style={{width:'100%'}}
          onChange={handleMainContent}
        /><br/><br/>
        <Button variant="outlined" color="primary" style={{marginRight:20}} onClick={()=> goBack()}>
        Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={()=> editType == "New"? saveChapter() : updateChapter()}>
        {submitBtn}
        </Button>
              </div>
        </div>      
          )
  }

  export default EditChapter;
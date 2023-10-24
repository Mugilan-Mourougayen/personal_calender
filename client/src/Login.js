

import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
const style = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  padding: 4,
};
const Login = () => {


    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errmsg,setErrmsg]= useState({email:false , password:false});
  
    let navigate = useNavigate();


    const validate =()=>{
      console.log(email)
  
      const tempErr = { email: false, password: false };
      setErrmsg(tempErr);
    
      if (!email) {
        tempErr.email = true;
      }
    
      if (!password) {
        tempErr.password = true;
      }
        if (tempErr.email || tempErr.password) {
        setErrmsg(tempErr);
      }else{
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email:email,password:password })
      };
      fetch('http://localhost:5000/users/login', requestOptions)
      .then(response => {
        if (response.status === 200) {
          return response.json(); 
        } else {
          throw new Error('Request failed with status ' + response.status);
        }
      })
      .then(data => {
        alert(data.message)
        localStorage.setItem("token", data.token)
        return navigate("/availability");
      })
      .catch(err => {
       
        console.log( err);
      });
  }
}
  return (
    <div>
           <Box sx={style}>
           <h3>Login</h3>
       <TextField
        label="email"
        size='small'
        style={{paddingBottom:"20px"}}
        onChange={(e)=>{setEmail(e.target.value)}}
        />
 <span style={{color:"red",display:errmsg.email? "inline":"none"}}  >*Invalid Email*</span>
        <TextField
        label="password"
        size='small'
        type='password'
        style={{paddingBottom:"20px"}}
        onChange={(e)=>{setPassword(e.target.value)}}
        />
        <span style={{color:"red",display:errmsg.password? "inline":"none"}}  >*Invalid Password*</span>
        <br/>
        <Button variant='contained' onClick={validate}>Enter</Button>
        <br/>
        <Link to='/register'>
       <Button  style={{margin:'20px'}}  > Create a new account</Button>
</Link>
        </Box>
    </div>
  )
}

export default Login

import './App.css';
import DatePicker from "react-datepicker";
import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';

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

function App() {
  const [startDate, setStartDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errmsg,setErrmsg]= useState({email:false , password:false});

  const handleOpen = () => setOpen(true);
  const handleClose = (e,r) => {
    if (r !== 'backdropClick') {
      setOpen(false)
    }
  };

  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setMonth(today.getMonth() + 5);
  const trigger =(date)=>{
 console.log(date)
    setStartDate(date)
    
  }
  const validate =(date)=>{
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
    fetch('https://localhost:5000/login', requestOptions)
        .then(response => response.json())
        .then(data => console.log(data));
}
    
       
   }
  return (
    <div className="App">

      <Button variant='contained' onClick={handleOpen}>
      publish availabilities
      </Button>
      <Modal
        open={open}
        disableBackdropClick
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
        <Button variant='contained' color='error' onClick={handleClose}>Cancel</Button>
        </Box>
      </Modal>




     Choose a date 
     <DatePicker
     selected={startDate} 
     onChange={(date) => trigger(date)}
     minDate={today}
     maxDate={maxDate} 
     dateFormat="dd/MM/yyyy"
     />

    </div>
  );
}

export default App;

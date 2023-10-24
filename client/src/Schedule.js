import DatePicker from "react-datepicker";
import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import './App.css';
import "./Availability.css"
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Schedule() {
  const [availability,setAvailablity] = useState([]);
  const [scheduledAvailablities, setScheduledAvailablities] = useState([]);
  const [newAvailablity, setNewAvailablity] = useState({ start: '', end: '',id:'',email:"",title:"" });
  const [startDate, setStartDate] = useState(new Date());
  const [open, setOpen] = React.useState(false);
  const [dmail,setDmail]= useState("")
  const [deletitem,setDeletitem]=useState({})
  const handleClose = () => setOpen(false);

  function checkclash(meettime, freeTimeArray) {
    
      const { start: mStart, end: mEnd } = meettime;
    
      for (const freeTimeSlot of freeTimeArray) {
        const { start, end } = freeTimeSlot;
    
        if (mStart >= start && mEnd <= end) {

          return true;
        }
      }
    
      return false;
    }

  
  const trigger =()=>{
    const date=`${startDate.getDate()}/${startDate.getMonth()+1}/${startDate.getFullYear()}`
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({  date: date  })
  };
    fetch("http://localhost:5000/calender/availablity",requestOptions)
    .then(res=>res.json())
    .then(data=>
      {if(data && data.schedule){
        setAvailablity(data.schedule)
      }else{
        setAvailablity([])

      }
      })
    .catch(err=>console.log(err))

    getreservation()
  }

  const getreservation =()=>{
    
    const date=`${startDate.getDate()}/${startDate.getMonth()+1}/${startDate.getFullYear()}`
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({  date: date  })
  };
    fetch("http://localhost:5000/calender/getreservation",requestOptions)
    .then(res=>res.json())
    .then(data=>
      {if(data && data.schedule){
        setScheduledAvailablities(data.schedule)
      }else{
        setScheduledAvailablities([])

      }
      })
    .catch(err=>console.log(err))
  }

 
    const scheduleavailability = () => {
      console.log(newAvailablity)
      if (newAvailablity.start && newAvailablity.end  && newAvailablity.email && newAvailablity.title) {
   
   if(checkclash(newAvailablity,availability)){

   
      const date=`${startDate.getDate()}/${startDate.getMonth()+1}/${startDate.getFullYear()}`
      console.log(date)
      newAvailablity.id= uuidv4();
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({  date: date , availability:newAvailablity  })
    };
      fetch("http://localhost:5000/calender/addreservarion",requestOptions)
      .then(res=>res.json())
      .then((data)=>{
        console.log(data)
      })
      .catch(err=>console.log(err))
      setNewAvailablity({ start: '', end: '',id:'' ,email:'',title:''});
      trigger()
   }
   else{
    alert("Please give a valid time")
   }}
   else{
    alert("All fields must be Filled")
   }
  };
  const deleteAvailablity = (availablity) => {
    setOpen(true)
    setDeletitem(availablity)
    
  };
  const confirmdelete = () => {
    const date=`${startDate.getDate()}/${startDate.getMonth()+1}/${startDate.getFullYear()}`
    if (dmail===deletitem.email){
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({  date: date , deletitem:deletitem.id  })
};
  fetch("http://localhost:5000/calender/deletereservarion",requestOptions)
  .then(res=>res.json())
  .then((data)=>{
    console.log(data)
  })
  .catch(err=>console.log(err))
  setOpen(false)
  alert("Deleted Successfully")
  trigger()
}else{
  setOpen(true)
  alert("Incorrect mail")
}
    
  };

  return (
    <div className="App">
   
      <div>

Choose a date 
<DatePicker
selected={startDate} 
onChange={(date) => setStartDate(date)}
// minDate={today}
// maxDate={maxDate} 
dateFormat="dd/MM/yyyy"
showTimeInput={false}
/>
<br/>
<Button style={{margin:"20px"}} variant='contained' onClick={ trigger} >Check Availablity</Button>

</div>



 
    {

availability.length !==0  ?


<div>
<div >
    
    <label >Start Time:</label>
    <input
      type="time"
      name="start"
      step="900"
      value={newAvailablity.start}
      onChange={(e) => setNewAvailablity({ ...newAvailablity, start: e.target.value })}
      required
    />

    <label >End Time:</label>
    <input
      type="time"
      name="end"
      step="900"
      value={newAvailablity.end}
      onChange={(e) => setNewAvailablity({ ...newAvailablity, end: e.target.value })}
      required
    />
    <br/>
    <br/>
 <label >Emai:</label>
    <TextField
      type="text"
      size="small"
      onChange={(e) => setNewAvailablity({ ...newAvailablity, email: e.target.value })}
      required
    />
    <label >Title:</label>
    <TextField
      type="text"
      size="small"
      onChange={(e) => setNewAvailablity({ ...newAvailablity, title: e.target.value })}
      required
    />
<br/>
    <br/>
    <Button  onClick={scheduleavailability}>reserve</Button>

</div>
     
  
      <div >
      <h2>Th Persons Free Time is</h2>
          <table>
            <thead>
              <tr>
                <th>Start Time</th>
                <th>End Time</th>
              
              </tr>
            </thead>
            <tbody>
              {availability.slice()
  .sort((a, b) => a.start.localeCompare(b.start)).map((av, index) => (
                
                  <tr key={index}>
                  <td>{av.start}</td>
                  <td>{av.end}</td>
               
                </tr>
                 
              ))}
            </tbody>
          </table>

          <h2>His meetings</h2>
          <table>
            <thead>
              <tr>
                <th>Start Time</th>
                <th>End Time</th>
                {/* <th>Email</th> */}
                <th>Title</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {scheduledAvailablities.slice()
  .sort((a, b) => a.start.localeCompare(b.start)).map((availablity, index) => (
                
                  <tr key={index}>
                  <td>{availablity.start}</td>
                  <td>{availablity.end}</td>
                  {/* <td>{availablity.email}</td> */}
                  <td>{availablity.title}</td>
                  <td>
                  <Button variant="contained" color="error" size="small" style={{margin:"10px"}} onClick={()=>{deleteAvailablity(availablity)}}>delete</Button>
                  </td>
                </tr>
                 
              ))}
            </tbody>
          </table>       
      </div>

      </div>
      :
      <div>This Person is not available in this date</div>
}

<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      confirm your mail to delete
    </Typography>
   <TextField  size="small" onChange={(e)=>{setDmail(e.target.value)}}/>
   <Button onClick={confirmdelete}>confirm Delete</Button>
   </Box>
</Modal>
    </div>
  );
}

export default Schedule;

import DatePicker from "react-datepicker";
import React, { useState,useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import './App.css';
import "./Availability.css"
import { Button } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";

function Availability() {
  const [scheduledAvailablities, setScheduledAvailablities] = useState([]);
  const [newAvailablity, setNewAvailablity] = useState({ start: '', end: '',id:'' });
  const [reservations, setReservations] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const navigate = useNavigate();
  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setMonth(today.getMonth() + 5);
  useEffect(() => {
    const user = localStorage.getItem("token");
    console.log(user);
    if (user === null) {
      navigate("/login");
    }
  }, [navigate]);

const logout=()=>{
  localStorage.removeItem("token")
  navigate("/");
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
      setReservations(data.schedule)
    }else{
      setReservations([])

    }
    })
  .catch(err=>console.log(err))
}



const aicheck=()=>{
  const date=`${startDate.getFullYear()}-${startDate.getMonth()+1}-${startDate.getDate()}`
  console.log(date)
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({  date: date  })
};
  fetch("http://localhost:4000/ask",requestOptions)
  .then(res=>res.json())
  .then(data=> data && alert(data.msg))
  .catch(err=>console.log(err))

}

const deleteav=()=>{
  const date=`${startDate.getDate()}/${startDate.getMonth()+1}/${startDate.getFullYear()}`
  console.log(date)
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({  date: date  })
};
  fetch("http://localhost:5000/calender/availablity",requestOptions)
  .then(res=>res.json())
  .then(data=> data && alert(data.msg))
  .catch(err=>console.log(err))

}
  const trigger =()=>{
    
    const date=`${startDate.getDate()}/${startDate.getMonth()+1}/${startDate.getFullYear()}`
    console.log(date)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({  date: date  })
  };
    fetch("http://localhost:5000/calender/availablity",requestOptions)
    .then(res=>res.json())
    .then(data=>
      {if(data && data.schedule){
        setScheduledAvailablities(data.schedule)
        getreservation()
      }
    else{
      setScheduledAvailablities([])
    }
    })
    .catch(err=>console.log(err))
  }

  const updateav =()=>{
    const date=`${startDate.getDate()}/${startDate.getMonth()+1}/${startDate.getFullYear()}`
    console.log(date)
    console.log({  date: date , availability:scheduledAvailablities ,email:"mugilanmourougayen@gmail.com" })
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({  date: date , availability:scheduledAvailablities ,email:"mugilanmourougayen@gmail.com" })
  };
    fetch("http://localhost:5000/calender/addavailablity",requestOptions)
    .then(res=>res.json())
    .then((data)=>{
      alert("updated successfully")
    })
    .catch(err=>console.log(err))
  }
 
    const scheduleavailability = () => {
      const hasConflict = scheduledAvailablities.some(availability => {
        const availabilityStart = new Date(availability.start);
        const availabilityEnd = new Date(availability.end);
        const newStart = new Date(newAvailablity.start);
        const newEnd = new Date(newAvailablity.end);
    
        return (
          (newStart >= availabilityStart && newStart < availabilityEnd) ||
          (newEnd > availabilityStart && newEnd <= availabilityEnd)
        );
      });

    if (hasConflict) {
      alert('There is a conflict with an existing availablity. Please choose a different time.');
    } else {
      newAvailablity.id= uuidv4();
      setScheduledAvailablities([...scheduledAvailablities, newAvailablity]);
      setNewAvailablity({ start: '', end: '',id:'' });
    }
  };
  const deleteAvailablity = (availablityId) => {
    const updatedAvailablities = scheduledAvailablities.filter(availablity => availablity.id !== availablityId);
    setScheduledAvailablities(updatedAvailablities);
  };
  return (
    <div className="App">
     <Button variant="contained" style={{margin:"20px",right:"20px",top:"10px",position:"absolute"}} color="warning" onClick={logout}>Logout</Button>
      <div>

Choose a date 
<DatePicker
selected={startDate} 
onChange={(date) => {setStartDate(date); trigger()}}
minDate={today}
maxDate={maxDate} 
dateFormat="dd/MM/yyyy"
showTimeInput={false}
/>
<br/>
<Button style={{margin:"20px"}} variant='contained' onClick={ trigger} >Check Availablity</Button>
<Button style={{margin:"20px"}} variant='contained'  color="secondary"onClick={aicheck} >Check Availablity AI</Button>
</div>
  
     
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

          <Button variant="contained" style={{margin:"20px"}} onClick={ scheduleavailability}>Schedule</Button>
   
      </div>
      <div className="scheduled-availablities">
      
        {scheduledAvailablities.length === 0 ? (
          <p>No availablities scheduled.</p>
        ) : (
          <div>
          <h2>Scheduled Availablities</h2>
          <table>
            <thead>
              <tr>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {scheduledAvailablities.slice()
  .sort((a, b) => a.start.localeCompare(b.start)).map((availablity, index) => (
                
                  <tr key={index}>
                  <td>{availablity.start}</td>
                  <td>{availablity.end}</td>
                  <td>

                  <Button variant="contained" color="error" size="small" style={{margin:"10px"}} onClick={()=>{deleteAvailablity(availablity.id)}}>delete</Button>
                  </td>
                </tr>
                 
              ))}
            </tbody>
          </table>


          </div>

          
        )}
        <Button onClick={updateav} variant="contained">Publish Availability</Button>   
         <Button onClick={deleteav} variant="contained" color="error">Delete Availability</Button>
      </div>


      <div>

      {reservations.length === 0 ? (
          <p>No meeting reserved on this date.</p>
        ) :  
        
          <div>
            <h2>List of meetings You have</h2>
      <table>
            <thead>
              <tr>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Email</th>
                <th>Title</th>
        
              </tr>
            </thead>
            <tbody>
              
              {reservations.slice()
  .sort((a, b) => a.start.localeCompare(b.start)).map((availablity, index) => (
                
                  <tr key={index}>
                  <td>{availablity.start}</td>
                  <td>{availablity.end}</td>
                  <td>{availablity.email}</td>
                  <td>{availablity.title}</td>
           
                </tr>
                 
              ))}
            </tbody>
          </table> 
          </div>
        
}
      </div>
    </div>
  );
}

export default Availability;

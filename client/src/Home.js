import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
 
  return (
    <div className='App'>
        <h2> This is a calender app to schedule a meet</h2>
        <Link to='/schedule'>
       <Button  variant='contained' color='secondary'> Reserve a Meeting</Button>
</Link>
<Link to='/availability'>
       <Button  style={{margin:'20px'}} variant='contained' color='success'> Set Availability</Button>
</Link>
    </div>
  )
}

export default Home

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Schedule from "./Schedule";
import Login from "./Login";
import Register from "./Register";
import Availability from "./Availability";
import Home from "./Home";
function App() {
  return (
    <div>

          <BrowserRouter>
      <div  className="navbar"  > <Link className="link" to="/"><h2>Personal Calender</h2></Link></div>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/schedule" element={<Schedule />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/availability" element={<Availability />}/>
      
      </Routes>
    </BrowserRouter>

    </div>

  );
}

export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import { Signup } from './Pages/Signup';
import { Signup2 } from './newComponents/Signup';
import Login2  from './newComponents/Login';
import Home from './Pages/Home';
import {DashboardHome} from "./Pages/DashboardHome"
import InterviewSession from './Components/InterviewSession';
import SingleReport from './newComponents/SingleReport';
import ReportsList from './newComponents/ReportsList';
import UserDashboard from './newComponents/UserDashboard';
import InterviewTypes from './newComponents/InterviewTypes';

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/" element={<Home />} />
            <Route path="/interview" element={<InterviewSession />} />
            <Route path="/reports" element={ <ReportsList /> } />
            <Route path="/singlereport" element={<SingleReport />} />
            <Route path="/userdashboard" element={<UserDashboard />} />
            <Route path="/interviewtypes" element={<InterviewTypes />} />
            <Route path="/newsignup" element={<Signup2 />} />
            <Route path="/newlogin" element={<Login2 />} />
        </Routes>
    </Router>
  );
}

export default App;

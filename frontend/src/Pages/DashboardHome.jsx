import { Header } from "../Components/Header";
import Dashboard  from "../Components/Dashboard";
import {ResumeUpload}  from "../Components/ResumeUpload";
import { useNavigate } from "react-router-dom";
import StartInterview from "../Components/StartInterview";
import { useState } from "react";

export function DashboardHome(){
    const navigate = useNavigate(); 
    const [page, setPage] = useState(1);

    function changeState(){
       setPage(0);
    }

    function changeState1(){
        setPage(1);
     }

    return <div className="overflow-x-hidden">
        {/* <div className="bg-white"> */}
        <div className="bg-[#0E1217]">
            <Header changeState1={changeState1} changeState={changeState} />
            {page == 1 ?  <Dashboard /> : <StartInterview /> }
        </div>
        {/* <button className="m-2" onClick={() => {
            navigate("/interview");
        }} > Take Interview </button> */}
    </div>
}
import Typewriter from 'typewriter-effect';
import arrow from "../assets/img/image.png"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Signup() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignup = async (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
          alert("Passwords do not match!");
          return;
      }
      
      const name = firstName + " " + lastName;
      const data = {
          "userdata" : {
              "name" : name,
              "email" : email,
              "password" : password, 
              "mobile" : mobile
          }
      };
      
      console.log(data);
      try {
          const response = await fetch('http://localhost:3000/user/signup', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json', 
              },
              body: JSON.stringify(data),
          });
  
          if (response.ok) {
              const result = await response.text(); 
              console.log("User signed up successfully:", result);
              alert("Signup successful!");
              navigate("/login");
          } else {
              console.error("Signup failed");
              alert("Signup failed!");
          }
      } catch (error) {
          console.error("Error signing up:", error);
      }
  };


  return (
    <div className="bg-red-500 w-full h-screen flex">
      <div className="bg-gradient-to-r flex flex-col pt-[150px] pl-10  text-black from-slate-200 to-blue-200 w-[100%] h-screen">
        {/* <span className=" font-poppins leading-tight text-5xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text transition-all duration-500 ease-in-out transform ">
          Interactive <br />
          Mock Interview <br />
          Platform
        </span>
            <div className=" text-lime-800  font-bold text-lg pt-2">
                <Typewriter
                     options={{
                        delay: 40, 
                    }}
                    onInit={(typewriter) => {
                    typewriter
                        .typeString('Your path to success through simulated, interactive interviews.')
                        .pauseFor(2500)
                        .deleteAll()
                        .start();
                    }}
                />
            </div> */}
      </div>

      {/* <div className="w-[40%] h-screen bg-gradient-to-r from-slate-300 to-slate-400 ">

      </div> */}

      <div className=" w-[450px] absolute top-1/2 left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-lg shadow-lg rounded-2xl p-8 border border-white/40 transition-all duration-500 ease-in-out hover:scale-105">
          <div className='flex'>
             <img className='w-8 h-7 pt-1' src={arrow} alt="arrow" />           
            <h2 className="text-2xl font-bold text-gray-700 mb-4"> Get started</h2>
          </div>

          <div className='mt-3 mb-5' >
            <h6 className='text-gray-700 text-lg font-bold '>Welcome to Mockmate!👋</h6>
            <p className='text-gray-700 text-sm '>Please create new account and start the adventure</p>
          </div>

          <div className='flex justify-between text-sm'>
            <div className='text-gray-700 pb-1'>First Name </div>
            <div className='text-gray-700 pb-1'>Last Name </div>
          </div>

         <div className='flex justify-between gap-3'>
            <input
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
                type="text"
                placeholder="First Name"
                className="w-full px-4 py-2 mb-3 bg-transparent border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <input
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              type="text"
              placeholder="Last Name"
              className="w-full px-4 py-2 mb-3 bg-transparent border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
         </div>

        <div className='text-gray-700 pb-1 text-sm'>Email </div>
          <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
            type="text"
            placeholder="Email"
            className="w-full px-4 py-2 mb-3 bg-transparent border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

        <div className='text-gray-700 pb-1 text-sm'>Mobile No. </div>
          <input
          onChange={(e) => {
            setMobile(e.target.value);
          }}
            type="text"
            placeholder="Mobile no."
            className="w-full px-4 py-2 mb-3 bg-transparent border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className='flex justify-between text-sm'>
            <div className='text-gray-700 pb-1'>Password </div>
            <div className='text-gray-700 pb-1'>Confirm Password </div>
        </div>

         <div className='flex justify-between gap-3'>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
                type="text"
                placeholder="Password"
                className="w-full px-4 py-2 mb-3 bg-transparent border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <input
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              type="text"
              placeholder="retype password"
              className="w-full px-4 py-2 mb-3 bg-transparent border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
         </div>
      
          <br />
          <button onClick={handleSignup} className="w-full bg-indigo-500 text-white py-2 rounded-md font-semibold hover:bg-indigo-600 transition-all">
            Sign In
          </button>
          
            <div className='text-gray-700 pt-3 flex items-center justify-center'>
                Already have an account?   <span className='text-blue-500 hover:cursor-pointer pl-1' onClick={() => {
                  navigate("/login");
                }} > login here</span>
            </div>
        </div>
    </div>
  );
}

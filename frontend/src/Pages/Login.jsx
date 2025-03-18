import Typewriter from 'typewriter-effect';
import arrow from "../assets/img/image.png"
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    useEffect(() => {
        if(localStorage.getItem("email")){
            navigate("/dashboard");
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
    
        const data = {
            "userdata": {
                "email": email,
                "password": password
            }
        };
    
        try {
            const response = await fetch('http://localhost:3000/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
    
            const result = await response.text(); 
    
            if (response.ok) {
                console.log("User logged in successfully:", result);
                localStorage.setItem("email", email);
                navigate("/dashboard");
                alert("Login successful!");
            } else {
                console.error("Login failed:", result);
                alert(`Login failed: ${result}`);
            }
        } catch (error) {
            console.error("Error logging in:", error);
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

      <div className="h-[430px] w-[450px] absolute top-1/2 left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-white/30 backdrop-blur-lg shadow-lg rounded-2xl p-8 border border-white/40 transition-all duration-500 ease-in-out hover:scale-105">
          <div className='flex'>
             <img className='w-8 h-7 pt-1' src={arrow} alt="arrow" />           
            <h2 className="text-2xl font-bold text-gray-700 mb-4">  Login </h2>
          </div>

          <div className='mt-3 mb-5' >
            <h6 className='text-gray-700 text-lg font-bold '>Welcome to Mockmate!👋</h6>
            <p className='text-gray-700 text-sm '>Please sign in to your account and start the adventure</p>
          </div>

          <div className='text-gray-700 pb-1'>Email </div>
          <input
            onChange={(e)=> {
                // console.log(e.target.value);
                setEmail(e.target.value);
            }}
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 mb-3 bg-transparent border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

         
        <div className='flex justify-between w-[100%] pb-1'>
            <span className='text-gray-700'>Password </span>
            <span className='text-blue-500 text-sm'>forgot password</span>
        </div>
          <input
             onChange={(e)=> {
                // console.log(e.target.value);
                setPassword(e.target.value);
            }}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 mb-3 bg-transparent border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <br />
          <button onClick={handleLogin} className="w-full bg-indigo-500 text-white py-2 rounded-md font-semibold hover:bg-indigo-600 transition-all">
            Sign In
          </button>
          
            <div className='text-gray-700 pt-3 flex items-center justify-center'>
                New on platform?   <span className='text-blue-500 hover:cursor-pointer pl-1 ' onClick={() =>{
                  navigate("/Signup");
                }} > create account</span>
            </div>
        </div>
    </div>
  );
}

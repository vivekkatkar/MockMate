import Typewriter from 'typewriter-effect';
import arrow from "../assets/img/image.png"
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (localStorage.getItem("email")) {
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
        <div className="bg-gray-900 w-full h-screen flex">
            <div className="bg-gradient-to-r flex flex-col pt-[150px] pl-10 text-white from-gray-800 to-gray-900 w-[100%] h-screen">
            </div>

            <div className="h-[430px] w-[450px] absolute top-1/2 left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-gray-800/80 backdrop-blur-lg shadow-lg rounded-2xl p-8 border border-gray-700 transition-all duration-500 ease-in-out hover:scale-105">
                <div className='flex'>
                    <img className='w-8 h-7 pt-1' src={arrow} alt="arrow" />
                    <h2 className="text-2xl font-bold text-white mb-4"> Login </h2>
                </div>

                <div className='mt-3 mb-5'>
                    <h6 className='text-white text-lg font-bold'>Welcome to Mockmate!👋</h6>
                    <p className='text-gray-400 text-sm'>Please sign in to your account and start the adventure</p>
                </div>

                <div className='text-gray-400 pb-1'>Email </div>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    placeholder="Username"
                    className="w-full px-4 py-2 mb-3 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <div className='flex justify-between w-[100%] pb-1'>
                    <span className='text-gray-400'>Password </span>
                    <span className='text-indigo-400 text-sm cursor-pointer'>Forgot password?</span>
                </div>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 mb-3 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <br />
                <button onClick={handleLogin} className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition-all">
                    Sign In
                </button>

                <div className='text-gray-400 pt-3 flex items-center justify-center'>
                    New on platform? <span className='text-indigo-400 hover:cursor-pointer pl-1' onClick={() => navigate("/Signup")}> Create account</span>
                </div>
            </div>
        </div>
    );
}

import Typewriter from 'typewriter-effect';
import arrow from "../assets/img/image.png"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Signup2() {
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
            "userdata": {
                "name": name,
                "email": email,
                "password": password,
                "mobile": mobile
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
        <div className="bg-gray-900 w-full h-screen flex">
            <div className="bg-gradient-to-r flex flex-col pt-[150px] pl-10 text-white from-gray-800 to-gray-900 w-[100%] h-screen">
            </div>

            <div className="w-[450px] absolute top-1/2 left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-gray-800/80 backdrop-blur-lg shadow-lg rounded-2xl p-8 border border-gray-700 transition-all duration-500 ease-in-out hover:scale-105">
                <div className='flex'>
                    <img className='w-8 h-7 pt-1' src={arrow} alt="arrow" />
                    <h2 className="text-2xl font-bold text-white mb-4"> Get started</h2>
                </div>

                <div className='mt-3 mb-5'>
                    <h6 className='text-white text-lg font-bold'>Welcome to Mockmate!👋</h6>
                    <p className='text-gray-400 text-sm'>Please create a new account and start the adventure</p>
                </div>

                <div className='flex justify-between text-sm'>
                    <div className='text-gray-400 pb-1'>First Name</div>
                    <div className='text-gray-400 pb-1'>Last Name</div>
                </div>

                <div className='flex justify-between gap-3'>
                    <input
                        onChange={(e) => setFirstName(e.target.value)}
                        type="text"
                        placeholder="First Name"
                        className="w-full px-4 py-2 mb-3 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    <input
                        onChange={(e) => setLastName(e.target.value)}
                        type="text"
                        placeholder="Last Name"
                        className="w-full px-4 py-2 mb-3 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className='text-gray-400 pb-1 text-sm'>Email</div>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    placeholder="Email"
                    className="w-full px-4 py-2 mb-3 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <div className='text-gray-400 pb-1 text-sm'>Mobile No.</div>
                <input
                    onChange={(e) => setMobile(e.target.value)}
                    type="text"
                    placeholder="Mobile no."
                    className="w-full px-4 py-2 mb-3 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <div className='flex justify-between text-sm'>
                    <div className='text-gray-400 pb-1'>Password</div>
                    <div className='text-gray-400 pb-1'>Confirm Password</div>
                </div>

                <div className='flex justify-between gap-3'>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 mb-3 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    <input
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password"
                        placeholder="Retype Password"
                        className="w-full px-4 py-2 mb-3 bg-gray-700 border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <br />
                <button onClick={handleSignup} className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition-all">
                    Sign Up
                </button>

                <div className='text-gray-400 pt-3 flex items-center justify-center'>
                    Already have an account? <span className='text-indigo-400 hover:cursor-pointer pl-1' onClick={() => navigate("/login")}>Login here</span>
                </div>
            </div>
        </div>
    );
}

import React from "react";
import botImage from "../assets/logo1.jpeg"; // Ensure this file exists
import interviewImage from "../assets/interview.jpeg"; // Use a valid image path
import { useNavigate } from "react-router-dom"
import { Vortex } from "../Components/vortex";
import styled from "styled-components";

import creator1Image from "../assets/creators/image.png"; 
import creator2Image from "../assets/creators/img2.jpeg";
import creator3Image from "../assets/creators/img3.jpg";
import Features from "../Components/Features";
import Card from "../Components/Card";
import "../App.css"

const Home = () => {
  const navigate = useNavigate(); 
  return (
    <div className="min-h-screen bg-[#0a0e14] text-white">
      
      <nav className="flex items-center justify-between px-6 py-4 bg-[#0a0e14]">
        <div className="flex items-center space-x-3">
          <img src={botImage} alt="Mock Mate Logo" className="h-10" />
          <span className="text-xl font-bold text-[#00BFFF]">Mock Mate</span>
        </div>
        <div className="space-x-8 text-lg">
          <a href="#features" className="hover:text-[#00BFFF]">Features</a>
          <a href="/Signup" className="hover:text-[#00BFFF]">Signup</a>
          <a href="/Login" className="hover:text-[#00BFFF]">Login</a>
          <a href="#contact" className="hover:text-[#00BFFF]">Contact Us</a> {/* New Contact Us link */}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="w-[calc(100%)] mx-auto rounded-md h-screen overflow-hidden bg-black">
        <Vortex
          backgroundColor="black"
          rangeY={800}
          particleCount={200}
          baseHue={120}
          className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
        >
          <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
            Elevate Your Interview Skills
          </h2>
          <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
            Prepare for your technical interviews with Mock Mate, where AI-powered mock interviews help you ace every question.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
            <button
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset] glow-effect"
              onClick={() => navigate("/Signup")}
            >
              Get Started
            </button>
          </div>
        </Vortex>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-[#121820] text-white" id="features">
        <h2 className="text-center text-3xl font-bold text-[#00BFFF] mb-12">What Makes Us Different</h2>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-12 px-6">

        <StyledWrapper>
          <div className="card">
            <div className="card__border" />
            <div className="card_title__container">
              <br /> <br />
              <div className="flex justify-center text-6xl text-[#00BFFF]">🎯</div>
              <p className="text-base sm:text-xl text-[#00BFFF] mt-4 mb-2 text-center">
              Realistic Interview Scenarios
              </p>
            </div>
            
            <hr className="line" />

            <p className="text-sm text-gray-400 text-center">
              AI-powered coding challenges simulating real interviews to boost your experience.
            </p>
            <br />    <br />  <br /> <br />
          </div>
        </StyledWrapper>

        <StyledWrapper>
          <div className="card">
            <div className="card__border" />
            <div className="card_title__container">
              <br /> <br />
              <div className="flex justify-center text-6xl text-[#00BFFF]">📈</div>
              <p className="text-base sm:text-xl text-[#00BFFF] mt-4 mb-2 text-center">
              Advanced Analytics
              </p>
            </div>
            
            <hr className="line" />

            <p className="text-sm text-gray-400 text-center">
            Track your performance and get insights on areas to improve and maximize preparation efficiency.
            </p>
            <br />    <br />  <br />
          </div>
        </StyledWrapper>

        <StyledWrapper>
          <div className="card">
            <div className="card__border" />
            <div className="card_title__container">
              <br /> <br />
              <div className="flex justify-center text-6xl text-[#00BFFF]">🏆</div>
              <p className="text-base sm:text-xl text-[#00BFFF] mt-4 mb-2 text-center">
              Build Confidence
              </p>
            </div>
            
            <hr className="line" />

            <p className="text-sm text-gray-400 text-center">
            Practice with challenging questions, receive feedback, and gain confidence to tackle interviews.
            </p>
            <br />    <br />  <br />
          </div>
        </StyledWrapper>

        </div>
      </div>


      {/* creators */}
      <div className="py-20 bg-[#0a0e14] text-white" id="creators">
        <h2 className="text-center text-3xl font-bold text-[#00BFFF] mb-12">Meet the Creators</h2>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-12 px-6">
          <StyledWrapper>
            <div className="package">
              <div className="package2">
              <img src={creator3Image} alt="Creator 1" className="w-32 h-32 mx-auto rounded-full mb-4" />
              <h3 className="text-xl font-semibold text-[#00BFFF]">Pratiksha Hire</h3>
              <a
                href="https://www.linkedin.com/in/pratiksha-hire-441182267/"
                className="text-blue-400 hover:text-blue-500 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              </div>
            </div>
          </StyledWrapper>

          <StyledWrapper>
            <div className="package">
              <div className="package2">
              <img src={creator1Image} alt="Creator 1" className="w-32 h-32 mx-auto rounded-full mb-4" />
              <h3 className="text-xl font-semibold text-[#00BFFF]">Vivek Katkar</h3>
              <a
                href="https://www.linkedin.com/in/vivek-katkar-81a4b41b4/"
                className="text-blue-400 hover:text-blue-500 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              </div>
            </div>
          </StyledWrapper>

          <StyledWrapper>
            <div className="package">
              <div className="package2">
              <img src={creator2Image} alt="Creator 1" className="w-32 h-32 mx-auto rounded-full mb-4" />
              <h3 className="text-xl font-semibold text-[#00BFFF]">Vaishnavi Yadav</h3>
              <a
                href="https://www.linkedin.com/in/vaishnavi-yadav-652430267/"
                className="text-blue-400 hover:text-blue-500 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              </div>
            </div>
          </StyledWrapper>


        </div>
      </div>

      {/* Contact Us Section */}
      <div className="py-20 bg-[#0e1217] text-white" id="contact">
        <h2 className="text-center text-3xl font-bold text-[#00BFFF] mb-12">Contact Us</h2>
        <div className="flex flex-col items-center space-y-6 px-6">
          <p className="text-gray-400 text-lg text-center max-w-lg">
            Have any questions or need help? We are here for you! Feel free to reach out to us via the form below.
          </p>
          <form className="w-full max-w-md space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 bg-[#1a1f26] text-white border border-[#00BFFF] rounded-lg"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 bg-[#1a1f26] text-white border border-[#00BFFF] rounded-lg"
            />
            <textarea
              placeholder="Your Message"
              className="w-full p-3 bg-[#1a1f26] text-white border border-[#00BFFF] rounded-lg"
              rows="4"
            ></textarea>
            <button className="w-full bg-[#00BFFF] text-white py-2 px-6 rounded-lg hover:bg-[#00BFFF] transition">
              Send Message
            </button>
          </form>
        </div>
      </div>

      
    </div>
  );
};


const StyledWrapper = styled.div`
.card {
  --white: hsl(0, 0%, 100%);
  --black: hsl(240, 15%, 9%);
  --paragraph: hsl(0, 0%, 83%);
  --line: hsl(240, 9%, 17%);
  --primary: hsl(189, 92%, 58%);

  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding: 1rem;
  width: 19rem;
  background-color: hsla(240, 15%, 9%, 1);
  background-image: radial-gradient(
      at 88% 40%,
      hsla(240, 15%, 9%, 1) 0px,
      transparent 85%
    ),
    radial-gradient(at 49% 30%, hsla(240, 15%, 9%, 1) 0px, transparent 85%),
    radial-gradient(at 14% 26%, hsla(240, 15%, 9%, 1) 0px, transparent 85%),
    radial-gradient(at 0% 100%, #00BFFF 0%, transparent 2%), /* Bottom color constrained to 25% */
    radial-gradient(at 41% 94%, hsl(189, 97%, 36%) 0px, transparent 85%),
    radial-gradient(at 100% 99%, hsl(188, 94%, 13%) 0px, transparent 85%);

  border-radius: 1rem;
  box-shadow: 0px -16px 24px 0px rgba(255, 255, 255, 0.25) inset;
}


.card .card__border {
  overflow: hidden;
  pointer-events: none;

  position: absolute;
  z-index: -10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: calc(100% + 2px);
  height: calc(100% + 2px);
  background-image: linear-gradient(
    0deg,
    hsl(0, 0%, 100%) -50%,
    hsl(0, 0%, 40%) 100%
  );

  border-radius: 1rem;
}

.card .card__border::before {
  content: "";
  pointer-events: none;

  position: fixed;
  z-index: 200;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%), rotate(0deg);
  transform-origin: left;

  width: 200%;
  height: 10rem;
  background-image: linear-gradient(
    0deg,
    hsla(0, 0%, 100%, 0) 0%,
    hsl(189, 100%, 50%) 40%,
    hsl(189, 100%, 50%) 60%,
    hsla(0, 0%, 40%, 0) 100%
  );

  animation: rotate 8s linear infinite;
}

@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}

.card .card_title__container .card_title {
  font-size: 1rem;
  color: var(--white);
}

.card .card_title__container .card_paragraph {
  margin-top: 0.25rem;
  width: 65%;

  font-size: 0.5rem;
  color: var(--paragraph);
}

.card .line {
  width: 100%;
  height: 0.1rem;
  background-color: var(--line);

  border: none;
}

.card .card__list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.card .card__list .card__list_item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.card .card__list .card__list_item .check {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 1rem;
  height: 1rem;
  background-color: var(--primary);

  border-radius: 50%;
}

.card .card__list .card__list_item .check .check_svg {
  width: 0.75rem;
  height: 0.75rem;

  fill: var(--black);
}

.card .card__list .card__list_item .list_text {
  font-size: 0.75rem;
  color: var(--white);
}

.card .button {
  cursor: pointer;

  padding: 0.5rem;
  width: 100%;
  background-image: linear-gradient(
    0deg,
    hsl(189, 92%, 58%),
    hsl(189, 99%, 26%) 100%
  );

  font-size: 0.75rem;
  color: var(--white);

  border: 0;
  border-radius: 9999px;
  box-shadow: inset 0 -2px 25px -4px var(--white);
}

.package {
  width: 200px;
  height: 254px;
  // background-image: linear-gradient(163deg, #ff00ff 0%, #3700ff 100%);
  border-radius: 20px;
  text-align: center;
  transition: all 0.25s cubic-bezier(0, 0, 0, 1);
  filter: drop-shadow(0px 0px 10px rgba(0, 191, 255, 0.5))
}

.package:hover {
  filter: drop-shadow(0px 0px 15px rgba(0, 191, 255, 0.5))
}

.package2 {
  width: 200px;
  height: 254px;
  background-color: black;
  border-radius: 10px;
  transition: all 0.25s cubic-bezier(0, 0, 0, 1);
  padding: 15px;
  cursor: pointer;
}

.package2:hover {
  transform: scale(0.98);
  border-radius: 18px;
}

.text {
  color: white;
  font-size: 17px;
}


`;


export default Home;

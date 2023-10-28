import React, { useState } from "react";
import "./index.css"; 
import SignInForm from "../../components/SignIn";
import SignUpForm from "../../components/SignUp";

export default function App() {
  const [type, setType] = useState("signIn");
  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const containerClass = "container " + (type === "signUp" ? "right-panel-active" : "");
  return (
    <div className=" bg-gray-100 flex justify-center items-center flex-col  h-screen -mt-[20px] mb-[50px] m-[8px]">
      <div className={containerClass} id="container1">
        <SignUpForm />
        <SignInForm />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="font-bold m-0 text-[2em]">Welcome Back!</h1>
              <p className="text-sm font-light mt-5 mb-7 tracking-wide">
                To keep connected with us please login with your personal info
              </p>
              <button
                className="border border-white text-white bg-transparent hover:bg-white hover:text-red-500 font-bold uppercase py-2 px-4 rounded-full transform hover:scale-95 transition duration-80 focus:outline-none"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="font-bold m-0 text-[2em]">Hello, Friend!</h1>
              <p className="text-sm font-light mt-5 mb-7 tracking-wide">
                Enter your personal details and start the journey with us
              </p>
              <button
                className="border border-white text-white bg-transparent hover:bg-white hover:text-red-500 font-bold uppercase py-2 px-4 rounded-full transform hover:scale-95 transition duration-80 focus:outline-none"
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


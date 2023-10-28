import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [state, setState] = useState({
    email: "",
    password: ""
  });
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate("");

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState({
      ...state,
      [name]: value
    });
  };

  const handleOnSubmit = (evt) => {
    evt.preventDefault();

    const { email, password } = state;

    // Prepare the data to send in the POST request
    const userData = {
      email: email,
      password: password
    };

    axios
      .post("http://127.0.0.1:8000/user/login/", userData)
      .then((response) => {
        // Handle the response data here
        const responseData = response.data;
        if (responseData.message === "incorrect password") {
          setResponseMessage("Incorrect password. Please try again.");
        } else if (responseData.message === "user does not exist") {
          setResponseMessage("User does not exist. Please sign up.");
        } else {
          // Store the user's data in local storage
          localStorage.setItem("userData", JSON.stringify(responseData));

          navigate("/home");
          setResponseMessage("Sign in successful.");
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });

    // Clear the input fields
    setState({
      email: "",
      password: ""
    });
  };

  return (
    <div className="form-container sign-in-container right-panel-active">
      <form onSubmit={handleOnSubmit} className="bg-white flex items-center justify-center flex-col px-10 h-full text-center">
        <h1 className="font-bold text-2xl text-center">Sign In</h1>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
          className="border-none px-[15px] py-[12px] my-[8px] w-full bg-[#eee]"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
          className="border-none px-[15px] py-[12px] my-[8px] w-full bg-[#eee]"
        />
        <button
          type="submit"
          className="rounded-[20px] border border-solid border-[#ff4b2b] bg-[#ff4b2b] text-[#fff] font-bold text-[12px] uppercase py-[12px] px-[45px] tracking-wider transform transition-transform duration-80 ease-in"
        >
          Sign In
        </button>
        {responseMessage && <p className="text-red-500 mt-2">{responseMessage}</p>}
      </form>
    </div>
  );
}

export default SignIn;

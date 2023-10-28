import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [state, setState] = useState({
    Name: "",
    email: "",
    username: "",
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

    const { Name, email, username, password } = state;

    // Split the "Name" into "first_name" and "last_name"
    const [first_name, last_name] = Name.split(" ");

    // Prepare the data to send in the POST request
    const userData = {
      email: email,
      first_name: first_name,
      last_name: last_name,
      username: username,
      password: password
    };

    axios
      .post("http://127.0.0.1:8000/user/create/", userData)
      .then((response) => {
        // Handle the response data here
        const responseData = response.data;
        if (responseData.message === "User created successfully") {
          setResponseMessage(responseData.message);

          // Store the user's signup data in local storage
          localStorage.setItem("userData", JSON.stringify(userData));

          navigate("/home");
        } else {
          setResponseMessage(responseData.message);
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
      Name: "",
      email: "",
      username: "",
      password: ""
    });
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit} className="bg-white flex items-center justify-center flex-col px-10 h-full text-center">
        <h1 className="font-bold text-2xl">Create Account</h1>
        <input
          type="text"
          name="Name"
          value={state.Name}
          onChange={handleChange}
          placeholder="Name"
          className="border-none px-[15px] py-[12px] my-[8px] w-full bg-[#eee]"
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
          className="border-none px-[15px] py-[12px] my-[8px] w-full bg-[#eee]"
        />
        <input
          type="text"
          name="username"
          value={state.username}
          onChange={handleChange}
          placeholder="Username"
          className="border-none px-[15px] py-[12px] my-[8px] w-full bg-[#eee]"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Password"
          className="border-none px-[15px] py-[12px] my-[8px] w-full bg-[#eee]"
        />
        <button
          type="submit"
          className="rounded-[20px] border border-solid border-[#ff4b2b] bg-[#ff4b2b] text-[#fff] font-bold text-[12px] uppercase py-[12px] px-[45px] tracking-wider transform transition-transform duration-80 ease-in"
        >
          Sign Up
        </button>
        {responseMessage && <p className="text-red-500 mt-2">{responseMessage}</p>}
      </form>
    </div>
  );
}

export default SignUp;

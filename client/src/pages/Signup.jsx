import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import ButtonComponent from "../components/ButtonComponent";
import BottomWarning from "../components/BottomWarning";
import axios from 'axios'
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [firstName,setFirstName] = useState('')
  const [lastName,setLastName] = useState('')
  const [userName,setUserName] = useState('')
  const [password,setPassword] = useState('')
  const [notification,setNotification] = useState('')
  const [isError,setIsError] = useState(false)
  const navigate = useNavigate()
  

  const handleSignup = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${API_URL}/api/v1/user/signup`, {
        userName,
        firstName,
        lastName,
        password,
      });

      // if sign-up successful
      localStorage.setItem("token", response.data.token);
      setNotification("Sign-up Successful! Redirecting...")
      setIsError(false)
      
      setTimeout(() => {
        navigate("/home");
      }, 1500);

    } catch (error) {
      setNotification(
        error.response?.data?.message || "Sign-in failed. Please try again."
      )
      setIsError(true)
    }
  };


  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label="Sign up" />
          <SubHeading label="Enter your information to create an account" />
          <InputBox
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            type="input"
            label="First Name"
            placeholder="John"
          />
          <InputBox
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            type="input"
            label="Last Name"
            placeholder="Doe"
          />
          <InputBox
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            type="input"
            label="Email"
            placeholder="johndoe@example.com"
          />
          <InputBox
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            label="Password"
          />
          <div className="pt-4">
            <ButtonComponent
              onClick={handleSignup}
              label={"Sign up"}
            />
          </div>
          <BottomWarning
            to={"/"}
            label="Already have an account?"
            toText="Sign in"
          />

          {/* Notification section */}
          {notification && (
            <div
              className={`mt-4 p-3 rounded-lg text-center ${
                isError
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {notification}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;

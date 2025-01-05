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
  const navigate = useNavigate()
  
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label="Sign up" />
          <SubHeading label="Enter your information to create an account" />
          <InputBox onChange={(e) => {
            setFirstName(e.target.value)
          }} type="input" label="First Name" placeholder="John" />
          <InputBox onChange={(e) => {
            setLastName(e.target.value)
          }}  type="input" label="Last Name" placeholder="Doe" />
          <InputBox onChange={(e) => {
            setUserName(e.target.value)
          }}
            type="input"
            label="Email"
            placeholder="johndoe@example.com"
          />
          <InputBox onChange={(e) => {
            setPassword(e.target.value)
          }} type="password" label="Password" />
          <div className="pt-4">
            <ButtonComponent onClick={async()=>{
              const response = await axios.post("http://localhost:1001/api/v1/user/signup",{
                userName,
                firstName,
                lastName,
                password,
              })
              localStorage.setItem("token",response.data.token) 
              navigate('/dashboard')
            }} label={"Sign up"} />
          </div>
          <BottomWarning
            to={"/signin"}
            label="Already have an account?"
            toText="Sign in"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;

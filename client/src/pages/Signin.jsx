import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import ButtonComponent from "../components/ButtonComponent";
import BottomWarning from "../components/BottomWarning";
import {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Signin = () => {
  const navigate = useNavigate()
  const [userName,setUserName] = useState("")
  const [password,setPassword] = useState("") 
  const [notification,setNotification] = useState('')
  const [isError,setIsError] = useState(false)

  const handleSignin = async() =>{
    try{
        const API_URL = import.meta.env.VITE_API_URL;
        const response = await axios.post(`${API_URL}/api/v1/user/signin`,{
          userName,
          password
        })

        // if sign-in successful
        localStorage.setItem("token",response.data.token)
        setNotification("Sign-in successful! Redirecting!")
        setIsError(false)

        setTimeout(()=>{
          navigate('/home')
        },1500)
    }catch(error){
      setNotification(
        error.response?.data?.message || "Sign-in failded. Please try again."
      );
      setIsError(true)
    }
  }
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label="Sign in" />
          <SubHeading label="  Enter your credentials to access your account" />
          <InputBox
            type="input"
            label="Email"
            placeholder="johndoe@example.com"
            value={userName}
            onChange={(e)=>{
              setUserName(e.target.value)
            }}
          />
          <InputBox type="password" label="Password"
              value={password}
              onChange={(e)=>{
              setPassword(e.target.value)
            }}
           />
          <div className="pt-4">
            <ButtonComponent onClick={handleSignin} label="Sign in" />
          </div>
          <BottomWarning
            to={"/signup"}
            label="Don't have an account?"
            toText="Sign up"
          />

          {/* Notification section */}
          {notification && (
            <div 
              className={`mt-4 p-3 rounded-lg text-center ${
                isError ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
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

export default Signin;

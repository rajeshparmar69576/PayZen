import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import ButtonComponent from "../components/ButtonComponent";
import BottomWarning from "../components/BottomWarning";

const Signup = () => {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label="Sign up" />
          <SubHeading label="Enter your information to create an account" />
          <InputBox type="input" label="First Name" placeholder="John" />
          <InputBox type="input" label="Last Name" placeholder="Doe" />
          <InputBox
            type="input"
            label="Email"
            placeholder="johndoe@example.com"
          />
          <InputBox type="password" label="Password" />
          <div className="pt-4">
            <ButtonComponent label="Sign up" />
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

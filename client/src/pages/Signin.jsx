import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import ButtonComponent from "../components/ButtonComponent";
import BottomWarning from "../components/BottomWarning";

const Signin = () => {
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
          />
          <InputBox type="password" label="Password" />
          <div className="pt-4">
            <ButtonComponent label="Sign in" />
          </div>
          <BottomWarning
            to={"/signup"}
            label="Don't have an account?"
            toText="Sign up"
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;

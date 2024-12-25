import { useState } from "react";
import { BottomWarning } from "../Components/BottonWarning";
import { Button } from "../Components/Button";
import { Heading } from "../Components/Heading";
import { InputBox } from "../Components/InputBox";
import { SubHeading } from "../Components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!username || !firstname || !lastname || !password) {
      alert("All fields are required!");
      return;
    }

    const signupData = { username, firstname, lastname, password };

    try {
      setLoading(true);
      const response = await axios.post("https://paytm-backend-pearl.vercel.app/api/v1/users/signup", signupData);
      localStorage.setItem("token", response.data.token);
      alert("Signup successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center w-full max-w-sm p-4">
        <div className="rounded-lg bg-white w-full text-center p-6 sm:p-8 shadow-lg">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your information to create an account"} />

          <InputBox
            onChange={(e) => setUsername(e.target.value)}
            placeholder="goku"
            label={"Username"}
          />

          <InputBox
            onChange={(e) => setFirstname(e.target.value)}
            placeholder="John"
            label={"First Name"}
          />

          <InputBox
            onChange={(e) => setLastname(e.target.value)}
            placeholder="Doe"
            label={"Last Name"}
          />

          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            placeholder="123456"
            label={"Password"}
            type="password"
          />

          <div className="pt-4">
            <Button
              onClick={handleSignup}
              label={loading ? "Signing up..." : "Sign up"}
              disabled={loading}
            />
          </div>

          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};

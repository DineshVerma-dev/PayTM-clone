import { useState } from "react";
import { BottomWarning } from "../Components/BottonWarning";
import { Button } from "../Components/Button";
import { Heading } from "../Components/Heading";
import { InputBox } from "../Components/InputBox";
import { SubHeading } from "../Components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleSignin = async () => {
    setError(""); 
    if (!username || !password) {
      setError("Both fields are required!");
      return;
    }

    setLoading(true); 
    try {
      const response = await axios.post(
        "https://paytm-backend-pearl.vercel.app/api/v1/users/signin",
        {
          username,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);

      navigate("/dashboard");
    } catch (error) {
      console.error("Signin failed:", error.response?.data || error.message);
      setError(
        error.response?.data?.message || "Invalid credentials, please try again."
      );
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="bg-slate-300 min-h-screen flex justify-center items-center p-4">
      <div className="flex flex-col justify-center w-full max-w-md">
        <div className="rounded-lg bg-white w-full text-center p-6 md:p-8 lg:p-10">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <InputBox
            onChange={(e) => setUsername(e.target.value)}
            placeholder="john"
            label={"Username"}
          />

          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            placeholder="123456"
            label={"Password"}
            type="password"
          />

          <div className="pt-4">
            <Button
              onClick={handleSignin}
              label={loading ? "Signing in..." : "Sign in"} 
              disabled={loading} 
            />
          </div>

          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};

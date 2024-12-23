// import { useState } from "react"
// import { BottomWarning } from "../Components/BottonWarning"
// import { Button } from "../Components/Button"
// import { Heading } from "../Components/Heading"
// import { InputBox } from "../Components/InputBox"
// import { SubHeading } from "../Components/SubHeading"
// import axios from "axios";
// import { useNavigate } from "react-router-dom"

// export const Signup = () => {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   return <div className="bg-slate-300 h-screen flex justify-center">
//     <div className="flex flex-col justify-center">
//       <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
//         <Heading label={"Sign up"} />
//         <SubHeading label={"Enter your infromation to create an account"} />
//         <InputBox onChange={(e) => {
//           setFirstName(e.target.value);
//         }} placeholder="John" label={"username"} />
//         <InputBox onChange={(e) => {
//           setLastName(e.target.value);
//         }} placeholder="Doe" label={"first Name"} />
//         <InputBox onChange={(e) => {
//           setUsername(e.target.value);
//         }} placeholder="goku" label={"last name"} />
//         <InputBox onChange={(e) => {
//           setPassword(e.target.value)
//         }} placeholder="123456" label={"Password"} />
//         <div className="pt-4">
//           <Button onClick={async () => {
//             const response = await axios.post("http://localhost:5000/api/v1/users/signup", {
//               username,
//               firstName,
//               lastName,
//               password
//             });
//             localStorage.setItem("token", response.data.token)
//             navigate("/dashboard")
//           }} label={"Sign up"} />
//         </div>
//         <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
//       </div>
//     </div>
//   </div>
// }



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
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!username || !firstname || !lastname || !password) {
      alert("All fields are required!");
      return;
    }

    console.log("Sending data:", { username, firstname, lastname, password });

    try {
      const response = await axios.post("/api/v1/users/signup", {
        username,
        firstname,
        lastname,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
      console.log("Sending data:", { username, firstname, lastname, password });
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Signup failed!");
      console.log("Sending data:", { username, firstname, lastname, password });
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox
            onChange={(e) => setUsername(e.target.value)}
            placeholder="goku"
            label={"Username"}
          />
          <InputBox
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="John"
            label={"First Name"}
          />
          <InputBox
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Doe"
            label={"Last Name"}
          />

          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            placeholder="123456"
            label={"Password"}
          />
          <div className="pt-4">
            <Button onClick={handleSignup} label={"Sign up"} />
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

import React, { useContext, useState, useEffect } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  LineText,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./AccountContext";
import { register } from "../../services/auth";
import { useNavigate } from "react-router-dom"; 


export function SignupForm() {
  const { switchToSignin } = useContext(AccountContext);
  const navigate = useNavigate(); 


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigate("/dashboard");
    }
  }, []);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await register(name, email, password);
  
      setMessage(response.message);
      localStorage.setItem("user", JSON.stringify(response.user)); // Store user details
      navigate("/dashboard", { state: { userDetails: response.user } });
    } catch (error) {
      setError(error.response.data.error || "Registration failed.");
    }
  };

  return (
    <BoxContainer>
      <FormContainer onSubmit={handleRegister}>
        <Input
          type="text"
          value={name}
          name="name"
          placeholder="Full name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name="email"
          placeholder="Email"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          placeholder="Password"
        />
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm password"
        />
        <Marginer direction="vertical" margin={10} />
        <SubmitButton type="submit">Signup</SubmitButton>
      </FormContainer>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <Marginer direction="vertical" margin="5px" />
      <LineText>
        Already have an account?{" "}
        <BoldLink onClick={switchToSignin} href="#">
          Signin
        </BoldLink>
      </LineText>
    </BoxContainer>
  );
}

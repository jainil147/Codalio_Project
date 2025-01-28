import React, { useContext, useState } from "react";
import { AccountContext } from "./AccountContext"; // Make sure this import path is correct
import { login } from "../../services/auth"; // Assuming you have a login function in services
import {
  BoxContainer,
  FormContainer,
  Input,
  SubmitButton,
  LineText,
  BoldLink,
  MutedLink,
} from "./common"; // Adjust paths as necessary
import { Marginer } from "../marginer";

export function LoginForm() {
  const { switchToSignup } = useContext(AccountContext); // Access context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Call the login API
      const response = await login(email, password); // Handle login request
      setMessage(response.message);
      // Redirect or handle successful login here (navigate to dashboard)
    } catch (error) {
      setMessage(error.response?.data?.error || "An error occurred");
    }
  };

  return (
    <BoxContainer>
      <FormContainer onSubmit={handleLogin}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <SubmitButton type="submit">Signin</SubmitButton>
      </FormContainer>
      <Marginer direction="vertical" margin={20} />
      <MutedLink href="#">Forgot your password?</MutedLink>
      {message && <p>{message}</p>}
      <Marginer direction="vertical" margin="1.6em" />
      <LineText>
        Don't have an account?{" "}
        <BoldLink onClick={switchToSignup} href="#">
          Signup
        </BoldLink>
      </LineText>
    </BoxContainer>
  );
}

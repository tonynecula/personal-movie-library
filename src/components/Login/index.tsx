import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Import API functions here

import styled from "styled-components";
import { login, signUp } from "../../network/backend-api";

function Login() {
  const [mode, toggleMode] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const user = await login({ email, password });
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/"); // Redirect to the home page or desired route after successful login
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleSignUp = async () => {
    try {
      const user = await signUp({ username, email, password });
      localStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/"); // Redirect to the home page or desired route after successful sign-up
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (mode) {
      handleLogin();
    } else {
      handleSignUp();
    }
  };

  return (
    <Container>
      <Content>
        <header>
          <h1>{mode ? "Welcome back!" : "Hey There!"}</h1>
          <Switch>
            <span>{mode ? "Don't" : "Already"} have an account?</span>
            <input
              type="checkbox"
              id="checkbox1"
              onClick={() => toggleMode(!mode)}
            />
            <label htmlFor="checkbox1"></label>
          </Switch>
        </header>
        <LoginForm
          mode={mode}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          username={username}
          setUsername={setUsername}
          onSubmit={handleSubmit}
        />
      </Content>
    </Container>
  );
}

interface LoginFormProps {
  mode: boolean;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

function LoginForm({
  mode,
  email,
  setEmail,
  password,
  setPassword,
  username,
  setUsername,
  onSubmit,
}: LoginFormProps) {
  return (
    <Form onSubmit={onSubmit}>
      <div>
        <div>
          <InputIcon style={{ display: !mode ? "none" : "" }}>
            <i className="fa fa-user" />
            <Input
              type="email"
              id="email"
              placeholder="Email Address"
              disabled={!mode}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputIcon>
          <InputIcon style={{ display: !mode ? "none" : "" }}>
            <i className="fa fa-key" />
            <Input
              type="password"
              id="password"
              placeholder="Password"
              disabled={!mode}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputIcon>
        </div>
        <div>
          <InputIcon style={{ display: mode ? "none" : "" }}>
            <i className="fa fa-user" />
            <Input
              type="text"
              id="fullname"
              placeholder="Your Name"
              disabled={mode}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </InputIcon>
          <InputIcon style={{ display: mode ? "none" : "" }}>
            <i className="fa fa-at" />
            <Input
              type="email"
              id="email"
              placeholder="Email Address"
              disabled={mode}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputIcon>
          <InputIcon style={{ display: mode ? "none" : "" }}>
            <i className="fa fa-key" />
            <Input
              type="password"
              id="createpassword"
              placeholder="Password"
              disabled={mode}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputIcon>
          <InputIcon style={{ display: mode ? "none" : "" }}>
            <i className="fa fa-key" />
            <Input
              type="password"
              id="repeatpassword"
              placeholder="Repeat Password"
              disabled={mode}
            />
          </InputIcon>
        </div>
      </div>
      <Button type="submit">{mode ? "Log In" : "Sign Up"}</Button>
    </Form>
  );
}
export default Login;

const Container = styled.div`
  position: relative;
  height: calc(100vh - 140px);
  display: flex;
  align-items: center;
  justify-content: center;

  &:before {
    background-position: top;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url("/images/login-bg.jpg");
    position: absolute;
    content: "";
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
  }
`;

const Content = styled.div`
  max-width: 650px;
  padding: 50px 40px;
  width: 80%;
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  overflow: hidden;

  @media (max-width: 900px) {
    width: 90%;
  }
`;

const InputIcon = styled.div`
  i {
    position: absolute;
    padding: 15px 10px;
    text-align: center;
    color: rgb(249, 249, 249, 0.8);
  }
`;

const Input = styled.input`
  width: 100%;
  color: white;
  margin-bottom: 15px;
  font-size: 16px;
  padding: 15px 0;
  padding-right: 15px;
  padding-left: 45px;
  background: #333;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: $borderRadius;
  &:focus {
    color: white;
    outline: white;
    border: 1px solid #fff;
  }
`;

const Button = styled.button`
  width: 100%;
  color: #f9f9f9;
  background-color: #1f80e0;
  font-weight: bold;
  padding: 17px 0;
  border: none;
  border-radius: 4px;
  text-align: center;
  font-size: 18px;
  cursor: pointer;
  transition: all 250ms;
  // letter-spacing: 1.5px;
  margin-top: 8px;
  margin-bottom: 12px;

  &:hover {
    background: #0483ee;
  }
`;

const Switch = styled.div`
  position: relative;

  label {
    cursor: pointer;
    position: absolute;
    background-color: white;
    border-radius: 50px;
    width: 55px;
    height: 23px;
    top: 0;
    right: 0;
  }

  label:after {
    content: "";
    width: 21px;
    height: 21px;
    border-radius: 50px;
    position: absolute;
    background-color: #1f80e0;
    transition: all 0.2s;
    top: 1px;
    left: 1px;
  }

  input[type="checkbox"] {
    visibility: hidden;
  }

  input[type="checkbox"]:checked + label {
    background-color: white;
  }

  input[type="checkbox"]:checked + label:after {
    left: 33px;
  }
`;

const Form = styled.form`
  margin-top: 30px;
`;

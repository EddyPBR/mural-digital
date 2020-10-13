import React, { useState, FormEvent } from "react";
import styled from "styled-components";

import Input from "../../components/Input";

const Admin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (event: FormEvent) => {
    event.preventDefault();

    console.log({
      email,
      password,
    });
    
  };

  return (
    <Login>
      <Form onSubmit={(event) => handleLogin(event)}>
        <Title>Administração</Title>
        <Input
          type="email"
          name="email"
          label="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          type="password"
          name="password"
          label="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button type="button" onClick={(event) => handleLogin(event)}>ACESSAR</Button>
      </Form>
    </Login>
  );
};

const Login = styled.div`
  background:none;
  padding: 0;
  border: 0;
  box-shadow: none;
  background-color: none !important;

  height: calc(100vh - 30px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  width: 90vw;
  max-width: 44rem;
  min-height: 38rem;
  background-color: #fff;
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 0rem 3rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font: 700 2.4rem "Open Sans", sans-serif;
  color: var(--color-title);
  margin-bottom: 2rem;

  @media(max-width: 520px) {
    font-size: 2rem;
  }
`;

const Button = styled.button`
  width: 90vw;
  max-width: 17rem;
  height: 5rem;
  margin-top: 1rem;
  margin-bottom: 3rem;
  background: linear-gradient(94.19deg, #4E4EA2 0%, #2E2E7A 100%);
  font: 400 1.8rem "Roboto", sans-serif;
  color: var(--color-background);
  letter-spacing: .1rem;
  box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  transition: .2s filter, .2s box-shadow;
  cursor: pointer;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &&:hover {
    filter: brightness(1.2);
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  }

  @media(max-width: 520px) {
    width: 14rem;
    height: 4.6rem;
    font-size: 1.6rem;
  }
`;

export default Admin;

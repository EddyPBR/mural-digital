import React, { useState, FormEvent } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import Input from "../../components/Input";

import api from "../../services/api";

import { login } from "../../utils/Login";

const Admin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [statusEmail, setStatusEmail] = useState(["", ""]);
  const [password, setPassword] = useState("");
  const [statusPassword, setStatusPassword] = useState(["", ""]);

  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const verifyData = () => {
    setStatusEmail(["", ""]);
    setStatusPassword(["", ""]);

    const errors = [];
    if (!email.includes("@") || email.length <= 3) {
      errors.push("email bad formated");
      setStatusEmail(["error", "email mal formatado"]);
    }
    if (email === "") {
      errors.push("email is empty");
      setStatusEmail(["error", "campo é obrigatório"]);
    }
    if (password === "") {
      errors.push("password is empty");
      setStatusPassword(["error", "campo é obrigatório"]);
    }
    return errors.length === 0 ? true : false;
  };

  const handleLogin = (event: FormEvent) => {
    event.preventDefault();

    if (!verifyData()) return;

    setIsLoading(true);

    api
      .post("/auth", { email, password })
      .then((response) => {
        login(response.data.token);
        setStatus("");
        setIsLoading(false);
        history.push("/admin/announces");
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response.status === 401) {
          if (error.response.data.message === "invalid email") {
            return setStatus("Email inválido :(");
          }
          if (error.response.data.message === "invalid password") {
            return setStatus("Senha incorreta :(");
          }
        }
        if (error.response.status === 500) {
          return setStatus("Erro interno do servidor, tente novamente :(");
        }
        return setStatus("Ops! ocorreu um erro, tente novamente");
      });
  };

  return (
    <Login>
      {status !== "" && (
        <ErrorBox>
          <Message>{status}</Message>
        </ErrorBox>
      )}
      <Form onSubmit={(event) => handleLogin(event)} method="POST">
        <Title>Administração</Title>
        <Input
          type="email"
          name="email"
          label="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={statusEmail[0] === "error" ? true : false}
          message={statusEmail[1]}
        />
        <Input
          type="password"
          name="password"
          label="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={statusPassword[0] === "error" ? true : false}
          message={statusPassword[1]}
        />
        <Button type="submit" disabled={isLoading ? true : false}>
          ACESSAR
        </Button>
      </Form>
    </Login>
  );
};

const Login = styled.div`
  background: none;
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
  @media (max-width: 520px) {
    font-size: 2rem;
  }
`;

const Button = styled.button`
  width: 90vw;
  max-width: 17rem;
  height: 5rem;
  margin-top: 1rem;
  margin-bottom: 3rem;
  background: linear-gradient(94.19deg, #4e4ea2 0%, #2e2e7a 100%);
  font: 400 1.8rem "Roboto", sans-serif;
  color: var(--color-background);
  letter-spacing: 0.1rem;
  box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  transition: 0.2s filter, 0.2s box-shadow;
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
  &&:disabled {
    opacity: 0.7;
  }
  &&:disabled:hover {
    filter: brightness(1);
    box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.5);
  }
  @media (max-width: 520px) {
    width: 14rem;
    height: 4.6rem;
    font-size: 1.6rem;
  }
`;

const ErrorBox = styled.div`
  height: 8rem;
  width: 90vw;
  max-width: 44rem;
  box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 1rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--color-primary);
  margin-bottom: 3rem;
`;

const Message = styled.p`
  font: 400 1.6rem/2.4rem "Roboto", sans-serif;
  color: var(--color-background);
`;

export default Admin;

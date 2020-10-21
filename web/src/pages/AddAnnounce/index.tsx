import React, { useState, useEffect, FormEvent } from "react";
import styled, { keyframes } from "styled-components";
import BounceLoader from "react-spinners/BounceLoader";
import { useHistory } from "react-router-dom";

import AdminNavbar from "../../components/AdminNavbar";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";

import api from "../../services/api";

const PREFIX = process.env.REACT_APP_PREFIX;

interface imageItem {
  title: string;
  url: string;
}

const AddAnnounce: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");

  const [frontTitle, setFrontTitle] = useState("");
  const [statusFrontTitle, setStatusFrontTitle] = useState<Array<string>>([
    "",
    "",
  ]);

  const [textTitle, setTextTitle] = useState("");
  const [statusTextTitle, setStatusTextTitle] = useState<Array<string>>([
    "",
    "",
  ]);

  const [text, setText] = useState("");
  const [statusText, setStatusText] = useState<Array<string>>(["", ""]);

  const [statusImageURL, setStatusImageURL] = useState<Array<string>>(["", ""]);
  const [imageURL, setImageURL] = useState("");

  const [imagesList, setImagesList] = useState<Array<imageItem>>([]);

  const history = useHistory();

  useEffect(() => {
    setIsLoading(true);
    setStatus("Carregando imagens...");

    api
      .get("/uploads")
      .then((response) => {
        setImagesList(response.data);
        setIsLoading(false);
        return;
      })
      .catch((error) => {
        setStatus("Erro: obtivemos algum problema no carregamento das imagens");
        setTimeout(() => {
          setIsLoading(false);
          history.push("/admin");
        }, 4000);
        return;
      });
  }, [history]);

  const verifyData = () => {
    setStatusFrontTitle(["", ""]);
    setStatusTextTitle(["", ""]);
    setStatusText(["", ""]);
    setStatusImageURL(["", ""]);

    const errors = [];
    if (frontTitle === "") {
      errors.push("frontTitle is empty");
      setStatusFrontTitle(["error", "campo é obrigatório"]);
    }
    if (textTitle === "") {
      errors.push("textTitle is empty");
      setStatusTextTitle(["error", "campo é obrigatório"]);
    }
    if (text === "") {
      errors.push("text is empty");
      setStatusText(["error", "campo é obrigatório"]);
    }
    if (imageURL === "") {
      errors.push("imageURL is empty");
      setStatusImageURL([
        "error",
        "Selecione uma das imagens como capa de anúncio",
      ]);
    }
    return errors.length === 0 ? true : false;
  };

  const handleSaveAnnounce = (event: FormEvent) => {
    event.preventDefault();
    if (!verifyData()) return;

    const data = {
      title: frontTitle,
      title_extended: textTitle,
      text: text,
      image_url: imageURL,
    };

    setIsLoading(true);

    api
      .post("/billboard", data, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        setStatus("enviado com sucesso!");
      })
      .catch((error) => {
        if (error.response.status === 500) {
          return setStatus("Erro interno do servidor, tente novamente :(");
        }
        if (error.response.status === 400) {
          return setStatus("Erro: requisição mal formada, tente novamente :(");
        }
        return setStatus("Ops! ocorreu um erro inesperado, tente novamente :(");
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
          history.push("/admin");
        }, 4000);
        return
      });
  };

  const onValueChange = (event: any) => {
    setImageURL(event.target.value);
  };

  if (isLoading) {
    return (
      <LoadingPage>
        <Text>{status}</Text>
        <BounceLoader size={160} color={"#E52F34"} />
        <Text>Aguarde o redirecionamento automático!</Text>
      </LoadingPage>
    );
  }

  return (
    <>
      <AdminNavbar />
      <Announce>
        <Title>Novo anúncio</Title>
        <AnnounceForm onSubmit={(event) => handleSaveAnnounce(event)}>
          <Column>
            <Input
              type="text"
              name="frontTitle"
              label="Título de capa"
              value={frontTitle}
              onChange={(event) => setFrontTitle(event.target.value)}
              error={statusFrontTitle[0] === "error" ? true : false}
              message={statusFrontTitle[1]}
            />
            <Input
              type="text"
              name="textTitle"
              label="Título de texto"
              value={textTitle}
              onChange={(event) => setTextTitle(event.target.value)}
              error={statusTextTitle[0] === "error" ? true : false}
              message={statusTextTitle[1]}
            />
            <Textarea
              name="text"
              label="Texto do anúncio"
              value={text}
              onChange={(event) => setText(event.target.value)}
              error={statusText[0] === "error" ? true : false}
              message={statusText[1]}
            />
          </Column>
          <Column>
            {statusImageURL[0] === "error" ? (
              <Warning>{statusImageURL[1]}</Warning>
            ) : (
              <Legend>Selecione a imagem de anúncio</Legend>
            )}
            <List>
              {imagesList.map((image, index) => (
                <Radio key={index}>
                  <Box htmlFor={image.title}>
                    <input
                      type="radio"
                      id={image.title}
                      name="image"
                      value={image.url}
                      onChange={(event) => onValueChange(event)}
                    />
                    <img src={`${PREFIX}${image.url}`} alt={image.title} />
                  </Box>
                  <InputLegend>{image.title}</InputLegend>
                </Radio>
              ))}
            </List>
          </Column>
          <Button type="submit">Cadastrar</Button>
        </AnnounceForm>
      </Announce>
    </>
  );
};

const Announce = styled.div`
  margin: 6rem 0;
  width: 90vw;
  max-width: 117rem;
  min-height: calc(100vh - 6rem - 4rem);
  display: flex;
  flex-direction: column;
  justify-items: center;

  @media (max-width: 1280px) {
    max-width: 90vw;
    width: 72rem;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-self: center;
  }
`;

const Title = styled.h1`
  font: 700 3.6rem "Open Sans", sans-serif;
  color: var(--color-title);
  margin: 0;
  margin-bottom: 3rem;

  @media (max-width: 520px) {
    font-size: 2rem;
  }
`;

const AnnounceForm = styled.form`
  display: grid;
  grid-template-columns: 47rem 68rem;
  column-gap: 2rem;

  @media (max-width: 1280px) {
    max-width: 90vw;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-self: center;

    && > div:last-child {
      margin-bottom: 0;
    }
  }
`;

const Column = styled.div`
  width: 90vw;
  max-width: 100%;
  display: flex;
  flex-direction: column;

  @media (max-width: 1280px) {
    margin-bottom: 3rem;
  }
`;

const Legend = styled.h2`
  font: 700 1.4rem "Open Sans", sans-serif;
  color: var(--color-title);
  margin: 0;
  margin-bottom: 0.5rem;
  margin-left: 1rem;

  @media (max-width: 1280px) {
    margin-bottom: 2rem;
  }
`;

const Warning = styled.h2`
  font: 700 1.4rem "Open Sans", sans-serif;
  color: var(--color-primary);
  margin: 0;
  margin-bottom: 0.5rem;
  margin-left: 1rem;

  @media (max-width: 1280px) {
    margin-bottom: 2rem;
  }
`;

const List = styled.div`
  width: 100%;
  max-width: 90vw;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  justify-items: center;

  @media (max-width: 520px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow-y: scroll;
  }

  && > fieldset {
    margin: 0 1rem 4rem 1rem;
  }
`;

const Button = styled.button`
  width: 90vw;
  max-width: 17rem;
  height: 5rem;
  background: linear-gradient(90deg, #1ff20d 0%, #3f9438 100%);
  font: 400 1.8rem "Roboto", sans-serif;
  color: #fff;
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

  @media (max-width: 1280px) {
    max-width: 90vw;
    width: 32rem;
    align-self: center;
  }

  @media (max-width: 520px) {
    font-size: 1.6rem;
  }
`;

const Text = styled.p`
  font: 400 1.6rem/3.2rem "Roboto", sans-serif;
  color: var(--color-text);
`;

const OpacityAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const LoadingPage = styled.div`
  width: 100%;
  height: calc(100vh - 3rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  animation: ${OpacityAnimation} 2s linear;

  && > p {
    margin-top: 3rem;
    margin-bottom: 1rem;
  }

  && > a {
    font: 400 1.8rem/3.2rem "Roboto", sans-serif;
    color: var(--color-secundary-light);
  }
`;

const Radio = styled.fieldset`
  width: 20rem;
  height: 22.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  padding: 0;
`;

const Box = styled.label`
  width: 20rem;
  height: 20rem;
  border-radius: 5px;
  cursor: pointer;

  && > img {
    width: 100%;
    height: 100%;
    padding: 1rem;
    background: #fafafa;
    border: 1px solid #c8c9df;
  }

  && > input[type="radio"] {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  && > input[type="radio"]:checked ~ img {
    background: #e3f1e5;
    border: 1px solid #1ff20d;
    border-radius: 5px;
  }
`;

const InputLegend = styled.span`
  font: 700 1.4rem "Open Sans", sans-serif;
  color: var(--color-title);
  margin-top: 0.5rem;
`;

export default AddAnnounce;

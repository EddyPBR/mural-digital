import React, { useState, useEffect, FormEvent } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import BounceLoader from "react-spinners/BounceLoader";

import AdminNavbar from "../../components/AdminNavbar";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import ImageInputRadio from "../../components/ImageInputRadio";

import api from "../../services/api";

interface AnnounceParams {
  id: string;
}

const UpdateAnnounce: React.FC = () => {
  const { id } = useParams<AnnounceParams>();

  const [frontTitle, setFrontTitle] = useState("");
  const [statusFrontTitle, setStatusFrontTitle] = useState<Array<string>>(["", ""]);

  const [textTitle, setTextTitle] = useState("");
  const [statusTextTitle, setStatusTextTitle] = useState<Array<string>>(["", ""]);

  const [text, setText] = useState("");
  const [statusText, setStatusText] = useState<Array<string>>(["", ""]);

  const [imageURL, setImageURL] = useState("https://cdn.awsli.com.br/600x1000/761/761999/produto/41467929/f84f75780b.jpg");
  const [statusImageURL, setStatusImageURL] = useState<Array<string>>(["", ""]);

  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  useEffect( () => {
    api.get(`/billboard/${id}`)
    .then((response) => {
      setFrontTitle(response.data.title);
      setTextTitle(response.data.title_extended);
      setText(response.data.text);
    })
    .catch( (error) => {
      if(error.response.status === 500) {
        return setStatus("Erro interno do servidor, recarregue a página :(");
      }
      if(error.response.status === 400) {
        return setStatus("Erro: requisição mal formada, recarregue a página :(");
      }
      if(error.response.status === 404) {
        return setStatus("Erro: anúncio não encontrado!!!");
      }
      return setStatus("Ops! ocorreu um erro inesperado, recarregue a página :(");
    });
  }, []);

  const verifyData = () => {
    setStatusFrontTitle(["", ""]);
    setStatusTextTitle(["", ""]);
    setStatusText(["", ""]);

    const errors = [];
    if (frontTitle === "") {
      errors.push("frontTitle is empty");
      setStatusFrontTitle(["error", "campo é obrigatório"])
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
      setStatusImageURL(["error", "escolha alguma das imagens"]);
    }
    return errors.length === 0 ? true : false;
  }

  const handleUpdateAnnounce = (event: FormEvent) => {
    event.preventDefault();

    if(!verifyData()) return;

    const data = {
      title: frontTitle,
      title_extended: textTitle,
      text: text,
      image_url: imageURL
    }

    setIsLoading(true);

    api.put(`/billboard/${id}`, data)
    .then( (response) => {
      setStatus("Atualizado com sucesso!");
    })
    .catch( (error) => {
      if(error.response.status === 500) {
        return setStatus("Erro interno do servidor, tente novamente :(");
      }
      if(error.response.status === 400) {
        return setStatus("Erro: requisição mal formada, tente novamente :(");
      }
      return setStatus("Ops! ocorreu um erro inesperado, tente novamente :(");
    })
    .finally( () => {
      setTimeout(() => {
        setIsLoading(false);
        history.push("/admin");
      }, 6000);
    });    
  }

  if(isLoading){
    return (
      <LoadingPage>
        <Text>{status}</Text>
        <BounceLoader size={160} color={"#E52F34"} />
        <Text>Aguarde o redirecionamento automático!</Text>
      </LoadingPage>
    )
  }
   
  return (
    <>
      <AdminNavbar />
      <Announce>
        <Title>Novo anúncio</Title>
        <AnnounceForm>
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
            <Legend>Selecione a imagem de anúncio</Legend>
            <List>
              <ImageInputRadio />
              <ImageInputRadio />
              <ImageInputRadio />
              <ImageInputRadio />
              <ImageInputRadio />
              <ImageInputRadio />
            </List>
          </Column>
        </AnnounceForm>
        <Button type="button" onClick={(event) => handleUpdateAnnounce(event)}>Atualizar</Button>
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

  @media(max-width: 1280px) {
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
  gap: 2rem;

  @media(max-width: 1280px) {
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
`

const Column = styled.div`
  width: 90vw;
  max-width: 100%;
  display: flex;
  flex-direction: column;

  @media(max-width: 1280px) {
    margin-bottom: 3rem;
  }
`;

const Legend = styled.h2`
  font: 700 1.4rem "Open Sans", sans-serif;
  color: var(--color-title);
  margin: 0;
  margin-bottom: .5rem;
  margin-left: 1rem;

  @media(max-width: 1280px) {
    margin-bottom: 2rem;
  }
`;

const List = styled.div`
  width: 100%;
  max-width: 90vw;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  justify-items: center;

  @media(max-width: 520px){
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
  background: linear-gradient(103.5deg, #F38230 23.24%, #F9A825 74.81%);
  font: 400 1.8rem "Roboto", sans-serif;
  color: #fff;
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

  @media(max-width: 1280px) {
    max-width: 90vw;
    width: 32rem;
    margin-top: 3rem;
    align-self: center;
  }

  @media(max-width: 520px) {
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

export default UpdateAnnounce;

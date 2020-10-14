import React, { useState, FormEvent } from "react";
import styled from "styled-components";

import AdminNavbar from "../../components/AdminNavbar";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import ImageInputRadio from "../../components/ImageInputRadio";

interface AnnounceParams {
  id: string;
}

const UpdateAnnounce: React.FC<AnnounceParams> = (params) => {
  const { id } = params;

  // create a API call

  const [frontTitle, setFrontTitle] = useState("");
  const [textTitle, setTextTitle] = useState("");
  const [text, setText] = useState("");

  const handleUpdateAnnounce = (event: FormEvent) => {
    event.preventDefault();

    const data = {
      frontTitle,
      textTitle,
      text,
    }

    // create a API call
    alert(data);
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
            />
            <Input
              type="text"
              name="textTitle"
              label="Título de texto"
              value={textTitle}
              onChange={(event) => setTextTitle(event.target.value)}
            />
            <Textarea
              name="text"
              label="Texto do anúncio"
              value={text}
              onChange={(event) => setText(event.target.value)}
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

export default UpdateAnnounce;

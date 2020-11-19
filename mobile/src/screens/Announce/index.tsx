import React, { useEffect, useState } from "react";
import { RouteProp } from '@react-navigation/native';
import styled from "styled-components/native";
import SvgUri from "expo-svg-uri";

import LoadingAnimation from "../../components/LoadingAnimation";

import api from "../../services/api";

import formatDate from "../../utils/formatDate";

interface AnnounceParams {
  route: RouteProp<{ params: { id: string } }, "params">;
}

interface Announce {
  id: string;
  title: string;
  title_extended: string;
  text: string;
  image_url: string;
  updated_at: string;
}

const PREFIX = "http://";

const Announce: React.FC<AnnounceParams> = (params) => {
  const { id } = params.route.params;

  const [announce, setAnnounce] = useState({} as Announce);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState("Carregando...");

  const formatedDate = formatDate;

  useEffect(() => {
    api
      .get(`/billboard/${id}`)
      .then((response) => setAnnounce(response.data))
      .catch((error) => {
        if (error.response.status === 404) {
          return setStatus("Erro: anúncio não encontrado");
        }
        if (error.response.status === 500) {
          return setStatus("Erro interno do servidor");
        }
        return setStatus(
          "Erro desconhecido no sistema, por favor recarregue a página"
        );
      });
  }, [id]);

  useEffect(() => {
    if (Object.keys(announce).length) {
      setIsLoading(false);
    }
  }, [announce]);

  if (isLoading) {
    return (
      <LoadScreen>
        <LoadingAnimation />
        <Text>{status}</Text>
      </LoadScreen>
    );
  }

  return (
    <Screen>
      <SvgUri 
        width="176"
        height="190"
        source={{
          uri: `${PREFIX + announce.image_url}`
        }}
        style={{
          marginTop: 12,
          marginBottom: 12,
          maxWidth: 224,
          maxHeight: 224,
          alignSelf: "center"
        }}
      />
      <Date>{formatedDate(announce.updated_at)}</Date>
      <Title>{announce.title}</Title>
      {announce.text.split("\n").map((text, index) => {
        return <Text key={index}>{text}</Text>
      })}
    </Screen>
  );
};

const Screen = styled.ScrollView`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 32px 32px;
  margin-bottom: 32px;
`;

const LoadScreen = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 32px 32px;
  margin-bottom: 32px;
`;

const Date = styled.Text`
  font: 700 14px "OpenSans";
  text-align: left;
  color: #253137;
  margin-top: 8px;
  margin-bottom: 2px;
`;

const Title = styled.Text`
  font: 700 32px "OpenSans";
  color: #253137;
  margin-bottom: 24px;
`;

const Text = styled.Text`
  font: 400 16px "OpenSans";
  line-height: 26px;
  color: #253137;
  margin-bottom: 16px;
`;

export default Announce;

import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";

import { useFonts } from "expo-font";

import MuralDigital from "../../assets/images/mural-digital.png";

import AnnounceCard from "../../components/AnnounceCard";
import LoadingAnimation from "../../components/LoadingAnimation";

import api from "../../services/api";

import formatDate from "../../utils/formatDate";

interface Announce {
  id: string,
  title: string,
  text: string,
  image_url: string,
  updated_at: string
}

const Billboard: React.FC = () => {
  const [announces, setAnnounces] = useState<Announce[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState("Carregando...")

  useEffect(() => {
    api.get(`/billboard`)
    .then(response => {
      setAnnounces(response.data);
      if(response.data.length === 0) {
        setStatus("Ainda não temos anúncios cadastrados :(")
      }
    })
    .catch(error => {
      if(error.response.status === 500) {
        return setStatus("Erro interno do servidor");
      }
      return setStatus("Erro desconhecido no sistema, por favor recarregue o app")
    })
  }, []);

  useEffect( () => {
    if(Object.keys(announces).length) {
      setIsLoading(false)
    }
  }, [announces]);

  const [loaded, error] = useFonts({
    OpenSans: require("../../assets/fonts/OpenSans-Regular.ttf"),
  });

  if (!loaded || isLoading ) {
    return (
      <Screen>
        <LoadingAnimation />
        <Text>{status}</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <Image source={MuralDigital} />
      <Text>
        Estes são alguns anúncios da Rally Motos, pressione-os para visualizar.
      </Text>

      <ScrollView
        horizontal={true}
        style={{
          marginTop: 16,
          display: "flex",
          flexDirection: "row",
          width: "100%",
          maxHeight: 368,
        }}
      >

        {announces.map( (announce) => (
          <AnnounceCard
            key={announce.id}
            id={announce.id}
            title={announce.title}
            text={announce.text}
            image_url={announce.image_url}
            date={formatDate(announce.updated_at)}
          />
        ))}

      </ScrollView>
    </Screen>
  );
};

const Screen = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 0px 16px;
`;

const Image = styled.Image`
  margin-top: 32px;
  margin-bottom: 16px;
`;

const Text = styled.Text`
  margin-bottom: 16px;
  font: 400 16px "OpenSans";
  line-height: 24px;
  text-align: center;
  color: #253137;
`;

const Warn = styled.Text`
  text-align: center;
  color: #253137;
`;

export default Billboard;

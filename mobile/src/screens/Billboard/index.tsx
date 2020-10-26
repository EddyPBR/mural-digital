import React from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";

import { useFonts } from "expo-font";

import MuralDigital from "../../assets/images/mural-digital.png";

import AnnounceCard from "../../components/AnnounceCard";

const Billboard: React.FC = () => {
  const [loaded, error] = useFonts({
    OpenSans: require("../../assets/fonts/OpenSans-Regular.ttf"),
  });

  if (!loaded) {
    return (
      <Screen>
        <Warn>Carregando {error}</Warn>
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

        <AnnounceCard />
        <AnnounceCard />
        <AnnounceCard />

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

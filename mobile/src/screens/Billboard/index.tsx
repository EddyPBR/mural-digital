import React from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";

import { useFonts } from "expo-font";

import MuralDigital from "../../assets/images/mural-digital.png";
import Example from "../../assets/images/boilerboard.png";

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
        Estas são as ultimos avisos da Rally Motos. Arraste para os lados e
        selecione a notícia desejada para visualizar melhor.
      </Text>

      <ScrollView 
      horizontal={true}
      style={{
        marginTop: 16,
        display: "flex",
        flexDirection: "row",
        width: "100%",
        maxHeight: 368,
      }}>

        <AnnounceCard
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 5,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 2,
            elevation: 5,
            marginRight: 32,
          }}
        >
          <AnnounceImage source={Example} />
          <AnnounceTitle>Lorem Ipsum Dollor Isum</AnnounceTitle>
          <AnnounceText>
            Estas são as ultimos avisos da Rally Motos. Arraste para os lados e
            selecione a notícia desejada ...
          </AnnounceText>
          <AnnounceDate>01/01/2020</AnnounceDate>
        </AnnounceCard>

        <AnnounceCard
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 5,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 2,
            elevation: 5,
            marginRight: 32,
          }}
        >
          <AnnounceImage source={Example} />
          <AnnounceTitle>Lorem Ipsum Dollor Isum</AnnounceTitle>
          <AnnounceText>
            Estas são as ultimos avisos da Rally Motos. Arraste para os lados e
            selecione a notícia desejada ...
          </AnnounceText>
          <AnnounceDate>01/01/2020</AnnounceDate>
        </AnnounceCard>

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

const AnnounceCard = styled.View`
  height: 342px;
  width: 236px;
  background-color: #fff;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AnnounceImage = styled.Image`
  height: 176px;
  width: 190px;
`;

const AnnounceTitle = styled.Text`
  font: 700 22px "OpenSans";
  margin: 8px 0px;
  color: #253137;
`;

const AnnounceText = styled.Text`
  font: 400 14px "OpenSans";
  line-height: 22px;
  color: #253137;
  height: 56px;
`;

const AnnounceDate = styled.Text`
  font: 700 12px "OpenSans";
  text-align: right;
  color: #253137;
  align-self: flex-end;
  margin-top: 8px;
`;

const Warn = styled.Text`
  text-align: center;
  color: #253137;
`;

export default Billboard;

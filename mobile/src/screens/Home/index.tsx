import React from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

import * as Animatable from "react-native-animatable";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";
import { useFonts } from "expo-font";

import Boilerboard from "../../assets/images/boilerboard.png";
import Names from "../../assets/images/mural-digital-rally-motos.png";

const Home: React.FC = () => {
  const [loaded, error] = useFonts({
    OpenSans: require("../../assets/fonts/OpenSans-Regular.ttf"),
  });

  const navigation = useNavigation();

  const handleNavigateToBillboard = () => navigation.navigate("Billboard");

  if (!loaded) {
    return (
      <Screen>
        <Warn>Carregando {error}</Warn>
      </Screen>
    );
  }

  return (
    <Screen>
      <Image source={Boilerboard} />
      <Image source={Names} />
      <Text>
        Acompanhe aqui as notícias internas da empresa como: dia de folga,
        aniversáriantes e mais!
      </Text>
      <Text>Pressione a seta e confira!</Text>
      <Animatable.View
        animation="bounce"
        iterationCount="infinite"
        direction="normal"
        easing="linear"
        duration={2000}
        style={{ marginTop: 16 }}
      >
        <FontAwesomeIcons
          onPress={() => handleNavigateToBillboard()}
          name="angle-double-down"
          size={42}
          color="#E52F34"
        />
      </Animatable.View>
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
  margin: 12px 0px;
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

export default Home;

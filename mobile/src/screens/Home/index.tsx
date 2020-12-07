import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

import * as Animatable from "react-native-animatable";
import FontAwesomeIcons from "react-native-vector-icons/FontAwesome";
import { useFonts } from "expo-font";

import Boilerboard from "../../assets/images/boilerboard.png";
import Names from "../../assets/images/mural-digital-rally-motos.png";

import api from "../../services/api";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Home: React.FC = () => {
  const [loaded, error] = useFonts({
    OpenSans: require("../../assets/fonts/OpenSans-Regular.ttf"),
  });

  const [notificationToken, setNotificationtoken] = useState<any>();
  const [savedToken, setSavedToken] = useState(false);

  const getPushNotificationPermissions = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );

    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      return;
    }

    const token = await Notifications.getExpoPushTokenAsync();
    setNotificationtoken(token);

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  };

  useEffect(() => {
    getPushNotificationPermissions();
  }, []);

  const uploadToken = async() => {
    if(!savedToken) {
      api
        .post("/tokens", notificationToken)
        .then(response => { if(response.status === 200) setSavedToken(true) });
    }
  }

  if (notificationToken && !savedToken) {
    uploadToken();
  }

  const navigation = useNavigation();

  const handleNavigateToBillboard = () => {
    navigation.navigate("Billboard");
    uploadToken();
  }

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
        Acompanhe as notícias internas da empresa, 
        saiba sobre dias de pagamentos, folga e mais!
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

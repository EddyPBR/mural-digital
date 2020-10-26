import React from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";

import Example from "../../assets/images/boilerboard.png";

const Announce: React.FC = () => {
  return (
    <Screen>
      <Image source={Example} />
      <Date>01/01/2020</Date>
      <Title>Lorem Ipsum Dollor Isum - Avoy denol uaidê</Title>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eleifend
        magna eu tristique pretium. Donec sed lorem faucibus, fermentum quam at,
        vulputate ex. Sed sed mauris eget urna congue laoreet.
      </Text>
      <Text>
        Donec enim massa, egestas in sollicitudin nec, sagittis nec leo.
        Vestibulum imperdiet massa ante, euismod efficitur tortor rhoncus eu.
        Vivamus tincidunt dolor eu rutrum pretium.
      </Text>
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

const Image = styled.Image`
  margin: 12px 0px;
  max-width: 224px;
  max-height: 224px;
  align-self: center;
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

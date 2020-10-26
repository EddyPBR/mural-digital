import React from "react";
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

const Screen = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
  padding: 32px 32px;
`;

const Image = styled.Image`
  margin: 12px 0px;
  max-width: 224px;
  max-height: 224px;
`;

const Date = styled.Text`
  font: 700 14px "OpenSans";
  text-align: right;
  color: #253137;
  align-self: flex-start;
  margin-top: 16px;
`;

const Title = styled.Text`
  font: 700 24px "OpenSans";
  margin: 16px 0px;
  color: #253137;
`;

const Text = styled.Text`
  font: 400 14px "OpenSans";
  line-height: 22px;
  color: #253137;
  height: 56px;
  margin-bottom: 12px;
`;

export default Announce;

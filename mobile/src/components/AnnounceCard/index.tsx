import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";

import Example from "../../assets/images/boilerboard.png";

const AnnounceCard: React.FC = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("Announce")}>
      <Card
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
        <Image source={Example} />
        <Title>Lorem Ipsum Dollor Isum</Title>
        <Text>
          Estas são as ultimos avisos da Rally Motos. Arraste para os lados e
          selecione a notícia desejada ...
        </Text>
        <Date>01/01/2020</Date>
      </Card>
    </TouchableOpacity>
  );
};

const Card = styled.View`
  height: 342px;
  width: 236px;
  background-color: #fff;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.Image`
  height: 176px;
  width: 190px;
`;

const Title = styled.Text`
  font: 700 22px "OpenSans";
  margin: 8px 0px;
  color: #253137;
`;

const Text = styled.Text`
  font: 400 14px "OpenSans";
  line-height: 22px;
  color: #253137;
  height: 56px;
`;

const Date = styled.Text`
  font: 700 12px "OpenSans";
  text-align: right;
  color: #253137;
  align-self: flex-end;
  margin-top: 8px;
`;

export default AnnounceCard;

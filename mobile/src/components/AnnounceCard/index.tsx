import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import SvgUri from "expo-svg-uri";

interface CardComponent {
  id: string;
  title: string;
  text: string;
  imageUrl: string
  date?: string;
}

const PREFIX = "http://";

const AnnounceCard: React.FC<CardComponent> = (props) => {
  const { id, title, text, date, imageUrl } = props;

  const navigation = useNavigation();

  const handleNavigateToAnnounce = (id: string) => navigation.navigate("Announce", {
    id: id,
  });

  return (
    <TouchableOpacity onPress={() => handleNavigateToAnnounce(id)}>
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
        <SvgUri 
          width="176"
          height="190"
          source={{
            uri: `${PREFIX + imageUrl}`
          }}
        />
        <Title>{title}</Title>
        <Text>{text}</Text>
        <Date>{date}</Date>
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

const Title = styled.Text`
  font: 700 22px "OpenSans";
  margin: 8px 0px;
  color: #253137;
  align-self: flex-start;
`;

const Text = styled.Text`
  font: 400 14px "OpenSans";
  line-height: 22px;
  color: #253137;
  height: 56px;
  align-self: flex-start;
`;

const Date = styled.Text`
  font: 700 12px "OpenSans";
  text-align: right;
  color: #253137;
  align-self: flex-end;
  margin-top: 8px;
`;

export default AnnounceCard;

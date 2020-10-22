import React from 'react';
import styled from "styled-components/native"

const Screen = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Message = styled.Text`
  color: #000;
  font-size: 48px;
`;

const Home: React.FC = () => {
  return (
    <Screen>
      <Message>Olá mural-digital!</Message>
    </Screen>
  )
}

export default Home;
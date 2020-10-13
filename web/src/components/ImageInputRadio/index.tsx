import React from "react";
import styled from "styled-components";

import ExampleImage from "../../assets/images/Woman.svg";

const ImageInputRadio: React.FC = () => {
  return (
    <Radio>
      <Box>
        <input type="radio" name="image" value="0" />
        <img src={ExampleImage} alt="Diretoria" />
      </Box>
      <InputLegend>Diretoria</InputLegend>
    </Radio>
  );
};

const Radio = styled.fieldset`
  width: 20rem;
  height: 22.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  padding: 0;
`;

const Box = styled.label`
  width: 20rem;
  height: 20rem;
  border-radius: 5px;
  cursor: pointer;

  && > img {
    width: 100%;
    height: 100%;
    padding: 1rem;
    background: #FAFAFA;
    border: 1px solid #C8C9DF;
  }

  && > input[type=radio] { 
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  && > input[type=radio]:checked ~ img {
    background: #E3F1E5;
    border: 1px solid #1FF20D;
    border-radius: 5px;
  }
`;

const InputLegend = styled.span`
  font: 700 1.4rem "Open Sans", sans-serif;
  color: var(--color-title);
  margin-top: .5rem;
`;

export default ImageInputRadio;

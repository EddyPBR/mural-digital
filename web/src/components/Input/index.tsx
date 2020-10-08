import React, { InputHTMLAttributes } from "react";
import styled from "styled-components";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const Input: React.FC<InputProps> = ({ label, name, type, ...rest }) => {
  return (
    <Fieldset>
      <Label htmlFor={name}>{label}</Label>
      <InputPlace type={type} id={name} {...rest} />
    </Fieldset>
  );
}

const Fieldset = styled.fieldset`
  width: 90%;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  border: none;
`;

const Label = styled.label`
  font: 700 1.4rem "Open Sans", sans-serif;
  color: var(--color-title);
  margin-bottom: .5rem;
`;

const InputPlace = styled.input`
  width: 100%;
  max-width: 37rem;
  height: 4.4rem;
  background-color: #FAFAFA;
  border: 1px solid #C8C9DF;
  border-radius: .5rem;
  color: var(--color-text);
  padding: .8rem;
  font: 400 1.4rem "Roboto", sans-serif; 

  &&:focus {
    border: 1px solid #BABCED;
    background-color: #F0F3F4;
  }
`;

export default Input;

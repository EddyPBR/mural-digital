import React, { TextareaHTMLAttributes } from "react";
import styled from "styled-components";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, name, ...rest }) => {
  return (
    <Fieldset>
      <Label htmlFor={name}>{label}</Label>
      <InputPlace id={name} {...rest} />
    </Fieldset>
  );
}

const Fieldset = styled.fieldset`
  width: 90%;
  display: flex;
  flex-direction: column;
  border: none;
  padding: 0;
`;

const Label = styled.label`
  font: 700 1.4rem "Open Sans", sans-serif;
  color: var(--color-title);
  margin-bottom: .5rem;
`;

const InputPlace = styled.textarea`
  width: 100%;
  max-width: 90vw;
  min-height: 30rem;
  background-color: #FAFAFA;
  border: 1px solid #C8C9DF;
  border-radius: .5rem;
  color: var(--color-text);
  padding: .8rem;
  font: 400 1.4rem "Roboto", sans-serif;
  resize: none;

  &&:focus {
    border: 1px solid #A5CCE8;
    background-color: #FFF;
  }
`;

export default Textarea;

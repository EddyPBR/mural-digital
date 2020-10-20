import React, { InputHTMLAttributes } from "react";
import styled from "styled-components";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  warning?: boolean;
  error?: boolean;
  message?: string;
}

interface LabelProps {
  warning?: boolean;
  error?: boolean;
}

interface MessageProps {
  warning?: boolean;
  error?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  name,
  type,
  warning,
  error,
  message,
  ...rest
}) => {
  return (
    <Fieldset>
      <Label htmlFor={name}>{label}</Label>
      <InputPlace
        type={type}
        id={name}
        warning={warning ? true : false}
        error={error ? true : false}
        {...rest}
      />
      {message && (
        <Message warning={warning ? true : false} error={error ? true : false}>
          {message}
        </Message>
      )}
    </Fieldset>
  );
};

const Fieldset = styled.fieldset`
  width: 100%;
  max-width: 90vw;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  border: none;
  padding: 0;
`;

const Label = styled.label`
  font: 700 1.4rem "Open Sans", sans-serif;
  color: var(--color-title);
  margin-bottom: 0.5rem;
`;

const InputPlace = styled.input<LabelProps>`
  width: 100%;
  max-width: 90vw;
  height: 4.4rem;
  background-color: #fafafa;
  border: 1px solid
    ${(props) => {
      if (props.warning) return "#F9A825";
      if (props.error) return "#E52F34";
      return "#C8C9DF";
    }};
  border-radius: 0.5rem;
  color: var(--color-text);
  padding: 0.8rem;
  font: 400 1.4rem "Roboto", sans-serif;

  &&:focus {
    border: 1px solid #a5cce8;
    background-color: #fff;
  }
`;

const Message = styled.span<MessageProps>`
  font: 400 1.2rem/2.2rem "Roboto", sans-serif;
  color: ${(props) => {
    if (props.warning) return "#F9A825";
    if (props.error) return "#E52F34";
    return "#192A43";
  }};
`;

export default Input;

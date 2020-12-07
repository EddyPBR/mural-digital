import React, { TextareaHTMLAttributes } from "react";
import styled from "styled-components";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
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

const Textarea: React.FC<TextareaProps> = ({
  label,
  name,
  warning,
  error,
  message,
  ...rest
}) => {
  return (
    <Fieldset>
      <Label htmlFor={name}>{label}</Label>
      <InputPlace
        id={name}
        {...rest}
        warning={warning ? true : false}
        error={error ? true : false}
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
  border: none;
  padding: 0;
`;

const Label = styled.label`
  font: 700 1.4rem "Open Sans", sans-serif;
  color: var(--color-title);
  margin-bottom: 0.5rem;
`;

const InputPlace = styled.textarea<LabelProps>`
  width: 100%;
  max-width: 90vw;
  min-height: ${(props) => {
    if (props.warning) return "24rem";
    if (props.error) return "24rem";
    return "29rem";
  }};
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
  resize: none;
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

export default Textarea;

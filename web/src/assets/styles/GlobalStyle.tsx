import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

export const GlobalStyle = createGlobalStyle`
  ${normalize}
  :root {
    --color-background: #F1F3F4;
    --color-primary-light: #E45357;
    --color-primary: #E53035;
    --color-primary-dark: #D71F26;
    --color-primary-darker: #BC151B;
    --color-secundary-light: #4E4EA2;
    --color-secundary: #3D3D90;
    --color-secundary-dark: #2E2E7A;
    --color-secundary-darker: #212163;
    --color-title: #2F2E41;
    --color-text: #1E263E;
    font-size: 60%;
  }

  html,
  body,
  #root {
    min-height: 100vh;
  }

  body {
    background: var(--color-background);
  }

  #root {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (min-width: 700px) {
    :root {
      font-size: 62.5%;
    }
  }
`;
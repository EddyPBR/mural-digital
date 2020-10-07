import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

import { FaHome } from "react-icons/fa";

interface AnimateProp {
  animate: boolean;
}

const HomeButton: React.FC = () => {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  };

  window.addEventListener("scroll", checkScrollTop);

  return (
    <Button animate={showScroll}>
      <Link to="/">
        <FaHome size={32} />
      </Link>
    </Button>
  );
};

const Button = styled.nav<AnimateProp>`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  background-color: var(--color-primary);

  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  right: 2rem;
  bottom: 4rem;

  transition: 0.3s filter;
  z-index: 10;
  opacity: ${(props) => (props.animate ? 1 : 0)};

  animation: ${(props) => (props.animate ? showButton : hideButton )} 0.5s;

  &&:hover {
    filter: brightness(1.1);
  }

  && > a {
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    color: var(--color-background);
    text-decoration: none;
  }
`;

const showButton = keyframes`
  from {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const hideButton = keyframes`
  from {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  to {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
`;

export default HomeButton;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { debounce } from "lodash";

import styled, { keyframes } from "styled-components";

import { FaHome } from "react-icons/fa";

interface AnimateProp {
  animate: boolean;
}

const HomeButton: React.FC = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect( () => { 
    const main = document.getElementsByTagName("main")[0];
    setShowScroll(main.scrollHeight + 300 <= window.innerHeight);
  }, []);

  const checkScrollTop = debounce(() => {
    if (!showScroll && window.pageYOffset > 150) return setShowScroll(true);
    
    if (showScroll && window.pageYOffset <= 150) return setShowScroll(false);
  }, 100);

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
  overflow: hidden;

  animation: ${(props) => (props.animate ? showButton : hideButton )} 0.5s forwards;

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
    width: 0;
    height: 0;
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    width: 6rem;
    height: 6rem;
  }
`;

const hideButton = keyframes`
  from {
    opacity: 1;
    transform: translate3d(0, 0, 0);
    width: 6rem;
    height: 6rem;
  }

  to {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
    width: 0;
    height: 0;
  }
`;

export default HomeButton;

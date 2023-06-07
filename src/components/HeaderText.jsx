import React from "react";
import styled from "styled-components";

function HeaderText() {
  return (
    <TextWrapper>
      <div>Classic homemade recipes from the Midwest.</div>
    </TextWrapper>
  );
}

export default HeaderText;

const TextWrapper = styled.div`
  div {
    width: 700px;
    background: linear-gradient(
      to left,
      transparent,
      white,
      white,
      white,
      white,
      transparent 100%
    );
    background-position: 0 100%;
    background-size: 100% 2px;
    background-repeat: repeat-x;
  }
  text-align: center;
  display: flex;
  justify-content: center;
  font-family: Indie_Flower, serif;
  color: steelblue;
  font-size: 2rem;
  margin-bottom: 20px;
  padding: 5px 0;
  text-align: center;

  @media (max-width: 640px) {
    font-size: 1.3rem;
    margin: 20px 30px 10px;
    // border-bottom: 2px solid white;
  }
`;

import React from "react";
import styled from "styled-components";

function Footer() {
  const today = new Date();

  return (
    <StyledFooter>
      <div>
        &copy; {today.getFullYear()} Food by the Carlson and Hardy families and
        friends!
      </div>
    </StyledFooter>
  );
}

export default Footer;

const StyledFooter = styled.div`
  border-top: solid 2px pink;
  background: white;
  color: rgba(200, 100, 0, 0.9);
  font-size: 1.5rem;
  height: 30px;
  padding: 15px 40px;
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 40px;
  @media (max-width: 640px) {
    font-size: 1rem;
    // margin: 0 30px;
  }
`;

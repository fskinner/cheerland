import React from "react";
import styled from "styled-components"

export const ErrorBox = styled.div`
  margin: 0 auto;
  text-align: center;
  color: red;
`

const Error = ({ message }) => {
  if(message) {
    return (
      <ErrorBox>{message}</ErrorBox>
    );
  }
};

export default Error;

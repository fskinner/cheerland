import styled from "styled-components"
import {
  Link,
} from "react-router-dom";

export const AddDiv = styled.div`
  width: 80%;
  margin: 0 auto 25px auto;
  text-align: right;
`

export const AddButton = styled(Link)`
  ${'' /* margin: 0 auto; */}
  padding: 10px;

  background-color: #c78c08;
  border: .1rem solid #c78c08;
  border-radius: .4rem;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-size: 1em;
  font-weight: 700;
  height: 2em;
  letter-spacing: .1rem;
  padding: 0 1.3rem;
  margin: 0 1rem;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  white-space: nowrap;
  line-height: 35px;

  &:hover {
    background-color: #b5aa91;
    border: .1rem solid #b5aa91;
  }
`

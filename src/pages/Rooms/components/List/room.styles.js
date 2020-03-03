import styled from "styled-components"
import { FaTrashAlt } from 'react-icons/fa'
import {
  Link,
} from "react-router-dom";

const pickColorByGroup = props => {
  if(props.group === "A") {
    return "#00800087"
  }

  if(props.group === "B") {
    return "#0057ff8a"
  }

  if(props.group === "C") {
    return "#ff00007a"
  }
}

export const RoomContainer = styled.li`
  height: 35px;
  padding: 15px;
  list-style: none;
  background: #f1eded;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  align-content: center;
  border-left: ${props => `4px solid ${pickColorByGroup(props)}`};
  margin-bottom: 5px;

  &:hover {
    background: #e6e4e4;
  }

  @media screen and (max-width: 700px) {
    height: 120px;
    flex-direction: column;
    padding: 40px 0;
  }
`;

export const Details = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  align-content: center;
  width: 75%;

  div {
    flex: 1 2 20em;

    @media screen and (max-width: 700px) {
      flex: 1 1 20em;
    }

    &:first-child {
      flex: 1 1 20em;
      font-size: 1.2em;
    }
  }

  @media screen and (max-width: 700px) {
    flex-direction: column;
    height: 100%;
    margin-bottom: 15px;
  }
`

export const Actions = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  align-content: center;
  width: 25%;
`

export const StyledLink = styled(Link)`
  background-color: #3f81c7;
  border: .1rem solid #3f81c7;
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
    background-color: #c78c08;
    border: .1rem solid #c78c08;
  }
`

export const TrashIcon = styled(FaTrashAlt)`
  cursor: pointer;
`

export const AdminActions = styled.div`
  @media screen and (max-width: 700px) {
    display: none;
  }
`

import React from "react";
import { FaEdit } from 'react-icons/fa'

import {
  Link,
} from "react-router-dom";

import { RoomContainer, Details, Actions, StyledLink, TrashIcon } from "./room.styles"

const Room = ({ room }) => {
  return (
    <RoomContainer group={room.group}>
      <Details>
        <span>{room.label}</span>
        <span>{room.max_beds}/{room.max_beds}</span>
        <span>Grupo {room.group}</span>
        <span>{room.women_only ? "Feminino" : "Misto"}</span>
      </Details>
      <Actions>
        <StyledLink to="/">Ver</StyledLink>
        <Link to="/">
          <FaEdit/>
        </Link>
        <TrashIcon/>
      </Actions>

      
    </RoomContainer>
  );
};

export default Room;

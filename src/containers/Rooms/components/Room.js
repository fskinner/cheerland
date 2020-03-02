import React from "react";
import { FaEdit } from 'react-icons/fa'

import {
  Link,
} from "react-router-dom";

import { RoomContainer, Details, Actions, StyledLink, TrashIcon, AdminActions } from "./room.styles"

const Room = ({ room }) => {
  return (
    <RoomContainer group={room.group}>
      <Details>
        <div>{room.label}</div>
        <div>{room.max_beds}/{room.max_beds}</div>
        <div>Grupo {room.group}</div>
        <div>{room.women_only ? "Feminino" : "Misto"}</div>
      </Details>
      <Actions>
        <StyledLink to="/">Ver</StyledLink>
        <AdminActions>
          <Link to="/">
            <FaEdit/>
          </Link>
          <TrashIcon/>
        </AdminActions>
      </Actions>

      
    </RoomContainer>
  );
};

export default Room;

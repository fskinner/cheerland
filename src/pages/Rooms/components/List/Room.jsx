import React from "react";
import { FaEdit } from 'react-icons/fa'

import {
  Link,
} from "react-router-dom";

import { ListContainer, Details, Actions, StyledLink, TrashIcon, AdminActions } from "components/list.styles"

const Room = ({ room, admin }) => {
  return (
    <ListContainer group={room.group}>
      <Details>
        <div>{room.label}</div>
        <div>{room.max_beds}/{room.max_beds}</div>
        <div>Grupo {room.group}</div>
        <div>{room.women_only ? "Feminino" : "Misto"}</div>
      </Details>
      <Actions>
        <StyledLink to={`rooms/${room.id}`}>Ver</StyledLink>
        {admin &&
          <AdminActions>
            <Link to="/">
              <FaEdit />
            </Link>
            <TrashIcon/>
          </AdminActions>
        }
      </Actions>
    </ListContainer>
  );
};

export default Room;

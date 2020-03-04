import React from "react";
import { FaEdit } from 'react-icons/fa'

import {
  Link,
} from "react-router-dom";

import { ListContainer, Details, Actions, StyledLink, TrashIcon, AdminActions } from "components/list.styles"

const User = ({ user, admin }) => {
  return (
    <ListContainer group={user.allowed_group}>
      <Details>
        <div>{user.name}</div>
        <div>Grupo {user.allowed_group}</div>
        <div>{user.gender}</div>
        <div>{user.needs_transportation && !user.cancel_bus ? "Ônibus" : ""}</div>
      </Details>
      <Actions>
        <StyledLink to={`users/${user.id}`}>Ver</StyledLink>
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

export default User;

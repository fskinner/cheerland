import React, { useReducer, useEffect } from "react";
import { useAuth } from "hooks/use-auth.js";

import { reducer, initialState } from "./reducer";

import Spinner from "components/Spinner"
import CenterList from "components/CenterList"
import { AddButton, AddDiv } from "components/AdminTools"

import User from "./User"

const API_URL = process.env.API_URL || `http://localhost:4000/api`;

const UserList = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const auth = useAuth();

  useEffect(() => {
    dispatch({ type: "USERS_REQUEST" });

    fetch(`${API_URL}/users`)
      .then(response => response.json())
      .then(jsonResponse => {
          dispatch({
            type: "USERS_SUCCESS",
            payload: jsonResponse.data
          })
      }).catch(() => {
        dispatch({
          type: "USERS_FAILURE",
          error: "Failed to load users"
        });
      });
  }, []);

  const { users, errorMessage, loading } = state;
  const isAdmin = auth.user && auth.user.is_admin

  if(!isAdmin) return null;

  return (
    <div>
      <AddDiv>
        <AddButton to="/users/new"> + user </AddButton>
      </AddDiv>
      {loading && !errorMessage ? (
        <Spinner />
      ) : errorMessage ? (
        <div className="errorMessage">{errorMessage}</div>
      ) : (
        <CenterList>
          {users.map((user, index) => (
            <User key={`${index}-${user.id}`} user={user} admin={isAdmin}/>
          ))}
        </CenterList>
        
      )}
    </div>
  );
}

export default UserList;

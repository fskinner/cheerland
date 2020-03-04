import React, { useReducer, useEffect } from "react";

import { reducer, initialState } from "./reducer";

import Spinner from "components/Spinner"
import CenterList from "components/CenterList"
import {AddButton, AddDiv} from "components/AdminTools"

import Room from "./Room"

const API_URL = process.env.API_URL || `http://localhost:4000/api`;

const RoomList = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "ROOMS_REQUEST" });

    fetch(`${API_URL}/rooms`)
      .then(response => response.json())
      .then(jsonResponse => {
          dispatch({
            type: "ROOMS_SUCCESS",
            payload: jsonResponse.data
          })
      }).catch(() => {
        dispatch({
          type: "ROOMS_FAILURE",
          error: "Failed to load rooms"
        });
      });
  }, []);

  const { rooms, errorMessage, loading } = state;

  return (
    <div>
      <AddDiv>
        <AddButton to="/rooms/new"> + room </AddButton>
      </AddDiv>
    
      {loading && !errorMessage ? (
        <Spinner />
      ) : errorMessage ? (
        <div className="errorMessage">{errorMessage}</div>
      ) : (
        <CenterList>
          {rooms.map((room, index) => (
            <Room key={`${index}-${room.id}`} room={room} />
          ))}
        </CenterList>
        
      )}
    </div>
  );
}

export default RoomList;

import React, { useReducer, useEffect } from "react";
import styled from "styled-components";

import { reducer, initialState } from "./reducer";

import Room from "./components/Room"

const API_URL = `http://localhost:4000`;

const RoomList = styled.ul`
  width: 80%;
  margin: 0 auto;
`

const Rooms = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "ROOMS_REQUEST" });

    fetch(`${API_URL}/api/rooms`)
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
      {loading && !errorMessage ? (
        <span>loading... </span>
      ) : errorMessage ? (
        <div className="errorMessage">{errorMessage}</div>
      ) : (
        <RoomList>
          {rooms.map((room, index) => (
            <Room key={`${index}-${room.id}`} room={room} />
          ))}
        </RoomList>
        
      )}
    </div>
  );
}

export default Rooms;

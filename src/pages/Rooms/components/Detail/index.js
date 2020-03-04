import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { useAuth } from "hooks/use-auth.js";

import Spinner from "components/Spinner"
import CenterDiv from "components/CenterDiv"

const API_URL = process.env.API_URL || `http://localhost:4000/api`;

const RoomDetail = () => {  
  const [room, setRoom] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setError] = useState(null);

  const { roomId } = useParams();

  // const auth = useAuth();

  useEffect(() => {
    setLoading(true)

    fetch(`${API_URL}/rooms/${roomId}`)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText)
        }

        return response.json()
      })
      .then(jsonResponse => {
        setRoom(jsonResponse.data)
        setLoading(false)

      }).catch((err) => {
        setError(err.message)
        setLoading(false)
      });
  }, [roomId]);

  return (
    <CenterDiv>
      {loading ? (
        <Spinner />
      ) : errorMessage ? (
        <div className="errorMessage">{errorMessage}</div>
      ) : (
        <div>
          Quarto {room.label}
          {room.description}
          {room.photo_urls}
          {room.women_only ? "Apenas para mulheres" : "Quarto misto"}
          Total de {room.max_beds} camas
        </div>
      )}
    </CenterDiv>
  );
}

export default RoomDetail;

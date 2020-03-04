import React, { useState } from "react";
// import { useAuth } from "hooks/use-auth.js";

import CenterDiv from "components/CenterDiv"
import { RoomForm, Header } from "./form.styles"

const API_URL = process.env.API_URL || `http://localhost:4000/api`;

const NewRoom = () => {  
  const [errorMessage, setError] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [maxBeds, setMaxBeds] = useState('');
  const [group, setGroup] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [womenOnly, setWomenOnly] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault()

    const room = { name, description, max_beds: maxBeds, group, photo_url: photoUrl, women_only: womenOnly }

    try {
      const response = await fetch(`${API_URL}/rooms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        mode: 'cors',
        body: JSON.stringify({ room })
      })

      if(!response.ok) {
        let message = response.statusText

        if (response.status === 401 || response.status === 403) {
          message = "Não autorizado"
        }

        if (response.status === 422) {
          message = "Erro de validação"
        }
        throw Error(message)
      }


    } catch(e) {
      setError(e.message)
    }
  }

  return (
    <CenterDiv>
      <RoomForm onSubmit={handleSubmit}>
        <Header>Novo Quarto</Header>
        <div>{errorMessage}</div>
        <input type="text" name="name" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)}/>
        <br/>
        <input type="text" name="description" placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)}/>
        <br/>
        <input type="number" name="max_beds" placeholder="Camas" value={maxBeds} onChange={(e) => setMaxBeds(e.target.value)}/>
        <br/>
        <input type="text" name="group" placeholder="Grupo" value={group} onChange={(e) => setGroup(e.target.value)}/>
        <br/>
        <input type="text" name="photo_url" placeholder="URL das Fotos" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)}/>

        <br/>
        <label htmlFor="women_only" name="women_only">Quarto feminino?</label>
        <input type="checkbox" id="women_only" placeholder="Quarto feminino?" value={womenOnly} onChange={(e) => setWomenOnly(e.target.checked)}/>

        <br/>
        <input type="submit" value="Salvar" />
      </RoomForm>
    </CenterDiv>
  );
}

export default NewRoom;

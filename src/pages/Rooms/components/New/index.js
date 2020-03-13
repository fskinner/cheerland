import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
// import { useAuth } from "hooks/use-auth.js";

import CenterDiv from "components/CenterDiv"

import { FormBox, FormHeader, Form, InputField, Submit, FormError } from "components/form.styles"

const API_URL = process.env.API_URL || `http://localhost:4000/api`;

const NewRoom = () => {
  const [errors, setErrors] = useState(null);
  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [maxBeds, setMaxBeds] = useState('');
  const [group, setGroup] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [womenOnly, setWomenOnly] = useState(false);

  const history = useHistory();

  const handleSubmit = async(e) => {
    e.preventDefault()

    const room = { label, description, max_beds: maxBeds, group, photo_url: photoUrl, women_only: womenOnly }

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
          const {errors} = await response.json()
          message = errors
        }

        throw Error(JSON.stringify(message))
      }
      console.log('called')
      history.push("/rooms")
    } catch(e) {
      console.log('err', e)
      setErrors(JSON.parse(e.message))
    }
  }

  return (
    <CenterDiv>
      <FormBox size="big">
        <FormHeader>Novo Quarto</FormHeader>
        <Form onSubmit={handleSubmit}>
          { errors && typeof errors === 'string' && <FormError>{errors}</FormError>}

          <InputField name="label" placeholder="Nome" value={label} error={errors && errors.label} onChange={(e) => setLabel(e.target.value)}/>
          <InputField name="description" placeholder="Descrição" value={description} error={errors && errors.description} onChange={(e) => setDescription(e.target.value)}/>
          <InputField name="max_beds" type="number" placeholder="Camas" value={maxBeds} error={errors && errors.max_beds} onChange={(e) => setMaxBeds(e.target.value)}/>
          <InputField name="group" placeholder="Grupo" value={group} error={errors && errors.group} onChange={(e) => setGroup(e.target.value)}/>
          <InputField name="photo_url" placeholder="URL das Fotos" value={photoUrl} error={errors && errors.photo_url} onChange={(e) => setPhotoUrl(e.target.value)}/>

          <br/>
          <label htmlFor="women_only" name="women_only">Quarto feminino?</label>
          <input type="checkbox" id="women_only" placeholder="Quarto feminino?" value={womenOnly} onChange={(e) => setWomenOnly(e.target.checked)}/>

          <Submit type="submit">Salvar</Submit>
        </Form>

      </FormBox>
    </CenterDiv>
  );
}

export default NewRoom;

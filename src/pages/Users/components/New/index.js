import React, { useState } from "react";
// import { useAuth } from "hooks/use-auth.js";

import CenterDiv from "components/CenterDiv"

import { FormBox, FormHeader, Form, InputField, Submit, FormError } from "components/form.styles"

const API_URL = process.env.API_URL || `http://localhost:4000/api`;

const NewUser = ({ history }) => {  
  const [errors, setErrors] = useState(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [allowedGroup, setAllowedGroup] = useState('');
  const [transportation, setTransportation] = useState(false);
  const [coupleBed, setCoupleBed] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault()

    const user = {
      email,
      name,
      password,
      gender,
      allowed_group: allowedGroup,
      needs_transportation: transportation,
      allow_couple_bed: coupleBed,
    }

    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        mode: 'cors',
        body: JSON.stringify({ user })
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

      history.replace("/users")
    } catch(e) {
      setErrors(JSON.parse(e.message))
    }
  }

  return (
    <CenterDiv>
      <FormBox size="big">
        <FormHeader>Novo Usuário</FormHeader>
        <Form onSubmit={handleSubmit}>
          { errors && typeof errors === 'string' && <FormError>{errors}</FormError>}

          <InputField name="name"
            placeholder="Nome completo"
            value={name}
            error={errors && errors.name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputField name="email"
            placeholder="Email"
            type="email"
            value={email}
            error={errors && errors.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField name="password"
            placeholder="Senha"
            type="password"
            value={password}
            error={errors && errors.password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputField name="gender"
            placeholder="Sexo"
            value={gender}
            error={errors && errors.gender}
            onChange={(e) => setGender(e.target.value)}
          />

          <InputField name="allowedGroup"
            placeholder="Grupo comprado"
            value={allowedGroup}
            error={errors && errors.allowedGroup}
            onChange={(e) => setAllowedGroup(e.target.value)}
          />

          {/* BOX FIELDS HERE */}

          <Submit type="submit">Salvar</Submit>
        </Form>

      </FormBox>
    </CenterDiv>
  );
}

export default NewUser;

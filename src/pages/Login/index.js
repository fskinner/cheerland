import React, { useState } from "react";
import { useAuth } from "hooks/use-auth.js";

import CenterDiv from "components/CenterDiv"
import { FormBox, FormHeader, Form, InputField, Submit, FormError } from "components/form.styles"

const API_URL = process.env.API_URL || `http://localhost:4000/api`;

const Login = ({ history }) => {  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const auth = useAuth();

  const handleEmailChange = (e) => {
    setEmail(e.target.value.toLowerCase())
  }

  const handlePassChange = (e) => {
    setPassword(e.target.value.replace(/[^0-9]/g, ''))
  }

  const handleSubmit = async(e) => {
    e.preventDefault()

    try {
      const response = await fetch(`${API_URL}/sessions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        mode: 'cors',
        body: JSON.stringify({ user: { email, password }})
      })

      if(!response.ok) {
        let message = response.statusText

        if (response.status === 401) {
          message = "Senha inválida"
        }

        if (response.status === 404) {
          message = "Usuário não encontrado"
        }

        throw Error(message)
      }

      const data = await response.json()

      auth.auth(data.token)
    } catch(e) {
      setError(e.message)
    }
  }

  return (
    <CenterDiv>
      <FormBox>
        <FormHeader>
          Faça o Login<br/>
          Complete sua reserva
        </FormHeader>
        <Form onSubmit={handleSubmit}>
          { error && <FormError>{error}</FormError>}
          <InputField placeholder="Email" type="email" onChange={handleEmailChange} value={email} autocomplete />
          <InputField placeholder="Senha" type="password" onChange={handlePassChange} value={password} />

          <Submit type="submit">Entrar</Submit>
        </Form>

      </FormBox>
    </CenterDiv>
  );
}

export default Login;

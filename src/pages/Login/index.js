import React, { useState } from "react";
import { useAuth } from "hooks/use-auth.js";

import CenterDiv from "components/CenterDiv"
import { LoginBox, LoginHeader, Form, InputField, Submit, FormError } from "./login.styles"

const API_URL = process.env.API_URL || `http://localhost:4000/api`;

const Login = () => {  
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);

  const auth = useAuth();

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePassChange = (e) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log('handleSubmit', `${API_URL}/sessions`)
    console.log('body', JSON.stringify({ user: { email, password }}))
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
        throw Error(response.statusText)
      }

      const data = await response.json()

      console.log('data.token', data.token)

      auth.auth(data.token)
    } catch(e) {
      console.log('error', e.message)
      setError(e.message)
    }
  }

  return (
    <CenterDiv>
      <LoginBox>
        <LoginHeader>
          Faça o Login<br/>
          Complete sua reserva
        </LoginHeader>
        <Form onSubmit={handleSubmit}>
          { error && <FormError>{error}</FormError>}
          <InputField placeholder="Email" type="email" onChange={handleEmailChange} autocomplete />
          <InputField placeholder="Senha" type="password" onChange={handlePassChange} />

          <Submit type="submit">Entrar</Submit>
        </Form>

      </LoginBox>
    </CenterDiv>
  );
}

export default Login;

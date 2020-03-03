import React from "react"
import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"

import Header from "components/Header"
import { ProvideAuth } from "hooks/use-auth.js"

test("renders logged out Header", async () => {
  const { container } = render(
    <ProvideAuth>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </ProvideAuth>
  )

  expect(container.querySelector("ul")).toHaveTextContent("Quartos")
  expect(container.querySelector("ul")).toHaveTextContent("Usuários")
  expect(container.querySelector("ul")).toHaveTextContent("Entrar")

  expect(container.querySelector("ul")).not.toHaveTextContent("Sair")
  expect(container.querySelector("ul")).not.toHaveTextContent("Olá")
})

test("renders logged Header", async () => {
  const userName = "Foo"
  const fakeAuth = { auth: () => {}, user: { name: userName}, deauth: () => {}}

  const { container } = render(
    <ProvideAuth value={fakeAuth} >
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </ProvideAuth>
  )

  expect(container.querySelector("ul")).toHaveTextContent("Quartos")
  expect(container.querySelector("ul")).toHaveTextContent("Usuários")
  expect(container.querySelector("ul")).toHaveTextContent("Sair")

  expect(container.querySelector("ul")).toHaveTextContent(`Olá, ${userName}`)
  expect(container.querySelector("ul")).not.toHaveTextContent("Entrar")
})

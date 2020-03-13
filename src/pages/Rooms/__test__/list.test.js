import React from "react"
import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { act } from "react-dom/test-utils";

import { ProvideAuth } from "hooks/use-auth.js"

import Rooms from "../components/List"

afterEach(() => {
  global.fetch.mockRestore();
})

test("renders message when there are no rooms", async () => {
  let container = null

  const userName = "Foo"
  const fakeAuth = { auth: () => {}, user: { name: userName }, deauth: () => {}}

  const fakeRooms = [];

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({ data: fakeRooms })
    })
  );

  await act(async () => {
    const rendered = render(
      <ProvideAuth value={fakeAuth}>
        <MemoryRouter>
          <Rooms />
        </MemoryRouter>
      </ProvideAuth>
    )

    container = rendered.container
  });

  expect(container.querySelector("div")).toHaveTextContent("Nenhum quarto cadastrado")
})

test("renders all rooms", async () => {
  let container = null

  const userName = "Foo"
  const fakeAuth = { auth: () => {}, user: { name: userName }, deauth: () => {}}

  const fakeRooms = [
    {
      label: "First",
      max_beds: 5,
      group: "A",
      women_only: true,
    },
    {
      label: "2nd",
      max_beds: 10,
      group: "C",
      women_only: false,
    }
  ];

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({ data: fakeRooms })
    })
  );

  await act(async () => {
    const rendered = render(
      <ProvideAuth value={fakeAuth}>
        <MemoryRouter>
          <Rooms />
        </MemoryRouter>
      </ProvideAuth>
    )

    container = rendered.container
  });

  expect(container.querySelector("li:first-child")).toHaveTextContent("First")
  expect(container.querySelector("li:first-child")).toHaveTextContent("5/5")
  expect(container.querySelector("li:first-child")).toHaveTextContent("Grupo A")
  expect(container.querySelector("li:first-child")).toHaveTextContent("Feminino")
  expect(container.querySelector("li:first-child")).toHaveTextContent("Ver")

  expect(container.querySelector("li:last-child")).toHaveTextContent("2nd")
  expect(container.querySelector("li:last-child")).toHaveTextContent("10/10")
  expect(container.querySelector("li:last-child")).toHaveTextContent("Grupo C")
  expect(container.querySelector("li:last-child")).toHaveTextContent("Misto")
  expect(container.querySelector("li:last-child")).toHaveTextContent("Ver")
})

test("renders add room for admins", async () => {
  let container = null

  const userName = "Foo"
  const fakeAuth = { auth: () => {}, user: { name: userName, is_admin: true }, deauth: () => {}}

  const fakeRooms = [
    {
      label: "First",
      max_beds: 5,
      group: "A",
      women_only: true,
    },
    {
      label: "2nd",
      max_beds: 10,
      group: "C",
      women_only: false,
    }
  ];

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({ data: fakeRooms })
    })
  );

  await act(async () => {
    const rendered = render(
      <ProvideAuth value={fakeAuth}>
        <MemoryRouter>
          <Rooms />
        </MemoryRouter>
      </ProvideAuth>
    )

    container = rendered.container
  });

  expect(container.querySelector("a")).toHaveTextContent("+ room")
})

test("does not render add room for admins", async () => {
  let container = null

  const userName = "Foo"
  const fakeAuth = { auth: () => {}, user: { name: userName, is_admin: false }, deauth: () => {}}

  const fakeRooms = [
    {
      label: "First",
      max_beds: 5,
      group: "A",
      women_only: true,
    },
    {
      label: "2nd",
      max_beds: 10,
      group: "C",
      women_only: false,
    }
  ];

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({ data: fakeRooms })
    })
  );

  await act(async () => {
    const rendered = render(
      <ProvideAuth value={fakeAuth}>
        <MemoryRouter>
          <Rooms />
        </MemoryRouter>
      </ProvideAuth>
    )

    container = rendered.container
  });

  expect(container.querySelector("a")).not.toHaveTextContent("+ room")
})

test("renders error message", async () => {
  let container = null

  const userName = "Foo"
  const fakeAuth = { auth: () => {}, user: { name: userName }, deauth: () => {}}

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.reject(new Error())
  );

  await act(async () => {
    const rendered = render(
      <ProvideAuth value={fakeAuth}>
        <MemoryRouter>
          <Rooms />
        </MemoryRouter>
      </ProvideAuth>
    )

    container = rendered.container
  });

  expect(container.querySelector("div")).toHaveTextContent("Failed to load rooms")
})

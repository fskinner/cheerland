import React from "react"
import { render, fireEvent } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { act } from "react-dom/test-utils";
// import { createMemoryHistory } from 'history'

import { ProvideAuth } from "hooks/use-auth.js"

import NewRoom from "../components/New"

const leftClick = { button: 1 }

afterEach(() => {
  if(global.fetch && typeof global.fetch.mockRestore === 'function') {
    global.fetch.mockRestore()
  }
})

test("renders empty room form", async () => {
  const userName = "Foo"
  const fakeAuth = { auth: () => {}, user: { name: userName }, deauth: () => {}}

  const { container } = render(
    <ProvideAuth value={fakeAuth}>
      <MemoryRouter>
        <NewRoom />
      </MemoryRouter>
    </ProvideAuth>
  )

  expect(container.querySelector("header")).toHaveTextContent("Novo Quarto")

  expect(container.querySelector("input[name=label]")).toBeEmpty()
  expect(container.querySelector("input[name=label]")).toHaveAttribute('placeholder', 'Nome')

  expect(container.querySelector("input[name=description]")).toBeEmpty()
  expect(container.querySelector("input[name=description]")).toHaveAttribute('placeholder', 'Descrição')

  expect(container.querySelector("input[name=max_beds]")).toBeEmpty()
  expect(container.querySelector("input[name=max_beds]")).toHaveAttribute('placeholder', 'Camas')

  expect(container.querySelector("input[name=group]")).toBeEmpty()
  expect(container.querySelector("input[name=group]")).toHaveAttribute('placeholder', 'Grupo')

  expect(container.querySelector("input[name=photo_url]")).toBeEmpty()
  expect(container.querySelector("input[name=photo_url]")).toHaveAttribute('placeholder', 'URL das Fotos')

  expect(container.querySelector("button")).toHaveTextContent("Salvar")
  expect(container.querySelector("button")).toHaveAttribute('type', 'submit')
})

test("fills room form", async () => {
  const userName = "Foo"
  const fakeAuth = { auth: () => {}, user: { name: userName }, deauth: () => {}}

  const { container } = render(
    <ProvideAuth value={fakeAuth}>
      <MemoryRouter>
        <NewRoom />
      </MemoryRouter>
    </ProvideAuth>
  )

  fireEvent.change(container.querySelector("input[name=label]"), {
    target: {
      value: 'New Cool Name',
    },
  })

  fireEvent.change(container.querySelector("input[name=description]"), {
    target: {
      value: 'New Description',
    },
  })

  fireEvent.change(container.querySelector("input[name=max_beds]"), {
    target: {
      value: '5',
    },
  })

  fireEvent.change(container.querySelector("input[name=group]"), {
    target: {
      value: 'A',
    },
  })

  fireEvent.change(container.querySelector("input[name=photo_url]"), {
    target: {
      value: 'http://www.imagem.com/image.png',
    },
  })


  expect(container.querySelector("input[name=label]")).toHaveAttribute('value', 'New Cool Name')
  expect(container.querySelector("input[name=description]")).toHaveAttribute('value', 'New Description')
  expect(container.querySelector("input[name=max_beds]")).toHaveAttribute('value', '5')
  expect(container.querySelector("input[name=group]")).toHaveAttribute('value', 'A')
  expect(container.querySelector("input[name=photo_url]")).toHaveAttribute('value', 'http://www.imagem.com/image.png')
})

test("saves a new room", async () => {
  const userName = "Foo"
  const fakeAuth = { auth: () => {}, user: { name: userName, is_admin: true  }, deauth: () => {}}
  // const history = createMemoryHistory({ initialEntries: ['/rooms/new']})
  const mockHistoryReplace = jest.fn();

  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
      replace: mockHistoryReplace,
    }),
  }));

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({ data: { message: true} }),
        ok: true,
        status: 201
    })
  );

  const { container, debug } = render(
    <ProvideAuth value={fakeAuth}>
      <MemoryRouter initialEntries={['/rooms/new']}>
        <NewRoom />
      </MemoryRouter>
    </ProvideAuth>
  )

  fireEvent.change(container.querySelector("input[name=label]"), {
    target: {
      value: 'New Cool Name',
    },
  })

  fireEvent.change(container.querySelector("input[name=description]"), {
    target: {
      value: 'New Description',
    },
  })

  fireEvent.change(container.querySelector("input[name=max_beds]"), {
    target: {
      value: '5',
    },
  })

  fireEvent.change(container.querySelector("input[name=group]"), {
    target: {
      value: 'A',
    },
  })

  fireEvent.change(container.querySelector("input[name=photo_url]"), {
    target: {
      value: 'http://www.imagem.com/image.png',
    },
  })

  await act(async () => {
    fireEvent.click(container.querySelector("button[type=submit]"), leftClick)
  });

  console.log(container)
  console.log(debug())

  // expect(window.location.pathname).toBe('/rooms')
  expect(mockHistoryReplace).toHaveBeenCalled();
  // expect(history.location.pathname).toBe('/rooms')

})

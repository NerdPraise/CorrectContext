import { cleanup, render } from "@testing-library/react"
import { Provider } from "react-redux"

import { ModalPage } from "./ModalPage"
import store from "../../redux/index"

afterEach(cleanup)

describe("ModalPage", () => {
  test("should render a Modal Page", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <ModalPage />
      </Provider>
    )

    expect(getByTestId("modal-page-wrapper")).toBeInTheDocument()
  })
})

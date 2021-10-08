import { FC } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import { ModalPage } from "../pages"

const IndexRouter: FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="" component={ModalPage} />
    </Switch>
  </BrowserRouter>
)

export default IndexRouter

import { Switch, Route } from "react-router-dom"
import React from "react"
import Header from "./Header"
import Pets from "../pages/Pets"

const App = () => (
  <>
    <Header />
    <div>
      <Switch>
        <Route exact path="/" component={Pets} />
      </Switch>
    </div>
  </>
)

export default App

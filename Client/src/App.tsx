// PLUGINS IMPORTS //
import { Switch, Route } from "react-router-dom"
import React from "react"

// COMPONENTS IMPORTS //
import Header from "./components/Header"
import Pets from "./screens/PetsScreen"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

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

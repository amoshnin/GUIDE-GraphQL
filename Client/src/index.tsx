// PLUGINS IMPORTS //
import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import { ApolloProvider } from "@apollo/client"

// COMPONENTS IMPORTS //
import App from "./App"
import client from "./api"

// EXTRA IMPORTS //
import "./index.css"

/////////////////////////////////////////////////////////////////////////////

const Root = () => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
)

ReactDOM.render(<Root />, document.getElementById("app"))

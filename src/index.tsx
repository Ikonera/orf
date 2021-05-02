import React, { FunctionComponent } from "react"
import ReactDOM from "react-dom"
import { CssBaseline, ThemeProvider } from "@material-ui/core"
import { BrowserRouter as Router } from "react-router-dom"
import Header from "./Components/Header/header.component"
import theme from "./Theme/theme"
import RouterView from "./Components/RouterView/routerView.component"

const App: FunctionComponent = () =>
{
    return (
        <Router>
            <CssBaseline />
            <Header />
            <RouterView />
        </Router>
    )
}


ReactDOM.render(
    <App />,
    document.querySelector("#root")
)
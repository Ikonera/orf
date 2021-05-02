import React, { FunctionComponent } from "react"
import { Switch, Route } from "react-router-dom"
import Register from "../Register/register.component"
import Connexion from "../Connexion/connexion.component"
import Home from "../Home/home.component"

const RouterView: FunctionComponent = () =>
{
    return (
        <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/connexion" component={Connexion} />
            <Route exact path="/" component={Home} />
        </Switch>
    )
}

export default RouterView
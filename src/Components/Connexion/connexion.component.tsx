import { Button, Grid, TextField, Typography } from "@material-ui/core"
import React, { FunctionComponent, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import axios from "axios"

const Connexion: FunctionComponent = () =>
{

    const [mailAddress, setMailAddress] = useState('')
    const [password, setPassword] = useState('')
    let history = useHistory()

    const handleConnexion = async () =>
    {
        const payload = {
            email: mailAddress,
            password: password
        }
        let response = await axios.post("http://localhost:8000/login", payload)
        if (response.data.message === "User connected")
        {
            localStorage.setItem("orfMail", response.data.user.email)
            localStorage.setItem("orfToken", response.data.user.token)
            localStorage.setItem("orfID", response.data.user._id)
            history.push('/')
        }
    }

    return (
        <Grid container>
            <form>
                <TextField label="Adresse mail" onChange={event => setMailAddress(event.target.value)}></TextField>
                <TextField label="Mot de passe" onChange={event => setPassword(event.target.value)}></TextField>
                <Button onClick={handleConnexion}>
                    Se connecter
                </Button>
                <Link to="/register">
                    <Typography>Créer un compte</Typography>
                </Link>
            </form>
        </Grid>
    )
}

export default Connexion
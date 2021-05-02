import { Button, Grid, TextField, Typography } from "@material-ui/core"
import React, { FunctionComponent, useState } from "react"
import axios from "axios"
import { Link, useHistory } from "react-router-dom"

const Register: FunctionComponent = () =>
{
    const [name, setName] = useState('')
    const [mailAddress, setMailAddress] = useState('')
    const [password, setPassword] = useState('')
    let history = useHistory()

    const handleConnexion = async () =>
    {
        const payload = {
            email: mailAddress,
            name: name,
            password: password
        }
        let response = await axios.post("http://localhost:8000/register", payload)
        if (response.status === 201)
        {
            localStorage.setItem("orfMail", mailAddress)
            localStorage.setItem("orfName", name)
            localStorage.setItem("orfToken", response.data.user.token)
            history.push('/')
        }
    }

    return (
        <Grid container>
            <form>
                <TextField label="Adresse mail" onChange={event => setMailAddress(event.target.value)}></TextField>
                <TextField label="Nom d'utilisateur" onChange={event => setName(event.target.value)}></TextField>
                <TextField label="Mot de passe" onChange={event => setPassword(event.target.value)}></TextField>
                <Button onClick={handleConnexion}>
                    Se connecter
                </Button>
                <Link to="/connexion">
                    <Typography>J'ai un compte</Typography>
                </Link>
            </form>
        </Grid>
    )
}

export default Register

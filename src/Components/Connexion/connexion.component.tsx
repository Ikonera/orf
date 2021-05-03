import { Button, Grid, TextField, Typography, Snackbar, makeStyles } from "@material-ui/core"
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert"
import React, { FunctionComponent, useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import axios from "axios"


const useTheme = makeStyles({
    root: {
        width: "25%",
        margin: "8% auto"
    },
    input: {
        marginBottom: "7%"
    },
    createAccount: {
        alignSelf: "flex-end",
        textDecoration: "none"
    }
})


const Connexion: FunctionComponent = () =>
{
    const classes = useTheme()
    const [mailAddress, setMailAddress] = useState('')
    const [password, setPassword] = useState('')
    let history = useHistory()
    const [openSnack, setOpenSnack] = useState(false)
    const [isError, setIsError] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() =>
    {
        let timer = setTimeout(() =>
        {
            setOpenSnack(false)
        }, 6000)
        return () => clearTimeout(timer)
    }, [openSnack])

    const handleConnexion = () =>
    {
        const payload = {
            email: mailAddress,
            password: password
        }
        axios.post("http://localhost:8000/login", payload)
        .then(response =>
        {
            localStorage.setItem("orfMail", response.data.user.email)
            localStorage.setItem("orfToken", response.data.user.token)
            localStorage.setItem("orfID", response.data.user._id)
            history.push('/')
        })
        .catch(error =>
        {
            setOpenSnack(true)
            setIsError(true)
            setMessage(error.response.data.message)
        })
    }

    const handleSnackClose = () => {}

    return (
        <form>
            <Grid container direction="column" className={classes.root}>
                <TextField className={classes.input} label="Mail address" onChange={event => setMailAddress(event.target.value)} autoFocus></TextField>
                <TextField className={classes.input} label="Password" onChange={event => setPassword(event.target.value)}></TextField>
                <Link to="/register" className={classes.createAccount}>
                    <Typography>Create an account</Typography>
                </Link>
                <Button onClick={handleConnexion} color="primary" variant="outlined">
                    Login
                </Button>
            </Grid>
            <Snackbar
                open={openSnack}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                onClose={handleSnackClose}>
                    <Alert severity={isError ? "error": "info"}>
                        { message }
                    </Alert>
            </Snackbar>
        </form>
    )
}

function Alert(props: AlertProps)
{
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

export default Connexion
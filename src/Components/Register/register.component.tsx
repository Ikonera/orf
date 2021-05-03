import { Button, Grid, TextField, Typography, Snackbar, makeStyles } from "@material-ui/core"
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert"
import React, { FunctionComponent, useState, useEffect } from "react"
import axios from "axios"
import { Link, useHistory } from "react-router-dom"


const useTheme = makeStyles({
    root: {
        width: "25%",
        margin: "8% auto"
    },
    input: {
        marginBottom: "7%"
    },
    haveAnAccount: {
        alignSelf: "flex-end",
        textDecoration: "none"
    }
})


const Register: FunctionComponent = () =>
{
    const classes = useTheme()
    const [name, setName] = useState('')
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

    const handleRegistration = () =>
    {
        const payload = {
            email: mailAddress,
            name: name,
            password: password
        }
        axios.post("http://localhost:8000/register", payload)
        .then(response =>
        {
            localStorage.setItem("orfMail", mailAddress)
            localStorage.setItem("orfName", name)
            localStorage.setItem("orfToken", response.data.user.token)
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
                <TextField className={classes.input} label="Username" onChange={event => setName(event.target.value)}></TextField>
                <TextField className={classes.input} label="Password" onChange={event => setPassword(event.target.value)}></TextField>
                <Link to="/connexion" className={classes.haveAnAccount}>
                    <Typography>Already have an account</Typography>
                </Link>
                <Button onClick={handleRegistration} color="primary" variant="outlined">
                    Signin
                </Button>
            
                <Snackbar
                    open={openSnack}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    onClose={handleSnackClose}>
                        <Alert severity={isError ? "error": "info"}>
                            { message }
                        </Alert>
                </Snackbar>
            </Grid>
        </form>
    )
}

function Alert(props: AlertProps)
{
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

export default Register

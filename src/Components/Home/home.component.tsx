import { Button, Grid, Select, MenuItem, Typography, InputLabel, Snackbar } from "@material-ui/core"
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert"
import React, { FunctionComponent, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"
import IUser from "../../ìnterfaces/user.interface"
import { makeStyles } from "@material-ui/core/styles"
import INotification from "../../ìnterfaces/notification.interface"

const useTheme = makeStyles({
    root: {
        border: "1px solid black"
    },
    middle: {
        justifyContent: "center"
    },
    notifs: {
        border: "1px solid black"
    }
})

const Home: FunctionComponent = () =>
{
    const classes = useTheme()
    const history = useHistory()
    const [users, setUsers] = useState([])
    const [notifs, setNotifs] = useState([])
    const [userWhoDrink, setUserWhoDrink] = useState('')
    const [openSnack, setOpenSnack] = useState(false)
    const [isError, setIsError] = useState(false)
    const [message, setMessage] = useState('')


    const CALL_BACK = 180000

    useEffect(() =>
    {
        if (!localStorage.getItem("orfToken"))
        {
            history.push("/connexion")
        }
        getAllUsers()
        getNotifs()
    }, [])

    useEffect(() =>
    {
        let timer = setTimeout(() =>
        {
            setOpenSnack(false)
        }, 6000)
        return () => clearTimeout(timer)
    }, [openSnack])

    useEffect(() =>
    {
        let timer = setInterval(() =>
        {
            getNotifs()
        }, CALL_BACK)
        return () => clearInterval(timer)
    }, [])

    const token = localStorage.getItem("orfToken") as String

    const getNotifs = async () =>
    {
        const id = localStorage.getItem("orfID") as String
        let response = await axios.get(`http://localhost:8000/user/notifications`, {
            headers: { "Authorization": "Bearer "+ token }
        })
        if (response.data.notifications)
        {
            console.log(response.data.notifications)
            setNotifs(response.data.notifications)
            setOpenSnack(true)
            setIsError(false)
            setMessage(response.data.message)
        }
        if (response.status === 400)
        {
            setOpenSnack(true)
            setIsError(true)
            setMessage(response.data.message)
        }
    }


    const getAllUsers = async () =>
    {
        let response = await axios.get("http://localhost:8000/users", {
            headers: {"Authorization": "Bearer "+ token}
        })
        console.log(response.data)
        if (response.status === 200)
        {
            setUsers(response.data.users)
        }
        if (response.status === 400)
        {
            setOpenSnack(true)
            setIsError(true)
            setMessage(response.data.message)
        }
    }

    const sendShotTo = async (id: string) =>
    {
        const payload = {
            targetId: id
        }
        let response = await axios.post("http://localhost:8000/user/sendshot", payload, {
            headers: { "Authorization": "Bearer "+ token }
        })
        if (response.status === 200)
        {
            setOpenSnack(true)
            setIsError(false)
            setMessage(response.data.message)
        }
        if (response.status === 400)
        {
            setOpenSnack(true)
            setIsError(true)
            setMessage(response.data.message)
        }
    }

    const handleWhoDrink = (id: any) => 
    {
        setUserWhoDrink(id)
    }

    const handleDrinking = (hasDrunk: boolean) =>
    {
        try
        {
            const payload = {
                drink: hasDrunk
            }
            axios.post("http://localhost:8000/user/takeshot", payload, {
                headers: { "Authorization": "Bearer "+token }
            })
            .then(response =>
            {
                setOpenSnack(true)
                setIsError(false)
                setMessage(response.data.message)
            })
            .catch(error =>
            {
                setOpenSnack(true)
                setIsError(true)
                setMessage(error.response.data)
            })
        }
        catch (error)
        {
            console.log(error)
        }
    }

    const handleSnackClose = () =>
    {

    }


    return (
        <Grid container direction="column" className={classes.root}>
            <Grid item container md={2}>
                <InputLabel id="userSelect">Utilisateur</InputLabel>
                <Select
                labelId="userSelect"
                    value={userWhoDrink}
                    onChange={event => handleWhoDrink(event.target.value)}>
                {
                    users.map((user: IUser, idx: number) =>
                    (
                        <MenuItem key={idx} value={user._id}>
                            <Typography>
                                { user.name }
                            </Typography>
                        </MenuItem>
                    ))
                }
                </Select>
                <Grid item>
                    <Button onClick={event => sendShotTo(userWhoDrink)} >Send a shot !</Button>
                </Grid>
            </Grid>
            <Grid item container className={ classes.notifs }>
                    {
                        notifs.map((notif: INotification) =>
                        (
                            <Grid item container md={3} direction="column">
                                <Grid item>
                                    <Typography>{ notif.title }</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography>{ notif.message }</Typography>
                                </Grid>
                                <Grid item container>
                                    <Button onClick={event => handleDrinking(true)}>I've drunk !</Button>
                                    <Button onClick={event => handleDrinking(false)}>I'm a pussy...</Button>
                                </Grid>
                            </Grid>
                        ))
                    }
            </Grid>
            <Snackbar
                open={openSnack}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                onClose={handleSnackClose}>
                    <Alert severity={isError ? "error": "info"}>
                        { message }
                    </Alert>
            </Snackbar>
        </Grid>
    )
}


function Alert(props: AlertProps)
{
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

export default Home
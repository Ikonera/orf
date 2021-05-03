import { AppBar, Grid, makeStyles, Typography } from "@material-ui/core"
import React, { FunctionComponent } from "react"

const useTheme = makeStyles({
    header: {
        padding: "1.5em"
    },
    title: {
        color: "white"
    }
})

const Header: FunctionComponent = () =>
{
    const classes = useTheme()

    return (
        <AppBar position="static" className={classes.header}>
            <Grid container justify="center">
                <Typography variant="h5" className={classes.title}>
                    Orf... fallait un nom
                </Typography>
            </Grid>
        </AppBar>
    )
}

export default Header
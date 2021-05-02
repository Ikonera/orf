import { AppBar, Grid, Typography } from "@material-ui/core"
import React, { FunctionComponent } from "react"

const Header: FunctionComponent = () =>
{
    return (
        <AppBar position="static">
            <Grid container justify="center">
                <Typography>
                    Orf... fallait un nom
                </Typography>
            </Grid>
        </AppBar>
    )
}

export default Header
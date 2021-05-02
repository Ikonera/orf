import { createMuiTheme } from "@material-ui/core"
import MountHills from "../assets/fonts/mount_hills/Mount-Hills.otf"


const mounthills = {
    fontFamily: "MountHills",
    fontStyle: "normal",
    fontDisplay: "swap",
    fontWeight: 400,
    src: `local('mounthills'),url(${MountHills})`
}

const Theme = createMuiTheme({
    typography: {
        fontFamily: "MountHills"
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '@font-face': [mounthills]
            }
        }
    }
})

export default theme
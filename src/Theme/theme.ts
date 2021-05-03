import { createMuiTheme } from "@material-ui/core"
import Lato from "../../public/assets/fonts/Lato/Lato-Regular.ttf"


const lato = {
    fontFamily: "Lato",
    fontStyle: "normal",
    fontWeight: 65,
    src: `local('lato'),url(${Lato})`
}

const Theme = createMuiTheme({
    palette: {
        primary: {
            main: "#FF776F"
        },
        secondary: {
            main: "#DA445B"
        }
    },
    typography: {
        fontFamily: "Lato"
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '@font-face': [lato]
            }
        }
    }
})

export default Theme
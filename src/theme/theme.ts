import {createTheme} from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#fff",
        },
        secondary: {
            main: "#000",
        },
    },
    components: {
        MuiButtonBase: {
            styleOverrides: {
                root: {
                    color: "#fff",
                },
            },
        },
    },
});

export default theme;

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "@emotion/react";
import theme from "./theme/theme";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <BrowserRouter>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </BrowserRouter>
);

import React from "react";
import {Container} from "@mui/material";
import {Routes, Route, Navigate} from "react-router-dom";
import {bookStore} from "./store/store";
import {Provider} from "mobx-react";
import ListOfBooks from "./components/ListOfBooks/ListOfBooks";
import DetailBook from "./components/DetailBook/DetailBook";
import Header from "./components/Header/Header";
import "./App.css";

const App: React.FC = () => {
    return (
        <Provider store={bookStore}>
            <Header />
            <Container maxWidth={"xl"}>
                <Routes>
                    <Route path="/" element={<ListOfBooks />} />
                    <Route path="/:id" element={<DetailBook />} />
                    <Route path="/*" element={<Navigate to="/" />} />
                </Routes>
            </Container>
        </Provider>
    );
};

export default App;

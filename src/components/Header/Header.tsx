import React from "react";
import {observer} from "mobx-react-lite";
import {useLocation} from "react-router-dom";
import SearchTerm from "./components/SearchTerm/SearchTerm";
import CountBook from "./components/CountBook/CountBook";

const Header = () => {
    const {pathname} = useLocation();

    return (
        <>
            <SearchTerm />
            {pathname === "/" ? <CountBook /> : null}
        </>
    );
};

export default observer(Header);

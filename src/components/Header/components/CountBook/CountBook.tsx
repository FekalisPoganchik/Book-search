import React, {useEffect} from "react";
import {observer} from "mobx-react";
import {Box, Typography} from "@mui/material";
import {bookStore} from "../../../../store/store";

const CountBook = observer(() => {
    useEffect(() => {
        bookStore.getBooksData(0);
    }, []);

    return (
        <Box display={"flex"} justifyContent={"center"}>
            <Typography gutterBottom variant="h6" color="textSecondary">
                Found {bookStore.totalItems} result
            </Typography>
        </Box>
    );
});

export default CountBook;

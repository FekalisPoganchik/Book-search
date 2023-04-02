import React from "react";
import {
    TextField,
    FormControl,
    Select,
    MenuItem,
    SelectChangeEvent,
    AppBar,
    Toolbar,
} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {Link} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {bookStore} from "../../../../store/store";

function SearchTerm(): JSX.Element {
    const handleSearch = () => {
        bookStore.handleSearch();
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        bookStore.handleKeyPress(event);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        bookStore.setSearchTerm(event.target.value);
    };

    const handleCategoryChange = (event: SelectChangeEvent<string>) => {
        bookStore.setCategory(event.target.value);
    };

    const handleSortChange = (event: SelectChangeEvent<string>) => {
        bookStore.setSort(
            event.target.value as "relevance" | "newest" | undefined
        );
    };

    return (
        <AppBar position="static" sx={{mb: 3}}>
            <Toolbar sx={{display: "flex", justifyContent: "center"}}>
                <TextField
                    label="Search"
                    variant="standard"
                    value={bookStore.searchTerm}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    style={{marginBottom: "12px"}}
                />
                <Link to={"/"}>
                    <LoadingButton
                        loading={bookStore.searchLoading}
                        onClick={handleSearch}
                        disabled={!bookStore.searchTerm}
                        variant="outlined"
                        sx={{mr: 2}}
                    >
                        Search
                    </LoadingButton>
                </Link>
                <FormControl sx={{mr: 2}}>
                    <Select
                        value={bookStore.category}
                        onChange={handleCategoryChange}
                        size="small"
                    >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="art">Art</MenuItem>
                        <MenuItem value="biography">Biography</MenuItem>
                        <MenuItem value="computers">Computers</MenuItem>
                        <MenuItem value="history">History</MenuItem>
                        <MenuItem value="medical">Medical</MenuItem>
                        <MenuItem value="poetry">Poetry</MenuItem>
                    </Select>
                </FormControl>
                <FormControl>
                    <Select
                        labelId="sort-label"
                        value={bookStore.sort}
                        onChange={handleSortChange}
                        size="small"
                    >
                        <MenuItem value="relevance">Relevance</MenuItem>
                        <MenuItem value="newest">Newest</MenuItem>
                    </Select>
                </FormControl>
            </Toolbar>
        </AppBar>
    );
}

export default observer(SearchTerm);

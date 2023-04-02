import React from "react";
import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActionArea,
    Box,
} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {Link} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {bookStore} from "../../store/store";

function ListOfBooks(): JSX.Element {
    const handleLoadMore = () => {
        bookStore.handleLoadMore();
    };

    const handleSetId = (event: string) => {
        bookStore.setId((bookStore.id = event));
    };

    const isLoadMoreDisabled = bookStore.books.length >= bookStore.totalItems;

    return (
        <>
            <Grid container columns={{md: 10}} spacing={2} alignItems="stretch">
                {bookStore.books.map((book, index) => (
                    <Grid item md={2} key={index}>
                        <Link to={`/${book.id}`}>
                            <CardActionArea
                                onClick={() => handleSetId(book.id)}
                                sx={{
                                    height: "100%",
                                }}
                            >
                                <Card
                                    sx={{
                                        height: "100%",
                                    }}
                                >
                                    {book.volumeInfo.imageLinks?.thumbnail && (
                                        <CardMedia
                                            component="img"
                                            height={250}
                                            image={
                                                book.volumeInfo.imageLinks
                                                    .thumbnail
                                            }
                                            alt={book.volumeInfo.title}
                                            style={{
                                                objectFit: "contain",
                                            }}
                                        />
                                    )}
                                    <CardContent>
                                        <Typography gutterBottom variant="h6">
                                            {book.volumeInfo.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            component="p"
                                            sx={{textDecoration: "underline"}}
                                        >
                                            {book.volumeInfo.categories}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="textSecondary"
                                            component="p"
                                            sx={{fontStyle: "italic"}}
                                        >
                                            {book.volumeInfo.authors?.join(
                                                ", "
                                            )}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </CardActionArea>
                        </Link>
                    </Grid>
                ))}
            </Grid>
            {bookStore.books.length > 0 && (
                <Box mt={2} display={"flex"} justifyContent={"center"}>
                    <LoadingButton
                        disabled={isLoadMoreDisabled}
                        loading={bookStore.isLoading}
                        onClick={handleLoadMore}
                        variant="outlined"
                        color="primary"
                        size="large"
                    >
                        Load More
                    </LoadingButton>
                </Box>
            )}
        </>
    );
}

export default observer(ListOfBooks);

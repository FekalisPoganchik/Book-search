import React, {useEffect} from "react";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {
    Backdrop,
    Card,
    CardContent,
    CardMedia,
    Chip,
    CircularProgress,
    Typography,
    Button,
} from "@mui/material";
import {bookStore} from "../../store/store";

function BookDetails(): JSX.Element {
    const navigate = useNavigate();

    useEffect(() => {
        if (bookStore.id.length === 0) {
            navigate("/", {replace: true});
        }

        bookStore.getBookData(bookStore.id);
    }, [navigate]);

    const handleBackClick = () => {
        navigate("/");
    };

    if (bookStore.isLoading || !bookStore.book) {
        return (
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={true}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }

    const book = bookStore.book;

    return (
        <>
            <Card>
                {book.volumeInfo.imageLinks?.thumbnail && (
                    <CardMedia
                        component="img"
                        height={400}
                        image={book.volumeInfo.imageLinks.thumbnail}
                        alt={book.volumeInfo.title}
                        style={{objectFit: "contain"}}
                    />
                )}
                <CardContent sx={{flexGrow: 1}}>
                    <Typography gutterBottom variant="h4" component="div">
                        {book.volumeInfo.title}
                    </Typography>
                    {book.volumeInfo.categories && (
                        <Typography variant="subtitle1" gutterBottom>
                            Categories:{" "}
                            {book.volumeInfo.categories.map((category) => (
                                <Chip
                                    key={category}
                                    label={category}
                                    style={{margin: "5px"}}
                                />
                            ))}
                        </Typography>
                    )}
                    {book.volumeInfo.authors && (
                        <Typography variant="subtitle1" gutterBottom>
                            Authors: {book.volumeInfo.authors.join(", ")}
                        </Typography>
                    )}
                    {book.volumeInfo.description && (
                        <Typography variant="body1" gutterBottom>
                            {book.volumeInfo.description.replace(
                                /<\/?[^>]+(>|$)/g,
                                ""
                            )}
                        </Typography>
                    )}
                </CardContent>
            </Card>
            <Button
                onClick={handleBackClick}
                sx={{mt: 2}}
                size="large"
                variant="outlined"
            >
                Back
            </Button>
        </>
    );
}

export default observer(BookDetails);

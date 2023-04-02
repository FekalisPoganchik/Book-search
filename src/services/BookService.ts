import axios from "axios";

export interface Options {
    searchTerm: string;
    category?: string;
    page?: number;
    sort?: "relevance" | "newest";
}

const LINK = "https://www.googleapis.com/books/v1/volumes";
const API = "AIzaSyAkoEeQNOTb9jXQ5Cvs87jEXgikyB3Q_Zs";
const MAX_RESULTS = 30;

export const getBooks = async ({
    searchTerm,
    category = "",
    page = 0,
    sort,
}: Options) => {
    const startIndex = MAX_RESULTS * page;
    try {
        const response = await axios.get(
            `${LINK}?q=${searchTerm}+subject:${category}&maxResults=${MAX_RESULTS}&startIndex=${startIndex}&orderBy=${sort}&key=${API}`
        );

        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getBookById = async (bookId: string) => {
    try {
        const response = await axios.get(`${LINK}/${bookId}`);

        const bookData = response.data;

        return {
            id: bookData.id,
            volumeInfo: {
                title: bookData.volumeInfo.title,
                categories: bookData.volumeInfo.categories,
                authors: bookData.volumeInfo.authors,
                imageLinks: bookData.volumeInfo.imageLinks,
                description: bookData.volumeInfo.description,
            },
        };
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getCountBooks = async ({
    searchTerm,
    category = "",
    sort,
}: Options) => {
    try {
        const response = await axios.get(
            `${LINK}?q=${searchTerm}+subject:${category}&orderBy=${sort}&key=${API}`
        );

        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

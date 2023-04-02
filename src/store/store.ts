import {makeAutoObservable} from "mobx";
import {
    Options,
    getBookById,
    getBooks,
    getCountBooks,
} from "../services/BookService";

interface Book {
    id: string;
    volumeInfo: {
        title?: string;
        categories?: string[];
        authors?: string[];
        imageLinks?: {
            thumbnail: string;
        };
        description?: string;
    };
}

interface Books {
    id: string;
    volumeInfo: {
        title?: string;
        categories?: string[];
        authors?: string[];
        imageLinks?: {
            thumbnail: string;
        };
    };
}

export class BookStore {
    book: Book | null = null;
    books: Books[] = [];
    startIndex = 0;
    searchTerm = "";
    category = "all";
    sort: "relevance" | "newest" | undefined = "relevance";
    isLoading = false;
    searchLoading = false;
    id = "";
    totalItems = 0;

    constructor() {
        makeAutoObservable(this);
    }

    async getBookData(id: string) {
        if (!id) return;

        this.setIsLoading(true);

        try {
            const bookData = await getBookById(id);
            this.setBook(bookData);
        } catch (error) {
            console.error(error);
            this.setBook(null);
        }

        this.setIsLoading(false);
    }

    async getBooksData(page: number) {
        if (this.searchTerm) {
            this.setSearchLoading(true);
            const options: Options = {
                searchTerm: this.searchTerm,
                category: this.category === "all" ? "" : this.category,
                page,
                sort: this.sort,
            };
            const countOfBook: Options = {
                searchTerm: this.searchTerm,
                category: this.category === "all" ? "" : this.category,
                sort: this.sort,
            };
            const {items} = await getBooks(options);
            this.setSearchLoading(false);
            const {totalItems} = await getCountBooks(countOfBook);
            this.setTotalItems(totalItems);
            if (items === undefined) {
                return [];
            } else {
                return items;
            }
        }
    }

    async handleSearch() {
        if (!this.searchTerm) {
            return;
        }
        const page = 0;
        this.setStartIndex(0);
        const items = await this.getBooksData(page);
        this.setBooks(items);
    }

    async handleLoadMore() {
        const newStartIndex = this.startIndex + 30;
        this.setStartIndex(newStartIndex);
        const page = Math.floor(newStartIndex / 30);
        this.setIsLoading(true);
        const items = await this.getBooksData(page);
        this.setIsLoading(false);
        this.setBooks([...this.books, ...items]);
    }

    handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            this.handleSearch();
        }
    }

    setTotalItems = (totalItems: number) => {
        this.totalItems = totalItems;
    };

    setBook = (book: Book | null) => {
        this.book = book;
    };

    setBooks = (books: Books[]) => {
        this.books = books;
    };

    setStartIndex = (startIndex: number) => {
        this.startIndex = startIndex;
    };

    setSearchTerm = (searchTerm: string) => {
        this.searchTerm = searchTerm;
    };

    setCategory = (category: string) => {
        this.category = category;
    };

    setSort = (sort: "relevance" | "newest" | undefined) => {
        this.sort = sort;
    };

    setIsLoading = (isLoading: boolean) => {
        this.isLoading = isLoading;
    };

    setSearchLoading = (searchLoading: boolean) => {
        this.searchLoading = searchLoading;
    };

    setId = (e: string) => {
        this.id = e;
    };
}

export const bookStore = new BookStore();

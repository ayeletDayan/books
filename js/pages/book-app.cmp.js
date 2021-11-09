import { bookService } from '../services/book-service.js';
import bookList from '../cmps/book-list.cmp.js';
import bookAdd from '../cmps/add-book.cmp.js';
import bookFilter from '../cmps/book-filter.cmp.js';
import bookDetails from './book-details.cmp.js';

export default {
    template: `
    <section class="book-app">
            <book-add @add-book="addBook" />
            <book-filter @filtered="setFilter" />
            <book-list v-if="isShown" :books="booksToShow" @selected="selectBook" />
        </section>

    `,
    data() {
        return {
            books: bookService.query(),
            // selectedBook: null,
            filterBy: null,
            isShown: true
        };
    },
    created() {
        this.loadBooks();
    },
    methods: {
        loadBooks() {
            bookService.query()
                .then(books => this.books = books);
        },
        selectBook(book) {
            this.selectedBook = book;
            this.isShown = false;
        },
        closeDetails() {
            this.selectedBook = null;
            this.isShown = true;
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
        addBook(newBook){
            bookService.addBook(newBook)
                .then(this.loadBooks)
        }
    },

    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books;
            const searchStr = this.filterBy.title.toLowerCase();
            const sortBy = this.books.filter((book) => {
                return book.title.toLowerCase().includes(searchStr);
            });
            const minPrice = (this.filterBy.minPrice) ? this.filterBy.minPrice : 0
            const maxPrice = (this.filterBy.maxPrice) ? this.filterBy.maxPrice : Infinity

            const filterBook = sortBy.filter(book => {
                return (book.listPrice.amount >= minPrice && book.listPrice.amount <= maxPrice)
            });
            return filterBook;
        },
    },
    components: {
        bookList,
        bookFilter,
        bookDetails,
        bookAdd
    },
};
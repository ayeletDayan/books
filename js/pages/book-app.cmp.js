import { bookService } from '../services/book-service.js';
import bookList from '../cmps/book-list.cmp.js';
import bookFilter from '../cmps/book-filter.cmp.js';
import bookDetails from './book-details.cmp.js';

export default {
    template: `
    <section class="book-app">
            <book-filter @filtered="setFilter" />
            <book-list v-if="isShown" :books="booksToShow" @selected="selectBook" />
            <book-details v-if="selectedBook" :book="selectedBook" @close="closeDetails" />
        </section>

    `,
    data() {
        return {
            books: bookService.query(),
            selectedBook: null,
            filterBy: null,
            isShown: true
        };
    },
    methods: {
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
    },
};
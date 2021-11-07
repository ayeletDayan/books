import { bookService } from '../services/book-service.js';
import bookList from '../cmps/book-list.cmp.js';
import bookFilter from '../cmps/book-filter.cmp.js';
import bookDetails from './book-details.cmp.js';

export default {
    template: `
    <section class="book-app">
            <book-filter @filtered="setFilter" />
            <book-list :books="booksToShow" @selected="selectBook" />
            <book-details v-if="selectedBook" :car="selectedBook" @close="closeDetails" />
        </section>

    `,
    data() {
        return {
            books: bookService.query(),
            selectedBook: null,
            filterBy: null,
        };
    },
    methods: {
        selectBook(book) {
            this.selectedBook = null;
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
    },

    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books;
            const searchStr = this.filterBy.title.toLowerCase();
            const booksToShow = this.books.filter((book) => {
                return book.title.toLowerCase().includes(searchStr);
            });
            return booksToShow;
        },
    },
    components: {
        bookList,
        bookFilter,
        bookDetails,
    },
};

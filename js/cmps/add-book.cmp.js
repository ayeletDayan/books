import { bookService } from "../services/book-service.js";

export default {
    template: `
        <div class="add-book">
            <label>Google Search</label>
            <input v-model="title" type="text" placeholder="Google Search...">
            <button @click="search">Search</button>
            <ul v-if="bookList">
            <li class="search-result" v-for="book in bookList" :key="book.id">{{book.volumeInfo.title}}
            <a class="x" @click="add(book)">+</a>
            </li>
            </ul>
        </div>
    `,
    data() {
        return {
            title: null,
            bookList: null
        };
    },
    methods: {
        search() {
            
           bookService.searchBook(this.title)
           .then(books => {
               this.bookList = books               
           })
        },
        add(newBook){
            console.log(newBook, 'book from google');
            this.$emit('add-book', newBook)
        }
    }
}
import bookDescription from '../cmps/book-description.cmp.js';
import { bookService } from '../services/book-service.js';
import reviewAdd from '../cmps/review-add.cmp.js';
import { eventBus } from '../services/event-bus-service.js';


export default {
    // props: ['book'],
    template: `
        <section v-if="book" class="book-details">
            <h3>Book Details:</h3>
            <p class="book-title">{{book.title}} by {{book.authors.join()}}</p>
            <book-description :description="book.description"></book-description>
            <p>{{bookAge}}</p>
            <p>{{book.pageCount}} pages <span>{{pageCount}}</span></p>
            <p :class="price">{{currencyCode}}</p>
            <p v-if=book.listPrice.isOnSale class="sale">SALE!!!</p>
            <review-add @addReview="saveReview"/> 
            <ul v-if="book.reviews">
            <h4>Reviews</h4>
            <div class="reviews-list" v-for="(review,idx) in book.reviews">
                <li>{{review.txt}}</li> 
                <br>
                <a class="x" @click="removeReview">x</a>
            </div>  
            </ul>
            
            <router-link to="/book">X</router-link>
        </section>
    `,

    //<car-list :cars="carsToShow" @remove="removeCar"/>

       data() {
        return {
            book: null
        };
    },
    created() {      
        const { bookId } = this.$route.params;
        // console.log(bookId);
        bookService.getById(bookId)
            .then(book =>{ this.book = book});
    },
    methods: {
        saveReview(review){
            if(!this.book.reviews) this.book.reviews = []
            this.book.reviews.push(review)
            bookService.put(this.book)
            .then(book => this.book = book)
            .then(() => {
                 const msg = {
                     txt: `Review was added`,
                     type: 'success'
                 };
                 eventBus.$emit('showMsg', msg);
             })
             .catch(err => {
                 console.log('err', err);
                 const msg = {
                     txt: 'Error. Please try later',
                     type: 'error'
                 };
                 eventBus.$emit('showMsg', msg);
             });
        },
        callBus() {
           
        },
        removeReview(idx) {
        // console.log(idx)
        this.book.reviews.splice(idx, 1)
        bookService.put(this.book)
        .then(book => this.book = book)
           .then(() => {
                const msg = {
                    txt: `Review was remove`,
                    type: 'success'
                };
                eventBus.$emit('showMsg', msg);
            })
            .catch(err => {
                console.log('err', err);
                const msg = {
                    txt: 'Error. Please try later',
                    type: 'error'
                };
                eventBus.$emit('showMsg', msg);
            });
    },
},

    computed: {
        pageCount() {
            if (this.book.pageCount > 500) return 'Long reading'
            if (this.book.pageCount > 200) return 'Decent reading'
            if (this.book.pageCount < 100) return 'Light reading'
        },
        bookAge() {
            if (2021 - this.book.publishedDate > 10) return 'Veteran book'
            if (2021 - this.book.publishedDate === 0) return 'New book'
        },
        price() {
            if (this.book.listPrice.amount > 150) return 'red'
            if (this.book.listPrice.amount < 20) return 'green'
        },
        currencyCode() {
            if (this.book.listPrice.currencyCode === 'USD') return (new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'USD' }).format(this.book.listPrice.amount))
            if (this.book.listPrice.currencyCode === 'EUR') return (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(this.book.listPrice.amount))
            if (this.book.listPrice.currencyCode === 'ILS') return (new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'ILS' }).format(this.book.listPrice.amount))
        },

    },
    components: {
        bookDescription,
        reviewAdd,
        eventBus
    }
}

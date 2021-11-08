import { bookService } from '../services/book-service.js';

export default {
    template: `
        <section class="book-review">
            <h4>Add a new review</h4>
            <form @submit.prevent="save" >
                <textarea v-model="reviewToAdd.txt"></textarea> <br>
                <input v-model="reviewToAdd.rating" type="number" max="5"/>
                <button>Save</button>
            </form>
        </section>
    `,
    data() {
        return {
            reviewToAdd: {
                txt: '',
                rating: 0,
                readAt: Date.now(),
                createdBy: 'Reader'
            }  
        };
    },
    created() {

    },
    

    methods: {
        save() {
            this.$emit('addReview', this.reviewToAdd)
        }

    }
};
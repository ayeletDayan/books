import { bookService } from '../services/book-service.js';

export default {
    template: `
        <section class="book-review">
            <h4>Add a new review</h4>
            <form @submit.prevent="save" >
                <textarea class="reader" v-model="reviewToAdd.createdBy" placeholder="Reader fall name"></textarea> <br>            
                <textarea class="review" v-model="reviewToAdd.txt"></textarea> <br>
                <div class="stars">
                <span v-for="num in 5" class="fa fa-star" :class="{checked:num<=reviewToAdd.rate}" @click="changeColor(num)"></span>
                </div>
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
                createdBy: '',
                rate: 3
            }  
        };
    },
    created() {        

    },
    

    methods: {
        save() {
            this.$emit('addReview', this.reviewToAdd)
        },
        changeColor(num){
            this.reviewToAdd.rate = num;
            console.log('hello', num)
        }

    }
};
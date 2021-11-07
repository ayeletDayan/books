import bookPreview from './book-preview.cmp.js';
{/* <button @click="remove(book.id)" >X</button> */}
export default {
    props: ['books'],
    template: `
        <ul class="book-list">
            <li v-for="book in books" :key="book.id" class="book-preview-container" >
                <book-preview :book="book" @click.native="log" />
                <div class="actions">
                    <button @click="select(book)" >Details</button>
                </div>
            </li>
        </ul>
    `,
    methods: {
        remove(bookId) {
            this.$emit('remove', bookId);
        },
        select(book) {
            this.$emit('selected', book);
        },
        log() {
            console.log('Logging.....');
        }
    },
    components:{
        bookPreview
    }
};

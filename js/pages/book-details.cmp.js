export default {
    props: ['book'],
    template: `
        <section class="book-details">
            <h3>Book Details:</h3>
            <p> Title: {{book.title}}</p>
            <p>Authors: {{book.authors}}</p>
            <button @click="$emit('close')" >X</button>
        </section>
    `,
}

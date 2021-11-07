export default {
    props: ['book'],
    template: `
    <div class="book-preview">
            <img :src="book.thumbnail">
            <p class="book-title">{{book.title}}</p>
            <p>Authors: {{book.authors.join()}}</p>
        </div>
    `,
};

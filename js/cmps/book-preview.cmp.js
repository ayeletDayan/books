export default {
    props: ['book'],
    template: `
    <div class="book-preview">
            <img :src="book.thumbnail">
            <p>Title : {{book.title}}</p>
            <p>Authors : {{book.authors}}</p>
        </div>
    `,
};

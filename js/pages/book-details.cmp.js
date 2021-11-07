export default {
    props: ['book'],
    template: `
        <section class="book-details">
            <h3>Book Details:</h3>
            <p class="book-title">{{book.title}} by {{book.authors.join()}}</p>
            <p>{{book.publishedDate}} {{bookAge}}</p>
            <p>{{book.pageCount}} pages</p>
            <p>{{pageCount}}</p>
            <p :class="price">{{currencyCode}}</p>
            <p v-if=book.listPrice.isOnSale>SALE!!!</p>
            <button @click="$emit('close')" >X</button>
        </section>
    `,
    methodes:{

    },
    computed:{
        pageCount(){
            if (this.book.pageCount > 500) return 'Long reading'
            if (this.book.pageCount > 200) return 'Decent reading'
            if (this.book.pageCount < 100) return 'Light reading'
        },
        bookAge(){
            if (2021 - this.book.publishedDate > 10) return 'Veteran book'
            if (2021 - this.book.publishedDate === 0) return 'New book'
        },
        price(){
            if (this.book.listPrice.amount > 150) return 'red'
            if (this.book.listPrice.amount < 20) return 'green'
        },
        currencyCode(){
           if (this.book.listPrice.currencyCode === 'USD') return (new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.book.listPrice.amount))
           if (this.book.listPrice.currencyCode === 'EUR') return (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(this.book.listPrice.amount))
           if (this.book.listPrice.currencyCode === 'ILS') return (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'ILS' }).format(this.book.listPrice.amount))
        }      

        
    }

}

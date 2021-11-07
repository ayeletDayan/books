export default {
    props: ['description'],
    template: `
        <div class="book-description">
             <p>Description: {{bookDescription}}</p>
            <button @click="showMore = !showMore" v-if="!isFullLength">{{showTxt}}</button>
            </div>
    `,
    data() {
        return {
            isFullLength: false,
            showMore: false
        }
    },
    computed: {
        bookDescription() {
            if (this.description.length > 100 && !this.showMore) return this.description.slice(0, 100)
            else return this.description
        },
        showTxt() {
         return (this.showMore)?  'Show Less' : 'Show More'
        }
    }

}

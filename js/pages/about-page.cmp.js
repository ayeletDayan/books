export default {
    template: `
        <section class="about-page">
            <h3 ref="header">About us...</h3>
        </section>
    `,
    methods: {

    },
    created() {
        console.log('Created');
    },
    mounted(){
        console.log('Mounted');
        console.log(this.$refs.header);
    }
};
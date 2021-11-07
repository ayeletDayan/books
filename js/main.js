

import bookApp from './pages/book-app.cmp.js';
import appFooter from './cmps/app-footer.cmp.js';

const options = {
    el: '#app',
    template: ` 
    <section>  
            <book-app /> 
            <app-footer />
    </section>
    `,
    components: {
        bookApp,
        appFooter
    }
};

new Vue(options);



import bookApp from './pages/book-app.cmp.js';

const options = {
    el: '#app',
    template: `   
            <book-app /> 
    `,
    components: {
        bookApp,
    }
};

new Vue(options);

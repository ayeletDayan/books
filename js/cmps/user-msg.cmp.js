export default {
    template: `
    <transition name="fade">
        <div v-if="msg" class="user-msg" :class="msg.type">
            <p>{{msg.txt}}</p>
        </div>
    </transition>
    `,
    data() {
        return {
            msg: null
        };
    },
    created() {

    },
    methods: {
        showMsg(msg) {
            this.msg = msg;
            setTimeout(() => {
                this.msg = null;
            }, 3000);
        }
    },
    destroyed() {
        
    }

};
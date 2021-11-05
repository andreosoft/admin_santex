import Vue from 'vue'
import App from '@/App.vue'
import vuetify from './libs/vuetify'
import router from './libs/router'
import store from './store/index'
import config from './config/config'
import PortalVue from 'portal-vue'
import './libs/registerComponents'
import './libs/axios'
import './libs/translations'
import './libs/date'
import './libs/string'

Vue.config.productionTip = false
Vue.use(PortalVue)

const app = new Vue({
    vuetify,
    router,
    store,
    render: h => h(App),
    el: '#app',
    data: {
        leftMenuDrawer: null,
        dialogShow: false,
        lang: "ru",
        title: "",
        websocketWorking: false,
        websocket: null,
        websocketData: {}
    },
    computed: {
        config() {
            return config;
        },
        profile() {
            return this.$store.getters["auth/profile"];
        },
    },
    created() {
        this.$vuetify.lang.current = this.lang;
    },
    methods: {
        log: function (info, type = "", level = "") {
            console.log(info);
        },
        async login(data) {
            await this.$store.dispatch("auth/login", {
                login: data.login,
                password: data.password,
            });
        },
        async logout() {
            await this.$store.dispatch("auth/logout");
            this.$router.push("/login");
        }
    }

})
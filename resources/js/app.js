window._ = require('lodash');
window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

import Vue from 'vue'
import VueMeta from 'vue-meta'
import PortalVue from 'portal-vue'
import {InertiaApp} from '@inertiajs/inertia-vue'

Vue.config.productionTip = false;
Vue.prototype.$route = (...args) => route(...args).url();
Vue.use(InertiaApp);
Vue.use(PortalVue);
Vue.use(VueMeta);

let app = document.getElementById('app');

new Vue({
    metaInfo: {
        titleTemplate: (title) => title ? title : 'Empty title'
    },
    render: h => h(InertiaApp, {
        props: {
            initialPage: JSON.parse(app.dataset.page),
            resolveComponent: name => import(`@/Pages/${name}`).then(module => module.default),
        },
    }),
}).$mount(app);

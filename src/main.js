import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Notifications from 'vue-notification';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;
Vue.use(Notifications);

new Vue({
  router,
  vuetify,
  render: (h) => h(App)
}).$mount('#app');

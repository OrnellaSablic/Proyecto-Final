// main.js
import Vue from 'vue';
import App from './App.vue';
import 'bootstrap'
import  'bootstrap/dist/css/bootstrap.min.css'
import store from './store';
import Vuex from 'vuex'; 
import router from './router'; 
import axios from 'axios';


axios.defaults.baseURL = 'https://649e09649bac4a8e669e8b5e.mockapi.io/productos';
Vue.prototype.$http = axios;


import '@fortawesome/fontawesome-free/css/all.css';

Vue.config.productionTip = false;

Vue.use(Vuex);

new Vue({
  store, 
  router,
  render: h => h(App),
}).$mount('#app');




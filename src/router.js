
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store';
import HomePage from './views/HomePage.vue';
import RegisterForm from './views/RegisterForm.vue';
import LoginForm from './views/LoginForm.vue';
import CartDetail from './views/CartDetail.vue';
import UserProfile from './views/UserProfile.vue';
import AdminProfile from './views/AdminProfile.vue';
import CreateProduct from './views/CreateProduct.vue';
import EditProduct from './views/EditProduct.vue';


Vue.use(VueRouter);

const routes = [

  { path: '/home', name: 'home', component: HomePage },

  { path: '/registro', name: 'Registro', component: RegisterForm},
  
  { path: '/inicio-sesion', name: 'InicioSesion', component: LoginForm },

  { path: '/cart', name: 'Cart', component: CartDetail },

  { path: '/perfil', name: 'UserProfile', component: UserProfile },

  { path: '/admin-profile', name: 'adminProfile', component: AdminProfile, meta: { requiresAdmin: true } },

  { path: '/create-product', name: 'createproduct', component: CreateProduct,},

  { path: '/edit-product/:id', name: 'editProduct', component: EditProduct,},

];

const router = new VueRouter({
  routes,
});


export default router;

import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuthenticated: false,
    currentUser: null,
    cartItems: [], 
    orders: [],
    isAdmin: true,
    products: [],
  },

  mutations: {

    set_user(state, user) {
      state.currentUser = user;
    },
  
    set_current_user(state, user) {
      state.currentUser = user;
    },

    setAuthentication(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },

    setCurrentUser(state, user) {
      state.currentUser = user;
    },

    setIsAdmin(state, isAdmin) {
      state.isAdmin = isAdmin;
    },

    addToCart(state, product) {
      const existingProduct = state.cartItems.find(item => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        const newProduct = {
          ...product,
          quantity: 1,
        };
        state.cartItems.push(newProduct);
      }
    },

    updateCartItemQuantity(state, payload) {
      const { productId, quantity } = payload;
      const product = state.cartItems.find(item => item.id === productId);
      if (product) {
        product.quantity = quantity;
      }
    },

    removeFromCart(state, productId) {
      state.cartItems = state.cartItems.filter(item => item.id !== productId);
    },

    updateProducts(state, products) {
      state.products = products;
    },

    addOrder(state, order) {
      state.orders.push(order);
    },

    clearCart(state) {
      state.cartItems = [];
    },


  },

  actions: {

    registerUser({ commit }, user) {
      return new Promise((resolve, reject) => {
        axios.post('https://649e09649bac4a8e669e8b5e.mockapi.io/Usuarios', user)
          .then(response => {
            commit('SET_USER', response.data);
            resolve(response.data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    login({ commit }, credentials) {
      return new Promise((resolve, reject) => {
        axios.get('https://649e09649bac4a8e669e8b5e.mockapi.io/Usuarios')
          .then(response => {
            const users = response.data;
            const user = users.find(u => u.email === credentials.email && u.password === credentials.password);
            if (user) {
              commit('setAuthentication', true);
              commit('setCurrentUser', user);
  
          
              if (user.email === 'admin@example.com') {
                commit('setIsAdmin', true);
              } else {
                commit('setIsAdmin', false);
                
              }
  
            } else {
              reject('Credenciales inválidas');
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    initializeUser({ commit }) {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser) {
        commit('SET_CURRENT_USER', currentUser);
      }
    },

    logout({ commit }) {
      localStorage.removeItem('token');
      commit('setAuthentication', false);
      commit('setCurrentUser', null);

    },

    placeOrder({ commit, state }) {
      const order = {
        userId: state.currentUser.id,
        products: state.cartItems,
        date: new Date(),
      };
  
      axios.post('https://64af2687c85640541d4e2f97.mockapi.io/pedidos', order)
        .then(response => {
          console.log('Pedido guardado:', response.data);
          commit('addOrder', response.data); 
          commit('clearCart'); 
        })
        .catch(error => {
          console.error('Error al guardar el pedido:', error);
        });
    },

  },


  getters: {

    isAdmin: state => state.isAdmin,

    isAuthenticated: state => state.isAuthenticated,

    cartItems: state => state.cartItems,
    
    cartTotal: state => {
      return state.cartItems.reduce((total, item) => total + item.precio * item.quantity, 0);
    },

    cartItemCount: state => {
      return state.cartItems.reduce((total, item) => total + item.quantity, 0);
    },

    currentUser: state => state.currentUser,

    userOrders: state => {
      return state.orders.filter(order => order.userId === state.currentUser.id);
    },

  },
  
});

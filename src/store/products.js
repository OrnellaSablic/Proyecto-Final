
 import axios from 'axios';

 const state = {
   products: [],
 };

 const mutations = {
   setProducts(state, products) {
     state.products = products;
   },

   addProduct(state, product) {
     state.products.push(product);
   },

   removeProduct(state, productId) {
    state.products = state.products.filter(product => product.id !== productId);
  },

 };

const actions = {

  async createProduct({ commit }, product) {
    try {
      const response = await axios.post('https://649e09649bac4a8e669e8b5e.mockapi.io/productos', product);
      const newProduct = response.data;
      commit('addProduct', newProduct);
      return newProduct;
    } catch (error) {
      console.error('Error al crear el producto:', error);
      throw error;
    }
  },

  async fetchProducts({ commit }) {
    try {
      const response = await axios.get('https://649e09649bac4a8e669e8b5e.mockapi.io/productos');
      const products = response.data;
      commit('setProducts', products);
      return products;
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      throw error;
    }
  },


  async deleteProduct({ commit }, productId) {
    try {
      await axios.delete(`https://649e09649bac4a8e669e8b5e.mockapi.io/productos/${productId}`);
      commit('removeProduct', productId);
    } catch (error) {
      console.error('Error al crear el producto:', error);
      throw error;
    }
  },
};

const getters = {
  allProducts: state => state.products,
};

export default {
  state,
  mutations,
  actions,
  getters,
};

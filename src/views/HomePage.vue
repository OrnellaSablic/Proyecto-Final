
<template>
  <div class="container container-products mt-5 mb-5">
    <div v-if="products.length === 0" class="text-center">Cargando productos...</div>
    <div v-else>
      <div class="row">
        <div class="col-md-4 col-sm-4" v-for="product in products" :key="product.id">
          <div class="card mb-4">
            <img :src="product.imagen" :alt="product.nombre" class="card-img-top" height="200" width="200">
            <div class="card-body">
              <h5 class="card-title">{{ product.nombre }}</h5>
              <p class="card-text">{{ product.description }}</p>
              <p class="card-text">Precio: ${{ product.precio }}</p>
              <button @click="addToCart(product)" :disabled="!isAuthenticated" class="btn btn-primary">Agregar al carrito</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapMutations } from 'vuex';

export default {
  data() {
    return {
      products: [],
    };
  },

  methods: {
    addToCart(product) {
      if (this.isAuthenticated) {
        this.addToCartMutation(product);
      } else {
        alert('Debes estar logueado para agregar productos al carrito.');
      }
    },
    async fetchProducts() {
      try {
        const response = await axios.get('https://649e09649bac4a8e669e8b5e.mockapi.io/productos');
        this.products = response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    ...mapMutations(['addToCart']), 
  },

  created() {
    this.fetchProducts();
  },

  computed: {
    ...mapGetters(['cartItems', 'isAuthenticated']),
    cartItemCount() {
      return this.cartItems.reduce((total, item) => total + item.quantity, 0);
    },
  },
};
</script>

<style scoped>


@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

.container-products {
  font-family: 'Poppins', sans-serif;
}
 .container-products {
  width: 60%;
  margin: 0 auto;
} 

.card {
  border: 1px solid #f5f4f4;
  padding: 10px;
  margin: 10px;
  width: 250px;
  display: inline-block;
  box-shadow: 9px 13px 10px 0px rgb(239, 240, 237);
}

.card-body {
    text-align: center;
}

.btn-primary {
  background-color: rgb(246, 168, 2);
  color: rgb(32, 31, 31);
  border: none;
  font-weight: bold;
}

img {
  max-width: 227px;
  max-height: 220px;
}


</style>

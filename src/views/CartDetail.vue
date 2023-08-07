<!-- src/components/CartDetail.vue -->
<template>
  <div class="container container-cart">
    <h3 v-if="cartItems.length === 0" class="text-center mt-5">El carrito está vacío</h3>
    <div v-else>
      <table class="mt-5">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Imagen</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cartItems" :key="item.id">
            <td>{{ item.nombre }}</td>
            <td><img :src="item.imagen" :alt="item.name" height="50" width="50"></td>
            <td>${{ item.precio }}</td>
            <td><input type="number" v-model="item.quantity" @change="updateCartItem(item)"></td>
            <td>${{ item.precio * item.quantity }}</td>
            <td><button @click="removeFromCart(item.id)" class="btn-delete">Eliminar</button></td>
          </tr>
        </tbody>
      </table>
      <p class="text-end mt-3">Total ${{ cartTotal }}</p>
      <button @click="saveOrder" class="button">Guardar pedido</button>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import { mapGetters, mapMutations } from 'vuex';

export default {

  computed: {
    cartItems() {
      return this.$store.getters.cartItems;
    },
    cartTotal() {
      return this.$store.getters.cartTotal;
    },

    ...mapGetters(['cartItems', 'cartTotal'])
  },

  methods: {
    updateCartItem(item) {
      this.$store.commit('updateCartItemQuantity', {
        productId: item.id,
        quantity: parseInt(item.quantity),
      });
    },

    removeFromCart(productId) {
      this.$store.commit('removeFromCart', productId);
    },

    ...mapMutations(['updateCartItemQuantity', 'removeFromCart']),

    saveOrder() {
      const order = {
        userId: this.$store.state.currentUser.id,
        products: this.cartItems,
        date: new Date(),
      };

      axios.post('https://64af2687c85640541d4e2f97.mockapi.io/pedidos', order)
        .then(response => {
          alert('Pedido guardado', response.data);
          // Aquí puedes realizar alguna acción adicional si es necesario
        })
        .catch(error => {
          console.error('Error al guardar el pedido:', error);
        });
    },
  },
};

</script>

<style>

.container-cart {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
}

table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
}

th {
  background-color: rgb(237, 193, 98);
}

img {
  max-width: 50px;
  max-height: 50px;
}

input {
  text-align: center;
}

.button {
    background-color:rgb(39, 39, 39);
    color: rgb(255, 255, 255);
    border: none;
    border-radius: 2rem;
    padding: 0.4rem;
}

.btn-delete {
    background-color:rgb(71, 71, 71);
    color: rgb(247, 247, 247);
    border-radius: 1rem;
}


</style>

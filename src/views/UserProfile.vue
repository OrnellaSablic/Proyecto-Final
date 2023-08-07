
<template>
  <div>
    <div class="container-order text-center mt-5" v-if="loading">
      <h4>No hay pedidos guardados</h4>
    </div>
    <div v-else>
      <div class="container container-order mt-5 mb-5" v-for="pedido in pedidosConUsuarios" :key="pedido.id">
        <h3 class="text-center">Información del Pedido</h3>
        <ul>
          <li>
            <p>Fecha del pedido: {{ pedido.date }}</p>
          </li>
          <li>
            <p>Total del pedido: ${{ pedido.total }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      loading: true,
      pedidos: [],
      usuarios: [],
    };
  },

  computed: {
    pedidosConUsuarios() {
      return this.pedidos.map(pedido => {
        const user = this.usuarios.find(u => u.id === pedido.userId);
        return {
          ...pedido,
          user: user || {}
        };
      });
    },
  },
  
  async created() {
    try {
      // Obtener los pedidos de la API de pedidos
      const responsePedidos = await axios.get(
        'https://64af2687c85640541d4e2f97.mockapi.io/pedidos'
      );
      this.pedidos = responsePedidos.data;

      // Obtener los usuarios de la API de usuarios
      const responseUsuarios = await axios.get(
        'https://649e09649bac4a8e669e8b5e.mockapi.io/Usuarios'
      );
      this.usuarios = responseUsuarios.data;

      this.loading = false;
    } catch (error) {
      console.error('Error al obtener los pedidos y usuarios:', error);
    }
  },
};
</script>

<style scoped>

.container-order {
  font-family: 'Poppins', sans-serif;
}


</style>

  
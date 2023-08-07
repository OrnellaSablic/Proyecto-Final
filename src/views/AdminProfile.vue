
<template>
  <div class="product-table">
    <router-link to="/create-product" class="btn btn-primary">Crear producto</router-link>
    <br>
    <button class="mt-4 btn btn-primary" @click="loadProducts">Cargar Productos</button>
    <h2 class="mt-4">Lista de Productos</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Imagen</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.nombre }}</td>
          <td>{{ product.precio }}</td>
          <td><img :src="product.imagen" alt="Producto"></td>
          <td>
            <button @click="editProduct(product.id)" class="btn btn-primary">Editar</button>
            <button @click="deleteProduct(product.id)" class="btn btn-danger">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {

  data() {
    return {
      products: [],
    };
  },

  computed: {
    ...mapGetters(['allProducts']),
  },

  methods: {
    ...mapActions(['createProduct', 'fetchProducts']),
    
    loadProducts() {
      this.fetchProducts() 
        .then(() => {
          console.log('Productos cargados'); 
        })
        .catch(error => {
          console.error('Error al cargar los productos:', error);
        });
    },

    editProduct(productId) {
      
      this.$router.push({ name: 'editProduct', params: { id: productId } });
    },
    
    async deleteProduct(productId) {
      try {
        await this.deleteProduct(productId);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    },
    
  },
  created() {
    this.loadProducts();
  },
};
</script>

<style scoped>
.product-table {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;
}

th, td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}
</style>

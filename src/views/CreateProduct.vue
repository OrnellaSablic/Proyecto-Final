 <template>
  <div class="container">
    <h2>Crear producto</h2>
    <form @submit.prevent="createNewProduct">
      <div class="mb-3">
        <label for="productName" class="form-label">Nombre</label>
        <input type="text" id="productName" v-model="newProduct.nombre" required class="form-control">
      </div>
      <div class="mb-3">
        <label for="productPrice" class="form-label">Precio</label>
        <input type="number" id="productPrice" v-model="newProduct.precio" required class="form-control">
      </div>
      <div class="mb-3">
        <label for="productImage" class="form-label">URL de la imagen</label>
        <input type="text" id="productImage" v-model="newProduct.imagen" class="form-control">
      </div>
      
      <button class="btn btn-primary" @click="createNewProduct">Crear Producto</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      newProduct: {
        nombre: '',
        precio: '',
        imagen: '',
      },
    };
  },
  methods: {
    ...mapActions(['createProduct', 'fetchProducts']),
    
    async loadProducts() {
      try {
        await this.fetchProducts();
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    },

    async createNewProduct() {
      try {
        await this.createProduct(this.newProduct);
        this.newProduct = {
          nombre: '',
          precio: '',
          imagen: '',
        };
      } catch (error) {
        console.error('Error creating product:', error);
      }
    },
  },
  created() {
    this.loadProducts(); 
  },
};
</script>


<style>

.container {
  margin: 0 auto;
  padding-top: 2rem;
}
</style> 

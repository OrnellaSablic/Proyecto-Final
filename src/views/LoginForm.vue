<template>
  <div class="container app mt-5">
    <h2 class="text-center mb-3">Iniciar sesión</h2>
    <form @submit.prevent="loginUser">
      <div>
        <label for="email">Email:</label>
        <input class="form-control" type="email" id="email" v-model="user.email" placeholder="admin@example.com" required>
      </div>
      <div>
        <label for="password">Contraseña:</label>
        <input class="form-control" type="password" id="password" v-model="user.password" placeholder ="2023" required>
      </div>
      <button class="btn btn-primary mt-3" type="submit">Iniciar sesión</button>
    </form>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      user: {
        email: '',
        password: ''
      }
    };
  },

  computed: {
    ...mapGetters(['currentUser'])
  }, 

  methods: {
    ...mapActions(['login']),

    loginUser() {
      this.login(this.user)
        .then(user => {
          alert('Inicio de sesión exitoso:', user);
          this.$router.push('/home');
        })
        .catch(error => {
          alert('Error de inicio de sesión:', error);
          console.log(error)
      
          if (error === 'Credenciales inválidas') {
          
          } else {
            
          }
        });
    }
  }
};
</script>

<style scoped>
.app {
  width: 20%;
  margin: 0 auto;
  font-family: 'Poppins', sans-serif;
}

.form-control {
  margin-bottom: 1rem;
}

.btn-primary {
  background-color: rgb(246, 168, 2);
  color: rgb(32, 31, 31);
  border: none;
}


</style>
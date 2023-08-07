<template>
  <header>
    <nav>
      <h2><router-link to="/home">DeliveryApp</router-link></h2>
      <ul>
        <li v-if="!isAuthenticated">
          <router-link to="/registro">Registro</router-link>
          <router-link to="/inicio-sesion">Login</router-link>
        </li>
        <li v-else>
          <router-link v-if="isAdmin" to="/admin-profile">Hola Admin</router-link>
          <router-link v-else to="/perfil">Hola {{ currentUser.nombre }}</router-link>
          <router-link to="/cart"><i class="fas fa-shopping-cart"></i> ({{ cartItemCount }})</router-link>
          <button @click="logoutUser">Cerrar sesión</button> 
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {

  name: "HeaderBar",

  computed: {
    ...mapGetters(['isAuthenticated', 'currentUser', 'isAdmin', 'cartItemCount'])
  },

  watch: {
    isAuthenticated(newValue) {
      if (newValue) {
        if (this.isAdmin && this.currentUser.email === 'admin@example.com') {
          this.$router.push('/admin-profile');
        } else {
          this.$router.push('/home');
        }
      } else {
        this.$router.push('/'); 
      }
    }
  },
  
  methods: {
    ...mapActions(['logout']),

    logoutUser() {
      this.logout()
        .then(() => {

          this.$router.push('/home');
        })
        .catch(error => {
          console.error('Error al cerrar sesión:', error);
        });
    },
  },
};
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

header {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
}

h2 {
  font-weight: 700;
}

nav {
  display: flex;
  justify-content: space-around;
  align-items: baseline;
  background-color: rgb(255, 181, 23);
  padding: 1rem;
}

.navbar-expand-lg .navbar-collapse {
  justify-content: end;
}

a {
  color: black;
  text-decoration: none;
  margin-right: 2rem;
}

ul {
  list-style: none;
}

button {
    background-color:rgb(39, 39, 39);
    color: rgb(255, 255, 255);
    border: none;
    border-radius: 2rem;
    padding: 0.4rem;
}

</style>

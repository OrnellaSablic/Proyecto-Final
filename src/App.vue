<!-- src/App.vue -->
<template>
  <div id="app">
    <header>
      <nav>
        <HeaderBar />
      </nav>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>

import HeaderBar from './components/HeaderBar.vue'


export default {
  components: {
    HeaderBar

  },
};

</script>

<style scoped>

</style>

<template>
  <div>
    <Header></Header>
    <Home></Home>
  </div>
</template>

<script>
// Importa los componentes utilizando la sintaxis de exportación por defecto
import Header from '@/components/HeaderComponent.vue';
import Home from '@/components/HomePage.vue';

export default {
  components: {
    Home,
    Header
  }
}
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh; /* Make the container take the full height of the viewport */
  width: 100vw;  /* Make the container take the full width of the viewport */
  margin: 0;
  padding: 0;
  background-color: #f9f9f9;
  box-sizing: border-box;
}
</style>
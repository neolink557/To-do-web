<template>
  <div class="app-container">
    <Header />
    <Home />
    <DD />
  </div>
</template>

<script>
import Header from '@/components/HeaderComponent.vue';
import Home from '@/components/HomePage.vue';
import DD from '@/components/DropdownComponent.vue';

export default {
  components: {
    Home,
    Header,
    DD
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
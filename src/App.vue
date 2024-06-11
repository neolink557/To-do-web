<template>
  <div class="app-layout">
    <Header />
    <div class="main-container">
      <SideBar />
      <Home />
    </div>
  </div>
</template>

<script>
import Header from '@/components/HeaderComponent.vue';
import Home from '@/components/HomePage.vue';
import SideBar from '@/components/SideBarComponent.vue';

export default {
  components: {
    Home,
    Header,
    SideBar
  }
}
</script>

<style scoped>
.app-layout {
  
  background-color: #f3f3f3;
  display: flex;
  flex-direction: column;
  height: 98.2vh;
}

.main-container {
  display: flex;
  flex: 1;
  overflow-y: auto;
}

header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  background-color: white; /* Adjust this according to your design */
}

.sidebar {
  min-width: 200px;
  position: sticky;
  top: 1px; /* Adjust this if your header has a different height */
  height: calc(87vh - 1px); /* Adjust this if your header has a different height */
  width: 200px;
  padding: 20px;
}

.home {
  flex-grow: 1;
  padding: 20px;
  margin-top: 60px; /* Adjust this if your header has a different height */
}
</style>

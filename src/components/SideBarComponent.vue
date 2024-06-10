<!-- SideBarComponent.vue -->
<template>
    <div class="sidebar">
      <!-- Mostrar tags existentes -->
      <div v-for="tag in tags" :key="tag.name" class="tag">
        <span class="tag-circle" :style="{ backgroundColor: tag.color }"></span>
        {{ tag.name }}
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        tags: []
      };
    },
    created() {
      this.loadTags();
    },
    methods: {
      loadTags() {
        const tagsFromStorage = localStorage.getItem('tags');
        if (tagsFromStorage) {
          this.tags = JSON.parse(tagsFromStorage);
        }
      }
    }
  };
  </script>
  
  <style scoped>
.sidebar {
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f0f0f0; /* Cambia el color de fondo según tus preferencias */
  padding: 20px; /* Agrega un poco de espacio alrededor del contenido */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Agrega una sombra sutil */
}

.tag {
  display: flex;
  align-items: center;
  margin-bottom: 10px; /* Agrega espacio entre cada etiqueta */
}

.tag-circle {
  width: 28.41px;
  height: 28.41px;
  border-radius: 50%;
  margin-right: 10px;
  /* Si quieres agregar algún estilo adicional a los círculos, como sombras o bordes, puedes hacerlo aquí */
}
</style>

  
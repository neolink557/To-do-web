<!-- SideBarComponent.vue -->
<template>
    <div v-if = "isOpen"  class="sidebar" :class="{'sidebar--toggled': !isOpen}">
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
        tags: [],
        isOpen: false
      };
    },
    created() {
      this.loadTags();
    },
    mounted() {
      this.emitter.on("toggle-sidebar", isOpen => {
      this.isOpen = isOpen;
    });
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
  position: sticky;
  width: 200px;
  padding: 20px;
  background-color: #fdfdfd;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Agrega una sombra sutil */
}

.tag {
  display: flex;
  align-items: center;
  margin-bottom: 10px; /* Agrega espacio entre cada etiqueta */
  font: 1em sans-serif;
}

.tag-circle {
  width: 28.41px;
  height: 28.41px;
  border-radius: 50%;
  margin-right: 10px;
  /* Si quieres agregar algún estilo adicional a los círculos, como sombras o bordes, puedes hacerlo aquí */
}
</style>

  
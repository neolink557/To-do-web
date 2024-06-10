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
    width: 214px;
    height: 655px;
  }
  
  .tag {
    display: flex;
    align-items: center;
  }
  
  .tag-circle {
    width: 28.41px;
    height: 28.41px;
    border-radius: 50%;
    margin-right: 10px;
  }
  </style>
  
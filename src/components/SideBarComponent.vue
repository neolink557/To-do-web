<template>
    <div class="sidebar">
      <!-- Mostrar tags existentes -->
      <div v-for="tag in tags" :key="tag.name" class="tag" @mouseover="toggleHovered(true)" @mouseleave="toggleHovered(false)">
        <span :style="{ backgroundColor: tag.color }" class="tag-circle"></span>
        {{ tag.name }}
        <button @click="removeTag(tag)" class="delete-button" v-show="isHovered">Eliminar</button>
      </div>
  
      <!-- Formulario para agregar nuevos tags -->
      <input type="text" v-model="newTagName">
      <button @click="addTag">Agregar Tag</button>
    </div>
  </template>
  
  <script>
  import chroma from 'chroma-js';
  
  class TagModel {
    constructor(name, color) {
      this.name = name;
      this.color = color;
    }
  }
  
  export default {
    data() {
      return {
        tags: [],
        newTagName: '',
        isHovered: false // Nuevo estado para controlar si el ratón está sobre el tag
      };
    },
    created() {
      this.loadTags();
    },
    watch: {
      tags: {
        handler(newTags) {
          localStorage.setItem('tags', JSON.stringify(newTags));
        },
        deep: true
      }
    },
    methods: {
      addTag() {
        if (this.newTagName.trim() !== '') {
          const randomColor = chroma.random();
          const pastelColor = randomColor.saturate(10).mix('white');
          const newTag = new TagModel(this.newTagName, pastelColor.css());
          this.tags.push(newTag);
          this.newTagName = '';
        }
      },
      removeTag(tagToRemove) {
        this.tags = this.tags.filter(tag => tag !== tagToRemove);
      },
      loadTags() {
        const tagsFromStorage = localStorage.getItem('tags');
        if (tagsFromStorage) {
          this.tags = JSON.parse(tagsFromStorage);
        }
      },
      toggleHovered(value) {
        this.isHovered = value;
      }
    }
  };
  </script>
  
  <style scoped>
  .sidebar {
    width: 214px;
    height: 655px;
    top: 190px;
    left: 542px;
    gap: 0px;
    opacity: 0px;
  }
  
  .tag {
    display: flex;
    align-items: center;
    position: relative; /* Añadimos posición relativa para que el botón de eliminar esté relativo al tag */
  }
  
  .tag-circle {
    width: 28.41px;
    height: 28.41px;
    border-radius: 50%;
    margin-right: 10px;
    display: inline-block;
  }
  
  .delete-button {
    position: absolute; /* Añadimos posición absoluta para que el botón esté superpuesto al tag */
    right: 0;
    top: 0;
    display: none; /* Por defecto, ocultamos el botón de eliminar */
  }
  
  .tag:hover .delete-button {
    display: block; /* Mostramos el botón de eliminar cuando el ratón está sobre el tag */
  }
  </style>
  
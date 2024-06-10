<template>
    <div class="dropdown">
      <button class="dropdown-toggle" @click="toggleDropdown">{{ selectedOption }}</button>
      <div class="dropdown-menu" :class="{ 'show': isOpen }">
        <div v-for="option in options" :key="option.id" @click="selectOption(option)">{{ option.name }}</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isOpen: false,
        selectedOption: 'Select an option',
        options: [
          { id: 1, name: 'Option 1' },
          { id: 2, name: 'Option 2' },
          { id: 3, name: 'Option 3' }
        ]
      };
    },
    methods: {
      toggleDropdown() {
        this.isOpen = !this.isOpen;
      },
      selectOption(option) {
        this.selectedOption = option.name;
        this.isOpen = false;
      }
    }
  };
  </script>
  
  <style scoped>
  .dropdown {
    position: relative;
  }
  
  .dropdown-toggle {
    cursor: pointer;
  }
  
  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    margin: 10px;
    z-index: 1000;
    background-color: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    display: none;
  }
  
  .dropdown-menu.show {
    display: block;
  }
  
  .dropdown-menu div {
    padding: 15px;
    cursor: pointer;
    font: 1em sans-serif;
  }
  
  .dropdown-menu div:hover {
    background-color: #f0f0f0;
  }
  </style>
  
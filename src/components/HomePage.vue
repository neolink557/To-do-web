<template>
    <div>
      <div class="card-container">
        <div v-for="(CardComponent, index) in cards" :key="index" class="card-wrapper">
          <CardComponent />
        </div>
      </div>
  
      <!-- Floating Action Button -->
      <div 
        class="fab" 
        @click="addCard" 
        @mouseenter="handleMouseEnter" 
        @mouseleave="handleMouseLeave" 
        @mousedown="handleMouseDown" 
        @mouseup="handleMouseUp" 
        :style="{ backgroundColor: isClicked ? '#e55e5e' : (isHovered ? '#f29d9d' : '#FF7777') }">
        <i class="fas fa-plus" style="user-select: none;">+</i>
      </div>
    </div>
  </template>
  
  <script>
  import CardComponent from './CardComponent.vue';
  
  export default {
    components: {
      CardComponent
    },
    data() {
      return {
        isHovered: false,
        isClicked: false,
        cards: []  // Array to store the state of the cards
      };
    },
    methods: {
      addCard() {
        // Add a new card to the cards array
        this.cards.push({});
      },
      handleMouseEnter() {
        this.isHovered = true;
      },
      handleMouseLeave() {
        this.isHovered = false;
        this.isClicked = false;  // Ensure the color resets if the user drags the mouse out while clicking
      },
      handleMouseDown() {
        this.isClicked = true;
      },
      handleMouseUp() {
        this.isClicked = false;
      }
    }
  }
  </script>
  
  <style scoped>
  .fab {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background-color: #FF7777;
    color: white;
    text-align: center;
    font-size: 24px;
    line-height: 56px;
    cursor: pointer;
    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.2);
    transition: background-color 0.3s ease;
  }
  
  .card-container {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px; /* Adjust spacing between rows */
  }
  
  .card-wrapper {
    flex: 10;
    max-width: calc(50% - 50px); /* 50% width minus margin */
    margin-right: 20px; /* Adjust spacing between cards */
    margin-left: 20px; /* Adjust spacing between cards */
    margin-bottom: 50px; /* Adjust spacing between rows */
  }
  
  .card-wrapper:last-child {
    margin-right: 0; /* Remove margin for the last card */
  }
  </style>
  
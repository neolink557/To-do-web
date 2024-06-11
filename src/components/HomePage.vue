<template>
  <div>
    <div class="card-container">
      <div v-for="(card, index) in cards" :key="index" class="card-wrapper">
        <CardComponent 
          :cardData="card" 
          :tags="tags" 
          @update-card="updateCard(index, $event)" 
          @delete-card="deleteCard(index)"
          @add-tag="addTag"
        />
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
      cards: [],  // Array to store the state of the cards
      tags: []  // Lista global de tags
    };
  },
  methods: {
    loadCards() {
      const cardsFromStorage = localStorage.getItem('cards');
      if (cardsFromStorage) {
        this.cards = JSON.parse(cardsFromStorage);
      } else {
        this.cards = [];
      }
    },
    loadTags() {
      const tagsFromStorage = localStorage.getItem('tags');
      if (tagsFromStorage) {
        this.tags = JSON.parse(tagsFromStorage);
      } else {
        this.tags = [];
      }
    },
    saveCards() {
      localStorage.setItem('cards', JSON.stringify(this.cards));
    },
    saveTags() {
      localStorage.setItem('tags', JSON.stringify(this.tags));
    },
    addCard() {
      this.cards.push({ title: '', description: '', tags: [], selectedTags: [] });
      this.saveCards();
    },
    updateCard(index, updatedCard) {
      this.cards.splice(index, 1, updatedCard);
      this.saveCards();
    },
    deleteCard(index) {
      this.cards.splice(index, 1);
      this.saveCards();
    },
    addTag(newTag) {
      this.tags.push(newTag);
      this.saveTags();
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
  },
  mounted() {
    this.loadCards();
    this.loadTags();
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
  
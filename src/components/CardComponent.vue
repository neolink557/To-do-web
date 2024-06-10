<template>
  <div class="card" ref="card">
    <div class="options-menu" v-if="isVisible" @click="toggleMenu" >
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
    <div class="menu" v-if="showMenu">
      <div @click="edit">Edit</div>
      <div @click="deleteItem">Delete</div>
    </div>
    <input type="text" placeholder="Place your title here" class="title-input">
    <textarea placeholder="Add here your description" class="description-textarea" v-model="description" @input="resizeTextarea"></textarea>
  </div>
</template>

  
<script>
export default {
  name: 'CardComponent',
  data() {
    return {
      isEnabled : true,
      isVisible : false,
      description: ''
    };
  },
  methods: {
    resizeTextarea(event) {
      const textarea = event.target;
      textarea.style.height = 'auto'; // Reset height for text measurement
      textarea.style.height = `${textarea.scrollHeight}px`; // Adjust height based on scrollHeight
    },
    toggleMenu() {
      this.isEnabled = TextTrackCueList
      this.$refs.card.querySelector('.title-input').disabled = !this.isEnabled;
        this.$refs.card.querySelector('.description-textarea').disabled = !this.isEnabled;
      this.isVisible = this.$refs.card.querySelector('.title-input').disabled
    },
    handleClickOutside(event) {
      if (this.$refs.card && !this.$refs.card.contains(event.target)) {
        // Clicked outside the card, disable editing
        this.$refs.card.querySelector('.title-input').disabled = !this.isEnabled;
        this.$refs.card.querySelector('.description-textarea').disabled = !this.isEnabled;
        this.isEnabled = false
        this.isVisible = this.$refs.card.querySelector('.title-input').disabled
      }
    }
  },
  mounted() {
    // Add event listener to detect clicks outside the card
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    // Remove event listener when component is destroyed
    document.removeEventListener('click', this.handleClickOutside);
  }
}
</script>

<style scoped>
.card {
  position: relative; /* Required for absolute positioning of menu */
  background: white;
  min-width: 400px; /* Minimum width of the card */
  min-height: 150px; /* Minimum height of the card */
  padding: 16px; /* Example padding */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Example box shadow */
  display: flex;
  flex-direction: column;
  gap: 10px; /* Space between inputs */
}

.options-menu {
  display: flex;
  position: absolute;
  top: 15%;
  right: 3%;
  cursor: pointer;
}

.dot {
  width: 5px;
  height: 5px;
  background-color: #9d9d9d;
  border-radius: 50%;
  margin: 2px;
}

.menu {
  position: absolute;
  top: 30px;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 5px 0;
  display: none;
}

.menu div {
  padding: 8px 20px;
  cursor: pointer;
}

.menu div:hover {
  background-color: #f0f0f0;
}

.menu.show {
  display: block;
}

.title-input {
  outline: none; /* Remove default outline */
  border: none;
  font: 1em sans-serif;
  font-size: x-large;
  font-weight: bold; /* Bold text */
  padding-right: 1%;
}

.description-textarea {
  outline: none; /* Remove default outline */
  border: none;
  padding: 1%;
  font-size: medium; /* Font size */
  resize: none; /* Prevent manual resize */
  overflow: hidden; /* Hide scroll bars */
  font: 1em sans-serif;
  min-height: 50px; /* Minimum height */
}

.title-input:disabled,
.description-textarea:disabled {
  background-color: transparent; /* Set background to transparent */
  color: inherit; /* Inherit text color */
  cursor: default; /* Use default cursor */
  user-select: none; /* Disable user selection */
  -webkit-user-select: none; /* Disable user selection for webkit browsers */
  -moz-user-select: none; /* Disable user selection for Firefox */
  -ms-user-select: none; /* Disable user selection for IE/Edge */
  pointer-events: none; 
}
</style>


  
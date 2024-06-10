<template>
  <div class="card" ref="card">
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
      description: ''
    };
  },
  methods: {
    resizeTextarea(event) {
      const textarea = event.target;
      textarea.style.height = 'auto'; // Reset height for text measurement
      textarea.style.height = `${textarea.scrollHeight}px`; // Adjust height based on scrollHeight
    },
    handleClickOutside(event) {
      if (this.$refs.card && !this.$refs.card.contains(event.target)) {
        // Clicked outside the card, disable editing

        this.$refs.card.querySelector('.title-input').disabled = !this.isEnabled;
        this.$refs.card.querySelector('.description-textarea').disabled = !this.isEnabled;
        this.isEnabled = false
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

.title-input {
  outline: none; /* Remove default outline */
  border: none;
  font: 1em sans-serif;
  font-size: x-large;
  font-weight: bold; /* Bold text */
}

.title-input :disabled {
  outline: none; /* Remove default outline */
  border: none;
  font: 1em sans-serif;
  font-size: x-large;
  font-weight: bold; /* Bold text */
  background: none;
  background-color: none;
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
  pointer-events: none; /* Disable pointer events */
}
</style>



  
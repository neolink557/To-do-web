<template>
  <div class="card" ref="card">
    <div class="options-menu" v-if="isVisible" @click="toggleMenu">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
    <div class="menu" v-if="showMenu">
      <div @click="edit">Edit</div>
      <div @click="$emit('delete-card')">Delete</div>
    </div>
    <input type="text" placeholder="Place your title here" class="title-input" v-model="localCardData.title" @input="emitUpdate">
    <textarea placeholder="Add here your description" class="description-textarea" v-model="localCardData.description" @input="resizeTextarea"></textarea>

    <div class="dropdown">
      <button @click="toggleDropdown" class="dropdown-button">Select Tag</button>
      <div class="dropdown-menu" v-show="dropdownVisible">
        <div v-for="tag in tags" :key="tag.name" class="tag" @click="toggleTagSelection(tag)">
          <span :style="{ backgroundColor: tag.color }" class="tag-circle"></span>
          {{ tag.name }}
          <span v-if="isSelected(tag)" class="selected-indicator">✓</span>
        </div>
        <input type="text" v-model="newTagName" placeholder="New tag name">
        <button @click="addTag">Add Tag</button>
      </div>
    </div>

    <div class="selected-tags">
      <div v-for="tag in localCardData.selectedTags" :key="tag.name" class="tag">
        <span :style="{ backgroundColor: tag.color }" class="tag-circle"></span>
      </div>
    </div>
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
  name: 'CardComponent',
  props: {
    cardData: {
      type: Object,
      required: true,
      default: () => ({
        title: '',
        description: '',
        tags: [],
        selectedTags: []
      })
    },
    tags: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      localCardData: { ...this.cardData, selectedTags: this.cardData.selectedTags || [] },
      newTagName: '',
      dropdownVisible: false,
      isVisible: false,
      isEnabled: true
    };
  },
  methods: {
    resizeTextarea(event) {
      const textarea = event.target;
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
      this.emitUpdate(); // Emit update when resizing textarea (description change)
    },
    toggleMenu() {
      this.isEnabled = !this.isEnabled;
      this.$refs.card.querySelector('.title-input').disabled = !this.isEnabled;
      this.$refs.card.querySelector('.description-textarea').disabled = !this.isEnabled;
      this.isVisible = this.$refs.card.querySelector('.title-input').disabled;
    },
    handleClickOutside(event) {
      if (this.$refs.card && !this.$refs.card.contains(event.target)) {
        if (this.dropdownVisible) {
          this.dropdownVisible = false;
        }
        this.$refs.card.querySelector('.title-input').disabled = !this.isEnabled;
        this.$refs.card.querySelector('.description-textarea').disabled = !this.isEnabled;
        this.isEnabled = false;
        this.isVisible = this.$refs.card.querySelector('.title-input').disabled;
      }
    },
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
    addTag() {
      if (this.newTagName.trim() !== '') {
        const randomColor = chroma.random();
        const pastelColor = chroma.mix(randomColor, 'white', 0.7).hex();
        const newTag = new TagModel(this.newTagName, pastelColor);
        this.$emit('add-tag', newTag);  // Emitimos un evento para agregar el tag
        this.newTagName = '';
      }
    },
    toggleTagSelection(tag) {
      const index = this.localCardData.selectedTags.findIndex(t => t.name === tag.name);
      if (index > -1) {
        this.localCardData.selectedTags.splice(index, 1); // Deselect the tag
      } else {
        this.localCardData.selectedTags.push(tag); // Select the tag
      }
      this.emitUpdate();
    },
    isSelected(tag) {
      return this.localCardData.selectedTags?.some(t => t.name === tag.name) || false;
    },
    emitUpdate() {
      this.$emit('update-card', { ...this.localCardData });
    }
  },
  watch: {
    cardData: {
      handler(newVal) {
        this.localCardData = { ...newVal, selectedTags: newVal.selectedTags || [] };
      },
      deep: true
    }
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }
};
</script>


<style scoped>
.card {
  position: relative; /* Required for absolute positioning of menu */
  background: white;
  min-width: 400px;
  min-height: 150px;
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 10px;
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
  outline: none;
  border: none;
  font: 1em sans-serif;
  font-size: x-large;
  font-weight: bold; /* Bold text */
  padding-right: 1%;
}

.description-textarea {
  outline: none;
  border: none;
  padding: 1%;
  font-size: medium;
  resize: none;
  overflow: hidden;
  font: 1em sans-serif;
  min-height: 50px;
}

.dropdown {
  position: relative;
}

.dropdown-button {
  padding: 8px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
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
}

.dropdown-menu div {
    padding: 15px;
    cursor: pointer;
    font: 1em sans-serif;
  }

  .dropdown-menu div:hover {
    background-color: #f0f0f0;
  }

.selected-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
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

.selected-indicator {
  margin-left: 8px;
  color: green;
  font-weight: bold;
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

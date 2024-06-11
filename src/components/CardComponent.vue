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
      <button @click="toggleDropdown" v-if="dropdownButtonVisible" class="dropdown-button">Select Tag</button>
      <div ref="dropdown" class="dropdown-menu" v-show="dropdownVisible">
        <div class="tag-list" ref="tagList">
          <div v-for="tag in tags" :key="tag.name" class="tag" @click="toggleTagSelection(tag)">
            <span :style="{ backgroundColor: tag.color }" class="tag-circle"></span>
            {{ tag.name }}
            <span class="selected-indicator" v-if="isSelected(tag)">✓</span>
            <button class="remove-tag-button" @click.stop="removeTag(tag)">X</button>
          </div>
        </div>
        <div class="tag-input">
          <input type="text" v-model="newTagName" placeholder="New tag name">
          <button @click="addTag">Add Tag</button>
        </div>
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
      isEnabled: true,
      description: '',
      dropdownButtonVisible: true,
      localTags: this.tags.slice(),
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
      this.dropdownButtonVisible = !this.localCardData.selectedTags.length > 0;
    },
    handleClickOutside(event) {
      if (this.$refs.card && !this.$refs.card.contains(event.target)) {
        this.$refs.card.querySelector('.title-input').disabled = !this.isEnabled;
        this.$refs.card.querySelector('.description-textarea').disabled = !this.isEnabled;
        this.isEnabled = false;
        this.isVisible = this.$refs.card.querySelector('.title-input').disabled;
        this.dropdownVisible = false;
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
        this.localTags.push(newTag);
        this.$emit('update-tags', this.localTags);
      }
      this.dropdownButtonVisible = !this.localCardData.selectedTags.length > 0;
    },
    removeTag(tag) {
      const index = this.tags.indexOf(tag);
      if (index > -1) {
        this.localTags.splice(index, 1);
      }
      const indexSelected = this.localCardData.selectedTags.indexOf(tag);
      if (indexSelected > -1) {
        this.localCardData.selectedTags.splice(indexSelected, 1);
      }
      this.$emit('update-tags', this.localTags);
      this.dropdownButtonVisible = !this.localCardData.selectedTags.length > 0;
    },
    toggleTagSelection(tag) {
      const index = this.localCardData.selectedTags.findIndex(t => t.name === tag.name);
      if (index > -1) {
        this.localCardData.selectedTags.splice(index, 1); // Deselect the tag
      } else {
        this.localCardData.selectedTags.push(tag); // Select the tag
      }
      this.emitUpdate();
      this.dropdownButtonVisible = !this.localCardData.selectedTags.length > 0;

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
    },
    loadTags() {
      const tagsFromStorage = localStorage.getItem('tags');
      if (tagsFromStorage) {
        const tags = JSON.parse(tagsFromStorage);
        this.$emit('tags-loaded', tags); // Emitir evento para informar al padre sobre las etiquetas cargadas
      }
    },
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
  top: 25px;
  right: 25px;
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
  background: none;
  border-bottom: #9d9d9d;
  color: #9d9d9d;
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
  background-color: #ffffff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  max-height: 350px; /* Set a max-height */
  overflow: hidden; /* Ensure the content is hidden when scrolling */
}

.tag-list {
  flex-grow: 1; /* Allow the tag list to grow and fill the available space */
  overflow-y: auto; /* Make the tag list scrollable */
  padding: 10px; /* Add some padding */
}

.tag-input {
  display: flex; /* Align button and input horizontally */
  align-items: center; /* Center items vertically */
  padding: 10px;
  background-color: #fff;
  border-top: 1px solid #ccc; /* Add divider */
}

.tag-input input {
  flex: 1; /* Take up remaining space */
  border: none; /* Remove border */
  font: 1em sans-serif;
  outline: none; /* Remove focus border */
}

.tag-input input:focus {
  border: none; /* Remove focus border */
}

.tag-input button {
  margin-left: 10px; /* Add margin between input and button */
  padding: 8px;
  background: none;
  color: #9d9d9d;
  border: none; /* Remove border */
  border-radius: 4px;
  cursor: pointer;
}

.selected-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag {
  display: flex;
  align-items: center;
  padding-top: 10px;
  font: 1em sans-serif;
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

.remove-tag-button {
  margin-left: auto; /* Pushes the button to the end */
  padding: 2px 5px;
  background: none;
  color: gray;
  border: none;
  cursor: pointer;
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


<template>
    <header class="header" >
      <div class="header-content">
        <div class="icon-container" @click="openSidebar">
          <transition name="fade" mode="out-in">
            <img
              v-if="!isMenuOpen"
              src="@/assets/opened-hambureguer-menu-icon.svg"
              alt="Menu" 
              class="menu-icon" 
            />
            <img
              v-else
              src="@/assets/closed-hambureguer-menu-icon.svg"
              alt="Close"
              class="menu-icon"
            />
          </transition>
        </div>
        <div class="title"> <h1>Neo's To-do</h1></div>
        <div class="header-spacer"></div>
        <div class="header-layout">
          <input
            type="text"
            v-model="searchQuery"
            @input="onSearch"
            placeholder="Search..."
            class="header-search"
          />
          <img
            src="@/assets/search-icon.svg"
            alt="Search Icon"
            :class="{ 'search-icon-moved': searchQuery }"
            class="search-icon"
          />
        </div>
      </div>
    </header>
  </template>
  
  <script>

  export default {
    data() {
      return {
        searchQuery: "",
        isMenuOpen: true,
      };
    },
    methods: {
      onSearch() {
        // Handle search logic here
        console.log(this.searchQuery);
      },
      openSidebar() {
        this.isMenuOpen = !this.isMenuOpen
        this.emitter.emit('toggle-sidebar', this.isMenuOpen);
    }
    },
  };
  </script>
  
  <style scoped>
  .title {
    webkit-user-select: none; /* Chrome, Safari, and Opera */
            -moz-user-select: none;    /* Firefox */
            -ms-user-select: none;     /* Internet Explorer and Edge */
            user-select: none;      
    font: 1em sans-serif;
    padding-left: 1%;
  }
  
  .header {
    webkit-user-select: none; /* Chrome, Safari, and Opera */
            -moz-user-select: none;    /* Firefox */
            -ms-user-select: none;     /* Internet Explorer and Edge */
            user-select: none;      
    font: 1em sans-serif;
  position: sticky; /* Position the header fixed */
  top: 0; /* Stick it to the top */
  width: 100%; /* Full width */
  background-color: #fff; /* Example background color */
  z-index: 1000; /* Ensure it's on top of other content */
  box-shadow: 0 4px 8px rgrgba(0, 0, 0, 0.3)/* Example box shadow */
}
  
  .header-content {
    display: flex;
    align-items: center;
    width: 100%;
  }
  
  .menu-icon {
    height: 20px;
    cursor: pointer;
  }
  
  .header-spacer {
    flex-grow: 1;
  }
  
  .header-search {
    border: none;
    outline: none;
    height: 40px;
    width: 500px;
    background: none;
    color: #000; /* Adjusted text color */
  }
  
  .search-icon {
    height: 20px;
    cursor: pointer;
    transition: transform 0.3s ease; /* Transition for icon movement */
  }
  
  .search-icon-moved {
    transform: translateX(-100%); /* Move icon to the beginning */
  }
  
  .header-layout {
    border-bottom: 1px solid #ced4da;
    margin-right: 2%;
  }
  
  .header-search::placeholder {
    color: #d9d9d9; /* Changed placeholder color */
  }
  
  .icon-container {
    padding-left: 1%;
    margin-top: .4%;
    width: 2%;
    height: 2%;
  }
  
  .fade-enter-from {
    opacity: 0;
  }
  
  .fade-enter-to {
    opacity: 1;
  }

  .fade-enter-active {
    transition: all .1s ease-out;
  }

  .fade-leave-to {
    opacity: 0;
  }

  .fade-leave-active {
    transition: all .1s ease-out;
  }

  </style>
  
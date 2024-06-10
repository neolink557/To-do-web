new Vue({
    el: '#app',
    data: {
      todos: [
        { title: 'The first task title', content: 'Lorem ipsum dolor sit amet, consectetur sadipscing elit, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.', labels: ['work', 'study'], done: false },
        { title: 'The second task title', content: 'Lorem ipsum dolor sit amet, consectetur sadipscing elit, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.', labels: ['entertainment'], done: false },
        { title: 'The third task title', content: 'Lorem ipsum dolor sit amet, consectetur sadipscing elit.', labels: ['family'], done: true }
      ],
      hideDone: false,
      topics: ['work', 'study', 'entertainment', 'family'],
      labelColors: {
        work: 'label-work',
        study: 'label-study',
        entertainment: 'label-entertainment',
        family: 'label-family'
      },
      selectedTopic: null,
      newTodoTitle: '',
      newTodoContent: '',
      newTodoLabels: [],
      newTopic: ''
    },
    methods: {
      toggleDone(todo) {
        todo.done = !todo.done;
      },
      addTodo() {
        if (this.newTodoTitle && this.newTodoContent) {
          this.todos.push({
            title: this.newTodoTitle,
            content: this.newTodoContent,
            labels: this.newTodoLabels,
            done: false
          });
          this.newTodoTitle = '';
          this.newTodoContent = '';
          this.newTodoLabels = [];
        }
      },
      addTopic() {
        if (this.newTopic && !this.topics.includes(this.newTopic)) {
          this.topics.push(this.newTopic);
          this.newTopic = '';
        }
      },
      filterByTopic(topic) {
        this.selectedTopic = this.selectedTopic === topic ? null : topic;
      }
    },
    computed: {
      filteredTodos() {
        let todos = this.todos;
        if (this.hideDone) {
          todos = todos.filter(todo => !todo.done);
        }
        if (this.selectedTopic) {
          todos = todos.filter(todo => todo.labels.includes(this.selectedTopic));
        }
        return todos;
      }
    },
    template: `
      <div>
        <div class="sidebar">
          <h3>Topics</h3>
          <ul class="topic-list">
            <li v-for="topic in topics" :key="topic" @click="filterByTopic(topic)">
              <span :class="labelColors[topic]"></span>{{ topic }}
            </li>
          </ul>
          <input type="text" v-model="newTopic" placeholder="New topic">
          <button @click="addTopic">Add Topic</button>
        </div>
        <div class="main-content">
          <div id="hideDone">
            <input type="checkbox" v-model="hideDone">
            <label for="hideDone">Hide Done Tasks</label>
          </div>
          <div v-for="todo in filteredTodos" :key="todo.title" class="todo-container">
            <div class="todo-header">
              <div class="todo-title">{{ todo.title }}</div>
              <div @click="toggleDone(todo)">
                <input type="checkbox" v-model="todo.done">
                <label>Done</label>
              </div>
            </div>
            <div class="todo-content">{{ todo.content }}</div>
            <div class="todo-footer">
              <div class="labels">
                <span v-for="label in todo.labels" :key="label" :class="labelColors[label]"></span>
              </div>
            </div>
          </div>
          <div class="todo-container">
            <h3>Add New Todo</h3>
            <input type="text" v-model="newTodoTitle" placeholder="Title">
            <textarea v-model="newTodoContent" placeholder="Content"></textarea>
            <div>
              <label v-for="topic in topics" :key="topic">
                <input type="checkbox" :value="topic" v-model="newTodoLabels"> {{ topic }}
              </label>
            </div>
            <button @click="addTodo">Add Todo</button>
          </div>
        </div>
        <button class="add-button" @click="addTodo">+</button>
      </div>
    `
  });
  
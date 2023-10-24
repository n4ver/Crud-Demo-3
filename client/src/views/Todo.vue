<template>
    <h1>OC Todo App</h1>
    <form @submit.prevent="addNewTodo">
      <label>Create New Todo</label>
      <input v-model="newTitle" name="newTitle" placeholder="Title" required pattern="^[a-zA-Z0-9]{5,100}$">
      <input v-model="newContent" name="newContent" placeholder="Your text here..." pattern="^[a-zA-Z0-9]{0,500}$">
      <button type="submit" @click="submit">Add New Todo</button>
    </form>
    <button @click="removeAllTodos">Remove All</button>
    <button @click="markAllDone">Mark All Done</button>
    <ul>
      <li v-for="(todo, index) in todos" :key="todo.id" class="todo">
        <h3 :class="{ done: todo.isDone }" @click="toggleDone(todo)">{{ index + 1 }}. {{todo.title}}</h3>
        <button @click="removeTodo(todo)">Remove Todo</button>
        <button @click="$router.push('/todo/' + todo.id)">View</button>
      </li>
    </ul>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { v4 as uuidv4 } from 'uuid';
  
  export default {
    setup() {
      const todos = ref([]);
      const newTitle = ref('');
      const newContent = ref('');

      onMounted(async() => {
        const tempTodos = [];
        axios.get('http://localhost:8081/api/v1/todo')
        .then((res) => {
            res.data.todo.forEach((element) => {
                tempTodos.push(element);
            })
            todos.value = tempTodos;
        });
      })

      function getTodo(id) {
        const res = axios.get('http://localhost:8081/api/v1/todo/' + id);
        console.log(res);
        console.log(res.data);
        return res.data.todo;
      }

      function submit() {
        if (validated())
            addNewTodo();
      }

      function validated() {
        const titleRegex = /^[a-zA-Z0-9]{5,100}$/gm;
        const contentRegex = /^[a-zA-Z0-9]{0,500}$/gm;
        return titleRegex.test(newTitle.value) && contentRegex.test(newContent.value);
      }

      function addNewTodo() {
        const newId = uuidv4()
        axios.post('http://localhost:8081/api/v1/todo', {
            id: newId,
            title: newTitle.value,
            isDone: false,
            content: newContent.value
        })
        //Flush variables
        newTitle.value = '';
        newContent.value = '';
        
        todos.value.push(getTodo(newId));
      }
  
      function toggleDone(todo) {
        todo.isDone = !todo.done;
      }
  
      function removeTodo(todo) {
        //todos.value.splice(index, 1);
        axios.delete('http://localhost:8081/api/v1/todo/delete/' + todo.id);

        todos.value = todos.value.filter((element) => element.id !== todo.id)

      }
  
      function markAllDone() {
        todos.value.forEach((todo) => todo.isDone = true);
      }
  
      function removeAllTodos() {
        todos.value = [];
      }
  
      return {
        todos,
        newTitle,
        newContent,
        submit,
        addNewTodo,
        toggleDone,
        removeTodo,
        markAllDone,
        removeAllTodos,
      };
    }
  }
  </script>
  
  <style scoped>
  body {
    font-family: sans-serif;
    padding-top: 1em;
    padding-bottom: 1em;
    font-size: 2em;
    width: 80%;
    margin: 0 auto;
  }
  input, textarea, button, p, div, section, article, select {
    display: 'block';
    width: 100%;
    font-family: sans-serif;
    font-size: 1em;
    margin: 0.5em;
  }
  
  .todo {
    cursor: pointer;
  }
  
  .done {
    text-decoration: line-through;
  }
  </style>
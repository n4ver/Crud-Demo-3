<template>
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">OC Todo App</h1>
    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <form class="space-y-4 md:space-y-6" @submit.prevent="addNewTodo">
        <label class="items-center text-xl leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Create New Todo</label>
        <input v-model="newTitle" name="newTitle" placeholder="Title" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required pattern="^[a-zA-Z0-9]{5,100}$">
        <input v-model="newContent" name="newContent" placeholder="Your text here..." class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" pattern="^[a-zA-Z0-9]{0,500}$">
        <button type="submit" @click="submit">Add New Todo</button>
      </form>
    </div>
    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <ul class="flex flex-col">
        <li v-for="(todo, index) in todos" :key="todo.id"  class="flex-row" id="todo">
          <h3 class="flex-auto" :class="{ done: todo.isDone }" @click="toggleDone(todo)">{{ index + 1 }}. {{todo.title}}</h3>
          <button class="flex-none" @click="removeTodo(todo)">Remove</button>
          <button class="flex-none" @click="toggleDone(todo)">Toggle Done</button>
          <button class="flex-none" @click="$router.push('/todo/' + todo.id)">View</button>
        </li>
      </ul>
    </div>
  </div>
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
        axios.get('http://localhost:8081/api/v1/todo/' + id)
        .then((res) =>{
          return res.data;
        })
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
        let newTodo;
        axios.post('http://localhost:8081/api/v1/todo', {
          id: newId,
          title: newTitle.value,
          isDone: false,
          content: newContent.value
        }).then(() => {
          newTodo = getTodo(newId);
          todos.value.push(newTodo);
          console.log(todos.value);
        })
        //Flush variables
        newTitle.value = '';
        newContent.value = '';
      }

      function updateTodoDone(todo) {
        console.log(todo.isDone);
        axios.put('http://localhost:8081/api/v1/todo/edit/' + todo.id, {
          title: todo.title,  
          isDone: todo.isDone,
          content: todo.content
        })
    }
  
      function toggleDone(todo) {
        console.log(todo);
        todo.isDone = !todo.isDone;
        updateTodoDone({
          id: todo.id,
          title: todo.title,
          isDone: todo.isDone,
          content:  todo.content
        });
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
    padding-top: 1em;
    padding-bottom: 1em;
    font-size: 2em;
    width: 80%;
    margin: 0 auto;
  }
  input, textarea, button, p, div, section, article, select {
    display: 'block';
    width: 100%;
    font-size: 1em;
    margin: 0.5em;
  }
  
  #todo {
    cursor: pointer;
  }
  
  .done {
    text-decoration: line-through;
  }
  </style>
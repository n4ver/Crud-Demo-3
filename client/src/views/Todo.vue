<template>
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">OC Todo App</h1>
    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <form class="items-center space-y-4 md:space-y-6" @submit.prevent="addNewTodo">
        <label class="items-center text-xl leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Create New Todo</label>
        <input v-model="newTitle" name="newTitle" placeholder="Title" class="items-center bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required pattern="^[a-zA-Z0-9 ]{5,100}$">
        <input v-model="newContent" name="newContent" placeholder="Your text here..." class="items-center bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" pattern="^[a-zA-Z0-9 ]{0,500}$">
        <button class="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4" type="submit" @click="submit()">Add New Todo</button>
      </form>
    </div>
    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <ul>
        <li v-for="(todo, index) in todos" :key="todo.title"  class="flex flex-row flex-nowrap">
          <h3 class="flex-grow items-center justify-center" :class="{ done: todo.isDone }" @click="toggleDone(todo)">{{ index + 1 }}. {{todo.title}}</h3>
          <button class="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4" @click="$router.push('/todo/' + todo.id)">View</button>
          <button class="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:w-auto focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" @click="removeTodo(todo)">Remove</button>
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
          getAllTodo();
          console.log(todos.value);
      });

    function getAllTodo() {
      todos.value = [];
      axios.get('http://localhost:8081/api/v1/todo')
      .then((res) => {
        res.data.todo.forEach((element) => {
          todos.value.push(element);
        });
      })
    }

    /* function getTodo(id) {
      axios.get('http://localhost:8081/api/v1/todo/' + id)
      .then((res) =>{
        console.log(res.data);
        return res.data;
      })
    } */

    function submit() {
      if (validated()) {
        addNewTodo();
      }
    }

    function validated() {
      const titleRegex = /^[a-zA-Z0-9]{5,100}$/gm;
      const contentRegex = /^[a-zA-Z0-9]{0,500}$/gm;
      return titleRegex.test(newTitle.value) && contentRegex.test(newContent.value);
    }

    function addNewTodo() {
      const newId = uuidv4()
      const todo = {
        id: newId,
        title: newTitle.value,
        isDone: false,
        content: newContent.value
      }
      axios.post('http://localhost:8081/api/v1/todo', todo)
      .then(() => {
        todos.value.push(todo);
      });
      //Flush variables
      newTitle.value = '';
      newContent.value = '';
    }

    function updateTodoDone(todo) {
      console.log('Toggling to:', todo.isDone);
      axios.put('http://localhost:8081/api/v1/todo/edit/' + todo.id, {
        isDone: todo.isDone,
        title: todo.title, // pass these two just so u dont get error
        content: todo.content
      })
  }

    function toggleDone(todo) {
      console.log('Toggling from:', todo.isDone);
      todo.isDone = !todo.isDone;
      updateTodoDone(todo);
    }

    function removeTodo(todo) {
      axios.delete('http://localhost:8081/api/v1/todo/delete/' + todo.id);
      todos.value = todos.value.filter((element) => element.id !== todo.id);
    }

    return {
      todos,
      newTitle,
      newContent,
      updateTodoDone,
      submit,
      addNewTodo,
      toggleDone,
      removeTodo
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
  font-size: 1em;
  margin: 0.5em;
}

.done {
  text-decoration: line-through;
}
</style>
<template>
  <div class="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700 ">
      <div class="text-xl leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        <div class="flex flex-row gap-4 items-center justify-center mx-auto">
          <h1 class="flex grow font-bold items-center justify-center">{{ todo.title }}</h1>
          <button class="inline-flex items-center justify-center text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4" @click="$router.push('/todo/edit/' + todo.id)">Edit</button>
          <button class="inline-flex items-center justify-center w-full px-4 my-4 mx-2 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:w-auto focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" @click="removeTodo();$router.push('/todo/')">Remove</button>
        </div>
        <p class="mx-2">{{ todo.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRoute } from 'vue-router';
  
  export default {
    setup() {
      const todo = ref([]);
      const route = useRoute();

      onMounted(async() => {
        //const tempTodos = [];
        axios.get('http://localhost:8081/api/v1/todo/' + route.params.id)
        .then((res) => {
            console.log(res.data);
            todo.value = res.data.todo;
            document.title = todo.value.title;
            //todos.value = tempTodos;
        });
      })

      function removeTodo() {
        //todos.value.splice(index, 1);
        axios.delete('http://localhost:8081/api/v1/todo/delete/' + route.param.id);
      }

      return {
        todo,
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
}
</style>
<template>
    <h1>{{ todo.title }}</h1>
    <button @click="removeOneTodo">Remove </button>
    <button @click="markOneDone">Mark Done</button>
    <p>{{ todo.content }}</p>
    <button @click="$router.push('/todo/edit/' + todo.id)">Edit</button>
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
            todo.value = res.data.todo
            //todos.value = tempTodos;
        });
      })
      return {
        todo
      };
    }
  }
  </script>
<template>
    <div class="my-6 text-gray-900 md:text-2xl dark:text-white">
        <input class="text-gray-900" type="text" v-model="newTitle" id="title">
        <br>
        <input type="checkbox" v-model="newIsDone" true-value="1" false-value="false" id="isDone">Check to mark as Done
        <textarea class="text-gray-900" id="content" v-model="newContent"></textarea>
        <br>
        <button @click="updateTodo">Submit and Update</button>
    </div>
  </template>
<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

export default {
setup() {
    const todo = ref([]);
    const newTitle = ref('');
    const newContent = ref('');
    const newIsDone = ref(false);
    const route = useRoute();
    const router = useRouter();

    onMounted(async() => {
    //const tempTodos = [];
        axios.get('http://localhost:8081/api/v1/todo/' + route.params.id)
        .then((res) => {
            console.log(res.data);
            todo.value = res.data.todo;
            newTitle.value = todo.value.title;
            newContent.value = todo.value.content;
            newIsDone.value = todo.value.isDone;
            //todos.value = tempTodos;
        });
    })

    function updateTodo() {
        axios.put('http://localhost:8081/api/v1/todo/edit/' + todo.value.id, {
            title: newTitle,
            content: newContent,
            isDone: newIsDone
        }).then(() => {
            router.push('/todo');
        })
    }
    return {
    todo,
    newTitle,
    newContent,
    newIsDone,
    updateTodo
    }
}
}
</script>

<style scoped>
#title {
    width:20%;
    height:30px;
    font-size:30px
}

#content {
    height:200px;
    font-size:14pt;
}</style>
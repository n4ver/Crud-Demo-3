<template>
    <div class="items-center justify-center my-auto p-0 w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700 items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <form class="items-center space-y-4 md:space-y-6" @submit.prevent="addNewTodo">
            <div class="flex flex-rowgap-4 items-center justify-center mx-auto">
                <input class="inline-flex flex-grow items-center bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" v-model="newTitle" id="title" required pattern="^[a-zA-Z0-9 ]{5,100}$">
                <input class="inline-flex items-center justify-center w-full px-4 my-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:w-auto focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" type="checkbox" v-model="newIsDone" true-value="1" false-value="false" id="isDone">Mark as Done
            </div>
            <div class="flex flex-col">
                <textarea class="inline-flex items-center justify-center w-full px-4 my-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg md:w-auto focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" id="content" v-model="newContent" required pattern="^[a-zA-Z0-9 ]{5,100}$"></textarea>
                <button class="inline-flex text-white bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4" @click="updateTodo">Submit and Update</button>
            </div>
        </form>
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
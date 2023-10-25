<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  document.title = 'Todo';
  });
</script>

<script>
export default {
  name: "App",
  components: {
  },
  computed: {
    /* username() {
      // We will see what `params` is shortly
      return this.$route.params.username
    }, */
  },
  methods: {
    /* goToDashboard() {
      if (isAuthenticated) {
        this.$router.push('/complaints')
      } else {
        this.$router.push('/login')
      }
    }, */
  },
};
</script>

<template>
    <div>
    <main class="mb-auto justify-center">
        <div class="p-4 mx-auto max-w-screen-md text-center">
            <p class="my-6 text-gray-900 md:text-2xl dark:text-white" >
                TO DO OR NOT TO DO
            </p>
            <p class="my-6 text-gray-900 md:text-xl dark:text-white" >
                THE GREATEST REMINDERS ARE FOUND HERE.
            </p>
        </div>
    </main>
    </div>
</template>


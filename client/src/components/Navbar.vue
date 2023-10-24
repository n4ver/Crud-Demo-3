<template>
    <header>
            <div id="head" class="justify-center">
                <div id="head-wrapper" class="flex-none h-full w-full flex-nowrap">
                    <div id="nav-bar" class="flex items-center bg-gradient-to-r from-indigo-500 gap-4 h-16 px-1 uppercase">
                        <div id="nav-bar-inner" class="flex-auto gap-6 text-white">
                            <router-link to="/" title="Home" class="text-xl px-4 tracking-wider">Home</router-link>
                            <router-link to="/todo" title="Browse" class="text-xl px-4 tracking-wider">Browse</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

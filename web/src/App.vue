<script setup lang="ts">
import NavBar from './components/layout/NavBar.vue'
import Footer from './components/layout/Footer.vue'
import HomeView from './views/HomeView.vue'
</script>

<template>
  <div class="bg-white text-slate-900 font-display min-h-screen flex flex-col transition-colors duration-300">
    <NavBar />
    <HomeView />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const emit = defineEmits<{
  search: [query: string]
}>()

const searchQuery = ref('')

watch(searchQuery, (newQuery) => {
  emit('search', newQuery)
})
</script>

<template>
  <div class="w-full max-w-2xl relative group z-10">
    <div class="absolute -inset-0.5 bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
    <div class="relative flex items-center w-full h-14 md:h-16 bg-white rounded-xl shadow-soft border border-slate-200 overflow-hidden focus-within:border-slate-300 transition-all">
      <input
        v-model="searchQuery"
        class="flex-1 h-full bg-transparent border-none focus:ring-0 text-base md:text-lg placeholder:text-slate-400 text-slate-900 font-body px-6"
        placeholder="Search for tools..."
        type="text"
      />
    </div>
  </div>
</template>

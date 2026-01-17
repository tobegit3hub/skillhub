<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  search: [query: string, searchType: string]
}>()

const searchQuery = ref('')
const searchType = ref('Plugin Name')

const searchTypes = ['Plugin Name', 'Category', 'Developer', 'Tags']

function handleSearch() {
  emit('search', searchQuery.value, searchType.value)
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    handleSearch()
  }
}
</script>

<template>
  <div class="w-full max-w-2xl relative group z-10">
    <div class="absolute -inset-0.5 bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
    <div class="relative flex items-center w-full h-14 md:h-16 bg-white rounded-xl shadow-soft border border-slate-200 overflow-hidden focus-within:border-slate-300 focus-within:ring-4 focus-within:ring-slate-100 transition-all">
      <div class="h-full border-r border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
        <select
          v-model="searchType"
          class="h-full pl-4 pr-8 bg-transparent border-none text-sm font-semibold text-slate-700 focus:ring-0 cursor-pointer outline-none"
        >
          <option v-for="type in searchTypes" :key="type" :value="type">{{ type }}</option>
        </select>
      </div>
      <input
        v-model="searchQuery"
        class="flex-1 h-full bg-transparent border-none focus:ring-0 text-base md:text-lg placeholder:text-slate-400 text-slate-900 font-body px-4"
        placeholder="Search for tools..."
        type="text"
        @keydown="handleKeydown"
      />
      <div class="pr-2">
        <button
          class="h-10 md:h-12 px-6 bg-slate-900 hover:bg-black text-white text-sm font-bold rounded-lg transition-colors shadow-lg shadow-slate-200"
          @click="handleSearch"
        >
          Search
        </button>
      </div>
    </div>
  </div>
</template>

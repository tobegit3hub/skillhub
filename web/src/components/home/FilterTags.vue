<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  categories: string[]
  modelValue: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 'All'
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const selectedCategory = ref(props.modelValue)

function selectCategory(category: string) {
  selectedCategory.value = category
  emit('update:modelValue', category)
}
</script>

<template>
  <div class="flex flex-wrap justify-center gap-3 pt-2">
    <a
      v-for="category in categories"
      :key="category"
      class="px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer"
      :class="selectedCategory === category
        ? 'bg-white text-slate-700 border border-slate-200 hover:border-slate-400 hover:text-slate-900 shadow-sm'
        : 'bg-transparent text-slate-500 border border-transparent hover:bg-slate-50 hover:text-slate-700'"
      @click="selectCategory(category)"
    >
      {{ category }}
    </a>
  </div>
</template>

<script setup lang="ts">
import type { SkillDisplay } from '../../types/skill'

defineProps<{
  skill: SkillDisplay
}>()

const emit = defineEmits<{
  install: [skillId: string]
  bookmark: [skillId: string]
}>()
</script>

<template>
  <div class="group flex flex-col bg-white rounded-xl border border-slate-200 p-6 hover:border-slate-400 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300">
    <div class="flex justify-between items-start mb-4">
      <div :class="[skill.iconBgColor, skill.iconTextColor, 'size-10 rounded-lg flex items-center justify-center']">
        <span class="material-symbols-outlined">{{ skill.icon }}</span>
      </div>
      <span
        class="material-symbols-outlined text-slate-300 cursor-pointer hover:text-slate-900"
        @click="emit('bookmark', skill.id)"
      >
        bookmark
      </span>
    </div>
    <h4 class="text-lg font-bold mb-2 text-slate-900">{{ skill.name }}</h4>
    <p class="text-sm text-slate-600 font-body mb-6 line-clamp-2">
      {{ skill.description }}
    </p>
    <div class="mt-auto flex items-center justify-between">
      <span class="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">{{ skill.category }}</span>
      <button
        class="text-sm font-bold text-slate-900 hover:text-black flex items-center gap-1 group-hover:translate-x-1 transition-transform"
        @click="emit('install', skill.id)"
      >
        Install <span class="material-symbols-outlined text-base">arrow_forward</span>
      </button>
    </div>
  </div>
</template>

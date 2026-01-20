<script setup lang="ts">
import type { SkillDisplay } from '../../types/skill'

const props = defineProps<{
  skill: SkillDisplay
}>()

const emit = defineEmits<{
  click: [skillId: string]
}>()

function handleClick() {
  emit('click', props.skill.id)
}
</script>

<template>
  <div
    @click="handleClick"
    class="flex items-center gap-4 p-4 bg-white rounded-lg border border-slate-200 hover:border-slate-400 hover:shadow-md transition-all duration-300 cursor-pointer"
  >
    <!-- Icon -->
    <div :class="[skill.iconBgColor, skill.iconTextColor, 'flex-shrink-0 size-10 rounded-lg flex items-center justify-center']">
      <span class="material-symbols-outlined">{{ skill.icon }}</span>
    </div>

    <!-- Content -->
    <div class="flex-1 min-w-0">
      <h4 class="text-base font-bold text-slate-900 truncate">{{ skill.name }}</h4>
      <p class="text-sm text-slate-600 line-clamp-1 mt-1">{{ skill.description }}</p>
      <p class="text-xs text-slate-500 mt-2">Plugin: {{ skill.pluginName }}</p>
    </div>
  </div>
</template>

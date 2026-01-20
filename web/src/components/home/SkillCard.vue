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
    class="flex flex-col bg-white rounded-xl border border-slate-200 p-6 hover:border-slate-400 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 cursor-pointer"
  >
    <div class="flex items-start mb-4">
      <div :class="[skill.iconBgColor, skill.iconTextColor, 'size-10 rounded-lg flex items-center justify-center']">
        <span class="material-symbols-outlined">{{ skill.icon }}</span>
      </div>
    </div>
    <h4 class="text-lg font-bold mb-2 text-slate-900">{{ skill.name }}</h4>
    <p class="text-sm text-slate-600 font-body mb-4 line-clamp-2">
      {{ skill.description }}
    </p>
    <div class="mt-auto">
      <span class="text-xs font-medium text-slate-500">Plugin: {{ skill.pluginName }}</span>
    </div>
  </div>
</template>

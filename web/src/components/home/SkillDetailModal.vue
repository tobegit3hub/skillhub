<script setup lang="ts">
import type { SkillDisplay } from '../../types/skill'

defineProps<{
  skill: SkillDisplay
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

function handleEscapeKey(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    emit('close')
  }
}
</script>

<template>
  <Teleport to="body">
    <!-- Modal Container -->
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300"
      @click="emit('close')"
      @keydown="handleEscapeKey"
    >
      <div
        @click.stop
        class="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <!-- Header -->
        <div class="flex items-start gap-4 p-6 border-b border-slate-200">
          <div :class="[skill.iconBgColor, skill.iconTextColor, 'flex-shrink-0 size-16 rounded-xl flex items-center justify-center']">
            <span class="material-symbols-outlined text-2xl">{{ skill.icon }}</span>
          </div>

          <div class="flex-1 min-w-0">
            <h2 class="text-2xl font-bold text-slate-900">{{ skill.name }}</h2>
            <p class="text-sm text-slate-500 mt-1">Plugin: {{ skill.pluginName }}</p>
          </div>
        </div>

        <!-- Content -->
        <div class="p-6 space-y-6">
          <!-- Description -->
          <div>
            <h3 class="text-sm font-semibold text-slate-900 mb-3">Description</h3>
            <p class="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
              {{ skill.description }}
            </p>
          </div>

          <!-- Details -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <h3 class="text-sm font-semibold text-slate-900 mb-2">Skill ID</h3>
              <p class="text-sm text-slate-600 font-mono break-all">{{ skill.id }}</p>
            </div>
            <div>
              <h3 class="text-sm font-semibold text-slate-900 mb-2">Plugin</h3>
              <p class="text-sm text-slate-600">{{ skill.pluginName }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

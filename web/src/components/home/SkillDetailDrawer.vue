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
    <!-- Drawer Overlay -->
    <div
      v-if="isOpen"
      class="fixed inset-0 z-40 transition-opacity duration-300"
      @click="emit('close')"
      @keydown="handleEscapeKey"
    />

    <!-- Drawer Panel -->
    <div
      v-if="isOpen"
      class="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto transition-transform duration-300 ease-in-out"
      @click.stop
      @keydown="handleEscapeKey"
    >
      <!-- Header -->
      <div class="sticky top-0 bg-white flex items-center gap-4 p-6 border-b border-slate-200">
        <div :class="[skill.iconBgColor, skill.iconTextColor, 'flex-shrink-0 size-12 rounded-lg flex items-center justify-center']">
          <span class="material-symbols-outlined">{{ skill.icon }}</span>
        </div>

        <h2 class="text-lg font-bold text-slate-900">{{ skill.name }}</h2>
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
        <div class="space-y-4">
          <div>
            <h3 class="text-sm font-semibold text-slate-900 mb-2">Skill ID</h3>
            <p class="text-sm text-slate-600 font-mono break-all bg-slate-50 p-2 rounded">{{ skill.id }}</p>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-slate-900 mb-2">Plugin</h3>
            <p class="text-sm text-slate-600">{{ skill.pluginName }}</p>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

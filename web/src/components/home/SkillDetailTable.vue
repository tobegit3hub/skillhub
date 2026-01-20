<script setup lang="ts">
import type { SkillDisplay } from '../../types/skill'

defineProps<{
  skills: SkillDisplay[]
}>()
</script>

<template>
  <div class="w-full bg-white rounded-xl border border-slate-200 overflow-hidden">
    <!-- Table Header -->
    <div class="grid grid-cols-12 gap-4 bg-slate-50 border-b border-slate-200 p-6">
      <div class="col-span-2">
        <h3 class="text-sm font-bold text-slate-900">Skill Name</h3>
      </div>
      <div class="col-span-6">
        <h3 class="text-sm font-bold text-slate-900">Description</h3>
      </div>
      <div class="col-span-2">
        <h3 class="text-sm font-bold text-slate-900">Plugin Name</h3>
      </div>
      <div class="col-span-2">
        <h3 class="text-sm font-bold text-slate-900">Category</h3>
      </div>
    </div>

    <!-- Table Rows -->
    <div class="divide-y divide-slate-200">
      <div
        v-for="skill in skills"
        :key="skill.id"
        class="grid grid-cols-12 gap-4 p-6 hover:bg-slate-50 transition-colors duration-200"
      >
        <!-- Skill Name with Icon -->
        <div class="col-span-2 flex items-start gap-3">
          <div
            :class="[skill.iconBgColor, skill.iconTextColor, 'size-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-1']"
          >
            <span class="material-symbols-outlined text-base">{{ skill.icon }}</span>
          </div>
          <div class="flex-1">
            <h4 class="font-semibold text-slate-900 text-sm">{{ skill.name }}</h4>
          </div>
        </div>

        <!-- Description -->
        <div class="col-span-6">
          <p class="text-sm text-slate-600 leading-relaxed">{{ skill.description }}</p>
        </div>

        <!-- Plugin Name -->
        <div class="col-span-2">
          <span class="text-sm font-medium text-slate-900 bg-slate-100 px-3 py-1.5 rounded-md inline-block">
            {{ skill.pluginName }}
          </span>
        </div>

        <!-- Category -->
        <div class="col-span-2">
          <span class="text-xs font-medium text-slate-600 bg-blue-50 px-3 py-1.5 rounded-md inline-block">
            {{ skill.category }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

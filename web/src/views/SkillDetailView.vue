<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { fetchSkills } from '../../services/skillService'
import type { SkillDisplay } from '../../types/skill'
import SkillDetailTable from '../../components/home/SkillDetailTable.vue'

const skills = ref<SkillDisplay[]>([])

onMounted(async () => {
  skills.value = await fetchSkills()
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-50 to-white">
    <!-- Header -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="mb-12">
        <h1 class="text-4xl font-bold text-slate-900 mb-4">Skill Directory</h1>
        <p class="text-lg text-slate-600">
          Browse all available skills with detailed descriptions and plugin information
        </p>
      </div>

      <!-- Skill Detail Table -->
      <SkillDetailTable :skills="skills" />
    </div>
  </div>
</template>

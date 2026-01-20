<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { SkillDisplay } from '../types/skill'
import { fetchSkills, filterSkills } from '../services/skillService'
import HeroSection from '../components/home/HeroSection.vue'
import SearchBar from '../components/home/SearchBar.vue'
import FilterTags from '../components/home/FilterTags.vue'
import SkillCard from '../components/home/SkillCard.vue'
import SkillListItem from '../components/home/SkillListItem.vue'
import SkillDetailDrawer from '../components/home/SkillDetailDrawer.vue'

const skills = ref<SkillDisplay[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const searchQuery = ref('')
const selectedCategory = ref('All')
const viewMode = ref<'grid' | 'list'>('grid')
const selectedSkillId = ref<string | null>(null)

const availableCategories = computed(() => {
  const categories = new Set(skills.value.map(skill => skill.pluginName))
  return ['All', ...Array.from(categories).sort()]
})

const filteredSkills = computed(() => {
  return filterSkills(skills.value, searchQuery.value, selectedCategory.value)
})

const selectedSkill = computed(() => {
  if (!selectedSkillId.value) return null
  return skills.value.find(skill => skill.id === selectedSkillId.value)
})

onMounted(async () => {
  try {
    skills.value = await fetchSkills()
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load skills'
  } finally {
    loading.value = false
  }
})

function handleSearch(query: string) {
  searchQuery.value = query
}

function handleFilter(category: string) {
  selectedCategory.value = category
}

function toggleViewMode(mode: 'grid' | 'list') {
  viewMode.value = mode
}

function handleSkillClick(skillId: string) {
  selectedSkillId.value = skillId
}

function handleCloseModal() {
  selectedSkillId.value = null
}
</script>

<template>
  <main class="flex-grow flex flex-col items-center w-full px-6">
    <HeroSection>
      <SearchBar @search="handleSearch" />
      <FilterTags :categories="availableCategories" v-model="selectedCategory" />
    </HeroSection>

    <section class="w-full max-w-7xl pb-24">
      <div class="flex items-center justify-between mb-8 px-2">
        <h3 class="text-xl font-bold text-slate-900">Recommended Skills</h3>
        <div class="flex gap-2 text-slate-400">
          <button
            @click="toggleViewMode('grid')"
            :class="[
              'hover:text-slate-900 transition-colors',
              viewMode === 'grid' ? 'text-slate-900' : ''
            ]"
          >
            <span class="material-symbols-outlined">grid_view</span>
          </button>
          <button
            @click="toggleViewMode('list')"
            :class="[
              'hover:text-slate-900 transition-colors',
              viewMode === 'list' ? 'text-slate-900' : ''
            ]"
          >
            <span class="material-symbols-outlined">list</span>
          </button>
        </div>
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="text-center py-12 text-slate-500">
        Loading skills...
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="text-center py-12 text-red-500">
        {{ error }}
      </div>

      <!-- Skills grid view -->
      <div v-else-if="viewMode === 'grid'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SkillCard
          v-for="skill in filteredSkills"
          :key="skill.id"
          :skill="skill"
          @click="(skillId) => handleSkillClick(skillId)"
        />
      </div>

      <!-- Skills list view -->
      <div v-else class="space-y-3">
        <SkillListItem
          v-for="skill in filteredSkills"
          :key="skill.id"
          :skill="skill"
          @click="(skillId) => handleSkillClick(skillId)"
        />
      </div>

      <!-- Empty state -->
      <div v-if="!loading && !error && filteredSkills.length === 0" class="text-center py-12 text-slate-500">
        No skills found matching your criteria.
      </div>
    </section>

    <!-- Skill Detail Drawer -->
    <SkillDetailDrawer
      v-if="selectedSkill"
      :skill="selectedSkill"
      :is-open="selectedSkillId !== null"
      @close="handleCloseModal"
    />
  </main>
</template>

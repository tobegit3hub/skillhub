<script setup lang="ts">
// Navigation bar component
</script>

<template>
  <nav class="w-full z-50 border-b border-slate-100 bg-white/90 backdrop-blur-md sticky top-0">
    <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="size-8 rounded-lg bg-slate-900 flex items-center justify-center text-white shadow-md">
          <span class="material-symbols-outlined text-[20px]">extension</span>
        </div>
        <h1 class="text-xl font-bold tracking-tight text-rainbow">SkillHub</h1>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.text-rainbow {
  background: linear-gradient(to right, #ef4444, #f59e0b, #10b981, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}
</style>

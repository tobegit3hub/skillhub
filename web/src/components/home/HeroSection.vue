<script setup lang="ts">
// Hero section component
</script>

<template>
  <section class="w-full max-w-4xl py-20 md:py-28 flex flex-col items-center text-center space-y-8">
    <div class="space-y-4">
      <h2 class="text-5xl md:text-7xl font-black tracking-tight leading-tight text-slate-900">
        Expand Claude's <span class="text-rainbow">Capabilities</span>
      </h2>
      <p class="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-body font-light">
        Discover premium plugins and tools to enhance your AI experience.
      </p>
    </div>
    <slot></slot>
  </section>
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

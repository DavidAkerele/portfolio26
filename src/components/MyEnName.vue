<template>
  <div class="w-full overflow-clip leading-none">
    <span
      v-for="(char, i) in nameChars"
      :key="i"
      class="letter-char font-title translate-y-full will-change-transform inline-block text-flax-smoke-900 font-extrabold"
      style="font-size: clamp(2rem, 11vw, 10rem); line-height: 0.9"
      >{{ char === ' ' ? ' ' : char }}</span
    >
  </div>
</template>

<script setup lang="ts">
  const nameChars = 'DAVID AKERELE'.split('');
</script>

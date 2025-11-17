<script setup lang="ts">
import CurrentVideoPositionDisplay from '@/components/CurrentVideoPositionDisplay.vue'
import BufferDisplay from '@/components/BufferDisplay.vue'

</script>

<template>
  <div class="display-container">
    <CurrentVideoPositionDisplay />
    <BufferDisplay />
  </div>
</template>

<style scoped>
.display-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>

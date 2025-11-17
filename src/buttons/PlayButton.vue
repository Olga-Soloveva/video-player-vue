<script setup lang="ts">
import { computed } from 'vue'
import { usePlayer } from '@/composables/video'
const { isPlaying, togglePlay } = usePlayer()

const type = computed(() => isPlaying.value ? 'pause' : 'play')
const ariaLabel = computed(() => isPlaying.value ? 'Pause video' : 'Play video')

</script>

<template>
  <button
    class='button'
    :class="type"
    :aria-label="ariaLabel"
    @click="togglePlay"
  >
  </button>
</template>

<style scoped>

.button {
  width: 40px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  cursor: pointer;
  position: relative;
  outline: none;
  padding: 0;
  flex-shrink: 0;
}

.button:hover {
  background-color: var(--c-winterberry);
}

.play::before {
  content: '';
  position: absolute;
  left: 10px;
  top: 8px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 12px 0 12px 20px;
  border-color: transparent transparent transparent #fff;
}

.pause::before,
.pause::after {
  content: '';
  position: absolute;
  top: 8px;
  width: 8px;
  height: 24px;
  background: #fff;
  border-radius: 2px;
}
.pause::before {
  left: 8px;
}
.pause::after {
  right: 8px;
}

</style>

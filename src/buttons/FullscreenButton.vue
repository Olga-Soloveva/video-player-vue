<script setup lang="ts">
import { computed } from 'vue'
import { usePlayer } from '@/composables/video'
const { isFullscreen, toggleFullscreen } = usePlayer()

const type = computed(() => isFullscreen.value ? 'exit-fullscreen' : 'fullscreen')
const ariaLabel = computed(() => isFullscreen.value ? 'Exit fullscreen' : 'Fullscreen')

</script>

<template>
  <button
    class='button'
    :class="type"
    :aria-label="ariaLabel"
    @click="toggleFullscreen"
  >
    <span></span>
    <span></span>
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

.button::before,
.button::after,
.button > span:nth-child(1),
.button > span:nth-child(2) {
  content: "";
  position: absolute;
  width: 10px;
  height: 10px;
  border: 4px solid #fff;
  background: transparent;
}

.fullscreen::before {
  top: 6px;
  left: 6px;
  border-right: none;
  border-bottom: none;
}
.fullscreen::after {
  top: 6px;
  right: 6px;
  border-left: none;
  border-bottom: none;
}
.fullscreen > span:nth-child(1) {
  bottom: 6px;
  left: 6px;
  border-top: none;
  border-right: none;
}
.fullscreen > span:nth-child(2) {
  bottom: 6px;
  right: 6px;
  border-top: none;
  border-left: none;
}

.exit-fullscreen::before {
  top: 6px;
  left: 6px;
  border-left: none;
  border-top: none;
}
.exit-fullscreen::after {
  top: 6px;
  right: 6px;
  border-right: none;
  border-top: none;
}
.exit-fullscreen > span:nth-child(1) {
  bottom: 6px;
  left: 6px;
  border-left: none;
  border-bottom: none;
}
.exit-fullscreen > span:nth-child(2) {
  bottom: 6px;
  right: 6px;
  border-right: none;
  border-bottom: none;
}

</style>

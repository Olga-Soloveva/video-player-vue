<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { useElementSize } from '@vueuse/core'
import { useVideo } from '@/composables/video'
import { formatSecondsToMMSS } from '@/utils/formats'

const displayContainer = useTemplateRef('displayRef')

const { duration, currentTime } = useVideo()
const { width: containerWidth } = useElementSize(displayContainer)

const formatCurrentTime = computed(() => formatSecondsToMMSS(currentTime.value))
const formatDuration = computed(() => formatSecondsToMMSS(duration.value))

const timeWidth = computed(() => currentTime.value / duration.value * containerWidth.value)

</script>

<template>
  <div style="width: 100%;">
    <p class="title">Текущая позиция проигрывания видеофайла:</p>
    <div ref="displayRef" class="display-container">
      <div class="current-time" :style="{ width: timeWidth + 'px' }"></div>
    </div>
    <p>{{ formatCurrentTime }} / {{ formatDuration }}</p>
  </div>
</template>

<style scoped>
p {
  text-align: left
}
.title {
  padding-bottom: 0.5rem;
}
.display-container {
  width: 100%;
  background-color: #000;
  height: 20px;
}
.current-time {
  height: 100%;
  background: var(--c-winterberry);
}
</style>

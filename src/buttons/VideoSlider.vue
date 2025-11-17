<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { usePlayer, useVideo } from '@/composables/video'
import { formatSecondsToMMSS } from '@/utils/formats'

const { setCurrentTime } = usePlayer()
const { bufferedSize, duration, currentTime } = useVideo()

const formatCurrentTime = computed(() => formatSecondsToMMSS(currentTime.value))
const formatDuration = computed(() => formatSecondsToMMSS(duration.value))

const sliderRef = ref<HTMLInputElement | null>(null)

const currentTimePercent = computed(() => currentTime.value / duration.value * 100)
const endBufferPercent = computed(() => (bufferedSize.value + currentTime.value) / duration.value * 100)

watch(currentTimePercent, percent => {
  if (!sliderRef.value) return
  sliderRef.value.style.setProperty(
    '--current-time-percent',
    `${percent || 0}%`
  )
}, { immediate: true })

watch(endBufferPercent, percent => {
  if (!sliderRef.value) return
  sliderRef.value.style.setProperty(
    '--end-buffer-percent',
    `${percent || 0}%`
  )
}, { immediate: true })

</script>

<template>
  <div class="slider-container">
    <input
      class="slider"
      v-model="currentTime"
      ref="sliderRef"
      type="range"
      min="0"
      :max="duration"
      step="0.1"
      @input="setCurrentTime"
    />
    <span class="description">{{ formatCurrentTime }} / {{ formatDuration }}</span>
  </div>
</template>

<style scoped>

.slider-container {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 1rem;
  padding: 0 8px;
}

.description {
  white-space: nowrap;
  display: block;
}

input[type="range"] {
  --current-time-percent: 0%;
  --end-buffer-percent: 0%;
  -webkit-appearance: none;
  width: 100%;
  height: 8px;
  border-radius: 5px;
  outline: none;
  background: linear-gradient(
    to right,
    #be394f var(--current-time-percent),
    #b8b6b6 var(--current-time-percent),
    #b8b6b6 var(--end-buffer-percent),
    #3f3f3f var(--end-buffer-percent)
  );
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  background: var(--c-winterberry);
  cursor: pointer;
  border-radius: 50%;
  margin-top: -2px;
}

</style>

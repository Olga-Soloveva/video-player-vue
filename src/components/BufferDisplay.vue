<script setup lang="ts">
import { useVideo, type TBuffer } from '@/composables/video'

const { bufferedRanges, duration } = useVideo()

function getRangeStyle (bufferItem: TBuffer) {
  const leftPercent = (bufferItem[0] / duration.value) * 100
  const widthPercent = ((bufferItem[1] - bufferItem[0]) / duration.value) * 100
  return {
    left: leftPercent + '%',
    width: widthPercent + '%',
  }
}

</script>

<template>
  <div style="width: 100%;">
    <p class="title">Текущий буфер видео:</p>
    <div class="display-container ">
      <div
        v-for="(range, index) in bufferedRanges"
        :key="index"
        class="range"
        :style="getRangeStyle(range)"
      >
      </div>
    </div>
    <p>{{ bufferedRanges }}</p>
  </div>
</template>

<style scoped>
p {
  text-align: left
}
.title {
  padding-bottom: 0.5rem;
}
.current-time {
  height: 100%;
  background: var(--c-winterberry);
}
.display-container  {
  position: relative;
  width: 100%;
  background-color: #000;
  height: 20px;
}
.range {
  position: absolute;
  height: 20px;
  background: var(--c-winterberry);;
  color: white;
}
</style>

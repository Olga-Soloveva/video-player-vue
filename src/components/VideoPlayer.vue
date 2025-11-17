<script setup lang="ts">
import { ref, watch } from 'vue'
import { useIdle } from '@vueuse/core'
import FullscreenButton from '@/buttons/FullscreenButton.vue';
import PlayButton from '@/buttons/PlayButton.vue';
import VideoSlider from '@/buttons/VideoSlider.vue';

const { idle } = useIdle(3 * 1000) // 3 sec

const isPlayerActive = ref(true)

watch(idle, (idleValue) => {
  isPlayerActive.value = idleValue ? false : true
})

</script>

<template>
  <div v-show="isPlayerActive" class="player-container" >
    <PlayButton />
    <VideoSlider />
    <FullscreenButton />
  </div>
</template>

<style scoped>
.player-container {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  gap: 10px;
  background: #000000ba;
  color: white;
  transition: opacity 0.3s;
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import { useHls, useVideo, usePlayer } from '@/composables/video.ts'
import VideoPlayer from '@/components/VideoPlayer.vue'

const DEFAULT_VIDEO_SRC =
  'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_ts/master.m3u8'

const props = withDefaults(
  defineProps<{
    src?: string
    autoPlay?: boolean
    canUseCustomPlayer?: boolean
  }>(),
  {
    src: DEFAULT_VIDEO_SRC,
    autoPlay: false,
    canUseCustomPlayer: false,
  },
)

const showCustomPlayer = ref(false)

const { videoRef } = useHls(props.src, { autoPlay: props.autoPlay })
const { onLoadedMetadata, updateTime } = useVideo()
const { videoRefContainer, isFullscreen, togglePlay } = usePlayer()

function handleTogglePlay () {
  if (showCustomPlayer.value) togglePlay()
}

</script>

<template>
  <div ref="videoRefContainer" class="video-container" :class="{ fullscreen: isFullscreen }">
    <video
      ref="videoRef"
      :muted="autoPlay"
      :controls="!showCustomPlayer"
      class="video"
      @click="handleTogglePlay"
      @timeupdate="updateTime"
      @loadedmetadata="onLoadedMetadata"
    ></video>
    <div v-show="showCustomPlayer" class="player">
      <VideoPlayer />
    </div>
  </div>

  <div v-if="canUseCustomPlayer">
    <label>
      <input type="checkbox" v-model="showCustomPlayer" />
      Кастомный плеер
    </label>
  </div>
</template>

<style scoped>
.video-container {
  width: 80%;
  position: relative;
}
.video {
  width: 100%;
  display: block;
}
.video-container.fullscreen video {
  height: 100%;
}
.player {
  width: 100%;
  position: absolute;
  bottom: 0px;
  left: 0;
  right: 0;
}
</style>

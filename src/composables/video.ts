import { onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { useEventListener, useFullscreen  } from '@vueuse/core'
import Hls from 'hls.js'

type TOptions = {
  autoPlay: boolean
}
export type TBuffer = [number, number]

const videoRef = ref<HTMLVideoElement | null>(null)
const videoRefContainer = ref(null)

const duration = ref(0)
const currentTime = ref(0)
const buffered = ref<TimeRanges>()
const bufferedRanges  = ref<TBuffer[]>([])
const bufferedSize = ref(0)

export function usePlayer() {
  const isPlaying = ref(false)

  const { isFullscreen, toggle: toggleFullscreen } = useFullscreen(videoRefContainer)

  function play() {
    videoRef.value?.play()
    isPlaying.value = true
  }

  function pause() {
    videoRef.value?.pause()
    isPlaying.value = false
  }

  function togglePlay() {
    if (isPlaying.value) pause()
    else play()
  }

  useEventListener(videoRef, 'pause', () => isPlaying.value = false)
  useEventListener(videoRef, 'play', () => isPlaying.value = true)

  function setCurrentTime() {
    if (!videoRef.value) return
    videoRef.value.currentTime = currentTime.value
  }

  return {
    videoRef,
    videoRefContainer,
    isPlaying,
    isFullscreen,
    play,
    pause,
    togglePlay,
    toggleFullscreen,
    setCurrentTime
  }
}

export function useVideo () {
  function onLoadedMetadata() {
    duration.value = videoRef.value?.duration ?? 0
  }

  function updateTime() {
    if (!videoRef.value) return
    currentTime.value = videoRef.value.currentTime
  }

  return {
    videoRef,
    onLoadedMetadata,
    updateTime,
    duration,
    currentTime,
    bufferedRanges,
    bufferedSize
  }
}

export function useHls (src: string, options: TOptions) {
  let hls: Hls | null = null

  onMounted(() => {
    if (videoRef.value) {
      if (Hls.isSupported() && videoRef.value) {
        hls = new Hls()
        hls.loadSource(src )
        hls.attachMedia(videoRef.value)

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          if (options.autoPlay) {
            videoRef.value?.play()
          }
          updateBuffered()
        })

        hls.on(Hls.Events.FRAG_BUFFERED, () => {
          updateBuffered()
        })

      } else if (videoRef.value.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.value.src = src
        if (options.autoPlay) {
          videoRef.value.addEventListener('loadedmetadata', () => {
            videoRef.value?.play()
          })
        }
      }
    }
  })

  onBeforeUnmount(() => {
    if (hls) {
      hls.destroy()
    }
  })

  return { videoRef }
}

function updateBuffered () {
  if (!videoRef.value) return
  buffered.value = videoRef.value.buffered
}

watch(buffered, timeRanges => {
  if (!timeRanges) return
  const bufferedArr: TBuffer[] = []
  for (let i = 0; i < timeRanges.length; i++) {
    const start = timeRanges.start(i);
    const end = timeRanges.end(i);

    bufferedArr.push([start, end])
    if (currentTime.value >= start && currentTime.value <= end) {
      bufferedSize.value = end - currentTime.value
    }
  }
  bufferedRanges.value = [ ...bufferedArr ]
})

<script setup lang="ts">
import VideoBlock from './blocks/VideoBlock.vue'
import DisplayBlock from './blocks/DisplayBlock.vue'

</script>

<template>
  <header>
    <h1>Тестовое задание</h1>
  </header>

  <main>
    <VideoBlock can-use-custom-player/>
    <DisplayBlock />
  </main>
</template>

<style scoped>
  header {
    width: 100%;
  }
  main {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>

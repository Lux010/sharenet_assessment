<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <NavBar />
  <RouterView />
</template>

<style>
:root {
  --bg: #0b1220;
  --card: #0f172a;
  --muted: #94a3b8;
  --line: rgba(148, 163, 184, 0.18);
  --text: #e2e8f0;
  --accent: #38bdf8;
}

body {
  margin: 0;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  background: radial-gradient(1200px 600px at 20% 0%, #111c33 0%, var(--bg) 45%, #070b14 100%);
  color: var(--text);
}
</style>

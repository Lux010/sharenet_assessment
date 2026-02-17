<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="header">
    <div class="wrap">
      <div class="brand">
        <span class="dot"></span>
        <span>Spot Prices</span>
      </div>

      <nav class="nav">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/contact">Contact</RouterLink>
        <RouterLink to="/venues">Venues</RouterLink>
        <RouterLink to="/bookings">Bookings</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(10px);
  background: rgba(15, 23, 42, 0.65);
  border-bottom: 1px solid rgba(148, 163, 184, 0.12);
}

.wrap {
  max-width: 1100px;
  margin: 0 auto;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 800;
  letter-spacing: 0.2px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: var(--accent);
  box-shadow: 0 0 0 6px rgba(56, 189, 248, 0.12);
}

.nav {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

a {
  color: var(--text);
  text-decoration: none;
  font-weight: 700;
  font-size: 14px;
  padding: 8px 10px;
  border-radius: 10px;
  transition: background 0.15s ease, color 0.15s ease;
}

a:hover {
  background: rgba(148, 163, 184, 0.12);
}

a.router-link-active {
  background: rgba(56, 189, 248, 0.14);
  color: #e0f2fe;
}

@media (max-width: 520px) {
  .wrap {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>

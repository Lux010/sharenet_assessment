<script setup>
import SpotTable from './SpotTable.vue'

const props = defineProps({
  categories: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="stack">
    <section v-for="cat in props.categories" :key="cat.categoryName" class="card">
      <h2 class="cat-title">{{ cat.categoryName }}</h2>
      <SpotTable :spots="cat.spots" />
    </section>
  </div>
</template>

<style scoped>
.stack {
  display: grid;
  gap: 14px;
}

.card {
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 16px;
  padding: 14px;
  background: rgba(15, 23, 42, 0.72);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.22);
}

.cat-title {
  margin: 0 0 10px 0;
  font-size: 15px;
  font-weight: 900;
  color: #e2e8f0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.cat-title::before {
  content: "";
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.8);
}
</style>


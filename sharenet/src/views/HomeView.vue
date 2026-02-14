<script setup>
import { ref, onMounted } from 'vue'
import { fetchSpotPrices } from '../api/sharenet'
import SpotCategoryTables from '../components/SpotCategoryTables.vue'

const grouped = ref([])
const loading = ref(true)
const error = ref('')

function groupLatest5ByCategory(spots) {
  const byCat = new Map()

  for (const s of spots) {
    const cat = s.categoryName || 'UNCATEGORIZED'
    if (!byCat.has(cat)) byCat.set(cat, [])
    byCat.get(cat).push(s)
  }

  // For each category: sort by datetime desc and take latest 5
  const result = []
  for (const [categoryName, items] of byCat.entries()) {
    const latest5 = [...items]
      .sort((a, b) => new Date(b.datetime) - new Date(a.datetime))
      .slice(0, 5)

    result.push({ categoryName, spots: latest5 })
  }

  // Optional: stable ordering of categories alphabetically
  result.sort((a, b) => a.categoryName.localeCompare(b.categoryName))

  return result
}

onMounted(async () => {
  loading.value = true
  error.value = ''

  const data = await fetchSpotPrices()

  // API shape: { user: {...}, spots: [...] }
  const spots = Array.isArray(data?.spots) ? data.spots : []

  if (!spots.length) {
    error.value = 'No spot price data returned from API.'
    grouped.value = []
  } else {
    grouped.value = groupLatest5ByCategory(spots)
  }

  loading.value = false
})
</script>

<template>
  <main class="page">
    <div class="container">
      <div class="hero">
        <div>
          <h1 class="title">Spot Prices</h1>
          <p class="sub">
            Latest spot movements grouped by category. Click table headers to sort.
          </p>
        </div>
        <div class="pill">Data: Sharenet Spots API</div>
      </div>

      <p v-if="loading" class="status">Loading...</p>
      <p v-else-if="error" class="status error">{{ error }}</p>

      <SpotCategoryTables v-else :categories="grouped" />
    </div>
  </main>
</template>

<style scoped>
.page {
  width: 100%;
  padding: 18px 0 40px;
}

.container {
  width: 100%;
  padding: 0 24px;
}

.hero {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  margin: 10px 0 18px;
}

.title {
  margin: 0;
  font-size: 26px;
  font-weight: 900;
  letter-spacing: -0.3px;
}

.sub {
  margin: 6px 0 0;
  color: var(--muted);
  line-height: 1.5;
  max-width: 680px;
}

.pill {
  font-size: 12px;
  font-weight: 800;
  color: #e0f2fe;
  background: rgba(56, 189, 248, 0.14);
  border: 1px solid rgba(56, 189, 248, 0.22);
  padding: 8px 10px;
  border-radius: 999px;
  white-space: nowrap;
}

.status {
  color: var(--muted);
  margin: 12px 0;
}

.status.error {
  color: #fecaca;
}

@media (max-width: 640px) {
  .hero {
    flex-direction: column;
  }
  .pill {
    align-self: flex-start;
  }
}
</style>

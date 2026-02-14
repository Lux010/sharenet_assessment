<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  spots: {
    type: Array,
    required: true
  }
})

const sortKey = ref('datetime') // default: latest first
const sortAsc = ref(false)

function sortBy(key) {
  if (sortKey.value === key) {
    sortAsc.value = !sortAsc.value
  } else {
    sortKey.value = key
    // sensible defaults
    sortAsc.value = key === 'fullName' // names A-Z by default
  }
}

function asNumber(v) {
  const n = Number(v)
  return Number.isFinite(n) ? n : 0
}

const sortedSpots = computed(() => {
  const arr = [...props.spots]
  const key = sortKey.value
  const modifier = sortAsc.value ? 1 : -1

  return arr.sort((a, b) => {
    if (key === 'datetime') {
      return (new Date(a.datetime) - new Date(b.datetime)) * modifier
    }

    if (key === 'fullName') {
      return String(a.fullName).localeCompare(String(b.fullName)) * modifier
    }

    // numeric keys
    return (asNumber(a[key]) - asNumber(b[key])) * modifier
  })
})

function fmtPercent(v) {
  return `${asNumber(v).toFixed(2)}%`
}

function fmtTime(dt) {
  // Keep it readable; you can change to local formatting later if you want
  return dt
}
</script>

<template>
  <div class="table-wrapper">
    <table>
      <thead>
        <tr>
          <th @click="sortBy('fullName')">
            Full Name 
            <span class="sort" v-if="sortKey === 'fullName'">{{ sortAsc ? '▲' : '▼' }}</span>
          </th>
          <th @click="sortBy('price')">
            Price 
            <span class="sort" v-if="sortKey === 'price'">{{ sortAsc ? '▲' : '▼' }}</span>
          </th>
          <th @click="sortBy('move')">
            Move 
            <span class="sort" v-if="sortKey === 'move'">{{ sortAsc ? '▲' : '▼' }}</span>
          </th>
          <th @click="sortBy('pmove')">
            Move % 
            <span class="sort" v-if="sortKey === 'pmove'">{{ sortAsc ? '▲' : '▼' }}</span>
          </th>
          <th @click="sortBy('datetime')">
            Time 
            <span class="sort" v-if="sortKey === 'datetime'">{{ sortAsc ? '▲' : '▼' }}</span>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="spot in sortedSpots" :key="spot.code + spot.datetime">
          <td class="name">{{ spot.fullName }}</td>
          <td>{{ spot.price }}</td>
          <td>{{ spot.move }}</td>
          <td>{{ fmtPercent(spot.pmove) }}</td>
          <td>{{ fmtTime(spot.datetime) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.table-wrapper {
  overflow-x: auto;
  border-radius: 12px;
  border: 1px solid rgba(148, 163, 184, 0.14);
}

.sort { opacity: 0.7; margin-left: 6px; }


table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  min-width: 680px;
  background: rgba(2, 6, 23, 0.35);
}

thead th {
  position: sticky;
  top: 0;
  background: rgba(2, 6, 23, 0.95);
  backdrop-filter: blur(10px);
  color: #e2e8f0;
  padding: 12px 12px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  border-bottom: 1px solid rgba(148, 163, 184, 0.18);
}

th {
  cursor: pointer;
  user-select: none;
}

tbody td {
  padding: 10px 12px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.10);
  color: #e2e8f0;
  font-size: 14px;
}

tbody tr:nth-child(odd) td {
  background: rgba(15, 23, 42, 0.25);
}

tbody tr:hover td {
  background: rgba(56, 189, 248, 0.08);
}

.name {
  font-weight: 800;
}

@media (max-width: 768px) {
  table {
    min-width: 640px;
  }
  tbody td {
    font-size: 13px;
  }
}
</style>


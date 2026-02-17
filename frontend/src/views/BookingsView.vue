<script setup>
import { computed, onMounted, ref } from 'vue'
import { api } from '../api/backend'
import { useToast } from '../composables/useToast'
import SkeletonBookingsTable from '../components/SkeletonBookingsTable.vue'

const toast = useToast()

const loading = ref(true)
const error = ref('')
const bookings = ref([])

const sortKey = ref('created_at')
const sortAsc = ref(false)

function sortBy(key) {
  if (sortKey.value === key) sortAsc.value = !sortAsc.value
  else {
    sortKey.value = key
    sortAsc.value = key === 'venue_name' || key === 'email' || key === 'first_name'
  }
}

const sortedBookings = computed(() => {
  const key = sortKey.value
  const dir = sortAsc.value ? 1 : -1

  return [...bookings.value].sort((a, b) => {
    const av = a[key]
    const bv = b[key]

    // string
    if (typeof av === 'string' || typeof bv === 'string') {
      return String(av ?? '').localeCompare(String(bv ?? '')) * dir
    }

    // date-ish
    if (key === 'created_at') {
      return (new Date(av) - new Date(bv)) * dir
    }

    // number fallback
    return ((Number(av) || 0) - (Number(bv) || 0)) * dir
  })
})

async function loadBookings() {
  loading.value = true
  error.value = ''
  try {
    const res = await api.get('/api/bookings', { params: { limit: 100 } })
    bookings.value = res.data?.bookings ?? []
  } catch (err) {
    console.error(err)
    error.value = err?.response?.data?.error || 'Failed to load bookings.'
    toast.error(error.value)
  } finally {
    loading.value = false
  }
}

onMounted(loadBookings)
</script>

<template>
  <main class="page">
    <div class="top">
      <div>
        <h1 class="title">Recent Bookings</h1>
        <p class="sub">Latest bookings.</p>
      </div>

      <button class="btn" @click="loadBookings" :disabled="loading">
        Refresh
      </button>
    </div>

    <SkeletonBookingsTable v-if="loading" />
    <p v-else-if="error" class="sub" style="color:#fecaca">{{ error }}</p>

    <div v-else class="table-wrap">
      <table>
        <thead>
          <tr>
            <th @click="sortBy('id')">Ref</th>
            <th @click="sortBy('venue_name')">Venue</th>
            <th @click="sortBy('workshop_date')">Date</th>
            <th @click="sortBy('workshop_time')">Time</th>
            <th @click="sortBy('first_name')">Name</th>
            <th @click="sortBy('email')">Email</th>
            <th @click="sortBy('phone')">Phone</th>
            <th @click="sortBy('created_at')">Created</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="b in sortedBookings" :key="b.id">
            <td class="mono">#{{ b.id }}</td>
            <td>{{ b.venue_name }}</td>
            <td class="mono">{{ b.workshop_date }}</td>
            <td class="mono">{{ b.workshop_time }}</td>
            <td>{{ b.first_name }} {{ b.last_name }}</td>
            <td class="mono">{{ b.email }}</td>
            <td class="mono">{{ b.phone }}</td>
            <td class="mono">{{ new Date(b.created_at).toLocaleString() }}</td>
          </tr>

          <tr v-if="sortedBookings.length === 0">
            <td colspan="8" class="empty">No bookings yet.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<style scoped>
.page { width: 100%; padding: 24px; }

.top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 14px;
}

.title { margin: 0; font-size: 26px; font-weight: 900; }
.sub { margin: 8px 0 0; color: rgba(226, 232, 240, 0.65); line-height: 1.5; }

.btn {
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid rgba(56, 189, 248, 0.28);
  background: rgba(56, 189, 248, 0.14);
  color: #e0f2fe;
  font-weight: 900;
  cursor: pointer;
  height: 40px;
}
.btn:disabled { opacity: 0.5; cursor: not-allowed; }

.table-wrap {
  overflow-x: auto;
  border-radius: 14px;
  border: 1px solid rgba(148, 163, 184, 0.14);
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  min-width: 980px;
  background: rgba(2, 6, 23, 0.35);
}

thead th {
  position: sticky;
  top: 0;
  background: rgba(2, 6, 23, 0.95);
  padding: 12px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #e2e8f0;
  border-bottom: 1px solid rgba(148, 163, 184, 0.18);
  cursor: pointer;
  user-select: none;
  text-align: left;
}

tbody td {
  padding: 10px 12px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.10);
  color: #e2e8f0;
}

tbody tr:nth-child(odd) td { background: rgba(15, 23, 42, 0.22); }
tbody tr:hover td { background: rgba(56, 189, 248, 0.08); }

.mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace; }
.empty { text-align: center; color: rgba(226, 232, 240, 0.65); padding: 18px; }

@media (max-width: 860px) {
  .top { flex-direction: column; }
}
</style>

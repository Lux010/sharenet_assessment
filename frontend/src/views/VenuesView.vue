<script setup>
import { computed, onMounted, ref } from 'vue'
import VenueCard from '../components/VenueCard.vue'
import BookingModal from '../components/BookingModal.vue'
import { useToast } from '../composables/useToast'
import { api } from '../api/backend'
import SkeletonVenueCard from '../components/SkeletonVenueCard.vue'

const toast = useToast()

const onlyAvailable = ref(false)
const query = ref('')

const venues = ref([])
const loading = ref(true)
const error = ref('')

const modalOpen = ref(false)
const selectedBooking = ref(null)
const bookingBusy = ref(false)
const modalRef = ref(null)

async function loadVenues() {
  loading.value = true
  error.value = ''

  try {
    const res = await api.get('/api/workshops', {
      params: { onlyAvailable: onlyAvailable.value }
    })
    venues.value = res.data?.venues ?? []
  } catch (err) {
    console.error(err)
    error.value = err?.response?.data?.error || 'Failed to load workshops.'
  } finally {
    loading.value = false
  }
}

onMounted(loadVenues)

async function onToggleAvailable() {
  await loadVenues()
}

function onBook({ venue, date }) {
  selectedBooking.value = { venue, date }
  modalOpen.value = true
}

function closeModal() {
  modalOpen.value = false
  selectedBooking.value = null
  modalRef.value?.reset?.()
}

async function submitBooking(payload) {
  if (bookingBusy.value) return
  bookingBusy.value = true

  try {
    toast.info('Submitting booking...')

    const { venue, date } = payload.booking
    const { firstName, lastName, email, phone } = payload.user

    const payloadDate =
  typeof date.date === 'string'
    ? date.date.slice(0, 10)
    : new Date(date.date).toISOString().slice(0, 10)

    const res = await api.post('/api/bookings', {
      venueId: venue.id,
      venueName: venue.name,
      dateId: date.id,
      date: payloadDate,
      time: date.time,
      firstName,
      lastName,
      email,
      phone
    })

    toast.success(`Booked successfully! Ref #${res.data.bookingId}`)
    closeModal()

    // Refresh from DB for correct seats
    await loadVenues()
  } catch (err) {
    console.error(err)
    const msg = err?.response?.data?.error || 'Booking failed. Please try again.'
    toast.error(msg)
  } finally {
    bookingBusy.value = false
  }
}

const filteredVenues = computed(() => {
  const q = query.value.trim().toLowerCase()

  return venues.value
    .map(v => {
      const matchesText =
        !q ||
        v.name.toLowerCase().includes(q) ||
        (v.city || '').toLowerCase().includes(q) ||
        (v.address || '').toLowerCase().includes(q)

      if (!matchesText) return null

      const dates = onlyAvailable.value ? v.dates.filter(d => d.seatsAvailable > 0) : v.dates
      if (!dates.length) return null

      return { ...v, dates }
    })
    .filter(Boolean)
})
</script>

<template>
  <main class="page">
    <div class="top">
      <div>
        <h1 class="title">Venues & Workshops</h1>
        <p class="sub">Filter by seats available and book a date.</p>
      </div>

      <div class="controls">
        <input v-model="query" class="input" placeholder="Search venue / city / address..." />

        <label class="toggle">
          <input type="checkbox" v-model="onlyAvailable" @change="onToggleAvailable" />
          <span>Only show available</span>
        </label>
      </div>
    </div>

    <div v-if="loading" class="grid">
      <SkeletonVenueCard v-for="i in 6" :key="i" />
    </div>
    <p v-else-if="error" class="sub" style="color:#fecaca">{{ error }}</p>

    <div v-else class="grid">
      <VenueCard v-for="v in filteredVenues" :key="v.id" :venue="v" @book="onBook" />
    </div>

    <BookingModal
      ref="modalRef"
      :open="modalOpen"
      :booking="selectedBooking"
      :loading="bookingBusy"
      @close="closeModal"
      @submit="submitBooking"
    />
  </main>
</template>

<style scoped>
.page {
  width: 100%;
  padding: 24px;
}

.top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.title {
  margin: 0;
  font-size: 26px;
  font-weight: 900;
  letter-spacing: -0.3px;
}

.sub {
  margin: 8px 0 0;
  color: rgba(226, 232, 240, 0.65);
  max-width: 760px;
  line-height: 1.5;
}

.controls {
  display: grid;
  gap: 10px;
  min-width: 360px;
}

.input {
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid rgba(148, 163, 184, 0.18);
  background: rgba(2, 6, 23, 0.35);
  color: #e2e8f0;
  outline: none;
}

.input:focus {
  border-color: rgba(103, 232, 249, 0.5);
  box-shadow: 0 0 0 4px rgba(103, 232, 249, 0.08);
}

.toggle {
  display: flex;
  gap: 10px;
  align-items: center;
  font-weight: 800;
  color: rgba(226, 232, 240, 0.75);
  user-select: none;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 16px;
  align-items: start;
}

@media (max-width: 860px) {
  .top {
    flex-direction: column;
  }

  .controls {
    min-width: 100%;
    width: 100%;
  }

  .grid {
    grid-template-columns: 1fr;
  }
}

</style>

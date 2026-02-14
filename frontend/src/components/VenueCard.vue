<script setup>
const props = defineProps({
  venue: { type: Object, required: true }
})

const emit = defineEmits(['book'])

function badgeClass(d) {
  if (d.seatsAvailable <= 0) return 'badge sold'
  if (d.seatsAvailable <= 5) return 'badge low'
  return 'badge ok'
}
</script>

<template>
  <section class="card">
    <header class="head">
      <div>
        <h2 class="name">{{ venue.name }}</h2>
        <p class="meta">{{ venue.address }}</p>
      </div>
    </header>

    <div class="dates">
      <div v-for="d in venue.dates" :key="d.id" class="row">
        <div class="left">
          <div class="dt">
            <span class="date">{{ d.date }}</span>
            <span class="time">• {{ d.time }}</span>
          </div>
          <div class="seats">
            Seats: <strong>{{ d.seatsAvailable }}</strong> / {{ d.seatsTotal }}
          </div>
        </div>

        <div class="right">
          <span :class="badgeClass(d)">
            {{ d.seatsAvailable > 0 ? (d.seatsAvailable <= 5 ? 'Limited' : 'Available') : 'Sold out' }}
          </span>

          <button
            class="btn"
            :disabled="d.seatsAvailable <= 0"
            @click="emit('book', { venue, date: d })"
          >
            Book
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.card {
  border: 1px solid rgba(148, 163, 184, 0.14);
  border-radius: 16px;
  background: rgba(15, 23, 42, 0.65);
  padding: 16px;
}
.head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}
.name {
  margin: 0;
  font-size: 18px;
  font-weight: 900;
}
.meta {
  margin: 6px 0 0;
  color: rgba(226, 232, 240, 0.65);
  line-height: 1.4;
  font-size: 13px;
}
.dates {
  display: grid;
  gap: 10px;
}
.row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
  padding: 10px 12px;
  border: 1px solid rgba(148, 163, 184, 0.10);
  border-radius: 14px;
  background: rgba(2, 6, 23, 0.35);
}
.dt {
  font-weight: 800;
}
.date { margin-right: 6px; }
.time { color: rgba(226, 232, 240, 0.65); font-weight: 700; }
.seats {
  margin-top: 4px;
  color: rgba(226, 232, 240, 0.75);
  font-size: 13px;
}
.right {
  display: flex;
  align-items: center;
  gap: 10px;
}
.badge {
  font-size: 12px;
  font-weight: 900;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.16);
}
.badge.ok { background: rgba(34, 197, 94, 0.14); color: #dcfce7; border-color: rgba(34, 197, 94, 0.25); }
.badge.low { background: rgba(245, 158, 11, 0.14); color: #ffedd5; border-color: rgba(245, 158, 11, 0.25); }
.badge.sold { background: rgba(239, 68, 68, 0.14); color: #fee2e2; border-color: rgba(239, 68, 68, 0.25); }

.btn {
  padding: 8px 12px;
  border-radius: 12px;
  border: 1px solid rgba(56, 189, 248, 0.28);
  background: rgba(56, 189, 248, 0.14);
  color: #e0f2fe;
  font-weight: 900;
  cursor: pointer;
}
.btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
</style>

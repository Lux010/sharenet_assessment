<script setup>
import { computed, reactive } from 'vue'

const props = defineProps({
  open: { type: Boolean, default: false },
  booking: { type: Object, default: null } // { venue, date }
})

const emit = defineEmits(['close', 'submit'])

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: ''
})

const canSubmit = computed(() => {
  return (
    form.firstName.trim().length >= 2 &&
    form.lastName.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
    form.phone.trim().length >= 8
  )
})

function close() {
  emit('close')
}

function submit() {
  if (!canSubmit.value) return

  emit('submit', {
    user: { ...form },
    booking: props.booking
  })
}

function reset() {
  form.firstName = ''
  form.lastName = ''
  form.email = ''
  form.phone = ''
}

defineExpose({ reset })
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="open" class="overlay" @click.self="close">
        <div class="modal" role="dialog" aria-modal="true">
          <div class="head">
            <div>
              <h2>Confirm Booking</h2>
              <p v-if="booking" class="sub">
                {{ booking.venue.name }} • {{ booking.date.date }} • {{ booking.date.time }}
              </p>
            </div>
            <button class="x" @click="close" aria-label="Close">✕</button>
          </div>

          <div class="body">
            <label class="label">First Name</label>
            <input v-model="form.firstName" class="input" placeholder="e.g. Luxolo" />

            <label class="label">Surname</label>
            <input v-model="form.lastName" class="input" placeholder="e.g. Ndima" />

            <label class="label">Email</label>
            <input v-model="form.email" class="input" type="email" placeholder="you@email.com" />

            <label class="label">Phone</label>
            <input v-model="form.phone" class="input" type="tel" placeholder="+27 ..." />
          </div>

          <div class="foot">
            <button class="btn ghost" @click="close">Cancel</button>
            <button class="btn" :disabled="!canSubmit" @click="submit">Book</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(2, 6, 23, 0.68);
  backdrop-filter: blur(6px);
  z-index: 999999;
  display: grid;
  place-items: center;
  padding: 16px;
}
.modal {
  width: min(560px, 100%);
  border-radius: 16px;
  border: 1px solid rgba(148, 163, 184, 0.18);
  background: rgba(15, 23, 42, 0.95);
  box-shadow: 0 18px 50px rgba(0,0,0,0.45);
  overflow: hidden;
}
.head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 16px 10px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.12);
}
.head h2 { margin: 0; font-size: 18px; font-weight: 900; }
.sub { margin: 6px 0 0; color: rgba(226, 232, 240, 0.65); font-size: 13px; }
.x {
  border: none; background: transparent; color: rgba(226,232,240,0.75);
  cursor: pointer; padding: 6px 8px; border-radius: 10px;
}
.x:hover { background: rgba(148, 163, 184, 0.12); color: #e2e8f0; }
.body {
  padding: 14px 16px 6px;
  display: grid;
  gap: 10px;
}
.label { font-size: 12px; color: rgba(226,232,240,0.7); font-weight: 800; }
.input {
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid rgba(148, 163, 184, 0.18);
  background: rgba(2, 6, 23, 0.35);
  color: #e2e8f0;
  outline: none;
}
.input:focus {
  border-color: rgba(103, 232, 249, 0.55);
  box-shadow: 0 0 0 4px rgba(103, 232, 249, 0.08);
}
.foot {
  padding: 14px 16px 16px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
.btn {
  padding: 10px 14px;
  border-radius: 12px;
  border: 1px solid rgba(56, 189, 248, 0.28);
  background: rgba(56, 189, 248, 0.14);
  color: #e0f2fe;
  font-weight: 900;
  cursor: pointer;
}
.btn:disabled { opacity: 0.45; cursor: not-allowed; }
.btn.ghost {
  border-color: rgba(148, 163, 184, 0.22);
  background: rgba(148, 163, 184, 0.10);
  color: rgba(226, 232, 240, 0.9);
}
.fade-enter-active, .fade-leave-active { transition: opacity 0.18s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>

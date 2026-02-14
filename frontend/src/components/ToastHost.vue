<script setup>
import { onBeforeUnmount } from 'vue'
import { useToast } from '../composables/useToast'

const props = defineProps({
  position: { type: String, default: 'bottom-right' }, // bottom-right | bottom-center | top-right | top-center
  max: { type: Number, default: 4 } // max visible at once
})

const { toasts, remove } = useToast()

// Track timers per toast id
const timers = new Map()

function startTimer(toast) {
  // duration <= 0 means "sticky" (no auto-dismiss)
  if (!toast.duration || toast.duration <= 0) return
  if (timers.has(toast.id)) return

  const t = setTimeout(() => {
    remove(toast.id)
    timers.delete(toast.id)
  }, toast.duration)

  timers.set(toast.id, t)
}

function close(id) {
  if (timers.has(id)) {
    clearTimeout(timers.get(id))
    timers.delete(id)
  }
  remove(id)
}

onBeforeUnmount(() => {
  for (const t of timers.values()) clearTimeout(t)
  timers.clear()
})

function posClass() {
  switch (props.position) {
    case 'top-right':
      return 'pos top right'
    case 'top-center':
      return 'pos top center'
    case 'bottom-center':
      return 'pos bottom center'
    default:
      return 'pos bottom right'
  }
}
</script>

<template>
  <Teleport to="body">
    <div :class="posClass()">
      <TransitionGroup name="toast" tag="div" class="stack">
        <div
          v-for="t in toasts.slice(-props.max)"
          :key="t.id"
          class="toast"
          :class="t.type"
          @vue:mounted="startTimer(t)"
        >
          <span class="dot" aria-hidden="true"></span>
          <div class="msg">{{ t.message }}</div>
          <button class="x" @click="close(t.id)" aria-label="Close">✕</button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.pos {
  position: fixed;
  z-index: 999999;
  padding: 16px;
  pointer-events: none;
}
.pos.top { top: 0; }
.pos.bottom { bottom: 0; }
.pos.right { right: 0; }
.pos.center { left: 50%; transform: translateX(-50%); }

.stack {
  display: grid;
  gap: 10px;
  pointer-events: none;
}

.toast {
  pointer-events: auto;
  display: grid;
  grid-template-columns: 10px 1fr auto;
  gap: 12px;
  align-items: center;
  min-width: 320px;
  max-width: 520px;
  padding: 12px 12px 12px 14px;
  border-radius: 14px;
  border: 1px solid rgba(148, 163, 184, 0.18);
  background: rgba(2, 6, 23, 0.92);
  backdrop-filter: blur(10px);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.35);
  color: #e2e8f0;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: rgba(148, 163, 184, 0.9);
  box-shadow: 0 0 0 6px rgba(148, 163, 184, 0.15);
}
.toast.success .dot { background: rgba(34, 197, 94, 0.95); box-shadow: 0 0 0 6px rgba(34, 197, 94, 0.15); }
.toast.error .dot { background: rgba(239, 68, 68, 0.95); box-shadow: 0 0 0 6px rgba(239, 68, 68, 0.15); }
.toast.warning .dot { background: rgba(245, 158, 11, 0.95); box-shadow: 0 0 0 6px rgba(245, 158, 11, 0.15); }
.toast.info .dot { background: rgba(56, 189, 248, 0.95); box-shadow: 0 0 0 6px rgba(56, 189, 248, 0.15); }

.msg {
  font-size: 14px;
  line-height: 1.35;
}

.x {
  border: none;
  background: transparent;
  color: rgba(226, 232, 240, 0.7);
  cursor: pointer;
  font-size: 14px;
  padding: 6px 8px;
  border-radius: 10px;
}
.x:hover {
  background: rgba(148, 163, 184, 0.12);
  color: #e2e8f0;
}

/* Animations */
.toast-enter-active, .toast-leave-active {
  transition: all 0.18s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@media (max-width: 520px) {
  .toast {
    min-width: auto;
    width: calc(100vw - 32px);
  }
}
</style>

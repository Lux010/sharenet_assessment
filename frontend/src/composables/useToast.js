import { reactive } from 'vue'

let _id = 0

const state = reactive({
  toasts: [] // { id, message, type, duration }
})

function push(message, type = 'info', duration = 3200) {
  const id = ++_id
  state.toasts.push({ id, message, type, duration })
  return id
}

function remove(id) {
  const idx = state.toasts.findIndex(t => t.id === id)
  if (idx !== -1) state.toasts.splice(idx, 1)
}

export function useToast() {
  return {
    // state
    toasts: state.toasts,

    // core actions
    push,
    remove,

    // convenience helpers
    success: (msg, duration) => push(msg, 'success', duration ?? 3200),
    error: (msg, duration) => push(msg, 'error', duration ?? 4200),
    warning: (msg, duration) => push(msg, 'warning', duration ?? 3600),
    info: (msg, duration) => push(msg, 'info', duration ?? 3200)
  }
}

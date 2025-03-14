import { ref } from 'vue'

type EventHandler = (...args: any[]) => void

type EventBus = {
  on: (event: string, handler: EventHandler) => void
  off: (event: string, handler?: EventHandler) => void
  emit: (event: string, ...args: any[]) => void
}

const events = ref(new Map<string, EventHandler[]>())

export const useEventBus = (): EventBus => {
  const on = (event: string, handler: EventHandler): void => {
    if (!events.value.has(event)) {
      events.value.set(event, [])
    }
    events.value.get(event)?.push(handler)
  }

  const off = (event: string, handler?: EventHandler): void => {
    if (!events.value.has(event)) return

    if (!handler) {
      events.value.delete(event)
      return
    }

    const handlers = events.value.get(event)
    if (handlers) {
      events.value.set(
        event,
        handlers.filter((h) => h !== handler)
      )
    }
  }

  const emit = (event: string, ...args: any[]): void => {
    events.value.get(event)?.forEach((handler) => handler(...args))
  }

  return { on, off, emit }
}

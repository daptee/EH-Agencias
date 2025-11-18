// ~/composables/useToast.ts
import { useNuxtApp } from '#app'
import type { ToastOptions } from 'vue3-toastify'

export const useToast = () => {
  const nuxtApp = useNuxtApp()

  const defaultOptions: ToastOptions = {
    position: 'bottom-right',
    autoClose: 3000,
    theme: 'light',
    toastStyle: {
      margin: '1rem',
      fontSize: '0.9rem',
      fontWeight: 500,
      color: '#111',
    },
  }

  const showToast = (
    message: string,
    type: 'success' | 'error' | 'info' | 'warning' = 'info',
    options: ToastOptions = {},
  ) => {
    nuxtApp.$toast(message, { type, ...defaultOptions, ...options })
  }

  return { showToast }
}

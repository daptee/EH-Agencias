import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const isNavOpen = ref<boolean>(true)
  const isNavMini = ref<boolean>(true)
  const isAppLoading = ref<boolean>(false)

  const handleNav = () => {
    isNavOpen.value = !isNavOpen.value
  }

  const handleNavMini = () => {
    isNavMini.value = !isNavMini.value
  }

  const handleAppLoading = () => {
    isAppLoading.value = !isAppLoading.value
  }

  return { isNavOpen, handleNav, isNavMini, handleNavMini, isAppLoading, handleAppLoading }
})

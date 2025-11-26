import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const isNavOpen = ref<boolean>(true)
  const isNavMini = ref<boolean>(false)
  const isAppLoading = ref<boolean>(false)
  const searchData = ref<string>('')

  const handleNav = () => {
    isNavOpen.value = !isNavOpen.value
  }

  const handleNavMini = () => {
    isNavMini.value = !isNavMini.value
  }

  const handleAppLoading = (value: boolean) => {
    isAppLoading.value = value
  }

  return {
    isNavOpen,
    handleNav,
    isNavMini,
    handleNavMini,
    isAppLoading,
    handleAppLoading,
    searchData,
  }
})

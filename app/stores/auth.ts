// stores/auth.ts
import { defineStore } from 'pinia'
import { login, logout } from '~/services/auth/auth.service'
import { jwtDecode, type JwtPayload } from 'jwt-decode'
import type { UserData } from '~/types/Auth'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const user = ref<UserData | null>(null)

  const isAuthenticated = computed(() => {
    if (!token.value) return false
    return !isTokenExpired(token.value)
  })

  const setLogin = async (params: { email: string; password: string }) => {
    try {
      const response = await login(params)

      if (!response.access_token) throw new Error(response.message)

      token.value = response.access_token
      setStoreLoggedUser(response.data.user, token.value)

      return response
    } catch (err) {
      throw err
    }
  }

  const setLogout = async () => {
    try {
      const response = await logout()
      return response
    } catch (err) {
      throw err
    } finally {
      clearAuth()
    }
  }

  const clearAuth = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('auth_token_eh_ag')
    localStorage.removeItem('auth_user_eh_ag')
  }

  const loadFromStorage = (): { valid: boolean; expired: boolean } => {
    const storedToken = localStorage.getItem('auth_token_eh_ag')
    const storedUser = localStorage.getItem('auth_user_eh_ag')

    if (!storedToken) {
      clearAuth()
      return { valid: false, expired: false }
    }

    if (isTokenExpired(storedToken)) {
      clearAuth()
      return { valid: false, expired: true }
    }

    token.value = storedToken
    if (storedUser) user.value = JSON.parse(storedUser)
    return { valid: true, expired: false }
  }

  const setStoreLoggedUser = (userData: UserData, token: string) => {
    user.value = userData

    localStorage.setItem('auth_token_eh_ag', token)
    localStorage.setItem('auth_user_eh_ag', JSON.stringify(user.value))
  }

  const isTokenExpired = (token: string): boolean => {
    try {
      const decoded = jwtDecode<JwtPayload & { exp?: number }>(token)
      if (!decoded.exp) return true
      const now = Math.floor(Date.now() / 1000)
      return decoded.exp < now
    } catch (err) {
      return true
    }
  }

  return {
    token,
    user,
    isAuthenticated,
    setLogin,
    setLogout,
    clearAuth,
    loadFromStorage,
    setStoreLoggedUser,
  }
})

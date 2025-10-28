// stores/auth.ts
import { defineStore } from 'pinia'
import { login } from '~/services/auth/auth.service'
import { jwtDecode, type JwtPayload } from 'jwt-decode'

interface User {
  created_at: string | null
  email: string
  id: number
  last_name: string | null
  name: string | null
  phone: string | null
  profile_picture: string | null
  updated_at: string | null
  user_type_id: number
  user_type: UserType
}

interface UserType {
    id: number
    name: string
    deleted_at: string | null
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const user = ref<User | null>(null)

  const isAuthenticated = computed(() => {
    if (!token.value) return false
    return !isTokenExpired(token.value)
  })

  const setLogin = async (params: { email: string; password: string }) => {
    try {
      const response = await login(params)

      if (!response.token) throw new Error(response.message)

      token.value = response.token

      setStoreLoggedUser(token.value)

      return response
    } catch (err) {
      throw err
    }
  }

  const clearAuth = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
  }

  const loadFromStorage = (): { valid: boolean; expired: boolean } => {
    const storedToken = localStorage.getItem('auth_token')
    const storedUser = localStorage.getItem('auth_user')

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

  const setStoreLoggedUser = (token: string) => {
    const decoded = jwtDecode<User>(token)
    user.value = decoded

    localStorage.setItem('auth_token', token)
    localStorage.setItem('auth_user', JSON.stringify(user.value))
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
    clearAuth,
    loadFromStorage,
    setStoreLoggedUser,
  }
})

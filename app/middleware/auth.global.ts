import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()

  if (!auth.user && localStorage.getItem('auth_user')) {
    auth.user = JSON.parse(localStorage.getItem('auth_user')!)
    auth.token = localStorage.getItem('auth_token') || null
  }

  const protectedRoutes = ['/mis-reservas', '/reservas']
  if (protectedRoutes.includes(to.path) && !auth.token) {
    return navigateTo('/login')
  }

  const guestRoutes = ['/login', '/register']
  if (guestRoutes.includes(to.path) && auth.token) {
    return navigateTo('/')
  }
})

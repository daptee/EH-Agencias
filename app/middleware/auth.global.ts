import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()

  if (!auth.isAuthenticated && localStorage.getItem('auth_user_eh_ag')) {
    auth.loadFromStorage()
  }

  const protectedRoutes = ['/mis-reservas', '/reservas']
  if (protectedRoutes.includes(to.path) && !auth.token) {
    return navigateTo('/login')
  }

  const guestRoutes = ['/login', '/register']
  if (guestRoutes.includes(to.path) && auth.token) {
    return navigateTo('/')
  }

  if (to.path === '/' && !auth.isAuthenticated) {
    return navigateTo('/mis-reservas')
  }

  if (to.path === '/' && auth.isAuthenticated) {
    return navigateTo('/mis-reservas')
  }
})

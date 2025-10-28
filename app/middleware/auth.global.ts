import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()

  if (!auth.user && localStorage.getItem('auth_user')) {
    auth.user = JSON.parse(localStorage.getItem('auth_user')!)
    auth.token = localStorage.getItem('auth_token') || null
  }

  const protectedRoutes = ['/mi-cuenta', '/pedidos', '/perfil']
  if (protectedRoutes.includes(to.path) && !auth.token) {
    return navigateTo('/iniciar-sesion')
  }

  const guestRoutes = ['/iniciar-sesion', '/registro']
  if (guestRoutes.includes(to.path) && auth.token) {
    return navigateTo('/')
  }
})

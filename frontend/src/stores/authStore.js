import { defineStore } from 'pinia'

// Se define un store llamado 'auth' (identificador único en Pinia)
export const useAuthStore = defineStore('auth', {

  // 🔹 STATE: estado global reactivo
  state: () => ({
    // Token JWT:
    // Se intenta recuperar desde localStorage al iniciar la app
    // Si no existe, queda en null
    token: localStorage.getItem('token') || null,

    // Información del usuario autenticado
    user: null
  }),

  // 🔹 GETTERS: propiedades derivadas (como computed)
  getters: {
    // Retorna true si existe token, false si no
    isAuthenticated: (state) => !!state.token
  },

  // 🔹 ACTIONS: métodos que modifican el estado
  actions: {

    // Guarda el token en el estado y en localStorage
    setToken(token) {
      this.token = token                    // actualiza estado reactivo
      localStorage.setItem('token', token)  // persiste sesión en navegador
    },

    // Guarda la información del usuario
    setUser(user) {
      this.user = user
    },

    // Cierra sesión
    logout() {
      // Limpia el estado
      this.token = null
      this.user = null

      // Elimina el token del almacenamiento
      localStorage.removeItem('token')
    }
  }
})

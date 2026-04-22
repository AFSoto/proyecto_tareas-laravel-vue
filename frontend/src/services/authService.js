import api from '../api/axios'
// Importa la instancia de axios configurada (baseURL + interceptores)

import { useAuthStore } from '../stores/authStore'
// Importa el store de Pinia (se usa como función para obtener la instancia)


// Servicio de autenticación: centraliza toda la lógica de auth
const authService = {

  // 🔹 Registro de usuario
  async register(data) {
    // Envía los datos al endpoint de registro
    const response = await api.post('/auth/register', data)

    // Retorna solo la data de la respuesta
    return response.data
  },

  // 🔹 Login
  async login(data) {
    // Hace request al backend con credenciales
    const response = await api.post('/auth/login', data)

    // Obtiene la instancia del store de Pinia
    const authStore = useAuthStore()

    // Guarda el token en el store (y en localStorage internamente)
    authStore.setToken(response.data.token)

    // Retorna la respuesta (token, user, etc.)
    return response.data
  },

  // 🔹 Obtener usuario autenticado
  async me() {
    // Llama al endpoint protegido /auth/me
    // El interceptor agrega automáticamente el Bearer token
    const response = await api.get('/auth/me')

    // Obtiene el store
    const authStore = useAuthStore()

    // Guarda los datos del usuario en el estado global
    authStore.setUser(response.data)

    // Retorna los datos del usuario
    return response.data
  },

  // 🔹 Logout
  async logout() {
    // Llama al backend para cerrar sesión
    await api.post('/auth/logout')

    // Obtiene el store
    const authStore = useAuthStore()

    // Limpia el estado (token + user + localStorage)
    authStore.logout()
  }
}

// Exporta el servicio para usarlo en componentes
export default authService

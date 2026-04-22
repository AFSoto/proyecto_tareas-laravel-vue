import axios from 'axios'

// Se crea una instancia personalizada de axios
const api = axios.create({
  // URL base para todas las peticiones HTTP
  baseURL: 'http://localhost:8000/api',

  // Headers por defecto que se enviarán en cada request
  headers: {
    'Content-Type': 'application/json', // Indica que se envía JSON
    'Accept': 'application/json'        // Indica que se espera JSON como respuesta
  }
})

// Interceptor de request: se ejecuta ANTES de cada petición
api.interceptors.request.use((config) => {
  // Obtiene el token guardado en el navegador (localStorage)
  const token = localStorage.getItem('token')

  // Si existe el token, lo agrega al header Authorization
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  // Retorna la configuración modificada para que continúe la petición
  return config
})

// Interceptor de response: se ejecuta cuando hay una respuesta (o error)
api.interceptors.response.use(
  (response) => response, // Si todo sale bien, simplemente retorna la respuesta

  (error) => {
    // Si el error es 401 (no autorizado)
    if (error.response?.status === 401) {
      // Elimina el token del almacenamiento
      localStorage.removeItem('token')

      // Redirige al usuario a la página de login
      window.location.href = '/login'
    }

    // Rechaza el error para que pueda ser manejado en otro lugar
    return Promise.reject(error)
  }
)

// Exporta la instancia para usarla en toda la app
export default api

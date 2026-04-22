import { createRouter, createWebHistory } from 'vue-router'
// Importa las funciones necesarias para crear el router

import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
// Importa las vistas públicas (login y registro)

import { useAuthStore } from '../stores/authStore'
// Importa el store de autenticación (Pinia)


// 🔹 Definición de rutas de la aplicación
const routes = [

  // Ruta de login (pública)
  { path: '/login', component: LoginView },

  // Ruta de registro (pública)
  { path: '/register', component: RegisterView },

  // Ruta protegida (requiere autenticación)
  {
    path: '/dashboard',

    // Lazy loading: carga el componente solo cuando se visita la ruta
    component: () => import('../views/DashboardView.vue'),

    // Meta información personalizada
    // Se usa para indicar que esta ruta requiere estar autenticado
    meta: { requiresAuth: true }
  },

  // Ruta comodín: cualquier ruta no definida redirige a login
  { path: '/:pathMatch(.*)*', redirect: '/login' }
]


// 🔹 Creación del router
const router = createRouter({
  history: createWebHistory(), // Usa history mode (URLs limpias sin #)
  routes
})


// 🔹 Navigation Guard (protección de rutas)
router.beforeEach((to, from, next) => {

  // Obtiene el store de autenticación
  const authStore = useAuthStore()

  // Si la ruta requiere autenticación y el usuario NO está autenticado
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {

    // Redirige al login
    next('/login')

  } else {

    // Permite continuar la navegación
    next()
  }
})


// Exporta el router para usarlo en main.js
export default router

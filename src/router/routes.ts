import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('pages/Auth/Login.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    redirect: '/inicio',
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '/inicio',
        component: () => import('pages/Inicio/Index.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/agenda',
        name: 'Agenda',
        component: () => import('pages/Agenda/Index.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/pacientes',
        name: 'Pacientes',
        component: () => import('pages/Pacientes/Index.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/pacientes/nuevo-paciente',
        name: 'NuevoPaciente',
        component: () => import('pages/Pacientes/Nuevo.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/pacientes/perfil/:id',
        name: 'PerfilPaciente',
        props: true,
        component: () => import('pages/Pacientes/Perfil.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/pacientes/perfil/editar/:id',
        name: 'PerfilEditarPaciente',
        props: true,
        component: () => import('pages/Pacientes/NewEditar.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/ajustes',
        name: 'Ajustes',
        component: () => import('pages/Ajustes/Index.vue'),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: '/users',
        name: 'Users',
        component: () => import('pages/Ajustes/Users.vue'),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;

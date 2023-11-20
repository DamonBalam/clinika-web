import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    redirect: '/inicio',
    children: [
      {
        path: '/inicio',
        component: () => import('pages/Inicio/Index.vue')
      },
      {
        path: '/agenda',
        name: 'Agenda',
        component: () => import('pages/Agenda/Index.vue')
      },
      {
        path: '/pacientes',
        name: 'Pacientes',
        component: () => import('pages/Pacientes/Index.vue')
      },
      {
        path: '/pacientes/nuevo-paciente',
        name: 'NuevoPaciente',
        component: () => import('pages/Pacientes/Nuevo.vue')
      },
      {
        path: '/pacientes/perfil/:id',
        name: 'PerfilPaciente',
        props: true,
        component: () => import('pages/Pacientes/Perfil.vue')
      },
      {
        path: '/ajustes',
        name: 'Ajustes',
        component: () => import('pages/Ajustes/Index.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
];

export default routes;

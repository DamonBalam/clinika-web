<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list>
        <q-item-label header class="row justify-center q-mt-md">
          <q-img src="../assets/logo.png" width="240px" />
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
        <!-- <q-separator spaced /> -->
      </q-list>
      <div class="row justify-center">
        <q-btn
          style="position: absolute; top: 90%"
          flat
          icon="o_power_settings_new"
          label="Cerrar Sesión"
          class="text-bold"
          @click="handleSubmit"
        />
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import EssentialLink, {
  EssentialLinkProps,
} from 'components/EssentialLink.vue';
import { useAuthStore } from 'stores/auth';
import { onMounted, ref } from 'vue';

const store = useAuthStore();
const { logout } = store;
const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'Página Principal',
    icon: 'o_home',
    link: '/inicio',
  },
  {
    title: 'Agenda',
    icon: 'o_calendar_today',
    link: '/agenda',
  },
  {
    title: 'Pacientes',
    icon: 'o_people',
    link: '/pacientes',
  },
  {
    title: 'Ajustes',
    icon: 'o_settings',
    link: '/ajustes',
  },
];

const leftDrawerOpen = ref(true);

onMounted(() => {
  leftDrawerOpen.value = true;
  // await getItems()
});
function handleSubmit() {
  logout();
}
</script>

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
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import EssentialLink, {
  EssentialLinkProps,
} from 'components/EssentialLink.vue';
const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'Inicio',
    icon: 'o_home',
    link: '/inicio',
  },
  {
    title: 'Pacientes',
    icon: 'o_people',
    link: '/pacientes',
  },
  {
    title: 'Agenda',
    icon: 'o_calendar_today',
    link: '/agenda',
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
});
</script>

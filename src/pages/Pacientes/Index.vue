<template>
  <q-page class="fondo-gris q-py-md q-px-xl">
    <Notification />
    <TablePacientes />
  </q-page>
</template>

<script setup lang="ts">
import TablePacientes from 'src/components/TablePacientes.vue';
import Notification from '../../components/Notification.vue';
</script>
<style scoped lang="scss">
.fondo-gris {
  background-color: #f1f5f9;
}
</style>

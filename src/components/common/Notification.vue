<template>
  <div class="row justify-end">
    <btn-user-menu />
    <q-btn class="q-ml-md" flat round color="black" icon="notifications">
      <q-menu>
        <q-list style="min-width: 100px">
          <q-item clickable v-close-popup>
            <q-item-section>No hay notificaciones</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </div>
</template>

<script setup lang="ts">
import BtnUserMenu from 'components/common/BtnUserMenu.vue';
</script>

<style lang="scss" scoped></style>

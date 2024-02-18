<template>
  <div>
    <h2 class="title">Tu resumen mensual</h2>
    <q-card flat style="min-height: 300px; max-width: 100%">
      <div class="col-12 q-pa-md">
        <span class="card-title">Este mes ( {{ fechaLabel }} )</span>
        <span class="card-subtitle"
          >Mira las principales estadísticas del mes</span
        >
      </div>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const fechaLabel = ref('1 al 30 de septiembre');
</script>

<style scoped>
.title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 10px;
  line-height: 29.05px;
}

.card-title {
  display: block;
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 2px;
  line-height: 25px;
}

.card-subtitle {
  font-size: 14px;
  font-weight: 300;
  line-height: 19px;
}
</style>

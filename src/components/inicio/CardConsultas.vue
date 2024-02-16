<template>
  <div>
    <h2 class="title">Tus consultas para hoy</h2>
    <q-card flat style="min-height: 100%; max-width: 100%">
      <div class="row q-pa-md">
        <div class="col-3 header">Nombre completo</div>
        <div class="col-3 header">Tipo de Consulta</div>
        <div class="col-2 header">Tipo</div>
        <div class="col-2 header">Hora</div>
      </div>
      <div class="row q-px-md q-py-sm" v-for="consulta in lista_consultas">
        <div class="col-3">{{ consulta.nombre }}</div>
        <div class="col-3">{{ consulta.tipo_consulta }}</div>
        <div class="col-2">{{ consulta.tipo }}</div>
        <div class="col-2">{{ consulta.hora }}</div>
        <div class="col-2">
          <q-btn
            color="primary"
            label="Ver paciente"
            size="sm"
            flat
            dense
            class="q-mr-md"
            @click="verConsulta(consulta.id)"
          />
        </div>
      </div>
      <div class="row q-pa-lg">
        <div class="col-12">
          <q-btn
            color="primary"
            label="Ver todas las consultas"
            size="md"
            outline
            class="full-width"
            @click="verTodasConsultas"
          />
        </div>
      </div>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const lista_consultas = ref([
  {
    id: 1,
    nombre: 'Juan Pérez',
    hora: '10:00 am',
    tipo: 'Presencial',
    estado: 'Pendiente',
    tipo_consulta: 'Inicial',
  },
  {
    id: 2,
    nombre: 'María González',
    hora: '11:00 am',
    tipo: 'Virtual',
    estado: 'Pendiente',
    tipo_consulta: 'Seguimiento',
  },
  {
    id: 3,
    nombre: 'Pedro Sánchez',
    hora: '12:00 pm',
    tipo: 'Presencial',
    estado: 'Pendiente',
    tipo_consulta: 'Inicial',
  },
  {
    id: 4,
    nombre: 'Jose Hernández',
    hora: '13:00 pm',
    tipo: 'Virtual',
    estado: 'Pendiente',
    tipo_consulta: 'Seguimiento',
  },
]);
</script>

<style scoped>
.title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 10px;
  line-height: 29.05px;
}

.header {
  font-size: 16px;
  font-weight: 600;
  line-height: 19px;
}
</style>

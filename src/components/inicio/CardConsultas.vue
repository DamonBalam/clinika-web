<template>
  <div>
    <h2 class="title">Tus consultas para hoy</h2>
    <q-card flat style="min-height: 320px; max-width: 100%">
      <template v-if="hasConsultas">
        <div class="row q-pa-md">
          <div class="col-3 header">Nombre completo</div>
          <div class="col-3 header">Tipo de Consulta</div>
          <div class="col-2 header">Tipo</div>
          <div class="col-2 header">Hora</div>
        </div>
        <div
          class="row q-px-md q-py-sm"
          v-for="consulta in consultasMapped"
          style="min-height: 60px; align-items: center"
        >
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
              style="font-size: 14px"
              @click="verConsulta(consulta.client)"
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
      </template>
      <template v-else>
        <div class="row q-pa-lg">
          <div class="col-12">
            <q-card flat class="text-center text-uppercase">
              <div class="text-h6">No tienes consultas para hoy</div>
            </q-card>
          </div>
        </div>
      </template>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { citaAgendaDataServices } from 'src/services/CitaAgendaDataService';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { date } from 'quasar';
import { pacienteDataServices } from 'src/services/PacienteDataService';

const router = useRouter();

const lista_citas = ref([]);
const lista_clientes = ref([]);

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

const hasConsultas = computed(() => {
  return consultasMapped.value.length > 0;
});

const consultasMapped = computed(() => {
  return lista_citas.value.map((consulta: any) => {
    const cliente = lista_clientes.value.find(
      (cliente: any) => cliente.id === consulta.client_id
    );

    return {
      id: consulta.id,
      nombre: cliente.nombre_completo,
      client: cliente.id,
      hora: consulta.start_time,
      tipo: 'presencial',
      tipo_consulta: 'Inicial',
    };
  });
});

const verConsulta = (id: number) => {
  console.log('Ver consulta', id);

  router.push(`/pacientes/perfil/${id}`);
};

const verTodasConsultas = () => {
  console.log('Ver todas las consultas');

  router.push('/agenda');
};

onMounted(async () => {
  await getItems();

  await getClients();
});

const getItems = async () => {
  const today = new Date();

  const fecha = date.formatDate(today, 'YYYY-MM-DD');

  const data = await citaAgendaDataServices.getAllByDate(fecha);

  lista_citas.value = data.data;
};

const getClients = async () => {
  const data = await pacienteDataServices.getAll();

  lista_clientes.value = data.data;
};
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

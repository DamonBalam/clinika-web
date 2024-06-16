<template>
  <q-page>
    <div class="q-mt-sm q-pt-sm">
      <div class="row justify-between items-center">
        <p class="text-black text-bold text-h5">Agenda</p>

        <div class="row">
          <q-btn
            @click="prompt = true"
            label="Nueva cita"
            color="primary"
            :icon="'add'"
            class="text-capitalize"
          />
        </div>
      </div>
    </div>

    <AgendaCalendar
      :events="events"
      :is-loading="loading"
      @event-edit="openModalEdit"
      @event-delete="openModalEliminacion"
    />

    <FormularioNuevaCita
      :prompt="prompt"
      :event="eventSelected"
      :clients="clients"
      :id-new-client="idNewClient"
      @close="closeModal"
      @new-patient="openModalClient"
      @submit="submit"
    />

    <FormularioRegistroRapido
      :prompt="promptRegistroRapido"
      @close="closeModalClient"
      @submit="submitRegistroRapido"
    />

    <ModalEliminacion
      :prompt="promptEliminacion"
      :id="idEventEliminate"
      @close="promptEliminacion = false"
    />
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import AgendaCalendar from 'src/components/agenda/AgendaCalendar.vue';
import FormularioNuevaCita from 'src/components/agenda/FormularioNuevaCita.vue';
import FormularioRegistroRapido from 'src/components/agenda/FormularioRegistroRapido.vue';
import ModalEliminacion from 'src/components/agenda/ModalEliminacion.vue';
import { pacienteDataServices } from 'src/services/PacienteDataService';
import { IPaciente } from 'src/Interfaces/Paciente';

interface ICliente {
  id?: number | null;
  nombre?: string;
  apellido?: string;
  nombre_completo?: string;
  img?: string;
}

const loading = ref(false);
const prompt = ref(false);
const promptEliminacion = ref(false);
const promptRegistroRapido = ref(false);
const idNewClient = ref<Number | null>(null);
const idEventEliminate = ref(null);
const eventNewClient = [
  {
    id: 0,
    nombre_completo: 'Nuevo cliente',
  },
];

const clients = computed(() => {
  return [...eventNewClient, ...items.value];
});

const items = ref<ICliente[]>([]);

const events = ref([
  {
    title: 'Arturo Saldivar',
    with: 'Nutriologa Diana',
    topic: 'Confirmada',
    time: { start: '2024-01-12 08:00', end: '2024-01-12 09:00' },
    isEditable: true,
    lugar: 'Consultorio 1',
    colorScheme: 'confirmada',
    id: '753944708f0f',
    description: 'Descripcion prueba',
  },
  {
    title: 'Pedro Lopez',
    with: 'Nutriologa Diana',
    topic: 'No confirmada',
    time: { start: '2024-01-12 10:00', end: '2024-01-12 11:00' },
    isEditable: true,
    lugar: 'Consultorio 1',
    colorScheme: 'noConfirmada',
    id: '763944708f0f',
    description: 'Descripcion prueba',
  },
  {
    title: 'Jose Hernandez',
    with: 'Nutriologa Diana',
    topic: 'Cancelada',
    time: { start: '2024-01-12 12:00', end: '2024-01-12 13:00' },
    isEditable: true,
    lugar: 'Consultorio 1',
    colorScheme: 'cancelada',
    id: '773944708f0f',
    description: 'Descripcion prueba',
  },
]);

let eventSelected = reactive({
  id: null,
  cliente: null,
});

const submit = async (form: any) => {
  loading.value = true;
  const fechaStartFormateada = form.fecha.replace(/\//g, '-');
  const event = {
    title: form.cliente?.nombre_completo || form.cliente,
    with: 'Nutriologa Diana',
    topic: form.estado,
    time: {
      start: `${fechaStartFormateada} ${form.horaStart}`,
      end: `${fechaStartFormateada} ${form.horaEnd}`,
    },
    colorScheme:
      form.estado.toLowerCase() === 'confirmada'
        ? 'confirmada'
        : form.estado.toLowerCase() === 'no confirmada'
        ? 'noConfirmada'
        : 'cancelada',
    id: `${events.value.length + 1}`,
    description: form.notas,
    lugar: form.lugar,
    isEditable: true,
  };

  if (form.id === null) {
    events.value.push(event);
    closeModal();
  } else {
    const index = events.value.findIndex((item) => item.id === form.id);
    events.value[index] = event;
    closeModal();
  }

  setTimeout(() => {
    loading.value = false;
  }, 3000);
};

const closeModal = () => {
  prompt.value = false;
};

const openModalEdit = (id) => {
  eventSelected = events.value.find((item) => item.id === id);

  prompt.value = true;
};

const openModalEliminacion = (id) => {
  console.log('openModalEliminacion', id);

  idEventEliminate.value = id;
  promptEliminacion.value = true;
};

const openModalClient = () => {
  prompt.value = false;
  promptRegistroRapido.value = true;
  // TODO: Abrir modal de registo de cliente rapido
  console.log('openModalClient');
};

const closeModalClient = () => {
  promptRegistroRapido.value = false;
};

const submitRegistroRapido = async (form: IPaciente) => {
  console.log('submitRegistroRapido', form);
  await getItems();
  idNewClient.value = form.id as number;
  promptRegistroRapido.value = false;
  prompt.value = true;
};

onMounted(async () => {
  await getItems();
});

const getItems = async () => {
  loading.value = true;
  try {
    const data = await pacienteDataServices.getAll();

    if (data.code === 200) {
      items.value = data.data.map((item) => {
        return {
          id: item.id,
          nombre: item.nombre,
          apellido: item.apellido_paterno,
          nombre_completo: item.nombre_completo,
        };
      });
    }
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
};
</script>
<style scoped lang="scss">
.fondo-gris {
  background-color: #f1f5f9;
}
</style>

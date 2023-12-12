<template>
  <q-page class="fondo-gris q-py-md q-px-xl">
    <Notification />
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
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import AgendaCalendar from 'src/components/agenda/AgendaCalendar.vue';
import FormularioNuevaCita from 'src/components/agenda/FormularioNuevaCita.vue';
import FormularioRegistroRapido from 'src/components/agenda/FormularioRegistroRapido.vue';
import Notification from '../../components/Notification.vue';

const loading = ref(false);
const prompt = ref(false);
const promptRegistroRapido = ref(false);
const idNewClient = ref(null);

const clients = [
  {
    id: 0,
    nombre_completo: 'Nuevo cliente',
    // img: 'https://cdn.quasar.dev/img/avatar.png',
  },
  {
    id: 1,
    nombre: 'Juan',
    apellido: 'Perez',
    nombre_completo: 'Juan Perez',
    img: 'https://cdn.quasar.dev/img/avatar.png',
  },
  {
    id: 2,
    nombre: 'Pedro',
    apellido: 'Perez',
    nombre_completo: 'Pedro Perez',
    img: 'https://cdn.quasar.dev/img/avatar.png',
  },
  {
    id: 2,
    nombre: 'Luis',
    apellido: 'Perez',
    nombre_completo: 'Luis Perez',
    img: 'https://cdn.quasar.dev/img/avatar.png',
  },
];

const events = ref([
  {
    title: 'Arturo Saldivar',
    with: 'Nutriologa Diana',
    topic: 'Confirmada',
    time: { start: '2023-11-30 08:00', end: '2023-11-30 09:00' },
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
    time: { start: '2023-11-30 10:00', end: '2023-11-30 11:00' },
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
    time: { start: '2023-11-30 12:00', end: '2023-11-30 13:00' },
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

const openModalClient = () => {
  prompt.value = false;
  promptRegistroRapido.value = true;
  // TODO: Abrir modal de registo de cliente rapido
  console.log('openModalClient');
};

const closeModalClient = () => {
  promptRegistroRapido.value = false;
};

const submitRegistroRapido = (form: any) => {
  console.log('submitRegistroRapido', form);
  idNewClient.value = clients.length + 1;

  clients.push({
    id: clients.length + 1,
    nombre: form.nombre,
    apellido: form.apellido_paterno,
    nombre_completo: `${form.nombre} ${form.apellido_paterno}`,
    img: 'https://cdn.quasar.dev/img/avatar.png',
  });

  promptRegistroRapido.value = false;
  prompt.value = true;
};
</script>
<style scoped lang="scss">
.fondo-gris {
  background-color: #f1f5f9;
}
</style>

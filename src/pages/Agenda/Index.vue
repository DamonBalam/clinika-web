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
      @close="closeModal"
      @new-patient="openModalClient"
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
import Notification from '../../components/Notification.vue';
import AgendaCalendar from 'src/components/agenda/AgendaCalendar.vue';
import FormularioNuevaCita from 'src/components/agenda/FormularioNuevaCita.vue';
import FormularioRegistroRapido from 'src/components/agenda/FormularioRegistroRapido.vue';

const prompt = ref(false);
const promptRegistroRapido = ref(false);
const loading = ref(false);

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

const submit = async () => {
  if (myForm.value?.validate()) {
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
  }

  setTimeout(() => {
    loading.value = false;
  }, 3000);
};

const closeModal = () => {
  prompt.value = false;
};

const openModalEdit = (id) => {
  const event = events.value.find((item) => item.id === id);

  form.id = event.id;
  form.cliente = event.title;
  form.videoconferencia = null;
  form.url = null;
  form.fecha = event.time.start.split(' ')[0];
  form.horaStart = event.time.start.split(' ')[1];
  form.horaEnd = event.time.end.split(' ')[1];
  form.lugar = event.lugar;
  form.notas = event.description;
  form.estado = event.topic;
  form.sincronizar = false;

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
  promptRegistroRapido.value = false;
  prompt.value = true;
};
</script>
<style scoped lang="scss">
.fondo-gris {
  background-color: #f1f5f9;
}
</style>

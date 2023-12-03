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

    <q-dialog v-model="prompt" persistent>
      <q-card
        style="min-width: 900px; background-color: #f5f5f5"
        class="q-pa-lg"
      >
        <q-card-section>
          <div class="title">Programar nueva consulta</div>
          <div class="subtitle">
            Datos para la programación de una nueva consulta
          </div>
        </q-card-section>

        <q-form ref="myForm">
          <q-card-section class="row q-col-gutter-sm">
            <div class="col-6 q-mt-md">
              <label for="" class="c_label">Cliente</label>
              <q-select
                filled
                fill-input
                input-debounce="0"
                v-model="form.cliente"
                placeholder="Buscar cliente"
                use-input
                hide-selected
                @filter="filterFn"
                :options="
                  options.map(item => {
                    return {
                      ...item,
                      label: item.nombre_completo,
                      value: item.id
                    };
                  })
                "
                map-options
                dense
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No se encuentra el cliente
                    </q-item-section>
                  </q-item>
                </template>
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps">
                    <q-item-section avatar>
                      <q-avatar>
                        <img :src="scope.opt.img" />
                      </q-avatar>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label style="font-size: 14px">{{
                        scope.opt.label
                      }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="col-6 q-mt-md">
              <label for="" class="c_label">Videoconferencia</label>
              <q-input v-model="form.videoconferencia" filled dense disable>
                <template v-slot:prepend>
                  <q-icon name="videocam" />
                </template>
              </q-input>
            </div>
            <div class="col-3 q-mt-md">
              <label for="" class="c_label">Fecha de consulta</label>
              <q-input
                filled
                v-model="form.fecha"
                mask="date"
                :rules="['date']"
                dense
              >
                <template v-slot:prepend>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="form.fecha">
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-2 q-mt-md">
              <label for="" class="c_label">Hora de inicio</label>
              <q-input
                filled
                v-model="form.horaStart"
                mask="time"
                :rules="['time']"
                dense
              >
                <template v-slot:prepend>
                  <q-icon name="access_time"> </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-2 q-mt-md">
              <label for="" class="c_label">Hora de terminación</label>
              <q-input
                filled
                v-model="form.horaEnd"
                mask="time"
                :rules="['time']"
                dense
              >
                <template v-slot:prepend>
                  <q-icon name="access_time"> </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-5 q-mt-md">
              <label for="" class="c_label">Lugar de consulta</label>
              <q-select
                filled
                dense
                v-model="form.lugar"
                :options="
                  consultorios.map(item => {
                    return {
                      ...item,
                      label: item.nombre,
                      value: item.id
                    };
                  })
                "
              >
                <template v-slot:prepend>
                  <q-icon name="manage_accounts" />
                </template>
              </q-select>
            </div>

            <div class="col-12 q-mt-md">
              <q-expansion-item
                class="overflow-hidden"
                icon="description"
                label="Añadir notas de programación a la consulta"
                header-class="bg-white text-black"
                expand-icon-class="text-black"
              >
                <q-card>
                  <q-card-section>
                    <q-input filled color="white" dense v-model="form.notas">
                    </q-input>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </div>
            <div class="col-12 q-mt-md">
              <label for="" class="c_label">Estado de la consulta</label>
              <q-select filled dense v-model="form.estado" :options="status">
                <template v-slot:prepend>
                  <q-icon name="manage_accounts" />
                </template>
              </q-select>
            </div>
            <div class="col-12 q-mt-md">
              <div class="bg-white" style="width: 320px">
                <q-checkbox
                  v-model="form.sincronizar"
                  checked-icon="check_circle_outline"
                  unchecked-icon="radio_button_unchecked"
                  label="Sincronizar consulta con Google Calendar"
                  disable
                />
              </div>
            </div>
          </q-card-section>
          <q-card-actions align="between" class="text-primary q-mr-md">
            <q-btn
              outline
              label="Cancelar"
              @click="closeModal"
              class="full-width"
              style="max-width: 48%"
            />
            <q-btn
              color="primary"
              :label="form.id === null ? 'Guardar' : 'Actualizar'"
              @click="submit"
              class="full-width"
              style="max-width: 48%"
              :disable="disabled"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import Notification from '../../components/Notification.vue';
import AgendaCalendar from 'src/components/AgendaCalendar.vue';
const prompt = ref(false);
const loading = ref(false);
const myForm = ref<HTMLFormElement | null>(null);

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
    description: 'Descripcion prueba'
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
    description: 'Descripcion prueba'
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
    description: 'Descripcion prueba'
  }
]);

const form = reactive({
  id: null,
  cliente: null,
  videoconferencia: null,
  url: null,
  fecha: null,
  horaStart: null,
  horaEnd: null,
  lugar: null,
  notas: null,
  estado: null,
  sincronizar: false
});

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
        end: `${fechaStartFormateada} ${form.horaEnd}`
      },
      colorScheme:
        form.estado.toLowerCase() === 'confirmada'
          ? 'confirmada'
          : form.estado.toLowerCase() === 'no confirmada'
          ? 'noConfirmada'
          : 'cancelada',
      id: `${events.value.length + 1}`,
      description: form.notas,
      isEditable: true
    };

    if (form.id === null) {
      events.value.push(event);
      closeModal();
    } else {
      const index = events.value.findIndex(item => item.id === form.id);
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
  form.id = null;
  form.cliente = null;
  form.videoconferencia = null;
  form.url = null;
  form.fecha = null;
  form.horaStart = null;
  form.horaEnd = null;
  form.lugar = null;
  form.notas = null;
  form.estado = null;
  form.sincronizar = false;
};

const openModalEdit = id => {
  const event = events.value.find(item => item.id === id);

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

const stringOptions = [
  {
    id: 1,
    nombre: 'Juan',
    apellido: 'Perez',
    nombre_completo: 'Juan Perez',
    img: 'https://cdn.quasar.dev/img/avatar.png'
  },
  {
    id: 2,
    nombre: 'Pedro',
    apellido: 'Perez',
    nombre_completo: 'Pedro Perez',
    img: 'https://cdn.quasar.dev/img/avatar.png'
  },
  {
    id: 2,
    nombre: 'Luis',
    apellido: 'Perez',
    nombre_completo: 'Luis Perez',
    img: 'https://cdn.quasar.dev/img/avatar.png'
  }
];

const consultorios = [
  {
    id: 1,
    nombre: 'Consultorio 1',
    direccion: 'Av. 1 de Mayo 123',
    img: 'https://cdn.quasar.dev/img/avatar.png'
  },
  {
    id: 2,
    nombre: 'Consultorio 2',
    direccion: 'Av. 1 de Mayo 123',
    img: 'https://cdn.quasar.dev/img/avatar.png'
  },
  {
    id: 3,
    nombre: 'Consultorio 3',
    direccion: 'Av. 1 de Mayo 123',
    img: 'https://cdn.quasar.dev/img/avatar.png'
  }
];

const status = ['Confirmada', 'No Confirmada', 'Cancelada'];
const options = ref(stringOptions);

function filterFn (val, update, abort) {
  update(() => {
    const needle = val.toLowerCase();
    options.value = stringOptions.filter(
      v => v.nombre_completo.toLowerCase().indexOf(needle) > -1
    );
  });
}

function optionsFnTime2 (hr, min, sec) {
  if (hr < 6 || hr > 18 || (hr === 18 && min > 0)) {
    return false;
  }
  if (min !== null && (min < 0 || min > 59)) {
    return false;
  }
  return true;
}

const disabled = computed(() => {
  if (
    form.cliente === null ||
    form.fecha === null ||
    form.horaStart === null ||
    form.horaEnd === null ||
    form.lugar === null ||
    form.estado === null
  ) {
    return true;
  }
});
</script>
<style scoped lang="scss">
.fondo-gris {
  background-color: #f1f5f9;
}
.title {
  font-size: 32px;
  font-weight: 400;
  color: #525252;
  line-height: 20px;
  text-align: center;
}

.subtitle {
  margin-top: 10px;
  font-size: 16px;
  font-weight: 400;
  color: #525252;
  line-height: 20px;
  text-align: center;
}
.c_label {
  font-size: 14px;
  font-weight: 700;
  color: #525252;
  line-height: 20px;
  text-align: center;
}
</style>

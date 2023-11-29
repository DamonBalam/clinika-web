<template>
  <q-page class="fondo-gris q-py-md q-px-xl">
    <Notification />
    <div class="q-mt-sm q-pt-sm">
      <div class="row justify-between items-center">
        <p class="text-black text-bold text-h5">Agenda</p>

        <div class="row">
          <q-btn
            @click="prompt = true"
            label="Nuevo cita"
            color="primary"
            :icon="'add'"
            class="text-capitalize"
          />
        </div>
      </div>
    </div>

    <AgendaCalendar />

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
            <div class="col-6">
              <label for="" class="c_label">Cliente</label>
              <q-select
                filled
                fill-input
                input-debounce="0"
                v-model="model"
                use-input
                hide-selected
                :options="options"
                @filter="filterFn"
                dense
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      No results
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="col-6">
              <label for="" class="c_label">Videoconferencia</label>
              <q-input
                filled
                fill-input
                input-debounce="0"
                dense
                v-model="form.peso"
                autofocus
                lazy-rules
                :rules="[val => !!val || 'El peso es requerido']"
              >
                <template v-slot:prepend>
                  <q-icon name="videocam" />
                </template>
              </q-input>
            </div>
            <div class="col-3">
              <label for="" class="c_label">Fecha de consulta</label>
              <q-input
                filled
                v-model="date"
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
                      <q-date v-model="date">
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
            <div class="col-3">
              <label for="" class="c_label">Hora de consulta</label>
              <q-input
                filled
                v-model="time"
                mask="time"
                :rules="['time']"
                dense
              >
                <template v-slot:prepend>
                  <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-time
                        v-model="time"
                        format24h
                        :options="optionsFnTime2"
                      >
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Close"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-time>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-6">
              <label for="" class="c_label">Lugar de consulta</label>
              <q-input
                outlined
                dense
                v-model="form.peso"
                autofocus
                lazy-rules
                :rules="[val => !!val || 'El peso es requerido']"
              >
                <template v-slot:prepend>
                  <q-icon name="location_on" />
                </template>
              </q-input>
            </div>
          </q-card-section>
        </q-form>

        <q-card-actions align="right" class="text-primary q-mr-md">
          <q-btn
            outline
            label="Cancelar"
            @click="closeModal"
            style="width: 175px"
          />
          <q-btn
            color="primary"
            :label="form.id === null ? 'Guardar' : 'Actualizar'"
            v-close-popup
            style="width: 175px"
            @click="submit"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import Notification from '../../components/Notification.vue';
import AgendaCalendar from 'src/components/AgendaCalendar.vue';
const date = ref('2023/11/29');
const time = ref('10:56');
const prompt = ref(false);
const confirm = ref(false);
const myForm = ref<HTMLFormElement | null>(null);

const form = reactive({
  id: null,
  peso: '',
  musculo: '',
  grasas: '',
  porcentaje_grasa: '',
  cc: '',
  grasa_viceral: '',
  evolucion: ''
});

const submit = async () => {
  if (myForm.value?.validate()) {
  }
};

const closeModal = () => {
  prompt.value = false;
  form.id = null;
  form.peso = '';
  form.musculo = '';
  form.grasas = '';
  form.porcentaje_grasa = '';
  form.cc = '';
  form.grasa_viceral = '';
  form.evolucion = '';
};
const stringOptions = ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'];
const options = ref(stringOptions);
const model = ref(null);

function filterFn (val, update, abort) {
  update(() => {
    const needle = val.toLowerCase();
    options.value = stringOptions.filter(
      v => v.toLowerCase().indexOf(needle) > -1
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

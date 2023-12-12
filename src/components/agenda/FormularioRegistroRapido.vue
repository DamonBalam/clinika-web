<template>
  <q-dialog v-model="modal" persistent>
    <q-card style="min-width: 900px; background-color: #f5f5f5" class="q-pa-lg">
      <q-card-section>
        <div class="title">
          {{ 'Registro Rapido' }}
        </div>
        <div class="subtitle">
          {{ 'Datos para el registro del paciente' }}
        </div>
      </q-card-section>

      <q-form ref="myForm">
        <!-- Formulario -->
        <q-card-section class="row q-col-gutter-sm">
          <!-- DATOS PERSONALES -->
          <div class="col-12 q-mb-md">
            <div class="row q-col-gutter-sm">
              <div class="col-12">
                <span class="text-weight-bold" style="color: #1e293b"
                  >Datos personales</span
                >
              </div>
              <div class="col-4">
                <label for="nombre" class="q-ml-xs text-subtitle2 q-mb-none"
                  >Nombre(s)</label
                >
                <q-input
                  outlined
                  v-model="formulario.nombre"
                  dense
                  placeholder="Escribe el nombre(s)"
                  lazy-rules
                  :rules="[(val) => !!val || 'Este campo es obligatorio']"
                />
              </div>
              <div class="col-4">
                <label
                  for="apellido_paterno"
                  class="q-ml-xs text-subtitle2 q-mb-none"
                  >Primer apellido</label
                >
                <q-input
                  id="apellido_paterno"
                  outlined
                  dense
                  v-model="formulario.apellido_paterno"
                  placeholder="Escribe el primer apellido"
                  lazy-rules
                  :rules="[(val) => !!val || 'Este campo es obligatorio']"
                />
              </div>
              <div class="col-4">
                <label
                  for="apellido_materno"
                  class="q-ml-xs text-subtitle2 q-mb-none"
                  >Segundo apellido</label
                >
                <q-input
                  id="apellido_materno"
                  outlined
                  dense
                  v-model="formulario.apellido_materno"
                  placeholder="Escribe el segundo apellido"
                  lazy-rules
                  :rules="[(val) => !!val || 'Este campo es obligatorio']"
                />
              </div>
            </div>
          </div>

          <!-- DATOS DE CONTACTO -->
          <div class="col-12">
            <div class="row q-col-gutter-sm">
              <div class="col-12">
                <span class="text-weight-bold" style="color: #1e293b"
                  >Datos de contacto</span
                >
              </div>
              <div class="col-6">
                <label for="email" class="q-ml-xs text-subtitle2 q-mb-none"
                  >Correo electrónico</label
                >
                <q-input
                  outlined
                  dense
                  v-model="formulario.email"
                  placeholder="correo@ejemplo.com"
                  lazy-rules
                  :rules="[
                    (val) =>
                      val.length > 0 || 'El correo electrónico es requerido',
                  ]"
                />
              </div>
              <div class="col-6">
                <label for="telefono" class="q-ml-xs text-subtitle2 q-mb-none"
                  >Teléfono</label
                >
                <q-input
                  type="phone"
                  outlined
                  v-model="formulario.telefono"
                  dense
                  placeholder="Escribe el telefono"
                  lazy-rules
                  :rules="[
                    (val) => val.length > 0 || 'El teléfono es requerido',
                  ]"
                />
              </div>
            </div>
          </div>

          <!-- DATOS DE CONSULTA -->
          <div class="col-12">
            <div class="row q-col-gutter-sm">
              <div class="col-12">
                <span class="text-weight-bold" style="color: #1e293b"
                  >Datos de consulta</span
                >
              </div>
              <div class="col-6">
                <label
                  for="consultorio"
                  class="q-ml-xs text-subtitle2 q-mb-none"
                  >Consultorio</label
                >
                <q-select
                  outlined
                  dense
                  v-model="formulario.consultorio_id"
                  label="Seleccione el consultorio"
                  style="font-size: 14px !important"
                  :options="
                    consultorios.map((item) => {
                      return {
                        label: item.name,
                        value: item.id,
                      };
                    })
                  "
                  map-options
                  emit-value
                  lazy-rules
                  :rules="[
                    (val) => val !== null || 'El consultorio es requerido',
                  ]"
                />
              </div>
              <div class="col-6">
                <label
                  for="nutricionista"
                  class="q-ml-xs text-subtitle2 q-mb-none"
                  >Nutricionista</label
                >
                <q-select
                  outlined
                  dense
                  v-model="formulario.nutricionista_id"
                  style="font-size: 14px !important"
                  label="Elegir nutricionista"
                  :options="
                    nutricionistas.map((item) => {
                      return {
                        label: item.nombre,
                        value: item.id,
                      };
                    })
                  "
                  map-options
                  emit-value
                  lazy-rules
                  :rules="[
                    (val) => val !== null || 'La nutricionista es requerida',
                  ]"
                />
              </div>
            </div>
          </div>
        </q-card-section>

        <!-- ACTIONS -->
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
            :label="formulario.id === null ? 'Guardar' : 'Actualizar'"
            @click="submit"
            class="full-width"
            style="max-width: 48%"
            :disable="disabled"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
interface IPaciente {
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  telefono: string;
  email: string;
  consultorio_id: number;
  nutricionista_id: number;
}

interface IClinic {
  id: number;
  name: string;
  address: string;
  phone: string;
}

interface INutri {
  id: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  email: string;
  telefono: string;
}

import { ref, reactive, computed, watch } from 'vue';

const props = defineProps({
  prompt: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['close', 'submit']);

/* CATALOGOS */
const consultorios = ref<IClinic[]>([
  {
    id: 1,
    name: 'Consultorio 1',
    address: 'Av. 1',
    phone: '1234567890',
  },
  {
    id: 2,
    name: 'Consultorio 2',
    address: 'Av. 2',
    phone: '1234567890',
  },
  {
    id: 3,
    name: 'Consultorio 3',
    address: 'Av. 3',
    phone: '1234567890',
  },
]);

const nutricionistas = ref<INutri[]>([
  {
    id: 1,
    nombre: 'Nutriologa 1',
    apellido_paterno: 'Apellido 1',
    apellido_materno: 'Apellido 2',
    email: 'nutriologa',
    telefono: '1234567890',
  },
  {
    id: 2,
    nombre: 'Nutriologa 2',
    apellido_paterno: 'Apellido 1',
    apellido_materno: 'Apellido 2',
    email: 'nutriologa',
    telefono: '1234567890',
  },
  {
    id: 3,
    nombre: 'Nutriologa 3',
    apellido_paterno: 'Apellido 1',
    apellido_materno: 'Apellido 2',
    email: 'nutriologa',
    telefono: '1234567890',
  },
]);

const formulario = reactive<IPaciente>({
  id: null,
  nombre: '',
  apellido_paterno: '',
  apellido_materno: '',
  email: '',
  telefono: '',
  consultorio_id: null,
  nutricionista_id: null,
});

const modal = ref(false);

/* WATCHERS */
watch(
  () => props.prompt,
  () => {
    modal.value = props.prompt;
  }
);

const closeModal = () => {
  emit('close');
};

const submit = () => {
  emit('submit', formulario);
};

const disabled = computed(() => {
  if (
    formulario.nombre === '' ||
    formulario.apellido_paterno === '' ||
    formulario.apellido_materno === '' ||
    formulario.email === '' ||
    formulario.telefono === '' ||
    formulario.consultorio_id === null ||
    formulario.nutricionista_id === null
  ) {
    return true;
  }
});
</script>

<style scoped>
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

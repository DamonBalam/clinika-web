<template>
  <q-dialog v-model="modal" persistent>
    <q-card style="min-width: 600px; background-color: #f5f5f5" class="q-pa-lg">
      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-card-section>
          <div class="title q-mb-md">
            {{ 'Selecciona los archivos' }}
          </div>

          <q-file outlined v-model="files" use-chips multiple>
            <template v-slot:prepend>
              <q-icon name="attach_file" />
            </template>
          </q-file>
        </q-card-section>

        <!-- ACTIONS -->
        <q-card-actions align="between" class="text-primary q-mr-md">
          <q-btn
            outline
            label="Cancelar"
            @click="closeModal"
            class="full-width"
            style="max-width: 48%; text-transform: inherit"
          />
          <q-btn
            color="primary"
            label="Subir"
            type="submit"
            class="full-width"
            style="max-width: 48%; text-transform: inherit"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import axios from 'axios';
import { pacienteDataServices } from 'src/services/PacienteDataService';
import { ref, computed } from 'vue';

import { useAuthStore } from 'src/stores/auth';

/* PROPS */
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  paciente: {
    type: Object,
    default: null,
  },
  id: {
    type: String,
    default: null,
  },
});

const authStore = useAuthStore();
const files = ref<File[]>([]);

/* EMITS */
const emits = defineEmits(['update:modelValue']);

const modal = computed(() => props.modelValue);

/* METHODS */
const onFilesChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    files.value = Array.from(target.files);
  }
};

const closeModal = () => {
  files.value = [];
  emits('update:modelValue', false);
};

const paciente = computed(() => {
  return props.paciente;
});

const onSubmit = async (evt: any) => {
  const formData = new FormData();

  files.value.forEach((file, index) => {
    console.log('file', file);

    formData.append(`archivos[${index}]`, file);
  });

  const pacienteData = {
    nombre: paciente.value.nombre,
    apellido_paterno: paciente.value.apellido_paterno,
    apellido_materno: paciente.value.apellido_materno,
    email: paciente.value.email,
    telefono: paciente.value.telefono,

    nutricionista_id: paciente.value.nutricionista.id,
    consultorio_id: paciente.value.consultorio.id,

    sexo: paciente.value.sexo,
    fecha_nacimiento: paciente.value.fecha_nacimiento,

    alergias: paciente.value.alergias,
    condiciones_medicas: paciente.value.condiciones_medicas,
    medicinas: paciente.value.medicinas,
    desordenes: paciente.value.desordenes,

    actividad_fisica_id: paciente.value.actividad_fisica.id,
    objetivo_id: paciente.value.objetivo.id,

    horas_dormidas: paciente.value.horas_de_sueno.id,
    historial: paciente.value.historial,
    registro_consumo: paciente.value.registro_consumo,
    num_identificacion: paciente.value.num_identificacion,
    profesion: paciente.value.profesion,
    lugar_residencia: paciente.value.lugar_residencia,

    estado_civil: paciente.value.estado_civil,
    consumo_alcohol_id: paciente.value.consumo_alcohol.id,
    tipo_fumador_id: paciente.value.fumador.id,
    consumo_agua_id: paciente.value.consumo_de_agua_diario.id,
    nivel_estres_id: paciente.value.estres_general.id,
  };

  Object.entries(pacienteData).forEach(([key, value]) => {
    formData.append(key, value);
  });

  try {
    // const data = await pacienteDataServices.updateFilesPaciente(
    //   props.id,
    //   formData
    // );

    await axios.post(
      `https://phplaravel-1203103-4252935.cloudwaysapps.com/api/update/user/${props.id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${authStore.token}`,
        },
      }
    );
  } catch (error) {
    console.error('error', error);
  }
};

/* WATCHERS */
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

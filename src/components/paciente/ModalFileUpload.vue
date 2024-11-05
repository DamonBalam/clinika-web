<template>
  <q-dialog v-model="modal" persistent>
    <q-card style="min-width: 400px; background-color: #f5f5f5" class="q-pa-lg">
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
import { pacienteDataServices } from 'src/services/PacienteDataService';
import { ref, computed } from 'vue';

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

const files = ref<File[]>([]);

/* EMITS */
const emits = defineEmits(['update:modelValue']);

const modal = computed(() => props.modelValue);

/* METHODS */

const closeModal = () => {
  files.value = [];
  emits('update:modelValue', false);
};

const onSubmit = async (evt: any) => {
  const formData = new FormData();
  files.value.forEach((file) => {
    formData.append('archivos', file);
  });

  const pacienteData = {
    nombre: props.paciente.nombre,
    apellido_paterno: props.paciente.apellido_paterno,
    apellido_materno: props.paciente.apellido_materno,
    email: props.paciente.email,
    telefono: props.paciente.telefono,
    nutricionista_id: props.paciente.nutricionista_id,
    consultorio_id: props.paciente.consultorio_id,
    sexo: props.paciente.sexo,
    fecha_nacimiento: props.paciente.fecha_nacimiento,
    alergias: props.paciente.alergias,
    condiciones_medicas: props.paciente.condiciones_medicas,
    medicinas: props.paciente.medicinas,
    desordenes: props.paciente.desordenes,
    actividad_fisica_id: props.paciente.actividad_fisica_id,
    objetivo_id: props.paciente.objetivo_id,
    horas_dormidas: props.paciente.horas_dormidas,
    historial: props.paciente.historial,
    registro_consumo: props.paciente.registro_consumo,
    num_identificacion: props.paciente.num_identificacion,
    profesion: props.paciente.profesion,
    lugar_residencia: props.paciente.lugar_residencia,
    estado_civil: props.paciente.estado_civil,
    consumo_alcohol_id: props.paciente.consumo_alcohol_id,
    tipo_fumador_id: props.paciente.tipo_fumador_id,
    consumo_agua_id: props.paciente.consumo_agua_id,
    nivel_estres_id: props.paciente.nivel_estres_id,
  };

  Object.entries(pacienteData).forEach(([key, value]) => {
    formData.append(key, value);
  });

  console.log('formData', formData);

  try {
    const data = await pacienteDataServices.updateFilesPaciente(
      props.id,
      formData
    );
  } catch (error) {
    console.error('error', error);
  }

  // console.log('data', data);
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

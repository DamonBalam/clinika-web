<template>
  <q-page>
    <div class="row justify-between items-center q-mx-md q-mt-sm q-mb-md">
      <span class="text-black text-bold text-h5">Resumen del paciente</span>
      <q-btn
        color="primary"
        label="Editar paciente"
        :disable="true"
        text-color="white"
        size="md"
        :icon="'o_edit'"
        class="text-capitalize"
        :to="{ name: 'PerfilEditarPaciente', params: { id: paciente.id } }"
      />
    </div>

    <!-- CONTAINER -->
    <div class="row q-mx-sm q-mt-sm">
      <!-- INFORMACIÓN DEL PACIENTE -->
      <div class="col-12 col-md-6 col-lg-4 q-mt-md">
        <q-expansion-item
          class="q-px-sm"
          icon="contact_page"
          label="Datos generales"
          header-class="bg-white text-black"
          expand-icon-class="text-black"
          v-model="openRA"
        >
          <q-card flat style="height: 210px">
            <q-card-section>
              <div class="row">
                <div class="col-3">
                  <q-avatar size="80px" class="q-mt-sm">
                    <img src="../../assets/avatar.png" />
                  </q-avatar>
                </div>
                <div class="col-9">
                  <div class="row">
                    <div class="col-12 q-mb-sm">
                      <span class="text-weight-bold text-title-analisis">
                        {{ infoPaciente.nombre }}
                      </span>
                    </div>
                    <div class="col-4">
                      <span class="label-info">
                        <q-icon name="fact_check" color="primary" />
                        {{ infoPaciente.num_identificacion }}
                      </span>
                      <span class="label-info">
                        <q-icon
                          :name="
                            infoPaciente.sexo === 'Hombre' ? 'man' : 'woman'
                          "
                          color="primary"
                        />
                        {{ infoPaciente.sexo }}
                      </span>
                      <span class="label-info">
                        <q-icon name="cake" color="primary" />
                        {{ getEdad }}
                      </span>
                      <span class="label-info">
                        <q-icon name="work" color="primary" />
                        {{ infoPaciente.profesion }}
                      </span>
                    </div>
                    <div class="col-8">
                      <span class="label-info">
                        <q-icon name="public" color="primary" />
                        {{ infoPaciente.lugar_residencia }}
                      </span>

                      <span class="label-info">
                        <q-icon name="phone" color="primary" />
                        {{ infoPaciente.telefono }}
                      </span>
                      <span class="label-info">
                        <q-icon name="emoji_events" color="primary" />
                        {{ infoPaciente.objetivo }}
                      </span>
                      <span class="label-info" style="font-size: 13px">
                        <q-icon name="email" color="primary" />
                        {{ infoPaciente.email }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </div>

      <!-- PERFIL MEDICO -->
      <div class="col-12 col-md-6 col-lg-4 q-mt-md">
        <q-expansion-item
          class="q-px-sm"
          icon="medical_services"
          label="Perfil Médico"
          header-class="bg-white text-black"
          expand-icon-class="text-black"
          v-model="openRA"
        >
          <q-card flat style="height: 210px">
            <q-card-section>
              <div class="row q-ml-md">
                <div class="col-6">
                  <span class="text-title2-analisis">
                    Alergias o intolerancias</span
                  >
                  <span class="label-info font-bold">
                    {{ 'Lactosa' }}
                  </span>
                </div>

                <div class="col-6">
                  <span class="text-title2-analisis">
                    Trastornos alimenticios</span
                  >
                  <span class="label-info font-bold">
                    {{ 'Ninguno' }}
                  </span>
                </div>

                <div class="col-6 q-mt-md">
                  <span class="text-title2-analisis">Condiciones médicas</span>
                  <span class="label-info font-bold">
                    {{ 'Ninguna' }}
                  </span>
                </div>

                <div class="col-6 q-mt-md">
                  <span class="text-title2-analisis">Medicamentos</span>
                  <span class="label-info font-bold">
                    {{ 'Ninguno' }}
                  </span>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </div>

      <!-- HÁBITOS -->
      <div class="col-12 col-md-6 col-lg-4 q-mt-md">
        <q-expansion-item
          class="q-px-sm"
          icon="self_improvement"
          label="Hábitos"
          header-class="bg-white text-black"
          expand-icon-class="text-black"
          v-model="openRA"
        >
          <q-card flat style="height: 210px">
            <q-card-section>
              <div class="row q-ml-md">
                <div class="col-6">
                  <span class="text-title2-analisis">
                    Horas de sueño diarias</span
                  >
                  <span class="label-info font-bold">
                    {{ '8 horas' }}
                  </span>
                </div>

                <div class="col-6">
                  <span class="text-title2-analisis">
                    Actividad física semanal</span
                  >
                  <span class="label-info font-bold">
                    {{ 'Diario' }}
                  </span>
                </div>

                <div class="col-6 q-mt-sm">
                  <span class="text-title2-analisis"> Consumo de alcohol</span>
                  <span class="label-info font-bold">
                    {{ 'Nunca' }}
                  </span>
                </div>

                <div class="col-6 q-mt-sm">
                  <span class="text-title2-analisis">Fumador</span>
                  <span class="label-info font-bold">
                    {{ 'No' }}
                  </span>
                </div>

                <div class="col-6 q-mt-sm">
                  <span class="text-title2-analisis"
                    >Ingesta diaria del agua</span
                  >
                  <span class="label-info font-bold">
                    {{ '2.5 litros' }}
                  </span>
                </div>

                <div class="col-6 q-mt-sm">
                  <span class="text-title2-analisis">Estrés</span>
                  <span class="label-info font-bold">
                    {{ 'Periodico' }}
                  </span>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </div>

      <!-- REGISTRO DE CONSUMO -->
      <div class="col-12 col-md-6 col-lg-4 q-mt-md">
        <q-expansion-item
          class="q-px-sm"
          icon="description"
          label="Registro de consumo"
          header-class="bg-white text-black"
          expand-icon-class="text-black"
          v-model="openRA"
        >
          <q-card flat style="height: 210px; overflow-y: scroll">
            <q-card-section>
              <span
                class="text-weight-bold"
                style="font-size: 14px; color: #94a3b8; height: 180px"
                >{{
                  registroConsumoText ? registroConsumoText : 'No registrado'
                }}</span
              >
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </div>

      <!-- ANTECEDENTES -->
      <div class="col-12 col-md-6 col-lg-4 q-mt-md">
        <q-expansion-item
          class="q-px-sm"
          icon="description"
          label="Antecedentes"
          header-class="bg-white text-black"
          expand-icon-class="text-black"
          v-model="openRA"
        >
          <q-card flat style="height: 210px; overflow-y: scroll">
            <q-card-section>
              <span
                class="text-weight-bold"
                style="font-size: 14px; color: #94a3b8"
                >{{
                  registroConsumoText ? registroConsumoText : 'No registrado'
                }}</span
              >
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </div>

      <!-- ÚLTIMOS ARCHIVOS -->
      <div class="col-12 col-md-6 col-lg-4 q-mt-md">
        <q-expansion-item
          class="q-px-sm"
          icon="attach_file"
          label="Últimos archivos"
          header-class="bg-white text-black"
          expand-icon-class="text-black"
          v-model="openRA"
        >
          <q-card flat style="height: 210px">
            <q-card-section>
              <div class="row">
                <div class="col-12 text-center">
                  <q-icon
                    name="inventory"
                    size="60px"
                    class="q-mt-md"
                    color="primary"
                  ></q-icon>
                  <span
                    class="text-weight-bold"
                    style="font-size: 14px; color: #94a3b8; display: block"
                    >{{ 'No hay archivos' }}</span
                  >
                </div>
              </div>
            </q-card-section>
            <q-card-actions class="absolute-bottom" align="center">
              <q-btn
                outline
                color="primary"
                icon="upload"
                style="text-transform: inherit"
                >Subir archivo</q-btn
              >
              <q-btn flat color="primary" style="text-transform: inherit"
                >Ver todos</q-btn
              >
            </q-card-actions>
          </q-card>
        </q-expansion-item>
      </div>

      <!-- END REGISTRO DE CONSUMO && ANTECEDENTES -->
      <!-- TABLAS -->
      <div class="col-12 q-mt-md q-px-sm">
        <TableCitas :id="id" @cita="handleCita" />
      </div>
      <div class="col-12 col-md-8 q-mt-md q-px-sm q-mb-xs">
        <TableEquivalencias :id="id" :cita="idCita" />
      </div>
      <div class="col-12 col-md-4 q-mt-md q-px-sm q-mb-xs">
        <div class="row">
          <div class="col-12 q-my-md">
            <span class="text-black text-bold text-h5">Prueba Gráfica</span>
          </div>
          <div class="col-12">
            <q-card flat class="text-center">
              <q-knob
                v-model="porcent"
                size="305px"
                :thickness="0.3"
                color="blue-5"
                center-color="primary"
                track-color="blue-1"
                class="q-ma-md"
              />
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch, reactive } from 'vue';

/* COMPONENTES */
import TableCitas from 'src/components/TableCitas.vue';
import TableEquivalencias from 'src/components/TableEquivalencias.vue';

/* INTERFACES */
import { IObjetivo } from 'src/Interfaces/Objetivo';
import { IPacienteResponse } from 'src/Interfaces/Paciente';
import { IActividadFisica } from 'src/Interfaces/ActividadFisica';

/* SERVICIOS */
import { pacienteDataServices } from 'src/services/PacienteDataService';
import { objetivoDataServices } from 'src/services/ObjetivoDataService';
import { actividadDataServices } from 'src/services/ActividadDataService';

// import { useQuasar } from 'quasar';
// const $q = useQuasar();

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

/* CATÁLOGOS */
const objetivos = ref<IObjetivo[]>([]);
const actividades = ref<IActividadFisica[]>([]);
/* DATA */
const idCita = ref('');
const open = ref(true);
const openRA = ref(true);

const porcent = ref(50);

const paciente = ref<IPacienteResponse>({
  id: null,
  nombre: '',
  apellido_paterno: '',
  apellido_materno: '',
  nombre_completo: '',
  email: '',
  telefono: '',
  nutricionista_id: null,
  consultorio_id: null,
  sexo: '',
  fecha_nacimiento: '',
  alergias: [],
  condiciones_medicas: [],
  medicinas: [],
  desordenes: [],
  actividad_fisica_id: null,
  objetivo_id: null,
  horas_dormidas: '',
  registro_consumo: '',
  estatura: 160,
  historial: '',
  lugar_residencia: '',
  profesion: '',
  num_identificacion: '',

  estado_civil_id: null,
  consumo_alcohol_id: null,
  tipo_fumador_id: null,
  consumo_agua_id: null,
  nivel_estres_id: null,
});

const handleCita = (id: string) => {
  idCita.value = id;
};

const registroConsumoText = computed(() => {
  return 'lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum ';
});

const objetivoLabel = computed(() => {
  return (
    objetivos.value.find((o) => o.id === paciente.value.objetivo_id)?.name ||
    'N/A'
  );
});

const actividadLabel = computed(() => {
  return (
    actividades.value.find((a) => a.id === paciente.value.actividad_fisica_id)
      ?.name || 'N/A'
  );
});

const infoPaciente = computed(() => {
  return {
    nombre: paciente.value.nombre_completo || 'N/A',
    lugar_residencia: paciente.value.lugar_residencia || 'N/A',
    profesion: paciente.value.profesion || 'N/A',
    num_identificacion: paciente.value.num_identificacion || 'N/A',
    email: paciente.value.email || 'N/A',
    telefono: paciente.value.telefono || 'N/A',
    sexo: paciente.value.sexo === 'M' ? 'Hombre' : 'Mujer' || 'N/A',
    fecha_nacimiento: getEdad || 'N/A',
    objetivo: objetivoLabel,
  };
});

onMounted(async () => {
  getObjetivos();
  getActividades();

  let res = await pacienteDataServices.getById(props.id);
  console.log(res);

  if (res.code == 200) {
    paciente.value = res.data.user as IPacienteResponse;
  }
});

const getObjetivos = async () => {
  const data = await objetivoDataServices.getObjetivos();
  if (data.code === 200) {
    objetivos.value = data.data;
  }
};

const getActividades = async () => {
  const data = await actividadDataServices.getActividades();
  if (data.code === 200) {
    actividades.value = data.data;
  }
};

function calcularEdad(fechaNacimiento: any) {
  var fechaActual = new Date();
  var edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();

  // Verificar si aún no ha cumplido años en este año
  if (
    fechaActual.getMonth() < fechaNacimiento.getMonth() ||
    (fechaActual.getMonth() === fechaNacimiento.getMonth() &&
      fechaActual.getDate() < fechaNacimiento.getDate())
  ) {
    edad--;
  }

  return `${edad} años`;
}

const getEdad = computed(() => {
  if (paciente.value.fecha_nacimiento) {
    return calcularEdad(new Date(paciente.value.fecha_nacimiento));
  }
  return 'N/A';
});
</script>

<style lang="scss" scoped>
.fondo-gris {
  background-color: #f1f5f9;
}

.text-title-analisis {
  font-size: 18px;
  font-weight: 600;
  color: #404040;
}
.text-title2-analisis {
  font-size: 14px;
  font-weight: 600;
  color: #404040;
}
.text-subtitle-analisis {
  font-size: 14px;
  font-weight: 600;
  color: #a3a3a3;
}

.label-info {
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: 400;
  color: #737373;
}
</style>

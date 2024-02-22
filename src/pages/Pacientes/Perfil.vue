<template>
  <q-page>
    <BotonBack :url="`/pacientes`" />
    <div class="row justify-between items-center q-mx-md q-mt-sm q-mb-md">
      <span class="text-black text-bold text-h5">Resumen del paciente</span>
      <q-btn
        color="primary"
        label="Editar paciente"
        text-color="white"
        size="md"
        :icon="'o_edit'"
        class="text-capitalize"
        :to="{ name: 'EditarPaciente', params: { id: paciente.id } }"
      />
    </div>

    <div class="row q-mx-md q-mt-sm">
      <div class="col-12 col-md-6 q-mb-md q-pr-lg-md">
        <q-card flat style="min-height: 310px">
          <div class="row q-pa-lg q-pt-xl">
            <div class="col-4">
              <q-avatar size="168px" class="q-mt-sm">
                <img src="../../assets/avatar.png" />
              </q-avatar>
            </div>
            <div class="col-8 q-px-md">
              <div class="row items-center">
                <div class="col-12 q-mb-sm">
                  <span
                    class="text-weight-bold font-24 q-mt-md"
                    style="display: block; color: #404040"
                    >Jonathan Martinez Paz</span
                  >
                </div>
                <div class="col-6">
                  <span
                    style="font-size: 16px; font-weight: 400; color: #737373"
                  >
                    <q-icon name="fact_check" color="primary" />
                    Número identificación
                  </span>
                </div>
                <div class="col-6">
                  <span
                    style="font-size: 16px; font-weight: 400; color: #737373"
                  >
                    <q-icon name="public" color="primary" size="16px" />
                    México
                  </span>
                </div>

                <div class="col-6">
                  <span
                    style="font-size: 16px; font-weight: 400; color: #737373"
                  >
                    <q-icon name="man" color="primary" />
                    Hombre
                  </span>
                </div>
                <div class="col-6">
                  <span
                    style="font-size: 16px; font-weight: 400; color: #737373"
                  >
                    <q-icon name="email" color="primary" size="16px" />
                    user@email.com
                  </span>
                </div>

                <div class="col-6">
                  <span
                    style="font-size: 16px; font-weight: 400; color: #737373"
                  >
                    <q-icon name="cake" color="primary" />
                    35 años
                  </span>
                </div>
                <div class="col-6">
                  <span
                    style="font-size: 16px; font-weight: 400; color: #737373"
                  >
                    <q-icon name="phone" color="primary" size="16px" />
                    +52 123 456 7890
                  </span>
                </div>
                <div class="col-6">
                  <span
                    style="font-size: 16px; font-weight: 400; color: #737373"
                  >
                    <q-icon name="work" color="primary" size="16px" />
                    Psicólogo
                  </span>
                </div>
              </div>
            </div>
          </div>
        </q-card>
      </div>

      <div class="col-12 col-md-6 q-mb-md q-pl-lg-md">
        <q-card flat class="q-px-lg q-py-lg" style="min-height: 310px">
          <h3
            class="text-weight-bold q-mt-none q-mb-sm q-ml-md"
            style="font-size: 24px; color: #404040"
          >
            Análisis de bienestar
          </h3>
          <div class="row">
            <div class="col-3">
              <q-expansion-item
                class="overflow-hidden text-title2-analisis"
                label="Trastornos alimenticios"
                header-class="bg-white text-black"
                default-opened
                v-model="open"
              >
                <ul>
                  <li class="text-subtitle-analisis">Lactosa</li>
                  <li class="text-subtitle-analisis">Huevo</li>
                  <li class="text-subtitle-analisis">Nueces</li>
                </ul>
              </q-expansion-item>
            </div>

            <div class="col-3">
              <q-expansion-item
                default-opened
                v-model="open"
                class="overflow-hidden text-title2-analisis"
                label="Condiciones médicas"
                header-class="bg-white text-black"
              >
                <ul>
                  <li class="text-subtitle-analisis">Lactosa</li>
                  <li class="text-subtitle-analisis">Huevo</li>
                  <li class="text-subtitle-analisis">Nueces</li>
                </ul>
              </q-expansion-item>
            </div>

            <div class="col-3">
              <q-expansion-item
                default-opened
                v-model="open"
                class="overflow-hidden text-title2-analisis"
                label="Medicamentos"
                header-class="bg-white text-black"
              >
                <ul>
                  <li class="text-subtitle-analisis">Lactosa</li>
                  <li class="text-subtitle-analisis">Huevo</li>
                  <li class="text-subtitle-analisis">Nueces</li>
                </ul>
              </q-expansion-item>
            </div>

            <div class="col-3">
              <q-expansion-item
                default-opened
                v-model="open"
                class="overflow-hidden text-title2-analisis"
                label="Alergias"
                header-class="bg-white text-black"
              >
                <ul>
                  <li class="text-subtitle-analisis">Lactosa</li>
                  <li class="text-subtitle-analisis">Huevo</li>
                  <li class="text-subtitle-analisis">Nueces</li>
                </ul>
              </q-expansion-item>
            </div>
          </div>
          <div class="row q-ml-md">
            <div class="col-4">
              <p class="q-mb-none text-title-analisis">
                Actividad física semanal
              </p>
              <p class="text-subtitle-analisis">Diario</p>
            </div>

            <div class="col-4">
              <p class="q-mb-none text-title-analisis">
                Horas de sueño diarias
              </p>
              <p class="text-subtitle-analisis">8 horas</p>
            </div>

            <div class="col-4">
              <p class="q-mb-none text-title-analisis">Objetivo actual</p>
              <p class="text-subtitle-analisis">Ganar masa muscular</p>
            </div>
          </div>
        </q-card>
      </div>

      <!-- REGISTRO DE CONSUMO && ANTECEDENTES -->

      <div class="col-12 col-md-6 q-mb-md q-pr-lg-md">
        <q-expansion-item
          class="overflow-hidden"
          icon="description"
          label="Registro de consumo"
          header-class="bg-white text-black"
          expand-icon-class="text-black"
          v-model="openRA"
        >
          <q-card flat>
            <q-card-section>
              <span
                class="text-weight-bold"
                style="font-size: 16px; color: #94a3b8"
                >{{
                  paciente.registro_consumo
                    ? paciente.registro_consumo
                    : 'No registrado'
                }}</span
              >
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </div>

      <div class="col-12 col-md-6 q-mb-md q-pl-lg-md">
        <q-expansion-item
          class="overflow-hidden"
          icon="description"
          label="Antecedentes"
          header-class="bg-white text-black"
          expand-icon-class="text-black"
          v-model="openRA"
        >
          <q-card flat>
            <q-card-section>
              <span
                class="text-weight-bold"
                style="font-size: 16px; color: #94a3b8"
                >{{
                  paciente.registro_consumo
                    ? paciente.registro_consumo
                    : 'No registrado'
                }}</span
              >
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </div>

      <!-- END REGISTRO DE CONSUMO && ANTECEDENTES -->

      <!-- TABLAS -->
      <div class="col-12">
        <TableCitas :id="id" @cita="handleCita" />
      </div>
      <div class="col-12 q-mb-xs">
        <TableEquivalencias :id="id" :cita="idCita" />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue';
import BotonBack from '../../components/common/BotonBack.vue';
import TableCitas from '../../components/TableCitas.vue';
import TableEquivalencias from '../../components/TableEquivalencias.vue';
import { Paciente, IPaciente } from '../../Interfaces/Paciente';
import { pacienteDataServices } from '../../services/PacienteDataService';
import { useQuasar } from 'quasar';
const $q = useQuasar();
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const paciente = ref(new Paciente({} as IPaciente));
const idCita = ref('');
const open = ref(true);
const openRA = ref(true);

const handleCita = (id: string) => {
  idCita.value = id;
};

onMounted(async () => {
  let res = await pacienteDataServices.getById(props.id);
  if (res.code == 200) {
    paciente.value = res.data.user;
  }
});

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

  return edad;
}

const getEdad = computed(() => {
  const fechaNacimiento = new Date(paciente.value.fecha_nacimiento);

  return calcularEdad(fechaNacimiento);
});
const getAltura = computed(() => {
  return paciente.value.estatura || 'NA';
});

const acceso = ref(false);

const getAcceso = computed(() => {
  const fechaActual = new Date().toISOString().substr(0, 10);

  return isFechaEnRango(
    fechaActual,
    paciente.value.suscripcion?.empieza,
    paciente.value.suscripcion?.termina
  );
});

watch(
  () => getAcceso.value,
  (newVal, oldVal) => {
    acceso.value = newVal;
  }
);

const handleAcceso = async () => {
  try {
    if (acceso.value) {
      await pacienteDataServices.enabledAccess(props.id);
      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'check_circle',
        message: 'Se habilito el acceso correctamente',
        position: 'top-right',
      });
    } else {
      await pacienteDataServices.disabledAccess(props.id);
      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'check_circle',
        message: 'Se deshabilito el acceso correctamente',
        position: 'top-right',
      });
    }
  } catch (error) {
    console.log(error);
    $q.notify({
      color: 'red-4',
      textColor: 'white',
      icon: 'error',
      message: 'Se produjo un error en el acceso',
      position: 'top-right',
    });
  }
};

function isFechaEnRango(fecha: any, fechaInicio: any, fechaFin: any) {
  return fecha >= fechaInicio && fecha <= fechaFin;
}
</script>

<style lang="scss" scoped>
.fondo-gris {
  background-color: #f1f5f9;
}

.text-title-analisis {
  font-size: 14px;
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
</style>

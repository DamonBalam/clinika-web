<template>
  <q-page class="fondo-gris q-py-sm q-px-xl">
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
      <div class="col-12 col-md-6 q-mb-md q-pr-md">
        <q-card flat style="height: 310px">
          <div class="row q-px-xl q-pt-xl">
            <q-avatar size="100px" class="q-mt-sm">
              <img src="../../assets/images.png" />
            </q-avatar>
            <div class="q-ml-md">
              <span
                class="text-weight-bold q-mt-md"
                style="display: block; font-size: 24px; color: #404040"
                >Jonathan Martinez Paz</span
              >
              <span
                style="
                  display: block;
                  font-size: 16px;
                  font-weight: 400;
                  color: #737373;
                "
                >Paciente</span
              >
              <span
                style="
                  display: block;
                  font-size: 16px;
                  font-weight: 400;
                  color: #737373;
                "
                >Hombre - 35 años</span
              >
            </div>
          </div>
          <div class="row q-px-xl">
            <div class="q-ml-md">
              <span
                class="text-weight-bold q-mt-md"
                style="display: block; font-size: 18px; color: #404040"
                >Detalles de contacto:</span
              >
              <span
                style="
                  display: block;
                  font-size: 16px;
                  font-weight: 700;
                  color: #737373;
                "
              >
                <q-icon name="call" left color="primary" size="16px" />
                +52 444 444 4444</span
              >
              <span
                style="
                  display: block;
                  font-size: 16px;
                  font-weight: 700;
                  color: #737373;
                "
              >
                <q-icon name="mail" left color="primary" size="16px" />
                jonathan.martinez@gmail.com</span
              >
            </div>
          </div>
        </q-card>
      </div>
      <div class="col-12 col-md-6 q-mb-md q-pl-md">
        <q-card flat class="q-px-lg q-py-lg" style="height: 310px">
          <h3
            class="text-weight-bold q-mt-none q-mb-sm"
            style="font-size: 24px; color: #404040"
          >
            Salud y estilo de vida
          </h3>
          <div class="row">
            <div class="col-6">
              <p
                class="q-mb-none"
                style="color: #a3a3a3; font-size: 16px; font-weight: 600"
              >
                Actividad Fisica semanal
              </p>
              <p style="color: #404040; font-size: 16px; font-weight: 700">
                Diario
              </p>
            </div>
            <div class="col-6">
              <p
                class="q-mb-none"
                style="color: #a3a3a3; font-size: 16px; font-weight: 600"
              >
                Objetivo Actual
              </p>
              <p style="color: #404040; font-size: 16px; font-weight: 700">
                Ganar musculo
              </p>
            </div>
            <div class="col-6">
              <p
                class="q-mb-none"
                style="color: #a3a3a3; font-size: 16px; font-weight: 600"
              >
                Alergias
              </p>
              <p style="color: #404040; font-size: 16px; font-weight: 700">
                Lactosa
              </p>
            </div>
            <div class="col-6">
              <p
                class="q-mb-none"
                style="color: #a3a3a3; font-size: 16px; font-weight: 600"
              >
                Condiciones médicas
              </p>
              <p style="color: #404040; font-size: 16px; font-weight: 700">
                Ninguna
              </p>
            </div>
            <div class="col-6">
              <p
                class="q-mb-none"
                style="color: #a3a3a3; font-size: 16px; font-weight: 600"
              >
                Medicamentos
              </p>
              <p style="color: #404040; font-size: 16px; font-weight: 700">
                Ninguno
              </p>
            </div>
            <div class="col-6">
              <p
                class="q-mb-none"
                style="color: #a3a3a3; font-size: 16px; font-weight: 600"
              >
                Trastornos alimenticios
              </p>
              <p style="color: #404040; font-size: 16px; font-weight: 700">
                Ninguno
              </p>
            </div>
          </div>
        </q-card>
      </div>
      <div class="col-6 q-mb-md q-pr-md">
        <q-expansion-item
          class="overflow-hidden"
          icon="description"
          label="Registro de consumo"
          header-class="bg-white text-black"
          expand-icon-class="text-black"
        >
          <q-card>
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
      <div class="col-6 q-mb-md q-pl-md">
        <q-expansion-item
          class="overflow-hidden"
          icon="description"
          label="Antecedentes"
          header-class="bg-white text-black"
          expand-icon-class="text-black"
        >
          <q-card>
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
import { Paciente, IPaciente } from '../../interfaces/Paciente';
// import { pacienteDataServices } from '../../services/PacienteDataService'
import { useQuasar } from 'quasar';
const $q = useQuasar();
const props = defineProps({
  id: {
    type: String,
    required: true
  }
});

const paciente = ref(new Paciente({} as IPaciente));
const idCita = ref('');

const handleCita = (id: string) => {
  idCita.value = id;
};

onMounted(async () => {
  // let res = await pacienteDataServices.getById(props.id);
  // if (res.code == 200) {
  //   paciente.value = res.data.user;
  // }
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
        position: 'top-right'
      });
    } else {
      await pacienteDataServices.disabledAccess(props.id);
      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'check_circle',
        message: 'Se deshabilito el acceso correctamente',
        position: 'top-right'
      });
    }
  } catch (error) {
    console.log(error);
    $q.notify({
      color: 'red-4',
      textColor: 'white',
      icon: 'error',
      message: 'Se produjo un error en el acceso',
      position: 'top-right'
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
</style>

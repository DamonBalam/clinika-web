<script setup lang="ts">
import { ref, onMounted, reactive, computed } from 'vue';
import { IClinic } from '../Interfaces/Clinic';
import { clinicDataServices } from 'src/services/ClinicDataService';
import { useQuasar } from 'quasar';
import ModalBase from './common/ModalBase.vue';
const $q = useQuasar();
const columns = [
  {
    name: 'name',
    label: 'Nombre del consultorio',
    field: 'name',
    align: 'left',
  },
  {
    name: 'address',
    align: 'center',
    label: 'Dirección del consultorio',
    field: 'address',
  },
  { name: 'telefono', label: 'Contacto', field: 'phone', align: 'center' },
  { name: 'accion', label: 'Acción', align: 'center' },
];

const myForm = ref<HTMLFormElement | null>(null);

const items = ref<IClinic[]>([]);
const idConsultorio = ref('');
const prompt = ref(false);
const confirm = ref(false);
const form = reactive({
  id: null,
  nombre: '',
  direccion: '',
  telefono: '',
});
const loading = ref(false);

onMounted(async () => {
  await getItems();
});

const getItems = async () => {
  loading.value = true;
  try {
    const data = await clinicDataServices.getClinics();

    if (data.code === 200) {
      items.value = data.data;
    }
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
};

const submit = async () => {
  if (myForm.value?.validate()) {
    try {
      if (form.id === null) {
        const data = await clinicDataServices.saveClinic({
          nombre: form.nombre,
          direccion: form.direccion,
          telefono: form.telefono,
        });
        if (data.code === 200) {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'check_circle',
            message: 'Consultorio agregado correctamente',
          });
          await getItems();
          closeModal();
        }
      } else {
        const data = await clinicDataServices.updateClinic(form.id, {
          nombre: form.nombre,
          direccion: form.direccion,
          telefono: form.telefono,
        });
        if (data.code === 200) {
          $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'check_circle',
            message: 'Consultorio actualizado correctamente',
            position: 'top-right',
          });
          await getItems();
          closeModal();
        }
      }
    } catch (error) {
      $q.notify({
        color: 'red-4',
        textColor: 'white',
        icon: 'error',
        message: 'Ocurrió un error',
        position: 'top-right',
      });
      console.log(error);
    }
  }
};

const closeModal = () => {
  prompt.value = false;
  form.id = null;
  form.nombre = '';
  form.telefono = '';
  form.direccion = '';
};

const handleEdit = (data: any) => {
  console.log(data.row);
  form.id = data.row.id;
  form.nombre = data.row.name;
  form.telefono = data.row.phone;
  form.direccion = data.row.address;
  prompt.value = true;
};

const getDelete = (id: string) => {
  confirm.value = true;
  idConsultorio.value = id;
};

const deleteConsultorio = async () => {
  try {
    const data = await clinicDataServices.deleteClinic(idConsultorio.value);

    if (data.code === 200) {
      await getItems();
      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'check_circle',
        message: 'Se elimino correctamente',
        position: 'top-right',
      });
    }
  } catch (error) {
    $q.notify({
      color: 'red-4',
      textColor: 'white',
      icon: 'error',
      message: 'Ocurrió un error',
      position: 'top-right',
    });
    console.log(error);
  }

  confirm.value = false;
  idConsultorio.value = '';
};
</script>

<template>
  <div class="q-mt-lg q-pt-lg row justify-between">
    <span class="text-black text-bold text-h5">Consultorios</span>
    <q-btn
      label="Añadir Consultorio"
      type="submit"
      color="primary"
      :icon="'add'"
      style="text-transform: inherit"
      @click="prompt = true"
    />
  </div>

  <div class="q-mt-lg">
    <q-table
      flat
      :rows="items"
      :columns="columns"
      row-key="name"
      :hide-pagination="true"
      table-header-class="bg-accent text-black border-accent text-weight-bold"
      :separator="'cell'"
      :loading="loading"
      no-data-label="No se han encontrado registros"
      rows-per-page-label="Filas por página"
      :rows-per-page-options="[5]"
    >
      <template v-slot:body-cell-accion="props">
        <q-td :props="props">
          <q-btn
            round
            color="primary"
            :icon="'o_edit'"
            size="sm"
            @click="handleEdit(props)"
          />
          <q-btn
            round
            color="red"
            :icon="'o_delete'"
            size="sm"
            class="q-ml-sm"
            @click="getDelete(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>
  </div>

  <q-dialog v-model="prompt" persistent>
    <q-card style="min-width: 775px; border-radius: 40px" class="q-pa-lg">
      <q-card-section>
        <div class="text-h6">
          {{
            form.id === null ? 'Nuevo Consultorio' : 'Actualizar Consultorio'
          }}
        </div>
      </q-card-section>

      <q-form ref="myForm">
        <q-card-section class="row q-col-gutter-sm">
          <div class="col-4">
            <q-input
              outlined
              label="Ubicación"
              dense
              v-model="form.nombre"
              autofocus
              lazy-rules
              :rules="[(val) => !!val || 'Este campo es requerido']"
            />
          </div>
          <div class="col-4">
            <q-input
              outlined
              label="Dirección"
              dense
              v-model="form.direccion"
              autofocus
              lazy-rules
              :rules="[(val) => !!val || 'Este campo es requerido']"
            />
          </div>
          <div class="col-4">
            <q-input
              outlined
              label="Teléfono"
              dense
              v-model="form.telefono"
              autofocus
              lazy-rules
              :rules="[(val) => !!val || 'Este campo es requerido']"
            />
          </div>
        </q-card-section>
      </q-form>

      <q-card-actions align="right" class="text-primary q-mr-md">
        <q-btn
          outline
          label="Cancelar"
          @click="closeModal"
          style="width: 175px; text-transform: inherit"
        />
        <q-btn
          color="primary"
          :label="form.id === null ? 'Guardar' : 'Actualizar'"
          @click="submit"
          style="width: 175px; text-transform: inherit"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <ModalBase v-model="confirm">
    <template #content>
      <div class="row justify-center">
        <q-icon color="warning" name="warning" size="100px" />
      </div>
      <div class="row justify-center">
        <div class="subtitle">Se eliminara el siguiente consultorio</div>
      </div>
    </template>
    <template #actions>
      <q-btn
        outline
        label="Cancelar"
        @click="confirm = false"
        class="full-width"
        style="max-width: 48%; text-transform: inherit"
      />
      <q-btn
        color="primary"
        label="Eliminar"
        type="submit"
        class="full-width"
        @click="deleteConsultorio"
        style="max-width: 48%; text-transform: inherit"
      />
    </template>
  </ModalBase>
</template>

<style lang="scss" scoped>
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
</style>

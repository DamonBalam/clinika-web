<template>
  <q-dialog v-model="modal" persistent>
    <q-card style="min-width: 600px; background-color: #f5f5f5" class="q-pa-lg">
      <q-card-section>
        <div class="title q-mb-md">
          {{ 'Lista de archivos' }}
        </div>
        <div class="row justify-center">
          <div class="q-pa-md col-12" style="max-width: 550px">
            <q-list dense bordered padding class="rounded-borders">
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon color="primary" name="picture_as_pdf" />
                </q-item-section>

                <q-item-section> Foto_1.jpeg </q-item-section>

                <q-item-section side>
                  <q-icon color="primary" name="download" />
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon color="primary" name="picture_as_pdf" />
                </q-item-section>
                <q-item-section> Doc.png </q-item-section>
                <q-item-section side>
                  <q-icon color="primary" name="download" />
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon color="primary" name="picture_as_pdf" />
                </q-item-section>
                <q-item-section> Resultados-Nov-24.pdf </q-item-section>
                <q-item-section side>
                  <q-icon color="primary" name="download" />
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </q-card-section>

      <!-- ACTIONS -->
      <q-card-actions class="text-primary">
        <q-btn
          outline
          label="Cerrar"
          @click="closeModal"
          class="full-width"
          style="max-width: 100%; text-transform: inherit"
        />
        <!-- <q-btn
          color="primary"
          label="Subir"
          type="submit"
          class="full-width"
          style="max-width: 48%; text-transform: inherit"
        /> -->
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps } from 'vue';

const emits = defineEmits(['update:modelValue']);
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

const modal = computed(() => props.modelValue);

const closeModal = () => {
  emits('update:modelValue', false);
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

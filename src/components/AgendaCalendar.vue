<template>
  <div class="calendar-container is-light-mode">
    <Qalendar
      :events="eventsComputed"
      :config="config"
      :is-loading="isLoading"
      @edit-event="eventEdit"
    />
  </div>
</template>

<script>
import { Qalendar } from 'qalendar';
import { ref, computed } from 'vue';
export default {
  name: 'AgendaCalendar',
  components: {
    Qalendar
  },
  props: {
    events: {
      type: Array,
      default: () => [],
      required: true
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  setup (props, { emit }) {
    const eventEdit = event => {
      emit('event-edit', event);
    };

    const eventsComputed = computed(() => {
      return props.isLoading ? [] : props.events;
    });

    const config = ref({
      // see configuration section
      locale: 'es-ES',
      // if not set, the mode defaults to 'week'. The three available options are 'month', 'week' and 'day'
      // Please note, that only day and month modes are available for the calendar in mobile-sized wrappers (~700px wide or less, depending on your root font-size)
      defaultMode: props.isLoading ? 'week' : 'day',
      showCurrentTime: true, // Display a line indicating the current time,
      isSilent: true,

      dayBoundaries: {
        start: 6,
        end: 18
      },
      style: {
        colorSchemes: {
          confirmada: {
            color: '#fff',
            backgroundColor: '#16A34A'
          },
          noConfirmada: {
            color: '#fff',
            backgroundColor: '#F59E0B'
          },
          cancelada: {
            color: '#fff',
            backgroundColor: '#EF4444'
          }
        }
      }
    });

    return {
      config,
      eventsComputed,
      eventEdit
    };
  }
};
</script>

<style scoped>
/* @import '../assets/css/style.css'; */
/* @import 'qalendar/dist/style.css'; */

.calendar-container {
  width: 100%;
  height: 750px;
  background-color: white;
}
</style>

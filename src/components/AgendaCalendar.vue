<template>
  <div class="calendar-container is-light-mode">
    <Qalendar :events="events" :config="config" />
  </div>
</template>

<script>
import { Qalendar } from 'qalendar';
export default {
  name: 'AgendaCalendar',
  components: {
    Qalendar
  },
  props: {},
  setup () {
    const events = [
      {
        title: 'Arturo Saldivar',
        with: 'Nutriologa Diana',
        topic: 'Confirmada',
        time: { start: '2023-11-28 08:00', end: '2023-11-28 09:00' },
        colorScheme: 'confirmada',
        id: '753944708f0f',
        description: 'Descripcion prueba'
      },
      {
        title: 'Pedro Lopez',
        with: 'Nutriologa Diana',
        topic: 'No confirmada',
        time: { start: '2023-11-28 10:00', end: '2023-11-28 10:30' },
        colorScheme: 'noConfirmada',
        id: '753944708f0f',
        description: 'Descripcion prueba'
      },
      {
        title: 'Jose Hernandez',
        with: 'Nutriologa Diana',
        topic: 'Cancelada',
        time: { start: '2023-11-28 12:00', end: '2023-11-28 13:00' },
        colorScheme: 'cancelada',
        id: '753944708f0f',
        description: 'Descripcion prueba'
      }
    ];

    const config = {
      // see configuration section
      locale: 'es-ES',
      // if not set, the mode defaults to 'week'. The three available options are 'month', 'week' and 'day'
      // Please note, that only day and month modes are available for the calendar in mobile-sized wrappers (~700px wide or less, depending on your root font-size)
      defaultMode: 'day',
      // showCurrentTime: true, // Display a line indicating the current time,
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
    };

    return {
      events,
      config
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

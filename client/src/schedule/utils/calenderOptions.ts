import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import {CalendarOptions} from '@fullcalendar/core';
import lvLocale from '@fullcalendar/core/locales/lv';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import {getFormattedDate} from './getFormattedDate';

export const calenderOptions: CalendarOptions = {
  locale: lvLocale,
  initialView: 'listMonth',
  headerToolbar: {
    center: 'listDay,listWeek,listMonth'
  },
  plugins: [dayGridPlugin, bootstrap5Plugin, listPlugin],
  themeSystem: 'bootstrap5',
  aspectRatio: 1.75,
  validRange: {
    start: getFormattedDate(new Date())
  },
  buttonText: {
    today: 'šodien',
    month: 'mēnesis',
    week: 'nedēļa',
    day: 'diena',
    listMonth: 'mēneši',
    listWeek: 'nedēļas',
    listDay: 'dienas'
  }
};

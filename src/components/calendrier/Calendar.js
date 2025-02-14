
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const Calendar = () => {
  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin]}  // Le plugin de calendrier mensuel
        initialView="dayGridMonth"  // Vue de départ : mois
      />
    </div>
  );
};

export default Calendar;

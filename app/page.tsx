import Calendar from "./components/Calendar";

import { addEvent, editEvent, deleteEvent, getEvents } from "./actions";

export default async function Home() {
  const events = await getEvents();
  return (
    <main>
      <Calendar
        events={events}
        addEvent={addEvent}
        editEvent={editEvent}
        deleteEvent={deleteEvent}
      />
    </main>
  );
}

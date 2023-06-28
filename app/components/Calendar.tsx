"use client";

import React, { Component, useCallback, useState } from "react";
import {
  Calendar as ReactBigCalendar,
  momentLocalizer,
  Event,
} from "react-big-calendar";
import moment from "moment";
import withDragAndDrop, {
  withDragAndDropProps,
} from "react-big-calendar/lib/addons/dragAndDrop";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { MapOrEntries, useMap } from "usehooks-ts";
import EditEventModal from "./EditEventModal";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(ReactBigCalendar);

type CalendarProps = {
  events: MapOrEntries<string, Event>;
  addEvent: (e: Event) => void;
  deleteEvent: (id: string) => void;
  editEvent: (e: Event) => void;
};

function Calendar(props: CalendarProps) {
  const [map, actions] = useMap(props.events);
  const [editingEventId, setEditingEventId] = useState<string | undefined>();
  const events = Array.from(map.values());

  function editEvent(event: Event) {
    actions.set(event.resource, event);
    props.editEvent(event);
  }

  const changeEventTimes: withDragAndDropProps["onEventDrop"] = (data) => {
    const newEvent: Event = {
      ...data.event,
      start: new Date(data.start),
      end: new Date(data.end),
    };
    editEvent(newEvent);
  };

  const handleSelectSlot = ({ start, end }: Event) => {
    const resourceId = Date.now().toString();
    const newEvent = {
      start,
      end,
      title: "New Event",
      resource: resourceId,
    };
    actions.set(resourceId, newEvent);
    props.addEvent(newEvent);
    setEditingEventId(resourceId);
  };

  const handleSelectEvent = (event: Event) => {
    setEditingEventId(event.resource);
  };

  const setTitle = (newTitle: string) => {
    if (editingEventId) {
      const newEvent: Event = {
        ...map.get(editingEventId),
        title: newTitle,
      };
      editEvent(newEvent);
    }
  };

  return (
    <div className="App">
      {editingEventId && (
        <EditEventModal
          title={editingEventId && map.get(editingEventId)?.title}
          setTitle={setTitle}
          release={() => {
            setEditingEventId(undefined);
          }}
          deleteEvent={() => {
            setEditingEventId(undefined);
            actions.remove(editingEventId);
            props.deleteEvent(editingEventId);
          }}
        />
      )}
      <DnDCalendar
        defaultDate={moment().toDate()}
        defaultView="month"
        events={events}
        localizer={localizer}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        onEventDrop={changeEventTimes}
        onEventResize={changeEventTimes}
        resizable
        selectable
        style={{ height: "100vh" }}
      />
    </div>
  );
}

export default Calendar;

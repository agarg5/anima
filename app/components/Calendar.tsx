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

function Calendar() {
  const initialResourceId = Date.now().toString();
  const initialValues: MapOrEntries<string, Event> = [
    [
      initialResourceId,
      {
        start: moment().toDate(),
        end: moment().add(1, "days").toDate(),
        title: "Some title",
        resource: initialResourceId,
      },
    ],
  ];
  const [map, actions] = useMap(initialValues);
  const [editingEventId, setEditingEventId] = useState<string | undefined>();
  const events = Array.from(map.values());

  const restructureEvent: withDragAndDropProps["onEventDrop"] = (data) => {
    actions.set(data.event.resource, {
      ...data.event,
      start: new Date(data.start),
      end: new Date(data.end),
    });
  };

  const handleSelectSlot = ({ start, end }: Event) => {
    const resourceId = Date.now().toString();
    actions.set(resourceId, {
      start,
      end,
      title: "New Event",
      resource: resourceId,
    });
    setEditingEventId(resourceId);
  };

  const handleSelectEvent = (event: Event) => {
    setEditingEventId(event.resource);
  };

  return (
    <div className="App">
      {editingEventId && (
        <EditEventModal
          title={editingEventId && map.get(editingEventId)?.title}
          setTitle={(newTitle) =>
            editingEventId &&
            actions.set(editingEventId, {
              ...map.get(editingEventId),
              title: newTitle,
            })
          }
          release={() => {
            setEditingEventId(undefined);
          }}
          deleteEvent={() => {
            setEditingEventId(undefined);
            actions.remove(editingEventId);
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
        onEventDrop={restructureEvent}
        onEventResize={restructureEvent}
        resizable
        selectable
        style={{ height: "100vh" }}
      />
    </div>
  );
}

export default Calendar;

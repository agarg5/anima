"use server";

import { PrismaClient } from "@prisma/client";
import { Event } from "react-big-calendar";
import reactNodeToString from "react-node-to-string";
import { MapOrEntries } from "usehooks-ts";

const prisma = new PrismaClient();

function transformEvent(event: Event) {
  return {
    title: reactNodeToString(event.title),
    id: `${event.resource}`,
    start: event.start,
    end: event.end,
  };
}

export async function addEvent(event: Event) {
  await prisma.event.create({
    data: transformEvent(event),
  });
}
export async function editEvent(event: Event) {
  const eventTransformed = transformEvent(event);
  await prisma.event.update({
    where: { id: eventTransformed.id },
    data: eventTransformed,
  });
}
export async function deleteEvent(id: string) {
  await prisma.event.delete({ where: { id } });
}

export async function getEvents() {
  return (await prisma.event
    .findMany()
    .then((events) =>
      events.map((e) => [e.id, { ...e, resource: e.id }])
    )) as MapOrEntries<string, Event>;
}

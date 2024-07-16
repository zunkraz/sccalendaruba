import moment from 'moment';

interface Event {
  id?: string;
  start: number;
  end: number;
  title: string;
  startWeek?: number;
  endWeek?: number;
}

interface Events {
  [time: number]: Event[];
}

const CalendarEventHandler = (function () {
  /**
   * Add event after adding meta data in the event
   * @param {Events} allEvents - Object of all the events
   * @param {Event} newEvent - Event object of the new event
   * @returns {Events} allEvents - A new object reference for all events
   */
  function addEvent(allEvents: Events, newEvent: Event): Events {
    const time = moment(newEvent.start).hours();
    const eventWithMetaInfo = {
      ...newEvent,
      startWeek: moment(newEvent.start).week(),
      endWeek: moment(newEvent.end).week(),
    };
    if (allEvents[time]) {
      allEvents[time].push(eventWithMetaInfo);
    } else {
      allEvents[time] = [eventWithMetaInfo];
    }
    return { ...allEvents };
  }

  /**
   * Generate unique id for an event
   * @param {Event} event - Event object
   * @returns {string} id - Unique id
   */
  function generateUniqueId(event: Event): string {
    return `${event.start}${event.title}${event.end}`;
  }

  /**
   * Deletes event from the list
   * @param {string} eventId - Id of the event to be deleted
   * @param {Events} allEvents - Object of all the events
   * @returns {Events} allEvents - A new object reference for all events
   */
  function deleteEvent(eventId: string, allEvents: Events): Events {
    Object.keys(allEvents).forEach((time) => {
      allEvents[+time] = allEvents[+time].filter((event) => event.id !== eventId);
    });
    return { ...allEvents };
  }

  /**
   * Updates an event from the list
   * @param {string} eventId - Id of the event to be updated
   * @param {Event} updatedEvent - Event object with the updated data
   * @param {Events} allEvents - Object of all the events
   * @returns {Events} allEvents - A new object reference for all events
   */
  function updateEvent(eventId: string, updatedEvent: Event, allEvents: Events): Events {
    Object.keys(allEvents).forEach((time) => {
      allEvents[+time] = allEvents[+time].map((event) =>
        event.id === eventId ? { ...event, ...updatedEvent } : event
      );
    });
    return { ...allEvents };
  }

  return {
    add: addEvent,
    delete: deleteEvent,
    update: updateEvent,
    generateId: generateUniqueId,
  };
})();

export default CalendarEventHandler;

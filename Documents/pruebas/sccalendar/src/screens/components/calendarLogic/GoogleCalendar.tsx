import { useState, useEffect } from 'react';
import WeekView from './WeekView.tsx';
import CalendarEventHandler from './calendarEventHandler.ts';
import {useSelector} from "react-redux";
import {RootState} from "@reduxjs/toolkit/query";
import eventsState from "../../../redux/events/eventsState.tsx";

const GoogleCalendar = () => {
    const eventsState = useSelector(state => state.events)
    const [events, setEvents] = useState( eventsState?.events || {});

    // setEvents(eventsState?.events);
    // const handleBeforeUnload = () => {
    //     localStorage.setItem('events', JSON.stringify(events));
    // };
    //
    // window.addEventListener('beforeunload', handleBeforeUnload);
    //
    // return () => {
    //     window.removeEventListener('beforeunload', handleBeforeUnload);
    // };
    useEffect(() => {

        console.log(eventsState.events);
        setEvents(eventsState.events || {});
    }, [eventsState]);

    const addNewEvent = (event) => {
        event = {
            ...event,
            id: CalendarEventHandler.generateId(event),
        };
        setEvents((prevEvents) => CalendarEventHandler.add(prevEvents, event));
    };

    const updateEvent = (eventId, updatedEvent) => {
        setEvents((prevEvents) =>
            CalendarEventHandler.update(eventId, updatedEvent, prevEvents)
        );
    };

    const deleteEvent = (eventId) => {
        setEvents((prevEvents) =>
            CalendarEventHandler.delete(eventId, prevEvents)
        );
    };

    return (
        <WeekView
            events={events}
            onNewEvent={addNewEvent}
            onEventUpdate={updateEvent}
            onEventDelete={deleteEvent}
        />
    );
};

export default GoogleCalendar;

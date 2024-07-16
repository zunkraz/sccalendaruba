import React, { useState } from 'react';
import moment from 'moment';
import AddEventModal from './AddEventModal';
import { generateWeekViewCoordinates } from '../utils.ts';
import { eventHighlighter } from './styles.ts';

const EventHighlighter = (props) => {
    const [showEditEventModal, setShowEditEventModal] = useState(false);
    const [eventNewStart, setEventNewStart] = useState(null);
    const [eventNewEnd, setEventNewEnd] = useState(null);

    const deleteEvent = () => {
        props.onEventDelete(props.event.id);
        setShowEditEventModal(false);
    };

    const updateEvent = (title) => {
        props.onEventUpdate(props.event.id, {
            title,
            start: eventNewStart,
            end: eventNewEnd,
        });
        setShowEditEventModal(false);
    };

    const openEditEventModal = () => {
        setShowEditEventModal(true);
        setEventNewStart(props.event.start);
        setEventNewEnd(props.event.end);
    };

    const onCurrentEventTimeChange = (dates) => {
        setEventNewStart(+dates[0]);
        setEventNewEnd(+dates[1]);
    };

    const closeModal = () => {
        setShowEditEventModal(false);
    };

    return (
        <React.Fragment>
            <AddEventModal
                editMode={true}
                eventTitle={props.event.title}
                visible={showEditEventModal}
                onCancel={deleteEvent}
                onClose={closeModal}
                onOk={updateEvent}
                eventStart={eventNewStart}
                eventEnd={eventNewEnd}
                onTimeChange={onCurrentEventTimeChange}
            />
            <div
                onClick={openEditEventModal}
                style={{
                    ...generateWeekViewCoordinates(props.event, props.startDate),
                    ...eventHighlighter,
                }}
            >
                {props.event.title} <br />
                <span style={{ fontSize: 10 }}>
          {moment(props.event.start).format('hh:mm a')} - {moment(props.event.end).format('hh:mm a')}
        </span>
            </div>
        </React.Fragment>
    );
};

export default EventHighlighter;

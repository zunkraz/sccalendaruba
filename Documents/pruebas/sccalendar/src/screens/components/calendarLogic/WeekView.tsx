import React, { useState } from 'react';
import moment from 'moment';
import { Row, Col } from 'antd';
import AddEventModal from './components/AddEventModal.tsx';
import WeekToolbar from './components/WeekToolbar.tsx';
import WeekHeader from './components/WeekHeader';
import TimeSlotGroup from './components/TimeSlotGroup';
import EventHighlighter from './components/EventHighlighter';
import { times, getAllDaysInTheWeek } from './utils.ts';
import { container } from './components/styles.ts';
import SideBar from "../SideBar.tsx";
import CusotmFooter from "../CusotmFooter.tsx";

const WeekView = (props) => {
    const [startDate, setStartDate] = useState(+moment());
    const [weekDays, setWeekDays] = useState(getAllDaysInTheWeek());
    const [showAddEventModal, setShowAddEventModal] = useState(false);
    const [eventStart, setEventStart] = useState(null);
    const [eventEnd, setEventEnd] = useState(null);

    const goToToday = () => {
        setStartDate(+moment());
        setWeekDays(getAllDaysInTheWeek());
    };

    const openAddEventModal = (dateStamp, time) => {
        const start = moment(dateStamp).set('hour', time);
        const end = start.clone().add(1, 'hour');
        setShowAddEventModal(true);
        setEventStart(+start);
        setEventEnd(+end);
    };

    const onCloseAddEventModal = () => {
        setShowAddEventModal(false);
    };

    const onOkAddEventModal = (title) => {
        props.onNewEvent({
            title,
            start: eventStart,
            end: eventEnd,
        });
        setShowAddEventModal(false);
    };

    const onCurrentEventTimeChange = (dates) => {
        setEventStart(+dates[0]);
        setEventEnd(+dates[1]);
    };

    const { events } = props;

    return (
        <Row style={{ height: '93vh' }}>
            {/* Sidebar */}
            <Col span={4}>
                <SideBar />
            </Col>

            {/* Main Content */}
            <Col span={17}>
                <div style={container}>
                    <AddEventModal
                        visible={showAddEventModal}
                        onCancel={onCloseAddEventModal}
                        onClose={onCloseAddEventModal}
                        onOk={onOkAddEventModal}
                        eventStart={eventStart}
                        eventEnd={eventEnd}
                        onTimeChange={onCurrentEventTimeChange}
                    />

                    <WeekToolbar
                        startDate={startDate}
                        goToToday={goToToday}
                    />

                    <WeekHeader weekDays={weekDays} />

                    {times.map((time) => (
                        <TimeSlotGroup
                            key={time}
                            time={time}
                            weekDays={weekDays}
                            events={events[time]}
                            openAddEventModal={openAddEventModal}
                        >
                            {events[time] &&
                                events[time].map((event) =>
                                        event.startWeek <= moment(startDate).week() &&
                                        event.endWeek >= moment(startDate).week() && (
                                            <EventHighlighter
                                                onEventDelete={props.onEventDelete}
                                                onEventUpdate={props.onEventUpdate}
                                                key={event.title + event.end + event.start}
                                                startDate={startDate}
                                                event={event}
                                            />
                                        )
                                )}
                        </TimeSlotGroup>
                    ))}
                </div>
            </Col>
            <Col span={3}/>
        </Row>
    );
};

export default WeekView;

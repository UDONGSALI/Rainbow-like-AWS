// 1. Import Section
import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Holidays from 'date-holidays';
import { SERVER_URL } from "../Common/constants";
import styles from '../../../css/component/Edu/EduCalendar.module.css';

const localizer = momentLocalizer(moment);

// 2. Constants and Utility Functions
const hd = new Holidays();
hd.init('KR');
const currentYearHolidays = hd.getHolidays(new Date().getFullYear());

const formatHolidaysToEvents = holidays => holidays.flatMap(holiday => {
    const startDate = new Date(holiday.date);
    const endDate = new Date(holiday.end || holiday.date);
    const events = [];
    for (let d = startDate; d < endDate; d.setDate(d.getDate() + 1)) {
        events.push({
            title: holiday.name,
            start: new Date(d),
            end: new Date(d),
            allDay: true,
            isHoliday: true
        });
    }
    return events;
});

const eventStyleGetter = event => event.isHoliday ? {
    style: {
        backgroundColor: "transparent",
        color: "red",
        borderRadius: "5px"
    }
} : {
    style: {
        fontSize:'12px',
        background: 'none',
        color: "black",
        border: '1px solid red',
        overflow: 'hidden',
        wordBreak:'keep-all'
    }
};

const formatDate = inputDate => moment(inputDate).format('YYYY.MM');

// 3. EduCalendar Component
function EduCalendar() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchEdus();
    }, []);

    const fetchEdus = async () => {
        try {
            const response = await fetch(SERVER_URL + 'api/edus');
            const data = await response.json();
            const formattedEdus = data._embedded.edus.map(edu => ({
                id: edu._links.edu.href,
                ...edu
            }));
            const calendarEvents = formattedEdus.map(edu => ({
                title: edu.eduName,
                start: new Date(edu.eduStdt),
                end: new Date(edu.eduEddt),
                allDay: edu.eduStdt.split('T')[0] === edu.eduEddt.split('T')[0],
                eduNum: parseInt(edu._links.edu.href.split('/').pop(), 10)
            }));
            setEvents([
                ...calendarEvents,
                ...formatHolidaysToEvents(currentYearHolidays)
            ]);
        } catch (error) {
            console.error(error);
        }
    };

    const handleEventClick = event => {
        if (!event.isHoliday) {
            window.location.href = `/edu/list/detail/${event.eduNum}`;
        }
    };

    const CustomToolbar = toolbar => {
        const goTo = (type) => {
            if (type === 'prev') toolbar.date.setMonth(toolbar.date.getMonth() - 1);
            if (type === 'next') toolbar.date.setMonth(toolbar.date.getMonth() + 1);
            if (type === 'current') {
                const now = new Date();
                toolbar.date.setMonth(now.getMonth());
                toolbar.date.setYear(now.getFullYear());
            }
            toolbar.onNavigate(type);
        };

        return (
            <div className={styles.rbcToolbar}>
                <span className={styles.rbcBtnGroup}>
                    <button type="button" onClick={() => goTo('prev')}>&lt;</button>
                    <span onClick={() => goTo('current')}>{formatDate(toolbar.date)}</span>
                    <button type="button" onClick={() => goTo('next')}>&gt;</button>
                </span>
            </div>
        );
    };

    return (
        <div className={styles.calendarContainer}>
            <div className={styles.calendarContent}>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    onSelectEvent={handleEventClick}
                    eventPropGetter={eventStyleGetter}
                    components={{ toolbar: CustomToolbar }}
                />
            </div>
        </div>
    );
}

export default EduCalendar;
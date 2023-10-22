import React, { useEffect, useState } from 'react';
import Holidays from "date-holidays";
import styles from '../../../../css/component/Main/Edu/CustomCalendar.module.css';

function CustomCalendar({ edus }) {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const lastDay = new Date(year, month, 0).getDate();

    const [holidayDates, setHolidayDates] = useState([]);

    useEffect(() => {
        const hd = new Holidays();
        hd.init('KR');
        const holidaysForThisMonth = hd.getHolidays(year).filter(
            h => new Date(h.date).getMonth() + 1 === month
        );

        setHolidayDates(holidaysForThisMonth.map(h => new Date(h.date).getDate()));
    }, [month, year]);

    const isDateInCurrentMonth = (dateValue) => {
        const eduDate = new Date(year, month - 1, dateValue);
        return eduDate.getMonth() + 1 === month && eduDate.getFullYear() === year;
    };

    const eduDates = edus
        .map(edu => new Date(edu.eduStdt).getDate())
        .filter(isDateInCurrentMonth);

    const getClassNamesForDay = (day) => {
        const dayOfWeek = new Date(year, month - 1, day).getDay();
        return [
            styles.day,
            dayOfWeek === 0 && styles.sunday,
            dayOfWeek === 6 && styles.saturday,
            holidayDates.includes(day) && styles.holiday,
            day === date && styles.currentDay,
            eduDates.includes(day) && styles.eduDay
        ].filter(Boolean).join(' ');
    };

    return (
        <div className={styles.calendarContainer}>
            <span className={styles.yearText}>{year}</span>
            <div className={styles.monthText}>{month}</div>
            {Array.from({ length: lastDay }, (_, i) => i + 1).map(day => (
                <span
                    key={day}
                    className={getClassNamesForDay(day)}
                >
                    {day.toString().padStart(2, '0')}
                </span>
            ))}
        </div>
    );
}

export default CustomCalendar;

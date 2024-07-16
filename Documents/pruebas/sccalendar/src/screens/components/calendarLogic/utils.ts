import moment from 'moment';

interface Day {
  date: number;
  dateStamp: number;
  weekDayName: string;
}

/**
 * Generate all days in a week
 * @returns {Day[]} days - All days in the week with date, dateStamp and weekDayName
 */
// export const getAllDaysInTheWeek = (currentDate = moment ()): Day[] => {
//     const startOfWeek = currentDate.clone().startOf('isoWeek');  // Empieza el lunes de la semana actual
//     const days = Array.from(Array(5))  // Genera un array con 5 elementos para lunes a viernes
//         .map((_, index) => index)
//         .map(day =>
//             moment(startOfWeek).add(day, 'days').set('minutes', 0).set('seconds', 0)
//         )
//         .map(momentObj => ({
//             date: momentObj.date(),
//             dateStamp: +momentObj,
//             weekDayName: momentObj.format('ddd'),
//         }));
//
//     return days;
// };

export const getAllDaysInTheWeek = (currentDate = moment ()) => {
    const weekStart = currentDate.clone ().startOf ('week');

    const days = Array.from (Array (7))
        .map ((day, index) => index)
        .map (day =>
            moment (weekStart).add (day, 'days').set ('minutes', 0).set ('seconds', 0)
        )
        .map (momentObj => ({
            date: momentObj.date (),
            dateStamp: +momentObj,
            weekDayName: momentObj.format ('ddd'),
        }));

    return days;
};

// All the hours in the day
export const times: number[] = [
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
];

/**
 * Checks if the dateStamp represents today's date
 * @param {number} dateStamp - Date Stamp to check
 * @return {boolean}
 */
export const isTodaysDate = (dateStamp: number): boolean => {
  const today = moment();
  const dateToCheck = moment(dateStamp);
  return (
    moment.duration(dateToCheck.diff(today)).days() === 0 &&
    today.day() === dateToCheck.day()
  );
};

/**
 * Generated coordinated for the highlight
 * @param {Object} event - Event object
 * {
 *  start: Time stamp for the start of the event :timeStamp,
 *  title: Title fo the new event :String,
 *  end: Time stamp for the end of the event :timeStamp,
 * }
 * @param {timeStamp} startDate - Timestamp of any date in the current week
 * @returns {Object} coordinates - Coordinates object with
 * {
 *  top - CSS top of the element,
 *  left - CSS left of the element,
 *  width - CSS width of the element,
 *  height - CSS height of the element
 * }
 */
export const generateWeekViewCoordinates = (event, startDate) => {
    const start = moment (event.start);
    const end = moment (event.end);
    const duration = moment.duration (end.diff (start));
    const weekStart = moment (startDate);

    // Calculating Top
    const top = start.minutes () === 30 ? '50%' : '0%';

    // Calculating height
    const timeFactor = duration.hours () + duration.minutes () / 60;
    const height = timeFactor * 100;

    let left, width;
    if (weekStart.week () === start.week ()) {
        const weekDay = start.weekday ();
        left = (weekDay + 1) * 12.5;
    }

    if (
        weekStart.week () === start.week () &&
        weekStart.week () === end.week ()
    ) {
        const daysDiff = duration.days ();
        width = (daysDiff + 1) * 12.5 - 2;
    }

    if (weekStart.week () > start.week () && weekStart.week () === end.week ()) {
        const daysDiff = moment
            .duration (
                end.diff (
                    weekStart
                        .startOf ('week')
                        .set ('hours', start.hours ())
                        .set ('minutes', start.minutes ())
                )
            )
            .days ();
        width = (daysDiff + 1) * 12.5 - 2;
    }

    if (weekStart.week () > start.week ()) {
        left = 12.5;
    }

    if (weekStart.week () < end.week ()) {
        width = 100 - left;
    }

    return {
        top: top + '%',
        left: left + '%',
        height: height + '%',
        width: width + '%',
    };
};

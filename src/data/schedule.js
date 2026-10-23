// Weekly timetable: one entry per day, one event per class (sorted by start time).
// type drives the colour and the filter tabs in Home.jsx / School.jsx.
// Rendered by ScheduleTable.jsx and used by SEO.jsx for the opening hours Google shows.
export const scheduleData = [
    {
        day: 'schedule.header.mon',
        schemaDay: 'Monday',
        events: [
            { start: '18:30', end: '19:30', type: 'beginner', title: 'schedule.class.primary', level: 'schedule.level.beginner' },
            { start: '18:30', end: '20:30', type: 'games', title: 'schedule.free_play', level: 'schedule.tab.games' }
        ]
    },
    {
        day: 'schedule.header.tue',
        schemaDay: 'Tuesday',
        events: [
            { start: '18:30', end: '20:00', type: 'intermediate', title: 'schedule.group.eso_bat', level: 'schedule.level.intermediate' }
        ]
    },
    {
        day: 'schedule.header.wed',
        schemaDay: 'Wednesday',
        events: [
            { start: '17:30', end: '18:30', type: 'beginner', title: 'schedule.class.early_primary', level: 'schedule.level.beginner' },
            { start: '18:30', end: '19:30', type: 'beginner', title: 'schedule.class.primary', level: 'schedule.level.beginner' },
            { start: '18:30', end: '19:30', type: 'beginner', title: 'schedule.class.adults_beginner', level: 'schedule.level.beginner' },
            { start: '19:30', end: '21:00', type: 'intermediate', title: 'schedule.class.adults', level: 'schedule.level.intermediate' }
        ]
    },
    {
        day: 'schedule.header.thu',
        schemaDay: 'Thursday',
        events: [
            { start: '19:30', end: '21:00', type: 'advanced', title: 'schedule.class.advanced', level: 'schedule.level.advanced' }
        ]
    },
    {
        day: 'schedule.header.fri',
        schemaDay: 'Friday',
        events: [
            { start: '18:30', end: '20:30', type: 'games', title: 'schedule.free_play', level: 'schedule.tab.games' }
        ]
    }
];

// Club opening hours per day: from the first class to the last one (schema.org format)
export const openingHours = scheduleData.map(({ schemaDay, events }) => ({
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": schemaDay,
    "opens": events.map(e => e.start).sort()[0],
    "closes": events.map(e => e.end).sort().at(-1)
}));

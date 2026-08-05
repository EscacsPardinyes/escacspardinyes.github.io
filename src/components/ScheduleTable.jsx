import { useLanguage } from '../context/LanguageContext';

export default function ScheduleTable({ activeTab = 'all' }) {
    const { t } = useLanguage();

    const scheduleData = [
        {
            timeStart: "18:30",
            timeEnd: "19:30",
            days: [
                { type: 'beginner', title: 'schedule.class.primary', level: 'schedule.level.beginner' }, // Mon
                null, // Tue
                { type: 'beginner', title: 'schedule.class.adults_primary', level: 'schedule.level.beginner' }, // Wed
                null, // Thu
                null // Fri
            ]
        },
        {
            timeStart: "18:30",
            timeEnd: "20:00",
            days: [
                null, // Mon
                { type: 'intermediate', title: 'schedule.group.eso_bat', level: 'schedule.level.intermediate' }, // Tue
                null, // Wed
                null, // Thu
                null // Fri
            ]
        },
        {
            timeStart: "19:30",
            timeEnd: "21:00",
            days: [
                null, // Mon
                null, // Tue
                { type: 'intermediate', title: 'schedule.class.adults', level: 'schedule.level.intermediate' }, // Wed
                { type: 'advanced', title: 'schedule.class.advanced', level: 'schedule.level.advanced' }, // Thu
                null // Fri
            ]
        }
    ];

    // Filter rows based on activeTab
    const filteredSchedule = scheduleData.filter(row => {
        if (activeTab === 'all') return true;
        return row.days.some(dayData => {
            if (!dayData) return false;
            if (Array.isArray(dayData)) return dayData.some(d => d.type === activeTab);
            return dayData.type === activeTab;
        });
    });

    if (filteredSchedule.length === 0) {
        return null;
    }

    return (
        <div className={`container tab-pane fade show active p-0`}>
            <div className="table-responsive">
                <table className="table table-bordered table-lg m-0">
                    <thead className="bg-secondary text-white text-center">
                        <tr>
                            <th>{t('schedule.header.time')}</th>
                            <th>{t('schedule.header.mon')}</th>
                            <th>{t('schedule.header.tue')}</th>
                            <th>{t('schedule.header.wed')}</th>
                            <th>{t('schedule.header.thu')}</th>
                            <th>{t('schedule.header.fri')}</th>
                        </tr>
                    </thead>
                    <tbody className="text-center align-middle">
                        {filteredSchedule.map((row, index) => (
                            <tr key={index}>
                                <th className="bg-secondary text-white">
                                    <time dateTime={row.timeStart}>{row.timeStart}</time> - <time dateTime={row.timeEnd}>{row.timeEnd}</time>
                                </th>
                                {row.days.map((dayData, dayIndex) => {
                                    const events = Array.isArray(dayData) ? dayData : (dayData ? [dayData] : []);
                                    const eventsToShow = activeTab === 'all' 
                                        ? events 
                                        : events.filter(e => e.type === activeTab);
                                    
                                    return (
                                        <td key={dayIndex}>
                                            {eventsToShow.map((e, i) => (
                                                <div key={i} className={i > 0 ? "mt-3" : ""}>
                                                    <h5>{t(e.title)}</h5>
                                                    {e.level && <p className="text-muted mb-0">{t(e.level)}</p>}
                                                </div>
                                            ))}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

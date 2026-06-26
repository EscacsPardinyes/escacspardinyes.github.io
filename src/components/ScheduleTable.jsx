import { useLanguage } from '../context/LanguageContext';

export default function ScheduleTable({ activeTab = 'all' }) {
    const { t } = useLanguage();

    const scheduleData = [
        {
            timeStart: "18:30",
            timeEnd: "19:30",
            days: [
                { type: 'games', title: 'schedule.free_play' }, // Mon
                { type: 'intermediate', title: 'schedule.group.eso_bat', level: 'schedule.level.intermediate' }, // Tue
                { type: 'beginner', title: 'schedule.class.adults_primary', level: 'schedule.level.beginner' }, // Wed
                null, // Thu
                { type: 'games', title: 'schedule.free_play' } // Fri
            ]
        },
        {
            timeStart: "19:30",
            timeEnd: "20:30",
            days: [
                { type: 'games', title: 'schedule.free_play' }, // Mon
                null, // Tue
                { type: 'intermediate', title: 'schedule.class.adults', level: 'schedule.level.intermediate' }, // Wed
                null, // Thu
                { type: 'games', title: 'schedule.free_play' } // Fri
            ]
        },
        {
            timeStart: "19:45",
            timeEnd: "21:15",
            days: [
                null, // Mon
                null, // Tue
                null, // Wed
                { type: 'advanced', title: 'schedule.class.adults', level: 'schedule.level.advanced' }, // Thu
                null // Fri
            ]
        }
    ];

    // Filter rows based on activeTab
    const filteredSchedule = scheduleData.filter(row => {
        if (activeTab === 'all') return true;
        return row.days.some(day => day && day.type === activeTab);
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
                                {row.days.map((day, dayIndex) => {
                                    const shouldShow = day && (activeTab === 'all' || day.type === activeTab);
                                    return (
                                        <td key={dayIndex}>
                                            {shouldShow ? (
                                                <>
                                                    <h5>{t(day.title)}</h5>
                                                    {day.level && <p className="text-muted">{t(day.level)}</p>}
                                                </>
                                            ) : null}
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

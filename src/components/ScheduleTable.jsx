import { useLanguage } from '../context/LanguageContext';
import { scheduleData } from '../data/schedule';

// Weekly timetable: one column per day, one card per class (data in src/data/schedule.js).

export default function ScheduleTable({ activeTab = 'all' }) {
    const { t } = useLanguage();

    return (
        <div className="schedule-week">
            {scheduleData.map(({ day, events }) => (
                <section key={day} className="schedule-day" aria-label={t(day)}>
                    <h3 className="schedule-day-name">{t(day)}</h3>
                    <ul className="schedule-events">
                        {events.map((e, i) => {
                            // Filtered-out classes are dimmed, not removed, so the week keeps its shape
                            const dimmed = activeTab !== 'all' && e.type !== activeTab;
                            return (
                                <li key={i} className={`schedule-event schedule-event-${e.type}${dimmed ? ' is-dimmed' : ''}`} aria-hidden={dimmed || undefined}>
                                    <p className="schedule-event-time">
                                        <i className="far fa-clock mr-2" aria-hidden="true"></i>
                                        <time dateTime={e.start}>{e.start}</time> – <time dateTime={e.end}>{e.end}</time>
                                    </p>
                                    <h4 className="schedule-event-title">{t(e.title)}</h4>
                                    <span className="schedule-event-level">{t(e.level)}</span>
                                </li>
                            );
                        })}
                    </ul>
                </section>
            ))}
        </div>
    );
}

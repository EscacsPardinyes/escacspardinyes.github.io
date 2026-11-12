import { Link } from './LocalizedLink';
import { useLanguage } from '../context/LanguageContext';
import { circuitUi } from '../data/circuitStrings';

export default function CircuitCard({ tournament: tr }) {
    const { t, language } = useLanguage();
    const u = circuitUi[language] || circuitUi.ca;
    return (
        <li className="circuit-item">
            <Link to={tr.path} className="circuit-poster" tabIndex="-1" aria-hidden="true">
                <img src={tr.poster} alt="" width="560" height="700" loading="lazy" decoding="async" />
            </Link>
            <div className="circuit-body">
                <span className="patro-badge">{tr.month}</span>
                <h3 className="circuit-title"><Link to={tr.path}>{tr.title}</Link></h3>
                <p className="circuit-tagline">{tr.tagline}</p>
                <ul className="list-unstyled circuit-facts">
                    <li><i className="fa fa-calendar-alt mr-2" aria-hidden="true"></i><strong>{u.date}:</strong> {tr.dates || u.toConfirm(tr.month)}</li>
                    {tr.time && <li><i className="fa fa-clock mr-2" aria-hidden="true"></i><strong>{u.startTime}:</strong> {tr.time}</li>}
                    <li><i className="fa fa-map-pin mr-2" aria-hidden="true"></i><strong>{u.place}:</strong> {tr.place || u.placeTbc}</li>
                </ul>
                <Link to={tr.path} className="btn btn-outline-primary btn-sm mt-auto align-self-start">{t('circuitinfo.more')}</Link>
            </div>
        </li>
    );
}

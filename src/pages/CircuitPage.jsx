import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';
import CircuitSignupForm from '../components/CircuitSignupForm';
import { Link, Navigate } from '../components/LocalizedLink';
import { useLanguage } from '../context/LanguageContext';
import { circuitConfig } from '../data/circuitConfig';
import { circuitUi } from '../data/circuitStrings';
import { localizeConfig } from '../data/circuitTranslations';

// Grups de dades segons l'etiqueta de cada fet de circuitConfig (les etiquetes són sempre en català)
const RULE_LABELS = ['Per a qui', 'Format', 'Durada', 'Ritme de joc', 'Objectiu', 'Sistema', 'Vàlid per a', 'Inscripció', 'Inscripció jugadors del club', 'Inscripció convidats', 'Inscripció reduïda'];

export default function CircuitPage({ id }) {
    const { t, language } = useLanguage();
    const base = circuitConfig[id];
    if (!base) return <Navigate to="/404" />;

    const config = localizeConfig(base, id, language);
    const ui = circuitUi[language] || circuitUi.ca;
    // Només les pàgines amb traducció mostren els textos fixos en aquell idioma
    const translated = config !== base;
    const u = translated ? ui : circuitUi.ca;

    const { poster, posterPieces, title, month, tagline, description, paragraphs, facts, dates, place, previous, prizes = [], prizeTotal, prizeNote, prizeGroups, time, formType, related, federatedOnly, organizer, collaborators = [], birthFrom, birthTo } = config;
    const breadcrumbs = [{ label: t('tornejos.breadcrumb'), path: '/tornejos' }, { label: title }];
    const rules = facts.filter(([label]) => RULE_LABELS.includes(label));

    const eventSchema = {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": title,
        "description": description,
        "eventStatus": "https://schema.org/EventScheduled",
        "location": {
            "@type": "Place",
            "name": "Club Escacs Pardinyes",
            "address": { "@type": "PostalAddress", "addressLocality": "Lleida", "addressCountry": "ES" }
        },
        "organizer": { "@type": "Organization", "name": "Club Escacs Pardinyes", "url": "https://escacspardinyes.com" }
    };

    return (
        <>
            <SEO title={title} description={description} image={poster} schema={eventSchema} breadcrumbs={breadcrumbs} />
            <PageHeader title={title} breadcrumbs={breadcrumbs} />

            <div className="container pb-5">
                <h2 className="text-center font-weight-bold mb-5">{title}</h2>
                <div className="row">
                    <div className="col-lg-6 mb-5 mb-lg-0">
                        <h3 className="mb-3">{tagline}</h3>
                        {paragraphs.map((p, i) => <p key={i}>{p}</p>)}

                        {poster && (
                            <div className="my-4 text-center">
                                <a href={poster} target="_blank" rel="noopener noreferrer">
                                    <img src={poster.replace('.webp', '-sm.webp')} alt={u.posterAlt(title)} width="560" height="700" decoding="async" className="img-fluid rounded shadow" style={{ maxWidth: '440px', width: '100%' }} loading="lazy" />
                                </a>
                                <small className="d-block mt-2"><a href={poster} download={`cartell-${id}.webp`}>{u.downloadPoster}</a></small>
                                {posterPieces && <small className="d-block text-muted" style={{ fontSize: '.75rem' }}>{u.pieces}</small>}
                            </div>
                        )}

                        <h4 className="mt-4 mb-2"><i className="fa fa-map-marker-alt text-primary mr-2"></i>{u.info}</h4>
                        <ul className="list-unstyled ml-4">
                            <li><i className="fa fa-calendar-alt text-primary mr-2"></i><strong>{u.date}:</strong> {dates || u.toConfirm(month)}</li>
                            {time && <li><i className="fa fa-clock text-primary mr-2"></i><strong>{federatedOnly ? u.roundStart : u.startTime}:</strong> {time}</li>}
                            <li><i className="fa fa-map-pin text-primary mr-2"></i><strong>{u.place}:</strong> {place || u.placeTbc}</li>
                        </ul>

                        {rules.length > 0 && (
                            <>
                                <h4 className="mt-4 mb-2"><i className="fa fa-book-open text-primary mr-2"></i>{u.rules}</h4>
                                <ul className="list-unstyled ml-4">
                                    {rules.map(([label, text]) => <li key={label}><strong>{u.labels[label] || label}:</strong> {text}</li>)}
                                </ul>
                            </>
                        )}

                        {!prizeGroups && prizes.length > 0 && (
                            <>
                                <h4 className="mt-4 mb-2"><i className="fa fa-trophy text-warning mr-2"></i>{u.prizes}</h4>
                                <ul className="list-unstyled ml-4">
                                    {prizes.map(text => <li key={text}><i className="fa fa-check text-warning mr-2"></i>{text}</li>)}
                                </ul>
                            </>
                        )}

                        {organizer && (
                            <>
                                <h4 className="mt-4 mb-2"><i className="fa fa-chess-knight text-primary mr-2"></i>{u.organizes}</h4>
                                <div className="row">
                                    <div className="col-sm-4 mb-3">
                                        <div className="h-100 bg-white rounded shadow-sm p-3 text-center d-flex flex-column justify-content-between">
                                            <div className="d-flex align-items-center justify-content-center mb-2" style={{ height: '90px' }}>
                                                <img src={organizer.logo} alt={organizer.name} style={{ maxHeight: '90px', maxWidth: '100%', width: 'auto' }} onError={(e) => { e.target.style.display = 'none'; }} />
                                            </div>
                                            <strong className="small">{organizer.name}</strong>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {collaborators.length > 0 && (
                            <>
                                <h4 className="mt-4 mb-3"><i className="fa fa-handshake text-primary mr-2"></i>{u.collaborate}</h4>
                                <div className="row">
                                    {collaborators.map(c => (
                                        <div className="col-sm-4 mb-3" key={c.name}>
                                            <div className="h-100 bg-white rounded shadow-sm p-3 text-center d-flex flex-column justify-content-between">
                                                <div className="d-flex align-items-center justify-content-center mb-2" style={{ height: '90px' }}>
                                                    <img src={c.logo} alt={c.name} style={{ maxHeight: '90px', maxWidth: '100%', width: 'auto' }} onError={(e) => { e.target.style.display = 'none'; }} />
                                                </div>
                                                <strong className="small">{c.name}</strong>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {related && <div className="alert alert-warning mt-4"><i className="fa fa-chess-knight mr-2"></i>{related.text} <Link to={related.path}><strong>{related.label}</strong></Link></div>}

                        {previous && <p className="mt-4"><Link to={previous.path}>{previous.label}</Link></p>}
                    </div>

                    <div className="col-lg-6">
                        <h3 className="font-weight-bold mb-3">
                            <i className="fa fa-clipboard-list text-primary mr-2"></i>
                            {u.signup}
                        </h3>
                        <p className="mb-4">{u.signupText}</p>
                        <CircuitSignupForm tournament={title} birthFrom={birthFrom} birthTo={birthTo} federatedOnly={federatedOnly} formType={formType} lang={translated ? language : 'ca'} />
                    </div>
                </div>
            </div>

            {prizeGroups && (
                <div className="container pb-5">
                    {prizeTotal ? (
                        <div className="bg-dark text-center rounded p-4 mb-4" style={{ borderBottom: '5px solid #E31C25' }}>
                            <p className="text-white mb-1 text-uppercase small font-weight-bold">{u.prizePool}</p>
                            <div className="font-weight-bold" style={{ fontSize: '3rem', lineHeight: 1.1, color: '#ffc107' }}>{prizeTotal}</div>
                            <p className="text-white mb-0 small">{u.prizePoolSub}</p>
                            {prizeNote && <p className="mb-0 mt-2 small font-weight-bold" style={{ color: '#ffc107' }}>{prizeNote}</p>}
                        </div>
                    ) : (
                        <h3 className="text-center font-weight-bold mb-4"><i className="fa fa-trophy text-warning mr-2"></i>{u.prizes}</h3>
                    )}
                    <div className="row">
                        {prizeGroups.map(g => (
                            <div className="col-lg-6 mb-4" key={g.title}>
                                <div className="h-100 bg-white rounded shadow-sm p-3">
                                    <h4 className="mb-3"><i className={`fa fa-${g.icon} text-warning mr-2`}></i>{g.title}</h4>
                                    <table className="table table-sm table-borderless mb-1">
                                        <thead>
                                            <tr className="text-muted small text-uppercase">
                                                {g.head.map((h, i) => <th key={i} style={{ padding: '4px 8px' }}>{h}</th>)}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {g.rows.map((r, ri) => (
                                                <tr key={ri} style={{ borderTop: '1px solid #eee' }}>
                                                    {r.map((c, ci) => (
                                                        <td key={ci} className={ci === 0 ? 'font-weight-bold' : ''} style={{ padding: '5px 8px' }}>
                                                            {c === 'trofeu' ? <span className="badge badge-warning"><i className="fa fa-trophy mr-1"></i>{u.trophy}</span> : c}
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {g.note && <p className="small text-muted mb-0">{g.note}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="container pb-5">
                <hr className="mb-5" />
                <div className="row justify-content-center">
                    <div className="col-lg-8 text-center">
                        <h3 className="font-weight-bold mb-3">
                            <i className="fa fa-handshake text-primary mr-2"></i>
                            {u.sponsorQ}
                        </h3>
                        <p className="mb-4">{u.sponsorSub}</p>
                        <Link to="/patrocini#proposta" className="btn btn-outline-primary btn-lg px-5 py-3 rounded-pill shadow-sm">
                            <i className="fa fa-chess-knight mr-2"></i>
                            {u.sponsorBtn}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

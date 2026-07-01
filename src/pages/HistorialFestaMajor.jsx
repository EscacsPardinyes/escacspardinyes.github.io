import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';
import { historialFestaMajor } from '../data/historialFestaMajor';

export default function HistorialFestaMajor() {
    const anys = historialFestaMajor.map(h => h.any).sort((a, b) => b - a);
    const [selectedAny, setSelectedAny] = useState(anys[0]);

    const breadcrumbs = [
        { label: "Torneig de Festa Major", path: "/torneig-festa-major" },
        { label: "Historial i Classificacions" }
    ];

    const currentData = historialFestaMajor.find(h => h.any === selectedAny);

    if (!currentData) {
        return (
            <div className="container text-center py-5">
                <h3>No s'han trobat dades de classificació.</h3>
            </div>
        );
    }

    const eventSchema = {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": `Classificació ${currentData.titol}`,
        "description": currentData.cronica[0],
        "startDate": "2024-08-03T10:00:00+02:00",
        "location": {
            "@type": "Place",
            "name": "Centre Cívic Orvepard",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Pardinyes",
                "addressLocality": "Lleida",
                "postalCode": "25005",
                "addressCountry": "ES"
            }
        },
        "organizer": {
            "@type": "Organization",
            "name": "Club Escacs Pardinyes",
            "url": "https://escacspardinyes.com"
        }
    };

    return (
        <>
            <SEO 
                title={`Historial i Classificacions del Torneig de Festa Major`} 
                description={`Historial de guanyadors, cròniques i classificacions del Torneig d'Escacs de Festa Major de Pardinyes.`} 
                schema={eventSchema}
                breadcrumbs={breadcrumbs}
            />
            <PageHeader title="Historial i Classificacions" breadcrumbs={breadcrumbs} />

            <div className="container pb-5">
                {/* Selector d'anys */}
                {anys.length > 1 && (
                    <div className="d-flex justify-content-center mb-5">
                        <div className="btn-group shadow-sm rounded-lg" role="group" aria-label="Selector d'anys">
                            {anys.map(any => (
                                <button
                                    key={any}
                                    type="button"
                                    className={`btn btn-lg ${selectedAny === any ? 'btn-primary' : 'btn-outline-primary'}`}
                                    onClick={() => setSelectedAny(any)}
                                    style={{ minWidth: '120px', fontWeight: 'bold' }}
                                >
                                    {any}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Títol de l'edició */}
                <div className="text-center mb-5">
                    <h2 className="display-4 font-weight-bold mb-3">{currentData.titol}</h2>
                    <p className="text-muted">
                        <i className="fa fa-calendar-alt text-primary mr-2"></i>{currentData.data}
                        {currentData.darreraActualitzacio && (
                            <>
                                <span className="mx-2">|</span>
                                <i className="fa fa-edit text-primary mr-2"></i>Actualitzat: {currentData.darreraActualitzacio}
                            </>
                        )}
                    </p>
                </div>

                {/* Crònica */}
                {currentData.cronica && currentData.cronica.length > 0 && (
                    <div className="row justify-content-center mb-5">
                        <div className="col-lg-10">
                            <div className="bg-light p-4 rounded shadow-sm border-left border-primary" style={{ borderWidth: '4px !important' }}>
                                <h4 className="font-weight-bold mb-3 text-primary"><i className="fa fa-book-open mr-2"></i>Crònica del Torneig</h4>
                                {currentData.cronica.map((p, idx) => (
                                    <p key={idx} className="text-justify" style={{ fontSize: '1.05rem', lineHeight: '1.7' }}>{p}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Podi */}
                {currentData.podium && currentData.podium.length > 0 && (
                    <div className="row justify-content-center text-center mb-5 pt-3">
                        <div className="col-12">
                            <h3 className="font-weight-bold mb-4"><i className="fa fa-trophy text-warning mr-2"></i>El Podi Absolut</h3>
                        </div>
                        
                        {/* Subcampió (2n) */}
                        {currentData.podium.find(p => p.posicio === 2) && (
                            <div className="col-md-4 col-sm-6 order-2 order-md-1 mb-4">
                                <div className="bg-light p-4 rounded shadow-sm border h-100 d-flex flex-column justify-content-center" style={{ borderTop: '6px solid #6c757d', transform: 'scale(0.95)' }}>
                                    <span style={{ fontSize: '2.5rem' }} className="mb-2">🥈</span>
                                    <h4 className="font-weight-bold text-dark mb-1">{currentData.podium.find(p => p.posicio === 2).nom}</h4>
                                    <p className="text-muted mb-0">{currentData.podium.find(p => p.posicio === 2).club}</p>
                                    <p className="font-weight-bold text-secondary mt-3 mb-0">Sots-campió</p>
                                </div>
                            </div>
                        )}

                        {/* Campió (1r) */}
                        {currentData.podium.find(p => p.posicio === 1) && (
                            <div className="col-md-4 col-sm-6 order-1 order-md-2 mb-4">
                                <div className="bg-light p-4 rounded shadow border h-100 d-flex flex-column justify-content-center" style={{ borderTop: '8px solid #ffc107', transform: 'scale(1.05)', boxShadow: '0 8px 24px rgba(255, 193, 7, 0.15)' }}>
                                    <span style={{ fontSize: '3rem' }} className="mb-2">👑 🥇</span>
                                    <h3 className="font-weight-bold text-primary mb-1">{currentData.podium.find(p => p.posicio === 1).nom}</h3>
                                    <p className="text-muted mb-0">{currentData.podium.find(p => p.posicio === 1).club}</p>
                                    <p className="font-weight-bold text-warning mt-3 mb-0" style={{ fontSize: '1.15rem' }}>Campió Absolut</p>
                                </div>
                            </div>
                        )}

                        {/* Tercer (3r) */}
                        {currentData.podium.find(p => p.posicio === 3) && (
                            <div className="col-md-4 col-sm-6 order-3 order-md-3 mb-4">
                                <div className="bg-light p-4 rounded shadow-sm border h-100 d-flex flex-column justify-content-center" style={{ borderTop: '6px solid #cd7f32', transform: 'scale(0.95)' }}>
                                    <span style={{ fontSize: '2.5rem' }} className="mb-2">🥉</span>
                                    <h4 className="font-weight-bold text-dark mb-1">{currentData.podium.find(p => p.posicio === 3).nom}</h4>
                                    <p className="text-muted mb-0">{currentData.podium.find(p => p.posicio === 3).club}</p>
                                    <p className="font-weight-bold mt-3 mb-0" style={{ color: '#cd7f32' }}>Tercer Classificat</p>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Categories i Trams */}
                <div className="row mt-4">
                    {/* Trams i Especials */}
                    <div className="col-lg-6 mb-4">
                        <div className="bg-light p-4 rounded shadow-sm h-100 border-left border-info" style={{ borderWidth: '4px !important' }}>
                            <h4 className="font-weight-bold text-info mb-4"><i className="fa fa-award mr-2"></i>Trams d'Elo i Especials</h4>
                            
                            <h5 className="font-weight-bold text-primary mb-3">📊 Trams d'Elo</h5>
                            <ul className="list-unstyled ml-3 mb-4" style={{ fontSize: '1.05rem', lineHeight: '1.8' }}>
                                {currentData.trams.map((t, idx) => (
                                    <li key={idx} className="mb-2">
                                        <i className="fa fa-chevron-right text-info mr-2" style={{ fontSize: '0.8rem' }}></i>
                                        <strong>{t.tram}:</strong> {t.guanyador} <span className="text-muted">({t.club})</span>
                                    </li>
                                ))}
                            </ul>

                            <h5 className="font-weight-bold text-primary mb-3">👥 Categories Especials</h5>
                            <ul className="list-unstyled ml-3" style={{ fontSize: '1.05rem', lineHeight: '1.8' }}>
                                {currentData.especials.map((e, idx) => (
                                    <li key={idx} className="mb-2">
                                        <i className="fa fa-chevron-right text-info mr-2" style={{ fontSize: '0.8rem' }}></i>
                                        <strong>{e.categoria}:</strong> {e.guanyador} {e.club && <span className="text-muted">({e.club})</span>}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Categories Infantils */}
                    <div className="col-lg-6 mb-4">
                        <div className="bg-light p-4 rounded shadow-sm h-100 border-left border-success" style={{ borderWidth: '4px !important' }}>
                            <h4 className="font-weight-bold text-success mb-4"><i className="fa fa-child mr-2"></i>Categories Infantils i Juvenils</h4>
                            <ul className="list-unstyled ml-3" style={{ fontSize: '1.05rem', lineHeight: '1.9' }}>
                                {currentData.infantils.map((i, idx) => (
                                    <li key={idx} className="mb-2">
                                        <i className="fa fa-chevron-right text-success mr-2" style={{ fontSize: '0.8rem' }}></i>
                                        <strong>{i.categoria}:</strong> {i.guanyador} <span className="text-muted">({i.club})</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Enllaç Chess-Results */}
                {currentData.chessResults && (
                    <div className="text-center mt-5 mb-3">
                        <a 
                            href={currentData.chessResults} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="btn btn-lg btn-info px-4 py-3 shadow-sm font-weight-bold text-uppercase"
                            style={{ borderRadius: '30px', letterSpacing: '1px' }}
                        >
                            <i className="fa fa-external-link-alt mr-2"></i>Veure Classificació a Chess-Results
                        </a>
                    </div>
                )}
            </div>
        </>
    );
}

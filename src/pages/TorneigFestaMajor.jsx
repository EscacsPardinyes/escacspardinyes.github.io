import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';

export default function TorneigFestaMajor() {
    const breadcrumbs = [
        { label: "Torneig de Festa Major" }
    ];

    const eventSchema = {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": "Torneig de Festa Major - 9 Rondes",
        "description": "Us convidem al nostre Torneig de Festa Major, el dissabte 1 d'agost a les 10:00 hores.",
        "startDate": "2026-08-01T10:00:00+02:00",
        "endDate": "2026-08-01T20:00:00+02:00",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "eventStatus": "https://schema.org/EventScheduled",
        "location": {
            "@type": "Place",
            "name": "Club Escacs Pardinyes",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Carrer Sant Pere Claver, 1",
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
                title="Torneig de Festa Major" 
                description="Us convidem al nostre Torneig de Festa Major, el dissabte 1 d'agost a les 10:00 hores." 
                schema={eventSchema}
                breadcrumbs={breadcrumbs}
            />
            <PageHeader title="Torneig de Festa Major" breadcrumbs={breadcrumbs} />

            <div className="container pb-5">
                <div className="text-center mb-5">
                    <h2 className="display-4 font-weight-bold mb-4">9 RONDES - FESTA MAJOR</h2>
                    <p className="lead text-muted">Us convidem al nostre Torneig de Festa Major. Gaudeix d'una jornada plena d'escacs al nostre club!</p>
                </div>
                
                <div className="row">
                    <div className="col-lg-6 mb-4 mb-lg-0">
                        <div className="bg-light p-4 rounded shadow-sm border-left border-primary" style={{ borderWidth: '4px !important' }}>
                            <h4 className="mt-2 mb-3"><i className="fa fa-info-circle text-primary mr-2"></i>Detalls del Torneig</h4>
                            <ul className="list-unstyled ml-4" style={{ fontSize: '1.1rem', lineHeight: '2' }}>
                                <li><i className="fa fa-calendar-alt text-primary mr-2"></i><strong>Data i hora:</strong> Dissabte 1 d'agost a les 10:00 Hores</li>
                                <li><i className="fa fa-map-pin text-primary mr-2"></i><strong>Lloc:</strong> Club d'Escacs Pardinyes (C/ Sant Pere Claver, 1)</li>
                                <li><i className="fa fa-chess-board text-primary mr-2"></i><strong>Format:</strong> 9 Rondes</li>
                                <li><i className="fa fa-stopwatch text-primary mr-2"></i><strong>Ritme de joc:</strong> 3 minuts + 2 segons d'increment (3+2)</li>
                                <li><i className="fa fa-euro-sign text-primary mr-2"></i><strong>Inscripció:</strong> 5€ (Gratuït per als jugadors dels Tancats de MI i GM de Setmana Santa 2026)</li>
                                <li><i className="fa fa-university text-primary mr-2"></i><strong>Pagament:</strong> Per transferència bancària al compte <strong>ES07 2100 0336 6602 0036 8934</strong> (Cal indicar el nom del jugador al concepte)</li>
                                <li><i className="fab fa-whatsapp text-success mr-2"></i><strong>Contacte (WhatsApp):</strong> +34 641 91 52 66</li>
                            </ul>
                        </div>
                        
                        <div className="text-center mt-4">
                            <img 
                                src="/img/galeria/TorneigFestaMajor/cartell.webp" 
                                alt="Cartell Oficial del Torneig de Festa Major" 
                                className="img-fluid rounded shadow-lg"
                                style={{ maxHeight: '700px' }}
                            />
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="text-center">
                            <h3 className="mb-4">Formulari d'Inscripció</h3>
                            <div className="d-flex justify-content-center shadow-lg rounded overflow-hidden" style={{ background: '#fff' }}>
                                <iframe 
                                    src="https://docs.google.com/forms/d/e/1FAIpQLSeyWy3YoPoiOow0CVoC224SHAw0r59-7AFHPG0Sb1kH5l3wug/viewform?embedded=true" 
                                    width="100%" 
                                    height="1500" 
                                    frameBorder="0" 
                                    marginHeight="0" 
                                    marginWidth="0"
                                    title="Formulari d'Inscripció Torneig Festa Major"
                                >
                                    S'està carregant…
                                </iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

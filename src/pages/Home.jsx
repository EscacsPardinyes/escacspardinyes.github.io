import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

export default function Home() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        // Initialize carousel if jQuery and Bootstrap are available
        if (window.$ && window.$.fn.carousel) {
            window.$('#blog-carousel').carousel();
        }
    }, []);

    const upcomingEventsSchema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Event",
                "name": "V Tancats per a Normes de GM i MI Setmana Santa 2027",
                "description": "Cinquena edició dels tancats internacionals per a l'obtenció de normes de Gran Mestre i Mestre Internacional.",
                "startDate": "2027-03-22T09:00:00+02:00",
                "endDate": "2027-03-26T20:00:00+02:00",
                "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
                "eventStatus": "https://schema.org/EventScheduled",
                "location": {
                    "@type": "Place",
                    "name": "Club Escacs Pardinyes",
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "Carrer Sant Pere Claver, 1, 2a planta",
                        "addressLocality": "Lleida",
                        "postalCode": "25005",
                        "addressCountry": "ES"
                    }
                },
                "image": ["https://escacspardinyes.com/img/galeria/logos/logo.webp"],
                "organizer": {
                    "@type": "Organization",
                    "name": "Club Escacs Pardinyes",
                    "url": "https://escacspardinyes.com"
                },
                "url": "https://escacspardinyes.com/tancats-setmana-santa-2027"
            }
        ]
    };

    return (
        <>
            <SEO 
                description={t('seo.default_description')} 
                schema={upcomingEventsSchema}
            />
            {/* Carousel Start */}
            <div className="container-fluid p-0">
                <div id="blog-carousel" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="w-100" src="/img/galeria/Carousel/carousel-1.webp" alt="Alumnes del Club Escacs Pardinyes jugant una partida" width="1920" height="1080" fetchPriority="high" />
                            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                <h3 className="text-primary m-0">{t('carousel.club')}</h3>
                                <h1 className="display-2 m-0 mt-2 mt-md-4 text-white font-weight-bold">{t('carousel.slide1.title')}</h1>
                                <Link to="/contact" className="btn btn-lg btn-outline-light mt-3 mt-md-5 py-md-3 px-md-5">{t('carousel.slide1.btn')}</Link>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img className="w-100" src="/img/galeria/Carousel/carousel-3.webp" alt="Competició d'escacs organitzada pel club" loading="lazy" width="1920" height="1080" />
                            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                <h3 className="text-primary m-0">{t('carousel.club')}</h3>
                                <h2 className="display-2 m-0 mt-2 mt-md-4 text-white font-weight-bold">{t('carousel.slide3.title')}</h2>
                                <a href="https://www.chess.com/club/club-escacs-pardinyes" target="_blank" rel="noopener noreferrer" className="btn btn-lg btn-outline-light mt-3 mt-md-5 py-md-3 px-md-5">{t('carousel.slide3.btn')}</a>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img className="w-100" src="/img/galeria/Minicopa2026/Fotogrup.webp" alt="Equip del Club d'Escacs Pardinyes a la Mini Copa 2026" loading="lazy" width="1920" height="1080" />
                            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                <h3 className="text-primary m-0">{t('carousel.club')}</h3>
                                <h2 className="display-2 m-0 mt-2 mt-md-4 text-white font-weight-bold">{t('carousel.slide4.title')}</h2>
                                <Link to="/about" className="btn btn-lg btn-outline-light mt-3 mt-md-5 py-md-3 px-md-5">{t('carousel.slide4.btn')}</Link>
                            </div>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#blog-carousel" data-slide="prev" aria-label="Previous slide">
                        <span className="carousel-control-prev-icon"></span>
                    </a>
                    <a className="carousel-control-next" href="#blog-carousel" data-slide="next" aria-label="Next slide">
                        <span className="carousel-control-next-icon"></span>
                    </a>
                </div>
            </div>
            {/* Carousel End */}

            {/* About Start */}
            <div className="container section-padding">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <img className="img-fluid mb-4 mb-lg-0 rounded-lg shadow-lg" src="/img/about.webp" alt="Entrenament a la seu del Club Escacs Pardinyes" loading="lazy" width="600" height="400" style={{ borderRadius: '24px' }} />
                    </div>
                    <div className="col-lg-6 pl-lg-5">
                        <h2 className="display-4 font-weight-bold mb-4 text-uppercase" style={{ letterSpacing: '1px' }}>{t('about.title')}</h2>
                        <p className="lead mb-4">{t('about.desc')}</p>
                        <div className="row py-2">
                            <div className="col-sm-12 mb-4">
                                <div className="d-flex align-items-start">
                                    <i className="flaticon-chess display-4 text-primary mr-3"></i>
                                    <div>
                                        <h4 className="font-weight-bold mb-2">{t('about.federated.title')}</h4>
                                        <p className="text-muted">{t('about.federated.desc')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Link to="/about" className="btn btn-lg btn-primary px-5 mt-2">{t('about.btn')}</Link>
                    </div>
                </div>
            </div>
            {/* About End */}

            {/* Features Start */}
            <div className="container section-padding bg-light rounded-lg" style={{ borderRadius: '40px' }}>
                <div className="row px-3">
                    <div className="col-lg-4 mb-4 mb-lg-0">
                        <div className="value-item">
                            <i className="flaticon-strategy value-icon"></i>
                            <h3 className="mb-3">{t('features.progress.title')}</h3>
                            <p className="text-muted">{t('features.progress.desc')}</p>
                        </div>
                    </div>
                    <div className="col-lg-4 mb-4 mb-lg-0">
                        <div className="value-item">
                            <i className="flaticon-competition value-icon"></i>
                            <h3 className="mb-3">{t('features.competition.title')}</h3>
                            <p className="text-muted">{t('features.competition.desc')}</p>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="value-item">
                            <i className="flaticon-study value-icon"></i>
                            <h3 className="mb-3">{t('features.training.title')}</h3>
                            <p className="text-muted">{t('features.training.desc')}</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Features End */}

            {/* Schedule Start */}
            <div className="container section-padding">
                <div className="d-flex flex-column text-center mb-5">
                    <h4 className="text-primary font-weight-bold text-uppercase mb-3" style={{ letterSpacing: '3px' }}>{t('schedule.title')}</h4>
                    <h2 className="display-4 font-weight-bold">{t('schedule.subtitle')}</h2>
                </div>
                <div className="tab-class">
                    <ul className="nav nav-pills justify-content-center mb-4">
                        <li className="nav-item">
                            <a className={`nav-link ${activeTab === 'all' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('all'); }} href="#class-all">{t('schedule.tab.all')}</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${activeTab === 'beginner' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('beginner'); }} href="#class-beginner">{t('schedule.tab.beginner')}</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${activeTab === 'intermediate' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('intermediate'); }} href="#class-intermediate">{t('schedule.tab.intermediate')}</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${activeTab === 'advanced' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('advanced'); }} href="#class-advanced">{t('schedule.tab.advanced')}</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${activeTab === 'games' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setActiveTab('games'); }} href="#partides">{t('schedule.tab.games')}</a>
                        </li>
                    </ul>
                    <div className="tab-content">
                        <div id="class-all" className={`container tab-pane fade ${activeTab === 'all' ? 'show active' : ''} p-0`}>
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
                                        <tr>
                                            <th className="bg-secondary text-white"><time dateTime="18:30">18:30</time> - <time dateTime="19:30">19:30</time></th>
                                            <td>
                                                <h5>{t('schedule.free_play')}</h5>
                                            </td>
                                            <td>
                                                <h5>{t('schedule.group.eso_bat')}</h5>
                                                <p className="text-muted">{t('schedule.level.intermediate')}</p>
                                            </td>
                                            <td>
                                                <h5>{t('schedule.class.adults_primary')}</h5>
                                                <p className="text-muted">{t('schedule.level.beginner')}</p>
                                            </td>
                                            <td></td>
                                            <td>
                                                <h5>{t('schedule.free_play')}</h5>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="bg-secondary text-white"><time dateTime="19:30">19:30</time> - <time dateTime="20:30">20:30</time></th>
                                            <td>
                                                <h5>{t('schedule.free_play')}</h5>
                                            </td>
                                            <td></td>
                                            <td>
                                                <h5>{t('schedule.class.adults')}</h5>
                                                <p className="text-muted">{t('schedule.level.intermediate')}</p>
                                            </td>
                                            <td></td>
                                            <td>
                                                <h5>{t('schedule.free_play')}</h5>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="bg-secondary text-white"><time dateTime="19:45">19:45</time> - <time dateTime="21:15">21:15</time></th>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>
                                                <h5>{t('schedule.class.adults')}</h5>
                                                <p className="text-muted">{t('schedule.level.advanced')}</p>
                                            </td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div id="class-beginner" className={`container tab-pane fade ${activeTab === 'beginner' ? 'show active' : ''} p-0`}>
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
                                        <tr>
                                            <th className="bg-secondary text-white"><time dateTime="18:30">18:30</time> - <time dateTime="19:30">19:30</time></th>
                                            <td></td>
                                            <td></td>
                                            <td>
                                                <h5>{t('schedule.class.adults_primary')}</h5>
                                                <p className="text-muted">{t('schedule.level.beginner')}</p>
                                            </td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div id="class-intermediate" className={`container tab-pane fade ${activeTab === 'intermediate' ? 'show active' : ''} p-0`}>
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
                                        <tr>
                                            <th className="bg-secondary text-white"><time dateTime="18:30">18:30</time> - <time dateTime="19:30">19:30</time></th>
                                            <td></td>
                                            <td>
                                                <h5>{t('schedule.group.eso_bat')}</h5>
                                                <p className="text-muted">{t('schedule.level.intermediate')}</p>
                                            </td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <th className="bg-secondary text-white"><time dateTime="19:30">19:30</time> - <time dateTime="20:30">20:30</time></th>
                                            <td></td>
                                            <td></td>
                                            <td>
                                                <h5>{t('schedule.class.adults')}</h5>
                                                <p className="text-muted">{t('schedule.level.intermediate')}</p>
                                            </td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div id="class-advanced" className={`container tab-pane fade ${activeTab === 'advanced' ? 'show active' : ''} p-0`}>
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
                                        <tr>
                                            <th className="bg-secondary text-white"><time dateTime="19:45">19:45</time> - <time dateTime="21:15">21:15</time></th>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>
                                                <h5>{t('schedule.class.advanced')}</h5>
                                                <p className="text-muted">{t('schedule.level.advanced')}</p>
                                            </td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div id="partides" className={`container tab-pane fade ${activeTab === 'games' ? 'show active' : ''} p-0`}>
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
                                        <tr>
                                            <th className="bg-secondary text-white"><time dateTime="18:30">18:30</time> - <time dateTime="19:30">19:30</time></th>
                                            <td>
                                                <h5>{t('schedule.free_play')}</h5>
                                            </td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>
                                                <h5>{t('schedule.free_play')}</h5>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th className="bg-secondary text-white"><time dateTime="19:30">19:30</time> - <time dateTime="20:30">20:30</time></th>
                                            <td>
                                                <h5>{t('schedule.free_play')}</h5>
                                            </td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td>
                                                <h5>{t('schedule.free_play')}</h5>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Schedule End */}
        </>
    );
}

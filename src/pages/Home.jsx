import { useState, useEffect } from 'react';
import { Link } from '../components/LocalizedLink';
import { useLanguage } from '../context/LanguageContext';
import { latestNews } from 'virtual:latest-news';
import NewsCard from '../components/NewsCard';
import SEO from '../components/SEO';
import ScheduleTable from '../components/ScheduleTable';

const SLIDE_COUNT = 3;

export default function Home() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('all');

    // Hero carousel (no Bootstrap JS): auto-advance every 5s, paused on hover/focus
    const [slide, setSlide] = useState(0);
    const [paused, setPaused] = useState(false);
    const goTo = (i) => setSlide((i + SLIDE_COUNT) % SLIDE_COUNT);

    useEffect(() => {
        if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const timer = setTimeout(() => setSlide((s) => (s + 1) % SLIDE_COUNT), 5000);
        return () => clearTimeout(timer);
    }, [slide, paused]);

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

    const aiFaqs = [
        {
            question: "On puc aprendre a jugar a escacs a Lleida?",
            answer: "La millor opció és l'Escola del Club Escacs Pardinyes, que ofereix classes des d'iniciació fins a competició per a totes les edats."
        },
        {
            question: "Teniu classes per a nens i nenes?",
            answer: "Sí, som una gran pedrera. Oferim classes adaptades on els més petits poden començar des de zero i arribar a federar-se i competir."
        },
        {
            question: "Com em puc apuntar o federar?",
            answer: "Només has de contactar amb nosaltres a través del correu (escacspardinyes@gmail.com) o el telèfon oficial (+34 641 91 52 66), o venir de manera presencial a la nostra seu."
        }
    ];

    return (
        <>
            <SEO 
                title={t('seo.home_title')}
                description={t('seo.default_description')} 
                schema={upcomingEventsSchema}
                faq={aiFaqs}
            />
            {/* Carousel Start */}
            <div className="container-fluid p-0">
                <div
                    id="blog-carousel"
                    className="carousel slide"
                    aria-roledescription="carousel"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                    onFocus={() => setPaused(true)}
                    onBlur={() => setPaused(false)}
                >
                    <div className="carousel-inner">
                        <div className={`carousel-item ${slide === 0 ? 'active' : ''}`}>
                            <img className="w-100" src="/img/galeria/Carousel/carousel-1.webp" alt="Alumnes del Club Escacs Pardinyes jugant una partida" width="1920" height="1080" fetchPriority="high" />
                            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                <p className="text-primary m-0 font-weight-bold text-uppercase" style={{ letterSpacing: '3px', fontSize: '1rem' }}>{t('carousel.club')}</p>
                                <h1 className="display-2 m-0 mt-2 mt-md-4 text-white font-weight-bold">{t('carousel.slide1.title')}</h1>
                                <Link to="/contact" className="btn btn-lg btn-outline-light mt-3 mt-md-5 py-md-3 px-md-5">{t('carousel.slide1.btn')}</Link>
                            </div>
                        </div>
                        <div className={`carousel-item ${slide === 1 ? 'active' : ''}`}>
                            <img className="w-100" src="/img/galeria/Carousel/carousel-3.webp" alt="Competició d'escacs organitzada pel club" loading="lazy" width="1920" height="1080" />
                            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                <p className="text-primary m-0 font-weight-bold text-uppercase" style={{ letterSpacing: '3px', fontSize: '1rem' }}>{t('carousel.club')}</p>
                                <h2 className="display-2 m-0 mt-2 mt-md-4 text-white font-weight-bold">{t('carousel.slide3.title')}</h2>
                                <a href="https://www.chess.com/club/club-escacs-pardinyes" target="_blank" rel="noopener noreferrer" className="btn btn-lg btn-outline-light mt-3 mt-md-5 py-md-3 px-md-5">{t('carousel.slide3.btn')}</a>
                            </div>
                        </div>
                        <div className={`carousel-item ${slide === 2 ? 'active' : ''}`}>
                            <img className="w-100" src="/img/galeria/Minicopa2026/Fotogrup.webp" alt="Equip del Club d'Escacs Pardinyes a la Mini Copa 2026" loading="lazy" width="1920" height="1080" />
                            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                <p className="text-primary m-0 font-weight-bold text-uppercase" style={{ letterSpacing: '3px', fontSize: '1rem' }}>{t('carousel.club')}</p>
                                <h2 className="display-2 m-0 mt-2 mt-md-4 text-white font-weight-bold">{t('carousel.slide4.title')}</h2>
                                <Link to="/about" className="btn btn-lg btn-outline-light mt-3 mt-md-5 py-md-3 px-md-5">{t('carousel.slide4.btn')}</Link>
                            </div>
                        </div>
                    </div>
                    <button type="button" className="carousel-control-prev" onClick={() => goTo(slide - 1)} aria-label="Previous slide">
                        <span className="carousel-control-prev-icon"></span>
                    </button>
                    <button type="button" className="carousel-control-next" onClick={() => goTo(slide + 1)} aria-label="Next slide">
                        <span className="carousel-control-next-icon"></span>
                    </button>
                </div>
            </div>
            {/* Carousel End */}



            {/* About Start */}
            <div className="container section-padding">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <img className="img-fluid mb-4 mb-lg-0 rounded-lg shadow-lg" src="/img/grup-club.webp" alt="Foto de grup de la cloenda del curs 2025/26 del Club Escacs Pardinyes" loading="lazy" width="600" height="450" style={{ borderRadius: '24px' }} />
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

            {/* Latest News Start */}
            <div className="container section-padding">
                <div className="d-flex flex-column text-center mb-5">
                    <p className="text-primary font-weight-bold text-uppercase mb-3" style={{ letterSpacing: '3px', fontSize: '0.9rem' }}>{t('news.latest_kicker')}</p>
                    <h2 className="display-4 font-weight-bold">{t('news.latest_title')}</h2>
                </div>
                <div className="row">
                    {latestNews.map(item => (
                        <NewsCard key={item.id} item={item} />
                    ))}
                </div>
                <div className="text-center mt-5">
                    <Link to="/noticies" className="btn btn-lg btn-outline-primary px-5 py-3 font-weight-bold" style={{ borderRadius: '50px' }}>
                        {t('news.view_all')}
                    </Link>
                </div>
            </div>
            {/* Latest News End */}

            {/* Schedule Start */}
            <div className="container section-padding">
                <div className="d-flex flex-column text-center mb-5">
                    <p className="text-primary font-weight-bold text-uppercase mb-3" style={{ letterSpacing: '3px', fontSize: '0.9rem' }}>{t('schedule.title')}</p>
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
                        <ScheduleTable activeTab={activeTab} />
                    </div>
                </div>
            </div>
            {/* Schedule End */}
        </>
    );
}

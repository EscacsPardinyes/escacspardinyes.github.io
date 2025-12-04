import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        // Initialize carousel if jQuery and Bootstrap are available
        if (window.$ && window.$.fn.carousel) {
            window.$('#blog-carousel').carousel();
        }
    }, []);

    return (
        <>
            {/* Carousel Start */}
            <div className="container-fluid p-0">
                <div id="blog-carousel" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="w-100" src="/img/carousel-1.webp" alt="Imatge" />
                            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                <h3 className="text-primary text-capitalize m-0">{t('carousel.club')}</h3>
                                <h2 className="display-2 m-0 mt-2 mt-md-4 text-white font-weight-bold text-capitalize">{t('carousel.slide1.title')}</h2>
                                <Link to="/contact" className="btn btn-lg btn-outline-light mt-3 mt-md-5 py-md-3 px-md-5">{t('carousel.slide1.btn')}</Link>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img className="w-100" src="/img/carousel-3.webp" alt="Imatge" />
                            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                <h3 className="text-primary text-capitalize m-0">{t('carousel.club')}</h3>
                                <h2 className="display-2 m-0 mt-2 mt-md-4 text-white font-weight-bold text-capitalize">{t('carousel.slide3.title')}</h2>
                                <a href="https://www.chess.com/club/club-escacs-pardinyes" target="_blank" rel="noopener noreferrer" className="btn btn-lg btn-outline-light mt-3 mt-md-5 py-md-3 px-md-5">{t('carousel.slide3.btn')}</a>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img className="w-100" src="/img/carousel-4.webp" alt="Imatge" />
                            <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                                <h3 className="text-primary text-capitalize m-0">{t('carousel.club')}</h3>
                                <h2 className="display-2 m-0 mt-2 mt-md-4 text-white font-weight-bold text-capitalize">{t('carousel.slide4.title')}</h2>
                                <Link to="/about" className="btn btn-lg btn-outline-light mt-3 mt-md-5 py-md-3 px-md-5">{t('carousel.slide4.btn')}</Link>
                            </div>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#blog-carousel" data-slide="prev">
                        <span className="carousel-control-prev-icon"></span>
                    </a>
                    <a className="carousel-control-next" href="#blog-carousel" data-slide="next">
                        <span className="carousel-control-next-icon"></span>
                    </a>
                </div>
            </div>
            {/* Carousel End */}

            {/* About Start */}
            <div className="container py-5">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <img className="img-fluid mb-4 mb-lg-0" src="/img/about.webp" alt="Imatge sobre nosaltres" />
                    </div>
                    <div className="col-lg-6">
                        <h2 className="display-4 font-weight-bold mb-4">{t('about.title')}</h2>
                        <p>{t('about.desc')}</p>
                        <div className="row py-2">
                            <div className="col-sm-6">
                                <i className="flaticon-chess display-2 text-primary"></i>
                                <h4 className="font-weight-bold">{t('about.federated.title')}</h4>
                                <p>{t('about.federated.desc')}</p>
                            </div>
                        </div>
                        <Link to="/about" className="btn btn-lg px-4 btn-outline-primary">{t('about.btn')}</Link>
                    </div>
                </div>
            </div>
            {/* About End */}

            {/* Features Start */}
            <div className="container-fluid my-5">
                <div className="row">
                    <div className="col-lg-4 p-0">
                        <div className="d-flex align-items-center bg-secondary text-white px-5" style={{ minHeight: '300px' }}>
                            <i className="flaticon-strategy display-3 text-primary mr-3"></i>
                            <div className="">
                                <h2 className="text-white mb-3">{t('features.progress.title')}</h2>
                                <p>{t('features.progress.desc')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 p-0">
                        <div className="d-flex align-items-center bg-primary text-white px-5" style={{ minHeight: '300px' }}>
                            <i className="flaticon-competition display-3 text-secondary mr-3"></i>
                            <div className="">
                                <h2 className="text-white mb-3">{t('features.competition.title')}</h2>
                                <p>{t('features.competition.desc')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 p-0">
                        <div className="d-flex align-items-center bg-secondary text-white px-5" style={{ minHeight: '300px' }}>
                            <i className="flaticon-study display-3 text-primary mr-3"></i>
                            <div className="">
                                <h2 className="text-white mb-3">{t('features.training.title')}</h2>
                                <p>{t('features.training.desc')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Features End */}

            {/* Schedule Start */}
            <div className="container gym-feature py-5">
                <div className="d-flex flex-column text-center mb-5">
                    <h4 className="text-primary font-weight-bold">{t('schedule.title')}</h4>
                    <h4 className="display-4 font-weight-bold">{t('schedule.subtitle')}</h4>
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
                                            <th className="bg-secondary text-white">18:30 - 19:30</th>
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
                                            <th className="bg-secondary text-white">19:30 - 20:30</th>
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
                                            <th className="bg-secondary text-white">19:45 - 21:15</th>
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
                                            <th className="bg-secondary text-white">18:30 - 19:30</th>
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
                                            <th className="bg-secondary text-white">18:30 - 19:30</th>
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
                                            <th className="bg-secondary text-white">19:30 - 20:30</th>
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
                                            <th className="bg-secondary text-white">19:45 - 21:15</th>
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
                                            <th className="bg-secondary text-white">18:30 - 19:30</th>
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
                                            <th className="bg-secondary text-white">19:30 - 20:30</th>
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

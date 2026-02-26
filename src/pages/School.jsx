import { useLanguage } from '../context/LanguageContext';
import SchoolForm from '../components/SchoolForm';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';

export default function School() {
    const { t, tHtml } = useLanguage();
    const [activeTab, setActiveTab] = useState('all');

    const breadcrumbs = [{ label: t('nav.school') }];

    return (
        <>
            <SEO title={t('nav.school')} description={t('seo.school_description')} />
            <PageHeader title={t('nav.school')} breadcrumbs={breadcrumbs} />

            {/* Escola d'Escacs Start */}
            <div className="container gym-class mb-5" style={{ marginTop: '90px' }}>
                <div className="text-center mb-5">
                    <h2 className="display-4 font-weight-bold">{t('school.title')}</h2>
                    <p className="lead" dangerouslySetInnerHTML={tHtml('school.subtitle')}></p>
                </div>
                <div className="row px-3">
                    <div className="col-md-6 p-0">
                        <div className="gym-class-box d-flex flex-column align-items-end justify-content-center bg-primary text-right text-white py-5 px-5">
                            <i className="flaticon-chess"></i>
                            <h3 className="display-4 mb-3 text-white font-weight-bold">{t('school.beginner_title')}</h3>
                            <p dangerouslySetInnerHTML={tHtml('school.beginner_text')}></p>
                            <Link to="/contact" className="btn btn-lg btn-outline-light mt-4 px-4">{t('school.btn_join')}</Link>
                        </div>
                    </div>
                    <div className="col-md-6 p-0">
                        <div className="gym-class-box d-flex flex-column align-items-start justify-content-center bg-secondary text-left text-white py-5 px-5">
                            <i className="flaticon-strategy"></i>
                            <h3 className="display-4 mb-3 text-white font-weight-bold">{t('school.advanced_title')}</h3>
                            <p dangerouslySetInnerHTML={tHtml('school.advanced_text')}></p>
                            <Link to="/contact" className="btn btn-lg btn-outline-light mt-4 px-4">{t('school.btn_join')}</Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* Escola d'Escacs End */}

            {/* Informació pràctica + Imatge Minicopa */}
            <div className="container my-5">
                <div className="row align-items-center">
                    <div className="col-lg-6 text-center text-lg-left">
                        <h4 className="font-weight-bold text-primary mb-3">{t('school.info_title')}</h4>
                        <p className="mb-2" dangerouslySetInnerHTML={tHtml('school.price')}></p>
                        <p className="mb-2" dangerouslySetInnerHTML={tHtml('school.membership')}></p>
                        <p className="mb-2 text-danger">{t('school.warning')}</p>
                        <p className="mt-3" dangerouslySetInnerHTML={tHtml('school.more_info')}></p>
                    </div>
                    <div className="col-lg-6 mt-4 mt-lg-0 text-center">
                        <img src="/img/Minicopa.webp" className="img-fluid rounded shadow" alt="Infants participant en el Torneig Minicopa d'escacs" style={{ maxHeight: '300px', width: 'auto' }} width="450" height="300" loading="lazy" />
                    </div>
                </div>
            </div>

            {/* Horaris de Classes */}
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

            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="text-center mb-4">
                            <h4 className="font-weight-bold text-primary">{t('school.enroll_title')}</h4>
                        </div>
                        <SchoolForm />
                    </div>
                </div>
            </div>


        </>
    );
}

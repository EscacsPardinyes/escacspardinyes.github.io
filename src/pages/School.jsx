import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function School() {
    const { t, tHtml } = useLanguage();
    const [activeTab, setActiveTab] = useState('all');

    return (
        <>
            {/* Page Header Start */}
            <div className="container-fluid page-header mb-5">
                <div className="d-flex flex-column align-items-center justify-content-center pt-0 pt-lg-5" style={{ minHeight: '400px' }}>
                    <h4 className="display-4 mb-3 mt-0 mt-lg-5 text-white text-uppercase font-weight-bold">{t('nav.school')}</h4>
                    <div className="d-inline-flex">
                        <p className="m-0 text-white"><Link className="text-white" to="/">{t('nav.home')}</Link></p>
                        <p className="m-0 text-white px-2">/</p>
                        <p className="m-0 text-white">{t('nav.school')}</p>
                    </div>
                </div>
            </div>
            {/* Page Header End */}

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

            {/* Informació pràctica Escola (versió compacta) */}
            <div className="container text-center my-5">
                <h4 className="font-weight-bold text-primary mb-3">{t('school.info_title')}</h4>
                <p className="mb-2" dangerouslySetInnerHTML={tHtml('school.price')}></p>
                <p className="mb-2" dangerouslySetInnerHTML={tHtml('school.membership')}></p>
                <p className="mb-2 text-danger">{t('school.warning')}</p>
            </div>

            <div className="text-center mt-5">
                <p dangerouslySetInnerHTML={tHtml('school.more_info')}></p>
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

            <div className="container text-center my-5">
                <h4 className="font-weight-bold text-primary mb-4">{t('school.enroll_title')}</h4>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSdfCCJPPpjgz_vT5U2fH0Nmlu58eNunraKUsbkNjwEpNkbZIA/viewform?embedded=true" width="640" height="1200" frameBorder="0" marginHeight="0" marginWidth="0">S'està carregant…</iframe>
                </div>
            </div>

            {/* Valors del Club */}
            <div className="container text-center my-5">
                <h4 className="font-weight-bold text-primary mb-4">{t('school.values_title')}</h4>
                <div className="row">
                    <div className="col-md-4">
                        <i className="flaticon-thinking display-4 text-primary mb-3"></i>
                        <h5>{t('school.val_concentration')}</h5>
                        <p>{t('school.val_concentration_text')}</p>
                    </div>
                    <div className="col-md-4">
                        <i className="flaticon-group display-4 text-primary mb-3"></i>
                        <h5>{t('school.val_companionship')}</h5>
                        <p>{t('school.val_companionship_text')}</p>
                    </div>
                    <div className="col-md-4">
                        <i className="flaticon-goal display-4 text-primary mb-3"></i>
                        <h5>{t('school.val_improvement')}</h5>
                        <p>{t('school.val_improvement_text')}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

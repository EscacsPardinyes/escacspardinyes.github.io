import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

export default function EloCalculator() {
    const { t, tHtml } = useLanguage();
    const [playerElo, setPlayerElo] = useState('');
    const [kFactor, setKFactor] = useState(40);
    const [opponentElo, setOpponentElo] = useState('');
    const [result, setResult] = useState(1);
    const [rivals, setRivals] = useState([]);
    const [errorLimit, setErrorLimit] = useState('');
    const [calculationResult, setCalculationResult] = useState(null);
    const [firstVariation, setFirstVariation] = useState(null);

    const addGame = () => {
        if (rivals.length >= 9) {
            setErrorLimit("❌ Màxim 10 rivals."); // This could also be translated if needed
            return;
        }
        setErrorLimit('');
        setRivals([...rivals, { opponentElo: Number(opponentElo), result: Number(result), variation: null }]);
    };

    const deleteRival = (index) => {
        const newRivals = [...rivals];
        newRivals.splice(index, 1);
        setRivals(newRivals);
    };

    const updateRivalElo = (index, value) => {
        const newRivals = [...rivals];
        newRivals[index].opponentElo = Number(value);
        setRivals(newRivals);
    };

    const updateRivalResult = (index, value) => {
        const newRivals = [...rivals];
        newRivals[index].result = Number(value);
        setRivals(newRivals);
    };

    const calculateVariation = (player, opponent, res, k) => {
        const expectedScore = 1 / (1 + Math.pow(10, (opponent - player) / 400));
        return k * (res - expectedScore);
    };

    const calculateTournamentElo = () => {
        const pElo = Number(playerElo);
        const k = Number(kFactor);
        const opEloFirst = Number(opponentElo);
        const resFirst = Number(result);

        let totalVariation = 0;

        const varFirst = calculateVariation(pElo, opEloFirst, resFirst, k);
        setFirstVariation(varFirst);
        totalVariation += varFirst;

        const updatedRivals = rivals.map(rival => {
            const variation = calculateVariation(pElo, rival.opponentElo, rival.result, k);
            return { ...rival, variation };
        });
        setRivals(updatedRivals);

        updatedRivals.forEach(r => totalVariation += r.variation);

        const newElo = pElo + totalVariation;
        setCalculationResult({ newElo, totalVariation });
    };

    return (
        <>
            <SEO title={t('elo.header')} />
            {/* Page Header Start */}
            <div className="container-fluid page-header mb-5">
                <div className="d-flex flex-column align-items-center justify-content-center pt-0 pt-lg-5" style={{ minHeight: '400px' }}>
                    <h1 className="display-4 mb-3 mt-0 mt-lg-5 text-white text-uppercase font-weight-bold">{t('elo.header')}</h1>
                    <div className="d-inline-flex">
                        <p className="m-0 text-white"><Link className="text-white" to="/">{t('nav.home')}</Link></p>
                        <p className="m-0 text-white px-2">/</p>
                        <p className="m-0 text-white">{t('elo.header')}</p>
                    </div>
                </div>
            </div>
            {/* Page Header End */}

            <h2 className="text-center text-primary mb-4">{t('elo.title')}</h2>

            <div className="container section-padding">
                <div className="text-center mb-5">
                    <h2 className="display-3 font-weight-bold mb-3">{t('elo.title')}</h2>
                    <p className="lead mx-auto text-muted" style={{ maxWidth: '700px' }}>
                        Calcula la teva variació d'Elo FIDE/FCE de forma ràpida i senzilla. Afegeix tantes rondes com hagis jugat al torneig.
                    </p>
                </div>

                <div className="row justify-content-center">
                    <div className="col-lg-7 mb-5">
                        <div className="glass-card p-4 p-md-5" style={{ borderRadius: '32px' }}>
                            <div className="row g-4 mb-4">
                                <div className="col-md-6">
                                    <label htmlFor="playerElo" className="form-label font-weight-bold text-uppercase small letter-spacing-1">{t('elo.initial_elo')}</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-right-0"><i className="fas fa-user text-primary"></i></span>
                                        <input type="number" id="playerElo" className="form-control border-left-0 shadow-none" placeholder="Ex: 1800" value={playerElo} onChange={(e) => setPlayerElo(e.target.value)} style={{ height: '50px' }} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="kFactor" className="form-label font-weight-bold text-uppercase small letter-spacing-1">{t('elo.k_factor')}</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-right-0"><i className="fas fa-bolt text-primary"></i></span>
                                        <select id="kFactor" className="form-control border-left-0 shadow-none" value={kFactor} onChange={(e) => setKFactor(e.target.value)} style={{ height: '50px' }}>
                                            <option value="40">K = 40 (Joves / Nous)</option>
                                            <option value="20">K = 20 (General)</option>
                                            <option value="10">K = 10 (Pro / +2400)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 mb-4" style={{ backgroundColor: 'rgba(255, 193, 7, 0.05)', borderRadius: '20px', border: '1px dashed var(--primary-color)' }}>
                                <h5 className="mb-4 font-weight-bold d-flex align-items-center">
                                    <span className="badge bg-primary text-dark mr-2 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '24px', height: '24px' }}>1</span>
                                    Ronda inicial
                                </h5>
                                <div className="row g-3">
                                    <div className="col-md-7">
                                        <label htmlFor="opponentElo" className="form-label small text-muted">{t('elo.opponent_elo')}</label>
                                        <input type="number" id="opponentElo" name="opponentElo" className="form-control" placeholder="Elo rival" value={opponentElo} onChange={(e) => setOpponentElo(e.target.value)} />
                                    </div>
                                    <div className="col-md-5">
                                        <label htmlFor="result" className="form-label small text-muted">{t('elo.result')}</label>
                                        <select id="result" name="result" className="form-control" value={result} onChange={(e) => setResult(e.target.value)}>
                                            <option value="1">{t('elo.win')} (1)</option>
                                            <option value="0.5">{t('elo.draw')} (½)</option>
                                            <option value="0">{t('elo.loss')} (0)</option>
                                        </select>
                                    </div>
                                </div>
                                {firstVariation !== null && (
                                    <div className="mt-3 font-weight-bold" style={{ color: firstVariation >= 0 ? '#28a745' : '#dc3545' }}>
                                        <i className={`fas fa-caret-${firstVariation >= 0 ? 'up' : 'down'} mr-1`}></i>
                                        Variació: {firstVariation > 0 ? '+' : ''}{firstVariation.toFixed(1)}
                                    </div>
                                )}
                            </div>

                            <div id="rivalsContainer">
                                {rivals.map((rival, index) => (
                                    <div key={index} className="p-4 mb-4 bg-white shadow-sm position-relative animate-fade-in" style={{ borderRadius: '20px', border: '1px solid #eee' }}>
                                        <button className="btn btn-link text-danger p-0 position-absolute" style={{ top: '15px', right: '15px' }} onClick={() => deleteRival(index)}>
                                            <i className="fas fa-times-circle fa-lg"></i>
                                        </button>
                                        <h5 className="mb-4 font-weight-bold d-flex align-items-center">
                                            <span className="badge bg-dark text-white mr-2 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '24px', height: '24px' }}>{index + 2}</span>
                                            Ronda {index + 2}
                                        </h5>
                                        <div className="row g-3">
                                            <div className="col-md-7">
                                                <label htmlFor={`opponentElo-${index}`} className="form-label small text-muted">{t('elo.opponent_elo')}</label>
                                                <input type="number" id={`opponentElo-${index}`} name={`opponentElo-${index}`} className="form-control" placeholder="Elo rival" value={rival.opponentElo} onChange={(e) => updateRivalElo(index, e.target.value)} />
                                            </div>
                                            <div className="col-md-5">
                                                <label htmlFor={`result-${index}`} className="form-label small text-muted">{t('elo.result')}</label>
                                                <select id={`result-${index}`} name={`result-${index}`} className="form-control" value={rival.result} onChange={(e) => updateRivalResult(index, e.target.value)}>
                                                    <option value="1">{t('elo.win')} (1)</option>
                                                    <option value="0.5">{t('elo.draw')} (½)</option>
                                                    <option value="0">{t('elo.loss')} (0)</option>
                                                </select>
                                            </div>
                                        </div>
                                        {rival.variation !== null && (
                                            <div className="mt-3 font-weight-bold" style={{ color: rival.variation >= 0 ? '#28a745' : '#dc3545' }}>
                                                <i className={`fas fa-caret-${rival.variation >= 0 ? 'up' : 'down'} mr-1`}></i>
                                                Variació: {rival.variation > 0 ? '+' : ''}{rival.variation.toFixed(1)}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="d-flex flex-column flex-md-row gap-3 mt-5">
                                <button className="btn btn-outline-secondary btn-lg flex-fill order-2 order-md-1" onClick={addGame}>
                                    <i className="fas fa-plus mr-2"></i>{t('elo.btn_add')}
                                </button>
                                <button className="btn btn-primary btn-lg flex-fill order-1 order-md-2 shadow-md" onClick={calculateTournamentElo}>
                                    <i className="fas fa-calculator mr-2"></i>{t('elo.btn_calc')}
                                </button>
                            </div>

                            <div className="text-center mt-4 text-muted small">
                                {t('elo.rivals_added')}: <strong>{rivals.length + 1}/10</strong>
                            </div>
                            {errorLimit && <div className="text-danger text-center font-weight-bold mt-3 animate-pulse">{errorLimit}</div>}

                            {calculationResult && (
                                <div className="mt-5 p-4 text-center animate-fade-in" style={{ background: 'var(--secondary-color)', color: 'white', borderRadius: '24px', boxShadow: '0 15px 35px rgba(0,0,0,0.2)' }}>
                                    <h4 className="text-primary text-uppercase font-weight-bold mb-4" style={{ letterSpacing: '2px' }}>{t('elo.result_total')}</h4>
                                    <div className="row align-items-center">
                                        <div className="col-md-6 border-right border-secondary">
                                            <p className="mb-1 text-light opacity-50 text-uppercase small">{t('elo.new_elo')}</p>
                                            <h2 className="display-4 font-weight-bold mb-0 text-white">{Math.round(calculationResult.newElo)}</h2>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="mb-1 text-light opacity-50 text-uppercase small">{t('elo.total_variation')}</p>
                                            <h2 className="display-4 font-weight-bold mb-0" style={{ color: calculationResult.totalVariation >= 0 ? '#28a745' : '#dc3545' }}>
                                                {calculationResult.totalVariation > 0 ? '+' : ''}{calculationResult.totalVariation.toFixed(1)}
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="col-lg-5">
                        <div className="sticky-top" style={{ top: '100px' }}>
                            <div className="glass-card p-4 mb-4" style={{ borderRadius: '24px' }}>
                                <h3 className="h4 font-weight-bold mb-4 d-flex align-items-center">
                                    <i className="fas fa-info-circle text-primary mr-3"></i>
                                    {t('elo.k_value_title')}
                                </h3>
                                <div className="space-y-4">
                                    <div className="p-3 bg-white rounded-xl shadow-sm border-left border-primary" style={{ borderLeftWidth: '4px !important' }}>
                                        <h6 className="font-weight-bold mb-1">K = 40</h6>
                                        <p className="small mb-0 text-muted" dangerouslySetInnerHTML={tHtml('elo.k_40')}></p>
                                    </div>
                                    <div className="p-3 bg-white rounded-xl shadow-sm border-left border-warning mt-3" style={{ borderLeftWidth: '4px !important' }}>
                                        <h6 className="font-weight-bold mb-1">K = 20</h6>
                                        <p className="small mb-0 text-muted" dangerouslySetInnerHTML={tHtml('elo.k_20')}></p>
                                    </div>
                                    <div className="p-3 bg-white rounded-xl shadow-sm border-left border-danger mt-3" style={{ borderLeftWidth: '4px !important' }}>
                                        <h6 className="font-weight-bold mb-1">K = 10</h6>
                                        <p className="small mb-0 text-muted">Per a jugadors que han arribat a 2400 Elo en algun moment.</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="p-4 bg-primary rounded-xl shadow-md text-dark">
                                <h5 className="font-weight-bold mb-2">Com funciona?</h5>
                                <p className="small mb-0 opacity-80">
                                    L'Elo es calcula basant-se en la probabilitat de victòria segons la diferència de punts entre els jugadors. La fórmula utilitzada és la oficial de la FIDE.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

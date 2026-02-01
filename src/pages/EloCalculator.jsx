import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

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
            {/* Page Header Start */}
            <div className="container-fluid page-header mb-5">
                <div className="d-flex flex-column align-items-center justify-content-center pt-0 pt-lg-5" style={{ minHeight: '400px' }}>
                    <h4 className="display-4 mb-3 mt-0 mt-lg-5 text-white text-uppercase font-weight-bold">{t('elo.header')}</h4>
                    <div className="d-inline-flex">
                        <p className="m-0 text-white"><Link className="text-white" to="/">{t('nav.home')}</Link></p>
                        <p className="m-0 text-white px-2">/</p>
                        <p className="m-0 text-white">{t('elo.header')}</p>
                    </div>
                </div>
            </div>
            {/* Page Header End */}

            <h1 className="text-center text-primary mb-4">{t('elo.title')}</h1>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 mb-4">
                        <div className="bg-white p-4 rounded shadow-sm">
                            <div className="d-flex gap-3 mb-3">
                                <div className="flex-fill">
                                    <label htmlFor="playerElo" className="form-label">{t('elo.initial_elo')}</label>
                                    <input type="number" id="playerElo" className="form-control" value={playerElo} onChange={(e) => setPlayerElo(e.target.value)} />
                                </div>
                                <div className="flex-fill">
                                    <label htmlFor="kFactor" className="form-label">{t('elo.k_factor')}</label>
                                    <select id="kFactor" className="form-control" value={kFactor} onChange={(e) => setKFactor(e.target.value)}>
                                        <option value="40">K = 40</option>
                                        <option value="20">K = 20</option>
                                        <option value="10">K = 10</option>
                                    </select>
                                </div>
                            </div>
                            <hr />
                            <div className="d-flex gap-3 mb-3">
                                <div className="flex-fill">
                                    <label className="form-label">{t('elo.opponent_elo')}</label>
                                    <input type="number" className="form-control" value={opponentElo} onChange={(e) => setOpponentElo(e.target.value)} />
                                </div>
                                <div className="flex-fill">
                                    <label className="form-label">{t('elo.result')}</label>
                                    <select className="form-control" value={result} onChange={(e) => setResult(e.target.value)}>
                                        <option value="1">{t('elo.win')}</option>
                                        <option value="0.5">{t('elo.draw')}</option>
                                        <option value="0">{t('elo.loss')}</option>
                                    </select>
                                </div>
                            </div>

                            {firstVariation !== null && (
                                <div className="text-muted mb-3">
                                    ➔ Variació ronda 1: {firstVariation > 0 ? '+' : ''}{firstVariation.toFixed(1)}
                                </div>
                            )}

                            <div id="rivalsContainer">
                                {rivals.map((rival, index) => (
                                    <div key={index} className="mb-3 p-3 border rounded bg-light position-relative">
                                        <div className="d-flex gap-3 mb-2">
                                            <div className="flex-fill">
                                                <label className="form-label">{t('elo.opponent_elo')} ronda {index + 2}</label>
                                                <input type="number" className="form-control" value={rival.opponentElo} onChange={(e) => updateRivalElo(index, e.target.value)} />
                                            </div>
                                            <div className="flex-fill">
                                                <label className="form-label">{t('elo.result')} ronda {index + 2}</label>
                                                <select className="form-control" value={rival.result} onChange={(e) => updateRivalResult(index, e.target.value)}>
                                                    <option value="1">{t('elo.win')}</option>
                                                    <option value="0.5">{t('elo.draw')}</option>
                                                    <option value="0">{t('elo.loss')}</option>
                                                </select>
                                            </div>
                                            <button className="btn btn-link text-danger p-0 align-self-end mb-2" onClick={() => deleteRival(index)}>
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                        {rival.variation !== null && (
                                            <div className="text-muted">
                                                ➔ Variació ronda {index + 2}: {rival.variation > 0 ? '+' : ''}{rival.variation.toFixed(1)}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="d-flex gap-2 mb-3">
                                <button className="btn btn-secondary flex-fill" onClick={addGame}>{t('elo.btn_add')}</button>
                                <button className="btn btn-primary flex-fill" onClick={calculateTournamentElo}>{t('elo.btn_calc')}</button>
                            </div>

                            <div className="text-center mb-2">Rivals afegits: {rivals.length + 1}/10</div>
                            {errorLimit && <div className="text-danger text-center font-weight-bold mb-2">{errorLimit}</div>}

                            {calculationResult && (
                                <div className="alert alert-info mt-3">
                                    <h4 className="alert-heading">Resultat:</h4>
                                    <p className="mb-0">Nou ELO: <strong>{Math.round(calculationResult.newElo)}</strong></p>
                                    <p className="mb-0">Variació total: <strong>{calculationResult.totalVariation > 0 ? '+' : ''}{calculationResult.totalVariation.toFixed(1)}</strong></p>
                                </div>
                            )}

                        </div>
                    </div>

                    <div className="col-md-6 mb-4">
                        <div className="bg-white p-4 rounded shadow-sm">
                            <h2 className="h4">{t('elo.k_value_title')}</h2>
                            <ul>
                                <li dangerouslySetInnerHTML={tHtml('elo.k_40')}></li>
                                <li dangerouslySetInnerHTML={tHtml('elo.k_20')}></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

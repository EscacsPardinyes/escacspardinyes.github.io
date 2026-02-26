import { useLanguage } from '../context/LanguageContext';

export default function Collaborators() {
    const { t } = useLanguage();

    return (
        <div className="container pb-5 mt-5">
            <h2 className="text-center font-weight-bold mb-5">{t('simultanies.collaborators_title')}</h2>
            <div className="row justify-content-center">
                <div className="col-lg-8 text-center">
                    <img
                        src="/img/galeria/WIMIvetteGarcía/cartell-colaboradors.webp"
                        alt="Cartell de Col·laboradors del Club Escacs Pardinyes"
                        className="img-fluid rounded shadow"
                        loading="lazy"
                    />
                    <div className="mt-4">
                        <p className="lead">{t('simultanies.collaborators_text1')}</p>
                        <p>{t('simultanies.collaborators_text2')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

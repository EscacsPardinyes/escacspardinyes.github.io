import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';
import SignupSoon from '../components/SignupSoon';
import CircuitCard from '../components/CircuitCard';
import { useCircuitTournament } from '../components/useCircuitTournament';
import { useLanguage } from '../context/LanguageContext';
import { CIRCUIT_SIGNUP_OPEN } from '../data/circuitConfig';

// Public page of the 2027 circuit: only the tournaments (no sponsorship or player info, that's /patrocini).
const ORDER = ['torneig-nadal-2027', 'tancats', 'gran-premi-actiu-festa-major', 'open-internacional-ciutat-de-lleida', 'tancat-open-ciutat-de-lleida', 'torneig-festa-major-pardinyes-2027'];

export default function CircuitInfo() {
    const { t } = useLanguage();
    const getTournament = useCircuitTournament();
    const breadcrumbs = [{ label: t('tornejos.breadcrumb'), path: '/tornejos' }, { label: t('circuitinfo.header') }];
    const tournaments = ORDER.map(getTournament);

    const schema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": t('circuitinfo.seo_title'),
        "itemListElement": tournaments.map((tr, i) => ({ "@type": "ListItem", "position": i + 1, "name": tr.title, "url": `https://escacspardinyes.com${tr.path}` })),
    };

    return (
        <>
            <SEO title={t('circuitinfo.seo_title')} description={t('circuitinfo.description')} image="/cartells/nadal.webp" schema={schema} breadcrumbs={breadcrumbs} />
            <PageHeader title={t('circuitinfo.header')} breadcrumbs={breadcrumbs} />

            <div className="container pb-5">
                <div className="text-center mx-auto mb-5" style={{ maxWidth: '760px' }}>
                    <p className="text-primary font-weight-bold text-uppercase mb-2" style={{ letterSpacing: '2px' }}>{t('circuitinfo.kicker')}</p>
                    <h2 className="font-weight-bold mb-3">{t('circuitinfo.title')}</h2>
                    <p className="lead mb-0">{t('circuitinfo.intro')}</p>
                </div>

                {!CIRCUIT_SIGNUP_OPEN && (
                    <div className="mx-auto mb-5" style={{ maxWidth: '760px' }}>
                        <SignupSoon showCircuitLink={false} />
                    </div>
                )}

                <ol className="circuit-list">
                    {tournaments.map((tr) => <CircuitCard key={tr.id} tournament={tr} />)}
                </ol>
            </div>
        </>
    );
}

import { useLanguage } from '../context/LanguageContext';
import { circuitConfig } from '../data/circuitConfig';
import { localizeConfig } from '../data/circuitTranslations';

// Card data for a circuit tournament. 'tancats' is the II Tancats de Setmana Santa 2027,
// which has its own page outside circuitConfig.
export function useCircuitTournament() {
    const { t, language } = useLanguage();
    return (id) => {
        if (id === 'tancats') {
            return {
                id, path: '/tancats-setmana-santa-2027', poster: '/cartells/tancats-sm.webp',
                title: t('circuitinfo.tancats_title'), month: t('circuitinfo.tancats_month'),
                tagline: t('circuitinfo.tancats_tagline'), dates: t('circuitinfo.tancats_dates'), place: '',
            };
        }
        const c = localizeConfig(circuitConfig[id], id, language);
        return {
            id, path: `/${id}`, poster: c.poster.replace('.webp', '-sm.webp'),
            title: c.title, month: c.month, tagline: c.tagline, dates: c.dates, time: c.time, place: c.place,
        };
    };
}

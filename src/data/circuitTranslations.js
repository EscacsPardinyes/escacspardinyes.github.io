// Traduccions (es, en) dels tornejos del circuit que en tenen: Open, el seu Tancat i el Premi Actiu.
// Els altres tornejos queden en català. Cada idioma sobreescriu només els camps que defineix;
// els premis (prizeGroups) es tradueixen amb el diccionari de termes de sota.
const NOTE_FALLBACK = {
    es: "Los premios en metálico no son acumulables. Es obligatorio recoger el premio personalmente; en caso contrario se entiende que se renuncia al premio.",
    en: "Cash prizes cannot be combined. Prizes must be collected in person; otherwise the prize is considered waived.",
};

export const circuitTranslations = {
    "gran-premi-actiu-festa-major": {
        es: {
            title: "Premio Activo FM Lleida",
            month: "Mayo 2027",
            tagline: "El torneo de proximidad y de récord",
            description: "Premio Activo FM Lleida (Fiesta Mayor de Lleida): torneo de partidas rápidas de un solo día organizado por el Club Escacs Pardinyes en Lleida.",
            paragraphs: [
                "El torneo de proximidad y de récord. La gran cita elevada a nivel de referencia autonómica.",
                "Un torneo de partidas rápidas concentrado en un solo día de máxima intensidad (mañana y tarde) que se convertirá en una cita ineludible.",
            ],
            facts: [
                ["Format", "Partidas rápidas, un solo día (mañana y tarde)"],
                ["Sistema", "Suizo a 9 rondas"],
                ["Ritme de joc", "15 minutos + 5 segundos por jugada (15+5)"],
                ["Vàlid per a", "Elo FIDE y Elo catalán"],
                ["Inscripció", "20 €"],
                ["Inscripció convidats", "Gratuita para los invitados por la organización"],
                ["Inscripció reduïda", "15 € para jugadores sub-16, personas con discapacidad y jugadores del club"],
            ],
            dates: "Domingo 9 de mayo de 2027",
            prizeNote: NOTE_FALLBACK.es,
        },
        en: {
            title: "FM Lleida Rapid Prize",
            month: "May 2027",
            tagline: "A local tournament built for records",
            description: "FM Lleida Rapid Prize (Lleida Festa Major): a one-day rapid tournament organised by Club Escacs Pardinyes in Lleida.",
            paragraphs: [
                "A local tournament built for records: a major event raised to regional-reference level.",
                "A rapid tournament packed into a single day of maximum intensity (morning and afternoon), set to become an unmissable date.",
            ],
            facts: [
                ["Format", "Rapid games, a single day (morning and afternoon)"],
                ["Sistema", "Swiss, 9 rounds"],
                ["Ritme de joc", "15 minutes + 5 seconds per move (15+5)"],
                ["Vàlid per a", "FIDE and Catalan Elo"],
                ["Inscripció", "20 €"],
                ["Inscripció convidats", "Free for players invited by the organisers"],
                ["Inscripció reduïda", "€15 for under-16 players, players with a disability and club players"],
            ],
            dates: "Sunday 9 May 2027",
            prizeNote: NOTE_FALLBACK.en,
        },
    },
    "open-internacional-ciutat-de-lleida": {
        es: {
            title: "I Open Internacional «Ciutat de Lleida»",
            month: "Julio 2027",
            tagline: "El gran festival de ajedrez en masas de Lleida",
            description: "I Open Internacional «Ciutat de Lleida»: 9 días de competición con un Cerrado exclusivo y un Open abierto a todos, en Lleida.",
            paragraphs: [
                "El gran festival del ajedrez en Lleida: 9 días de competición con un Cerrado exclusivo y un Open abierto a todos.",
            ],
            facts: [
                ["Format", "Cerrado exclusivo + Open abierto a todos"],
                ["Sistema", "Suizo a 9 rondas"],
                ["Ritme de joc", "90 minutos + 30 segundos por jugada (90+30)"],
                ["Vàlid per a", "Elo FIDE y Elo catalán"],
                ["Inscripció", "40 €"],
                ["Inscripció reduïda", "30 € para jugadores sub-16, personas con discapacidad y jugadores del club"],
                ["Inscripció convidats", "Gratuita para los invitados por la organización"],
            ],
            dates: "Del 3 al 11 de julio de 2027",
            prizeNote: NOTE_FALLBACK.es,
            related: { text: "¿Eres GM o MI y quieres jugar el Cerrado?", label: "Inscripción al Cerrado", path: "/tancat-open-ciutat-de-lleida" },
        },
        en: {
            title: "1st «Ciutat de Lleida» International Open",
            month: "July 2027",
            tagline: "Lleida's big chess festival",
            description: "1st «Ciutat de Lleida» International Open: 9 days of competition with an exclusive closed tournament and an Open for everyone, in Lleida.",
            paragraphs: [
                "Lleida's big chess festival: 9 days of competition with an exclusive closed tournament and an Open for everyone.",
            ],
            facts: [
                ["Format", "Exclusive closed tournament + Open for everyone"],
                ["Sistema", "Swiss, 9 rounds"],
                ["Ritme de joc", "90 minutes + 30 seconds per move (90+30)"],
                ["Vàlid per a", "FIDE and Catalan Elo"],
                ["Inscripció", "40 €"],
                ["Inscripció reduïda", "€30 for under-16 players, players with a disability and club players"],
                ["Inscripció convidats", "Free for players invited by the organisers"],
            ],
            dates: "3 to 11 July 2027",
            prizeNote: NOTE_FALLBACK.en,
            related: { text: "Are you a GM or IM and want to play the closed tournament?", label: "Register for the closed tournament", path: "/tancat-open-ciutat-de-lleida" },
        },
    },
    "tancat-open-ciutat-de-lleida": {
        es: {
            title: "Cerrado «Ciutat de Lleida» (julio 2027)",
            month: "Julio 2027",
            tagline: "El Cerrado exclusivo del I Open Internacional «Ciutat de Lleida»",
            description: "Cerrado exclusivo del I Open Internacional «Ciutat de Lleida», organizado por el Club Escacs Pardinyes en Lleida, válido para Elo FIDE y catalán.",
            paragraphs: [
                "Torneo cerrado exclusivo dentro del I Open Internacional «Ciutat de Lleida». Las bases se publicarán pronto.",
            ],
            facts: [
                ["Format", "Cerrado exclusivo"],
                ["Sistema", "Liga (Round Robin)"],
                ["Ritme de joc", "90 minutos + 30 segundos por jugada (90+30)"],
                ["Vàlid per a", "Elo FIDE y Elo catalán"],
            ],
            dates: "Del 3 al 11 de julio de 2027",
            previous: { label: "Ver los Cerrados de Semana Santa", path: "/tancats-setmana-santa-2027" },
            related: { text: "¿Prefieres el Open?", label: "Mira el Open abierto a todos", path: "/open-internacional-ciutat-de-lleida" },
        },
        en: {
            title: "Closed tournament «Ciutat de Lleida» (July 2027)",
            month: "July 2027",
            tagline: "The exclusive closed tournament of the 1st «Ciutat de Lleida» International Open",
            description: "Exclusive closed tournament of the 1st «Ciutat de Lleida» International Open, organised by Club Escacs Pardinyes in Lleida, rated for FIDE and Catalan Elo.",
            paragraphs: [
                "An exclusive closed tournament within the 1st «Ciutat de Lleida» International Open. The rules will be published soon.",
            ],
            facts: [
                ["Format", "Exclusive closed tournament"],
                ["Sistema", "Round robin"],
                ["Ritme de joc", "90 minutes + 30 seconds per move (90+30)"],
                ["Vàlid per a", "FIDE and Catalan Elo"],
            ],
            dates: "3 to 11 July 2027",
            previous: { label: "See the Easter closed tournaments", path: "/tancats-setmana-santa-2027" },
            related: { text: "Would you rather play the Open?", label: "See the Open for everyone", path: "/open-internacional-ciutat-de-lleida" },
        },
    },
};

const NOTE_FR = "Les prix en espèces ne sont pas cumulables. Il est obligatoire de retirer son prix en personne ; à défaut, le prix est considéré comme abandonné.";

// Français (mêmes champs que les autres langues)
const FR = {
    "gran-premi-actiu-festa-major": {
        title: "Prix Rapide FM Lleida",
        month: "Mai 2027",
        tagline: "Le tournoi de proximité et de record",
        description: "Prix Rapide FM Lleida (Festa Major de Lleida) : tournoi de parties rapides sur une journée organisé par le Club Escacs Pardinyes à Lleida.",
        paragraphs: [
            "Le tournoi de proximité et de record. Le grand rendez-vous porté au rang de référence régionale.",
            "Un tournoi de parties rapides concentré sur une seule journée d'intensité maximale (matin et après-midi), appelé à devenir un rendez-vous incontournable.",
        ],
        facts: [
            ["Format", "Parties rapides, une seule journée (matin et après-midi)"],
            ["Sistema", "Système suisse en 9 rondes"],
            ["Ritme de joc", "15 minutes + 5 secondes par coup (15+5)"],
            ["Vàlid per a", "Elo FIDE et Elo catalan"],
            ["Inscripció", "20 €"],
            ["Inscripció convidats", "Gratuite pour les invités de l'organisation"],
            ["Inscripció reduïda", "15 € pour les joueurs de moins de 16 ans, les personnes en situation de handicap et les joueurs du club"],
        ],
        dates: "Dimanche 9 mai 2027",
        prizeNote: NOTE_FR,
    },
    "open-internacional-ciutat-de-lleida": {
        title: "1er Open international « Ciutat de Lleida »",
        month: "Juillet 2027",
        tagline: "Le grand festival d'échecs de Lleida",
        description: "1er Open international « Ciutat de Lleida » : 9 jours de compétition avec un tournoi fermé exclusif et un Open ouvert à tous, à Lleida.",
        paragraphs: [
            "Le grand festival d'échecs de Lleida : 9 jours de compétition avec un tournoi fermé exclusif et un Open ouvert à tous.",
        ],
        facts: [
            ["Format", "Tournoi fermé exclusif + Open ouvert à tous"],
            ["Sistema", "Système suisse en 9 rondes"],
            ["Ritme de joc", "90 minutes + 30 secondes par coup (90+30)"],
            ["Vàlid per a", "Elo FIDE et Elo catalan"],
            ["Inscripció", "40 €"],
            ["Inscripció reduïda", "30 € pour les joueurs de moins de 16 ans, les personnes en situation de handicap et les joueurs du club"],
            ["Inscripció convidats", "Gratuite pour les invités de l'organisation"],
        ],
        dates: "Du 3 au 11 juillet 2027",
        prizeNote: NOTE_FR,
        related: { text: "Vous êtes GM ou MI et souhaitez jouer le tournoi fermé ?", label: "Inscription au tournoi fermé", path: "/tancat-open-ciutat-de-lleida" },
    },
    "tancat-open-ciutat-de-lleida": {
        title: "Tournoi fermé « Ciutat de Lleida » (juillet 2027)",
        month: "Juillet 2027",
        tagline: "Le tournoi fermé exclusif du 1er Open international « Ciutat de Lleida »",
        description: "Tournoi fermé exclusif du 1er Open international « Ciutat de Lleida », organisé par le Club Escacs Pardinyes à Lleida, comptant pour l'Elo FIDE et catalan.",
        paragraphs: [
            "Tournoi fermé exclusif au sein du 1er Open international « Ciutat de Lleida ». Le règlement sera publié prochainement.",
        ],
        facts: [
            ["Format", "Tournoi fermé exclusif"],
            ["Sistema", "Toutes rondes (Round Robin)"],
            ["Ritme de joc", "90 minutes + 30 secondes par coup (90+30)"],
            ["Vàlid per a", "Elo FIDE et Elo catalan"],
        ],
        dates: "Du 3 au 11 juillet 2027",
        previous: { label: "Voir les tournois fermés de Pâques", path: "/tancats-setmana-santa-2027" },
        related: { text: "Vous préférez l'Open ?", label: "Voir l'Open ouvert à tous", path: "/open-internacional-ciutat-de-lleida" },
    },
};
for (const [id, overlay] of Object.entries(FR)) circuitTranslations[id].fr = overlay;

// Diccionari de termes dels quadres de premis (cel·la a cel·la, coincidència exacta)
const ORD_ES = { "1r": "1.º", "2n": "2.º", "3r": "3.º", "4t": "4.º", "5è": "5.º", "6è": "6.º", "7è": "7.º", "8è": "8.º", "9è": "9.º", "10è": "10.º" };
const ORD_EN = { "1r": "1st", "2n": "2nd", "3r": "3rd", "4t": "4th", "5è": "5th", "6è": "6th", "7è": "7th", "8è": "8th", "9è": "9th", "10è": "10th" };

const TERMS = {
    es: {
        ...ORD_ES,
        "Classificació general": "Clasificación general",
        "Trams d'Elo FIDE": "Tramos de Elo FIDE",
        "Categories especials": "Categorías especiales",
        "Millor jugador local": "Mejor jugador local",
        "Millor club": "Mejor club",
        "Categories d'edat": "Categorías de edad",
        "Trofeus": "Trofeos",
        "Premis per grup": "Premios por grupo",
        "Premis del Tancat": "Premios del Cerrado",
        "Lloc": "Puesto",
        "Premi": "Premio",
        "Tram": "Tramo",
        "Categoria": "Categoría",
        "Campió": "Campeón",
        "Sots campió": "Subcampeón",
        "Sènior +50": "Sénior +50",
        "Sènior +65": "Sénior +65",
        "Femení": "Femenino",
        "Millor veterà": "Mejor veterano",
        "Millor jugadora": "Mejor jugadora",
        "Millor sub-16": "Mejor sub-16",
        "Millor sub-14": "Mejor sub-14",
        "Millor sub-12": "Mejor sub-12",
        "Millor sub-10": "Mejor sub-10",
        "Millor sub-8": "Mejor sub-8",
        "Trofeu 1r i 2n": "Trofeo 1.º y 2.º",
        "Trofeu": "Trofeo",
        "Per confirmar": "Por confirmar",
        "El 1r de cada tram també rep trofeu.": "El 1.º de cada tramo también recibe trofeo.",
        "El 1r de cada categoria també rep trofeu.": "El 1.º de cada categoría también recibe trofeo.",
        "Es calcula amb la suma dels 4 millors resultats dels jugadors del club. Cal un mínim de 4 jugadors del mateix club.": "Se calcula con la suma de los 4 mejores resultados de los jugadores del club. Se necesitan al menos 4 jugadores del mismo club.",
        "Els 3 primers classificats de cada grup reben una copa.": "Los 3 primeros clasificados de cada grupo reciben una copa.",
        "Copa": "Copa",
    },
    en: {
        ...ORD_EN,
        "Classificació general": "Overall standings",
        "Trams d'Elo FIDE": "FIDE Elo bands",
        "Categories especials": "Special categories",
        "Millor jugador local": "Best local player",
        "Millor club": "Best club",
        "Categories d'edat": "Age categories",
        "Trofeus": "Trophies",
        "Premis per grup": "Prizes per group",
        "Premis del Tancat": "Closed tournament prizes",
        "Lloc": "Place",
        "Premi": "Prize",
        "Tram": "Band",
        "Categoria": "Category",
        "Campió": "Champion",
        "Sots campió": "Runner-up",
        "Sènior +50": "Senior +50",
        "Sènior +65": "Senior +65",
        "Femení": "Women",
        "Millor veterà": "Best veteran",
        "Millor jugadora": "Best female player",
        "Millor sub-16": "Best U16",
        "Millor sub-14": "Best U14",
        "Millor sub-12": "Best U12",
        "Millor sub-10": "Best U10",
        "Millor sub-8": "Best U8",
        "Sub-8": "U8",
        "Sub-10": "U10",
        "Sub-12": "U12",
        "Sub-14": "U14",
        "Sub-16": "U16",
        "Trofeu 1r i 2n": "Trophy for 1st and 2nd",
        "Trofeu": "Trophy",
        "Per confirmar": "To be confirmed",
        "El 1r de cada tram també rep trofeu.": "The winner of each band also receives a trophy.",
        "El 1r de cada categoria també rep trofeu.": "The winner of each category also receives a trophy.",
        "Es calcula amb la suma dels 4 millors resultats dels jugadors del club. Cal un mínim de 4 jugadors del mateix club.": "Calculated from the sum of the club's 4 best individual results. A minimum of 4 players from the same club is required.",
        "Els 3 primers classificats de cada grup reben una copa.": "The top 3 of each group receive a cup.",
        "Copa": "Cup",
    },
};

TERMS.fr = {
    "1r": "1er", "2n": "2e", "3r": "3e", "4t": "4e", "5è": "5e", "6è": "6e", "7è": "7e", "8è": "8e", "9è": "9e", "10è": "10e",
    "Classificació general": "Classement général",
    "Trams d'Elo FIDE": "Tranches d'Elo FIDE",
    "Categories especials": "Catégories spéciales",
    "Millor jugador local": "Meilleur joueur local",
    "Millor club": "Meilleur club",
    "Categories d'edat": "Catégories d'âge",
    "Trofeus": "Trophées",
    "Premis per grup": "Prix par groupe",
    "Premis del Tancat": "Prix du tournoi fermé",
    "Lloc": "Place",
    "Premi": "Prix",
    "Tram": "Tranche",
    "Categoria": "Catégorie",
    "Campió": "Champion",
    "Sots campió": "Vice-champion",
    "Sènior +50": "Senior +50",
    "Sènior +65": "Senior +65",
    "Femení": "Féminin",
    "Millor veterà": "Meilleur vétéran",
    "Millor jugadora": "Meilleure joueuse",
    "Millor sub-16": "Meilleur U16",
    "Millor sub-14": "Meilleur U14",
    "Millor sub-12": "Meilleur U12",
    "Millor sub-10": "Meilleur U10",
    "Millor sub-8": "Meilleur U8",
    "Sub-8": "U8", "Sub-10": "U10", "Sub-12": "U12", "Sub-14": "U14", "Sub-16": "U16",
    "Trofeu 1r i 2n": "Trophée pour les 1er et 2e",
    "Trofeu": "Trophée",
    "Per confirmar": "À confirmer",
    "El 1r de cada tram també rep trofeu.": "Le 1er de chaque tranche reçoit aussi un trophée.",
    "El 1r de cada categoria també rep trofeu.": "Le 1er de chaque catégorie reçoit aussi un trophée.",
    "Es calcula amb la suma dels 4 millors resultats dels jugadors del club. Cal un mínim de 4 jugadors del mateix club.": "Calculé à partir de la somme des 4 meilleurs résultats des joueurs du club. Il faut au moins 4 joueurs du même club.",
    "Els 3 primers classificats de cada grup reben una copa.": "Les 3 premiers de chaque groupe reçoivent une coupe.",
    "Copa": "Coupe",
};

const tr = (text, lang) => {
    if (typeof text !== "string" || !text) return text;
    let out = TERMS[lang][text] ?? text;
    if (out === text) {
        // "A · inferior a 1650", "D · fins a 1499"
        out = text
            .replace(/inferior a/, { es: "inferior a", en: "below", fr: "inférieur à" }[lang])
            .replace(/fins a/, { es: "hasta", en: "up to", fr: "jusqu'à" }[lang]);
    }
    // anglès: separador de milers amb coma (2.099 -> 2,099)
    if (lang === "en") out = out.replace(/(\d)\.(\d{3})/g, "$1,$2");
    if (lang === "fr") out = out.replace(/(\d)\.(\d{3})/g, "$1\u00a0$2");
    return out;
};

const translateGroups = (groups, lang) => groups.map((g) => ({
    ...g,
    title: tr(g.title, lang),
    head: g.head.map((h) => tr(h, lang)),
    rows: g.rows.map((r) => r.map((c) => (c === "trofeu" ? c : tr(c, lang)))),
    note: g.note ? tr(g.note, lang) : g.note,
}));

// Configuració del torneig en l'idioma demanat. Sense traducció (o en català) torna el camp original.
export function localizeConfig(config, id, lang) {
    const overlay = circuitTranslations[id]?.[lang];
    if (!overlay || lang === "ca") return config;
    const out = { ...config, ...overlay };
    if (config.prizeGroups) out.prizeGroups = translateGroups(config.prizeGroups, lang);
    if (config.prizeTotal && lang === "en") out.prizeTotal = config.prizeTotal.replace(/(\d)\.(\d{3})/g, "$1,$2");
    if (config.prizeTotal && lang === "fr") out.prizeTotal = config.prizeTotal.replace(/(\d)\.(\d{3})/g, "$1\u00a0$2");
    return out;
}

// Títol i descripció per idioma (SEO / postbuild): { ca, es, en }
export function localizedField(config, id, field) {
    const t = circuitTranslations[id];
    return { ca: config[field], es: t?.es?.[field] ?? config[field], en: t?.en?.[field] ?? config[field], fr: t?.fr?.[field] ?? config[field] };
}

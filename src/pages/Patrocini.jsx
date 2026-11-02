import { useEffect, useState, useSyncExternalStore } from 'react';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';
import { Link } from '../components/LocalizedLink';
import PatrociniForm from '../components/PatrociniForm';
import { PATROCINI_HASH } from '../data/patrociniAccess';

const h2Style = { scrollMarginTop: '90px', fontSize: '1.6em', color: '#111111', marginTop: '40px', borderBottom: '2px solid #E31C25', paddingBottom: '5px' };

const champions = [
    ['Xavier Mompel Ferruz', 'Jove talent català, Mestre FIDE i jugador número 1 indiscutible de Guinea Equatorial amb l\'Elo més alt. Acaba de fer història mundial a les Olimpíades aconseguint el rècord absolut històric de puntuació de la competició amb 10,5 punts sobre 11 possibles, una fita estratosfèrica. Al Mundial d\'escacs de joventut ha quedat 5è a la categoria Sub-17 i 1r a la Sub-16.'],
    ['Kevin Noboa Silva', 'Actual jugador número 1 de l\'Equador, referent de la selecció del seu país a les recents Olimpíades i un dels grans atractius del torneig.'],
    ['Tomás Sosa', 'Ha liderat l\'equip del seu país a les Olimpíades com a capità de la selecció argentina i és Campió del I Campionat Iberoamericà de partides ràpides (2023).'],
    ['Karen Movsziszian', 'Campió del Món Sènior (+50) el 2018, Campió d\'Europa Sènior (+50) el 2017 i Campió absolut d\'Armènia (1981).'],
    ['Phileas Mathieu', 'Campió d\'escacs infantil a França en diverses categories.'],
    ['Filemón Cruz', 'Campió absolut del Perú l\'any 2000.'],
    ['Michael Oratovsky', 'Campió d\'Israel Sub-20 (1993) i Campió d\'Israel de partides ràpides i per equips (2000).'],
];

const local = [
    ['Guillermo Baches García', 'Campió de Catalunya absolut l\'any 2003, Campió d\'Espanya infantil i subcampió d\'Espanya de partides ràpides (2005).'],
    ['Jonathan Cruz', 'Campió de Catalunya de partides ràpides (2012) i múltiples vegades campió júnior/juvenil del Perú.'],
    ['Guerau Masagué Artero', 'Múltiple vegades Campió de Catalunya Juvenil.'],
];

// Bandera (codi flagcdn) i títol de cada jugador. Títols pendents de confirmar: deixar '' per ocultar-los.
const img = (path) => encodeURI(path);

const players = {
    'Xavier Mompel Ferruz': { flag: 'gq', country: 'Guinea Equatorial', title: 'MF', photo: '/jugadors/xavier-mompel.webp', pos: 'center 0%', links: [['Mundial Sub-17','https://ajedrezguinea.com/internacionales/xavier-monpel-quinto-mundial-ajedrez-u17/']] },
    'Kevin Noboa Silva': { flag: 'ec', country: 'Equador', title: 'MI', photo: '/jugadors/kevin-noboa.webp', links: [['La Prensa','https://laprensa.com.ec/kevin-noboa-oro-ecuador-olimpiada-mundial-ajedrez/']] },
    'Tomás Sosa': { flag: 'ar', country: 'Argentina', title: 'GM', photo: '/dossier/tomas-sosa.webp', links: [['FEDA', 'https://feda.org/feda2k16/gm-tomas-sosa-campeon-iberamericano-blitz/']] },
    'Karen Movsziszian': { flag: 'am', country: 'Armènia', title: 'GM', photo: '/jugadors/karen-movsziszian.webp', links: [['Federació Catalana','https://escacs.cat/index.php/9-uncategorised/25228-karen-movsziszian-nou-campio-d-europa-de-veterans-50']] },
    'Phileas Mathieu': { flag: 'fr', country: 'França', title: 'MI', photo: '/dossier/phileas-mathieu.webp', links: [['RCF','https://www.rcf.fr/articles/culture/phileas-mathieu-maitre-international-dechecs-je-suis-tout-de-suite-tombe-amoureux']] },
    'Filemón Cruz': { flag: 'pe', country: 'Perú', title: 'MI', photo: '/jugadors/filemon-cruz.webp', links: [['Torre64','https://torre64.com/entrevista-al-mi-filemon-cruz-del-peru/']] },
    'Michael Oratovsky': { flag: 'il', country: 'Israel', title: 'GM', photo: '/jugadors/michael-oratovsky.webp', pos: 'center 35%', links: [['Chesspedia','https://thechesspedia.net/oratovsky-michael/']] },
    'Guillermo Baches García': { flag: 'es-ct', country: 'Catalunya', title: 'MI', photo: '/jugadors/guillermo-baches.webp', links: [['ChessBase','https://shop.chessbase.com/es/authors/baches']] },
    'Jonathan Cruz': { flag: 'pe', country: 'Perú', title: 'MI', photo: '/jugadors/jonathan-cruz.webp', links: [['Wikipedia','https://es.wikipedia.org/wiki/Jonathan_Esteban_Cruz_S%C3%A1nchez']] },
    'Guerau Masagué Artero': { flag: 'es-ct', country: 'Catalunya', title: 'MI', photo: '/jugadors/guerau-masague.webp', links: [['Sub-18 ràpid 2018','https://feda.org/feda2k16/campeonato-de-espana-sub-18-rapido-3/'],['Sub-18 2021','https://fegaxa.org/campeonato-de-espana-sub-16-2021/'],['Biografia','http://www.bidmonfa.com/masague_guerau.htm']] },
};

const PlayerCard = ([name, text]) => {
    const { flag, country, title, photo, pos, links } = players[name];
    return (
        <div key={name} className="patro-card">
            {photo && <img src={img(photo)} alt={name} className="patro-photo" style={pos ? { objectPosition: pos } : undefined} loading="lazy" decoding="async" />}
            <h4 className="patro-player">
                <img src={flag === 'es-ct' ? '/docs/catalunya.svg' : `https://flagcdn.com/w40/${flag}.png`} srcSet={flag === 'es-ct' ? undefined : `https://flagcdn.com/w80/${flag}.png 2x`} width="28" height="21" alt={country} title={country} loading="lazy" />
                <span>{name}</span>
                {title && <span className="patro-title">{title}</span>}
            </h4>
            <p>{text}</p>
            {links && <p className="patro-links">{links.map(([label, href]) => <a key={href} href={href} target="_blank" rel="noopener noreferrer">{label}</a>)}</p>}
        </div>
    );
};

const audience = [
    ['Cobertura online massiva', 'Les partides, retransmeses en directe amb taulers tecnològics, van registrar pics màxims de 2.103 espectadors simultanis d\'arreu del món.'],
    ['Fidelització d\'audiència', 'Vam mantenir un mínim constant d\'uns 1.000 espectadors únics diferents cada dia durant els dies de competició.'],
    ['Ressò a la premsa', 'Ampli seguiment per part dels mitjans de comunicació i premsa local/comarcal, que es van fer ressò del gran impacte d\'acollir els Tancats a Lleida, consolidant el prestigi de l\'esdeveniment i de les marques que ens donen suport.'],
    ['Perfil de l\'espectador i jugador', 'Els escacs atrauen un públic d\'alt valor afegit. La nostra audiència està formada majoritàriament per un segment d\'edat d\'entre 25 i 55 anys, amb un perfil professional i formació superior. Associar la vostra marca als escacs significa connectar amb un públic d\'alta capacitat analítica, poder adquisitiu i fidelitat.'],
];

const options = [
    {
        title: 'Opció 1: Naming global (Premium 35è Aniversari)',
        price: 'Projecte a mida',
        items: [
            ['Descripció', 'Presència absoluta. El circuit portarà el teu nom («Circuit Marca X»).'],
            ['Visibilitat', 'Logo mida XL al centre del photocall principal i 4 roll-ups corporatius exclusius a la sala de joc.'],
            ['Activació', 'Dret a realitzar la «Jugada d\'Honor» (inauguració del torneig) amb fotografia per a la premsa a les 5 competicions.'],
            ['Digital', 'Logo fix a totes les retransmissions en directe i presència a l\'equipació del primer equip.'],
        ],
    },
    {
        title: 'Opció 2: Naming «Ciutat de Lleida» (juliol)',
        price: 'Des de 1.500 €',
        items: [
            ['Descripció', 'L\'esdeveniment massiu. Patrocini exclusiu del torneig estrella de 9 dies.'],
            ['Visibilitat', 'Logo mida L al photocall i 2 roll-ups corporatius a la sala de joc.'],
            ['Activació', 'Possibilitat de col·locar un petit estand o repartir material/marxandatge promocional directe als més de 150 jugadors participants.'],
            ['Protocol', 'Lliurament del Trofeu de Campió per part d\'un directiu de la teva empresa amb foto oficial.'],
        ],
    },
    {
        title: 'Opció 3: Naming Premi Actiu FM Lleida (maig)',
        price: 'Des de 500 €',
        items: [
            ['Descripció', 'L\'esdeveniment de proximitat. Presència a la gran festa del barri.'],
            ['Visibilitat', 'Logo mida M al photocall i 1 roll-up a la sala.'],
            ['Activació', 'Mencions constants per megafonia durant tot el dia com a patrocinador principal de la jornada.'],
            ['Protocol', 'Protagonisme visual durant el lliurament de premis al carrer durant la Festa Major.'],
        ],
    },
    {
        title: 'Opció 4: Naming Tancats d\'Elit (març)',
        price: 'Des de 750 €',
        items: [
            ['Descripció', 'L\'aparador internacional. Focalitzat en el retorn digital i l\'elit mundial.'],
            ['Visibilitat digital', 'El teu logotip integrat permanentment de forma gràfica a la pantalla de les retransmissions en directe / Twitch (impactant els milers d\'espectadors concurrents).'],
            ['Relacions públiques', 'Menció destacada als titulars i als cossos de les notes de premsa enviades als mitjans de comunicació globals.'],
        ],
    },
    {
        title: 'Opció 5: Col·laboradors oficials de premis',
        price: 'Des de 300 €',
        items: [
            ['Descripció', 'Suport a l\'esport base. Aportació per finançar els premis aficionats.'],
            ['Visibilitat', 'Logo mida S al photocall general de col·laboradors.'],
            ['Xarxes socials', 'Agraïment públic en publicacions dedicades a les xarxes socials del club i menció durant l\'entrega de guardons finals.'],
        ],
    },
    {
        title: 'Opció 6: Amic del club',
        price: 'Des de 150 €',
        items: [
            ['Descripció', 'La manera més senzilla d\'afegir-se al circuit. Ideal per a comerços i professionals de proximitat.'],
            ['Xarxes socials', 'Publicació pròpia a les xarxes socials del club donant les gràcies al teu negoci.'],
        ],
    },
];

function PatrociniContent() {
    const { t } = useLanguage();

    return (
        <>
            <SEO title={t('patrocini.header')} description={t('patrocini.description')} />
            <div className="container-fluid page-header mb-5">
                <div className="d-flex flex-column align-items-center justify-content-center pt-0 pt-lg-5" style={{ minHeight: '400px' }}>
                    <h1 className="display-4 mb-3 mt-0 mt-lg-5 text-white text-uppercase font-weight-bold text-center">{t('patrocini.header')}</h1>
                    <p className="text-white text-center px-3" style={{ maxWidth: '700px' }}>35è aniversari del Club (1992-2027): consolidant Lleida com a capital dels escacs</p>
                </div>
            </div>

            <div className="container pb-5" style={{ maxWidth: '1100px', lineHeight: 1.7 }}>

                <div className="patro-stats">
                    <div className="patro-stat"><strong>35</strong><span>anys d'història</span></div>
                    <div className="patro-stat"><strong>3</strong><span>participants dels Tancats a les Olimpíades</span></div>
                    <div className="patro-stat"><strong>2.103</strong><span>espectadors simultanis</span></div>
                    <div className="patro-stat"><strong>5</strong><span>grans esdeveniments</span></div>
                </div>

                <nav aria-label="Índex" className="card mb-4">
                    <div className="card-body">
                        <h2 className="h5 mb-3">Índex</h2>
                        <ol className="mb-0" style={{ listStyle: 'none', paddingLeft: 0 }}>
                            <li className="mb-1"><a href="#moment">1. El nostre moment</a></li>
                            <li className="mb-1"><a href="#aval">2. L'aval del nostre èxit</a></li>
                            <li className="mb-1"><a href="#circuit">3. El circuit de tornejos</a></li>
                            <li className="mb-1"><a href="#proposta">4. Proposta de patrocini</a></li>
                            <li className="mb-1"><a href="#contacte">Contacte</a></li>
                        </ol>
                    </div>
                </nav>

                <h2 id="moment" style={h2Style}>1. El nostre moment: experiència i prestigi</h2>
                <p>El Club Escacs Pardinyes compleix 35 anys consolidat com un referent. Sumem a la nostra històrica tasca de base al barri (escola d'escacs) un salt competitiu històric amb l'ascens del nostre primer equip a la Segona Divisió Catalana. Ara volem portar Lleida al següent nivell organitzatiu amb un circuit de cinc grans esdeveniments.</p>

                <h2 id="aval" style={h2Style}>2. L'aval del nostre èxit: els primers Tancats i la seva repercussió</h2>
                <p>La millor garantia per als nostres patrocinadors és el que ja hem aconseguit. Davant l'extrema dificultat logística que implica organitzar tornejos tancats internacionals a Catalunya, el Club Escacs Pardinyes va assumir amb èxit rotund els <Link to="/tancats-setmana-santa-2026">Tancats de Setmana Santa</Link>, els dos únics celebrats a tot el territori català, convertint Lleida en l'epicentre mundial dels escacs durant aquells dies.</p>

                <h3 id="participants" className="h4 mt-4" style={{ scrollMarginTop: '90px' }}>Els jugadors dels primers Tancats de Setmana Santa (2026)</h3>
                <p>Els Tancats de Setmana Santa 2026 van reunir a Lleida jugadors de diversos països que buscaven normes de Gran Mestre (GM) i Mestre Internacional (MI). Agraïm la participació de tots ells. A continuació en resumim el palmarès esportiu; apareixen aquí com a participants d'aquella edició, a títol informatiu.</p>

                <h4 className="h5 mt-4">Participants internacionals</h4>
                <div className="patro-grid">
                    {champions.map(PlayerCard)}
                </div>

                <h4 className="h5 mt-4">Participants de Catalunya i Espanya</h4>
                <div className="patro-grid">
                    {local.map(PlayerCard)}
                </div>

                <h3 className="h4 mt-4">Detalls de premsa i audiència: un impacte global</h3>
                <p>L'expectació generada pels Tancats va transcendir el format presencial, convertint-se en un autèntic fenomen digital i mediàtic, ideal per a la visibilitat de qualsevol marca patrocinadora.</p>
                <div className="patro-grid">
                    {audience.map(([name, text]) => <div key={name} className="patro-card"><h4>{name}</h4><p>{text}</p></div>)}
                </div>
                <div className="patro-photos">
                    <figure><img src={img('/dossier/premsa-capital-escacs.webp')} alt="Notícia de premsa: Lleida, capital dels escacs" loading="lazy" /></figure>
                    <figure><img src={img('/dossier/premsa-fita-historica.webp')} alt="Notícia de premsa: fita històrica a Lleida" loading="lazy" /></figure>
                    <figure><img src={img('/dossier/premsa-lleida-elit.webp')} alt="Notícia de premsa: Lleida, elit dels escacs" loading="lazy" /></figure>
                </div>
                <p>Més fotos i informació a la <Link to="/tancats-setmana-santa-2026">pàgina dels Tancats de Setmana Santa</Link>.</p>

                <h2 id="circuit" style={h2Style}>3. El circuit de tornejos (les oportunitats de patrocini)</h2>
                <p>El nostre 35è aniversari no és només una celebració puntual, sinó el punt de llançament per consolidar aquests cinc grans esdeveniments de forma anual. Apostem per fer-los tots la mateixa temporada per transformar Lleida en un referent fix al calendari escaquístic català de gener a desembre.</p>
                <div className="patro-grid">
                    <div className="patro-card"><Link to="/torneig-nadal-2027"><img className="patro-poster" src="/cartells/nadal-sm.webp" alt="Cartell del torneig" width="560" height="700" loading="lazy" decoding="async" /></Link><span className="patro-badge">Gener</span><h3>La cita familiar: IV Torneig de Nadal</h3><p>L'esdeveniment clàssic per encetar l'any escaquístic. Un torneig per a jugadors fins a 16 anys i amb un màxim de 1.700 d'Elo, aprofitant la recta final de les vacances d'hivern. És la cita ideal per fomentar l'esport base, atraure famílies senceres a les nostres instal·lacions i donar suport al desenvolupament intel·lectual dels futurs talents de la província. <Link to="/torneig-nadal-2025">Veure l'edició anterior</Link>.</p><p className="mt-2"><Link to="/torneig-nadal-2027"><strong>Més informació i inscripció</strong></Link></p></div>
                    <div className="patro-card"><Link to="/tancats-setmana-santa-2027"><img className="patro-poster" src="/cartells/tancats-sm.webp" alt="Cartell del torneig" width="560" height="700" loading="lazy" decoding="async" /></Link><span className="patro-badge">Març</span><h3>Torneig d'elit: II edició dels Tancats de Setmana Santa</h3><p>Exclusivitat, prestigi i impacte tecnològic. Consolidem per segon any consecutiu aquest esdeveniment exclusiu on l'elit mundial busca normes de Gran Mestre, Mestre Internacional i MC, assegurant un retorn digital massiu a través de la retransmissió de taulers electrònics.</p><p className="mt-2"><Link to="/noticies/que-es-un-tancat-gm-mi">Què són els Tancats i per què són tan importants</Link> · <Link to="/tancats-setmana-santa-2026">Veure la primera edició</Link> · <a href="#participants">Qui hi va participar</a></p><p className="mt-2"><Link to="/tancats-setmana-santa-2027"><strong>Més informació i inscripció</strong></Link></p></div>
                    <div className="patro-card"><Link to="/gran-premi-actiu-festa-major"><img className="patro-poster" src="/cartells/actiu-sm.webp" alt="Cartell del torneig" width="560" height="700" loading="lazy" decoding="async" /></Link><span className="patro-badge">Maig</span><h3>Torneig Estrella 2: Premi Actiu FM Lleida</h3><p>El torneig de proximitat i de rècord. La gran cita elevada a nivell de referència autonòmica. Un torneig de partides ràpides concentrat en un sol dia d'intensitat màxima (matí i tarda) que es convertirà en una cita ineludible.</p><p className="mt-2"><Link to="/gran-premi-actiu-festa-major"><strong>Més informació i inscripció</strong></Link></p></div>
                    <div className="patro-card"><Link to="/open-internacional-ciutat-de-lleida"><img className="patro-poster" src="/cartells/open-sm.webp" alt="Cartell del torneig" width="560" height="700" loading="lazy" decoding="async" /></Link><span className="patro-badge">Juliol</span><h3>Torneig Estrella 1: I Open Internacional «Ciutat de Lleida»</h3><p>El gran festival de masses. El projecte més ambiciós del club, dissenyat per perdurar cada estiu. 9 dies de competició ininterrompuda on combinarem un Tancat exclusiu i un Open obert a tothom. L'objectiu fundacional d'aquesta primera edició és superar els 150 jugadors inscrits. Aquest gran volum de participants suposarà un impuls directe per a l'economia local, generant activitat contínua en l'hostaleria i el comerç de Lleida.</p><p className="mt-2"><Link to="/open-internacional-ciutat-de-lleida"><strong>Més informació i inscripció</strong></Link></p></div>
                    <div className="patro-card"><Link to="/torneig-festa-major-pardinyes-2027"><img className="patro-poster" src="/cartells/pardinyes-sm.webp" alt="Cartell del torneig" width="560" height="700" loading="lazy" decoding="async" /></Link><span className="patro-badge">Agost</span><h3>L'arrelament al barri: Torneig de Festa Major de Pardinyes</h3><p>El compromís directe amb els nostres orígens. Un torneig dinàmic pensat per formar part activa del programa de festes del barri, traient els escacs al carrer i apropant-los als veïns per descobrir nous talents locals. <Link to="/torneig-festa-major">Veure el torneig</Link>.</p><p className="mt-2"><Link to="/torneig-festa-major-pardinyes-2027"><strong>Més informació i inscripció</strong></Link></p></div>
                </div>

                <h2 id="proposta" style={h2Style}>4. Proposta de patrocini: mou fitxa amb nosaltres</h2>
                <p>Per fer viable aquest projecte estratègic per a la ciutat, oferim diferents vies perquè la vostra marca obtingui un retorn tangible, associant-se a l'intel·lecte, el prestigi i la notorietat d'aquest esdeveniment global.</p>
                <div className="patro-grid">
                    {options.map(opt => (
                        <div key={opt.title} className="patro-card">
                            <h3>{opt.title}</h3>
                            <div className="patro-price">{opt.price}</div>
                            <ul>
                                {opt.items.map(([label, text]) => <li key={label}><strong>{label}:</strong> {text}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="patro-quote"><h3 className="h5">Avantatges fiscals per a la teva empresa</h3><p className="mb-0">Sabies que patrocinar el Club Escacs Pardinyes té premi? Totes les aportacions de patrocini esportiu són despeses deduïbles en l'Impost de Societats del teu negoci. T'ajudarem a formalitzar el contracte de patrocini publicitari perquè puguis desgravar-te la inversió legalment.</p></div>

                <h2 id="contacte" style={h2Style}>Contacte</h2>
                <div className="patro-contact">
                    <p>Vols que la teva marca formi part d'aquest salt qualitatiu i doni suport al prestigi dels escacs a Lleida? Estem a la teva disposició per reunir-nos, detallar-te les opcions i adaptar qualsevol dels paquets de patrocini a les necessitats reals de la teva empresa.</p>
                    <p><strong>Mou fitxa i contacta amb nosaltres:</strong></p>
                    <ul className="mb-0">
                        <li>Responsable de Patrocinis: Jordi Obis Farré</li>
                        <li>Telèfon directe: <a href="tel:+34619070825">619 07 08 25</a></li>
                        <li>Correu electrònic: <a href="mailto:escacspardinyes@gmail.com">escacspardinyes@gmail.com</a></li>
                        <li>Lloc web: <a href="https://escacspardinyes.com">escacspardinyes.com</a></li>
                    </ul>
                </div>

                <h3 className="h4 mt-5 text-center">Escriu-nos i et respondrem aviat</h3>
                <PatrociniForm />

                <p className="small text-muted mt-3">{t('patrocini.lang_note')}</p>
            </div>
        </>
    );
}

const STORAGE_KEY = 'patrocini-access';
const UNLOCK_EVENT = 'patrocini-unlock';

// Estat desbloquejat guardat al navegador. El servidor (prerender) sempre el veu bloquejat.
const subscribeAccess = (cb) => {
    window.addEventListener('storage', cb);
    window.addEventListener(UNLOCK_EVENT, cb);
    return () => { window.removeEventListener('storage', cb); window.removeEventListener(UNLOCK_EVENT, cb); };
};
const storedAccess = () => { try { return localStorage.getItem(STORAGE_KEY) === PATROCINI_HASH; } catch { return false; } };

async function sha256(text) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
    return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}

// Pantalla de contrasenya del dossier. Mostra el contingut només quan el hash coincideix.
export default function Patrocini() {
    const { t } = useLanguage();
    const stored = useSyncExternalStore(subscribeAccess, storedAccess, () => false);
    const [passed, setPassed] = useState(false);
    const unlocked = stored || passed;
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        const meta = document.createElement('meta');
        meta.name = 'robots';
        meta.content = 'noindex, nofollow';
        document.head.appendChild(meta);
        return () => meta.remove();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const hash = await sha256(password);
        if (hash === PATROCINI_HASH) {
            try { localStorage.setItem(STORAGE_KEY, hash); window.dispatchEvent(new Event(UNLOCK_EVENT)); } catch { /* sense emmagatzematge: es demana cada cop */ }
            setError(false);
            setPassed(true);
        } else {
            setError(true);
        }
    };

    if (unlocked) return <PatrociniContent />;

    return (
        <>
            <SEO title={t('patrocini.header')} description={t('patrocini.description')} />
            <div className="container-fluid page-header mb-5">
                <div className="d-flex flex-column align-items-center justify-content-center pt-0 pt-lg-5" style={{ minHeight: '300px' }}>
                    <h1 className="display-4 mb-3 mt-0 mt-lg-5 text-white text-uppercase font-weight-bold text-center">{t('patrocini.header')}</h1>
                    <p className="text-white text-center px-3" style={{ maxWidth: '700px' }}>35è aniversari del Club (1992-2027)</p>
                </div>
            </div>
            <div className="container pb-5" style={{ maxWidth: '640px' }}>
                <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-sm text-left">
                    <h2 className="h4 font-weight-bold mb-2">Accés privat</h2>
                    <p className="mb-4">Aquest dossier és només per a patrocinadors. Introdueix la contrasenya que t'ha facilitat el Club Escacs Pardinyes.</p>
                    <div className="form-group mb-3">
                        <label className="font-weight-bold mb-2" htmlFor="patro-pwd">Contrasenya</label>
                        <input id="patro-pwd" type="password" className="form-control p-4" value={password} onChange={(e) => { setPassword(e.target.value); setError(false); }} autoComplete="current-password" required />
                    </div>
                    {error && <p className="text-danger small font-weight-bold mb-3"><i className="fas fa-exclamation-circle mr-1"></i>Contrasenya incorrecta.</p>}
                    <button type="submit" className="btn btn-primary btn-block py-3 font-weight-bold">Accedir</button>
                    <p className="small text-muted mt-3 mb-0">No tens la contrasenya? Escriu-nos a <a href="mailto:escacspardinyes@gmail.com">escacspardinyes@gmail.com</a>.</p>
                </form>

                <div className="mt-5">
                    <h2 className="h4 font-weight-bold text-center mb-2">Vols patrocinar el circuit del 35è aniversari?</h2>
                    <p className="text-center mb-4">Si ets una empresa i t'interessa col·laborar amb el Club Escacs Pardinyes, deixa'ns les teves dades i et farem arribar el dossier i les opcions de patrocini.</p>
                    <PatrociniForm />
                </div>
            </div>
        </>
    );
}

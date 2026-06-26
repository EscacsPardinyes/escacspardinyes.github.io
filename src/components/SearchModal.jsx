import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { news } from '../data/news';

export default function SearchModal() {
    const { t, language } = useLanguage();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef(null);
    const listRef = useRef(null);

    // Global keyboard listener for Cmd+K / Ctrl+K
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(true);
            }
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };

        const handleCustomOpen = () => setIsOpen(true);

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('open-search-modal', handleCustomOpen);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('open-search-modal', handleCustomOpen);
        };
    }, [isOpen]);

    // Focus input when modal opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current.focus(), 50);
            setQuery('');
            setResults([]);
            setSelectedIndex(0);
        }
    }, [isOpen]);

    // Predefined pages
    const pages = [
        { title: t('nav.home'), url: '/', type: 'page', icon: 'fa-home' },
        { title: t('nav.about'), url: '/about', type: 'page', icon: 'fa-info-circle' },
        { title: t('nav.school'), url: '/school', type: 'page', icon: 'fa-graduation-cap' },
        { title: t('nav.federated'), url: '/federat', type: 'page', icon: 'fa-chess-king' },
        { title: t('nav.tancats'), url: '/tancats', type: 'page', icon: 'fa-trophy' },
        { title: t('nav.contact'), url: '/contact', type: 'page', icon: 'fa-envelope' },
    ];

    // Search logic
    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const lowerQuery = query.toLowerCase();

        // Search pages
        const matchedPages = pages.filter(p => p.title.toLowerCase().includes(lowerQuery));

        // Search news
        const matchedNews = news.filter(n => 
            n.title[language]?.toLowerCase().includes(lowerQuery) || 
            n.summary[language]?.toLowerCase().includes(lowerQuery)
        ).map(n => ({
            title: n.title[language],
            url: `/noticies/${n.id}`,
            type: 'news',
            icon: 'fa-newspaper',
            date: n.date
        }));

        setResults([...matchedPages, ...matchedNews].slice(0, 8)); // limit to 8 results
        setSelectedIndex(0);
    }, [query, language]);

    // Keyboard navigation within the modal
    const handleModalKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (results.length > 0) {
                navigate(results[selectedIndex].url);
                setIsOpen(false);
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="search-modal-overlay" onClick={() => setIsOpen(false)}>
            <div className="search-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="search-modal-header">
                    <i className="fa fa-search search-icon"></i>
                    <input 
                        ref={inputRef}
                        type="text" 
                        className="search-input" 
                        placeholder={language === 'ca' ? 'Cerca notícies, pàgines...' : language === 'es' ? 'Buscar noticias, páginas...' : 'Search news, pages...'}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleModalKeyDown}
                    />
                    <button className="search-close" onClick={() => setIsOpen(false)}>
                        <i className="fa fa-times"></i>
                    </button>
                </div>
                
                {query.trim() && (
                    <div className="search-modal-body" ref={listRef}>
                        {results.length > 0 ? (
                            <ul className="search-results-list">
                                {results.map((result, idx) => (
                                    <li 
                                        key={idx} 
                                        className={`search-result-item ${idx === selectedIndex ? 'selected' : ''}`}
                                        onMouseEnter={() => setSelectedIndex(idx)}
                                        onClick={() => {
                                            navigate(result.url);
                                            setIsOpen(false);
                                        }}
                                    >
                                        <div className="result-icon">
                                            <i className={`fa ${result.icon}`}></i>
                                        </div>
                                        <div className="result-content">
                                            <span className="result-title">{result.title}</span>
                                            <span className="result-type">
                                                {result.type === 'page' ? (language === 'ca' ? 'Pàgina' : 'Página') : (language === 'ca' ? 'Notícia' : 'Noticia')}
                                            </span>
                                        </div>
                                        <i className="fa fa-chevron-right result-arrow"></i>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="search-no-results">
                                <i className="fa fa-ghost mb-3" style={{ fontSize: '2rem', color: '#ccc' }}></i>
                                <p>{language === 'ca' ? 'Cap resultat trobat.' : language === 'es' ? 'No se encontraron resultados.' : 'No results found.'}</p>
                            </div>
                        )}
                    </div>
                )}
                <div className="search-modal-footer">
                    <span><kbd>↑</kbd> <kbd>↓</kbd> Navegar</span>
                    <span><kbd>Enter</kbd> Seleccionar</span>
                    <span><kbd>Esc</kbd> Sortir</span>
                </div>
            </div>

            <style>{`
                .search-modal-overlay {
                    position: fixed;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(0, 0, 0, 0.6);
                    backdrop-filter: blur(4px);
                    z-index: 1060;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    padding-top: 10vh;
                    animation: fadeIn 0.2s ease-out;
                }
                .search-modal-content {
                    width: 100%;
                    max-width: 600px;
                    background: var(--bg-light);
                    border-radius: 16px;
                    box-shadow: 0 25px 50px rgba(0,0,0,0.25);
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    border: 1px solid rgba(0,0,0,0.1);
                    animation: slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .search-modal-header {
                    display: flex;
                    align-items: center;
                    padding: 0 20px;
                    border-bottom: 1px solid rgba(0,0,0,0.05);
                }
                .search-icon {
                    font-size: 1.2rem;
                    color: var(--primary-color);
                }
                .search-input {
                    flex: 1;
                    border: none;
                    padding: 20px 15px;
                    font-size: 1.2rem;
                    background: transparent;
                    color: var(--text-main);
                    outline: none;
                }
                .search-close {
                    background: none;
                    border: none;
                    color: #999;
                    font-size: 1.2rem;
                    cursor: pointer;
                    padding: 10px;
                    border-radius: 50%;
                    transition: all 0.2s;
                }
                .search-close:hover {
                    background: rgba(0,0,0,0.05);
                    color: var(--text-main);
                }
                .search-modal-body {
                    max-height: 400px;
                    overflow-y: auto;
                }
                .search-results-list {
                    list-style: none;
                    padding: 10px;
                    margin: 0;
                }
                .search-result-item {
                    display: flex;
                    align-items: center;
                    padding: 15px;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: all 0.1s;
                }
                .search-result-item.selected, .search-result-item:hover {
                    background: rgba(255, 193, 7, 0.1);
                }
                .result-icon {
                    width: 40px;
                    height: 40px;
                    background: #f8f9fa;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 15px;
                    color: #555;
                }
                .search-result-item.selected .result-icon {
                    background: var(--primary-color);
                    color: var(--secondary-color);
                }
                .result-content {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }
                .result-title {
                    font-weight: 600;
                    color: var(--text-main);
                    font-size: 1rem;
                }
                .result-type {
                    font-size: 0.75rem;
                    color: #888;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin-top: 4px;
                }
                .result-arrow {
                    color: #ccc;
                    font-size: 0.8rem;
                    opacity: 0;
                    transition: opacity 0.2s;
                }
                .search-result-item.selected .result-arrow {
                    opacity: 1;
                    color: var(--primary-color);
                }
                .search-no-results {
                    padding: 40px 20px;
                    text-align: center;
                    color: #888;
                }
                .search-modal-footer {
                    padding: 12px 20px;
                    background: #f8f9fa;
                    border-top: 1px solid rgba(0,0,0,0.05);
                    display: flex;
                    gap: 20px;
                    font-size: 0.8rem;
                    color: #666;
                }
                .search-modal-footer kbd {
                    background: #fff;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    padding: 2px 6px;
                    font-family: monospace;
                    font-size: 0.75rem;
                    box-shadow: 0 1px 1px rgba(0,0,0,0.1);
                    margin-right: 4px;
                }
                @keyframes slideDown {
                    from { transform: translateY(-20px) scale(0.98); opacity: 0; }
                    to { transform: translateY(0) scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
}

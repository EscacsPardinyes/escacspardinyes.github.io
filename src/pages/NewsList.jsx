import { useState, useEffect } from 'react';
import { news } from '../data/news';
import { useLanguage } from '../context/LanguageContext';
import PageHeader from '../components/PageHeader';
import NewsCard from '../components/NewsCard';
import SEO from '../components/SEO';

const ITEMS_PER_PAGE = 12;

export default function NewsList() {
    const { language, t } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [sortOrder, setSortOrder] = useState('desc');
    const [currentPage, setCurrentPage] = useState(1);

    const breadcrumbs = [{ label: t('news.header') }];

    const categories = [
        { id: 'all', icon: 'fa-layer-group' },
        { id: 'simultanies', icon: 'fa-chess-board' },
        { id: 'torneig', icon: 'fa-trophy' },
        { id: 'prensa', icon: 'fa-newspaper' }
    ];

    // Filter and Sort news
    const filteredNews = news
        .filter(item => {
            const query = searchQuery.toLowerCase();
            const titleMatch = item.title[language].toLowerCase().includes(query);
            const summaryMatch = item.summary[language].toLowerCase().includes(query);
            const contentMatch = item.content[language].toLowerCase().includes(query);
            const categoryMatch = activeCategory === 'all' || item.category === activeCategory;
            return (titleMatch || summaryMatch || contentMatch) && categoryMatch;
        })
        .sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
        });

    // Pagination logic
    const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedNews = filteredNews.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    // Reset to page 1 when search or filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, activeCategory, sortOrder]);

    // Scroll to top when page changes
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div style={{ backgroundColor: '#f9fbf9', minHeight: '100vh' }}>
            <SEO title={t('news.header')} description={t('news.subtitle')} />
            <PageHeader title={t('news.header')} breadcrumbs={breadcrumbs} />

            <div className="container py-5">
                {/* Search & Header Section */}
                <div className="row mb-5 align-items-end">
                    <div className="col-lg-6 mb-4 mb-lg-0">
                        <h2 className="display-4 font-weight-bold mb-3" style={{ color: '#1a3a1a', letterSpacing: '-1px' }}>
                            {t('news.title')}
                        </h2>
                        <p className="lead text-muted mb-0" style={{ maxWidth: '500px' }}>
                            {t('news.subtitle')}
                        </p>
                    </div>
                    <div className="col-lg-6">
                        <div className="position-relative">
                            <i className="fa fa-search position-absolute" style={{ left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#2e7d32', zIndex: 10 }}></i>
                            <input
                                type="text"
                                className="form-control"
                                placeholder={t('news.search')}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    paddingLeft: '50px',
                                    height: '60px',
                                    borderRadius: '30px',
                                    border: 'none',
                                    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                                    fontSize: '1.1rem'
                                }}
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="btn position-absolute"
                                    style={{ right: '15px', top: '50%', transform: 'translateY(-50%)', color: '#999', padding: '5px 10px' }}
                                >
                                    <i className="fa fa-times-circle"></i>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Filters Section */}
                <div className="d-flex flex-wrap align-items-center justify-content-between mb-5 p-3" style={{ backgroundColor: '#fff', borderRadius: '20px', boxShadow: '0 5px 20px rgba(0,0,0,0.03)' }}>
                    <div className="d-flex flex-wrap">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`btn btn-sm mr-2 mb-2 mb-md-0 d-flex align-items-center ${activeCategory === cat.id ? 'active-filter' : 'inactive-filter'}`}
                                style={{
                                    borderRadius: '12px',
                                    padding: '10px 20px',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    border: 'none',
                                    fontWeight: '600',
                                    backgroundColor: activeCategory === cat.id ? '#2e7d32' : 'transparent',
                                    color: activeCategory === cat.id ? '#fff' : '#555'
                                }}
                            >
                                <i className={`fa ${cat.icon} mr-2`} style={{ opacity: activeCategory === cat.id ? 1 : 0.6 }}></i>
                                {cat.id === 'all' ? t('news.filter_all') : t(`news.cat_${cat.id}`)}
                            </button>
                        ))}
                    </div>

                    <div className="ml-auto d-flex align-items-center px-2">
                        <button
                            onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                            className="btn btn-sm d-flex align-items-center"
                            style={{ borderRadius: '10px', backgroundColor: '#f0f4f0', color: '#2e7d32', fontWeight: '700' }}
                        >
                            <i className={`fa fa-sort-amount-${sortOrder === 'desc' ? 'down' : 'up'} mr-2`}></i>
                            {sortOrder === 'desc' ? 'RECENTS' : 'ANTICS'}
                        </button>
                    </div>
                </div>

                {/* Results Section */}
                <div className="row">
                    {paginatedNews.length > 0 ? (
                        paginatedNews.map(item => (
                            <NewsCard key={item.id} item={item} />
                        ))
                    ) : (
                        <div className="col-12 text-center py-5">
                            <div className="mb-4">
                                <i className="fa fa-search-minus fa-4x text-muted opacity-50"></i>
                            </div>
                            <h4 className="text-muted">{t('news.no_entries')}</h4>
                            <button onClick={() => { setSearchQuery(''); setActiveCategory('all'); }} className="btn btn-link text-primary mt-2">
                                Veure totes les notícies
                            </button>
                        </div>
                    )}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="d-flex justify-content-center align-items-center mt-5 mb-4">
                        <nav aria-label="Page navigation">
                            <ul className="pagination pagination-lg mb-0" style={{ gap: '8px' }}>
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <button
                                        className="page-link pagination-btn shadow-sm"
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        style={{ borderRadius: '12px', border: 'none', color: '#2e7d32' }}
                                    >
                                        <i className="fa fa-chevron-left"></i>
                                    </button>
                                </li>
                                
                                {[...Array(totalPages)].map((_, i) => (
                                    <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                        <button
                                            className={`page-link pagination-btn shadow-sm ${currentPage === i + 1 ? 'active-page' : ''}`}
                                            onClick={() => handlePageChange(i + 1)}
                                            style={{ 
                                                borderRadius: '12px', 
                                                border: 'none',
                                                minWidth: '50px',
                                                textAlign: 'center',
                                                fontWeight: '600',
                                                backgroundColor: currentPage === i + 1 ? '#2e7d32' : '#fff',
                                                color: currentPage === i + 1 ? '#fff' : '#555'
                                            }}
                                        >
                                            {i + 1}
                                        </button>
                                    </li>
                                ))}

                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                    <button
                                        className="page-link pagination-btn shadow-sm"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        style={{ borderRadius: '12px', border: 'none', color: '#2e7d32' }}
                                    >
                                        <i className="fa fa-chevron-right"></i>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                )}
                
                {totalPages > 1 && (
                    <div className="text-center text-muted small">
                        {t('common.page')} {currentPage} {t('common.of')} {totalPages}
                    </div>
                )}
            </div>

            <style>{`
                .active-filter {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(46, 125, 50, 0.3);
                }
                .inactive-filter:hover {
                    background-color: #f1f8f1 !important;
                    color: #2e7d32 !important;
                }
                .form-control:focus {
                    box-shadow: 0 4px 20px rgba(46, 125, 50, 0.1) !important;
                    border: 1px solid rgba(46, 125, 50, 0.1) !important;
                }
                .pagination-btn {
                    transition: all 0.3s ease;
                }
                .pagination-btn:hover:not(:disabled) {
                    background-color: #f0f4f0 !important;
                    color: #2e7d32 !important;
                    transform: translateY(-2px);
                }
                .active-page {
                    background-color: #2e7d32 !important;
                    color: white !important;
                }
                .page-item.disabled .page-link {
                    background-color: #f8f9fa;
                    opacity: 0.5;
                }
                .pagination {
                    border-radius: 15px;
                }
            `}</style>
        </div>
    );
}

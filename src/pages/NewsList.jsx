import { useState } from 'react';
import { news } from '../data/news';
import { useLanguage } from '../context/LanguageContext';
import PageHeader from '../components/PageHeader';
import NewsCard from '../components/NewsCard';
import SEO from '../components/SEO';

export default function NewsList() {
    const { language, t } = useLanguage();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [sortOrder, setSortOrder] = useState('desc');

    const breadcrumbs = [{ label: t('news.header') }];

    const categories = [
        { id: 'all', icon: 'fa-layer-group' },
        { id: 'simultanies', icon: 'fa-chess-board' },
        { id: 'torneig', icon: 'fa-trophy' },
        { id: 'social', icon: 'fa-users' },
        { id: 'altres', icon: 'fa-ellipsis-h' }
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
                        <span className="small text-muted font-weight-bold mr-3">{t('sort_by') || 'ORDENAR:'}</span>
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
                    {filteredNews.length > 0 ? (
                        filteredNews.map(item => (
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
            `}</style>
        </div>
    );
}

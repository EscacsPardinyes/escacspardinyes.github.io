import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { news } from '../data/news';
import { useLanguage } from '../context/LanguageContext';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';

export default function NewsDetail() {
    const { id } = useParams();
    const { language, t } = useLanguage();
    const navigate = useNavigate();

    const item = news.find(n => n.id === id);

    useEffect(() => {
        if (!item) {
            navigate('/noticies');
        }
    }, [item, navigate]);

    if (!item) return null;

    const breadcrumbs = [
        { label: t('news.breadcrumb'), path: '/noticies' },
        { label: item.title[language] }
    ];

    return (
        <>
            <SEO
                title={item.title[language]}
                description={item.summary[language]}
                image={item.image}
                type="article"
                breadcrumbs={breadcrumbs}
            />
            <PageHeader title={t('news.header')} breadcrumbs={breadcrumbs} />

            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="mb-4">
                            <Link to="/noticies" className="btn btn-link px-0 text-primary">
                                <i className="fa fa-arrow-left mr-2"></i> {t('news.back')}
                            </Link>
                        </div>

                        <img
                            src={item.image}
                            alt={item.title[language]}
                            className="img-fluid rounded shadow mb-4 w-100"
                            style={{ maxHeight: '500px', objectFit: 'cover' }}
                        />

                        <div className="d-flex align-items-center mb-3">
                            <span className="badge badge-primary px-3 py-2">
                                <i className="fa fa-calendar-alt mr-2"></i>
                                {new Date(item.date).toLocaleDateString(language, { day: 'numeric', month: 'long', year: 'numeric' })}
                            </span>
                        </div>

                        <h1 className="display-4 font-weight-bold mb-4">{item.title[language]}</h1>

                        <div className="news-content lead" style={{ whiteSpace: 'pre-line' }}>
                            {item.content[language]}
                        </div>

                        <hr className="my-5" />

                        <div className="d-flex justify-content-between">
                            <button
                                className="btn btn-outline-primary"
                                onClick={() => {
                                    if (navigator.share) {
                                        navigator.share({
                                            title: item.title[language],
                                            text: item.summary[language],
                                            url: window.location.href
                                        });
                                    }
                                }}
                            >
                                <i className="fa fa-share-alt mr-2"></i> {t('common.share')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

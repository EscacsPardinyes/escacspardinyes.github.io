import { useState, useEffect } from 'react';

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <button
            onClick={scrollToTop}
            className={`btn btn-primary back-to-top ${isVisible ? 'show' : ''}`}
            aria-label="Back to top"
            style={{
                position: 'fixed',
                bottom: '30px',
                right: '30px',
                display: isVisible ? 'block' : 'none',
                zIndex: 99,
                width: '45px',
                height: '45px',
                padding: '0',
                borderRadius: '50%',
                fontSize: '22px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                transition: 'opacity 0.4s, transform 0.4s',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
            }}
        >
            <i className="fa fa-angle-double-up"></i>
        </button>
    );
}

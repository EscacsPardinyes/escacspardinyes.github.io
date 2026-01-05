import { useEffect, useCallback } from 'react';

export default function Lightbox({ images, currentIndex, onClose, onNext, onPrev, isOpen }) {
    // Handle keyboard navigation
    const handleKeyDown = useCallback((e) => {
        if (!isOpen) return;
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowRight') onNext();
        if (e.key === 'ArrowLeft') onPrev();
    }, [isOpen, onClose, onNext, onPrev]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        // Prevent scrolling when lightbox is open
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            return; // Don't render anything if not open
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [handleKeyDown, isOpen]);

    if (!isOpen) return null;

    return (
        <div className="lightbox-overlay" onClick={onClose} style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: isOpen ? 1 : 0,
            transition: 'opacity 0.3s ease'
        }}>
            <button
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                className="btn text-white position-absolute"
                style={{ top: '20px', right: '30px', fontSize: '2rem', background: 'transparent', border: 'none', cursor: 'pointer' }}
                aria-label="Close"
            >
                &times;
            </button>

            <button
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                className="btn text-white position-absolute"
                style={{ left: '20px', fontSize: '2rem', background: 'transparent', border: 'none', cursor: 'pointer' }}
                aria-label="Previous"
            >
                &#10094;
            </button>

            <div
                className="lightbox-content"
                onClick={(e) => e.stopPropagation()}
                style={{ maxWidth: '90%', maxHeight: '90%' }}
            >
                <img
                    src={images[currentIndex]}
                    alt={`Gallery image ${currentIndex + 1}`}
                    style={{
                        maxWidth: '100%',
                        maxHeight: '90vh',
                        objectFit: 'contain',
                        boxShadow: '0 0 20px rgba(0,0,0,0.5)',
                        borderRadius: '4px'
                    }}
                />
                <div className="text-white text-center mt-2">
                    {currentIndex + 1} / {images.length}
                </div>
            </div>

            <button
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className="btn text-white position-absolute"
                style={{ right: '20px', fontSize: '2rem', background: 'transparent', border: 'none', cursor: 'pointer' }}
                aria-label="Next"
            >
                &#10095;
            </button>
        </div>
    );
}

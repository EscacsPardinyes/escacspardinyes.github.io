import { useEffect } from 'react';

// Blocks that fade/slide in the first time they scroll into view
const SELECTOR = [
    '.section-padding > .row:not(:has(.value-item))',
    '.section-padding > .d-flex.flex-column.text-center',
    '.value-item',
    '.school-card',
    '.info-card',
    '.schedule-week',
    '.faq-section .card',
    '.img-premium',
    '.table-responsive',
    '.tab-class'
].join(',');

const MAX_STAGGER_STEPS = 4;

// Adds the .reveal classes with JS only, so the page is fully visible without it. Skipped for
// reduced motion and for automated browsers (the prerender step must capture the final markup).
export default function ScrollReveal() {
    useEffect(() => {
        const skip = navigator.webdriver
            || window.matchMedia('(prefers-reduced-motion: reduce)').matches
            || !('IntersectionObserver' in window);
        if (skip) return;

        const seen = new WeakSet();
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

        const scan = () => {
            document.querySelectorAll(SELECTOR).forEach((el) => {
                if (seen.has(el)) return;
                seen.add(el);
                const rect = el.getBoundingClientRect();
                // Already on screen (e.g. right after navigation): leave it alone
                if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) return;
                const index = Array.prototype.indexOf.call(el.parentElement.children, el);
                el.style.setProperty('--reveal-delay', `${Math.min(index, MAX_STAGGER_STEPS) * 70}ms`);
                el.classList.add('reveal');
                observer.observe(el);
            });
        };

        let frame = 0;
        const mutations = new MutationObserver(() => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(scan);
        });
        mutations.observe(document.body, { childList: true, subtree: true });
        scan();

        return () => {
            cancelAnimationFrame(frame);
            mutations.disconnect();
            observer.disconnect();
        };
    }, []);

    return null;
}

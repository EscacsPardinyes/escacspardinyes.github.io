document.addEventListener('DOMContentLoaded', function () {
    // Default language
    let currentLang = localStorage.getItem('language') || 'ca';

    // Initialize language
    setLanguage(currentLang);

    // Event listeners for language buttons
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
        });
    });
});

function setLanguage(lang) {
    // Save preference
    localStorage.setItem('language', lang);

    // Update text content
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });

    // Update active state of buttons (if any visual indicator is needed)
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });

    // Update dropdown toggle with flag
    const dropdownToggle = document.querySelector('.nav-link.dropdown-toggle');
    if (dropdownToggle) {
        dropdownToggle.innerHTML = `<img src="img/flags/${lang}.svg" alt="${lang}" height="25" style="border-radius: 2px;"> <i class="fa fa-angle-down"></i>`;
    }

    // Update html lang attribute
    document.documentElement.lang = lang;
}

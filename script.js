const txtElement = document.getElementById('typing-text');
if (txtElement) { 
    const words = ["Nganggur", "Tech Enthusiast", "Problem Solver"]; 
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            txtElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            txtElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = 150;
        if (isDeleting) typeSpeed = 100;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex++;
            if (wordIndex === words.length) {
                wordIndex = 0;
            }
        }

        setTimeout(type, typeSpeed);
    }
    document.addEventListener('DOMContentLoaded', type);
}
function setLanguage(lang) {
    localStorage.setItem('preferredLanguage', lang);
    applyLanguage(lang);
}

function applyLanguage(lang) {
    const body = document.body;
    const btnId = document.getElementById('btn-id');
    const btnEn = document.getElementById('btn-en');

    if (lang === 'en') {
        body.classList.add('english-mode');
        body.classList.remove('indonesia-mode');
        if(btnEn) btnEn.classList.add('active');
        if(btnId) btnId.classList.remove('active');
    } else {
        body.classList.remove('english-mode');
        body.classList.add('indonesia-mode');
        if(btnId) btnId.classList.add('active');
        if(btnEn) btnEn.classList.remove('active');
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLanguage') || 'id';
    applyLanguage(savedLang);

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.remove('dark-mode');
    } else {
        document.body.classList.add('dark-mode'); 
    }
});
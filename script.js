/* =========================================
   1. VARIABLES & SETUP
   ========================================= */
const hamburgerBtn = document.querySelector('.hamburger-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const closeBtn = document.querySelector('.close-btn'); 
const overlay = document.querySelector('.overlay');
const langToggles = document.querySelectorAll('.lang-toggle, .mobile-lang-btn');
const body = document.body;
const themeBtn = document.querySelector('.theme-btn');

/* =========================================
   2. MOBILE MENU & OVERLAY
   ========================================= */
function toggleMenu() {
    if(mobileMenu) mobileMenu.classList.toggle('active');
    if(overlay) overlay.classList.toggle('active');
}

if(hamburgerBtn) hamburgerBtn.addEventListener('click', toggleMenu);
if(closeBtn) closeBtn.addEventListener('click', toggleMenu);
if(overlay) overlay.addEventListener('click', toggleMenu);

// Tutup menu otomatis saat link diklik
document.querySelectorAll('.mobile-menu-links a').forEach(link => {
    link.addEventListener('click', toggleMenu);
});

/* =========================================
   3. LANGUAGE SWITCHER (FIXED)
   ========================================= */
// Cek bahasa terakhir yang tersimpan
const currentLang = localStorage.getItem('lang') || 'id';

// Set kondisi awal saat web dibuka
if (currentLang === 'en') {
    body.classList.add('english-mode');
    body.classList.remove('indonesia-mode');
    updateLangButtons(true); // Update teks jadi ID
} else {
    body.classList.add('indonesia-mode');
    body.classList.remove('english-mode');
    updateLangButtons(false); // Update teks jadi EN
}

// Fungsi Update Teks Tombol
function updateLangButtons(isEnglish) {
    // 1. Update Tombol Navbar (EN <-> ID)
    // PERBAIKAN: Selector sekarang menunjuk ke .nav-controls, bukan .nav-desktop
    const desktopBtn = document.querySelector('.nav-controls .lang-toggle');
    if(desktopBtn) {
        desktopBtn.textContent = isEnglish ? 'ID' : 'EN';
    }

    // 2. Update Tombol Mobile (Switch Text)
    const mobileBtn = document.querySelector('.mobile-lang-btn');
    if(mobileBtn) {
        mobileBtn.textContent = isEnglish ? 'Switch to Indonesia' : 'Switch to English';
    }
}

// Event Listener saat tombol diklik
langToggles.forEach(btn => {
    btn.addEventListener('click', () => {
        if (body.classList.contains('indonesia-mode')) {
            // Ubah ke Inggris
            body.classList.replace('indonesia-mode', 'english-mode');
            localStorage.setItem('lang', 'en');
            updateLangButtons(true);
        } else {
            // Ubah ke Indonesia
            body.classList.replace('english-mode', 'indonesia-mode');
            localStorage.setItem('lang', 'id');
            updateLangButtons(false);
        }
    });
});

/* =========================================
   4. THEME SWITCHER
   ========================================= */
if(themeBtn) {
    // Cek tema tersimpan
    if(localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }

    themeBtn.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const isLight = body.classList.contains('light-mode');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        themeBtn.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
}

/* =========================================
   5. TYPING EFFECT
   ========================================= */
const typingText = document.getElementById('typing-text');
const words = ["Network Engineer", "IT Support", "Problem Solver"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    if(!typingText) return;
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500;
    }
    setTimeout(type, typeSpeed);
}
document.addEventListener('DOMContentLoaded', type);

/* =========================================
   6. SCROLL ANIMATION
   ========================================= */
const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;
    reveals.forEach((reveal) => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
}
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();
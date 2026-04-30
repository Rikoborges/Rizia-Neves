// ============================================
// SCRIPT.JS
// ============================================

// 0. MENU BURGER
const menuBurger = document.getElementById('menuBurger');
const navMenu = document.getElementById('navMenu');

if (menuBurger) {
    menuBurger.addEventListener('click', function () {
        navMenu.classList.toggle('active');
        menuBurger.classList.toggle('active');
        const isOpen = navMenu.classList.contains('active');
        menuBurger.setAttribute('aria-expanded', isOpen);
        menuBurger.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
    });
}

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function () {
        navMenu.classList.remove('active');
        menuBurger.classList.remove('active');
        menuBurger.setAttribute('aria-expanded', 'false');
        menuBurger.setAttribute('aria-label', 'Ouvrir le menu');
    });
});

// 1. DÉFILEMENT LISSE
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        if (section) section.scrollIntoView({ behavior: 'smooth' });
    });
});

// 2. LIGHTBOX GALERIE
function initLightbox() {
    const cards = document.querySelectorAll('.gallery-card');
    const lightbox = document.getElementById('lightbox');
    const lightboxOverlay = document.getElementById('lightboxOverlay');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    if (!lightbox || !cards.length) return;

    const images = [];
    let currentIndex = 0;

    cards.forEach((card, i) => {
        const img = card.querySelector('.card-image img');
        const caption = card.querySelector('h3').textContent;
        if (img) images.push({ src: img.src, alt: img.alt, caption });

        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', 'Agrandir : ' + caption);

        card.addEventListener('click', () => openLightbox(i));
        card.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(i);
            }
        });
    });

    function openLightbox(index) {
        currentIndex = index;
        showImage(currentIndex);
        lightbox.style.display = 'flex';
        lightboxOverlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
        lightboxClose.focus();
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        lightboxOverlay.style.display = 'none';
        document.body.style.overflow = '';
    }

    function showImage(index) {
        lightboxImg.src = images[index].src;
        lightboxImg.alt = images[index].alt;
        lightboxCaption.textContent = images[index].caption;
    }

    function prev() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    }

    function next() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxOverlay.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', prev);
    lightboxNext.addEventListener('click', next);

    document.addEventListener('keydown', e => {
        if (lightbox.style.display === 'none') return;
        if (e.key === 'ArrowLeft')  prev();
        if (e.key === 'ArrowRight') next();
        if (e.key === 'Escape')     closeLightbox();
    });
}

initLightbox();

// 3. SLIDER AVANT / APRÈS
function initBeforeAfterSlider() {
    const container = document.getElementById('beforeAfterSlider');
    if (!container) return;

    const afterWrapper = container.querySelector('.slider-after-wrapper');
    const afterImg     = container.querySelector('.slider-img-after');
    const handle       = container.querySelector('.slider-handle');

    let isDragging = false;
    let pct = 50;

    function updateAfterImgWidth() {
        afterImg.style.width = container.offsetWidth + 'px';
    }

    function setPosition(clientX) {
        const rect = container.getBoundingClientRect();
        pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
        afterWrapper.style.width = pct + '%';
        handle.style.left = pct + '%';
        handle.setAttribute('aria-valuenow', Math.round(pct));
    }

    updateAfterImgWidth();
    window.addEventListener('resize', updateAfterImgWidth);

    // Souris
    container.addEventListener('mousedown', e => {
        isDragging = true;
        setPosition(e.clientX);
        e.preventDefault();
    });
    document.addEventListener('mousemove', e => {
        if (isDragging) setPosition(e.clientX);
    });
    document.addEventListener('mouseup', () => { isDragging = false; });

    // Tactile (mobile)
    container.addEventListener('touchstart', e => {
        isDragging = true;
        setPosition(e.touches[0].clientX);
    }, { passive: true });
    document.addEventListener('touchmove', e => {
        if (isDragging) setPosition(e.touches[0].clientX);
    }, { passive: true });
    document.addEventListener('touchend', () => { isDragging = false; });

    // Clavier (accessibilité)
    handle.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft')  { pct = Math.max(0,   pct - 5); }
        if (e.key === 'ArrowRight') { pct = Math.min(100, pct + 5); }
        afterWrapper.style.width = pct + '%';
        handle.style.left = pct + '%';
        handle.setAttribute('aria-valuenow', Math.round(pct));
    });
}

initBeforeAfterSlider();

// 4. FORMULAIRE CONTACT → WHATSAPP
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const nameInput    = document.getElementById('formName');
        const serviceInput = document.getElementById('formService');
        const messageInput = document.getElementById('formMessage');
        const nameError    = document.getElementById('nameError');
        const serviceError = document.getElementById('serviceError');

        let valid = true;

        // Validation
        if (!nameInput.value.trim()) {
            nameInput.classList.add('invalid');
            nameError.classList.add('visible');
            valid = false;
        } else {
            nameInput.classList.remove('invalid');
            nameError.classList.remove('visible');
        }

        if (!serviceInput.value) {
            serviceInput.classList.add('invalid');
            serviceError.classList.add('visible');
            valid = false;
        } else {
            serviceInput.classList.remove('invalid');
            serviceError.classList.remove('visible');
        }

        if (!valid) return;

        const name    = nameInput.value.trim().replace(/\r/g, '');
        const service = serviceInput.value;
        const message = messageInput.value.trim().replace(/\r/g, '');

        let text = `Bonjour Rizia ! 👋\n\nNom : ${name}\nService : ${service}`;
        if (message) text += `\n\nMessage : ${message}`;
        text += '\n\nJe souhaite prendre rendez-vous. 😊';

        const encoded = encodeURIComponent(text.replace(/\r\n/g, '\n').replace(/\r/g, '\n'));
        window.open(`https://wa.me/33745553461?text=${encoded}`, '_blank');
    });

    // Retirer l'état invalide dès que l'utilisateur corrige
    document.getElementById('formName').addEventListener('input', function () {
        this.classList.remove('invalid');
        document.getElementById('nameError').classList.remove('visible');
    });
    document.getElementById('formService').addEventListener('change', function () {
        this.classList.remove('invalid');
        document.getElementById('serviceError').classList.remove('visible');
    });
}

// 5. MODAL RGPD
const rgpdModal    = document.getElementById('rgpd');
const rgpdOverlay  = document.getElementById('rgpdOverlay');
const rgpdClose    = document.getElementById('rgpdClose');
const rgpdCloseBtn = document.getElementById('rgpdCloseBtn');
const rgpdLink     = document.getElementById('rgpdLink');
const footerLegal  = document.querySelector('.footer-legal');

function openRgpd(e) {
    if (e) e.preventDefault();
    rgpdModal.style.display   = 'block';
    rgpdOverlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeRgpd() {
    rgpdModal.style.display   = 'none';
    rgpdOverlay.style.display = 'none';
    document.body.style.overflow = '';
}

if (rgpdLink)     rgpdLink.addEventListener('click', openRgpd);
if (footerLegal)  footerLegal.addEventListener('click', openRgpd);
if (rgpdClose)    rgpdClose.addEventListener('click', closeRgpd);
if (rgpdCloseBtn) rgpdCloseBtn.addEventListener('click', closeRgpd);
if (rgpdOverlay)  rgpdOverlay.addEventListener('click', closeRgpd);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && rgpdModal.style.display === 'block') closeRgpd();
});

// 5. BANDEAU COOKIES
const cookieBanner = document.getElementById('cookieBanner');
const cookieAccept = document.getElementById('cookieAccept');

if (!localStorage.getItem('cookieAccepted')) {
    cookieBanner.style.display = 'flex';
}

if (cookieAccept) {
    cookieAccept.addEventListener('click', function () {
        localStorage.setItem('cookieAccepted', '1');
        cookieBanner.style.display = 'none';
    });
}

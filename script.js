// ============================================
// SCRIPT.JS - JavaScript Simple
// ============================================

// 0. MENU BURGER
// Ao clicar no botão menu, abre/fecha o menu mobile
const menuBurger = document.getElementById('menuBurger');
const navMenu = document.getElementById('navMenu');

if (menuBurger) {
    menuBurger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuBurger.classList.toggle('active');
        const isOpen = navMenu.classList.contains('active');
        menuBurger.setAttribute('aria-expanded', isOpen);
        menuBurger.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
    });
}

// Fechar menu ao clicar num link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        menuBurger.classList.remove('active');
    });
});

// 1. DÉFILEMENT LISSE
// Quand vous cliquez sur un lien (#about, #gallery), 
// la page défile jusqu'à cette section
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const section = document.querySelector(this.getAttribute('href'));
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// 2. COULEUR DE FOND DES CARTES AU SURVOL
// Quand vous passez la souris sur une carte, la couleur change
document.querySelectorAll('.gallery-card').forEach(card => {
    // Quand la souris ENTRE sur la carte
    card.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#f9f9f9';
    });
    
    // Quand la souris SORT de la carte
    card.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#ffffff';
    });
});

// 3. MODAL RGPD
const rgpdModal = document.getElementById('rgpd');
const rgpdOverlay = document.getElementById('rgpdOverlay');
const rgpdClose = document.getElementById('rgpdClose');
const rgpdCloseBtn = document.getElementById('rgpdCloseBtn');
const rgpdLink = document.getElementById('rgpdLink');
const footerLegal = document.querySelector('.footer-legal');

function openRgpd(e) {
    if (e) e.preventDefault();
    rgpdModal.style.display = 'block';
    rgpdOverlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeRgpd() {
    rgpdModal.style.display = 'none';
    rgpdOverlay.style.display = 'none';
    document.body.style.overflow = '';
}

if (rgpdLink) rgpdLink.addEventListener('click', openRgpd);
if (footerLegal) footerLegal.addEventListener('click', openRgpd);
if (rgpdClose) rgpdClose.addEventListener('click', closeRgpd);
if (rgpdCloseBtn) rgpdCloseBtn.addEventListener('click', closeRgpd);
if (rgpdOverlay) rgpdOverlay.addEventListener('click', closeRgpd);

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeRgpd();
});

// 4. BANDEAU COOKIES
const cookieBanner = document.getElementById('cookieBanner');
const cookieAccept = document.getElementById('cookieAccept');

if (!localStorage.getItem('cookieAccepted')) {
    cookieBanner.style.display = 'flex';
}

if (cookieAccept) {
    cookieAccept.addEventListener('click', function() {
        localStorage.setItem('cookieAccepted', '1');
        cookieBanner.style.display = 'none';
    });
}

// 5. MESSAGE SIMPLE DANS LA CONSOLE
console.log('Site chargé avec succès!');
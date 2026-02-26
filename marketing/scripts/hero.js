/*
    Written by: Owen Meade @owenrgu & Claude AI
    Created: 25 Feb 2026
    Description: Hero section scroll effects
*/

// --- Hide the nav bar when the page is at the top ---
const nav = document.getElementById("main-nav");
window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 60);
}, { passive: true });

// --- Zoom effect in the hero section as you scroll down ---
const zoneEl = document.getElementById('zoom-zone');
const overlayEl = document.getElementById('zoom-overlay');
const logoEl = document.getElementById('zoom-logo');

let rafPending = false;
function updateZoom() {
    rafPending = false;
    const zoneTop = zoneEl.getBoundingClientRect().top;
    const zoneHeight = zoneEl.offsetHeight;
    const vh = window.innerHeight;
    const scrolled = -zoneTop;
    const total = zoneHeight - vh;
    const p = Math.max(0, Math.min(1, scrolled / total));
    const inZone = scrolled >= 0 && scrolled < zoneHeight;

    if (inZone) {
        const maxS = (Math.max(window.innerWidth, window.innerHeight) / 90) + 2;
        const scale = 1 + p * maxS;
        const logoOpacity = p < 0.65 ? 1 : Math.max(0, 1 - (p - 0.65) / 0.25);
        const bgDark = Math.min(p / 0.65, 1) * 0.92;
        const bgAlpha = bgDark * logoOpacity;
        overlayEl.style.opacity = logoOpacity > 0 ? '1' : '0';
        overlayEl.style.background = `rgba(7,6,15,${bgAlpha})`;
        logoEl.style.transform = `scale(${scale})`;
        logoEl.style.opacity = logoOpacity;
    } else {
        overlayEl.style.opacity = '0';
    }
}

window.addEventListener('scroll', () => {
    if (!rafPending) { rafPending = true; requestAnimationFrame(updateZoom); }
}, { passive: true });
window.addEventListener('resize', updateZoom);
updateZoom();

// ── Show Me: scrolls to the END of the zoom zone so the effect plays in full ──
document.getElementById('show-me-btn').addEventListener('click', (e) => {
    e.preventDefault();
    const zoneBottom = zoneEl.offsetTop + zoneEl.offsetHeight;
    window.scrollTo({ top: zoneBottom, behavior: 'smooth' });
});

// ── Scroll reveal ──
const reveals = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
}, { threshold: 0.1 });
reveals.forEach(el => obs.observe(el));
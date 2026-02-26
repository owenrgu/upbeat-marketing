/*
    Written by: Owen Meade @owenrgu
    Created: 25 Feb 2026
    Description: Smooth scroll and reveal effects for the privacy page
*/


const reveals = document.querySelectorAll(".reveal");

const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible'); obs.unobserve(e.target);
        }
    });
}, { threshold: 0.08 });

reveals.forEach(el => obs.observe(el));
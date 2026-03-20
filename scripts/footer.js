/*
    Written by: Owen Meade @owenrgu
    Created: 25 Feb 2026
    Description: Automatically update the footer copyright year
*/

// --- Update the copyright year in the footer ---
const yearEl = document.getElementById("copyright-year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;
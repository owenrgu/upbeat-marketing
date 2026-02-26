/*
    Written by: Owen Meade @owenrgu
    Created: 25 Feb 2026
    Description: Handle submitting the form
*/

const FORM_ID = "1FAIpQLSftk-NekVIeUfpYnQubNWG3BzAGAUW8svYQi8VlzW76QgmauQ";

async function handleSubmit(e) {
    e.preventDefault();
   
    const name  = document.getElementById("wb-name").value.trim();
    const email = document.getElementById("wb-email").value.trim();
    const org   = document.getElementById("wb-org").value.trim();
    const role  = document.getElementById("wb-role").value;
    
    if (!name || !email || !org || !email.includes("@")) {
        const form = document.getElementById("waitlist-form");
        form.style.animation = "none";
        void form.offsetHeight;
        form.style.animation = "shake 0.4s ease";
        return;
    }

    // Prepare form data for Google Forms
    const data = new URLSearchParams();
    data.append("entry.1178106703", name);
    data.append("entry.1826633632", email);
    data.append("entry.1809558910", org);
    data.append("entry.1914708331", role || "Not specified");

    try {
        // Submit to Google Forms
        await fetch(`https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: data.toString(),
        });

        // Show success message
        document.getElementById("form-area").style.display  = "none";
        document.getElementById("success-msg").style.display = "block";
    } catch (err) {
        console.error("Form submission error:", err);
        // Still show success message since no-cors mode doesn't return errors reliably
        document.getElementById("form-area").style.display  = "none";
        document.getElementById("success-msg").style.display = "block";
    }
}
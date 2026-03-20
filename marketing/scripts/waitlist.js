document.getElementById('waitlist-form').addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('wb-name');
            const email = document.getElementById('wb-email');
            const org = document.getElementById('wb-org');

            let valid = true;

            [name, email, org].forEach(function(field) {
                field.classList.remove('shake');
                if (!field.value.trim()) {
                    valid = false;
                    void field.offsetWidth;
                    field.classList.add('shake');
                    field.style.borderColor = 'rgba(239, 68, 68, 0.6)';
                    setTimeout(function() {
                        field.style.borderColor = '';
                        field.classList.remove('shake');
                    }, 600);
                }
            });

            if (email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
                valid = false;
                void email.offsetWidth;
                email.classList.add('shake');
                email.style.borderColor = 'rgba(239, 68, 68, 0.6)';
                setTimeout(function() {
                    email.style.borderColor = '';
                    email.classList.remove('shake');
                }, 600);
            }

            if (!valid) return;

            // Replace with your actual form submission logic
            document.getElementById('form-area').style.display = 'none';
            document.getElementById('success-msg').style.display = 'block';
        });
// Add this to a new file: js/contact.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const status = document.getElementById('status');
    const submitButton = document.getElementById('submit-button');

    if (form) {
        form.addEventListener('submit', handleSubmit);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        
        // Show sending state
        submitButton.classList.add('submit-button-loading');
        submitButton.textContent = 'Sending...';
        status.style.display = 'none';

        try {
            const formData = new FormData(form);
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            const data = await response.json();

            if (response.ok) {
                // Success message
                status.textContent = 'Thanks for your submission! I will get back to you soon.';
                status.className = 'alert alert-success';
                form.reset(); // Clear the form
            } else {
                // Error message
                throw new Error(data.error || 'Form submission failed');
            }
        } catch (error) {
            status.textContent = 'Oops! There was a problem submitting your form. Please try again.';
            status.className = 'alert alert-error';
        } finally {
            // Reset button and show status
            submitButton.classList.remove('submit-button-loading');
            submitButton.textContent = 'Send Message';
            status.style.display = 'block';
        }
    }
});
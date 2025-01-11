document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const status = document.getElementById('status');
    const submitButton = document.getElementById('submit-button');

    // Initialize EmailJS with your public key
    emailjs.init("C5FjhPRntAOgzPQRB"); // Replace with your actual public key

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
            // Get form data
            const formData = {
                from_name: form.querySelector('[name="name"]').value,
                reply_to: form.querySelector('[name="email"]').value,
                message: form.querySelector('[name="message"]').value
            };

            // Send email using EmailJS
            const response = await emailjs.send(
                "service_o63uqko", // Replace with your EmailJS service ID
                "template_em9nzac", // Replace with your EmailJS template ID
                formData
            );

            if (response.status === 200) {
                // Success message
                status.textContent = 'Thanks for your submission! I will get back to you soon.';
                status.className = 'alert alert-success';
                form.reset(); // Clear the form
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Error:', error);
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
// RSVP Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('rsvpForm');
    const formSuccess = document.getElementById('formSuccess');
    
    // Form validation and submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearErrors();
        
        // Validate form
        if (validateForm()) {
            // Simulate form submission
            submitForm();
        }
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
    
    function validateForm() {
        let isValid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const guests = document.getElementById('guests');
        
        if (!validateField(name)) isValid = false;
        if (!validateField(email)) isValid = false;
        if (!validateField(guests)) isValid = false;
        
        return isValid;
    }
    
    function validateField(field) {
        const errorElement = document.getElementById(field.id + '-error');
        let isValid = true;
        let errorMessage = '';
        
        // Remove previous error styling
        field.classList.remove('error');
        
        // Check if field is required and empty
        if (field.hasAttribute('required') && !field.value.trim()) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        // Email validation
        if (field.type === 'email' && field.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        
        // Name validation (minimum 2 characters)
        if (field.id === 'name' && field.value.trim()) {
            if (field.value.trim().length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters';
            }
        }
        
        // Display error or clear it
        if (!isValid) {
            field.classList.add('error');
            if (errorElement) {
                errorElement.textContent = errorMessage;
                errorElement.setAttribute('aria-live', 'polite');
            }
        } else {
            if (errorElement) {
                errorElement.textContent = '';
            }
        }
        
        return isValid;
    }
    
    function clearErrors() {
        const errorMessages = form.querySelectorAll('.error-message');
        const errorFields = form.querySelectorAll('.error');
        
        errorMessages.forEach(error => {
            error.textContent = '';
        });
        
        errorFields.forEach(field => {
            field.classList.remove('error');
        });
    }
    
    function submitForm() {
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            guests: document.getElementById('guests').value,
            message: document.getElementById('message').value.trim()
        };
        
        // In a real application, you would send this data to a server
        // For now, we'll simulate a successful submission
        console.log('Form submitted:', formData);
        
        // Show success message
        formSuccess.textContent = `Thank you, ${formData.name}! Your RSVP has been received. We're looking forward to seeing you at the event!`;
        formSuccess.classList.add('show');
        
        // Reset form
        form.reset();
        
        // Scroll to success message
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Hide success message after 10 seconds
        setTimeout(() => {
            formSuccess.classList.remove('show');
        }, 10000);
        
        // Focus management for accessibility
        formSuccess.focus();
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Add error styling to CSS dynamically if needed
    const style = document.createElement('style');
    style.textContent = `
        .form-group input.error,
        .form-group select.error,
        .form-group textarea.error {
            border-color: var(--secondary-color);
        }
    `;
    document.head.appendChild(style);
});

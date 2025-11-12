/*!
* Ranger Gas Co. - Enhanced Scripts
*/

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    }

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

// --- Form Validation ---
function validateForm(emailId, messageId) {
    const email = document.getElementById(emailId);
    const message = document.getElementById(messageId);
    let isValid = true;

    // Reset validation states
    email.classList.remove('is-invalid');
    message.classList.remove('is-invalid');

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value || !emailRegex.test(email.value)) {
        email.classList.add('is-invalid');
        isValid = false;
    }

    // Validate message
    if (!message.value || message.value.trim().length === 0) {
        message.classList.add('is-invalid');
        isValid = false;
    }

    return isValid;
}

// --- Core Mailto Generation Logic ---
function generateMailto(emailId, messageId, recipient, subject) {
    const email = document.getElementById(emailId).value;
    const message = document.getElementById(messageId).value;

    // Validate before proceeding
    if (!validateForm(emailId, messageId)) {
        return null;
    }

    // URL Encode the Data
    const encodedSubject = encodeURIComponent(subject);
    const bodyContent = "Sender's Email: " + email + "\n\n" + message;
    const encodedBody = encodeURIComponent(bodyContent);

    // Construct the Full mailto URL
    const mailtoURL =
        "mailto:" + recipient +
        "?subject=" + encodedSubject +
        "&body=" + encodedBody;

    return mailtoURL;
}

// --- Handle Mailto and Close Modal ---
function handleMailtoAndClose(modalId, mailtoURL) {
    if (!mailtoURL) {
        // Validation failed, don't proceed
        return false;
    }

    // Launch mailto first
    window.location.href = mailtoURL;

    // Then clean up the modal and backdrop
    setTimeout(() => {
        const modalElement = document.getElementById(modalId);

        if (modalElement) {
            // Remove Bootstrap modal classes
            modalElement.classList.remove('show');
            modalElement.style.display = 'none';
            modalElement.setAttribute('aria-hidden', 'true');
            modalElement.removeAttribute('aria-modal');
            modalElement.removeAttribute('role');
        }

        // Remove body classes that prevent scrolling
        document.body.classList.remove('modal-open');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';

        // Remove all backdrops
        const backdrops = document.querySelectorAll('.modal-backdrop');
        backdrops.forEach(backdrop => backdrop.remove());

        // Clear form fields
        const form = modalElement.querySelector('form');
        if (form) {
            form.reset();
            // Remove validation classes
            form.querySelectorAll('.is-invalid').forEach(el => {
                el.classList.remove('is-invalid');
            });
        }

    }, 100);

    return false;
}

// --- Department-Specific Wrapper Functions ---

// 1. SALES MODAL FUNCTION
function createSalesMailtoLink() {
    const mailtoURL = generateMailto(
        'salesEmailInput',
        'salesMessageTextarea',
        'sales@rangergasco.com',
        'New Customer: Service/Pricing Inquiry'
    );

    return handleMailtoAndClose('salesModal', mailtoURL);
}

// 2. CUSTOMER SERVICE MODAL FUNCTION
function createCustomerServiceMailtoLink() {
    const mailtoURL = generateMailto(
        'csEmailInput',
        'csMessageTextarea',
        'customerservice@rangergasco.com',
        'Current Customer: Support Request'
    );

    return handleMailtoAndClose('CustSerModal', mailtoURL);
}

// 3. BILLING MODAL FUNCTION
function createBillingMailtoLink() {
    const mailtoURL = generateMailto(
        'billingEmailInput',
        'billingMessageTextarea',
        'billing@rangergasco.com',
        'Billing Question'
    );

    return handleMailtoAndClose('BillingModal', mailtoURL);
}

// --- Clear validation on input ---
document.addEventListener('DOMContentLoaded', function () {
    const allInputs = document.querySelectorAll('.form-control');
    allInputs.forEach(input => {
        input.addEventListener('input', function () {
            this.classList.remove('is-invalid');
        });
    });
});
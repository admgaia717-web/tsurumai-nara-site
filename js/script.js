// Tsurumai Community Website Scripts

document.addEventListener('DOMContentLoaded', () => {
    // Mobility Dashboard "Live" Update Simulation
    const lastUpdatedEl = document.getElementById('last-updated');

    function updateDashboardTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        if (lastUpdatedEl) {
            lastUpdatedEl.textContent = timeString;
        }
    }

    // Update every second to feel "Live"
    setInterval(updateDashboardTime, 1000);
    updateDashboardTime();

    // Console greeting
    console.log("Joined Tsurumai Community Website - Ready to serve!");

    // Contact Form Logic
    const setupContactForm = (formId, successId) => {
        const form = document.getElementById(formId);
        const successMsg = document.getElementById(successId);

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                // Get values
                const name = document.getElementById(formId === 'contact-form' ? 'name' : 'name').value; // Ideally adjust ID if duplicate on page, but for separate pages it's fine. 
                // Wait, if on same page, IDs must be unique. index.html has ids 'name', 'email'. contact.html has same.
                // Assuming they are visited separately. If on index, 'name' refers to index form. 

                // Actually, let's just get the elements relative to the form
                const nameInput = form.querySelector('input[name="name"]');
                const emailInput = form.querySelector('input[name="email"]');
                const messageInput = form.querySelector('textarea[name="message"]');

                const subject = `【つるまい自治協議会】お問い合わせ: ${nameInput.value}様`;
                const body = `名前: ${nameInput.value}\nメールアドレス: ${emailInput.value}\n\nお問い合わせ内容:\n${messageInput.value}`;

                // Construct Mailto
                const mailtoLink = `mailto:w394084@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

                // Open Mail Client
                window.location.href = mailtoLink;

                // Show Success Message
                form.style.display = 'none';
                if (successMsg) {
                    successMsg.style.display = 'block';
                    successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        }
    };

    setupContactForm('contact-form', 'contact-success-message');
    setupContactForm('contact-form-page', 'contact-success-message-page');

    // ==========================================
    // Lightbox Functionality
    // ==========================================
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxClose = document.querySelector('.lightbox-modal__close');
    const galleryItems = document.querySelectorAll('[data-lightbox]');

    if (lightboxModal && lightboxImage && lightboxClose) {
        galleryItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const imageSrc = item.getAttribute('data-lightbox');
                if (imageSrc) {
                    lightboxImage.src = imageSrc;
                    lightboxModal.classList.add('is-open');
                    lightboxModal.setAttribute('aria-hidden', 'false');
                    document.body.style.overflow = 'hidden'; // Prevent scrolling
                }
            });
        });

        // Close functions
        const closeLightbox = () => {
            lightboxModal.classList.remove('is-open');
            lightboxModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = ''; // Restore scrolling
            // Wait for transition before clearing src
            setTimeout(() => { lightboxImage.src = ''; }, 300);
        };

        lightboxClose.addEventListener('click', closeLightbox);
        
        // Close on background click
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal || e.target.classList.contains('lightbox-modal__content')) {
                closeLightbox();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightboxModal.classList.contains('is-open')) {
                closeLightbox();
            }
        });
    }
});

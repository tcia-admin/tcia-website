document.addEventListener('DOMContentLoaded', function() {
    // ===== Navigation Smooth Scroll =====
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.notice-nav').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== Modal Functionality (registration + image modal) =====
    const imageModal = document.getElementById('image-modal');
    const registrationModal = document.getElementById('registration-modal');
    const registerButtons = document.querySelectorAll('.register-btn');

    // Open registration modal when register buttons are clicked
    registerButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e && e.preventDefault();
            if (registrationModal) {
                registrationModal.style.display = 'block';
                document.body.classList.add('modal-open');
            }
        });
    });

    // Open image modal when speaker images are clicked
    const speakerImages = document.querySelectorAll('.speaker-flyer img');
    const modalImage = imageModal ? imageModal.querySelector('.modal-image') : null;
    speakerImages.forEach(img => {
        img.addEventListener('click', function(e) {
            e && e.preventDefault();
            if (imageModal && modalImage) {
                modalImage.src = img.src;
                modalImage.alt = img.alt || 'Speaker image';
                imageModal.style.display = 'block';
                document.body.classList.add('modal-open');
            }
        });
    });

    // Close modal when any modal's close (×) is clicked
    const closeButtons = document.querySelectorAll('.modal .close-modal');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const parent = this.closest('.modal');
            if (!parent) return;
            parent.style.display = 'none';
            document.body.classList.remove('modal-open');
            if (parent === imageModal && modalImage) modalImage.src = '';
        });
    });

    // Close modal when clicking outside modal content
    window.addEventListener('click', function(e) {
        if (e.target === registrationModal) {
            registrationModal.style.display = 'none';
            document.body.classList.remove('modal-open');
        }
        if (e.target === imageModal) {
            imageModal.style.display = 'none';
            document.body.classList.remove('modal-open');
            if (modalImage) modalImage.src = '';
        }
    });

    // Close any open modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (registrationModal && registrationModal.style.display === 'block') {
                registrationModal.style.display = 'none';
                document.body.classList.remove('modal-open');
            }
            if (imageModal && imageModal.style.display === 'block') {
                imageModal.style.display = 'none';
                document.body.classList.remove('modal-open');
                if (modalImage) modalImage.src = '';
            }
        }
    });

    // ===== Event Countdown Updates =====
    function updateCountdowns() {
        const speakerCards = document.querySelectorAll('.speaker-card');
        
        speakerCards.forEach(card => {
            const eventDateElement = card.querySelector('.event-date');
            const countdownElement = card.querySelector('.countdown-value');
            const countdownContainer = card.querySelector('.event-countdown');
            
            if (eventDateElement && countdownElement && countdownContainer) {
                const eventDateStr = eventDateElement.getAttribute('data-event-datetime');
                if (!eventDateStr) return;
                
                const eventDate = new Date(eventDateStr);
                const now = new Date();
                
                const diffTime = eventDate - now;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                
                if (diffDays > 0) {
                    countdownElement.textContent = diffDays;
                } else if (diffDays === 0) {
                    countdownElement.textContent = 'Today!';
                    countdownContainer.style.backgroundColor = 'var(--notice-accent)';
                } else {
                    countdownContainer.style.display = 'none';
                }
            }
        });
    }

    // Update countdowns immediately and then every 24 hours
    updateCountdowns();
    setInterval(updateCountdowns, 24 * 60 * 60 * 1000);
});


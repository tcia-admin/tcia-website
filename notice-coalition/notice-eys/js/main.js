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

    // ===== Modal Functionality =====
    const modal = document.getElementById('registration-modal');
    const closeBtn = document.querySelector('.close-modal');
    const registerButtons = document.querySelectorAll('.register-btn');
    
    // Open modal when register buttons are clicked
    registerButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = 'block';
            document.body.classList.add('modal-open');
        });
    });
    
    // Close modal when X is clicked
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
        }
    });
    
    // Close modal with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
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


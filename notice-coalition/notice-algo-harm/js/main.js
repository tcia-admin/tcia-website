document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const backToTopButton = document.querySelector('.back-to-top');
    const progressHorizontal = document.querySelector('.scroll-progress-horizontal');
    const progressVertical = document.querySelector('.scroll-progress-vertical');
    
    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    timelineItems.forEach(item => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.5s ease-in-out';
        observer.observe(item);
    });

    // Unified scroll handler
    window.addEventListener('scroll', () => {
        requestAnimationFrame(() => {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = window.scrollY / windowHeight;
            
            // Update horizontal progress bar
            progressHorizontal.style.transform = `scaleX(${scrolled})`;
            
            // Update vertical progress indicator
            progressVertical.style.top = `${scrolled * window.innerHeight}px`;
            
            // Show/hide back to top button
            if (window.scrollY > 500) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
    });

    // Smooth scroll to top
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});


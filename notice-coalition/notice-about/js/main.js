document.addEventListener('DOMContentLoaded', function() {
        // Get all navigation links
        const navLinks = document.querySelectorAll('.nav-links a');
        
        // Add click event listener to each link
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                if (this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    
                    // Get the target section id from the href
                    const targetId = this.getAttribute('href').substring(1);
                    const targetSection = document.getElementById(targetId);
                    
                    if (targetSection) {
                        // Get the height of the fixed navigation bar
                        const navHeight = document.querySelector('.notice-nav').offsetHeight;
                        
                        // Calculate the target position accounting for the nav bar
                        const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
                        
                        // Smooth scroll to the target
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    });

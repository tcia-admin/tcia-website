        // Set current year
        document.getElementById('year').textContent = new Date().getFullYear();

        // Navigation Scroll Effect
        const nav = document.querySelector('.nav');
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });

        // Mobile Navigation Toggle
        const navToggle = document.querySelector('.nav__toggle');
        const navMenu = document.querySelector('.nav__menu');
        
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
                navToggle.setAttribute('aria-expanded', !isExpanded);
                navMenu.classList.toggle('active');
            });
        }

        // Scroll Reveal Animation
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        // Card Expansion System
        const serviceCards = document.querySelectorAll('.service-card');
        const cardOverlay = document.getElementById('card-overlay');
        let expandedCard = null;
        let cardOriginalParent = null;
        let cardOriginalNextSibling = null;

        // Function to expand a card
        function expandCard(card) {
            if (expandedCard) {
                collapseCard(expandedCard);
            }
            
            // Store original position in DOM
            cardOriginalParent = card.parentNode;
            cardOriginalNextSibling = card.nextSibling;
            
            // Move card to body (next to overlay)
            document.body.appendChild(card);
            
            card.classList.add('expanded');
            cardOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            expandedCard = card;
        }

        // Function to collapse a card
        function collapseCard(card) {
            card.classList.remove('expanded');
            cardOverlay.classList.remove('active');
            document.body.style.overflow = '';
            
            // Move card back to original position
            if (cardOriginalParent) {
                if (cardOriginalNextSibling) {
                    cardOriginalParent.insertBefore(card, cardOriginalNextSibling);
                } else {
                    cardOriginalParent.appendChild(card);
                }
            }
            
            expandedCard = null;
            cardOriginalParent = null;
            cardOriginalNextSibling = null;
        }

        // Add click handlers to all cards
        serviceCards.forEach(card => {
            // Click on card or "Learn More" button to expand
            const learnMoreBtn = card.querySelector('.service-card__learn-more');
            
            card.addEventListener('click', (e) => {
                // If card is expanded, stop propagation to prevent closing
                if (card.classList.contains('expanded')) {
                    e.stopPropagation();
                    return;
                }
                
                // Don't expand if clicking on action buttons or links
                if (!e.target.closest('.service-card__actions') && 
                    !e.target.closest('.service-card__close')) {
                    expandCard(card);
                }
            });
            
            // Close button
            const closeBtn = card.querySelector('.service-card__close');
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                collapseCard(card);
            });
        });

        // Close card when clicking overlay
        cardOverlay.addEventListener('click', () => {
            if (expandedCard) {
                collapseCard(expandedCard);
            }
        });

        // Close card on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && expandedCard) {
                collapseCard(expandedCard);
            }
        });

        // Scroll to contact section when "Contact Us" button is clicked
        document.querySelectorAll('[data-scroll-to-contact]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // Close expanded card first if there is one
                if (expandedCard) {
                    collapseCard(expandedCard);
                }
                
                // Smooth scroll to contact section
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Form Submission Handler (Modal)
        function handleFormSubmit(event) {
            event.preventDefault();
            
            // Get form data
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData.entries());
            
            // Here you would typically send the data to your backend
            console.log('Modal form submitted:', data);
            
            // Show success message
            alert('Thank you for your interest! We\'ll be in touch soon.');
            
            // Reset form and close modal
            event.target.reset();
            closeContactModal();
        }
        
        // Main Contact Form Submission Handler
        async function handleMainFormSubmit(event) {
            event.preventDefault();
            
            // Get form data
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData.entries());
            
            // Add timestamp
            data.timestamp = new Date().toISOString();
            data.page = 'Service Hub';
            
            // Get the submit button to show loading state
            const submitBtn = event.target.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            try {
                // Zapier webhook URL for form submissions
                const zapierWebhookUrl = 'https://hooks.zapier.com/hooks/catch/1126530/us4ufgm/';
                
                // Convert data to URLSearchParams for form-encoded format (avoids CORS issues)
                const formBody = new URLSearchParams(data);
                
                const response = await fetch(zapierWebhookUrl, {
                    method: 'POST',
                    body: formBody,
                });
                
                if (response.ok) {
                    // Show success message
                    alert('Thank you for contacting us! We\'ll get back to you within 1-2 business days.');
                    
                    // Reset form
                    event.target.reset();
                } else {
                    throw new Error('Failed to submit form');
                }
            } catch (error) {
                console.error('Form submission error:', error);
                alert('There was an error submitting your message. Please try emailing us directly at admin@tciamn.org');
            } finally {
                // Restore button state
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        }

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // ========================================
        // INTERACTIVE SQUARE GRID SYSTEM
        // ========================================
        
        class InteractiveSquareGrid {
            constructor(canvas, cardElement) {
                this.canvas = canvas;
                this.card = cardElement;
                this.ctx = canvas.getContext('2d');
                this.squares = [];
                this.activeSquares = new Set();
                
                // Twinkle frequency: lower = more frequent, higher = less frequent
                // 0.01 = 1% chance per frame (~60fps), so roughly once every 1.67 seconds per square
                this.twinkleFrequency = 0.001; // Adjust this value: 0.001 (very frequent) to 0.05 (rare)
                
                // Twinkle duration in frames (60fps)
                // 30 frames = 0.5 seconds, 60 frames = 1 second, 120 frames = 2 seconds
                this.twinkleDuration = 180; // Adjust this value: 30 (fast) to 180 (slow)
                
                // Get card accent color
                const computedStyle = getComputedStyle(cardElement);
                const accentColor = computedStyle.getPropertyValue('--card-accent').trim();
                this.isFilled = cardElement.classList.contains('service-card--filled');
                
                // Set colors based on card type
                if (this.isFilled) {
                    this.gridColor = 'rgba(255, 255, 255, 0.1)';
                    this.activeColor = 'rgba(255, 255, 255, 0.4)';
                    this.glowColor = 'rgba(255, 255, 255, 0.6)';
                } else {
                    // Parse accent color for RGB values
                    this.gridColor = accentColor ? `${accentColor}33` : 'rgba(0, 0, 0, 0.03)';
                    this.activeColor = accentColor ? `${accentColor}66` : 'rgba(0, 0, 0, 0.2)';
                    this.glowColor = accentColor || 'rgba(0, 0, 0, 0.4)';
                }
                
                this.setupCanvas();
                this.generateSquareGrid();
                this.bindEvents();
                this.animate();
            }
            
            setupCanvas() {
                const rect = this.card.querySelector('.service-card__content').getBoundingClientRect();
                this.canvas.width = rect.width;
                this.canvas.height = rect.height;
                
                this.squareSize = 40;
            }
            
            generateSquareGrid() {
                const cols = Math.ceil(this.canvas.width / this.squareSize);
                const rows = Math.ceil(this.canvas.height / this.squareSize);
                
                this.squares = [];
                
                for (let row = 0; row < rows; row++) {
                    for (let col = 0; col < cols; col++) {
                        this.squares.push({
                            x: col * this.squareSize,
                            y: row * this.squareSize,
                            active: false,
                            glow: 0,
                            twinkleFrame: 0,  // Current frame of twinkle animation
                            isTwinkling: false, // Whether currently animating
                            id: `${row}_${col}`
                        });
                    }
                }
            }
            
            // Ease-in-out function for smooth animation
            easeInOutCubic(t) {
                return t < 0.5 
                    ? 4 * t * t * t 
                    : 1 - Math.pow(-2 * t + 2, 3) / 2;
            }
            
            drawSquare(x, y, size, active = false, glow = 0) {
                // Only draw if there's something to show
                if (!active && glow <= 0) {
                    // Draw subtle grid line
                    this.ctx.strokeStyle = this.gridColor;
                    this.ctx.lineWidth = 1;
                    this.ctx.strokeRect(x, y, size, size);
                    return;
                }
                
                // Set colors based on state
                const intensity = Math.max(glow, active ? 1 : 0);
                
                if (intensity > 0) {
                    // Draw glow effect
                    this.ctx.shadowBlur = 8 + intensity * 8;
                    this.ctx.shadowColor = this.glowColor;
                    
                    // Fill square with color
                    this.ctx.fillStyle = this.activeColor.replace(/[\d.]+\)$/g, `${0.2 * intensity})`);
                    this.ctx.fillRect(x, y, size, size);
                    
                    // Draw brighter border
                    this.ctx.strokeStyle = this.activeColor.replace(/[\d.]+\)$/g, `${0.5 + 0.5 * intensity})`);
                    this.ctx.lineWidth = 2;
                    this.ctx.strokeRect(x, y, size, size);
                    
                    // Reset shadow
                    this.ctx.shadowBlur = 0;
                } else {
                    // Draw normal grid line
                    this.ctx.strokeStyle = this.gridColor;
                    this.ctx.lineWidth = 1;
                    this.ctx.strokeRect(x, y, size, size);
                }
            }
            
            bindEvents() {
                // Bind to canvas for full coverage
                this.canvas.addEventListener('mousemove', (e) => {
                    // Only active on non-expanded cards
                    if (this.card.classList.contains('expanded')) return;
                    
                    const rect = this.canvas.getBoundingClientRect();
                    const mouseX = e.clientX - rect.left;
                    const mouseY = e.clientY - rect.top;
                    
                    // Check which squares are near the mouse
                    this.squares.forEach(square => {
                        const squareCenterX = square.x + this.squareSize / 2;
                        const squareCenterY = square.y + this.squareSize / 2;
                        const distance = Math.sqrt(
                            (mouseX - squareCenterX) ** 2 + (mouseY - squareCenterY) ** 2
                        );
                        
                        if (distance < this.squareSize * 1.5) {
                            square.active = true;
                            this.activeSquares.add(square.id);
                        } else {
                            square.active = false;
                            this.activeSquares.delete(square.id);
                        }
                    });
                });
                
                this.canvas.addEventListener('mouseleave', () => {
                    this.squares.forEach(square => {
                        square.active = false;
                    });
                    this.activeSquares.clear();
                });
                
                // Ripple on canvas click (but buttons will capture their own clicks due to higher z-index)
                this.canvas.addEventListener('click', (e) => {
                    // Only create ripple on non-expanded cards
                    if (this.card.classList.contains('expanded')) return;
                    
                    // Don't interfere with button clicks
                    if (e.target !== this.canvas) return;
                    
                    // Create ripple effect from click point
                    const rect = this.canvas.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const clickY = e.clientY - rect.top;
                    
                    this.createRipple(clickX, clickY);
                });
            }
            
            createRipple(centerX, centerY) {
                const maxDistance = Math.max(this.canvas.width, this.canvas.height);
                let currentRadius = 0;
                const speed = 10;
                
                const ripple = () => {
                    currentRadius += speed;
                    
                    this.squares.forEach(square => {
                        const squareCenterX = square.x + this.squareSize / 2;
                        const squareCenterY = square.y + this.squareSize / 2;
                        const distance = Math.sqrt(
                            (centerX - squareCenterX) ** 2 + (centerY - squareCenterY) ** 2
                        );
                        
                        if (distance >= currentRadius - 30 && distance <= currentRadius + 30) {
                            square.glow = Math.max(square.glow, 1);
                        }
                    });
                    
                    if (currentRadius < maxDistance) {
                        requestAnimationFrame(ripple);
                    }
                };
                
                ripple();
            }
            
            animate() {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                
                // Update all squares
                this.squares.forEach(square => {
                    // Update twinkle animation
                    if (square.isTwinkling) {
                        square.twinkleFrame++;
                        
                        // Calculate progress (0 to 1)
                        const progress = square.twinkleFrame / this.twinkleDuration;
                        
                        if (progress >= 1) {
                            // Animation complete
                            square.isTwinkling = false;
                            square.twinkleFrame = 0;
                            square.glow = 0;
                        } else {
                            // Apply easing to create smooth fade in and out
                            const easedProgress = this.easeInOutCubic(progress);
                            // Peak at 0.5 progress, using sine wave for smooth in/out
                            square.glow = Math.sin(progress * Math.PI) * 0.8;
                        }
                    }
                    
                    // Decay glow effect for non-twinkle glows (from ripples)
                    if (square.glow > 0 && !square.isTwinkling) {
                        square.glow -= 0.03;
                        if (square.glow < 0) square.glow = 0;
                    }
                    
                    this.drawSquare(square.x, square.y, this.squareSize, square.active, square.glow);
                });
                
                // Trigger new random twinkles
                if (Math.random() < this.twinkleFrequency) {
                    const randomSquare = this.squares[Math.floor(Math.random() * this.squares.length)];
                    if (!randomSquare.isTwinkling && !randomSquare.active) {
                        randomSquare.isTwinkling = true;
                        randomSquare.twinkleFrame = 0;
                    }
                }
                
                requestAnimationFrame(() => this.animate());
            }
            
            resize() {
                this.setupCanvas();
                this.generateSquareGrid();
            }
        }
        
        // Initialize interactive grids for all service cards (disabled on mobile)
        // const interactiveGrids = [];
        // const isMobile = window.matchMedia('(max-width: 768px)').matches;
        
        // if (!isMobile) {
        //     document.querySelectorAll('.service-card').forEach(card => {
        //         const canvas = card.querySelector('.service-card__grid-canvas');
        //         if (canvas) {
        //             const grid = new InteractiveSquareGrid(canvas, card);
        //             interactiveGrids.push(grid);
        //         }
        //     });
            
        //     // Handle window resize
        //     window.addEventListener('resize', () => {
        //         interactiveGrids.forEach(grid => grid.resize());
        //     });
        // } else {
        //     // On mobile, hide all canvases
        //     document.querySelectorAll('.service-card__grid-canvas').forEach(canvas => {
        //         canvas.style.display = 'none';
        //     });
        // }
        
        // ========================================
        // 3D HORIZONTAL CAROUSEL (COVERFLOW STYLE)
        // ========================================
        
        class TestimonialWheel {
            constructor(container) {
                this.container = container;
                this.wheel = document.getElementById('testimonial-wheel');
                this.items = Array.from(this.wheel.querySelectorAll('.testimonial-item'));
                this.currentIndex = 0;
                this.totalItems = this.items.length;
                this.autoRotateInterval = null;
                
                this.init();
            }
            
            init() {
                // Create indicators
                this.createIndicators();
                
                // Set initial positions
                this.updatePositions();
                
                // Bind controls
                document.getElementById('wheel-prev').addEventListener('click', () => this.prev());
                document.getElementById('wheel-next').addEventListener('click', () => this.next());
                
                // Auto-rotate
                this.startAutoRotate();
                
                // Pause on hover
                this.container.addEventListener('mouseenter', () => this.stopAutoRotate());
                this.container.addEventListener('mouseleave', () => this.startAutoRotate());
                
                // Keyboard navigation
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowLeft') this.prev();
                    if (e.key === 'ArrowRight') this.next();
                });
            }
            
            createIndicators() {
                const indicatorsContainer = document.getElementById('wheel-indicators');
                this.indicators = [];
                
                for (let i = 0; i < this.totalItems; i++) {
                    const indicator = document.createElement('div');
                    indicator.className = 'wheel-indicator';
                    if (i === 0) indicator.classList.add('active');
                    indicator.addEventListener('click', () => this.goTo(i));
                    indicatorsContainer.appendChild(indicator);
                    this.indicators.push(indicator);
                }
            }
            
            updatePositions() {
                const spacing = 280; // Horizontal spacing between cards
                const rotationAngle = 45; // Degrees to rotate side cards
                
                this.items.forEach((item, index) => {
                    const relativePosition = index - this.currentIndex;
                    
                    // Calculate horizontal offset from center
                    const xOffset = relativePosition * spacing;
                    
                    // Calculate Z offset (cards to the side move back in space)
                    const zOffset = Math.abs(relativePosition) * -150;
                    
                    // Calculate rotation (cards to left rotate right, cards to right rotate left)
                    let rotateY = 0;
                    if (relativePosition < 0) {
                        // Cards to the left - rotate to face slightly right
                        rotateY = rotationAngle;
                    } else if (relativePosition > 0) {
                        // Cards to the right - rotate to face slightly left
                        rotateY = -rotationAngle;
                    }
                    // Center card has 0 rotation
                    
                    // Calculate scale based on distance from center
                    const scale = relativePosition === 0 ? 1 : 0.85;
                    
                    // Set transform with 3D rotation
                    item.style.transform = `
                        translate(-50%, -50%)
                        translateX(${xOffset}px)
                        translateZ(${zOffset}px)
                        rotateY(${rotateY}deg)
                        scale(${scale})
                    `;
                    
                    // Update classes and z-index
                    item.classList.remove('active', 'left', 'right');
                    
                    if (relativePosition === 0) {
                        item.classList.add('active');
                        item.style.zIndex = 10;
                    } else if (relativePosition < 0) {
                        item.classList.add('left');
                        item.style.zIndex = 10 - Math.abs(relativePosition);
                    } else {
                        item.classList.add('right');
                        item.style.zIndex = 10 - Math.abs(relativePosition);
                    }
                    
                    // Opacity based on distance from center
                    if (relativePosition === 0) {
                        item.style.opacity = 1;
                    } else if (Math.abs(relativePosition) === 1) {
                        item.style.opacity = 0.7;
                    } else if (Math.abs(relativePosition) === 2) {
                        item.style.opacity = 0.4;
                    } else {
                        item.style.opacity = 0.2;
                    }
                });
                
                // Update indicators
                this.indicators.forEach((indicator, index) => {
                    if (index === this.currentIndex) {
                        indicator.classList.add('active');
                    } else {
                        indicator.classList.remove('active');
                    }
                });
            }
            
            next() {
                this.currentIndex = (this.currentIndex + 1) % this.totalItems;
                this.updatePositions();
                this.resetAutoRotate();
            }
            
            prev() {
                this.currentIndex = (this.currentIndex - 1 + this.totalItems) % this.totalItems;
                this.updatePositions();
                this.resetAutoRotate();
            }
            
            goTo(index) {
                this.currentIndex = index;
                this.updatePositions();
                this.resetAutoRotate();
            }
            
            startAutoRotate() {
                this.autoRotateInterval = setInterval(() => {
                    this.next();
                }, 5000); // Rotate every 5 seconds
            }
            
            stopAutoRotate() {
                if (this.autoRotateInterval) {
                    clearInterval(this.autoRotateInterval);
                    this.autoRotateInterval = null;
                }
            }
            
            resetAutoRotate() {
                this.stopAutoRotate();
                this.startAutoRotate();
            }
        }
        
        // Initialize testimonial carousel
        const testimonialContainer = document.querySelector('.testimonial-wheel-container');
        if (testimonialContainer) {
            const testimonialWheel = new TestimonialWheel(testimonialContainer);
        }
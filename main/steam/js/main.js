
        // Video data
        const videoData = [
            {
                id: 'dzuUr7xEXrc',
                title: 'STEAM Collective Day 1',
                description: '',
                thumbnail: 'https://img.youtube.com/vi/dzuUr7xEXrc/maxresdefault.jpg'
            },
            {
                id: 'Qk5k8DyHE34',
                title: 'STEAM Collective Day 2',
                description: '',
                thumbnail: 'https://img.youtube.com/vi/Qk5k8DyHE34/maxresdefault.jpg'
            },
            {
                id: '4Ngo5MhWPoI',
                title: 'STEAM Collective Testimonials',
                description: '',
                thumbnail: 'https://img.youtube.com/vi/4Ngo5MhWPoI/maxresdefault.jpg'
            }
        ];

        // Enhanced scroll and animation functionality
        document.addEventListener('DOMContentLoaded', () => {
            // Scroll Progress Bar
            const progressBar = document.querySelector('.scroll-progress');
            const backToTopBtn = document.getElementById('backToTop');
            const galleryTriggerBtn = document.getElementById('galleryTriggerBtn');
            
            function updateScrollProgress() {
                const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
                const scrollProgress = (window.pageYOffset / scrollTotal) * 100;
                progressBar.style.width = scrollProgress + '%';
                
                // Show/hide back to top button
                if (window.pageYOffset > 300) {
                    backToTopBtn.classList.add('visible');
                    galleryTriggerBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                    galleryTriggerBtn.classList.remove('visible');
                }
            }
            
            window.addEventListener('scroll', updateScrollProgress);
            
            // Back to top functionality
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
            
            // Enhanced scroll animations
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

            // Observe all animated elements
            const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
            animatedElements.forEach(el => observer.observe(el));
            
            // Image Gallery Modal
            const modal = document.getElementById('imageModal');
            const modalImg = document.getElementById('modalImage');
            const modalClose = document.getElementById('modalClose');
            const galleryImages = document.querySelectorAll('.gallery-image');
            
            galleryImages.forEach(img => {
                img.addEventListener('click', () => {
                    modal.style.display = 'block';
                    modalImg.src = img.dataset.src;
                    document.body.style.overflow = 'hidden';
                });
            });
            
            // Close modal functionality
            function closeModal() {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
            
            modalClose.addEventListener('click', closeModal);
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            });
            
            // Keyboard navigation for modal
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.style.display === 'block') {
                    closeModal();
                }
            });
            
            // Enhanced member card interactions
            const memberCards = document.querySelectorAll('.member-card');
            memberCards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    card.style.transform = 'translateY(-3px) scale(1.02)';
                });
                
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'translateY(0) scale(1)';
                });
            });
            
            // Smooth scrolling for internal links
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
            
            // Enhanced link interactions
            const interactiveLinks = document.querySelectorAll('.interactive-highlight');
            interactiveLinks.forEach(link => {
                link.addEventListener('mouseenter', () => {
                    link.style.color = 'var(--primary-blue)';
                });
                
                link.addEventListener('mouseleave', () => {
                    link.style.color = '';
                });
            });
            
            // Parallax effect for hero image (subtle)
            const heroImage = document.querySelector('.hero-image');
            if (heroImage) {
                window.addEventListener('scroll', () => {
                    const scrolled = window.pageYOffset;
                    const rate = scrolled * -0.2;
                    if (scrolled < window.innerHeight) {
                        heroImage.style.transform = `translateY(${rate}px)`;
                    }
                });
            }
            
            // Performance optimization - debounce scroll events
            function debounce(func, wait) {
                let timeout;
                return function executedFunction(...args) {
                    const later = () => {
                        clearTimeout(timeout);
                        func(...args);
                    };
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                };
            }
            
            // Debounced scroll handler
            const debouncedScrollHandler = debounce(updateScrollProgress, 10);
            window.removeEventListener('scroll', updateScrollProgress);
            window.addEventListener('scroll', debouncedScrollHandler);
            
            // Video Carousel Functionality
            let currentSlide = 0;
            const carouselTrack = document.getElementById('carouselTrack');
            const carouselIndicators = document.getElementById('carouselIndicators');
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            const videoModal = document.getElementById('videoModal');
            const videoModalTitle = document.getElementById('videoModalTitle');
            const videoModalBody = document.getElementById('videoModalBody');
            const videoModalClose = document.getElementById('videoModalClose');

            function createVideoCard(video, index) {
                return `
                    <div class="video-card" data-video-id="${video.id}" data-index="${index}">
                        <div class="video-thumbnail">
                            <img src="${video.thumbnail}" alt="${video.title}" loading="lazy">
                            <div class="play-overlay">
                                <div class="play-button">
                                    <i class="fas fa-play"></i>
                                </div>
                            </div>
                        </div>
                        <div class="video-info">
                            <h4 class="video-title">${video.title}</h4>
                            <p class="video-description">${video.description}</p>
                        </div>
                    </div>
                `;
            }

            function createIndicator(index) {
                return `<div class="indicator ${index === 0 ? 'active' : ''}" data-slide="${index}"></div>`;
            }

            function initializeCarousel() {
                // Populate video cards
                carouselTrack.innerHTML = videoData.map((video, index) => createVideoCard(video, index)).join('');
                
                // Populate indicators
                carouselIndicators.innerHTML = videoData.map((_, index) => createIndicator(index)).join('');
                
                // Add event listeners to video cards
                const videoCards = document.querySelectorAll('.video-card');
                videoCards.forEach(card => {
                    card.addEventListener('click', () => {
                        const videoId = card.dataset.videoId;
                        const videoIndex = parseInt(card.dataset.index);
                        openVideoModal(videoId, videoData[videoIndex].title);
                    });
                });

                // Add event listeners to indicators
                const indicators = document.querySelectorAll('.indicator');
                indicators.forEach(indicator => {
                    indicator.addEventListener('click', () => {
                        const slideIndex = parseInt(indicator.dataset.slide);
                        goToSlide(slideIndex);
                    });
                });

                updateCarousel();
            }

            function updateCarousel() {
                const cardWidth = 300 + 24; // card width + gap
                const offset = -currentSlide * cardWidth;
                carouselTrack.style.transform = `translateX(${offset}px)`;

                // Update indicators
                const indicators = document.querySelectorAll('.indicator');
                indicators.forEach((indicator, index) => {
                    indicator.classList.toggle('active', index === currentSlide);
                });

                // Update navigation buttons
                prevBtn.disabled = currentSlide === 0;
                nextBtn.disabled = currentSlide >= videoData.length - 1;
            }

            function goToSlide(slideIndex) {
                currentSlide = Math.max(0, Math.min(slideIndex, videoData.length - 1));
                updateCarousel();
            }

            function nextSlide() {
                if (currentSlide < videoData.length - 1) {
                    currentSlide++;
                    updateCarousel();
                }
            }

            function prevSlide() {
                if (currentSlide > 0) {
                    currentSlide--;
                    updateCarousel();
                }
            }

            function openVideoModal(videoId, title) {
                videoModalTitle.textContent = title;
                videoModalBody.innerHTML = `
                    <iframe 
                        src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" 
                        title="${title}"
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerpolicy="strict-origin-when-cross-origin" 
                        allowfullscreen>
                    </iframe>
                `;
                videoModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }

            function closeVideoModal() {
                videoModal.style.display = 'none';
                videoModalBody.innerHTML = '';
                document.body.style.overflow = 'auto';
            }

            // Initialize carousel
            initializeCarousel();

            // Navigation event listeners
            prevBtn.addEventListener('click', prevSlide);
            nextBtn.addEventListener('click', nextSlide);

            // Modal event listeners
            videoModalClose.addEventListener('click', closeVideoModal);
            videoModal.addEventListener('click', (e) => {
                if (e.target === videoModal) {
                    closeVideoModal();
                }
            });

            // Keyboard navigation for video modal
            document.addEventListener('keydown', (e) => {
                if (videoModal.style.display === 'block') {
                    if (e.key === 'Escape') {
                        closeVideoModal();
                    } else if (e.key === 'ArrowLeft') {
                        prevSlide();
                    } else if (e.key === 'ArrowRight') {
                        nextSlide();
                    }
                }
            });

            // Auto-advance carousel (optional - commented out by default)
            // setInterval(() => {
            //     if (currentSlide < videoData.length - 1) {
            //         nextSlide();
            //     } else {
            //         goToSlide(0);
            //     }
            // }, 8000);

            // Touch/swipe support for mobile
            let startX = 0;
            let currentX = 0;
            let isDragging = false;

            carouselTrack.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                isDragging = true;
            });

            carouselTrack.addEventListener('touchmove', (e) => {
                if (!isDragging) return;
                currentX = e.touches[0].clientX;
                e.preventDefault();
            });

            carouselTrack.addEventListener('touchend', () => {
                if (!isDragging) return;
                
                const diffX = startX - currentX;
                const threshold = 50;

                if (Math.abs(diffX) > threshold) {
                    if (diffX > 0) {
                        nextSlide();
                    } else {
                        prevSlide();
                    }
                }
                
                isDragging = false;
            });

            // Loading animation completion
            setTimeout(() => {
                document.body.classList.add('loaded');
            }, 100);
            
            // 🖼️ GALLERY FUNCTIONALITY
            initializeGalleryDrawer();
            
            // Gallery Section Buttons (multiple on page)
            const gallerySectionBtns = document.querySelectorAll('.gallery-btn-trigger');
            gallerySectionBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Use the same function that opens the gallery drawer
                    const galleryTriggerBtn = document.getElementById('galleryTriggerBtn');
                    if (galleryTriggerBtn) {
                        galleryTriggerBtn.click();
                    }
                });
            });
        });
        
        // Gallery data and functionality
        function initializeGalleryDrawer() {
            const galleryTriggerBtn = document.getElementById('galleryTriggerBtn');
            const galleryDrawerOverlay = document.getElementById('galleryDrawerOverlay');
            const galleryDrawer = document.getElementById('galleryDrawer');
            const galleryCloseBtn = document.getElementById('galleryCloseBtn');
            const galleryLoading = document.getElementById('galleryLoading');
            const galleryMasonry = document.getElementById('galleryMasonry');
            const galleryImageModal = document.getElementById('galleryImageModal');
            const galleryModalImage = document.getElementById('galleryModalImage');
            const galleryModalClose = document.getElementById('galleryModalClose');

            // Gallery data - Dynamic loading from proxy endpoint with caching
            const CACHE_KEY = 'steam_gallery_images';
            const CACHE_TIMESTAMP_KEY = 'steam_gallery_timestamp';
            const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds
                
                
            const fallbackGalleryImages = [
                'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/56233c80-0372-478a-ae7b-c665d7e790cb/D4PG_25-27.jpg?content-type=image%2Fjpeg',
                'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/a1f8513f-d8f8-4349-8a55-e85a9d906291/D4PG_25-26.jpg?content-type=image%2Fjpeg',
                'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/8c5978df-4ea7-44f9-b04d-4b95ff84fa3d/D4PG_25-39-min.jpg?content-type=image%2Fjpeg',
                'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/e0e1a38a-fab0-4b8b-96e1-524e100f115f/D4PG_25-37-min.jpg?content-type=image%2Fjpeg',
                'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/2eeda250-f302-47b5-8903-73a1f0e04ec7/D4PG_25-40-min.jpg?content-type=image%2Fjpeg',
                'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/acbcc8dd-c111-4411-b502-bb068d46994d/D4PG_25-38-min.jpg?content-type=image%2Fjpeg',
                'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/3d9ba313-f6b5-4cce-831a-a5b967f54650/D4PG_25-33-min.jpg?content-type=image%2Fjpeg',
                'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/092cef26-dcd0-4a43-b880-b4728a0b914a/D4PG_25-32-min.jpg?content-type=image%2Fjpeg',
                'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/38c2505f-5cbf-486f-ba88-93c26ec4b38a/D4PG_25-36-min.jpg?content-type=image%2Fjpeg',
                'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/9b363de3-7de1-4ab7-b112-a4472096b0ce/D4PG_25-31-min.jpg?content-type=image%2Fjpeg',
                'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/bbc0952f-f519-42f5-b4b5-545179de93c8/D4PG_25-41-min.jpg?content-type=image%2Fjpeg',
                'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/f78616f8-2e60-4389-9897-b6e685a25476/D4PG_25-34-min.jpg?content-type=image%2Fjpeg',
                'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/b4d8e230-a843-4c7a-9a74-9f807107a896/D4PG_25-30-min.jpg?content-type=image%2Fjpeg',
                'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/6af5ee5f-1758-484c-86a2-16a26ad34dff/D4PG_25-35-min.jpg?content-type=image%2Fjpeg',
                'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/8a6f601f-8463-4f04-9750-b71f8dd6c4ea/D4PG_25-23-min.jpg?content-type=image%2Fjpeg',
                'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/e469743a-45ff-42c5-a36c-cea3655c7f66/D4PG_25-22-min.jpg?content-type=image%2Fjpeg',
                'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/56682c1c-3dd2-46af-9800-aa4267608bc6/D4PG_25-24-min.jpg?content-type=image%2Fjpeg'
            ];

            // Function to fetch images from the proxy endpoint
            async function fetchGalleryImages() {
                try {
                    // Check cache first
                    const cachedImages = getCachedImages();
                    if (cachedImages) {
                        console.log('Using cached gallery images');
                        return cachedImages;
                    }
                    
                    console.log('Fetching fresh gallery images from proxy...');
                    const response = await fetch('/steam-2025-image-proxy');
                    
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    
                    const html = await response.text();
                    const images = parseImagesFromHTML(html);
                    
                    if (images.length > 0) {
                        // Cache the results
                        setCachedImages(images);
                        console.log(`Fetched and cached ${images.length} gallery images`);
                        return images;
                    } else {
                        throw new Error('No images found in proxy response');
                    }
                    
                } catch (error) {
                    console.error('Error fetching gallery images:', error);
                    console.log('Falling back to static images');
                    return fallbackGalleryImages;
                }
            }
            
            // Function to parse images from HTML
            function parseImagesFromHTML(html) {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const galleryElements = doc.querySelectorAll('.gallery img');
                
                const imageUrls = [];
                galleryElements.forEach(img => {
                    // Get the highest quality src available
                    const src = img.getAttribute('data-src') || img.getAttribute('src');
                    if (src && src.startsWith('http')) {
                        // Remove any query parameters that might limit quality
                        const cleanUrl = src.split('?')[0];
                        imageUrls.push(cleanUrl);
                    }
                });
                
                return imageUrls;
            }
            
            // Cache management functions
            function getCachedImages() {
                try {
                    const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
                    const cachedImages = localStorage.getItem(CACHE_KEY);
                    
                    if (!cachedTimestamp || !cachedImages) {
                        return null;
                    }
                    
                    const timestamp = parseInt(cachedTimestamp);
                    const now = Date.now();
                    
                    // Check if cache is still valid
                    if (now - timestamp < CACHE_DURATION) {
                        return JSON.parse(cachedImages);
                    } else {
                        // Cache expired, clear it
                        localStorage.removeItem(CACHE_KEY);
                        localStorage.removeItem(CACHE_TIMESTAMP_KEY);
                        return null;
                    }
                } catch (error) {
                    console.error('Error reading cache:', error);
                    return null;
                }
            }
            
            function setCachedImages(images) {
                try {
                    localStorage.setItem(CACHE_KEY, JSON.stringify(images));
                    localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
                } catch (error) {
                    console.error('Error setting cache:', error);
                }
            }
            
            // Utility function to clear gallery cache (can be called from browser console)
            window.clearGalleryCache = function() {
                localStorage.removeItem(CACHE_KEY);
                localStorage.removeItem(CACHE_TIMESTAMP_KEY);
                console.log('Gallery cache cleared. Refresh the page to fetch fresh images.');
            };
            
            let galleryLoaded = false;
            let observer = null;
            
            // Open gallery
            function openGallery() {
                galleryTriggerBtn.classList.add('active');
                galleryDrawerOverlay.classList.add('active');
                galleryDrawer.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                if (!galleryLoaded) {
                    loadGalleryImages();
                }
            }
            
            // Close gallery
            function closeGallery() {
                galleryTriggerBtn.classList.remove('active');
                galleryDrawerOverlay.classList.remove('active');
                galleryDrawer.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            // Load gallery images with lazy loading
            async function loadGalleryImages() {
                galleryLoading.style.display = 'flex';

                try {

                    // Fetch images dynamically
                    const galleryImages = await fetchGalleryImages();

                    observer = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                const img = entry.target;
                                img.src = img.dataset.src;
                                img.classList.add('loaded');
                                observer.unobserve(img);
                            }
                        });
                    }, {
                        rootMargin: '50px 0px',
                        threshold: 0.1
                    });
                    
                    galleryImages.forEach((imageUrl, index) => {
                        const galleryItem = document.createElement('div');
                        galleryItem.className = 'gallery-item';
                        galleryItem.innerHTML = `
                            <img 
                                class="gallery-item-image" 
                                data-src="${imageUrl}" 
                                alt="STEAM Collective Gallery Image ${index + 1}"
                                loading="lazy"
                            >
                            <div class="gallery-item-overlay">
                                <i class="gallery-item-icon fas fa-expand-alt"></i>
                            </div>
                        `;
                        
                        const img = galleryItem.querySelector('.gallery-item-image');
                        observer.observe(img);
                        
                        galleryItem.addEventListener('click', () => {
                            openImageModal(imageUrl);
                        });
                        
                        galleryMasonry.appendChild(galleryItem);
                    });
                    
                    setTimeout(() => {
                        galleryLoading.style.display = 'none';
                        galleryLoaded = true;
                    }, 800);
                } catch (error) {
                    console.error('Error loading gallery images:', error);
                    galleryLoading.style.display = 'none';
                    
                    // Show error message to user
                    const errorElement = document.createElement('div');
                    errorElement.className = 'gallery-error';
                    errorElement.innerHTML = `
                        <p>Unable to load gallery images. Please try again later.</p>
                        <button onclick="location.reload()">Refresh Page</button>
                    `;
                    galleryMasonry.appendChild(errorElement);
                }
            }
            
            function openImageModal(imageUrl) {
                galleryModalImage.src = imageUrl;
                galleryImageModal.classList.add('active');
            }
            
            function closeImageModal() {
                galleryImageModal.classList.remove('active');
                setTimeout(() => {
                    galleryModalImage.src = '';
                }, 400);
            }
            
            // Event listeners
            galleryTriggerBtn.addEventListener('click', openGallery);
            galleryCloseBtn.addEventListener('click', closeGallery);
            galleryDrawerOverlay.addEventListener('click', closeGallery);
            galleryModalClose.addEventListener('click', closeImageModal);
            galleryImageModal.addEventListener('click', (e) => {
                if (e.target === galleryImageModal) {
                    closeImageModal();
                }
            });
            
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    if (galleryImageModal.classList.contains('active')) {
                        closeImageModal();
                    } else if (galleryDrawer.classList.contains('active')) {
                        closeGallery();
                    }
                }
            });
        }
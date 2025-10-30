document.addEventListener('DOMContentLoaded', function() {
    // ========================================
    // HERO IMAGE ALTERNATING EFFECT
    // ========================================
    console.log('[Hero Image] Script initialization started');
    
    const heroPromoImage = document.querySelector('.hero-promo-image');
    const staticImageUrl = 'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/8181d473-ea36-4f6c-a045-e91b58a8812d/File.jpg?content-type=image%2Fjpeg';
    const glitchedImageUrl = 'https://www.tciamn.org/s/glitched-image.gif';
    
    console.log('[Hero Image] Looking for .hero-promo-image element...');
    console.log('[Hero Image] Element found:', heroPromoImage);
    console.log('[Hero Image] Current src:', heroPromoImage ? heroPromoImage.src : 'N/A');
    console.log('[Hero Image] Static URL:', staticImageUrl);
    console.log('[Hero Image] GIF URL:', glitchedImageUrl);
    
    let isShowingGlitch = false;
    let switchCount = 0;
    
    function alternateHeroImage() {
        switchCount++;
        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`[Hero Image] Switch #${switchCount} triggered`);
        console.log(` [Hero Image] Time: ${new Date().toLocaleTimeString()}`);
        
        if (!heroPromoImage) {
            console.error('❌ [Hero Image] ERROR: Image element not found!');
            return;
        }
        
        console.log(`[Hero Image] Current state - isShowingGlitch: ${isShowingGlitch}`);
        console.log(` [Hero Image] Current src before change: ${heroPromoImage.src}`);
        
        if (isShowingGlitch) {
            // Switch back to static image
            console.log('[Hero Image] Switching TO static image');
            heroPromoImage.src = staticImageUrl;
            isShowingGlitch = false;
            console.log(`[Hero Image] Image src set to: ${heroPromoImage.src}`);
            console.log(`[Hero Image] Next switch in 20 seconds (to GIF)`);
            // Show static for 20 seconds
            setTimeout(alternateHeroImage, 20000);
        } else {
            // Switch to glitched GIF
            console.log('✨ [Hero Image] Switching TO glitched GIF');
            
            // Add a test to see if the image loads
            const testImg = new Image();
            testImg.onload = () => {
                console.log('✅ [Hero Image] GIF loaded successfully');
            };
            testImg.onerror = () => {
                console.error('❌ [Hero Image] GIF failed to load!');
            };
            testImg.src = glitchedImageUrl;
            
            heroPromoImage.src = glitchedImageUrl;
            isShowingGlitch = true;
            console.log(`✅ [Hero Image] Image src set to: ${heroPromoImage.src}`);
            console.log(`⏱️ [Hero Image] Next switch in 2 seconds (to static)`);
            // Show glitch for 2 seconds
            setTimeout(alternateHeroImage, 2000);
        }
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    }
    
    // Start the alternating effect after initial 20 seconds
    if (heroPromoImage) {
        console.log('✅ [Hero Image] Alternating effect initialized successfully');
        console.log('⏳ [Hero Image] First switch will occur in 20 seconds');
        console.log('📌 [Hero Image] Timeline:');
        console.log('   - 0s: Static image (current)');
        console.log('   - 20s: Switch to GIF (2 second duration)');
        console.log('   - 22s: Switch to Static (20 second duration)');
        console.log('   - 42s: Switch to GIF (2 second duration)');
        console.log('   - And so on...');
        
        setTimeout(() => {
            console.log('⏰ [Hero Image] 20 seconds elapsed - triggering first switch now!');
            alternateHeroImage();
        }, 20000);
    } else {
        console.error('❌ [Hero Image] FATAL ERROR: .hero-promo-image element not found!');
        console.error('🔍 [Hero Image] Available elements with class containing "hero":');
        document.querySelectorAll('[class*="hero"]').forEach(el => {
            console.log('   -', el.className, el);
        });
    }
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Add click event listener to each link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default and do smooth scroll for hash links (within the same page)
            if (this.getAttribute('href') && this.getAttribute('href').startsWith('#')) {
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

    // Matrix Rain Effect
    const canvas = document.getElementById('Matrix');
    const context = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create alphabet from katakana, latin characters and numbers
    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';

    const alphabet = katakana + latin + nums;

    // Calculate columns based on font size
    const fontSize = 16;
    const columns = canvas.width/fontSize;

    // Initialize raindrops array
    const rainDrops = [];

    for( let x = 0; x < columns; x++ ) {
        rainDrops[x] = 1;
    }

    // Draw function for matrix effect
    const draw = () => {
        // Paint canvas with transparent black for fade effect
        context.fillStyle = 'rgba(0, 0, 0, 0.08)';
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Set notice yellow color and font with reduced opacity
        context.fillStyle = 'rgba(251, 197, 22, 0.35)';
        context.font = fontSize + 'px monospace';

        // Loop through raindrops and draw characters
        for(let i = 0; i < rainDrops.length; i++)
        {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            context.fillText(text, i*fontSize, rainDrops[i]*fontSize);

            // Reset raindrop to top with randomness when it goes off screen
            if(rainDrops[i]*fontSize > canvas.height && Math.random() > 0.975){
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    };

    // Start the matrix effect
    setInterval(draw, 30);

    // ========================================
    // ARTIST CARD HEX GRID BACKGROUNDS
    // ========================================
    
    // Initialize artist card hex grids
    const artistHexGrids = [];
    document.querySelectorAll('[data-artist-hex]').forEach((canvas, index) => {
        // Create a custom hex grid for artist cards
        const grid = {
            canvas: canvas,
            ctx: canvas.getContext('2d'),
            hexagons: [],
            activeHexagons: new Set(),
            hexRadius: 15,
            hexSpacing: 30
        };
        
        // Setup canvas
        const card = canvas.closest('.artist-card');
        if (card) {
            grid.canvas.width = card.clientWidth;
            grid.canvas.height = card.clientHeight;
        }
        
        // Generate hexagons
        const cols = Math.floor(grid.canvas.width / (grid.hexSpacing * 0.75));
        const rows = Math.floor(grid.canvas.height / (grid.hexSpacing * Math.sqrt(3) * 0.5));
        
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = col * grid.hexSpacing * 0.75;
                const y = row * grid.hexSpacing * Math.sqrt(3) * 0.5 + (col % 2) * grid.hexSpacing * Math.sqrt(3) * 0.25;
                
                grid.hexagons.push({
                    x: x + grid.hexRadius,
                    y: y + grid.hexRadius,
                    active: false,
                    glow: 0,
                    id: `${row}_${col}`
                });
            }
        }
        
        // Draw function
        const drawHex = (x, y, radius, active = false, glow = 0) => {
            grid.ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const angle = (Math.PI / 3) * i;
                const hx = x + radius * Math.cos(angle);
                const hy = y + radius * Math.sin(angle);
                if (i === 0) grid.ctx.moveTo(hx, hy);
                else grid.ctx.lineTo(hx, hy);
            }
            grid.ctx.closePath();
            
            if (active || glow > 0) {
                const intensity = Math.max(glow, active ? 1 : 0);
                grid.ctx.shadowBlur = 10 + intensity * 10;
                grid.ctx.shadowColor = `rgba(0, 255, 255, ${0.8 * intensity})`;
                grid.ctx.strokeStyle = `rgba(0, 255, 255, ${0.3 + 0.7 * intensity})`;
                grid.ctx.fillStyle = `rgba(0, 255, 255, ${0.1 * intensity})`;
                if (intensity > 0.5) grid.ctx.fill();
            } else {
                grid.ctx.shadowBlur = 0;
                grid.ctx.strokeStyle = 'rgba(0, 255, 255, 0.2)';
            }
            grid.ctx.lineWidth = 1;
            grid.ctx.stroke();
            grid.ctx.shadowBlur = 0;
        };
        
        // Animate function
        const animate = () => {
            grid.ctx.clearRect(0, 0, grid.canvas.width, grid.canvas.height);
            
            grid.hexagons.forEach(hex => {
                if (hex.glow > 0) {
                    hex.glow -= 0.02;
                    if (hex.glow < 0) hex.glow = 0;
                }
                drawHex(hex.x, hex.y, grid.hexRadius, hex.active, hex.glow);
            });
            
            // Random twinkling
            if (Math.random() < 0.02) {
                const randomHex = grid.hexagons[Math.floor(Math.random() * grid.hexagons.length)];
                randomHex.glow = Math.max(randomHex.glow, 0.5);
            }
            
            requestAnimationFrame(animate);
        };
        
        animate();
        artistHexGrids.push(grid);
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Recalculate columns for new width
        const newColumns = canvas.width/fontSize;
        
        // Adjust raindrops array if needed
        if (newColumns !== columns) {
            rainDrops.length = newColumns;
            for(let x = rainDrops.length; x < newColumns; x++) {
                rainDrops[x] = 1;
            }
        }
    });

    // ========================================
    // GALLERY DRAWER FUNCTIONALITY
    // ========================================
    
    const galleryTriggerBtn = document.getElementById('galleryTriggerBtn');
    const galleryDrawerOverlay = document.getElementById('galleryDrawerOverlay');
    const galleryDrawer = document.getElementById('galleryDrawer');
    const galleryCloseBtn = document.getElementById('galleryCloseBtn');
    const galleryLoading = document.getElementById('galleryLoading');
    const galleryMasonry = document.getElementById('galleryMasonry');
    const galleryImageModal = document.getElementById('galleryImageModal');
    const galleryModalImage = document.getElementById('galleryModalImage');
    const galleryModalClose = document.getElementById('galleryModalClose');
    
    // Show gallery trigger button on scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            galleryTriggerBtn.classList.add('visible');
        } else {
            galleryTriggerBtn.classList.remove('visible');
        }
    });
    
    // Gallery data - Dynamic loading from proxy endpoint with caching
    const CACHE_KEY = 'glitch_lab_gallery_images';
    const CACHE_TIMESTAMP_KEY = 'glitch_lab_gallery_timestamp';
    const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds
    
    // Fallback gallery images in case proxy fails
    const fallbackGalleryImages = [
        'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/85c4a867-3144-4c70-809a-0439fd6e4adf/IMG_3104.jpeg?content-type=image%2Fjpeg',
        'https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/8181d473-ea36-4f6c-a045-e91b58a8812d/File.jpg?content-type=image%2Fjpeg',
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
            const response = await fetch('/glitch-lab-image-proxy');
            
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
    window.clearGlitchLabGalleryCache = function() {
        localStorage.removeItem(CACHE_KEY);
        localStorage.removeItem(CACHE_TIMESTAMP_KEY);
        console.log('Glitch Lab gallery cache cleared. Refresh the page to fetch fresh images.');
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
                        alt="Glitch Lab Gallery Image ${index + 1}"
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
            errorElement.style.cssText = 'text-align: center; padding: 2rem; color: var(--notice-text-secondary);';
            errorElement.innerHTML = `
                <p>Unable to load gallery images. Please try again later.</p>
                <button onclick="location.reload()" class="notice-btn" style="margin-top: 1rem;">Refresh Page</button>
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

    // ========================================
    // ARTIST CAROUSEL
    // ========================================
    
    class ArtistCarousel {
        constructor(container) {
            this.container = container;
            this.carousel = document.getElementById('artist-carousel');
            this.items = Array.from(this.carousel.querySelectorAll('.artist-item'));
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
            document.getElementById('carousel-prev').addEventListener('click', () => this.prev());
            document.getElementById('carousel-next').addEventListener('click', () => this.next());
            
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
            const indicatorsContainer = document.getElementById('carousel-indicators');
            this.indicators = [];
            
            for (let i = 0; i < this.totalItems; i++) {
                const indicator = document.createElement('div');
                indicator.className = 'carousel-indicator';
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
                
                // Calculate rotation
                let rotateY = 0;
                if (relativePosition < 0) {
                    rotateY = rotationAngle;
                } else if (relativePosition > 0) {
                    rotateY = -rotationAngle;
                }
                
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
                } else {
                    item.style.opacity = 0.4;
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
    
    // Initialize artist carousel
    const artistCarouselContainer = document.querySelector('.artist-carousel-container');
    if (artistCarouselContainer) {
        const artistCarousel = new ArtistCarousel(artistCarouselContainer);
    }
    
    // ========================================
    // GALLERY PREVIEW LOADER
    // ========================================
    async function loadGalleryPreview() {
        try {
            // Fetch the first 3 gallery images
            const galleryImages = await fetchGalleryImages();
            const previewItems = document.querySelectorAll('.gallery-preview-item');
            
            // Load the first 3 images into the preview
            previewItems.forEach((item, index) => {
                if (index < galleryImages.length) {
                    const img = item.querySelector('.gallery-preview-image');
                    const loading = item.querySelector('.gallery-preview-loading');
                    const imageUrl = galleryImages[index];
                    
                    // Load the image
                    img.onload = () => {
                        img.style.opacity = '1';
                        loading.classList.add('hidden');
                    };
                    img.src = imageUrl;
                    
                    // Make it clickable to open full image modal
                    item.addEventListener('click', () => {
                        openImageModal(imageUrl);
                    });
                } else {
                    // If we don't have enough images, show a placeholder message
                    const loading = item.querySelector('.gallery-preview-loading');
                    loading.textContent = 'Coming Soon';
                }
            });
        } catch (error) {
            console.error('Error loading gallery preview:', error);
            // Keep the "Loading..." text if there's an error
        }
    }
    
    // Load gallery preview on page load
    loadGalleryPreview();
});
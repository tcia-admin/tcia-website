document.addEventListener('DOMContentLoaded', function() {

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
            const response = await fetch('/glitch-lab-image-proxy#gl-art-show');
            
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
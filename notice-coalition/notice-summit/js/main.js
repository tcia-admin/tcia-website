document.addEventListener('DOMContentLoaded', function() {
    // ========================================
    // GALLERY DRAWER FUNCTIONALITY
    // ========================================
    
    const galleryDrawerOverlay = document.getElementById('galleryDrawerOverlay');
    const galleryDrawer = document.getElementById('galleryDrawer');
    const galleryCloseBtn = document.getElementById('galleryCloseBtn');
    const galleryLoading = document.getElementById('galleryLoading');
    const galleryMasonry = document.getElementById('galleryMasonry');
    const galleryImageModal = document.getElementById('galleryImageModal');
    const galleryModalImage = document.getElementById('galleryModalImage');
    const galleryModalClose = document.getElementById('galleryModalClose');
    
    // Gallery data - Dynamic loading from proxy endpoint with caching
    const CACHE_KEY = 'summit_gallery_images';
    const CACHE_TIMESTAMP_KEY = 'summit_gallery_timestamp';
    const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds
    
    // Fallback gallery images in case proxy fails
    const fallbackGalleryImages = [
        'https://images.squarespace-cdn.com/content/v1/5b9081c58ab7224793278e1d/a8923716-5c3b-4b9b-9975-65edf8f7818f/D4PG_25-2265.jpg',
        'https://images.squarespace-cdn.com/content/v1/5b9081c58ab7224793278e1d/387dd645-4693-4651-8ccc-2ed458385129/D4PG_25-2310.jpg',
        'https://images.squarespace-cdn.com/content/v1/5b9081c58ab7224793278e1d/6ed17a96-3caf-4f6d-beaa-d0c2d7156ee8/D4PG_25-2295.jpg'
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
            const response = await fetch('/summit-proxy-1');
            
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
    window.clearSummitGalleryCache = function() {
        localStorage.removeItem(CACHE_KEY);
        localStorage.removeItem(CACHE_TIMESTAMP_KEY);
        console.log('Summit gallery cache cleared. Refresh the page to fetch fresh images.');
    };
    
    let galleryLoaded = false;
    let observer = null;
    
    // Open gallery
    function openGallery() {
        galleryDrawerOverlay.classList.add('active');
        galleryDrawer.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        if (!galleryLoaded) {
            loadGalleryImages();
        }
    }
    
    // Close gallery
    function closeGallery() {
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
    const galleryLink = document.getElementById('gallery-link');
    if (galleryLink) {
        galleryLink.addEventListener('click', function(e) {
            e.preventDefault();
            openGallery();
        });
    }
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
    
});
/**
 * Main JavaScript Module
 * Handles event listeners and initialization for the Notice Coalition website
 */

// Global variables
let player; // Plyr video player instance
let popupShown = false; // Track if popup has been shown

/**
 * Initializes video modal functionality
 */
function initializeVideoModal() {
    const videoModal = document.getElementById('videoModal');
    const videoPlaceholder = document.querySelector('.video-placeholder');
    const modalClose = document.querySelector('.modal-close');

    if (!videoModal || !videoPlaceholder || !modalClose) return;

    // Handle video link clicks
    document.querySelectorAll('.resource-action').forEach(link => {
        link.addEventListener('click', function(e) {
            const videoUrl = this.getAttribute('href');
            if (videoUrl && this.querySelector('.fa-circle-play')) {
                e.preventDefault();
                
                const videoData = Utils.getVideoEmbed(videoUrl);
                if (videoData) {
                    // Create iframe with proper embed URL
                    videoPlaceholder.innerHTML = `<iframe
                        src="${videoData.embed}"
                        allowfullscreen
                        allowtransparency
                        allow="autoplay"
                    ></iframe>`;
                    
                    // Initialize Plyr
                    if (player) {
                        player.destroy();
                    }
                    player = new Plyr('#player iframe', {
                        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'],
                        hideControls: false
                    });
                    
                    // Show modal
                    videoModal.style.display = 'flex';
                }
            }
        });
    });

    // Handle video thumbnail clicks
    document.addEventListener('click', function(e) {
        const videoThumbnail = e.target.closest('.video-thumbnail');
        if (videoThumbnail) {
            e.preventDefault();
            const videoUrl = videoThumbnail.dataset.videoUrl;
            
            if (videoUrl) {
                const videoData = Utils.getVideoEmbed(videoUrl);
                
                if (videoData) {
                    // Create iframe with proper embed URL
                    videoPlaceholder.innerHTML = `<iframe
                        src="${videoData.embed}"
                        allowfullscreen
                        allowtransparency
                        allow="autoplay"
                    ></iframe>`;
                    
                    // Initialize Plyr if it exists
                    if (typeof Plyr !== 'undefined') {
                        if (player) {
                            player.destroy();
                        }
                        player = new Plyr('#player iframe', {
                            controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'],
                            hideControls: false
                        });
                    }
                    
                    // Show modal
                    videoModal.style.display = 'flex';
                } else {
                    // Fallback to opening the URL in a new tab if we can't embed it
                    window.open(videoUrl, '_blank');
                }
            }
        }
    });

    // Close modal functionality
    modalClose.addEventListener('click', () => {
        videoModal.style.display = 'none';
        if (player) {
            player.destroy();
        }
        videoPlaceholder.innerHTML = '';
    });

    // Close on background click
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            videoModal.style.display = 'none';
            if (player) {
                player.destroy();
            }
            videoPlaceholder.innerHTML = '';
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.style.display === 'flex') {
            videoModal.style.display = 'none';
            if (player) {
                player.destroy();
            }
            videoPlaceholder.innerHTML = '';
        }
    });
}

/**
 * Initializes navigation smooth scrolling
 */
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle links that start with # (i.e., scroll to section on current page)
            if (href.startsWith('#')) {
                e.preventDefault();
                
                // Get the target section id from the href
                const targetId = href.substring(1);
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
            // Links to other pages will work with default browser behavior
        });
    });
}

/**
 * Initializes connect modal functionality
 */
function initializeConnectModal() {
    const modal = document.getElementById('connectModal');
    const btn = document.getElementById('connectBtn');
    const closeBtn = document.querySelector('.close-modal');

    if (!modal || !btn || !closeBtn) return;

    btn.addEventListener('click', () => {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

/**
 * Initializes Substack popup functionality
 */
function initializeSubstackPopup() {
    const popup = document.getElementById('substackPopup');
    const closeBtn = document.querySelector('.close-popup');
    const initiativesSection = document.getElementById('resources');

    if (!popup || !closeBtn) return;

    // Add scroll event listener to check if user has scrolled to resources section
    window.addEventListener('scroll', function() {
        if (!popupShown && initiativesSection) {
            const rect = initiativesSection.getBoundingClientRect();
            // Check if resources section is in viewport
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                const shown = UIHandler.showPopup(popup, popupShown);
                if (shown) {
                    popupShown = true;
                }
            }
        }
    });
    
    // Close popup when close button is clicked
    closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });
    
    // Close popup when clicking outside the content
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close popup when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popup.style.display === 'flex') {
            popup.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

/**
 * Loads and displays feed data
 */
async function loadFeedData() {
    try {
        const items = await DataFetcher.fetchFeedData();
        UIHandler.displayFeedItems(items);
    } catch (error) {
        console.error('Error loading feed data:', error);
    }
}

/**
 * Loads and displays newsletter data
 */
async function loadNewsletterData() {
    try {
        const items = await DataFetcher.fetchNewsletterData();
        UIHandler.displayNewsletterItems(items);
    } catch (error) {
        console.error('Error loading newsletter data:', error);
    }
}

/**
 * Loads and displays resources data
 */
async function loadResourcesData() {
    try {
        // Debug mode detection
        const urlParams = new URLSearchParams(window.location.search);
        const debugMode = urlParams.get('debugMode') === 'true';
        const refreshResources = urlParams.get('refreshResources') === 'true';
        
        const data = await DataFetcher.getResources(refreshResources, debugMode);
        await UIHandler.displayResources(data, debugMode);
    } catch (error) {
        console.error('Error loading resources data:', error);
    }
}

/**
 * Main initialization function
 */
function initialize() {
    // Initialize all modules
    initializeVideoModal();
    initializeNavigation();
    initializeConnectModal();
    initializeSubstackPopup();
    
    // Load data
    loadFeedData();
    loadNewsletterData();
    loadResourcesData();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initialize);

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    // Node.js environment
    module.exports = {
        initialize,
        initializeVideoModal,
        initializeNavigation,
        initializeConnectModal,
        initializeSubstackPopup,
        loadFeedData,
        loadNewsletterData,
        loadResourcesData
    };
} else {
    // Browser environment - attach to window object
    window.Main = {
        initialize,
        initializeVideoModal,
        initializeNavigation,
        initializeConnectModal,
        initializeSubstackPopup,
        loadFeedData,
        loadNewsletterData,
        loadResourcesData
    };
}

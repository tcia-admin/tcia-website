document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Add click event listener to each link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only prevent default for same-page section links
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
        });
    });

    // Load resources
    // Fetch resource items from external JSON file
    fetch('https://tcia-admin.github.io/tcia-server-files/notice-resources-list.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Store the fetched data and limit to first 6 items for homepage
            const resourceItems = data;
            
            const resourcesGrid = document.querySelector('.resources-grid');
            const filterBtns = document.querySelectorAll('.filter-btn');
            
            // Check which resource types exist in the full dataset
            const availableTypes = {};
            resourceItems.forEach(item => {
                if (item.type) {
                    availableTypes[item.type] = true;
                }
            });
            
            // Update filter buttons based on available types
            filterBtns.forEach(btn => {
                const filterType = btn.dataset.filter;
                if (filterType !== 'ALL' && !availableTypes[filterType]) {
                    // Grey out filters with no matching resources
                    btn.classList.add('disabled');
                    btn.style.opacity = '0.5';
                    btn.style.cursor = 'not-allowed';
                }
            });
            
            let currentFilter = 'ALL';

            // Function to populate resources grid with filtering
            function populateResourcesGrid(items, filter) {
                if (!resourcesGrid) return;
                
                resourcesGrid.innerHTML = '';
                let filteredItems = items;
                
                // Apply type filter
                if (filter !== 'ALL') {
                    filteredItems = filteredItems.filter(item => item.type === filter);
                }
                
                // Display items
                filteredItems.forEach(item => {
                    const resourceCard = document.createElement('div');
                    resourceCard.className = 'resource-card';
                    
                    // Determine if this is a video resource
                    const isVideo = item.type === 'VIDEO';
                    
                    // Create different HTML structure based on resource type
                    resourceCard.innerHTML = `
                        <div class="resource-image">
                            ${isVideo ? 
                                `<a href="#" class="video-thumbnail" data-video-url="${item.videoUrl}">
                                    <img src="${item.image}" alt="${item.title}">
                                    <div class="play-overlay">
                                        <i class="fa-solid fa-circle-play"></i>
                                    </div>
                                </a>` : 
                                `<a href="${item.downloadUrl}" target="_blank" rel="noopener noreferrer">
                                    <img src="${item.image}" alt="${item.title}">
                                </a>`
                            }
                        </div>
                        <div class="resource-content">
                            <div class="resource-meta">
                                <span class="resource-tag"><i class="fa-solid fa-hashtag"></i>${item.type}</span>
                                <div class="resource-links">
                                    <a href="${item.downloadUrl}" class="resource-action" title="${item.tooltip || (isVideo ? 'Watch' : 'Download')}" target="_blank" rel="noopener noreferrer">
                                        <i class="fa-solid ${isVideo ? 'fa-circle-play' : 'fa-cloud-arrow-down'}"></i>
                                    </a>
                                </div>
                            </div>
                            <p class="resource-description">${item.title}</p>
                            ${item.buttonLink ? `<a href="${item.buttonLink}" class="resource-link">${item.buttonName}</a>` : 
                              isVideo ? `<a href="${item.downloadUrl}" class="resource-link" target="_blank">Watch Video</a>` : ''}
                        </div>
                    `;
                    resourcesGrid.appendChild(resourceCard);
                });
            }
            
            // Initialize display
            populateResourcesGrid(resourceItems, currentFilter);

            // Filter functionality
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Skip if button is disabled
                    if (btn.classList.contains('disabled')) return;
                    
                    filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    currentFilter = btn.dataset.filter;
                    
                    populateResourcesGrid(resourceItems, currentFilter);
                });
            });
        })
        .catch(error => {
            console.error('Error fetching resource items:', error);
            // Fallback to display an error message in the grid
            const resourcesGrid = document.querySelector('.resources-grid');
            if (resourcesGrid) {
                resourcesGrid.innerHTML = '<div class="resource-card"><div class="resource-content"><p class="resource-description">Unable to load resources. Please try again later.</p></div></div>';
            }
        });

    // Create video modal
    const videoModal = document.createElement('div');
    videoModal.className = 'video-modal';
    videoModal.innerHTML = `
        <div class="video-modal-content">
            <span class="close-video-modal">&times;</span>
            <div class="video-container">
                <iframe frameborder="0" allowfullscreen></iframe>
            </div>
        </div>
    `;
    document.body.appendChild(videoModal);
    
    const closeVideoModal = videoModal.querySelector('.close-video-modal');
    const videoIframe = videoModal.querySelector('iframe');
    
    // Handle video thumbnail clicks
    document.addEventListener('click', function(e) {
        const videoThumbnail = e.target.closest('.video-thumbnail');
        if (videoThumbnail) {
            e.preventDefault();
            const videoUrl = videoThumbnail.dataset.videoUrl;
            videoIframe.src = videoUrl;
            videoModal.style.display = 'block';
        }
    });
    
    // Close modal handlers
    closeVideoModal.addEventListener('click', function() {
        videoModal.style.display = 'none';
        videoIframe.src = '';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            videoModal.style.display = 'none';
            videoIframe.src = '';
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.style.display === 'block') {
            videoModal.style.display = 'none';
            videoIframe.src = '';
        }
    });
});
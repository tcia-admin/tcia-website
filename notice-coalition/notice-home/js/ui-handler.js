/**
 * UI Handler Module
 * Handles DOM manipulation and UI interactions
 */

/**
 * Updates the resources navigation link styling when new content is available
 * @param {boolean} hasNewResources - Whether there are new resources
 */
function updateResourcesNavLink(hasNewResources) {
    const resourcesLink = document.querySelector('.nav-links a[href="#resources"]');
    if (resourcesLink) {
        if (hasNewResources) {
            // Add class to mark that new resources are available
            resourcesLink.classList.add('has-new-content');
        } else {
            // Remove the indicator if no new resources
            resourcesLink.classList.remove('has-new-content');
        }
    }
}

/**
 * Shows the Substack popup
 * @param {HTMLElement} popup - The popup element
 * @param {boolean} popupShown - Whether popup has already been shown
 */
function showPopup(popup, popupShown) {
    if (popupShown) return; // Don't show if already shown in this session
    
    const count = Utils.getPopupCount();
    if (count < 3) { // Only show if less than 3 times today
        popup.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Disable scrolling
        Utils.incrementPopupCount();
        return true; // Indicate popup was shown
    }
    return false; // Indicate popup was not shown
}

/**
 * Creates a debug panel for development
 * @param {boolean} debugMode - Whether debug mode is enabled
 * @returns {HTMLElement|null} The debug panel element or null
 */
function createDebugPanel(debugMode) {
    if (debugMode && !document.getElementById('debugPanel')) {
        const debugPanel = document.createElement('div');
        debugPanel.id = 'debugPanel';
        debugPanel.className = 'debug-panel';
        debugPanel.innerHTML = `
            <h3>Debug Panel</h3>
            <div class="debug-section">
                <h4>Resources</h4>
                <div id="resourceDebugInfo"></div>
            </div>
        `;
        
        // Apply styles to debug panel
        debugPanel.style.position = 'fixed';
        debugPanel.style.bottom = '20px';
        debugPanel.style.right = '20px';
        debugPanel.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        debugPanel.style.color = 'var(--notice-white)';
        debugPanel.style.padding = '15px';
        debugPanel.style.borderRadius = '5px';
        debugPanel.style.zIndex = '9999';
        debugPanel.style.maxWidth = '400px';
        debugPanel.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
        debugPanel.style.fontSize = 'var(--font-size-sm)';
        debugPanel.style.transition = 'all 0.3s ease';
        
        // Add a toggle button to minimize/expand
        const toggleButton = document.createElement('button');
        toggleButton.innerHTML = '−';
        toggleButton.style.position = 'absolute';
        toggleButton.style.top = '5px';
        toggleButton.style.right = '5px';
        toggleButton.style.background = 'none';
        toggleButton.style.border = 'none';
        toggleButton.style.color = 'var(--notice-white)';
        toggleButton.style.cursor = 'pointer';
        toggleButton.style.fontSize = '16px';
        
        let expanded = true;
        const sections = [];
        
        toggleButton.addEventListener('click', () => {
            sections.forEach(section => {
                section.style.display = expanded ? 'none' : 'block';
            });
            expanded = !expanded;
            toggleButton.innerHTML = expanded ? '−' : '+';
        });
        
        debugPanel.appendChild(toggleButton);
        document.body.appendChild(debugPanel);
        
        // Collect all debug sections for the toggle functionality
        sections.push(document.querySelector('.debug-section'));
        
        return debugPanel;
    }
    return null;
}

/**
 * Updates resource debug info in debug panel
 * @param {string} message - Debug message
 * @param {Object} data - Debug data
 */
function updateResourceDebugInfo(message, data) {
    const debugInfo = document.getElementById('resourceDebugInfo');
    if (debugInfo) {
        // Show resource cache information
        let infoHTML = `<p>${message}</p>`;
        
        if (data && data.timestamp) {
            const cacheTime = new Date(data.timestamp).toLocaleString();
            infoHTML += `<p>Cache timestamp: ${cacheTime}</p>`;
        }
        
        // Add refresh button
        infoHTML += `<button id="refreshResourcesBtn" class="notice-btn">Refresh Resources Cache</button>`;
        
        debugInfo.innerHTML = infoHTML;
        
        // Add event listener to refresh button
        const refreshBtn = document.getElementById('refreshResourcesBtn');
        if (refreshBtn) {
            refreshBtn.style.fontSize = 'var(--font-size-sm)';
            refreshBtn.style.padding = '5px 10px';
            refreshBtn.style.marginTop = '10px';
            refreshBtn.addEventListener('click', async () => {
                DataFetcher.clearResourcesCache();
                await displayResources();
                updateResourceDebugInfo('Cache manually cleared and refreshed!');
            });
        }
    }
}

/**
 * Displays feed items in the DOM
 * @param {Array} items - Array of feed items
 * @param {string} containerId - ID of the container element
 */
function displayFeedItems(items, containerId = 'feed-items') {
    const feedContainer = document.getElementById(containerId);
    if (!feedContainer) return;

    feedContainer.innerHTML = items.map(item => `
        <article class="feed-item">
            <a href="${item.link}" class="feed-item-link" target="_blank" rel="noopener noreferrer">
                <img src="${item.image_url}" alt="${item.title}" class="feed-item-image">
                <div class="feed-item-content">
                    <div class="feed-item-source">${item.feed_name}</div>
                    <h3 class="feed-item-title">${item.title}</h3>
                    <p class="feed-item-description">${item.description}</p>
                    <div class="feed-item-date">${Utils.formatDate(item.pubDate)}</div>
                </div>
            </a>
        </article>
    `).join('');
}

/**
 * Displays newsletter items in the DOM
 * @param {Array} items - Array of newsletter items
 * @param {string} containerId - ID of the container element
 */
function displayNewsletterItems(items, containerId = 'newsletter-items') {
    const newsletterContainer = document.getElementById(containerId);
    if (!newsletterContainer) return;
    
    newsletterContainer.innerHTML = items.map(item => `
        <article class="feed-item">
            <a href="${item.link}" class="feed-item-link" target="_blank" rel="noopener noreferrer">
                <img src="${item.image_url}" alt="${item.title}" class="feed-item-image">
                <div class="feed-item-content">
                    <div class="feed-item-source">${item.feed_name}</div>
                    <h3 class="feed-item-title">${item.title}</h3>
                    <p class="feed-item-description">${item.description}</p>
                    <div class="feed-item-date">${Utils.formatDate(item.pubDate)}</div>
                </div>
            </a>
        </article>
    `).join('');
}

/**
 * Displays resources in the DOM
 * @param {Array} data - Array of resource items
 * @param {boolean} debugMode - Whether debug mode is enabled
 */
async function displayResources(data, debugMode = false) {
    const resourcesGrid = document.querySelector('.resources-grid');
    
    if (!resourcesGrid) return;
    
    try {
        // Create debug panel if debug mode is enabled
        if (debugMode) {
            createDebugPanel(debugMode);
        }
        
        // Check if any resources are recent to update nav
        const hasNewResources = data.some(item => Utils.isRecent(item.date));
        updateResourcesNavLink(hasNewResources);
        
        // Limit to first 6 items for homepage
        // const resourceItems = data.slice(0, 6);

        // Selects specific articles based on indices and filter from fetched data

        const indices = [0,1,2,4,6,8]
        const resourceItems = data.filter((_, index) => indices.includes(index));
        
        resourcesGrid.innerHTML = '';
        
        // Display items
        resourceItems.forEach(item => {
            const isRecentResource = Utils.isRecent(item.date);
            const resourceCard = document.createElement('div');
            resourceCard.className = isRecentResource ? 'resource-card recent-resource' : 'resource-card';
            
            // Determine if this is a video resource
            const isVideo = item.type === 'VIDEO';
            
            resourceCard.innerHTML = `
                <div class="resource-image">
                    ${isVideo ? 
                        `<a href="#" class="video-thumbnail" data-video-url="${item.videoUrl || item.downloadUrl}">
                            <img src="${item.image}" alt="${item.title}">
                            <div class="play-overlay">
                                <i class="fa-solid fa-circle-play"></i>
                            </div>
                        </a>` : 
                        `<a href="${item.downloadUrl}" target="_blank" rel="noopener noreferrer">
                            <img src="${item.image}" alt="${item.title}">
                        </a>`
                    }
                    ${isRecentResource ? '<div class="new-badge">NEW</div>' : ''}
                </div>
                <div class="resource-content">
                    <div class="resource-meta">
                        <span class="resource-tag"><i class="fa-solid fa-hashtag"></i>${item.type}</span>
                        <div class="resource-links">
                            <a href="${item.downloadUrl}" class="resource-action" title="${item.tooltip || (isVideo ? 'Watch Video' : 'Download')}" target="_blank" rel="noopener noreferrer">
                                <i class="fa-solid ${isVideo ? 'fa-circle-play' : 'fa-cloud-arrow-down'}"></i>
                            </a>
                        </div>
                    </div>
                    <p class="resource-description">${item.title}</p>
                    ${debugMode ? `<div class="resource-date">${new Date(item.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    })}</div>` : ''}
                </div>
            `;
            resourcesGrid.appendChild(resourceCard);
        });
        
    } catch (error) {
        console.error('Error displaying resources:', error);
        resourcesGrid.innerHTML = '<div class="resource-card"><div class="resource-content"><p class="resource-description">Unable to load resources. Please try again later.</p></div></div>';
        
        if (debugMode) {
            updateResourceDebugInfo(`Error loading resources: ${error.message}`);
        }
    }
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    // Node.js environment
    module.exports = {
        updateResourcesNavLink,
        showPopup,
        createDebugPanel,
        updateResourceDebugInfo,
        displayFeedItems,
        displayNewsletterItems,
        displayResources
    };
} else {
    // Browser environment - attach to window object
    window.UIHandler = {
        updateResourcesNavLink,
        showPopup,
        createDebugPanel,
        updateResourceDebugInfo,
        displayFeedItems,
        displayNewsletterItems,
        displayResources
    };
}
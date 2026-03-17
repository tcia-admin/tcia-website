/**
 * Data Fetcher Module
 * Handles all API calls and data fetching for the Notice Coalition website
 */

// API Endpoints
const API_ENDPOINTS = {
    FEEDS: 'https://tcia-website.s3.us-west-2.amazonaws.com/processed_feeds.json',
    RESOURCES: 'https://tcia-admin.github.io/tcia-server-files/notice-resources-list-home.json'
};

// Cache configuration
const CACHE_CONFIG = {
    RESOURCES_CACHE_KEY: 'noticeResourcesCache',
    CACHE_DURATION: 60 * 60 * 1000 // 1 hour in milliseconds
};

/**
 * Fetches feed data from the API
 * @returns {Promise<Array>} Array of feed items
 */
async function fetchFeedData() {
    try {
        const response = await fetch(API_ENDPOINTS.FEEDS);
        const data = await response.json();
        return data.items; // returns all items for list
        // return data.items.slice(0, 6); // Get only the latest 6 items (limited for homepage)
    } catch (error) {
        console.error('Error fetching feed data:', error);
        return [];
    }
}

/**
 * Fetches newsletter data (filtered from feed data)
 * @returns {Promise<Array>} Array of newsletter items
 */
async function fetchNewsletterData() {
    try {
        console.log('DataFetcher: Fetching newsletter data from', API_ENDPOINTS.FEEDS);
        const response = await fetch(API_ENDPOINTS.FEEDS);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('DataFetcher: Raw feed data received, total items:', data.items ? data.items.length : 0);
        
        // Filter for newsletter entries only (from Substack)
        const newsletterItems = data.items
            .filter(item => {
                const hasSubstack = item.feed_name && item.feed_name.includes('Substack');
                if (hasSubstack) {
                    console.log('DataFetcher: Found Substack item:', item.feed_name);
                }
                return hasSubstack;
            })
            .slice(0, 3); // Get only the latest 3 newsletter items
        
        console.log(`DataFetcher: Filtered ${newsletterItems.length} Substack newsletter items`);
        return newsletterItems;
    } catch (error) {
        console.error('DataFetcher: Error fetching newsletter data:', error);
        console.error('DataFetcher: Feed endpoint attempted:', API_ENDPOINTS.FEEDS);
        return [];
    }
}

/**
 * Fetches resources data from the API
 * @returns {Promise<Array>} Array of resource items
 */
async function fetchResourcesFromAPI() {
    const response = await fetch(API_ENDPOINTS.RESOURCES);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    
    // Save data to localStorage with timestamp
    const cacheData = {
        timestamp: Date.now(),
        resources: data
    };
    
    localStorage.setItem(CACHE_CONFIG.RESOURCES_CACHE_KEY, JSON.stringify(cacheData));
    
    return data;
}

/**
 * Gets resources data (from cache or API)
 * @param {boolean} refreshResources - Whether to skip cache and fetch fresh data
 * @param {boolean} debugMode - Whether debug mode is enabled
 * @returns {Promise<Array>} Array of resource items
 */
async function getResources(refreshResources = false, debugMode = false) {
    // If refresh resources mode is enabled, skip cache and fetch fresh data
    if (refreshResources) {
        console.log('Refresh resources mode: Fetching fresh resources data');
        return await fetchResourcesFromAPI();
    }
    
    // Check if we have cached data
    const cachedData = localStorage.getItem(CACHE_CONFIG.RESOURCES_CACHE_KEY);
    
    if (cachedData) {
        const cache = JSON.parse(cachedData);
        const now = Date.now();
        
        // If cache is less than an hour old, use it
        if (now - cache.timestamp < CACHE_CONFIG.CACHE_DURATION) {
            console.log('Using cached resources data');
            if (debugMode) {
                updateResourceDebugInfo('Using cached resources data', cache);
            }
            return cache.resources;
        }
        
        console.log('Cache expired: Fetching fresh resources data');
        if (debugMode) {
            updateResourceDebugInfo('Cache expired: Fetching fresh data', cache);
        }
    } else {
        console.log('No cache found: Fetching resources data for the first time');
        if (debugMode) {
            updateResourceDebugInfo('No cache found: Fetching fresh data');
        }
    }
    
    // Cache is invalid or expired, fetch fresh data
    return await fetchResourcesFromAPI();
}

/**
 * Clears the resources cache
 */
function clearResourcesCache() {
    localStorage.removeItem(CACHE_CONFIG.RESOURCES_CACHE_KEY);
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    // Node.js environment
    module.exports = {
        fetchFeedData,
        fetchNewsletterData,
        fetchResourcesFromAPI,
        getResources,
        clearResourcesCache,
        API_ENDPOINTS,
        CACHE_CONFIG
    };
} else {
    // Browser environment - attach to window object
    window.DataFetcher = {
        fetchFeedData,
        fetchNewsletterData,
        fetchResourcesFromAPI,
        getResources,
        clearResourcesCache,
        API_ENDPOINTS,
        CACHE_CONFIG
    };
}
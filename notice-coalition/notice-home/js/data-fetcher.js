/**
 * Data Fetcher Module
 * Handles all API calls and data fetching for the Notice Coalition website
 */

// API Endpoints
const API_ENDPOINTS = {
    FEEDS: 'https://tcia-website.s3.us-west-2.amazonaws.com/processed_feeds.json',
    RESOURCES: 'https://tcia-admin.github.io/tcia-server-files/notice-resources-list.json'
};

// Cache configuration
const CACHE_CONFIG = {
    RESOURCES_CACHE_KEY: 'noticeResourcesCache',
    CACHE_DURATION: 60 * 60 * 10 
    // * 1000 // 1 hour in milliseconds
};

/**
 * Fetches feed data from the API
 * @returns {Promise<Array>} Array of feed items
 */
async function fetchFeedData() {
    try {
        const response = await fetch(API_ENDPOINTS.FEEDS);
        const data = await response.json();
        
        // Select specific indices to ensure diverse content
        const indices = [0, 1, 2, 4, 6, 8];
        const selectedItems = indices.map(i => data.items[i]).filter(Boolean);

        return selectedItems;
        console.log(selectedItems);
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
        const response = await fetch(API_ENDPOINTS.FEEDS);
        const data = await response.json();
        // Filter for newsletter entries only (from Substack)
        return data.items
            .filter(item => item.feed_name.includes('Substack'))
            .slice(0, 3); // Get only the latest 3 newsletter items
    } catch (error) {
        console.error('Error fetching newsletter data:', error);
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
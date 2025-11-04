/**
 * Utility Functions Module
 * Contains helper functions for date formatting, cookies, video handling, etc.
 */

/**
 * Formats a date string for display
 * @param {string} dateString - The date string to format
 * @returns {string} Formatted date string
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Gets today's date in YYYY-MM-DD format
 * @returns {string} Today's date string
 */
function getTodayString() {
    const date = new Date();
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

/**
 * Checks if a resource is recent (less than 30 days old)
 * @param {string} dateString - The date string to check
 * @returns {boolean} True if the resource is recent
 */
function isRecent(dateString) {
    const resourceDate = new Date(dateString);
    const now = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(now.getDate() - 30);
    return resourceDate >= thirtyDaysAgo;
}

/**
 * Sets a cookie with the given name, value, and expiration days
 * @param {string} name - Cookie name
 * @param {string} value - Cookie value
 * @param {number} days - Number of days until expiration
 */
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

/**
 * Gets a cookie value by name
 * @param {string} name - Cookie name
 * @returns {string} Cookie value or empty string if not found
 */
function getCookie(name) {
    const cookieName = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for(let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return "";
}

/**
 * Gets the popup count from cookies
 * @returns {number} Current popup count
 */
function getPopupCount() {
    const today = getTodayString();
    const storedDate = getCookie("popupDate");
    const count = getCookie("popupCount");
    
    // If it's a new day, reset the count
    if (storedDate !== today) {
        setCookie("popupDate", today, 1);
        setCookie("popupCount", "0", 1);
        return 0;
    }
    
    return count ? parseInt(count) : 0;
}

/**
 * Increments the popup count in cookies
 */
function incrementPopupCount() {
    const count = getPopupCount();
    setCookie("popupCount", (count + 1).toString(), 1);
}

/**
 * Extracts video embed URL from various video platform URLs
 * @param {string} url - The video URL
 * @returns {Object|null} Object with video data or null if not supported
 */
function getVideoEmbed(url) {
    // YouTube
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const youtubeMatch = url.match(youtubeRegex);
    
    if (youtubeMatch) {
        return {
            type: 'youtube',
            id: youtubeMatch[1],
            embed: `https://www.youtube.com/embed/${youtubeMatch[1]}?origin=${window.location.origin}&iv_load_policy=3&modestbranding=1&playsinline=1&showinfo=0&rel=0&enablejsapi=1`
        };
    }
    
    // Vimeo
    const vimeoRegex = /(?:vimeo\.com\/)([0-9]+)/;
    const vimeoMatch = url.match(vimeoRegex);
    
    if (vimeoMatch) {
        return {
            type: 'vimeo',
            id: vimeoMatch[1],
            embed: `https://player.vimeo.com/video/${vimeoMatch[1]}?loop=false&byline=false&portrait=false&title=false&speed=true&transparent=0&gesture=media`
        };
    }
    
    return null;
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    // Node.js environment
    module.exports = {
        formatDate,
        getTodayString,
        isRecent,
        setCookie,
        getCookie,
        getPopupCount,
        incrementPopupCount,
        getVideoEmbed
    };
} else {
    // Browser environment - attach to window object
    window.Utils = {
        formatDate,
        getTodayString,
        isRecent,
        setCookie,
        getCookie,
        getPopupCount,
        incrementPopupCount,
        getVideoEmbed
    };
}
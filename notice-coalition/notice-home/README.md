# Notice Coalition Home Page - Complete Documentation

## Table of Contents
1. [Overview](#overview)
2. [File Structure](#file-structure)
3. [Quick Start Guide](#quick-start-guide)
4. [Modular JavaScript Architecture](#modular-javascript-architecture)
5. [CSS Architecture](#css-architecture)
6. [Page Features](#page-features)
7. [Common Modifications](#common-modifications)
8. [Data Management](#data-management)
9. [Troubleshooting](#troubleshooting)

---

## Overview

The Notice Coalition Home Page is the main landing page for the NOTICE Coalition website, featuring:
- **Video background** - Full-screen background video (Vimeo, YouTube, or self-hosted)
- **Dynamic resources** - Auto-updating resources with caching
- **Initiative cards** - Showcasing current programs
- **Network members grid** - Partner organizations
- **Modal systems** - Connect form and newsletter signup
- **Video player** - Embedded video viewing with Plyr

**Design Philosophy**: Modular, maintainable, data-driven, and fully responsive.

---

## File Structure

```
notice-home/
├── notice.html              # Main HTML structure
├── css/
│   └── style.css           # All styles and responsive design
├── js/
│   ├── main.js             # Event listeners and initialization
│   ├── data-fetcher.js     # API calls and data caching
│   ├── ui-handler.js       # DOM manipulation and rendering
│   └── utils.js            # Helper functions (dates, cookies, video)
└── README.md               # This file
```

### Architecture Benefits

**Modular JavaScript**: Each file has a specific purpose, making code easier to:
- Understand and modify
- Test and debug
- Maintain and extend

---

## Quick Start Guide

### For Non-Programmers

**Q: How do I update the hero text?**
1. Open `notice.html`
2. Find lines 77-79 (starts with "Defending Youth Justice")
3. Edit the text between the `<h1>` tags
4. Save and refresh

**Q: How do I change the background video?**
1. Find the video section (lines 38-73 in HTML)
2. See [Changing Background Video](#changing-background-video) below

**Q: How do I add a new network member?**
1. Copy an existing member block (lines 163-165)
2. Paste it at the end of the members grid
3. Update the URL and name
4. Save

**Q: Where do resources come from?**
Resources load automatically from a JSON file. See [Managing Resources](#managing-resources).

---

## Modular JavaScript Architecture

The JavaScript is split into 4 focused modules:

### 1. utils.js - Helper Functions

**Purpose**: Reusable utility functions used across the site.

**Functions**:
```javascript
// Date Formatting
formatDate(dateString)        // "December 25, 2023"
getTodayString()              // "2023-12-25"
isRecent(dateString)          // true if less than 30 days old

// Cookie Management
setCookie(name, value, days)  // Store data in browser
getCookie(name)               // Retrieve stored data

// Popup Control
getPopupCount()               // How many times shown today
incrementPopupCount()         // Increase counter

// Video Processing
getVideoEmbed(url)            // Convert URL to embed format
```

**Example usage**:
```javascript
// Check if a resource is new
if (Utils.isRecent('2024-01-15')) {
    // Show "NEW" badge
}

// Format a date for display
const displayDate = Utils.formatDate('2024-01-15');
// Returns: "January 15, 2024"

// Get video embed
const video = Utils.getVideoEmbed('https://youtube.com/watch?v=abc123');
// Returns: { type: 'youtube', id: 'abc123', embed: 'https://...' }
```

### 2. data-fetcher.js - API and Data Management

**Purpose**: Handles all data loading and caching.

**Functions**:
```javascript
fetchFeedData()              // Get latest feed items (6 max)
fetchNewsletterData()        // Get newsletter posts (3 max)
fetchResourcesFromAPI()      // Fetch fresh resources
getResources()               // Get resources (cached or fresh)
clearResourcesCache()        // Force refresh resources
```

**How caching works**:
```javascript
// Resources are cached for 1 hour
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

// First load: Fetches from API
getResources(); // Takes ~1 second

// Second load (within 1 hour): Uses cache
getResources(); // Instant!

// After 1 hour: Auto-fetches fresh data
getResources(); // Takes ~1 second again
```

**API Endpoints**:
```javascript
const API_ENDPOINTS = {
    FEEDS: 'https://tcia-website.s3.us-west-2.amazonaws.com/processed_feeds.json',
    RESOURCES: 'https://tcia-admin.github.io/tcia-server-files/notice-resources-list.json'
};
```

### 3. ui-handler.js - Display and Rendering

**Purpose**: Manages all DOM manipulation and visual updates.

**Functions**:
```javascript
displayResources(data)           // Render resource cards
displayFeedItems(items)          // Render feed items
displayNewsletterItems(items)    // Render newsletter posts
showPopup(popup, shown)          // Show Substack popup
updateResourcesNavLink(hasNew)   // Add "NEW" indicator to nav
createDebugPanel()               // Dev tools panel
```

**How it works**:
```javascript
// Example: Displaying resources
async function displayResources(data) {
    // 1. Check for new resources
    const hasNew = data.some(item => Utils.isRecent(item.date));
    
    // 2. Update navigation (add indicator if new)
    updateResourcesNavLink(hasNew);
    
    // 3. Limit to 6 items for homepage
    const items = data.slice(0, 6);
    
    // 4. Create HTML for each item
    items.forEach(item => {
        // Build resource card
        // Add "NEW" badge if recent
        // Add video player or download link
    });
}
```

### 4. main.js - Initialization and Events

**Purpose**: Coordinates all features and event listeners.

**Functions**:
```javascript
initialize()                 // Main startup function
initializeVideoModal()       // Video player modal
initializeNavigation()       // Smooth scrolling
initializeConnectModal()     // Connect form popup
initializeSubstackPopup()    // Newsletter popup
loadResourcesData()          // Load and display resources
```

**Initialization flow**:
```javascript
// When page loads:
document.addEventListener('DOMContentLoaded', initialize);

function initialize() {
    // 1. Set up video modal
    initializeVideoModal();
    
    // 2. Enable smooth scrolling
    initializeNavigation();
    
    // 3. Connect modal (form)
    initializeConnectModal();
    
    // 4. Newsletter popup
    initializeSubstackPopup();
    
    // 5. Load data
    loadResourcesData();
    loadFeedData();
    loadNewsletterData();
}
```

---

## CSS Architecture

### Design System Variables

Same comprehensive design system as other NOTICE pages:

```css
:root {
    /* SPACING */
    --spacing-xs: 0.25rem;    /* 4px */
    --spacing-sm: 0.5rem;     /* 8px */
    --spacing-md: 1rem;       /* 16px */
    --spacing-lg: 1.5rem;     /* 24px */
    --spacing-xl: 2rem;       /* 32px */
    --spacing-2xl: 3rem;      /* 48px */
    --spacing-3xl: 4rem;      /* 64px */

    /* TYPOGRAPHY */
    --font-size-base: 1.25rem; /* Body text */
    --font-size-2xl: 1.5rem;   /* Subheadings */
    --font-size-3xl: 2rem;     /* Section titles */
    --font-size-8xl: 4.5rem;   /* Hero text */

    /* COLORS */
    --notice-yellow: #fbc516;
    --notice-black: #1a1919;
    --notice-grey: #808285;
    --notice-white: #ffffff;
    --notice-accent: var(--notice-yellow);
}
```

**Customization example**:
```css
/* Make hero text bigger */
--font-size-8xl: 5.5rem;

/* Change accent color to orange */
--notice-yellow: #ff6b35;
```

### Responsive Design

Automatically adapts to all screen sizes:
- **Desktop** (default): Full multi-column layout
- **Tablet** (< 1024px): Adjusted spacing
- **Mobile** (< 768px): Single column, simplified navigation

---

## Page Features

### 1. Video Background

**What it does**: Displays a full-screen video behind the hero section.

**Location**: Lines 38-73 in HTML

**Three options**:

#### Option A: Vimeo (Current)
```html
<iframe 
    src="https://player.vimeo.com/video/YOUR-VIDEO-ID?h=HASH&background=1&autoplay=1&loop=1"
    title="Background Video"
    frameborder="0"
    allow="autoplay; fullscreen"
    class="vimeo-video">
</iframe>
```

#### Option B: YouTube
```html
<iframe 
    src="https://www.youtube.com/embed/YOUR-VIDEO-ID?autoplay=1&mute=1&loop=1&controls=0&playlist=YOUR-VIDEO-ID"
    title="Background Video"
    frameborder="0"
    allow="autoplay"
    allowfullscreen>
</iframe>
```

#### Option C: Self-Hosted
```html
<video 
    autoplay 
    muted 
    loop 
    playsinline 
    class="self-hosted-video">
    <source src="YOUR-VIDEO-URL.mp4" type="video/mp4">
</video>
```

**How to switch**:
1. Uncomment the option you want
2. Comment out the others
3. Replace `YOUR-VIDEO-ID` or `YOUR-VIDEO-URL`

**Finding video IDs**:
- **Vimeo**: `https://vimeo.com/1055447807` → ID is `1055447807`
- **YouTube**: `https://youtube.com/watch?v=abc123` → ID is `abc123`

### 2. Navigation System

**What it does**: Fixed top navigation with smooth scrolling.

**Location**: Lines 15-32 in HTML, Lines 128-160 in main.js

**Features**:
- **Fixed position** - Stays at top when scrolling
- **Smooth scrolling** - Animated scroll to sections
- **External links** - Open in new tab
- **Internal links** - Smooth scroll on same page

**How it works**:
```javascript
// Detects if link is internal (#section) or external (https://)
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href.startsWith('#')) {
            // Internal: smooth scroll
            e.preventDefault();
            const section = document.getElementById(href.substring(1));
            // Calculate position and scroll
        } else {
            // External: default behavior (new tab)
        }
    });
});
```

**Adding a new nav link**:
```html
<a href="#new-section">New Section</a>
```

### 3. Resources Section

**What it does**: Dynamically loads and displays resources with caching and "NEW" badges.

**Location**: Lines 133-152 in HTML

**How it works**:

1. **Data Loading**:
```javascript
// Loads from: notice-resources-list.json
{
    "title": "Resource Title",
    "type": "PDF",  // or VIDEO, GUIDE, etc.
    "image": "thumbnail-url.jpg",
    "downloadUrl": "file-url.pdf",
    "videoUrl": "video-url" (if type is VIDEO),
    "date": "2024-01-15",
    "tooltip": "Download PDF"
}
```

2. **Caching**:
- First load: Fetches from server (~1 second)
- Subsequent loads: Uses cache (instant)
- Cache expires after 1 hour
- Stored in browser's localStorage

3. **NEW Badge Logic**:
```javascript
// Resources less than 30 days old get "NEW" badge
function isRecent(dateString) {
    const resourceDate = new Date(dateString);
    const now = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(now.getDate() - 30);
    return resourceDate >= thirtyDaysAgo; // true = show badge
}
```

4. **Display**:
- Homepage shows first 6 resources
- Recent resources marked with yellow "NEW" badge
- Navigation link gets indicator if any resources are new
- Videos show play button, others show download icon

**Debug Mode**:
Add to URL to see debug information:
```
?debugMode=true&refreshResources=true
```

**Clear cache manually**:
```javascript
// In browser console:
DataFetcher.clearResourcesCache();
location.reload();
```

### 4. Initiatives Section

**What it does**: Displays initiative cards with images and descriptions.

**Location**: Lines 96-129 in HTML

**Structure**:
```html
<a href="/link-to-initiative" class="initiative-card">
    <div class="initiative-image">
        <img src="image-url.jpg" alt="Description">
        <div class="initiative-overlay">
            <h3 class="initiative-title">Initiative Name</h3>
            <p class="initiative-description">
                Brief description of the initiative
            </p>
        </div>
    </div>
</a>
```

**How the hover effect works**:
```css
/* Normal state: overlay hidden */
.initiative-overlay {
    opacity: 0;
}

/* On hover: overlay appears */
.initiative-card:hover .initiative-overlay {
    opacity: 1;
}
```

### 5. Network Members Grid

**What it does**: Displays partner organizations in a responsive grid.

**Location**: Lines 157-229 in HTML

**Simple structure**:
```html
<div class="member-item">
    <a href="organization-website.com" 
       target="_blank" 
       rel="noopener noreferrer" 
       class="member-name">
        ORGANIZATION NAME
    </a>
</div>
```

**Responsive behavior**:
- **Desktop**: 3 columns
- **Tablet**: 2 columns
- **Mobile**: 1 column

### 6. Connect Modal

**What it does**: Popup form for users to connect with NOTICE.

**Location**: Lines 290-305 in HTML, Lines 165-195 in main.js

**How it works**:
```javascript
// Button click opens modal
connectBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
});

// Close button hides modal
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
});

// Click outside closes modal
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Escape key closes modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        modal.style.display = 'none';
    }
});
```

**Form is embedded from YouForm**:
```html
<iframe 
    src="https://app.youform.com/forms/YOUR-FORM-ID" 
    class="registration-form">
</iframe>
```

### 7. Substack Popup

**What it does**: Newsletter signup that appears when scrolling to resources.

**Location**: Lines 309-324 in HTML, Lines 200-242 in main.js

**Smart display logic**:
```javascript
// Only shows when:
// 1. User scrolls to resources section
// 2. Hasn't been shown this session
// 3. Has been shown less than 3 times today

window.addEventListener('scroll', function() {
    const resourcesSection = document.getElementById('resources');
    const rect = resourcesSection.getBoundingClientRect();
    
    // Check if resources section is in viewport
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        if (!popupShown && getPopupCount() < 3) {
            showPopup();
            popupShown = true; // Don't show again this session
        }
    }
});
```

**Cookie tracking**:
- Resets daily
- Max 3 popups per day
- Stored in browser cookies

### 8. Video Modal

**What it does**: Full-screen video player using Plyr library.

**Location**: Lines 144-151 in HTML, Lines 13-123 in main.js

**Features**:
- Supports YouTube and Vimeo
- Custom controls via Plyr
- Keyboard controls
- Responsive design

**How it works**:
```javascript
// 1. User clicks video resource
document.querySelector('.video-thumbnail').addEventListener('click', (e) => {
    const videoUrl = e.target.dataset.videoUrl;
    
    // 2. Extract embed URL
    const videoData = Utils.getVideoEmbed(videoUrl);
    
    // 3. Create iframe
    videoPlaceholder.innerHTML = `<iframe src="${videoData.embed}"></iframe>`;
    
    // 4. Initialize Plyr player
    player = new Plyr('#player iframe', {
        controls: ['play', 'progress', 'volume', 'fullscreen']
    });
    
    // 5. Show modal
    videoModal.style.display = 'flex';
});

// Close modal
modalClose.addEventListener('click', () => {
    videoModal.style.display = 'none';
    player.destroy(); // Clean up player
});
```

---

## Common Modifications

### Changing Background Video

**Step 1**: Find the video section in HTML (lines 38-73)

**Step 2**: Choose your video source

**For Vimeo**:
1. Upload video to Vimeo
2. Get video ID from URL: `vimeo.com/VIDEO-ID`
3. Replace in iframe:
```html
<iframe src="https://player.vimeo.com/video/YOUR-VIDEO-ID?h=HASH&background=1&autoplay=1&loop=1">
```

**For YouTube**:
1. Upload video to YouTube
2. Get video ID from URL: `youtube.com/watch?v=VIDEO-ID`
3. Uncomment YouTube iframe (lines 42-49)
4. Replace:
```html
<iframe src="https://www.youtube.com/embed/YOUR-VIDEO-ID?autoplay=1&mute=1&loop=1&playlist=YOUR-VIDEO-ID">
```
Note: `playlist` parameter must match video ID for looping to work

**For self-hosted**:
1. Upload video file (MP4 recommended)
2. Get direct URL to video
3. Uncomment video tag (lines 62-71)
4. Replace:
```html
<video autoplay muted loop playsinline>
    <source src="YOUR-VIDEO-URL.mp4" type="video/mp4">
</video>
```

### Updating Hero Text

**Location**: Lines 77-84 in HTML

```html
<h1 class="intro-catchphrase">
    Your New Headline Here<br>
    Second Line If Needed
</h1>
<p class="intro-cta-text">
    Your supporting text or call to action here!
</p>
```

**Styling tips**:
```css
/* Make text larger */
.intro-catchphrase {
    font-size: var(--font-size-12xl); /* Even bigger */
}

/* Remove line break on mobile */
@media (max-width: 768px) {
    .intro-catchphrase br {
        display: none;
    }
}
```

### Adding an Initiative Card

**Step 1**: Copy existing card (lines 104-114)

**Step 2**: Paste after last card, before `</div>`

**Step 3**: Update content:
```html
<a href="/your-initiative-link" class="initiative-card">
    <div class="initiative-image">
        <img src="your-image-url.jpg" alt="Your Initiative">
        <div class="initiative-overlay">
            <h3 class="initiative-title">Your Initiative Name</h3>
            <p class="initiative-description">
                Brief description of what this initiative does.
            </p>
        </div>
    </div>
</a>
```

**Image requirements**:
- Recommended size: 800x600px or larger
- Format: JPG or PNG
- Aspect ratio: 4:3 or 16:9 works best

### Adding Network Members

**Copy this template**:
```html
<div class="member-item">
    <a href="https://organization-website.com" 
       target="_blank" 
       rel="noopener noreferrer" 
       class="member-name">
        ORGANIZATION NAME
    </a>
</div>
```

**Paste before** line 223 (before `</div>` closing members-grid)

**Notes**:
- Names display in uppercase automatically (CSS)
- Links open in new tabs
- Grid adjusts automatically for any number of members

### Changing Social Media Links

**Location**: Lines 258-277 in HTML

**Structure**:
```html
<a href="YOUR-SOCIAL-URL" target="_blank" class="social-icon">
    <i class="fa-brands fa-ICON-NAME"></i>
    <!-- OR for custom image: -->
    <img src="icon-url.png" alt="Platform Name">
</a>
```

**Available FontAwesome icons**:
- LinkedIn: `fa-linkedin`
- Twitter/X: `fa-x-twitter` or `fa-square-x-twitter`
- Bluesky: `fa-bluesky`
- Email: `fa-envelope` (use `fa-solid` not `fa-brands`)
- Facebook: `fa-facebook`
- Instagram: `fa-instagram`
- YouTube: `fa-youtube`

**Adding a new social platform**:
```html
<a href="https://instagram.com/yourhandle" target="_blank" class="social-icon">
    <i class="fa-brands fa-instagram"></i>
</a>
```

### Customizing the Connect Form

The form is embedded from YouForm. To change it:

**Option A**: Update form ID in iframe
```html
<iframe src="https://app.youform.com/forms/NEW-FORM-ID">
```

**Option B**: Replace with different form service
```html
<!-- Example: Google Forms -->
<iframe src="https://docs.google.com/forms/d/e/YOUR-FORM-ID/viewform?embedded=true">
```

**Option C**: Use custom HTML form
1. Remove the iframe
2. Add your own form HTML
3. Connect to your backend/service

### Disabling the Substack Popup

If you don't want the newsletter popup:

**Option 1**: Comment it out in HTML
```html
<!-- 
<div id="substackPopup" class="substack-popup">
    ...
</div>
-->
```

**Option 2**: Disable in JavaScript (main.js line 293)
```javascript
// Comment out this line:
// initializeSubstackPopup();
```

**Option 3**: Change display limit
```javascript
// In utils.js, change max displays:
function getPopupCount() {
    // ...
    if (storedDate !== today) {
        setCookie("popupCount", "0", 1);
        return 0; // Change max to 0 = never show
    }
}
```

---

## Data Management

### Managing Resources

Resources load from a JSON file:
```
https://tcia-admin.github.io/tcia-server-files/notice-resources-list.json
```

**JSON structure**:
```json
[
    {
        "title": "Resource Title",
        "type": "PDF",
        "image": "https://url-to-thumbnail.jpg",
        "downloadUrl": "https://url-to-file.pdf",
        "videoUrl": "https://youtube.com/watch?v=..." (for videos),
        "date": "2024-01-15",
        "tooltip": "Download PDF"
    }
]
```

**Resource types**:
- `PDF` - Shows download icon
- `VIDEO` - Shows play icon, opens video modal
- `GUIDE` - Shows download icon
- `TOOLKIT` - Shows download icon
- `REPORT` - Shows download icon

**Adding a new resource**:
1. Edit the JSON file
2. Add new object to array
3. Save and commit changes
4. Cache will auto-update after 1 hour (or use refresh mode)

**Supported video platforms**:
- YouTube: `https://youtube.com/watch?v=VIDEO-ID`
- Vimeo: `https://vimeo.com/VIDEO-ID`

**NEW badge logic**:
- Automatically added if `date` is less than 30 days old
- Updates automatically as dates age
- No manual configuration needed

### Cache Management

**How caching works**:
```javascript
// Resources cached for 1 hour
localStorage.setItem('noticeResourcesCache', JSON.stringify({
    timestamp: Date.now(),
    resources: data
}));

// Next load checks cache age
const cacheAge = Date.now() - cache.timestamp;
if (cacheAge < 3600000) { // 1 hour
    useCache();
} else {
    fetchFresh();
}
```

**Force refresh**:
```javascript
// Method 1: URL parameter
?refreshResources=true

// Method 2: Browser console
DataFetcher.clearResourcesCache();
location.reload();

// Method 3: Clear all site data
// Chrome: DevTools → Application → Clear storage
```

**Change cache duration**:
```javascript
// In data-fetcher.js, line 15:
const CACHE_CONFIG = {
    CACHE_DURATION: 30 * 60 * 1000 // 30 minutes instead of 1 hour
};
```

### Feed Data (Currently Unused)

The page has infrastructure for displaying feed items but it's not currently active.

**To enable**:
1. Uncomment newsletter section (lines 232-244 in HTML)
2. The feed will automatically populate

**Feed source**:
```
https://tcia-website.s3.us-west-2.amazonaws.com/processed_feeds.json
```

**Contains**:
- Substack newsletter posts
- Other RSS feeds
- Automatically processed and formatted

---

## Troubleshooting

### Problem: Video background not playing

**Solutions**:
1. **Check video ID is correct**
   - Vimeo: Should be just numbers
   - YouTube: Should be 11 characters

2. **Verify autoplay settings**
   ```html
   <!-- Must include these attributes -->
   autoplay=1
   muted=1  (required for autoplay)
   ```

3. **Browser autoplay policy**
   - Most browsers require muted for autoplay
   - Some browsers block autoplay entirely

4. **Mobile considerations**
   - iOS may not autoplay videos
   - Consider showing static image on mobile

### Problem: Resources not loading

**Solutions**:
1. **Check console for errors** (F12 → Console)

2. **Verify JSON URL is accessible**
   ```javascript
   // Test in console:
   fetch('https://tcia-admin.github.io/tcia-server-files/notice-resources-list.json')
       .then(r => r.json())
       .then(d => console.log(d));
   ```

3. **Clear cache**
   ```javascript
   DataFetcher.clearResourcesCache();
   location.reload();
   ```

4. **Check JSON format**
   - Valid JSON (no trailing commas)
   - All required fields present
   - Correct date format (YYYY-MM-DD)

### Problem: "NEW" badges not appearing

**Solutions**:
1. **Check date format**
   ```json
   // Correct:
   "date": "2024-01-15"
   
   // Wrong:
   "date": "01/15/2024"
   "date": "Jan 15, 2024"
   ```

2. **Verify date is recent**
   ```javascript
   // Test in console:
   Utils.isRecent('2024-01-15'); // Should return true if within 30 days
   ```

3. **Enable debug mode**
   ```
   ?debugMode=true
   ```
   Shows dates on resource cards

### Problem: Video modal won't open

**Solutions**:
1. **Check Plyr library loaded**
   ```javascript
   // In console:
   console.log(typeof Plyr); // Should not be "undefined"
   ```

2. **Verify video URL format**
   - Must be full URL with `https://`
   - Must be YouTube or Vimeo

3. **Check resource type**
   ```json
   {
       "type": "VIDEO",  // Must be uppercase
       "videoUrl": "full-url-here"
   }
   ```

4. **Test video extraction**
   ```javascript
   // In console:
   Utils.getVideoEmbed('https://youtube.com/watch?v=abc123');
   // Should return object with embed URL
   ```

### Problem: Smooth scrolling not working

**Solutions**:
1. **Check section IDs match links**
   ```html
   <!-- Link -->
   <a href="#resources">Resources</a>
   
   <!-- Section -->
   <section id="resources">  <!-- IDs must match -->
   ```

2. **Verify CSS**
   ```css
   html {
       scroll-behavior: smooth; /* Must be present */
   }
   ```

3. **Check JavaScript loaded**
   ```javascript
   // In console:
   console.log(typeof Main); // Should be "object"
   ```

### Problem: Connect modal not appearing

**Solutions**:
1. **Check button ID**
   ```html
   <button id="connectBtn">  <!-- Must have ID -->
   ```

2. **Verify modal exists**
   ```html
   <div id="connectModal">  <!-- Must be present -->
   ```

3. **Check JavaScript**
   ```javascript
   // In console:
   document.getElementById('connectBtn'); // Should return element
   ```

4. **Test manually**
   ```javascript
   // In console:
   document.getElementById('connectModal').style.display = 'flex';
   ```

### Problem: Substack popup appears too often

**Solutions**:
1. **Check cookie storage**
   ```javascript
   // In console:
   Utils.getPopupCount(); // Shows count for today
   ```

2. **Clear cookies**
   ```javascript
   document.cookie = "popupCount=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
   document.cookie = "popupDate=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
   ```

3. **Change max displays**
   ```javascript
   // In ui-handler.js, line 32:
   if (count < 1) { // Changed from 3 to 1
   ```

4. **Disable completely** (see [Disabling the Substack Popup](#disabling-the-substack-popup))

### Problem: Page is slow

**Solutions**:
1. **Optimize images**
   - Compress before uploading
   - Use appropriate formats (JPG for photos)
   - Recommended max size: 500KB per image

2. **Check cache is working**
   ```javascript
   // In console after page load:
   console.log('Using cached resources data'); // Should see this on 2nd load
   ```

3. **Reduce video quality**
   - Use lower resolution for background video
   - Consider using a poster image for mobile

4. **Check network tab** (F12 → Network)
   - See what's loading slowly
   - Large files will show long load times

---

## Browser Console Commands

Useful commands for testing and debugging:

```javascript
// ===== RESOURCES =====

// Clear resource cache
DataFetcher.clearResourcesCache();

// Force refresh resources
DataFetcher.getResources(true);

// Check if date is recent
Utils.isRecent('2024-01-15');

// ===== POPUP =====

// Check popup count
Utils.getPopupCount();

// Reset popup count
document.cookie = "popupCount=0; path=/";

// Show popup manually
document.getElementById('substackPopup').style.display = 'flex';

// ===== MODALS =====

// Show connect modal
document.getElementById('connectModal').style.display = 'flex';

// Show video modal
document.getElementById('videoModal').style.display = 'flex';

// ===== VIDEO =====

// Test video embed extraction
Utils.getVideoEmbed('https://youtube.com/watch?v=abc123');

// ===== NAVIGATION =====

// Scroll to section
document.getElementById('resources').scrollIntoView({ behavior: 'smooth' });

// ===== DEBUG =====

// Check if modules loaded
console.log(typeof Utils);        // Should be "object"
console.log(typeof DataFetcher);  // Should be "object"
console.log(typeof UIHandler);    // Should be "object"
console.log(typeof Main);         // Should be "object"

// Enable debug mode (reload page with this URL):
window.location.href = window.location.pathname + '?debugMode=true';
```

---

## Performance Tips

### Image Optimization

1. **Compress images**
   - Use TinyPNG or similar
   - Aim for under 200KB per image
   - Exception: Hero images can be 500KB

2. **Proper formats**
   - **JPG**: Photos and complex images
   - **PNG**: Logos and graphics with transparency
   - **WebP**: Modern format (best compression)

3. **Responsive images**
   ```html
   <img 
       src="image-large.jpg"
       srcset="image-small.jpg 480w, image-medium.jpg 768w, image-large.jpg 1200w"
       sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, 1200px"
       alt="Description">
   ```

### Video Optimization

1. **Background video**
   - Keep under 5MB
   - Lower resolution (720p is usually fine)
   - Short loop (10-30 seconds)

2. **Embedded videos**
   - Use platform's embedding (YouTube/Vimeo)
   - They handle optimization automatically

### Caching Strategy

1. **Resources**: 1 hour cache (already implemented)
2. **Feed data**: No cache (always fresh)
3. **Cookies**: 1 day expiration for popup control

---

## Accessibility Features

### Already Implemented

1. **Semantic HTML**
   - Proper heading hierarchy (h1, h2, h3)
   - Semantic tags (`<nav>`, `<section>`, `<article>`)

2. **Alt text**
   - All images have descriptive alt attributes
   - Decorative images use empty alt

3. **Keyboard navigation**
   - All interactive elements keyboard accessible
   - Tab order follows logical flow
   - Escape key closes modals

4. **ARIA labels**
   - Screen reader friendly
   - Hidden elements properly marked

5. **Color contrast**
   - Yellow on black meets WCAA standards
   - Text is readable

6. **Focus indicators**
   - Visible focus states for keyboard users

### Enhancing Accessibility

**Add skip link**:
```html
<a href="#main-content" class="skip-link">Skip to main content</a>

<style>
.skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--notice-accent);
    color: var(--notice-black);
    padding: 8px;
    text-decoration: none;
    z-index: 9999;
}

.skip-link:focus {
    top: 0;
}
</style>
```

**Announce dynamic content**:
```html
<div aria-live="polite" aria-atomic="true" id="status">
    <!-- Announcements appear here -->
</div>

<script>
// When resources load:
document.getElementById('status').textContent = 'Resources loaded successfully';
</script>
```

---

## Understanding the Code

### HTML Basics

```html
<!-- Element with class -->
<div class="resource-card">Content</div>

<!-- Element with ID (unique) -->
<div id="connectModal">Modal content</div>

<!-- Link that opens in new tab -->
<a href="url" target="_blank">Link</a>

<!-- Image -->
<img src="image.jpg" alt="Description">

<!-- Button -->
<button id="btnName">Click Me</button>
```

### CSS Basics

```css
/* Class selector */
.resource-card {
    background: white;
}

/* ID selector */
#connectModal {
    display: none;
}

/* Variable usage */
.text {
    color: var(--notice-accent);
    font-size: var(--font-size-lg);
}
```

### JavaScript Basics

```javascript
// Function
function doSomething() {
    // code here
}

// Event listener
button.addEventListener('click', () => {
    // runs when button clicked
});

// If statement
if (condition) {
    // code if true
} else {
    // code if false
}
```

---

## Modular Code Benefits

### Why split JavaScript into modules?

**1. Organization**
- Each file has one clear purpose
- Easy to find what you're looking for

**2. Maintainability**
- Fix bugs in one place
- Changes don't break other parts

**3. Reusability**
- Use same utilities across features
- Share code between pages

**4. Testing**
- Test individual modules
- Easier to debug

**Example: Adding a new feature**

Without modules:
```javascript
// Everything in one 2000+ line file
// Hard to find where video code is
// Hard to test without breaking other features
```

With modules:
```javascript
// Need video functionality?
// It's all in utils.js getVideoEmbed()
// Need to display something?
// It's in ui-handler.js
// Need to fetch data?
// It's in data-fetcher.js
```

---

## Version History

- **v1.0** (Current)
  - Modular JavaScript architecture
  - Resource caching system
  - Video modal with Plyr
  - Substack popup with smart display
  - Connect modal integration
  - Dynamic resource loading
  - Network members grid

---

## Resources for Learning

- **HTML**: https://developer.mozilla.org/en-US/docs/Web/HTML
- **CSS**: https://developer.mozilla.org/en-US/docs/Web/CSS
- **JavaScript**: https://developer.mozilla.org/en-US/docs/Web/JavaScript
- **Plyr (video player)**: https://plyr.io/
- **FontAwesome (icons)**: https://fontawesome.com/

---

## Getting Help

When asking for help, please provide:
1. What you're trying to do
2. What you tried
3. What happened instead
4. Any error messages (from console)
5. Browser and device you're using

**Check console first** (F12 → Console tab)
- Errors show in red
- Often include line numbers and descriptions

---

**Questions or improvements?** Document them here so future users can benefit!


# Notice Coalition Resources Page - Complete Documentation

## Table of Contents
1. [Overview](#overview)
2. [File Structure](#file-structure)
3. [Quick Start Guide](#quick-start-guide)
4. [CSS Architecture](#css-architecture)
5. [JavaScript Features](#javascript-features)
6. [Common Modifications](#common-modifications)
7. [Resource Management](#resource-management)
8. [Troubleshooting](#troubleshooting)

---

## Overview

The Notice Coalition Resources Page is a dedicated showcase for all resources, including reports, fact sheets, timelines, and videos. It features:
- **Dynamic resource loading** - Auto-fetches from JSON file
- **Smart filtering** - Filter by resource type (Reports, Fact Sheets, Timelines, Videos)
- **Video modal** - Embedded video player
- **Responsive grid** - Adapts to all screen sizes
- **Clean design** - Focus on content accessibility

**Design Philosophy**: Simple, functional, and content-driven with easy resource management.

---

## File Structure

```
notice-resources/
├── notice-resources.html    # Main HTML structure
├── css/
│   └── main.css            # All styles and responsive design
├── js/
│   └── main.js             # Resource loading, filtering, video modal
└── README.md               # This file
```

**How it works**: HTML loads CSS and JavaScript from CDN. Resources load dynamically from a central JSON file.

---

## Quick Start Guide

### For Non-Programmers

**Q: How do I add a new resource?**
- Resources are managed in a central JSON file (not in this HTML)
- See [Adding Resources](#adding-resources) below

**Q: How do I change the page title?**
1. Open `notice-resources.html`
2. Find line 24: `<h1 class="intro-catchphrase">RESOURCES</h1>`
3. Change "RESOURCES" to your text
4. Save

**Q: How do I add/remove filter options?**
- See [Managing Filters](#managing-filters) below

**Q: Where do resources come from?**
- They load automatically from: `https://tcia-admin.github.io/tcia-server-files/notice-resources-list.json`

---

## CSS Architecture

### Design System Variables

The page uses the standard NOTICE design system:

```css
:root {
    /* SPACING */
    --spacing-xs: 0.25rem;    /* 4px - tiny gaps */
    --spacing-sm: 0.5rem;     /* 8px - small gaps */
    --spacing-md: 1rem;       /* 16px - medium gaps */
    --spacing-lg: 1.5rem;     /* 24px - large gaps */
    --spacing-xl: 2rem;       /* 32px - extra large */
    --spacing-2xl: 3rem;      /* 48px - section spacing */
    --spacing-3xl: 4rem;      /* 64px - major sections */

    /* TYPOGRAPHY */
    --font-size-xs: 0.75rem;   /* 12px */
    --font-size-sm: 0.875rem;  /* 14px */
    --font-size-base: 1.25rem; /* 20px - body text */
    --font-size-lg: 1.125rem;  /* 18px */
    --font-size-xl: 1.25rem;   /* 20px */
    --font-size-2xl: 1.5rem;   /* 24px */
    --font-size-3xl: 2rem;     /* 32px - section titles */
    --font-size-4xl: 2.5rem;   /* 40px */
    --font-size-8xl: 4.5rem;   /* 72px - hero text */

    /* COLORS */
    --notice-yellow: #fbc516;  /* Brand yellow */
    --notice-black: #1a1919;   /* Deep black */
    --notice-grey: #808285;    /* Medium grey */
    --notice-white: #ffffff;   /* White */
    
    /* FUNCTIONAL COLORS */
    --notice-bg-primary: var(--notice-black);
    --notice-bg-secondary: #242424;
    --notice-text-primary: var(--notice-white);
    --notice-text-secondary: var(--notice-grey);
    --notice-accent: var(--notice-yellow);
}
```

**Customization examples**:
```css
/* Make title bigger */
--font-size-8xl: 5.5rem;

/* Change brand color to blue */
--notice-yellow: #3498db;

/* Increase spacing between resources */
--spacing-xl: 3rem;
```

### Page Layout

The page has a clean, focused structure:

1. **Navigation** - Fixed at top
2. **Hero Section** - Title with background image
3. **Resources Section** - Filterable grid
4. **Newsletter Section** - "Stay Informed" heading
5. **Social Media** - Footer links

### Resource Grid

```css
.resources-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* 3 columns on desktop */
    gap: var(--spacing-xl);                 /* Space between cards */
}

/* Responsive behavior */
@media (max-width: 1024px) {
    .resources-grid {
        grid-template-columns: repeat(2, 1fr); /* 2 columns on tablet */
    }
}

@media (max-width: 768px) {
    .resources-grid {
        grid-template-columns: 1fr; /* 1 column on mobile */
    }
}
```

### Resource Cards

Each resource card has:
- **Image** - Thumbnail with hover effect
- **Type Tag** - Shows resource type (PDF, VIDEO, etc.)
- **Action Icon** - Download or play button
- **Description** - Resource title
- **Optional Button** - Custom call-to-action

```css
/* Card structure */
.resource-card {
    background-color: var(--notice-bg-secondary);
    border-radius: 4px;
    overflow: hidden;
}

/* Hover effect */
.resource-image:hover img {
    transform: scale(1.05); /* Slight zoom on hover */
}
```

---

## JavaScript Features

The JavaScript is simple and focused on three main tasks:

### 1. Smooth Scrolling Navigation

**What it does**: Enables smooth scrolling for anchor links.

**Location**: Lines 1-33 in `main.js`

**How it works**:
```javascript
// Listens for clicks on navigation links
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Only handle internal links (starting with #)
        if (href.startsWith('#')) {
            e.preventDefault();
            
            // Get target section
            const targetSection = document.getElementById(href.substring(1));
            
            // Calculate position (accounting for fixed nav)
            const navHeight = document.querySelector('.notice-nav').offsetHeight;
            const targetPosition = targetSection.getBoundingClientRect().top 
                                 + window.pageYOffset - navHeight;
            
            // Smooth scroll
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});
```

**No customization needed** - works automatically!

### 2. Resource Loading and Filtering

**What it does**: Fetches resources from JSON, displays them, and enables filtering.

**Location**: Lines 35-150 in `main.js`

**How it works**:

#### Step 1: Fetch Resources
```javascript
fetch('https://tcia-admin.github.io/tcia-server-files/notice-resources-list.json')
    .then(response => response.json())
    .then(data => {
        const resourceItems = data; // Store all resources
        // ... continue processing
    });
```

#### Step 2: Update Filter Buttons
```javascript
// Check which resource types exist
const availableTypes = {};
resourceItems.forEach(item => {
    if (item.type) {
        availableTypes[item.type] = true;
    }
});

// Disable filters with no matching resources
filterBtns.forEach(btn => {
    const filterType = btn.dataset.filter;
    if (filterType !== 'ALL' && !availableTypes[filterType]) {
        btn.classList.add('disabled');
        btn.style.opacity = '0.5';
        btn.style.cursor = 'not-allowed';
    }
});
```

#### Step 3: Display Resources
```javascript
function populateResourcesGrid(items, filter) {
    // Clear existing content
    resourcesGrid.innerHTML = '';
    
    // Filter items by type (if not "ALL")
    let filteredItems = items;
    if (filter !== 'ALL') {
        filteredItems = items.filter(item => item.type === filter);
    }
    
    // Create card for each resource
    filteredItems.forEach(item => {
        const resourceCard = document.createElement('div');
        resourceCard.className = 'resource-card';
        
        // Different display for videos vs other resources
        const isVideo = item.type === 'VIDEO';
        
        // Build card HTML
        resourceCard.innerHTML = `
            <div class="resource-image">
                ${isVideo ? 
                    // Video: Play button overlay
                    `<a href="#" class="video-thumbnail">
                        <img src="${item.image}">
                        <div class="play-overlay">
                            <i class="fa-solid fa-circle-play"></i>
                        </div>
                    </a>` : 
                    // Other: Direct link
                    `<a href="${item.downloadUrl}" target="_blank">
                        <img src="${item.image}">
                    </a>`
                }
            </div>
            <div class="resource-content">
                <div class="resource-meta">
                    <span class="resource-tag">${item.type}</span>
                    <a href="${item.downloadUrl}" class="resource-action">
                        <i class="fa-solid ${isVideo ? 'fa-circle-play' : 'fa-cloud-arrow-down'}"></i>
                    </a>
                </div>
                <p class="resource-description">${item.title}</p>
            </div>
        `;
        
        resourcesGrid.appendChild(resourceCard);
    });
}
```

#### Step 4: Handle Filter Clicks
```javascript
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Skip if disabled
        if (btn.classList.contains('disabled')) return;
        
        // Update active state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Get selected filter
        currentFilter = btn.dataset.filter;
        
        // Re-render grid
        populateResourcesGrid(resourceItems, currentFilter);
    });
});
```

### 3. Video Modal

**What it does**: Opens videos in a full-screen modal player.

**Location**: Lines 151-197 in `main.js`

**How it works**:
```javascript
// Create modal on page load
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

// Handle video thumbnail clicks
document.addEventListener('click', function(e) {
    const videoThumbnail = e.target.closest('.video-thumbnail');
    if (videoThumbnail) {
        e.preventDefault();
        const videoUrl = videoThumbnail.dataset.videoUrl;
        
        // Load video in iframe
        videoIframe.src = videoUrl;
        
        // Show modal
        videoModal.style.display = 'block';
    }
});

// Close modal
closeVideoModal.addEventListener('click', function() {
    videoModal.style.display = 'none';
    videoIframe.src = ''; // Stop video
});

// Close on background click
window.addEventListener('click', function(e) {
    if (e.target === videoModal) {
        videoModal.style.display = 'none';
        videoIframe.src = '';
    }
});

// Close on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && videoModal.style.display === 'block') {
        videoModal.style.display = 'none';
        videoIframe.src = '';
    }
});
```

**Features**:
- Click video thumbnail to open
- Click X button to close
- Click outside modal to close
- Press Escape key to close
- Video stops when closed

---

## Common Modifications

### Changing the Hero Image

**Location**: Line 207 in `main.css`

```css
.notice-intro {
    background-image: url('YOUR-NEW-IMAGE-URL-HERE');
}
```

**Image requirements**:
- High resolution (1920x1080 or larger)
- JPG format recommended
- Under 500KB for fast loading

### Changing the Page Title

**In HTML** (line 24):
```html
<h1 class="intro-catchphrase">
    YOUR NEW TITLE HERE
</h1>
```

**Styling options**:
```css
.intro-catchphrase {
    font-size: var(--font-size-12xl); /* Make it bigger */
    color: var(--notice-accent);      /* Change to yellow */
    text-transform: lowercase;        /* Remove uppercase */
}
```

### Managing Filters

**Current filters** (lines 44-48 in HTML):
```html
<button class="filter-btn active" data-filter="ALL">ALL</button>
<button class="filter-btn" data-filter="REPORT">REPORTS</button>
<button class="filter-btn" data-filter="FACT SHEET">FACT SHEETS</button>
<button class="filter-btn" data-filter="TIMELINE">TIMELINES</button>
<button class="filter-btn" data-filter="VIDEO">VIDEOS</button>
```

**Adding a new filter**:
```html
<button class="filter-btn" data-filter="GUIDE">GUIDES</button>
```

**Important**: The `data-filter` value must match the `type` field in your resource JSON exactly.

**Removing a filter**: Simply delete the button HTML.

### Changing Grid Layout

**Desktop - 3 columns** (default):
```css
.resources-grid {
    grid-template-columns: repeat(3, 1fr);
}
```

**Desktop - 4 columns**:
```css
.resources-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: var(--spacing-lg); /* Reduce gap for more columns */
}
```

**Desktop - 2 columns**:
```css
.resources-grid {
    grid-template-columns: repeat(2, 1fr);
}
```

### Customizing Resource Cards

**Card styling** (lines 419-423 in CSS):
```css
.resource-card {
    background-color: var(--notice-bg-secondary);
    border-radius: 4px;           /* Change to 12px for more rounded */
    overflow: hidden;
    border: 2px solid var(--notice-accent); /* Add border */
}
```

**Hover effect**:
```css
.resource-card:hover {
    transform: translateY(-8px);  /* Lift card on hover */
    box-shadow: 0 8px 24px rgba(251, 197, 22, 0.4); /* Add glow */
}
```

### Changing Social Media Links

**Location**: Lines 65-84 in HTML

**Structure**:
```html
<a href="YOUR-SOCIAL-URL" target="_blank" class="social-icon">
    <!-- Option 1: FontAwesome icon -->
    <i class="fa-brands fa-ICON-NAME"></i>
    
    <!-- Option 2: Custom image -->
    <img src="icon-url.png" alt="Platform">
</a>
```

**Available FontAwesome icons**:
- LinkedIn: `fa-linkedin`
- Bluesky: `fa-bluesky`
- Email: `fa-envelope` (use `fa-solid` not `fa-brands`)
- Twitter/X: `fa-x-twitter`
- Facebook: `fa-facebook`
- Instagram: `fa-instagram`

---

## Resource Management

### JSON Data Structure

Resources are stored in a centralized JSON file:
```
https://tcia-admin.github.io/tcia-server-files/notice-resources-list.json
```

**JSON structure**:
```json
[
    {
        "title": "Resource Title/Description",
        "type": "REPORT",
        "image": "https://url-to-thumbnail.jpg",
        "downloadUrl": "https://url-to-file.pdf",
        "videoUrl": "https://youtube.com/embed/VIDEO-ID",
        "tooltip": "Download Report",
        "buttonLink": "https://optional-custom-link.com",
        "buttonName": "Optional Button Text"
    }
]
```

### Required Fields

**All resources need**:
- `title` - Resource name/description (string)
- `type` - Resource category (string, uppercase)
- `image` - Thumbnail URL (string)
- `downloadUrl` - Main resource URL (string)

**Optional fields**:
- `videoUrl` - Only for VIDEO type (embed URL)
- `tooltip` - Custom tooltip text (default: "Download" or "Watch")
- `buttonLink` - Custom button destination
- `buttonName` - Custom button text

### Resource Types

**Standard types**:
- `REPORT` - PDF reports and documents
- `FACT SHEET` - Single-page fact sheets
- `TIMELINE` - Visual timelines
- `VIDEO` - Video content

**Adding new types**:
1. Add resources with new type to JSON
2. Add filter button to HTML (if desired)
3. That's it! The page auto-detects available types

### Adding Resources

**Step 1**: Prepare your resource
- Upload file (PDF, etc.) to hosting
- Create thumbnail image (recommended: 800x600px)
- Get direct URLs to both

**Step 2**: Add to JSON file
```json
{
    "title": "2024 Annual Report on Youth Surveillance",
    "type": "REPORT",
    "image": "https://your-cdn.com/report-thumbnail.jpg",
    "downloadUrl": "https://your-cdn.com/2024-annual-report.pdf",
    "tooltip": "Download Full Report"
}
```

**Step 3**: Save and wait
- Changes appear automatically (no code changes needed)
- Page loads fresh data on each visit

### Adding Video Resources

**For YouTube videos**:
```json
{
    "title": "Understanding School Surveillance",
    "type": "VIDEO",
    "image": "https://img.youtube.com/vi/VIDEO-ID/maxresdefault.jpg",
    "downloadUrl": "https://youtube.com/watch?v=VIDEO-ID",
    "videoUrl": "https://youtube.com/embed/VIDEO-ID",
    "tooltip": "Watch Video"
}
```

**For Vimeo videos**:
```json
{
    "title": "Community Town Hall",
    "type": "VIDEO",
    "image": "https://i.vimeocdn.com/video/VIDEO-ID_640.jpg",
    "downloadUrl": "https://vimeo.com/VIDEO-ID",
    "videoUrl": "https://player.vimeo.com/video/VIDEO-ID",
    "tooltip": "Watch Video"
}
```

**Getting video thumbnail URLs**:
- **YouTube**: `https://img.youtube.com/vi/VIDEO-ID/maxresdefault.jpg`
- **Vimeo**: Use Vimeo API or screenshot video

### Removing Resources

Simply delete the resource object from the JSON array. The page will automatically update.

### Reordering Resources

Resources display in the order they appear in the JSON array. To reorder:
1. Cut the resource object
2. Paste it in the desired position
3. Save

**Example**:
```json
[
    { "title": "First (newest)" },
    { "title": "Second" },
    { "title": "Third (oldest)" }
]
```

---

## Troubleshooting

### Problem: Resources not loading

**Solutions**:

1. **Check console for errors** (F12 → Console)
   ```
   Error: Network response was not ok
   ```
   This means JSON file couldn't be fetched.

2. **Verify JSON URL is accessible**
   - Open this URL in browser: `https://tcia-admin.github.io/tcia-server-files/notice-resources-list.json`
   - Should show JSON data, not 404 error

3. **Check JSON format**
   - Valid JSON (no trailing commas)
   - All quotes are double quotes (`"`)
   - All brackets/braces matched `[]` `{}`
   
   **Test JSON validity**: https://jsonlint.com/

4. **Look for fallback message**
   - If you see "Unable to load resources", fetch failed
   - Check network connection
   - Verify file exists at URL

### Problem: Filter buttons disabled (greyed out)

**This is normal!** Filter buttons auto-disable if no resources match that type.

**Example**:
```javascript
// If no resources have type: "FACT SHEET"
// The "FACT SHEETS" button will be disabled
```

**To fix**:
1. Add resources with that type to JSON
2. OR remove the filter button from HTML
3. Page will refresh automatically

### Problem: Video won't play

**Solutions**:

1. **Check video URL format**
   - YouTube: `https://youtube.com/embed/VIDEO-ID`
   - Vimeo: `https://player.vimeo.com/video/VIDEO-ID`
   - NOT watch URLs: `https://youtube.com/watch?v=...`

2. **Verify resource type**
   ```json
   {
       "type": "VIDEO",  // Must be uppercase
       "videoUrl": "embed-url-here"
   }
   ```

3. **Test video URL**
   - Copy `videoUrl` from JSON
   - Paste in browser
   - Should show video player

4. **Check for embedding restrictions**
   - Some videos don't allow embedding
   - Video will show "Video unavailable"
   - Use different video or enable embedding

### Problem: Images not showing

**Solutions**:

1. **Check image URL**
   - Must be full URL with `https://`
   - Must be publicly accessible
   - Test by opening in browser

2. **Check image format**
   - Supported: JPG, PNG, GIF, WebP
   - Not supported: HEIC, TIFF

3. **Verify image size**
   - Very large images (>5MB) may load slowly
   - Compress images before uploading

4. **Check for broken links**
   ```javascript
   // In console:
   document.querySelectorAll('.resource-image img').forEach(img => {
       img.addEventListener('error', () => {
           console.log('Failed to load:', img.src);
       });
   });
   ```

### Problem: Filters not working

**Solutions**:

1. **Check filter type matches JSON**
   ```html
   <!-- In HTML -->
   <button data-filter="REPORT">REPORTS</button>
   
   <!-- In JSON, type must match exactly -->
   { "type": "REPORT" }  // ✓ Correct
   { "type": "Report" }  // ✗ Wrong (case sensitive)
   { "type": "report" }  // ✗ Wrong (case sensitive)
   ```

2. **Check JavaScript is loaded**
   ```javascript
   // In console:
   console.log(typeof populateResourcesGrid); // Should not be "undefined"
   ```

3. **Verify button has data-filter**
   ```html
   <!-- Correct -->
   <button class="filter-btn" data-filter="REPORT">

   <!-- Wrong (missing data-filter) -->
   <button class="filter-btn">
   ```

### Problem: Layout broken on mobile

**Solutions**:

1. **Check viewport meta tag exists**
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   ```
   Should be in page `<head>`

2. **Clear browser cache**
   - Hard refresh: Ctrl+Shift+R (PC) or Cmd+Shift+R (Mac)

3. **Test responsive design**
   - F12 → Toggle device toolbar
   - Test different screen sizes

4. **Check for horizontal scroll**
   ```css
   /* In CSS, should have: */
   html, body {
       overflow-x: hidden;
   }
   ```

### Problem: Modal won't close

**Solutions**:

1. **Try all close methods**:
   - Click X button
   - Click outside modal (on dark overlay)
   - Press Escape key

2. **Check JavaScript errors**
   - F12 → Console
   - Look for errors

3. **Force close in console**:
   ```javascript
   document.querySelector('.video-modal').style.display = 'none';
   ```

4. **Refresh page** - Will reset everything

---

## Browser Console Commands

Useful commands for testing and debugging:

```javascript
// ===== RESOURCES =====

// Check if resources loaded
console.log('Resources:', document.querySelectorAll('.resource-card').length);

// Show current filter
console.log('Current filter:', document.querySelector('.filter-btn.active')?.dataset.filter);

// List all resource types
document.querySelectorAll('.resource-tag').forEach(tag => {
    console.log(tag.textContent);
});

// ===== MODAL =====

// Check if modal exists
console.log('Modal exists:', document.querySelector('.video-modal') !== null);

// Force close modal
document.querySelector('.video-modal').style.display = 'none';

// Force open modal (for testing)
document.querySelector('.video-modal').style.display = 'block';

// ===== FILTERS =====

// Show disabled filters
document.querySelectorAll('.filter-btn.disabled').forEach(btn => {
    console.log('Disabled:', btn.textContent);
});

// Activate a specific filter
document.querySelector('[data-filter="VIDEO"]').click();

// ===== IMAGES =====

// Check for broken images
document.querySelectorAll('.resource-image img').forEach(img => {
    if (!img.complete || img.naturalWidth === 0) {
        console.log('Broken image:', img.src);
    }
});

// ===== DEBUGGING =====

// Reload resources from JSON
location.reload();

// Check if JavaScript loaded
console.log('JS loaded:', typeof populateResourcesGrid !== 'undefined');
```

---

## Performance Tips

### Optimize Images

1. **Compress thumbnails**
   - Recommended size: 800x600px
   - File size: Under 200KB
   - Format: JPG for photos, PNG for graphics
   - Tools: TinyPNG, Squoosh

2. **Use CDN**
   - Host images on fast CDN
   - Examples: Cloudflare, AWS S3, Squarespace

3. **Lazy loading** (already implemented)
   - Images load as they appear on screen
   - Improves initial page load time

### Optimize JSON

1. **Keep JSON file small**
   - Each resource adds ~200 bytes
   - 100 resources ≈ 20KB (very fast)

2. **Minify if very large**
   - Remove extra whitespace
   - Use JSON minifier

3. **Consider pagination** (if 200+ resources)
   - Load first 50 immediately
   - Load more on scroll or button click

### Caching

The page re-fetches resources on each page load (no caching). This ensures:
- Always shows latest resources
- No stale data
- Instant updates when JSON changes

**If you want caching**, add to JavaScript:
```javascript
// Add localStorage caching (1 hour)
const CACHE_KEY = 'noticeResources';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

// Before fetch:
const cached = localStorage.getItem(CACHE_KEY);
if (cached) {
    const data = JSON.parse(cached);
    const age = Date.now() - data.timestamp;
    if (age < CACHE_DURATION) {
        // Use cached data
        return data.resources;
    }
}

// After fetch:
localStorage.setItem(CACHE_KEY, JSON.stringify({
    timestamp: Date.now(),
    resources: data
}));
```

---

## Accessibility Features

### Already Implemented

1. **Semantic HTML**
   - Proper heading hierarchy (h1, h2)
   - Descriptive alt text on images
   - Semantic tags (`<nav>`, `<section>`)

2. **Keyboard navigation**
   - All buttons keyboard accessible
   - Tab order is logical
   - Escape closes modal

3. **Screen reader support**
   - Descriptive link text
   - ARIA labels where needed
   - Alt text on all images

4. **Color contrast**
   - Yellow on black exceeds WCAG AA
   - Text is highly readable

5. **Focus indicators**
   - Visible focus states on interactive elements

### Enhancing Accessibility

**Add skip link**:
```html
<a href="#resources" class="skip-link">Skip to resources</a>

<style>
.skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--notice-accent);
    padding: 8px;
    z-index: 9999;
}

.skip-link:focus {
    top: 0;
}
</style>
```

**Announce filter changes**:
```html
<div aria-live="polite" id="filter-status" class="sr-only"></div>

<script>
// When filter changes:
document.getElementById('filter-status').textContent = 
    `Showing ${filteredItems.length} ${currentFilter} resources`;
</script>
```

**Add aria-label to filter buttons**:
```html
<button class="filter-btn" 
        data-filter="REPORT"
        aria-label="Filter by reports">
    REPORTS
</button>
```

---

## Understanding the Code

### HTML Structure

```html
<!-- Main container -->
<section class="notice-coalition-main">

    <!-- Fixed navigation -->
    <nav class="notice-nav">
        <a href="/">Logo</a>
        <div class="nav-links">
            <a href="/page">Link</a>
        </div>
    </nav>

    <!-- Hero section with title -->
    <section class="notice-intro">
        <h1>RESOURCES</h1>
    </section>

    <!-- Resources with filters -->
    <section class="notice-news-events-list">
        <div class="filter-options">
            <button data-filter="ALL">ALL</button>
            <button data-filter="TYPE">TYPE</button>
        </div>
        <div class="resources-grid">
            <!-- Cards populate here via JavaScript -->
        </div>
    </section>

    <!-- Footer -->
    <section class="notice-social">
        <a href="social-link">Icon</a>
    </section>

</section>
```

### CSS Basics

```css
/* Class selector */
.resource-card {
    background: white;
}

/* ID selector (unique) */
#resources {
    padding: 20px;
}

/* Pseudo-class */
.filter-btn:hover {
    color: yellow;
}

/* Responsive */
@media (max-width: 768px) {
    .resources-grid {
        grid-template-columns: 1fr;
    }
}
```

### JavaScript Basics

```javascript
// Select element
const element = document.querySelector('.class-name');

// Add event listener
element.addEventListener('click', function() {
    // Runs when clicked
});

// Fetch data
fetch('url')
    .then(response => response.json())
    .then(data => {
        // Use data here
    });

// Loop through array
array.forEach(item => {
    // Do something with each item
});
```

---

## Real-World Examples

### Example 1: Adding a New Report

**1. Upload PDF to hosting**
```
https://mycdn.com/2024-surveillance-report.pdf
```

**2. Create/upload thumbnail**
```
https://mycdn.com/2024-report-thumb.jpg
```

**3. Add to JSON**
```json
{
    "title": "2024 School Surveillance Impact Report",
    "type": "REPORT",
    "image": "https://mycdn.com/2024-report-thumb.jpg",
    "downloadUrl": "https://mycdn.com/2024-surveillance-report.pdf",
    "tooltip": "Download 2024 Report"
}
```

**4. Done!** Resource appears automatically

### Example 2: Creating a Custom Filter

**1. Add resources with new type**
```json
{
    "title": "Complete Advocacy Toolkit",
    "type": "TOOLKIT",
    "image": "...",
    "downloadUrl": "..."
}
```

**2. Add filter button**
```html
<button class="filter-btn" data-filter="TOOLKIT">TOOLKITS</button>
```

**3. Works automatically!** No JavaScript changes needed

### Example 3: Featuring a Video

**1. Upload video to YouTube**

**2. Get video ID from URL**
```
https://youtube.com/watch?v=abc123xyz
                            └──────┘
                            Video ID
```

**3. Add to JSON**
```json
{
    "title": "Understanding Digital Privacy Rights",
    "type": "VIDEO",
    "image": "https://img.youtube.com/vi/abc123xyz/maxresdefault.jpg",
    "downloadUrl": "https://youtube.com/watch?v=abc123xyz",
    "videoUrl": "https://youtube.com/embed/abc123xyz"
}
```

**4. Video appears with play button!**

---

## Version History

- **v1.0** (Current)
  - Dynamic resource loading from JSON
  - Smart filtering with auto-disable
  - Video modal player
  - Responsive grid layout
  - Code cleanup (removed 185 lines of unused code)

---

## Resources for Learning

- **HTML**: https://developer.mozilla.org/en-US/docs/Web/HTML
- **CSS Grid**: https://css-tricks.com/snippets/css/complete-guide-grid/
- **JavaScript Fetch**: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- **JSON Format**: https://www.json.org/json-en.html
- **FontAwesome Icons**: https://fontawesome.com/icons

---

## Getting Help

When asking for help, provide:
1. **What you're trying to do**
2. **What you tried**
3. **What happened** (include error messages)
4. **Console output** (F12 → Console)
5. **Browser and device**

**Check console first!** (F12 → Console tab)
- Red text = errors
- Often includes helpful descriptions

---

## Quick Reference

### Filter Button Format
```html
<button class="filter-btn" data-filter="TYPE">DISPLAY NAME</button>
```

### Resource JSON Format
```json
{
    "title": "Resource name",
    "type": "CATEGORY",
    "image": "https://image-url.jpg",
    "downloadUrl": "https://file-url.pdf"
}
```

### Video Resource Format
```json
{
    "title": "Video name",
    "type": "VIDEO",
    "image": "https://thumbnail-url.jpg",
    "downloadUrl": "https://youtube.com/watch?v=ID",
    "videoUrl": "https://youtube.com/embed/ID"
}
```

### Common CSS Variables
```css
--notice-accent: #fbc516;          /* Brand color */
--spacing-xl: 2rem;                 /* Card spacing */
--font-size-3xl: 2rem;             /* Section titles */
```

---

**Questions or need clarification?** Document them here for future users!


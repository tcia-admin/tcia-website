# NOTICE Substack Newsletter Page - Complete Documentation

## 📋 Table of Contents
- [Overview](#overview)
- [Quick Start for Non-Programmers](#quick-start-for-non-programmers)
- [File Structure](#file-structure)
- [Page Features](#page-features)
- [CSS Architecture](#css-architecture)
- [JavaScript Features](#javascript-features)
- [Common Modifications](#common-modifications)
- [Feed Data Management](#feed-data-management)
- [Troubleshooting](#troubleshooting)
- [Developer Tools](#developer-tools)
- [Performance & Best Practices](#performance--best-practices)
- [Real-World Examples](#real-world-examples)

---

## Overview

The NOTICE Substack Newsletter page is designed to showcase the latest news updates from aggregated RSS feeds and provide newsletter signup functionality. The page dynamically fetches and displays the latest 6 articles from external sources.

### Key Features
- **Dynamic RSS Feed Display**: Automatically fetches and displays latest news
- **Newsletter Integration**: Embedded Substack signup widget
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Hero Banner**: Eye-catching banner image with page title
- **Social Media Links**: Footer with social media connections

### Technology Stack
- **HTML5**: Semantic structure
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **Vanilla JavaScript**: No framework dependencies
- **External API**: AWS S3 for processed feed data

---

## Quick Start for Non-Programmers

### ❓ Common Questions

**Q: How do I change the hero banner image?**
Look in `css/main.css` around line 190 for the `.notice-intro` section. Change the `background-image` URL.

**Q: How do I add or remove social media links?**
Look in `notice-substack-newsletter.html` around lines 59-70 in the "Social Media Section".

**Q: How many feed items are displayed?**
The page shows the latest 6 articles. To change this, look in `js/main.js` line 38.

**Q: Where does the feed data come from?**
The feed data is automatically fetched from an AWS S3 bucket that aggregates multiple RSS feeds.

**Q: How do I update the page title?**
Look in `notice-substack-newsletter.html` around line 28-30 for the `<h1>` tag.

---

## File Structure

```
notice-substack/
├── notice-substack-newsletter.html    # Main HTML structure (77 lines)
├── css/
│   └── main.css                       # All styling (540 lines)
└── js/
    └── main.js                        # Feed fetching & navigation (76 lines)
```

### File Purposes

**notice-substack-newsletter.html**
- Page structure and content
- Navigation menu
- Feed display container
- Newsletter widget integration
- Social media footer

**css/main.css**
- Design system variables (colors, spacing, fonts)
- Responsive layouts
- Feed card styling
- Hero banner styling
- Mobile adaptations

**js/main.js**
- Fetch feed data from S3
- Generate feed cards dynamically
- Date formatting
- Smooth scrolling navigation

---

## Page Features

### 1. Fixed Navigation Bar

The navigation stays at the top as you scroll, providing easy access to other sections.

**HTML Location**: Lines 7-21
```html
<nav class="notice-nav">
    <div class="section-content nav-container">
        <a href="/noticecoalition" class="nav-logo">
            <img src="[logo-url]" alt="Notice Coalition Logo">
        </a>
        <div class="nav-links">
            <a href="/noticecoalition/about">About</a>
            <!-- More links... -->
        </div>
    </div>
</nav>
```

**Key CSS Classes**:
- `.notice-nav`: Fixed positioning with z-index 1000
- `.nav-container`: Flexbox for logo and links
- `.nav-links`: Horizontal link layout with hover effects

### 2. Hero Banner Section

Full-viewport height banner with background image and title.

**HTML Location**: Lines 24-33
```html
<section class="notice-intro">
    <div class="section-content intro-content">
        <div class="intro-text-container">
            <h1 class="intro-catchphrase">
                The NOTICE Newsletter
            </h1>
        </div>
    </div>
</section>
```

**Key CSS Properties** (lines 185-228):
- `min-height: 100vh` - Full viewport height
- `background-image` - Banner image from Squarespace CDN
- `background-size: cover` - Image fills entire section
- `position: absolute` - Centers title perfectly

### 3. RSS Feed Display

Automatically fetches and displays the latest 6 articles in a responsive grid.

**HTML Location**: Lines 36-47
```html
<section class="notice-news">
    <div class="section-content">
        <div class="section-header">
            <h2 class="section-title">LATEST UPDATES</h2>
        </div>
        <div class="feed-container">
            <div id="feed-items" class="feed-items">
                <!-- JavaScript inserts feed cards here -->
            </div>
        </div>
    </div>
</section>
```

**How It Works**:
1. JavaScript fetches data from S3 on page load
2. Latest 6 items are selected
3. Cards are generated dynamically
4. Each card includes: image, source, title, description, date

**Feed Card Structure** (generated by JavaScript):
```html
<article class="feed-item">
    <a href="[article-url]" class="feed-item-link">
        <img src="[image]" alt="[title]" class="feed-item-image">
        <div class="feed-item-content">
            <div class="feed-item-source">SOURCE NAME</div>
            <h3 class="feed-item-title">Article Title</h3>
            <p class="feed-item-description">Preview text...</p>
            <div class="feed-item-date">January 15, 2025</div>
        </div>
    </a>
</article>
```

### 4. Newsletter Section

Embedded Substack newsletter signup widget.

**HTML Location**: Lines 49-54
```html
<section class="notice-newsletter">
    <div class="section-content">
        <h2 class="section-title">STAY INFORMED</h2>
    </div>
</section>
```

**Note**: The actual Substack widget is likely embedded via Squarespace's page settings, not directly in this HTML.

### 5. Social Media Footer

Links to LinkedIn, Bluesky, email, and the NOTICE logo.

**HTML Location**: Lines 57-76
```html
<section class="notice-social">
    <div class="section-content">
        <div class="notice-social-links">
            <a href="[linkedin-url]" class="social-icon">
                <img src="[linkedin-icon]" alt="LinkedIn">
            </a>
            <a href="[bluesky-url]" class="social-icon">
                <i class="fa-brands fa-bluesky"></i>
            </a>
            <a href="mailto:[email]" class="social-icon">
                <i class="fa-solid fa-envelope"></i>
            </a>
        </div>
        <a href="/noticecoalition" class="notice-footer-logo">
            <img src="[logo-url]" alt="Notice Coalition">
        </a>
    </div>
</section>
```

---

## CSS Architecture

### Design System Variables

All colors, spacing, and typography are defined in CSS variables at the top of `main.css` (lines 1-58).

**Spacing System**:
```css
--spacing-xs: 0.25rem;    /* 4px */
--spacing-sm: 0.5rem;     /* 8px */
--spacing-md: 1rem;       /* 16px */
--spacing-lg: 1.5rem;     /* 24px */
--spacing-xl: 2rem;       /* 32px */
--spacing-2xl: 3rem;      /* 48px */
--spacing-3xl: 4rem;      /* 64px */
--spacing-4xl: 5rem;      /* 80px */
```

**Color System**:
```css
/* Brand Colors */
--notice-yellow: #fbc516;
--notice-black: #1a1919;
--notice-grey: #808285;
--notice-white: #ffffff;

/* Functional Colors */
--notice-bg-primary: var(--notice-black);
--notice-bg-secondary: #242424;
--notice-text-primary: var(--notice-white);
--notice-text-secondary: var(--notice-grey);
--notice-accent: var(--notice-yellow);
```

**Typography Scale**:
```css
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1.25rem;  /* 20px */
--font-size-xl: 1.25rem;    /* 20px */
--font-size-2xl: 1.5rem;    /* 24px */
--font-size-3xl: 2rem;      /* 32px */
--font-size-4xl: 2.5rem;    /* 40px */
--font-size-8xl: 4.5rem;    /* 72px */
```

### Hero Section Styling

**Background Image** (lines 185-197):
```css
.notice-intro {
    position: relative;
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
    background-image: url('[image-url]');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}
```

**Title Styling** (lines 216-228):
```css
.intro-catchphrase {
    font-family: var(--font-accent);
    font-size: var(--font-size-8xl);  /* 72px */
    color: var(--notice-white);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    text-transform: uppercase;
    border-bottom: 4px solid var(--notice-white);
}
```

### Feed Grid System

**Grid Layout** (lines 430-435):
```css
.feed-items {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: var(--spacing-xl);  /* 32px */
    max-width: 100%;
}
```

**How it works**:
- `repeat(auto-fill, ...)`: Creates as many columns as fit
- `minmax(350px, 1fr)`: Each column minimum 350px, expands to fill space
- Result: 3 columns on desktop, 2 on tablet, 1 on mobile (automatic)

### Feed Card Styling

**Card Container** (lines 437-446):
```css
.feed-item {
    background-color: var(--notice-bg-secondary);
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);
    height: 100%;
    display: flex;
    flex-direction: column;
}
```

**Hover Effects** (lines 448-452):
```css
.feed-item:hover {
    transform: translateY(-4px);           /* Lifts up 4px */
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    border-color: var(--notice-accent);     /* Yellow border */
}
```

**Image Styling** (lines 454-462):
```css
.feed-item-image {
    width: 100%;
    height: 220px;
    object-fit: cover;  /* Crops image to fill space */
    transition: transform 0.3s ease;
}

.feed-item:hover .feed-item-image {
    transform: scale(1.05);  /* 5% zoom on hover */
}
```

**Description Truncation** (lines 490-500):
```css
.feed-item-description {
    display: -webkit-box;
    -webkit-line-clamp: 3;           /* Limit to 3 lines */
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 1.5;
}
```

### Responsive Design

**Tablet Breakpoint** (lines 342-347):
```css
@media screen and (max-width: 1024px) {
    :root {
        --container-padding: 2rem;
    }
}
```

**Mobile Breakpoint** (lines 349-418):
```css
@media screen and (max-width: 768px) {
    /* Smaller fonts */
    --font-size-4xl: 2rem;
    --font-size-3xl: 1.75rem;
    
    /* Stacked navigation */
    .nav-container {
        flex-direction: column;
    }
    
    /* Smaller hero text */
    .intro-catchphrase {
        font-size: calc(var(--font-size-4xl) * 0.8);
    }
}
```

**Feed Mobile Adjustments** (lines 518-540):
```css
@media screen and (max-width: 768px) {
    .feed-items {
        grid-template-columns: 1fr;  /* Single column */
        gap: var(--spacing-lg);
    }
    
    .feed-item-image {
        height: 200px;  /* Slightly shorter */
    }
}
```

---

## JavaScript Features

### Feature 1: Smooth Scrolling Navigation

**Purpose**: Makes navigation smooth when clicking hash links (like `#section-id`).

**Code Location**: Lines 1-32 in `main.js`

**How It Works**:
```javascript
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only intercept hash links (starting with #)
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();  // Stop normal jump
                
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // Account for fixed nav height
                    const navHeight = document.querySelector('.notice-nav').offsetHeight;
                    const targetPosition = targetSection.getBoundingClientRect().top 
                                         + window.pageYOffset 
                                         - navHeight;
                    
                    // Smooth scroll
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
```

**Step-by-Step**:
1. Wait for page to load (`DOMContentLoaded`)
2. Find all navigation links
3. For each link, add a click listener
4. Check if href starts with `#`
5. If yes, prevent normal jump
6. Calculate scroll position (accounting for fixed nav)
7. Smooth scroll to that position

### Feature 2: RSS Feed Fetching

**Purpose**: Loads latest news articles from external API.

**Code Location**: Lines 34-43 in `main.js`

**How It Works**:
```javascript
async function fetchFeedData() {
    try {
        // Fetch from S3 bucket
        const response = await fetch('https://tcia-website.s3.us-west-2.amazonaws.com/processed_feeds.json');
        
        // Convert to JSON
        const data = await response.json();
        
        // Return only latest 6 items
        return data.items.slice(0, 6);
    } catch (error) {
        console.error('Error fetching feed data:', error);
        return [];  // Return empty array on error
    }
}
```

**Key Concepts**:
- `async/await`: Waits for data without blocking page
- `fetch()`: Gets data from URL
- `.json()`: Converts response to JavaScript object
- `.slice(0, 6)`: Takes first 6 items from array
- `try/catch`: Handles errors gracefully

**Expected Data Format**:
```json
{
    "items": [
        {
            "feed_name": "Source Name",
            "title": "Article Title",
            "description": "Article preview text...",
            "link": "https://example.com/article",
            "image_url": "https://example.com/image.jpg",
            "pubDate": "2025-01-15T10:30:00Z"
        }
    ]
}
```

### Feature 3: Date Formatting

**Purpose**: Converts ISO date strings to readable format.

**Code Location**: Lines 45-52 in `main.js`

**How It Works**:
```javascript
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',   // 2025
        month: 'long',     // January
        day: 'numeric'     // 15
    });
}
```

**Example**:
- Input: `"2025-01-15T10:30:00Z"`
- Output: `"January 15, 2025"`

### Feature 4: Feed Display Generation

**Purpose**: Creates HTML for feed cards and inserts them into the page.

**Code Location**: Lines 54-76 in `main.js`

**How It Works**:
```javascript
async function displayFeedItems() {
    // Get the container element
    const feedContainer = document.getElementById('feed-items');
    
    // Fetch the data
    const items = await fetchFeedData();

    // Generate HTML for all items
    feedContainer.innerHTML = items.map(item => `
        <article class="feed-item">
            <a href="${item.link}" class="feed-item-link" target="_blank" rel="noopener noreferrer">
                <img src="${item.image_url}" alt="${item.title}" class="feed-item-image">
                <div class="feed-item-content">
                    <div class="feed-item-source">${item.feed_name}</div>
                    <h3 class="feed-item-title">${item.title}</h3>
                    <p class="feed-item-description">${item.description}</p>
                    <div class="feed-item-date">${formatDate(item.pubDate)}</div>
                </div>
            </a>
        </article>
    `).join('');
}

// Run when page loads
document.addEventListener('DOMContentLoaded', () => {
    displayFeedItems();
});
```

**Step-by-Step**:
1. Find the `#feed-items` container
2. Fetch feed data (wait for it)
3. For each item, create HTML string with template literal
4. `.map()` transforms each item into HTML
5. `.join('')` combines all HTML strings
6. Set as `innerHTML` (replaces loading message)
7. Initialize on page load

---

## Common Modifications

### Changing the Hero Banner Image

**File**: `css/main.css`  
**Location**: Line 190

**Current**:
```css
background-image: url('https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/f1115b67-2d69-4e1d-8556-057e277cc527/Notice-Newsletter-Banner.jpg?content-type=image%2Fjpeg');
```

**Steps**:
1. Upload your new image to Squarespace or image host
2. Copy the full URL
3. Replace the URL in the `background-image` property
4. Save the file

**Tips**:
- Use high-resolution images (1920x1080 or larger)
- Ensure good contrast with white text
- Test on mobile to ensure important parts are visible

### Changing the Page Title

**File**: `notice-substack-newsletter.html`  
**Location**: Lines 28-30

**Current**:
```html
<h1 class="intro-catchphrase">
    The NOTICE Newsletter
</h1>
```

**Steps**:
1. Change the text between the `<h1>` tags
2. Keep it short (1-4 words work best)
3. Test on mobile to ensure it fits

### Changing Number of Feed Items

**File**: `js/main.js`  
**Location**: Line 38

**Current**:
```javascript
return data.items.slice(0, 6); // Get only the latest 6 items
```

**To show more or fewer items**:
```javascript
return data.items.slice(0, 9);  // Show 9 items
return data.items.slice(0, 3);  // Show 3 items
return data.items.slice(0, 12); // Show 12 items
```

**Grid behavior**:
- Desktop: 3 columns (best with 3, 6, 9, or 12 items)
- Tablet: 2 columns (best with even numbers)
- Mobile: 1 column (any number works)

### Changing Grid Layout

**File**: `css/main.css`  
**Location**: Line 432

**Current (auto-responsive)**:
```css
grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
```

**Fixed 2 columns**:
```css
grid-template-columns: repeat(2, 1fr);
```

**Fixed 4 columns**:
```css
grid-template-columns: repeat(4, 1fr);
```

**Wider cards (fewer per row)**:
```css
grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
```

### Adding/Removing Social Media Links

**File**: `notice-substack-newsletter.html`  
**Location**: Lines 59-70

**Current Structure**:
```html
<div class="notice-social-links">
    <a href="[url]" target="_blank" rel="noopener noreferrer" class="social-icon">
        <img src="[icon-url]" alt="LinkedIn">
    </a>
    <!-- More links... -->
</div>
```

**To add a new link (e.g., Twitter)**:
```html
<a href="https://twitter.com/yourhandle" target="_blank" rel="noopener noreferrer" class="social-icon">
    <i class="fa-brands fa-x-twitter"></i>
</a>
```

**To remove a link**:
Simply delete the entire `<a>` tag for that social media platform.

**Using Icons**:
- This page uses Font Awesome icons
- Find icon codes at: https://fontawesome.com/icons
- Format: `<i class="fa-brands fa-[icon-name]"></i>`

### Changing Feed Card Appearance

**Card Background Color**  
**File**: `css/main.css`, Line 438
```css
background-color: var(--notice-bg-secondary);  /* Change to any color */
background-color: #2a2a2a;  /* Dark grey */
background-color: #1e3a5f;  /* Dark blue */
```

**Card Border Radius**  
**File**: `css/main.css`, Line 439
```css
border-radius: 12px;  /* Current - rounded corners */
border-radius: 0;     /* Sharp corners */
border-radius: 20px;  /* More rounded */
```

**Image Height**  
**File**: `css/main.css`, Line 456
```css
height: 220px;  /* Current */
height: 180px;  /* Shorter */
height: 280px;  /* Taller */
```

**Description Line Limit**  
**File**: `css/main.css`, Line 495
```css
-webkit-line-clamp: 3;  /* Current - 3 lines */
-webkit-line-clamp: 2;  /* 2 lines - less text */
-webkit-line-clamp: 4;  /* 4 lines - more text */
```

### Changing Colors

All colors are defined in CSS variables at the top of `main.css` (lines 34-45).

**To change the accent color** (currently yellow):
```css
--notice-accent: #fbc516;  /* Current yellow */
--notice-accent: #00ff00;  /* Bright green */
--notice-accent: #ff6b35;  /* Orange */
--notice-accent: #4ecdc4;  /* Teal */
```

**To change text colors**:
```css
--notice-text-primary: var(--notice-white);    /* Main text */
--notice-text-secondary: var(--notice-grey);   /* Muted text */
```

---

## Feed Data Management

### Understanding the Feed Source

**API Endpoint**:
```
https://tcia-website.s3.us-west-2.amazonaws.com/processed_feeds.json
```

This JSON file is hosted on AWS S3 and is updated by a separate process that aggregates multiple RSS feeds.

### Feed Data Structure

**Full Structure**:
```json
{
    "items": [
        {
            "feed_name": "TechCrunch",
            "title": "New AI Regulations Announced",
            "description": "The government announced comprehensive regulations for artificial intelligence systems used in education...",
            "link": "https://techcrunch.com/article-url",
            "image_url": "https://techcrunch.com/image.jpg",
            "pubDate": "2025-01-15T10:30:00Z",
            "guid": "unique-identifier-123"
        }
    ],
    "last_updated": "2025-01-15T12:00:00Z"
}
```

### Required vs Optional Fields

**Required** (must be present):
- `feed_name`: Source name (displayed above title)
- `title`: Article headline
- `link`: URL to full article
- `pubDate`: Publication date (ISO 8601 format)

**Optional** (can be missing):
- `description`: Preview text (defaults to empty)
- `image_url`: Article thumbnail (should have fallback)
- `guid`: Unique identifier (not displayed)

### Handling Missing Images

**Current behavior**: If `image_url` is missing or fails to load, the browser will show a broken image icon.

**To add a fallback image**, modify `main.js` line 61:
```javascript
<img src="${item.image_url || 'https://example.com/default-image.jpg'}" 
     alt="${item.title}" 
     class="feed-item-image"
     onerror="this.src='https://example.com/default-image.jpg'">
```

### Changing the Feed Source

**To use a different API**:

1. Modify `js/main.js` line 36:
```javascript
const response = await fetch('https://your-new-api.com/feed.json');
```

2. Ensure the new API returns data in the same format, or modify lines 58-70 to match the new structure.

### Testing Feed Data

**View current feed data**:
Open this URL in your browser:
```
https://tcia-website.s3.us-west-2.amazonaws.com/processed_feeds.json
```

**Browser console command**:
```javascript
fetch('https://tcia-website.s3.us-west-2.amazonaws.com/processed_feeds.json')
    .then(r => r.json())
    .then(data => console.log(data));
```

---

## Troubleshooting

### Problem: Feed Items Not Displaying

**Symptoms**:
- "LATEST UPDATES" section is empty
- No error messages visible

**Possible Causes & Solutions**:

1. **API is down or slow**
   - Open browser console (F12)
   - Look for network errors
   - Try opening the API URL directly in browser
   - Wait a few minutes and refresh

2. **JavaScript error**
   - Open browser console (F12)
   - Look for red error messages
   - Check if `displayFeedItems` is defined
   - Verify no syntax errors were introduced

3. **CORS or security issues**
   - Check console for CORS errors
   - The S3 bucket must allow cross-origin requests
   - Contact administrator to update S3 CORS policy

4. **Network connectivity**
   - Check your internet connection
   - Try accessing other websites
   - Check if S3 is accessible from your network

**Debug command**:
```javascript
// Run in browser console
fetchFeedData().then(data => {
    console.log('Feed items:', data);
    if (data.length === 0) {
        console.log('No items returned from API');
    }
});
```

### Problem: Images Not Loading

**Symptoms**:
- Broken image icons in feed cards
- Alt text visible instead of images

**Solutions**:

1. **Check image URLs**
   ```javascript
   // Run in browser console
   fetch('https://tcia-website.s3.us-west-2.amazonaws.com/processed_feeds.json')
       .then(r => r.json())
       .then(data => {
           data.items.forEach((item, i) => {
               console.log(`Item ${i}: ${item.image_url}`);
           });
       });
   ```

2. **Add fallback image** (see [Feed Data Management](#handling-missing-images))

3. **Check CORS on image hosts**
   - Some sites block hotlinking
   - Images may need to be downloaded and rehosted

### Problem: Date Formatting Issues

**Symptoms**:
- Dates show as "Invalid Date"
- Dates in wrong format or timezone

**Solutions**:

1. **Check date format in feed**
   - Must be ISO 8601 format: `2025-01-15T10:30:00Z`
   - Check in browser console what dates look like

2. **Change date format** (modify `formatDate` function):
   ```javascript
   // Short format: 1/15/2025
   return date.toLocaleDateString('en-US');
   
   // Custom format: Jan 15
   return date.toLocaleDateString('en-US', {
       month: 'short',
       day: 'numeric'
   });
   
   // With time: January 15, 2025 at 10:30 AM
   return date.toLocaleDateString('en-US', {
       year: 'numeric',
       month: 'long',
       day: 'numeric',
       hour: 'numeric',
       minute: 'numeric'
   });
   ```

### Problem: Layout Broken on Mobile

**Symptoms**:
- Cards overlap
- Text too small or too large
- Navigation doesn't stack properly

**Solutions**:

1. **Check viewport meta tag** (should be in page header):
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   ```

2. **Test in browser dev tools**
   - Open DevTools (F12)
   - Click device toolbar icon
   - Test various screen sizes

3. **Check for CSS overrides**
   - Ensure no other stylesheets are overriding main.css
   - Use browser inspector to see applied styles

4. **Verify media queries**
   - Check `main.css` lines 349-418
   - Ensure they haven't been accidentally deleted

### Problem: Smooth Scrolling Not Working

**Symptoms**:
- Clicking hash links jumps instead of scrolling smoothly
- Links don't work at all

**Solutions**:

1. **Check if JavaScript is loaded**
   ```javascript
   // Run in browser console
   console.log(typeof displayFeedItems);  // Should say "function"
   ```

2. **Verify hash links exist**
   - Smooth scrolling only works for hash links (`href="#section-id"`)
   - Regular links (to other pages) won't trigger smooth scroll

3. **Check browser compatibility**
   - Smooth scrolling works in all modern browsers
   - IE11 doesn't support it (needs polyfill)

### Problem: Hero Banner Not Showing

**Symptoms**:
- White/black area instead of banner image
- Image doesn't cover full section

**Solutions**:

1. **Check image URL**
   - Open the URL directly in browser
   - Verify it's accessible
   - Check for HTTPS mixed content warnings

2. **Check CSS**
   - Verify `background-size: cover` is set
   - Ensure no other styles are overriding
   - Check if image URL is properly quoted

3. **Image optimization**
   - Large images may take time to load
   - Compress images to under 500KB
   - Use modern formats (WebP, AVIF)

---

## Developer Tools

### Browser Console Commands

**Test feed fetching**:
```javascript
// Fetch and display feed data
fetchFeedData().then(data => {
    console.table(data);
    console.log(`Fetched ${data.length} items`);
});
```

**Manually display feeds**:
```javascript
// Regenerate feed display
displayFeedItems();
```

**Check for broken images**:
```javascript
// Find all feed images
document.querySelectorAll('.feed-item-image').forEach((img, i) => {
    if (!img.complete || img.naturalHeight === 0) {
        console.log(`Image ${i} failed to load: ${img.src}`);
    }
});
```

**Get all feed URLs**:
```javascript
// Extract all article links
Array.from(document.querySelectorAll('.feed-item-link'))
    .map(a => a.href)
    .forEach(url => console.log(url));
```

**Test date formatting**:
```javascript
// Test with different date formats
formatDate('2025-01-15T10:30:00Z');  // Should return "January 15, 2025"
formatDate('2025-12-25');             // Should return "December 25, 2025"
```

**Force refresh feed**:
```javascript
// Clear and reload feed data
document.getElementById('feed-items').innerHTML = 'Loading...';
displayFeedItems();
```

**Check CSS variables**:
```javascript
// Get computed CSS variable values
const root = document.documentElement;
const styles = getComputedStyle(root);
console.log('Accent color:', styles.getPropertyValue('--notice-accent'));
console.log('Max width:', styles.getPropertyValue('--container-max-width'));
```

### Performance Testing

**Measure page load time**:
```javascript
window.addEventListener('load', () => {
    console.log(`Page loaded in ${performance.now()}ms`);
});
```

**Measure feed load time**:
```javascript
// Add to displayFeedItems() function
async function displayFeedItems() {
    const start = performance.now();
    const feedContainer = document.getElementById('feed-items');
    const items = await fetchFeedData();
    
    feedContainer.innerHTML = items.map(item => /* ... */).join('');
    
    const end = performance.now();
    console.log(`Feed displayed in ${(end - start).toFixed(2)}ms`);
}
```

### Common Debugging Workflows

**Issue: Feed not displaying**
1. Open DevTools Console (F12)
2. Run: `fetchFeedData().then(console.log)`
3. Check if data is returned
4. If yes, run: `displayFeedItems()`
5. If no, check network errors

**Issue: Styling looks wrong**
1. Right-click element → Inspect
2. Check "Styles" panel
3. Look for crossed-out styles (overridden)
4. Check "Computed" tab for final values
5. Modify live in browser to test fixes

**Issue: JavaScript error**
1. Open Console (F12)
2. Note line number of error
3. Click error to jump to source
4. Add `console.log()` before error line to inspect values
5. Fix and refresh

---

## Performance & Best Practices

### Optimization Tips

**Image Optimization**:
1. Compress images to under 200KB each
2. Use modern formats (WebP with JPG fallback)
3. Use CDN for faster delivery
4. Consider lazy loading for below-fold images

**Feed Loading**:
1. Current: Loads on page load (good)
2. Could add: Loading spinner while fetching
3. Could add: Cache in localStorage for 5 minutes
4. Could add: Error message if fetch fails

**CSS Performance**:
1. CSS is already well-organized
2. No unused styles after cleanup
3. Variables make updates efficient
4. Grid is performant for layouts

### Accessibility

**Current accessibility features**:
- ✅ Semantic HTML (`<nav>`, `<section>`, `<article>`)
- ✅ Alt text on images
- ✅ Color contrast (white on black)
- ✅ Focus states on links (yellow highlight)
- ✅ Keyboard navigation works

**Improvements to consider**:
```html
<!-- Add ARIA labels for screen readers -->
<section class="notice-news" aria-label="Latest news updates">
    <div class="feed-items" role="list">
        <article class="feed-item" role="listitem">
            <!-- ... -->
        </article>
    </div>
</section>

<!-- Add skip navigation link -->
<a href="#main-content" class="skip-link">Skip to main content</a>
```

### Browser Support

**Fully supported**:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Features requiring polyfills for older browsers**:
- CSS Grid (IE11 needs fallback)
- `fetch()` (IE11 needs polyfill)
- CSS variables (IE11 doesn't support)

**Mobile browsers**:
- iOS Safari 12+
- Chrome Android 90+
- Samsung Internet 14+

### SEO Considerations

**Good for SEO**:
- ✅ Semantic HTML structure
- ✅ Descriptive headings (H1, H2)
- ✅ Alt text on images
- ✅ Fast load time

**Could improve**:
- Add meta descriptions
- Add Open Graph tags for social sharing
- Add structured data (JSON-LD) for articles
- Ensure feed content is indexable

---

## Real-World Examples

### Example 1: Changing Feed Item Limit to 9

**Scenario**: You want to show more articles (3 rows of 3 on desktop).

**Steps**:
1. Open `js/main.js`
2. Find line 38:
   ```javascript
   return data.items.slice(0, 6);
   ```
3. Change to:
   ```javascript
   return data.items.slice(0, 9); // Show 9 items
   ```
4. Save and refresh page

**Result**: Grid now shows 9 articles (3×3 on desktop, 2 columns on tablet, 1 on mobile).

### Example 2: Adding a Loading Spinner

**Scenario**: Show a loading message while feed loads.

**Steps**:

1. **Update HTML** (line 42):
   ```html
   <div id="feed-items" class="feed-items">
       <p class="feed-loading">Loading latest updates...</p>
   </div>
   ```

2. **Add CSS** (add to `main.css`):
   ```css
   .feed-loading {
       text-align: center;
       color: var(--notice-text-secondary);
       font-size: var(--font-size-xl);
       padding: var(--spacing-3xl);
   }
   ```

3. **JavaScript already replaces this** when `displayFeedItems()` runs!

**Result**: Shows "Loading latest updates..." until feed loads, then displays articles.

### Example 3: Changing to 2-Column Layout

**Scenario**: Make feed cards larger with only 2 columns on desktop.

**Steps**:
1. Open `css/main.css`
2. Find line 432:
   ```css
   grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
   ```
3. Change to:
   ```css
   grid-template-columns: repeat(2, 1fr);
   ```
4. Update mobile breakpoint (line 519) to keep 1 column:
   ```css
   @media screen and (max-width: 768px) {
       .feed-items {
           grid-template-columns: 1fr;
       }
   }
   ```

**Result**: Two equal-width columns on all screen sizes except mobile.

### Example 4: Adding Error Handling UI

**Scenario**: Show a message if feed fails to load.

**Steps**:

1. **Update `displayFeedItems()` in `main.js`**:
   ```javascript
   async function displayFeedItems() {
       const feedContainer = document.getElementById('feed-items');
       const items = await fetchFeedData();

       // Check if any items returned
       if (items.length === 0) {
           feedContainer.innerHTML = `
               <div class="feed-error">
                   <p>Unable to load updates. Please try again later.</p>
               </div>
           `;
           return;
       }

       // Normal rendering...
       feedContainer.innerHTML = items.map(item => /* ... */).join('');
   }
   ```

2. **Add CSS for error message**:
   ```css
   .feed-error {
       text-align: center;
       padding: var(--spacing-3xl);
       color: var(--notice-text-secondary);
   }
   
   .feed-error p {
       font-size: var(--font-size-xl);
       margin-bottom: var(--spacing-lg);
   }
   ```

**Result**: Friendly error message if feed fails instead of blank section.

### Example 5: Customizing Date Format

**Scenario**: Show shorter dates like "Jan 15" instead of "January 15, 2025".

**Steps**:
1. Open `js/main.js`
2. Find the `formatDate` function (lines 45-52)
3. Change to:
   ```javascript
   function formatDate(dateString) {
       const date = new Date(dateString);
       return date.toLocaleDateString('en-US', {
           month: 'short',  // Jan instead of January
           day: 'numeric'   // 15
           // Removed year
       });
   }
   ```

**Result**: Dates display as "Jan 15", "Feb 3", etc.

### Example 6: Adding Read More Indicator

**Scenario**: Add visual indicator that cards are clickable.

**Steps**:

1. **Update JavaScript** (line 58-70 in `main.js`):
   ```javascript
   feedContainer.innerHTML = items.map(item => `
       <article class="feed-item">
           <a href="${item.link}" class="feed-item-link" target="_blank" rel="noopener noreferrer">
               <img src="${item.image_url}" alt="${item.title}" class="feed-item-image">
               <div class="feed-item-content">
                   <div class="feed-item-source">${item.feed_name}</div>
                   <h3 class="feed-item-title">${item.title}</h3>
                   <p class="feed-item-description">${item.description}</p>
                   <div class="feed-item-footer">
                       <div class="feed-item-date">${formatDate(item.pubDate)}</div>
                       <span class="feed-item-read-more">Read More →</span>
                   </div>
               </div>
           </a>
       </article>
   `).join('');
   ```

2. **Add CSS**:
   ```css
   .feed-item-footer {
       display: flex;
       justify-content: space-between;
       align-items: center;
       border-top: 1px solid rgba(255, 255, 255, 0.1);
       padding-top: var(--spacing-md);
   }
   
   .feed-item-read-more {
       color: var(--notice-accent);
       font-size: var(--font-size-sm);
       font-weight: var(--font-bold);
   }
   
   .feed-item:hover .feed-item-read-more {
       text-decoration: underline;
   }
   ```

**Result**: Each card shows "Read More →" in yellow that underlines on hover.

---

## Quick Reference

### File Locations Cheat Sheet

| What to Change | File | Approx Line |
|----------------|------|-------------|
| Hero banner image | `css/main.css` | 190 |
| Page title | `notice-substack-newsletter.html` | 28-30 |
| Number of feed items | `js/main.js` | 38 |
| Grid columns | `css/main.css` | 432 |
| Social media links | `notice-substack-newsletter.html` | 59-70 |
| Accent color | `css/main.css` | 45 |
| Date format | `js/main.js` | 45-52 |
| Card styling | `css/main.css` | 437-515 |

### Important CSS Variables

```css
--notice-accent: #fbc516;              /* Yellow highlight color */
--notice-bg-primary: #1a1919;          /* Black background */
--notice-bg-secondary: #242424;        /* Lighter black */
--container-max-width: 1200px;         /* Max content width */
--font-size-8xl: 4.5rem;               /* Hero title size */
--spacing-xl: 2rem;                    /* Grid gap */
```

### JavaScript Functions

```javascript
fetchFeedData()         // Gets feed data from S3
formatDate(dateString)  // Converts ISO date to readable format
displayFeedItems()      // Generates and displays feed cards
```

### Support Resources

- **Font Awesome Icons**: https://fontawesome.com/icons
- **CSS Grid Guide**: https://css-tricks.com/snippets/css/complete-guide-grid/
- **Fetch API**: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- **Date Formatting**: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString

---

## Summary

This page is designed to:
1. **Display dynamic content** from external RSS feeds
2. **Provide newsletter signup** via embedded widget
3. **Maintain brand consistency** with NOTICE design system
4. **Work on all devices** with responsive design
5. **Load quickly** with optimized assets

The code is clean, well-organized, and fully commented. All styling uses CSS variables for easy customization. JavaScript is vanilla (no frameworks) for maximum compatibility and performance.

For questions or issues, refer to the [Troubleshooting](#troubleshooting) section or use the [Developer Tools](#developer-tools) to debug.


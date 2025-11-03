# STEAM Collective - Complete Documentation

## Table of Contents
1. [Overview](#overview)
2. [File Structure](#file-structure)
3. [Key Features](#key-features)
4. [Content Management](#content-management)
5. [Customization](#customization)
6. [How It Works](#how-it-works)
7. [Troubleshooting](#troubleshooting)

---

## Overview

The STEAM Collective page showcases a youth-focused racial justice initiative with:
- **Video carousel** - YouTube testimonials and summit footage
- **Photo gallery drawer** - Dynamic image gallery with masonry layout
- **Impact sections** - Goals and participant outcomes
- **Member profiles** - Team information by region
- **Smooth animations** - Scroll-triggered effects throughout

**Dependencies:**
- Bootstrap 5.1.3 (for grid system)
- Font Awesome 6.4.0 (for icons)

---

## File Structure

```
steam/
├── steam.html              # Main HTML (374 lines)
├── css/
│   └── main.css           # All styling (1,205 lines)
└── js/
    └── main.js            # Interactivity (647 lines)
```

---

## Key Features

### 1. Video Carousel

**Interactive YouTube video slider** with navigation and thumbnails.

**Location:** Lines 227-254 in HTML, video data in JS starting line 2

### 2. Photo Gallery Drawer

**Side-sliding panel** with masonry grid of event photos.
- Opens from floating button or in-page buttons
- Lazy loads images
- Full-screen image modal
- Dynamic image fetching with caching

### 3. Scroll Progress Bar

**Fixed top bar** showing scroll position through page.

### 4. Image Modals

**Two modal systems:**
- Main content images (inline gallery)
- Gallery drawer images (full collection)

### 5. Animated Content

**Intersection Observer** triggers animations when scrolling:
- `.fade-in` - Opacity + translateY
- `.slide-in-left` - Slides from left
- `.slide-in-right` - Slides from right
- `.scale-in` - Scales up

---

## Content Management

### Update Text Content

**Hero Section**

**Location:** Lines 94-99 in `steam.html`

```html
<h1 class="page-title fade-in">STEAM Collective</h1>
<p class="page-subtitle fade-in">Your Subtitle Here</p>
<p class="steam-acronym fade-in">STEAM: Science, Technology, Engineering, Arts, Mathematics</p>
```

**Marketing Content**

**Location:** Lines 103-119 in `steam.html`

```html
<div class="marketing-space fade-in">
    <h3 style="...">Your Heading</h3>
    <p class="mb-4"><strong>Year</strong>, description here.</p>
    <h4 style="...">Subheading</h4>
    <ol class="mb-0" style="...">
        <li style="..."><strong>Point 1</strong> description</li>
        <li style="..."><strong>Point 2</strong> description</li>
    </ol>
</div>
```

**Impact Sections**

**Location:** Lines 122-166 in `steam.html`

```html
<div class="impact-item">
    <h5>Item Title</h5>
    <p class="mb-0">Description text here</p>
</div>
```

### Add/Update Videos

**Location:** Lines 2-22 in `js/main.js`

```javascript
const videoData = [
    {
        id: 'YouTube_VIDEO_ID',           // From YouTube URL
        title: 'Video Title',
        description: 'Short description',
        thumbnail: 'https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg'
    },
    // Add more videos...
];
```

**YouTube ID Example:**
- URL: `https://www.youtube.com/watch?v=dzuUr7xEXrc`
- ID: `dzuUr7xEXrc`

**Thumbnail Options:**
```javascript
// High quality (may not exist for all videos)
'https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg'

// Medium quality (always available)
'https://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg'

// Standard quality
'https://img.youtube.com/vi/VIDEO_ID/sddefault.jpg'
```

### Add Inline Gallery Images

**Location:** Lines 199-224 in `steam.html`

```html
<div class="content-card gallery-image scale-in" data-src="FULL_SIZE_IMAGE_URL">
    <img src="THUMBNAIL_IMAGE_URL" 
         class="img-fluid" 
         alt="Image description">
</div>
```

**Best Practices:**
- `data-src` - High resolution for modal (800-1200px wide)
- `src` - Smaller thumbnail for page load (400-600px wide)
- Keep file sizes under 200KB per image

### Update Gallery Drawer Images

**Dynamic Loading:**

Gallery images load from `/steam-2025-image-proxy` endpoint with 1-hour caching.

**Fallback Images:**

**Location:** Lines 405-423 in `js/main.js`

```javascript
const fallbackGalleryImages = [
    'https://images.squarespace-cdn.com/...',
    'https://images.squarespace-cdn.com/...',
    // Add more URLs...
];
```

**Clear Cache:**

Open browser console (F12) and type:
```javascript
clearGalleryCache()
```
Then refresh the page.

### Add Team Members

**Location:** Lines 292-356 in `steam.html`

```html
<div class="member-section slide-in-left">
    <h4 class="member-location">City Name</h4>
    
    <div class="member-card">
        <div class="member-name">Full Name</div>
        <div class="member-role">
            Role description and 
            <a href="URL" target="_blank" class="interactive-highlight">
                linked text
            </a>
        </div>
    </div>
    
    <!-- Add more member cards... -->
</div>
```

**Alternating Animations:**
- `.slide-in-left` - For first, third, fifth regions
- `.slide-in-right` - For second, fourth regions

---

## Customization

### Change Colors

**Location:** Lines 2-8 in `css/main.css`

```css
:root {
    --primary-blue: #06a7e0;      /* Light blue (buttons, accents) */
    --dark-blue: #14003b;         /* Navy (text, gradients) */
    --light-gray: #f8f9fa;        /* Backgrounds */
    --text-color: #212529;        /* Body text */
    --border-color: #dee2e6;      /* Dividers */
}
```

**Examples:**

**Change to green theme:**
```css
--primary-blue: #28a745;
--dark-blue: #155724;
```

**Change to purple theme:**
```css
--primary-blue: #9b59b6;
--dark-blue: #6c3483;
```

### Adjust Hero Image

**Location:** Lines 82-91 in `steam.html`

```html
<img src="YOUR_IMAGE_URL" 
     class="img-fluid hero-image w-100" 
     alt="Description" 
     style="max-height: 400px; object-fit: cover;">
```

**Style Options:**
- `max-height: 400px` - Height (increase for taller)
- `object-fit: cover` - Crop to fill
- `object-fit: contain` - Show full image

### Gallery Button Visibility

**Appears after scrolling 300px down page.**

**Location:** Lines 37-43 in `js/main.js`

```javascript
if (window.pageYOffset > 300) {  // Change 300 to your preference
    backToTopBtn.classList.add('visible');
    galleryTriggerBtn.classList.add('visible');
}
```

### Carousel Speed

**Location:** Lines 241-242 in `js/main.js`

```javascript
const cardWidth = 300 + 24;  // Card width + gap
```

Change `300` to adjust card size (also update CSS on line 596).

**Enable Auto-Advance:**

**Location:** Lines 324-331 in `js/main.js`

Uncomment:
```javascript
setInterval(() => {
    if (currentSlide < videoData.length - 1) {
        nextSlide();
    } else {
        goToSlide(0);
    }
}, 8000);  // 8 seconds per slide
```

### Gallery Column Count

**Location:** Lines 1056-1059 in `css/main.css`

```css
.gallery-masonry {
    column-count: 4;  /* Desktop: 4 columns */
    column-gap: 1.5rem;
}
```

**Responsive breakpoints:**
- 4 columns: > 1200px
- 3 columns: 768px - 1200px
- 2 columns: 480px - 768px
- 1 column: < 480px

---

## How It Works

### Video Carousel System

**1. Data Structure**

Videos defined in array with ID, title, description, thumbnail.

**2. Card Generation**

`createVideoCard()` builds HTML for each video.

**3. Navigation**

- Click arrows to move
- Click indicators to jump
- Touch/swipe on mobile
- Arrow keys when modal open

**4. Modal Playback**

Clicking card embeds YouTube iframe with autoplay.

**JavaScript Flow:**
```javascript
initializeCarousel()
  → createVideoCard() for each video
  → Populate indicators
  → Add click listeners
  → updateCarousel() on navigation
```

### Gallery Drawer System

**1. Lazy Loading**

Images only load when drawer opens.

**2. IntersectionObserver**

Loads images as you scroll through gallery.

**3. Masonry Layout**

CSS column-count for Pinterest-style grid.

**4. Caching**

Fetched images stored in localStorage for 1 hour.

**JavaScript Flow:**
```javascript
openGallery()
  → loadGalleryImages() (first time only)
  → fetchGalleryImages()
    → Check cache
    → Fetch from proxy OR use fallback
    → setCachedImages()
  → Create gallery items with lazy loading
  → Click to open full-screen modal
```

### Scroll Animations

**Intersection Observer** watches for elements entering viewport:

```javascript
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {threshold: 0.1});
```

**Classes:**
- `.fade-in` → `.fade-in.visible` (opacity 0 → 1)
- `.slide-in-left` → `.slide-in-left.visible` (translateX -50px → 0)

### Scroll Progress Bar

**Updates on scroll:**

```javascript
const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
const scrollProgress = (window.pageYOffset / scrollTotal) * 100;
progressBar.style.width = scrollProgress + '%';
```

**Debounced** for performance (updates every 10ms max).

### Image Modal

**Inline Gallery:**
- Click `.gallery-image` element
- Sets modal image `src` from `data-src` attribute
- Prevents body scrolling

**Gallery Drawer:**
- Click gallery item
- Opens separate modal with blur backdrop
- Keyboard navigation (Escape to close)

---

## Quick Reference

### Video Entry Template

```javascript
{
    id: 'YOUTUBE_VIDEO_ID',
    title: 'Video Title Here',
    description: 'Short description of video content',
    thumbnail: 'https://img.youtube.com/vi/YOUTUBE_VIDEO_ID/maxresdefault.jpg'
}
```

### Impact Item Template

```html
<div class="impact-item">
    <h5>Heading</h5>
    <p class="mb-0">Description text.</p>
</div>
```

### Member Card Template

```html
<div class="member-card">
    <div class="member-name">Full Name</div>
    <div class="member-role">Role and description</div>
</div>
```

### Gallery Image Template

```html
<div class="content-card gallery-image scale-in" data-src="HIGH_RES_URL">
    <img src="THUMBNAIL_URL" class="img-fluid" alt="Description">
</div>
```

---

## Troubleshooting

### Videos Not Playing

**Check:**
1. YouTube video is public (not private/unlisted may have issues)
2. Video ID is correct (11 characters)
3. No ad blockers preventing embeds

**Test Video ID:**

Open: `https://www.youtube.com/watch?v=YOUR_VIDEO_ID`

### Carousel Not Moving

**Check:**
1. JavaScript loaded (check browser console for errors)
2. Video data array not empty
3. Navigation buttons not disabled

**Debug:**
```javascript
// In browser console
console.log(videoData);  // Should show array of videos
```

### Gallery Not Opening

**Check:**
1. Gallery trigger button visible (scroll down 300px)
2. JavaScript loaded
3. Console for errors

**Force Visibility:**

Temporarily change line 37 in JS:
```javascript
if (window.pageYOffset > 0) {  // Changed from 300
```

### Gallery Images Not Loading

**Check:**
1. Image URLs accessible
2. No CORS restrictions
3. Cache may be stale

**Clear cache:**
```javascript
clearGalleryCache()  // In browser console
```

### Animations Not Triggering

**Check:**
1. Elements have animation classes (`.fade-in`, etc.)
2. Intersection Observer supported (Chrome 51+, Firefox 55+)
3. Scroll to trigger (animations need 10% of element in view)

**Force Animation:**

Add `.visible` class manually:
```javascript
document.querySelector('.fade-in').classList.add('visible');
```

### Scroll Progress Bar Not Moving

**Check:**
1. Element exists with class `.scroll-progress`
2. Page is scrollable (content taller than viewport)
3. JavaScript loaded

**Debug:**
```javascript
// In console
document.querySelector('.scroll-progress').style.width = '50%';
```

### Bootstrap Conflicts

**If using custom styles:**

The page uses Bootstrap 5.1.3 for grid only. Custom classes override Bootstrap.

**Avoid Bootstrap classes on custom elements:**
- ✅ Use on `.container-fluid`, `.row`, `.col-*`
- ❌ Don't use `.btn` (use `.download-button` instead)

### Mobile Responsiveness

**Built-in breakpoints:**
- 1200px - Gallery 3 columns
- 900px - Video carousel adjusts
- 768px - Member cards stack
- 600px - Topic boxes single column
- 480px - Gallery single column

**Test:**

Use browser DevTools (F12) → Toggle device toolbar

### Back to Top Button Not Appearing

**Requires:**
- Scroll past 300px
- Element with `id="backToTop"`
- JavaScript loaded

**Check visibility:**
```javascript
// In console
document.getElementById('backToTop').classList.add('visible');
```

### Parallax Effect Not Working

**Subtle effect on hero image.**

**Only works:**
- When scrolling in top viewport height
- On devices without `prefers-reduced-motion`

**Location:** Lines 147-156 in `js/main.js`

---

## Performance Tips

### Optimize Images

**Recommended:**
- Format: WebP (smaller files, modern browsers)
- Fallback: JPEG
- Size: Max 1200px width
- Quality: 75-85%
- File size: < 200KB

**Tools:**
- Squoosh.app
- TinyJPG.com
- ImageOptim (Mac)

### Lazy Loading

**Already implemented:**
- Gallery drawer images load on scroll
- Video thumbnails use `loading="lazy"`

### Cache Strategy

Gallery images cached for 1 hour in localStorage.

**Adjust duration:**

**Location:** Line 402 in `js/main.js`

```javascript
const CACHE_DURATION = 60 * 60 * 1000;  // 1 hour
// Change to 2 hours:
const CACHE_DURATION = 2 * 60 * 60 * 1000;
```

### Reduce Animation Complexity

**Disable parallax for performance:**

**Location:** Lines 147-156 in `js/main.js`

Comment out:
```javascript
// Parallax effect for hero image (subtle)
// const heroImage = document.querySelector('.hero-image');
// if (heroImage) { ... }
```

---

## Advanced Customization

### Custom Video Thumbnail

**Instead of YouTube auto-thumbnail:**

```javascript
{
    id: 'VIDEO_ID',
    title: 'Title',
    description: 'Description',
    thumbnail: 'https://your-cdn.com/custom-thumbnail.jpg'  // Your image
}
```

### Add Video Duration Badge

**Location:** Line 198 in `js/main.js`

In video thumbnail div:
```javascript
<div class="video-thumbnail">
    <img src="${video.thumbnail}" alt="${video.title}" loading="lazy">
    <span style="position:absolute; bottom:10px; right:10px; background:rgba(0,0,0,0.8); color:white; padding:4px 8px; border-radius:4px; font-size:12px;">5:30</span>
    <div class="play-overlay">
```

### Multiple Gallery Sections

**Create separate galleries:**

1. Duplicate drawer HTML with unique IDs
2. Duplicate JS `initializeGalleryDrawer()` with new IDs
3. Use different image arrays

### Video Playlist Integration

**Link to full playlist:**

**Location:** Line 193 in `steam.html`

Uncomment and update:
```html
<p class="mb-0">
    Explore feedback below or view the full playlist 
    <a href="https://www.youtube.com/playlist?list=YOUR_PLAYLIST_ID" 
       target="_blank" class="text-decoration-none fw-bold">here</a>.
</p>
```

### Custom Animation Timing

**Location:** Lines 197-206 in `css/main.css`

```css
.fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease;  /* Change 0.6s to your preference */
}
```

**Stagger animations:**

Add inline delays:
```html
<div class="fade-in" style="transition-delay: 0.1s;">First</div>
<div class="fade-in" style="transition-delay: 0.2s;">Second</div>
<div class="fade-in" style="transition-delay: 0.3s;">Third</div>
```

---

## Common Tasks

### Change Page Background

**Location:** Lines 10-16 in `css/main.css`

```css
body {
    background-color: white;  /* Change to any color */
    /* Or use gradient: */
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}
```

### Adjust Section Spacing

**Location:** Line 79 in `css/main.css`

```css
.section-title {
    margin-top: 2.5rem;    /* Space above */
    margin-bottom: 1.5rem; /* Space below */
}
```

### Change Button Style

**Location:** Lines 155-173 in `css/main.css`

```css
.download-button {
    background: linear-gradient(135deg, var(--primary-blue), var(--dark-blue));
    border-radius: 25px;  /* Roundness */
    padding: 12px 30px;   /* Size */
}
```

### Disable Animations

**For accessibility or performance:**

Add to CSS:
```css
@media (prefers-reduced-motion: reduce) {
    * {
        animation: none !important;
        transition: none !important;
    }
}
```

### Add Social Share Buttons

**Location:** After line 366 in `steam.html`

```html
<div class="row mt-5">
    <div class="col-12 text-center">
        <h3>Share This Page</h3>
        <a href="https://twitter.com/intent/tweet?url=YOUR_URL" target="_blank">
            <i class="fab fa-twitter"></i> Twitter
        </a>
        <a href="https://www.facebook.com/sharer/sharer.php?u=YOUR_URL" target="_blank">
            <i class="fab fa-facebook"></i> Facebook
        </a>
    </div>
</div>
```

---

## Accessibility

### Already Implemented

- ✅ `aria-label` on icon-only buttons
- ✅ Keyboard navigation (Escape, Arrow keys)
- ✅ Alt text on images
- ✅ Color contrast meets WCAG AA
- ✅ Focus states on interactive elements
- ✅ Semantic HTML structure

### Recommendations

**Add skip link:**

```html
<!-- After <body> tag -->
<a href="#main-content" class="skip-link">Skip to main content</a>
```

**CSS:**
```css
.skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    background: #000;
    color: #fff;
    padding: 8px;
    z-index: 100;
}

.skip-link:focus {
    top: 0;
}
```

---

## Browser Support

**Fully Supported:**
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

**Features:**
- Intersection Observer (Chrome 51+, Firefox 55+, Safari 12.1+)
- CSS Grid (IE 11+ with prefixes)
- Flexbox (IE 10+)
- localStorage (IE 8+)

**Fallbacks:**
- No Intersection Observer → Elements always visible
- No localStorage → Gallery fetches every time


---

**Last Updated:** November 2025  
**Maintainer:** TCIA Development Team  
**Dependencies:** Bootstrap 5.1.3, Font Awesome 6.4.0


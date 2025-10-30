# Glitch Lab Page - Complete Documentation

## Table of Contents
1. [Overview](#overview)
2. [File Structure](#file-structure)
3. [Quick Start Guide](#quick-start-guide)
4. [CSS Architecture](#css-architecture)
5. [JavaScript Features](#javascript-features)
6. [Common Modifications](#common-modifications)
7. [Troubleshooting](#troubleshooting)

---

## Overview

The Glitch Lab page showcases a digital art residency with an immersive, tech-themed design featuring:
- **Matrix rain background** - Animated falling characters
- **Hero section** with alternating static/glitch images
- **Gallery system** with drawer interface
- **Artist carousel** with 3D card rotation
- **Interactive hex grid backgrounds** on artist cards

**Design Philosophy**: Self-contained, visually engaging, responsive, and easy to update without technical expertise.

---

## File Structure

```
notice-glitch-lab/
├── notice-glitch-lab.html    # Main HTML structure
├── css/
│   └── main.css              # All styles and animations
├── js/
│   └── main.js               # All interactive functionality
└── README.md                 # This file
```

**How it works**: The HTML loads CSS and JavaScript from a CDN, so you only need to edit the HTML file in Squarespace.

---

## Quick Start Guide

### For Non-Programmers

**Q: How do I change the text on the page?**
1. Open `notice-glitch-lab.html`
2. Find the text you want to change (it's readable in plain English)
3. Edit it directly
4. Save and refresh your browser

**Q: How do I change an image?**
1. Upload your new image to Squarespace
2. Copy the image URL
3. Find the old URL in the HTML (looks like `https://images.squarespace-cdn.com/...`)
4. Replace it with your new URL

**Q: How do I add a new artist?**
See [Adding a New Artist](#adding-a-new-artist) below

---

## CSS Architecture

### Design System Variables

At the top of `main.css`, you'll find all customizable design variables:

```css
:root {
    /* SPACING - Control gaps and padding */
    --spacing-xs: 0.25rem;    /* 4px - tiny gaps */
    --spacing-sm: 0.5rem;     /* 8px - small gaps */
    --spacing-md: 1rem;       /* 16px - medium gaps */
    --spacing-lg: 1.5rem;     /* 24px - large gaps */
    --spacing-xl: 2rem;       /* 32px - extra large */
    --spacing-2xl: 3rem;      /* 48px - section spacing */
    --spacing-3xl: 4rem;      /* 64px - major sections */
    --spacing-4xl: 5rem;      /* 80px - massive spacing */

    /* TYPOGRAPHY - Text sizes */
    --font-size-xs: 0.75rem;   /* 12px - tiny text */
    --font-size-sm: 0.875rem;  /* 14px - small text */
    --font-size-base: 1.25rem; /* 20px - body text */
    --font-size-lg: 1.125rem;  /* 18px - slightly larger */
    --font-size-xl: 1.25rem;   /* 20px */
    --font-size-2xl: 1.5rem;   /* 24px - subheadings */
    --font-size-3xl: 2rem;     /* 32px - section titles */
    --font-size-4xl: 2.5rem;   /* 40px - large headings */
    --font-size-8xl: 4.5rem;   /* 72px - hero text */

    /* COLORS - Brand palette */
    --notice-yellow: #fbc516;  /* Brand yellow */
    --notice-black: #1a1919;   /* Deep black */
    --notice-grey: #808285;    /* Medium grey */
    --notice-white: #ffffff;   /* White */
    
    /* FUNCTIONAL COLORS - What colors mean */
    --notice-bg-primary: var(--notice-black);     /* Main background */
    --notice-bg-secondary: #242424;               /* Card backgrounds */
    --notice-text-primary: var(--notice-white);   /* Main text */
    --notice-text-secondary: var(--notice-grey);  /* Secondary text */
    --notice-accent: var(--notice-yellow);        /* Highlights */
}
```

**How to customize**:
```css
/* Example: Change the brand yellow to purple */
--notice-yellow: #9b59b6;

/* Example: Make text larger site-wide */
--font-size-base: 1.5rem;  /* Changed from 1.25rem */

/* Example: Increase spacing between sections */
--spacing-3xl: 6rem;  /* Changed from 4rem */
```

### Section Structure

Every major section follows this pattern:

```html
<section class="notice-newsletter" id="section-name">
    <div class="section-content">
        <h2 class="section-title">Section Title</h2>
        <!-- Section content here -->
    </div>
</section>
```

**Key Classes:**
- `.notice-coalition-main` - Wraps entire page
- `.section-content` - Centers content with max-width
- `.section-title` - Yellow heading for sections
- `.notice-btn` - Yellow button style

### Responsive Design

The page automatically adapts to screen sizes:

```css
/* Desktop (default) - Full layout */

/* Tablet - Below 1024px */
@media screen and (max-width: 1024px) {
    /* Adjusts container padding */
}

/* Mobile - Below 768px */
@media screen and (max-width: 768px) {
    /* Switches to single column */
    /* Reduces font sizes */
    /* Simplifies navigation */
}
```

**You don't need to touch this** - it works automatically!

---

## JavaScript Features

### 1. Matrix Rain Background

**What it does**: Creates the iconic "Matrix" falling character effect behind all content.

**Location in code**: Lines 121-171 in `main.js`

**How it works**:
```javascript
// 1. Creates a canvas that fills the screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 2. Defines characters that can appear
const alphabet = katakana + latin + nums;  // Japanese, English, numbers

// 3. Animates characters falling down
const draw = () => {
    // Paint transparent black for fade effect
    context.fillStyle = 'rgba(0, 0, 0, 0.08)';
    
    // Set character color (notice yellow with transparency)
    context.fillStyle = 'rgba(251, 197, 22, 0.35)';
    
    // Draw random characters falling
    for(let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        context.fillText(text, i*fontSize, rainDrops[i]*fontSize);
        rainDrops[i]++;  // Move character down
    }
};

// 4. Repeat 33 times per second (30ms interval)
setInterval(draw, 30);
```

**Customization examples**:

```javascript
// Change color to cyan
context.fillStyle = 'rgba(0, 255, 255, 0.35)';

// Make characters fall faster
setInterval(draw, 20);  // Changed from 30

// Make characters larger
const fontSize = 20;  // Changed from 16

// Only show numbers
const alphabet = nums;  // Removed katakana + latin
```

### 2. Hero Image Alternating Effect

**What it does**: Switches between a static image and a glitchy animated GIF periodically.

**Location in code**: Lines 4-88 in `main.js`

**How it works**:
```javascript
// Define your images
const staticImageUrl = 'https://...your-static-image.jpg';
const glitchedImageUrl = 'https://...your-glitched-image.gif';

// Schedule:
// - Shows static image for 20 seconds
// - Shows glitch GIF for 2 seconds
// - Repeats forever

function alternateHeroImage() {
    if (isShowingGlitch) {
        // Switch back to static
        heroPromoImage.src = staticImageUrl;
        isShowingGlitch = false;
        setTimeout(alternateHeroImage, 20000);  // Wait 20 seconds
    } else {
        // Switch to glitch
        heroPromoImage.src = glitchedImageUrl;
        isShowingGlitch = true;
        setTimeout(alternateHeroImage, 2000);   // Wait 2 seconds
    }
}
```

**Customization examples**:

```javascript
// Make glitch appear more often (every 10 seconds instead of 20)
setTimeout(alternateHeroImage, 10000);  // Line 42

// Make glitch last longer (5 seconds instead of 2)
setTimeout(alternateHeroImage, 5000);   // Line 62

// Use a different glitch image
const glitchedImageUrl = 'https://your-new-glitch.gif';  // Line 9
```

### 3. Gallery Drawer System

**What it does**: A sliding panel from the right side showing gallery images in a masonry grid.

**Location in code**: Lines 496-718 in `main.js`

**Components**:

1. **Trigger Button** (floating button on right side)
2. **Overlay** (darkens page when gallery is open)
3. **Drawer** (the panel that slides in)
4. **Image Modal** (full-screen image viewer)

**Image Source**:
The gallery fetches images from a proxy endpoint and caches them:

```javascript
// Gallery images are loaded from:
const response = await fetch('/glitch-lab-image-proxy');

// Fallback images if proxy fails:
const fallbackGalleryImages = [
    'https://images.squarespace-cdn.com/.../IMG_3104.jpeg',
    'https://images.squarespace-cdn.com/.../File.jpg',
];
```

**How to add your own images**:

Option A - Use fallback array:
```javascript
// In main.js, add your images to fallbackGalleryImages array:
const fallbackGalleryImages = [
    'https://your-image-1.jpg',
    'https://your-image-2.jpg',
    'https://your-image-3.jpg',
    // Add as many as you want
];
```

Option B - Update the image proxy endpoint (requires backend setup)

**Cache Management**:
Images are cached for 1 hour to improve loading speed.

```javascript
// Clear cache and reload fresh images (run in browser console):
clearGlitchLabGalleryCache();
// Then refresh the page
```

**Customization examples**:

```javascript
// Change cache duration (default: 1 hour)
const CACHE_DURATION = 60 * 60 * 1000;  // Change to 30 * 60 * 1000 for 30 minutes

// Change masonry grid columns
.gallery-masonry {
    column-count: 3;  /* Changed from 4 for fewer columns */
}
```

### 4. Artist Carousel

**What it does**: Displays artist cards in a 3D rotating carousel with navigation controls.

**Location in code**: Lines 720-882 in `main.js`

**How it works**:
```javascript
class ArtistCarousel {
    // Features:
    // - 3D perspective with card rotation
    // - Previous/Next navigation buttons
    // - Indicator dots at bottom
    // - Auto-rotates every 5 seconds
    // - Pauses on hover
    // - Keyboard navigation (arrow keys)
}
```

**Customization examples**:

```javascript
// Change auto-rotation speed
this.autoRotateInterval = setInterval(() => {
    this.next();
}, 10000);  // Changed from 5000 (now 10 seconds)

// Disable auto-rotation (remove lines 1060-1063)
// startAutoRotate() {
//     // Commented out - no auto-rotation
// }

// Change card spacing
const spacing = 350;  // Changed from 280 (more space between cards)

// Change card rotation angle
const rotationAngle = 60;  // Changed from 45 (more dramatic rotation)
```

### 5. Artist Card Hex Grid Backgrounds

**What it does**: Creates animated hexagonal grid patterns behind each artist card.

**Location in code**: Lines 177-473 in `main.js`

**How it works**:
```javascript
// For each artist card with data-artist-hex attribute:
document.querySelectorAll('[data-artist-hex]').forEach((canvas, index) => {
    // 1. Generate hexagon grid
    // 2. Animate with random twinkling
    // 3. Draw with cyan/yellow colors
});

// Each hexagon can:
// - Twinkle randomly (subtle glow effect)
// - Fade in and out over time
```

**Customization examples**:

```javascript
// Change hexagon color
grid.ctx.strokeStyle = 'rgba(251, 197, 22, 0.4)';  // Yellow instead of cyan

// Make hexagons larger
hexRadius: 20,  // Changed from 15

// More/less twinkling
if (Math.random() < 0.05) {  // Changed from 0.02 (more frequent)
    randomHex.glow = Math.max(randomHex.glow, 0.5);
}

// Faster/slower animation
hex.glow -= 0.05;  // Changed from 0.02 (faster fade)
```

### 6. Smooth Scrolling Navigation

**What it does**: When clicking navigation links, smoothly scrolls to sections instead of jumping.

**Location in code**: Lines 90-120 in `main.js`

**How it works**:
```javascript
// Listens for clicks on nav links
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        // Only for internal links (starting with #)
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();  // Don't jump immediately
            
            // Get target section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            // Calculate position (accounting for fixed nav bar)
            const navHeight = document.querySelector('.notice-nav').offsetHeight;
            const targetPosition = targetSection.getBoundingClientRect().top 
                                 + window.pageYOffset - navHeight;
            
            // Smooth scroll to position
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});
```

**No customization needed** - works automatically!

---

## Common Modifications

### Adding a New Artist

**Step 1**: In the HTML, find the artist section (around line 154) and copy this template:

```html
<div class="artist-item" data-index="3">
    <div class="artist-card">
        <canvas class="artist-card-hex-bg" data-artist-hex="3"></canvas>
        <div class="artist-card-content">
            <div class="artist-headshot">
                <i class="fas fa-user"></i>
            </div>
            <h3 style="color: var(--notice-accent); margin-bottom: var(--spacing-md); font-family: var(--font-accent); font-size: var(--font-size-2xl);">
                Artist Name Here
            </h3>
            <p style="color: var(--notice-text-primary); font-size: var(--font-size-base); line-height: 1.6; margin-bottom: var(--spacing-lg);">
                Artist bio/description here. Tell us about their work and vision.
            </p>
            <a href="https://artist-website.com" target="_blank" rel="noopener noreferrer" class="artist-link">
                View Portfolio →
            </a>
        </div>
    </div>
</div>
```

**Step 2**: Update the values:
- Change `data-index="3"` to the next number (0, 1, 2, so use 3 for the 4th artist)
- Change `data-artist-hex="3"` to match the index
- Replace "Artist Name Here" with the actual name
- Replace the bio text
- Update the portfolio link URL

**Step 3**: Save - the carousel will automatically include the new artist!

### Changing the Color Scheme

Want to change from yellow/cyan to a different color scheme? Here's how:

**Step 1**: Choose your colors
```css
/* In main.css, update these variables: */
:root {
    --notice-yellow: #e91e63;  /* Pink instead of yellow */
    --notice-accent: var(--notice-yellow);
}
```

**Step 2**: Update matrix rain color (optional)
```javascript
// In main.js, line 153:
context.fillStyle = 'rgba(233, 30, 99, 0.35)';  /* Pink in RGB */
```

**Step 3**: Update hex grid colors (optional)
```javascript
// In main.js, around line 437 and 608:
grid.ctx.strokeStyle = 'rgba(233, 30, 99, 0.4)';  /* Pink hexagons */
```

### Updating Text Content

**Hero Section** (lines 65-70 in HTML):
```html
<h1 class="intro-catchphrase">
    Your New Title Here
</h1>
<p class="intro-cta-text">
    Your new subtitle or description here
</p>
```

**About Section** (lines 92-96 in HTML):
```html
<p style="...">
    Your updated description about the residency here.
    You can make this as long or short as you need.
</p>
```

**Section Titles** (search for `class="section-title"`):
```html
<h2 class="section-title">Your New Section Name</h2>
```

### Changing Images

**Hero Image**:
1. Upload your image to Squarespace
2. Copy the full URL
3. In HTML line 75, replace the URL:
```html
<img src="YOUR-NEW-IMAGE-URL-HERE" alt="Glitch Lab Event">
```

**About Section Image** (line 102):
```html
<img src="YOUR-NEW-IMAGE-URL-HERE" alt="Glitch Lab Artwork">
```

**Logo** (lines 6 and 238):
```html
<img src="YOUR-LOGO-URL-HERE" alt="Glitch Lab Logo">
```

### Adding a New Section

Copy this template and insert it where you want the new section:

```html
<section class="notice-newsletter" id="my-new-section">
    <div class="section-content">
        <h2 class="section-title">My New Section Title</h2>
        
        <p style="color: var(--notice-text-primary); font-size: var(--font-size-lg); line-height: 1.8; margin-bottom: var(--spacing-xl);">
            Your content here. You can use any HTML tags.
        </p>
        
        <!-- Add images, buttons, etc. -->
        <img src="your-image.jpg" alt="Description" style="max-width: 100%; border-radius: 12px;">
        
        <button class="notice-btn">Your Button Text</button>
    </div>
</section>
```

**To add it to navigation**:
```html
<!-- In the nav section (line 9-13), add: -->
<a href="#my-new-section">New Section</a>
```

### Adjusting Spacing

**Between sections**:
```css
/* In main.css, find: */
.notice-coalition-main > section {
    padding: var(--spacing-2xl) 0;  /* Increase/decrease this */
}
```

**Within sections**:
```html
<!-- Use inline styles with spacing variables -->
<div style="margin-bottom: var(--spacing-xl);">Content</div>
<div style="padding: var(--spacing-lg);">Content</div>

<!-- Or specific values: -->
<div style="margin-top: 2rem;">Content</div>
```

### Disabling Auto-Rotation on Carousel

If you want visitors to manually control the carousel:

**In main.js**, comment out these lines (around 1060):

```javascript
// startAutoRotate() {
//     this.autoRotateInterval = setInterval(() => {
//         this.next();
//     }, 5000);
// }
```

### Changing Gallery Layout

**Fewer columns** (easier to view on desktop):
```css
/* In main.css, around line 1169: */
.gallery-masonry {
    column-count: 3;  /* Changed from 4 */
}
```

**Mobile columns** (around line 1346):
```css
@media (max-width: 768px) {
    .gallery-masonry {
        column-count: 1;  /* Show one column on mobile */
    }
}
```

---

## Troubleshooting

### Problem: Matrix rain isn't showing

**Solution**:
1. Check that `<canvas id="Matrix"></canvas>` exists in HTML (line 18)
2. Check browser console for JavaScript errors (press F12)
3. Ensure main.js is loading (check Network tab in browser dev tools)

### Problem: Gallery images won't load

**Solution**:
1. Check that image URLs are correct and accessible
2. Try clearing the cache:
   ```javascript
   // Run in browser console:
   clearGlitchLabGalleryCache();
   ```
3. Check the fallback images array in main.js (line 524)
4. Verify the proxy endpoint is working

### Problem: Artists not showing in carousel

**Solution**:
1. Check that each artist has matching `data-index` values
2. Ensure `data-artist-hex` attribute exists on each canvas
3. Check browser console for errors
4. Verify class names: `artist-item`, `artist-card`, `artist-card-content`

### Problem: Navigation links don't scroll smoothly

**Solution**:
1. Check that section IDs match navigation href values:
   ```html
   <a href="#artists">Artists</a>  <!-- Link -->
   <section id="artists">          <!-- Section -->
   ```
2. Ensure sections have unique IDs
3. Check that JavaScript is loaded

### Problem: Page looks broken on mobile

**Solution**:
1. Check that viewport meta tag exists in page head:
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   ```
2. Test responsive styles work in main.css
3. Clear browser cache and reload

### Problem: Buttons don't work

**Solution**:
1. Check JavaScript is loaded (look for errors in console)
2. Verify button IDs match JavaScript selectors:
   ```javascript
   document.getElementById('galleryTriggerBtn')  // JS
   <button id="galleryTriggerBtn">              <!-- HTML -->
   ```
3. Test in different browser

### Problem: Hex grids not animating

**Solution**:
1. Check that canvas elements have `data-artist-hex` attribute
2. Verify canvas is inside `.artist-card`
3. Check browser console for canvas errors
4. Try refreshing the page

---

## Browser Console Commands

Useful commands you can run in the browser console (press F12 → Console tab):

```javascript
// Clear gallery image cache
clearGlitchLabGalleryCache();

// Stop matrix animation
clearInterval();  // Then refresh page to restart

// Check if glitch controller exists
console.log('Page loaded:', document.querySelector('.notice-coalition-main') !== null);

// Log all artist items
console.log('Artists:', document.querySelectorAll('.artist-item').length);

// Test gallery open
document.getElementById('galleryTriggerBtn').click();

// Test gallery close
document.getElementById('galleryCloseBtn').click();
```

---

## Performance Tips

### Optimizing Images

1. **Compress images** before uploading to Squarespace
   - Use tools like TinyPNG or Squarespace's built-in compression
   - Aim for under 500KB per image

2. **Use appropriate formats**:
   - JPG for photos
   - PNG for graphics with transparency
   - GIF for animations (but keep under 1MB)

3. **Lazy loading**: Already implemented for gallery images

### Reducing Page Weight

1. **Minimize images** in use - only include necessary assets
2. **Gallery cache**: Already implemented (1 hour cache)
3. **Remove unused code**: Already done in cleanup

---

## Accessibility Features

### Already Implemented

1. **Semantic HTML**: Proper heading hierarchy (h1, h2, h3)
2. **Alt text**: All images have descriptive alt attributes
3. **ARIA labels**: Buttons have aria-label attributes
4. **Keyboard navigation**: 
   - Tab through links and buttons
   - Arrow keys navigate carousel
   - Escape key closes modal/drawer
5. **Color contrast**: Yellow on black meets WCAG AA standards

### Adding More Accessibility

**Screen reader announcements**:
```html
<div aria-live="polite" aria-atomic="true">
    <!-- Content that updates will be announced -->
</div>
```

**Skip to content link**:
```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

**Focus indicators**: Already styled in CSS

---

## Need More Help?

### Understanding HTML Structure
- **Tags**: `<div>`, `<p>`, `<img>` are containers for content
- **Classes**: `class="notice-btn"` applies styling from CSS
- **IDs**: `id="galleryDrawer"` creates unique identifier for JavaScript

### Understanding CSS
- **Selectors**: `.notice-btn` targets elements with that class
- **Properties**: `color: red;` changes text color to red
- **Variables**: `var(--notice-yellow)` uses predefined color

### Understanding JavaScript
- **Functions**: Reusable blocks of code
- **Event listeners**: Run code when user clicks, scrolls, etc.
- **DOM manipulation**: Changing HTML elements with code

### Resources
- HTML: https://developer.mozilla.org/en-US/docs/Web/HTML
- CSS: https://developer.mozilla.org/en-US/docs/Web/CSS
- JavaScript: https://developer.mozilla.org/en-US/docs/Web/JavaScript

---

## Version History

- **v1.0** (Current) - Initial release with matrix rain, gallery, carousel, and hex grids
- Code cleaned and optimized (removed 1,130+ unused lines)

---

## Contributing

When making changes:
1. **Test in multiple browsers** (Chrome, Firefox, Safari)
2. **Test on mobile devices** or use browser dev tools
3. **Check console for errors** (F12 → Console)
4. **Clear cache** if changes don't appear
5. **Keep a backup** of working code before major changes

---

**Questions or issues?** Document what you tried and what didn't work - this helps others troubleshoot similar problems!


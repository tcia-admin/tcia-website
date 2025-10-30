# NDAUWU Fellowship Page - Developer & Designer Guide

## 📋 Table of Contents
1. [Overview](#overview)
2. [File Structure](#file-structure)
3. [Quick Start Guide](#quick-start-guide)
4. [CSS Architecture](#css-architecture)
5. [JavaScript Functionality](#javascript-functionality)
6. [Common Modifications](#common-modifications)
7. [Component Reference](#component-reference)
8. [Troubleshooting](#troubleshooting)

---

## Overview

This page showcases the NDAUWU Fellowship program, featuring:
- **Intro Section**: Split-screen image display with NDAUWU branding
- **Fellows Grid**: Interactive photo grid of fellowship participants
- **Storytelling Section**: Carousel of fellowship essays
- **Modals**: Pop-up windows for fellow bios and essay previews
- **Footer**: Social links and contact information

**Technology Stack:**
- Pure HTML5, CSS3, JavaScript (no frameworks)
- Responsive design (mobile, tablet, desktop)
- Accessible navigation with smooth scrolling

---

## File Structure

```
notice-fellowship/
├── notice-fellowship.html    # Main HTML file
├── css/
│   └── main.css              # All styles
├── js/
│   └── main.js               # All functionality
└── README.md                 # This file
```

### Asset Loading
At the top of `notice-fellowship.html`:
```html
<!-- Load Assets -->
<link rel="stylesheet" href="css/main.css">
<script src="js/main.js"></script>
```

**Important:** The CSS and JavaScript files are loaded via relative paths. Ensure the folder structure is maintained.

---

## Quick Start Guide

### Making Your First Change

**Example 1: Change a Section Title**

1. Open `notice-fellowship.html`
2. Find the section you want to change:
```html
<h2 class="section-title">MEET THE FELLOWS</h2>
```
3. Change the text:
```html
<h2 class="section-title">OUR FELLOWSHIP TEAM</h2>
```
4. Save and refresh your browser

**Example 2: Add a New Fellow**

1. In `notice-fellowship.html`, find the fellows grid:
```html
<div class="fellows-grid">
    <!-- Existing fellow cards here -->
</div>
```

2. Add a new card before the closing `</div>`:
```html
<div class="fellow-card">
    <img src="YOUR_IMAGE_URL_HERE" alt="NDAUWU Fellow [Name]">
</div>
```

3. Update the fellow data in `js/main.js`:
```javascript
const fellowData = {
    // Existing fellows...
    '[Name]': {
        location: 'City, State',
        bio: [
            'First paragraph of bio...',
            'Second paragraph of bio...'
        ]
    }
};
```

**Important:** The name in the `alt` attribute must match the key in `fellowData` (after removing "NDAUWU Fellow ")

---

## CSS Architecture

### Design System (CSS Variables)

All design values are stored at the top of `css/main.css` as CSS variables. This makes global changes easy!

```css
:root {
    /* Spacing */
    --spacing-xs: 0.25rem;    /* 4px */
    --spacing-sm: 0.5rem;     /* 8px */
    --spacing-md: 1rem;       /* 16px */
    --spacing-lg: 1.5rem;     /* 24px */
    --spacing-xl: 2rem;       /* 32px */
    --spacing-2xl: 3rem;      /* 48px */
    --spacing-3xl: 4rem;      /* 64px */
    
    /* Colors */
    --notice-yellow: #fbc516;
    --notice-black: #1a1919;
    --notice-grey: #808285;
    --notice-white: #ffffff;
    
    /* Typography */
    --font-size-base: 1.25rem;
    --font-size-xl: 1.25rem;
    --font-size-2xl: 1.5rem;
    --font-size-3xl: 2rem;
}
```

#### How to Change Colors Site-Wide

**Change the accent color (currently yellow):**
```css
--notice-accent: #fbc516;  /* Change to your color */
```

This will automatically update:
- Navigation link hovers
- Section titles
- Button colors
- Essay card highlights
- Modal borders

**Change background colors:**
```css
--notice-bg-primary: var(--notice-black);
--notice-bg-secondary: #242424;
```

### Layout Structure

The page uses a **sidebar navigation** layout:

```
┌─────────┬────────────────────────┐
│  SIDE   │                        │
│   NAV   │     MAIN CONTENT       │
│  (280px)│   (calc(100% - 280px)) │
│         │                        │
└─────────┴────────────────────────┘
```

**On mobile (< 768px), it switches to:**
```
┌──────────────────────────────────┐
│        TOP NAVIGATION            │
├──────────────────────────────────┤
│                                  │
│         MAIN CONTENT             │
│          (full width)            │
│                                  │
└──────────────────────────────────┘
```

### Key CSS Classes

#### Navigation
- `.notice-nav` - Sidebar navigation container (fixed position)
- `.nav-links a` - Individual navigation links
- `.scroll-progress-indicator` - Yellow progress bar on nav border

#### Sections
- `.notice-intro` - Hero section with split images
- `.notice-fellows` - Fellows grid section
- `.notice-essays` - Essay carousel section
- `.notice-social` - Social media links
- `.notice-newsletter` - Footer section

#### Components
- `.fellow-card` - Individual fellow photo card
- `.essay-card` - Individual essay card in carousel
- `.modal-content` - Pop-up window container
- `.carousel-arrow` - Carousel navigation buttons

### Responsive Breakpoints

```css
/* Tablet */
@media screen and (max-width: 1024px) {
    /* Styles for tablets */
}

/* Mobile */
@media screen and (max-width: 768px) {
    /* Styles for phones */
}
```

### Example: Changing Card Sizes

**Make fellow cards larger:**
```css
.fellow-card {
    aspect-ratio: 1;  /* Keep square, change to 4/3 for rectangular */
}

/* Change grid columns (currently 4) */
.fellows-grid {
    grid-template-columns: repeat(3, 1fr);  /* 3 columns instead of 4 */
}
```

---

## JavaScript Functionality

The `js/main.js` file handles all interactivity. Here's what each section does:

### 1. Navigation Smooth Scrolling

**What it does:** When you click a nav link, the page smoothly scrolls to that section.

**Code location:** Lines 1-36 in `main.js`

```javascript
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});
```

**To add a new navigation link:**

1. In `notice-fellowship.html`, add to `.nav-links`:
```html
<a href="#new-section">NEW LINK</a>
```

2. Create the section with matching ID:
```html
<section id="new-section">
    <!-- Your content -->
</section>
```

### 2. Fellow Modal System

**What it does:** Clicking a fellow's photo opens a modal with their biography.

**Code location:** Lines 38-104 in `main.js`

**Fellow data structure:**
```javascript
const fellowData = {
    'Fellow Name': {
        location: 'City, State',
        bio: [
            'Paragraph 1 of biography...',
            'Paragraph 2 of biography...',
            'Paragraph 3 of biography...'
        ]
    }
};
```

**How to add a new fellow:**

1. Add their card to HTML:
```html
<div class="fellow-card">
    <img src="PHOTO_URL" alt="NDAUWU Fellow Alex Johnson">
</div>
```

2. Add their data to `fellowData` in `main.js`:
```javascript
'Alex Johnson': {
    location: 'Seattle, WA',
    bio: [
        'Alex is a community organizer...',
        'They have been working on...'
    ]
}
```

**The name matching is crucial:**
- HTML: `alt="NDAUWU Fellow Alex Johnson"`
- JavaScript: `'Alex Johnson': { ... }`

The code automatically removes "NDAUWU Fellow " from the alt text to match the key.

### 3. Essay Carousel

**What it does:** Displays essay cards in a sliding carousel with navigation arrows.

**Code location:** Lines 106-354 in `main.js`

**Essay data structure:**
```javascript
essays = [
    {
        id: 'unique-essay-id',
        title: 'Essay Title Here',
        authors: 'Author 1 & Author 2',  // Use & to separate multiple authors
        caption: 'STORYTELLING PROJECT',
        excerpt: 'Brief description...',
        source: 'NOTICE Coalition',
        date: 'January 2025',
        image_url: 'HEADER_IMAGE_URL',
        substack_url: 'https://...',
        medium_url: 'https://...',
        content: [
            { type: 'text', content: 'Paragraph text...' },
            { type: 'text', content: 'Another paragraph...' }
        ]
    }
];
```

**How to add a new essay:**

1. Add essay object to the `essays` array in `initCarousel()` function:
```javascript
{
    id: 'my-new-essay',
    title: 'The Future of Digital Justice',
    authors: 'Jane Doe & John Smith',
    excerpt: 'Exploring how technology impacts...',
    date: 'February 2025',
    image_url: 'https://your-image-url.com/image.jpg',
    substack_url: 'https://thenoticecoalition.substack.com/p/your-essay',
    medium_url: 'https://medium.com/@noticecoalition/your-essay',
    content: [
        { type: 'text', content: 'First paragraph of essay preview...' },
        { type: 'text', content: 'Second paragraph...' }
    ]
}
```

2. The carousel automatically detects the first essay as "latest" and adds a pulsing outline

**Carousel controls:**
- `.carousel-arrow.carousel-prev` - Left arrow button
- `.carousel-arrow.carousel-next` - Right arrow button
- Automatically adjusts cards per view based on screen size:
  - Desktop (>1024px): 3 cards
  - Tablet (768-1024px): 2 cards
  - Mobile (<768px): 1 card

### 4. Essay Modal

**What it does:** Clicking an essay card opens a detailed preview modal.

**Features:**
- Full essay header image
- Authors' profile images (if available)
- Essay preview text with HTML formatting
- Links to read full essay on Substack/Medium
- Floating author images that scroll with modal

**Author images mapping:**
```javascript
const authorImages = {
    'Author Name': 'IMAGE_URL',
    'Chelsea Barabas': 'https://...',
    // Add more mappings here
};
```

**To add an author image:**
```javascript
'New Author Name': 'https://your-cdn.com/author-photo.jpg',
```

**Text formatting in essay content:**
- Use `<a href="URL">` for links
- Use `<strong>` for bold (appears in yellow)
- Use `<em>` for italic (appears in yellow)
- HTML is automatically rendered

### 5. Scroll Progress Indicator

**What it does:** Yellow bar on left side that grows as you scroll down the page.

**Code location:** Lines 440-456 in `main.js`

```javascript
function updateScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    scrollProgress.style.height = Math.min(scrollPercent, 100) + '%';
}
```

**To change the color:**
In `css/main.css`:
```css
.scroll-progress-indicator {
    background: linear-gradient(180deg, 
        var(--notice-accent) 0%, 
        rgba(251, 197, 22, 0.8) 50%, 
        var(--notice-accent) 100%);
}
```

---

## Common Modifications

### Adding a New Section

1. **In HTML** (`notice-fellowship.html`):
```html
<section id="my-new-section" class="my-section-class">
    <div class="section-content">
        <h2 class="section-title">MY SECTION TITLE</h2>
        <!-- Your content here -->
    </div>
</section>
```

2. **Add styles in CSS** (`css/main.css`):
```css
.my-section-class {
    padding: var(--spacing-3xl) 0;
    background-color: var(--notice-bg-secondary);
}
```

3. **Add navigation link** (optional):
```html
<div class="nav-links">
    <!-- Existing links -->
    <a href="#my-new-section">NEW SECTION</a>
</div>
```

### Changing the Color Scheme

**Example: Change from Yellow to Blue**

In `css/main.css`:
```css
:root {
    --notice-yellow: #3498db;  /* Blue color */
    --notice-accent: var(--notice-yellow);
}
```

This automatically updates:
- All hover states
- Button backgrounds
- Essay highlights
- Modal borders
- Progress indicator

### Modifying Grid Layouts

**Fellows Grid (currently 4 columns):**
```css
.fellows-grid {
    grid-template-columns: repeat(4, 1fr);  /* Change 4 to desired number */
    gap: 1px;  /* Space between cards */
}
```

**Examples:**
- 3 columns: `repeat(3, 1fr)`
- 5 columns: `repeat(5, 1fr)`
- Auto-fit (fills available space): `repeat(auto-fit, minmax(250px, 1fr))`

### Customizing Modal Appearance

**Change modal width:**
```css
.modal-content {
    max-width: 1000px;  /* Change to desired width */
}

.essay-modal-content {
    max-width: 900px;  /* For essay modals */
}
```

**Change modal background opacity:**
```css
.fellow-modal,
.essay-modal {
    background-color: rgba(0, 0, 0, 0.95);  /* 0.95 = 95% opaque */
}
```

### Adjusting Carousel Behavior

**Change number of visible cards:**
```javascript
// In main.js, find updateCardsPerView() function
function updateCardsPerView() {
    if (window.innerWidth <= 768) {
        cardsPerView = 1;  // Mobile: show 1 card
    } else if (window.innerWidth <= 1024) {
        cardsPerView = 3;  // Tablet: show 3 cards (changed from 2)
    } else {
        cardsPerView = 4;  // Desktop: show 4 cards (changed from 3)
    }
    // ... rest of function
}
```

**Change card width:**
```css
.essay-card {
    flex: 0 0 550px;  /* Change 550px to desired width */
}
```

---

## Component Reference

### Buttons

**Primary Button (Yellow background):**
```html
<button class="notice-btn">BUTTON TEXT</button>
```

**Ghost Button (Yellow border, transparent background):**
```css
.my-button {
    background-color: transparent;
    border: 2px solid var(--notice-accent);
    color: var(--notice-accent);
}

.my-button:hover {
    background-color: var(--notice-accent);
    color: var(--notice-black);
}
```

### Cards

**Fellow Card Template:**
```html
<div class="fellow-card">
    <img src="IMAGE_URL" alt="NDAUWU Fellow NAME">
</div>
```

**Essay Card (auto-generated by JavaScript):**
```javascript
// Automatically created from essay data
// See Essay Carousel section for data structure
```

### Modals

**Modal Structure:**
```html
<div class="modal-name" id="modalId">
    <div class="modal-content">
        <button class="modal-close">&times;</button>
        <div class="modal-body">
            <!-- Content here -->
        </div>
    </div>
</div>
```

**Open modal (JavaScript):**
```javascript
const modal = document.getElementById('modalId');
modal.style.display = 'block';
document.body.style.overflow = 'hidden';  // Prevent background scrolling
```

**Close modal (JavaScript):**
```javascript
modal.style.display = 'none';
document.body.style.overflow = 'auto';  // Restore scrolling
```

### Social Icons

```html
<!-- Image-based icon -->
<a href="SOCIAL_URL" target="_blank" rel="noopener noreferrer" class="social-icon">
    <img src="ICON_URL" alt="Platform Name">
</a>

<!-- Font Awesome icon -->
<a href="SOCIAL_URL" target="_blank" rel="noopener noreferrer" class="social-icon">
    <i class="fa-brands fa-PLATFORM"></i>
</a>
```

---

## Troubleshooting

### Problem: Navigation links don't scroll smoothly

**Solution:** Check that:
1. Section IDs match navigation `href` attributes:
```html
<!-- Navigation -->
<a href="#fellows-section">FELLOWS</a>

<!-- Section -->
<section id="fellows-section">...</section>
```

2. JavaScript file is loaded:
```html
<script src="js/main.js"></script>
```

### Problem: Fellow modal doesn't open when clicking photo

**Checklist:**
1. ✅ Image has correct `alt` attribute format:
```html
<img src="..." alt="NDAUWU Fellow [Name]">
```

2. ✅ Fellow data exists in JavaScript:
```javascript
const fellowData = {
    '[Name]': { ... }  // Name must match exactly
};
```

3. ✅ Modal HTML exists in page:
```html
<div class="fellow-modal" id="fellowModal">...</div>
```

4. ✅ JavaScript file is loaded after modal HTML

### Problem: Essay carousel not showing

**Checklist:**
1. ✅ Essay data is defined in `initCarousel()` function
2. ✅ Carousel container exists:
```html
<div class="essays-carousel" id="essaysCarousel"></div>
```
3. ✅ No JavaScript errors in browser console (F12 → Console tab)

### Problem: Styles not applying

**Solutions:**
1. **Clear browser cache:** Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)
2. **Check CSS file path:**
```html
<link rel="stylesheet" href="css/main.css">
```
3. **Verify file structure:**
```
notice-fellowship/
├── notice-fellowship.html
└── css/
    └── main.css
```

### Problem: Mobile layout not working

**Check responsive breakpoints:**
```css
@media screen and (max-width: 768px) {
    /* Mobile styles should be here */
}
```

**Test in browser:**
1. Open Developer Tools (F12)
2. Click device icon for responsive view
3. Select different device sizes

### Problem: Images not loading

**Solutions:**
1. **Check image URL:** Copy URL to browser to verify it works
2. **Check for HTTPS:** Ensure URLs start with `https://`
3. **Check for typos:** URLs are case-sensitive
4. **Check quotation marks:** Ensure proper quotes around URLs

### Problem: Colors look wrong

**Solution:** Check CSS variables are defined:
```css
:root {
    --notice-yellow: #fbc516;
    --notice-accent: var(--notice-yellow);
}
```

All colors should reference these variables:
```css
/* Good */
color: var(--notice-accent);

/* Avoid */
color: #fbc516;
```

---

## Best Practices

### 1. Always Use CSS Variables
```css
/* Good ✓ */
padding: var(--spacing-lg);
color: var(--notice-accent);

/* Avoid ✗ */
padding: 24px;
color: #fbc516;
```

### 2. Maintain Consistent Naming
```html
<!-- Follow existing patterns -->
<div class="fellow-card">      <!-- Not: fellowCard or FellowCard -->
<section class="notice-essays"> <!-- Not: essays or essaysSection -->
```

### 3. Test Responsively
Always test changes on:
- Desktop (>1024px)
- Tablet (768px-1024px)
- Mobile (<768px)

### 4. Comment Complex Code
```javascript
// Calculate scroll percentage for progress indicator
const scrollPercent = (scrollTop / docHeight) * 100;
```

### 5. Keep Accessibility in Mind
```html
<!-- Always include alt text -->
<img src="..." alt="Description of image">

<!-- Use semantic HTML -->
<nav>, <section>, <article>, <header>, <footer>

<!-- Include aria-labels for interactive elements -->
<button aria-label="Previous essay">...</button>
```

---

## Quick Reference

### File Paths
- CSS: `css/main.css`
- JavaScript: `js/main.js`
- HTML: `notice-fellowship.html`

### Key Selectors
| Selector | Purpose |
|----------|---------|
| `.notice-nav` | Sidebar navigation |
| `.notice-intro` | Hero section |
| `.fellows-grid` | Fellows photo grid |
| `.essay-card` | Essay carousel cards |
| `.modal-content` | Pop-up windows |
| `.scroll-progress-indicator` | Yellow progress bar |

### Color Variables
| Variable | Default | Usage |
|----------|---------|-------|
| `--notice-yellow` | `#fbc516` | Brand color |
| `--notice-black` | `#1a1919` | Background |
| `--notice-grey` | `#808285` | Secondary text |
| `--notice-white` | `#ffffff` | Primary text |
| `--notice-accent` | `var(--notice-yellow)` | Highlights |

### Spacing Scale
| Variable | Value | Pixels |
|----------|-------|--------|
| `--spacing-xs` | `0.25rem` | 4px |
| `--spacing-sm` | `0.5rem` | 8px |
| `--spacing-md` | `1rem` | 16px |
| `--spacing-lg` | `1.5rem` | 24px |
| `--spacing-xl` | `2rem` | 32px |
| `--spacing-2xl` | `3rem` | 48px |
| `--spacing-3xl` | `4rem` | 64px |

---

## Need Help?

### Browser Developer Tools
- **Windows:** Press F12
- **Mac:** Press Cmd+Option+I

**Useful tabs:**
- **Elements:** Inspect HTML/CSS
- **Console:** See JavaScript errors
- **Network:** Check if files are loading

### Testing Changes
1. Make change to code
2. Save file
3. Refresh browser (Ctrl+R or Cmd+R)
4. If no change, try hard refresh (Ctrl+F5 or Cmd+Shift+R)

### Finding Code
Use browser's "Find" feature:
- **Windows:** Ctrl+F
- **Mac:** Cmd+F

Search for:
- Class names (`.fellow-card`)
- IDs (`#essaysCarousel`)
- Text content

---

## Version History

**v1.0** - Initial organized structure
- Separated CSS and JavaScript from HTML
- Created component-based architecture
- Implemented responsive design
- Added comprehensive documentation

---

**Last Updated:** October 30, 2025

**Questions?** This README should cover most scenarios. If you need to make a change that isn't documented here, look for similar existing code and follow the same pattern.


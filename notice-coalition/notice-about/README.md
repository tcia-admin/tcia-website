# Notice Coalition About Page - Complete Documentation

## Table of Contents
1. [Overview](#overview)
2. [File Structure](#file-structure)
3. [How to Make Common Changes](#how-to-make-common-changes)
4. [CSS Architecture Explained](#css-architecture-explained)
5. [JavaScript Functionality](#javascript-functionality)
6. [HTML Structure Guide](#html-structure-guide)
7. [Design System Reference](#design-system-reference)
8. [Responsive Design](#responsive-design)
9. [Troubleshooting](#troubleshooting)
10. [Advanced Customization](#advanced-customization)

---

## Overview

The Notice Coalition About Page is a single-page website that showcases the Notice Coalition organization, their team, and provides ways to connect with them. The page is built with clean, modern HTML, CSS, and minimal JavaScript for smooth scrolling functionality.

**Key Features:**
- Fixed navigation bar with smooth scrolling to page sections
- Hero section with full-width background image
- Team showcase with hover effects that reveal member photos
- Fully responsive design (works on desktop, tablet, and mobile)
- Social media integration
- Newsletter section

---

## File Structure

```
notice-about/
├── notice-about.html          # Main HTML file
├── css/
│   └── main.css              # All styling (657 lines)
└── js/
    └── main.js               # Smooth scroll functionality (31 lines)
```

**External Dependencies:**
- Font Awesome icons (loaded automatically from CDN)
- Roboto font (loaded automatically from Google Fonts)

---

## How to Make Common Changes

### 1. Changing Colors

All colors are defined at the top of `css/main.css` using CSS variables. This means you only need to change them in ONE place and they'll update everywhere.

**Location:** Lines 35-46 in `main.css`

```css
/* Brand Colors */
--notice-yellow: #fbc516;     /* Main accent color (yellow) */
--notice-black: #1a1919;      /* Primary background color */
--notice-grey: #808285;       /* Secondary text and borders */
--notice-white: #ffffff;      /* Primary text color */
```

**Example - Change the yellow to orange:**
```css
--notice-yellow: #ff6600;
```

This will update:
- All button colors
- Navigation hover effects
- Section title colors
- Team section title colors
- Border accents

### 2. Adding a New Team Member

**Location:** Lines 62-150 in `notice-about.html`

**Template to copy:**
```html
<div class="team-member">
    <div class="member-image-modal">
        <img src="YOUR_IMAGE_URL_HERE" alt="MEMBER_NAME">
    </div>
    <h4 class="member-name">MEMBER_NAME</h4>
    <p class="member-role">MEMBER_ROLE</p>
</div>
```

**Step-by-step:**
1. Find the section where you want to add the member (Leadership Team or Interns)
2. Copy the entire `<div class="team-member">...</div>` block
3. Paste it after an existing team member
4. Replace:
   - `YOUR_IMAGE_URL_HERE` with the image URL
   - `MEMBER_NAME` with their name (appears twice)
   - `MEMBER_ROLE` with their role/title

**Example - Adding a new intern:**
```html
<div class="team-member">
    <div class="member-image-modal">
        <img src="https://example.com/photos/jane-doe.jpg" alt="Jane Doe">
    </div>
    <h4 class="member-name">Jane Doe</h4>
    <p class="member-role">Research Intern</p>
</div>
```

### 3. Updating Navigation Links

**Location:** Lines 14-22 in `notice-about.html`

**Structure:**
```html
<a href="#section-id">Link Text</a>  <!-- Internal link (same page) -->
<a href="/page-url">Link Text</a>    <!-- External link (different page) -->
```

**Example - Adding a new navigation link to a section on the same page:**
```html
<a href="#contact">Contact Us</a>
```

Then add an `id` to the section you want to link to:
```html
<section class="notice-contact" id="contact">
```

### 4. Changing the Hero Background Image

**Location:** Line 202 in `main.css`

```css
.notice-intro {
    background-image: url('YOUR_NEW_IMAGE_URL_HERE');
}
```

**Best Practices:**
- Use high-resolution images (at least 1920px wide)
- Ensure good contrast between the image and white text
- Image should be at least 1MB but less than 3MB for optimal loading

### 5. Updating the Hero Text

**Location:** Lines 33-35 in `notice-about.html`

```html
<h1 class="intro-catchphrase">
    LEARN ABOUT NOTICE COALITION  <!-- Change this text -->
</h1>
```

### 6. Updating Social Media Links

**Location:** Lines 162-181 in `notice-about.html`

**Template:**
```html
<a href="YOUR_SOCIAL_LINK" target="_blank" rel="noopener noreferrer" class="social-icon">
    <i class="fa-brands fa-ICON-NAME"></i>  <!-- For Font Awesome icons -->
</a>
```

**Finding Font Awesome Icon Names:**
1. Go to https://fontawesome.com/icons
2. Search for the social media platform
3. Use the icon name like: `fa-brands fa-facebook` or `fa-brands fa-instagram`

### 7. Changing Spacing and Sizes

All spacing is defined using CSS variables at the top of `main.css` (lines 3-11).

**Default Spacing Scale:**
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

**Font Size Scale:**
```css
--font-size-xs: 0.75rem;   /* 12px */
--font-size-sm: 0.875rem;  /* 14px */
--font-size-med: 1rem;     /* 16px */
--font-size-base: 1.25rem; /* 20px */
--font-size-lg: 1.125rem;  /* 18px */
--font-size-xl: 1.25rem;   /* 20px */
--font-size-2xl: 1.5rem;   /* 24px */
--font-size-3xl: 2rem;     /* 32px */
--font-size-4xl: 2.5rem;   /* 40px */
--font-size-8xl: 4.5rem;   /* 72px */
--font-size-12xl: 6rem;    /* 96px */
```

**Example - Make all text slightly larger:**
Increase the base values by 10-20%

---

## CSS Architecture Explained

### CSS Variables (Custom Properties)

The entire design system is built on CSS variables, which act like global settings that can be changed in one place.

**Why use CSS variables?**
- Change colors site-wide with one edit
- Maintain consistency across all elements
- Easier to customize and maintain
- Better for theming

**How they work:**
```css
/* STEP 1: Define the variable (lines 2-60 in main.css) */
:root {
    --notice-yellow: #fbc516;
}

/* STEP 2: Use the variable anywhere in your CSS */
.button {
    background-color: var(--notice-yellow);
}

/* STEP 3: Change it once, updates everywhere */
:root {
    --notice-yellow: #ff6600;  /* Now all yellow elements are orange! */
}
```

### Box Model and Layout

**Every element on the page is a box with:**
```
┌─────────────────────────────┐
│  Margin (transparent)       │  ← Space outside the element
│  ┌───────────────────────┐  │
│  │  Border               │  │  ← Visible border (optional)
│  │  ┌─────────────────┐  │  │
│  │  │  Padding        │  │  │  ← Space inside the element
│  │  │  ┌───────────┐  │  │  │
│  │  │  │  Content  │  │  │  │  ← The actual content
│  │  │  └───────────┘  │  │  │
│  │  └─────────────────┘  │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

**Example from the team member cards:**
```css
.team-member {
    padding: var(--spacing-lg);        /* Space inside the card */
    border-radius: 8px;                /* Rounded corners */
    background-color: rgba(128, 130, 133, 0.1);  /* Light grey background */
}
```

### CSS Grid Layout

The page uses CSS Grid for responsive layouts, particularly for the team section and about section.

**How Grid Works:**

```css
/* Container becomes a grid */
.team-grid {
    display: grid;                         /* Activate grid layout */
    grid-template-columns: repeat(3, 1fr); /* 3 equal columns */
    gap: var(--spacing-xl);                /* Space between items */
}
```

**Visual representation:**
```
┌─────────┐  ┌─────────┐  ┌─────────┐
│ Item 1  │  │ Item 2  │  │ Item 3  │
└─────────┘  └─────────┘  └─────────┘
┌─────────┐  ┌─────────┐  ┌─────────┐
│ Item 4  │  │ Item 5  │  │ Item 6  │
└─────────┘  └─────────┘  └─────────┘
```

**Mobile layout (lines 633-635):**
```css
@media screen and (max-width: 768px) {
    .team-grid {
        grid-template-columns: 1fr;  /* 1 column on mobile */
    }
}
```

Mobile view:
```
┌───────────┐
│  Item 1   │
└───────────┘
┌───────────┐
│  Item 2   │
└───────────┘
┌───────────┐
│  Item 3   │
└───────────┘
```

### Flexbox Layout

Flexbox is used for the navigation and other horizontal layouts.

**Example - Navigation container:**
```css
.nav-container {
    display: flex;                  /* Activate flexbox */
    align-items: center;            /* Vertically center items */
    justify-content: space-between; /* Spread items apart */
}
```

**Visual:**
```
┌────────────────────────────────────────┐
│ [Logo]              [Nav Links]   [CTA]│
└────────────────────────────────────────┘
```

### Position: Fixed (Navigation Bar)

The navigation bar stays at the top of the screen when scrolling.

**How it works (lines 103-112):**
```css
.notice-nav {
    position: fixed;   /* Removes from normal flow, stays in place */
    top: 0;           /* Stick to top of viewport */
    left: 0;          /* Stick to left of viewport */
    width: 100%;      /* Full width */
    z-index: 1000;    /* Appear above other content */
}
```

**Important:** When you use `position: fixed`, the element is removed from the normal document flow, so you need to add top padding to the content below it to prevent overlap.

### Hover Effects

**Team Member Card Hover Effect (lines 587-589):**
```css
.team-member:hover {
    transform: translateY(-4px);  /* Move up 4 pixels */
}
```

**Team Member Image Modal (lines 604-630):**

The image modal is hidden by default and appears on hover:

```css
/* Default state - hidden and scaled down */
.member-image-modal {
    position: absolute;         /* Position relative to parent */
    top: -150px;               /* Position above the card */
    transform: translateX(-50%) scale(0);  /* Center and hide */
    opacity: 0;                /* Fully transparent */
    transition: transform 0.3s ease, opacity 0.3s ease;  /* Smooth animation */
}

/* Hover state - visible and full size */
.team-member:hover .member-image-modal {
    transform: translateX(-50%) scale(1);  /* Center and show */
    opacity: 1;                            /* Fully visible */
}
```

**What this creates:**
1. Hover over a team member card
2. A circular image pops up above the card
3. Fades and scales in smoothly over 0.3 seconds
4. Disappears when you move your mouse away

### Transitions and Animations

**Syntax:**
```css
transition: property duration timing-function;
```

**Examples:**
```css
/* Smooth color change over 0.2 seconds */
transition: color 0.2s ease;

/* Multiple properties */
transition: transform 0.3s ease, opacity 0.3s ease;

/* All properties */
transition: all 0.3s ease;
```

**Timing functions:**
- `ease` - Slow start, fast middle, slow end (most natural)
- `linear` - Constant speed
- `ease-in` - Slow start
- `ease-out` - Slow end
- `ease-in-out` - Slow start and end

---

## JavaScript Functionality

### Smooth Scroll to Sections

The JavaScript file (`js/main.js`) contains 31 lines of code that handle smooth scrolling when clicking navigation links.

**How it works - Step by Step:**

**1. Wait for the page to load (line 1)**
```javascript
document.addEventListener('DOMContentLoaded', function() {
    // Code runs after HTML is fully loaded
});
```

**2. Find all navigation links (line 3)**
```javascript
const navLinks = document.querySelectorAll('.nav-links a');
```
- `querySelectorAll` finds ALL elements matching the selector
- Returns a list of all `<a>` tags inside `.nav-links`

**3. Add click listeners to each link (line 6)**
```javascript
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        // Code runs when link is clicked
    });
});
```

**4. Check if it's an internal link (line 8)**
```javascript
if (this.getAttribute('href').startsWith('#')) {
    e.preventDefault();  // Stop normal link behavior
    // ...
}
```
- Internal links start with `#` (like `#about`, `#team`)
- `preventDefault()` stops the page from jumping immediately

**5. Find the target section (lines 11-13)**
```javascript
const targetId = this.getAttribute('href').substring(1);  // Remove the #
const targetSection = document.getElementById(targetId);
```
- If href is `#about`, targetId becomes `about`
- Then finds the element with `id="about"`

**6. Calculate the scroll position (lines 16-20)**
```javascript
const navHeight = document.querySelector('.notice-nav').offsetHeight;
const targetPosition = targetSection.getBoundingClientRect().top 
                     + window.pageYOffset 
                     - navHeight;
```

**Why subtract navHeight?**
The navigation bar is fixed at the top and covers content. If we scrolled directly to the section, it would be hidden behind the nav bar. So we scroll to a position that's `navHeight` pixels above the section.

**Visual explanation:**
```
WITHOUT adjustment:
┌─────────────────┐
│   [NAV BAR]     │ ← Fixed, covers content
├─────────────────┤
│ ████████████    │ ← Section is hidden!
│ ABOUT SECTION   │
└─────────────────┘

WITH adjustment:
┌─────────────────┐
│   [NAV BAR]     │ ← Fixed
├─────────────────┤
│                 │ ← Nice spacing
│ ABOUT SECTION   │ ← Fully visible!
└─────────────────┘
```

**7. Smoothly scroll to the position (lines 23-26)**
```javascript
window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
});
```

**Putting it all together:**

**User Action:** Clicks "About Us" link (`<a href="#about">`)
1. JavaScript catches the click
2. Prevents immediate jump
3. Finds the `#about` section
4. Calculates where to scroll (accounting for fixed nav)
5. Smoothly animates the scroll
6. User sees smooth transition to About section

---

## HTML Structure Guide

### Overall Page Structure

```html
<section class="notice-coalition-main">  ← Main container
    
    <!-- 1. NAVIGATION (Fixed at top) -->
    <nav class="notice-nav">
        ...
    </nav>
    
    <!-- 2. HERO/INTRO (Full screen with background image) -->
    <section class="notice-intro">
        ...
    </section>
    
    <!-- 3. ABOUT US (Two column text) -->
    <section class="notice-aboutus-temp" id="about">
        ...
    </section>
    
    <!-- 4. TEAM (Grid of team members) -->
    <section class="notice-team" id="team">
        ...
    </section>
    
    <!-- 5. NEWSLETTER -->
    <section class="notice-newsletter">
        ...
    </section>
    
    <!-- 6. SOCIAL MEDIA / FOOTER -->
    <section class="notice-social">
        ...
    </section>
    
</section>
```

### Semantic HTML Elements

**`<section>`** - Groups related content
**`<nav>`** - Navigation links
**`<h1>`, `<h2>`, etc.** - Headings (hierarchy matters!)
**`<p>`** - Paragraphs
**`<a>`** - Links
**`<img>`** - Images
**`<div>`** - Generic container (use when no semantic tag fits)

### Class Naming Convention

The page uses **BEM-inspired naming**:

**Block:** `.notice-nav` (the component)
**Element:** `.nav-links` (part of the component)
**Modifier:** `.nav-cta` (variant of the component)

**Examples:**
```html
<nav class="notice-nav">              <!-- Block -->
    <div class="nav-container">       <!-- Element -->
        <div class="nav-links">       <!-- Element -->
            <a href="#" class="nav-cta">  <!-- Element + Modifier -->
```

**Why this matters:**
- Easy to find related CSS rules
- Clear relationship between elements
- Prevents naming conflicts

### Content Container Pattern

Every major section uses this pattern:

```html
<section class="notice-SECTION-NAME">
    <div class="section-content">
        <!-- Actual content here -->
    </div>
</section>
```

**Why?**
- `.section-content` has max-width and centered margins (line 290-294)
- Content never gets too wide on large screens
- Maintains consistent margins on all screen sizes

```css
.section-content {
    max-width: var(--container-max-width);  /* 1200px */
    margin: 0 auto;                         /* Center it */
    padding: 0 var(--container-padding);    /* Side padding */
}
```

---

## Design System Reference

### Color Palette

| Color | Hex Code | Used For | Variable Name |
|-------|----------|----------|---------------|
| Yellow | `#fbc516` | Buttons, accents, highlights | `--notice-yellow` |
| Black | `#1a1919` | Primary background | `--notice-black` |
| Grey | `#808285` | Secondary text, borders | `--notice-grey` |
| White | `#ffffff` | Primary text | `--notice-white` |
| Dark Grey | `#242424` | Secondary background | `--notice-bg-secondary` |

### Typography

**Font Family:**
- Primary: Roboto (sans-serif)
- Accent: Roboto (in this case, same as primary)

**Font Weights:**
- Regular: 400
- Bold: 700

**Font Size Hierarchy:**

| Element | Variable | Size | Usage |
|---------|----------|------|-------|
| Hero title | `--font-size-8xl` | 72px | Main catchphrase |
| Section titles | `--font-size-3xl` | 32px | Major sections |
| Team section titles | `--font-size-2xl` | 24px | Subsections |
| Body text | `--font-size-base` | 20px | Paragraphs, descriptions |
| Small text | `--font-size-sm` | 14px | Captions, footnotes |

### Spacing System

Uses a **consistent 8-point grid system**:

| Variable | Size | Common Use |
|----------|------|------------|
| `--spacing-xs` | 4px | Tiny gaps |
| `--spacing-sm` | 8px | Small padding |
| `--spacing-md` | 16px | Default spacing |
| `--spacing-lg` | 24px | Medium gaps |
| `--spacing-xl` | 32px | Section padding |
| `--spacing-2xl` | 48px | Large gaps between sections |
| `--spacing-3xl` | 64px | Extra large section padding |
| `--spacing-4xl` | 80px | Massive spacing (rarely used) |

**Why multiples of 8?**
- Creates visual rhythm and consistency
- Easy to calculate (8, 16, 24, 32...)
- Industry standard for design systems

### Button Styles

**Primary Button:**
```css
.notice-btn {
    background-color: var(--notice-yellow);  /* Yellow background */
    color: var(--notice-black);              /* Black text */
    font-weight: var(--font-bold);           /* Bold text */
    padding: var(--spacing-sm) var(--spacing-lg);  /* 8px top/bottom, 24px left/right */
    border-radius: 4px;                      /* Slightly rounded corners */
}
```

**Hover Effect:**
```css
.notice-btn:hover {
    transform: translateY(-2px);  /* Lift up 2px */
}
```

**Outlined Button (CTA in hero):**
```css
.intro-cta-btn {
    background-color: transparent;      /* No background */
    border: 2px solid var(--notice-yellow);  /* Yellow border */
    color: var(--notice-yellow);        /* Yellow text */
}

.intro-cta-btn:hover {
    background-color: var(--notice-yellow);  /* Fill on hover */
    color: var(--notice-black);              /* Invert text color */
}
```

---

## Responsive Design

### Breakpoint Strategy

The page uses **mobile-first responsive design** with three main breakpoints:

| Breakpoint | Width | Target Devices |
|------------|-------|----------------|
| Default | 0-767px | Mobile phones |
| Tablet | 768-1023px | Tablets, small laptops |
| Desktop | 1024px+ | Laptops, desktops, large screens |

### Media Queries Explained

**What is a media query?**
A way to apply different CSS rules based on screen size, device type, or other conditions.

**Basic syntax:**
```css
/* Default styles (mobile) */
.element {
    font-size: 16px;
}

/* Tablet and up */
@media screen and (max-width: 1024px) {
    .element {
        font-size: 18px;
    }
}

/* Desktop */
@media screen and (max-width: 1200px) {
    .element {
        font-size: 20px;
    }
}
```

### Key Responsive Changes

**1. Navigation (lines 452-488)**

**Desktop:**
```
[Logo] ────── [About] [Team] | [Resources] [Events] [Gallery] [Newsletter]
```

**Tablet (1024px and below):**
```
           [About] [Team] | [Resources] [Events] [Gallery] [Newsletter]
```
(Logo hidden to save space)

**Mobile (768px and below):**
```
[Logo]

[About]  [Team]  [Resources]
────────────────────────────
[Events]  [Gallery]  [Newsletter]
```
(Links wrap to multiple lines)

**2. Team Grid**

**Desktop:** 3 columns
```
┌─────┐ ┌─────┐ ┌─────┐
│  1  │ │  2  │ │  3  │
└─────┘ └─────┘ └─────┘
┌─────┐ ┌─────┐ ┌─────┐
│  4  │ │  5  │ │  6  │
└─────┘ └─────┘ └─────┘
```

**Mobile:** 1 column
```
┌───────────┐
│     1     │
└───────────┘
┌───────────┐
│     2     │
└───────────┘
┌───────────┐
│     3     │
└───────────┘
```

**3. About Section (lines 334-355)**

**Desktop:** 2 columns side by side
```
┌───────────────┐  ┌───────────────┐
│   Column 1    │  │   Column 2    │
│               │  │               │
└───────────────┘  └───────────────┘
```

**Mobile:** 1 column stacked
```
┌─────────────────────────┐
│       Column 1          │
│                         │
└─────────────────────────┘
┌─────────────────────────┐
│       Column 2          │
│                         │
└─────────────────────────┘
```

### Testing Responsive Design

**In Chrome DevTools:**
1. Right-click page → Inspect
2. Click device toolbar icon (or press Ctrl+Shift+M / Cmd+Shift+M)
3. Select device or enter custom dimensions
4. Test at: 375px (mobile), 768px (tablet), 1024px (desktop), 1920px (large desktop)

---

## Troubleshooting

### Common Issues and Solutions

#### Issue: Navigation covers content when clicking anchor links

**Problem:** When you click a link like "About Us", the section appears but the top is hidden behind the fixed navigation bar.

**Solution:** The JavaScript file already handles this! It calculates the nav height and scrolls to the correct position. If it's not working:

1. Make sure `js/main.js` is loaded (check browser console for errors)
2. Verify the section has the correct `id` attribute that matches the link's `href`

**Example:**
```html
<!-- Link -->
<a href="#about">About Us</a>

<!-- Section - id must match (without the #) -->
<section id="about">
```

#### Issue: Team member images don't show up on hover

**Problem:** Hovering over team cards doesn't reveal the image modal.

**Checklist:**
1. Is the image URL correct and accessible?
2. Is the HTML structure correct? (Must have `member-image-modal` class)
3. Check browser console for image loading errors

**Test the image URL:**
- Copy the URL from the `src` attribute
- Paste into browser address bar
- If it doesn't load, the URL is broken

#### Issue: Layout breaks on mobile

**Common causes:**
1. **Content is too wide:** Long unbreakable text (like URLs)
   - Solution: Use `word-break: break-word;` in CSS
   
2. **Images overflow:** Images larger than container
   - Solution: Already handled with `max-width: 100%` on images

3. **Fixed widths:** Elements with pixel widths instead of percentages
   - Solution: Use `max-width` instead of `width`, or use `width: 100%`

#### Issue: Colors look different on different screens

**This is usually normal!** Different monitors, brightness settings, and color profiles affect how colors appear. However:

**For consistency:**
- Use hex codes, not color names (e.g., `#fbc516` not `yellow`)
- Test on multiple devices
- Consider color blindness (use tools like Colorblind Web Page Filter)

#### Issue: Changes to CSS don't show up

**Likely causes:**
1. **Browser cache:** Browser is showing old version
   - Solution: Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
   
2. **Wrong file:** Editing local file but page loads from CDN
   - Solution: Check which file the HTML links to (line 2)
   
3. **Typo in CSS:** Syntax error stops CSS from loading
   - Solution: Check browser console for CSS errors

#### Issue: Page loads slowly

**Common causes:**
1. **Large images:** Uncompressed or unnecessarily high resolution
   - Solution: Compress images (use TinyPNG or similar)
   - Target: < 500KB per image
   
2. **Too many external resources:** Multiple CDN calls
   - Solution: Minimize external dependencies
   
3. **No caching:** Browser re-downloads everything each time
   - Solution: Already handled by CDN hosting

---

## Advanced Customization

### Creating a New Section

**Step 1: Add HTML structure**
```html
<section class="notice-NEW-SECTION" id="new-section">
    <div class="section-content">
        <h2 class="section-title">NEW SECTION TITLE</h2>
        <!-- Your content here -->
    </div>
</section>
```

**Step 2: Add CSS styling**
```css
.notice-NEW-SECTION {
    padding: var(--spacing-3xl) 0;
    background-color: var(--notice-bg-primary);
}

/* Add specific styles for your section */
```

**Step 3: Add navigation link (optional)**
```html
<a href="#new-section">New Section</a>
```

The smooth scroll will work automatically!

### Customizing the Team Grid

**Change number of columns:**

**Desktop - 4 columns instead of 3:**
```css
.team-grid {
    grid-template-columns: repeat(4, 1fr);  /* Change 3 to 4 */
}
```

**Different layouts per breakpoint:**
```css
/* Desktop: 4 columns */
.team-grid {
    grid-template-columns: repeat(4, 1fr);
}

/* Tablet: 2 columns */
@media screen and (max-width: 1024px) {
    .team-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Mobile: 1 column */
@media screen and (max-width: 768px) {
    .team-grid {
        grid-template-columns: 1fr;
    }
}
```

### Adding Animations

**Example - Fade in on scroll:**

**HTML:**
```html
<section class="notice-team fade-in">
```

**CSS:**
```css
/* Initial state - hidden */
.fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

/* Visible state */
.fade-in.visible {
    opacity: 1;
    transform: translateY(0);
}
```

**JavaScript:**
```javascript
// Add to js/main.js
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
});

fadeElements.forEach(element => observer.observe(element));
```

### Custom Button Styles

**Create a secondary button:**

**CSS:**
```css
.notice-btn-secondary {
    background-color: transparent;
    color: var(--notice-accent);
    border: 2px solid var(--notice-accent);
    font-family: var(--font-accent);
    font-weight: var(--font-bold);
    padding: var(--spacing-sm) var(--spacing-lg);
    border-radius: 4px;
    transition: all 0.3s ease;
}

.notice-btn-secondary:hover {
    background-color: var(--notice-accent);
    color: var(--notice-black);
    transform: translateY(-2px);
}
```

**HTML:**
```html
<a href="/page" class="notice-btn-secondary">Secondary Action</a>
```

### Accessibility Improvements

**1. Add focus styles for keyboard navigation:**
```css
.nav-links a:focus,
.notice-btn:focus {
    outline: 3px solid var(--notice-accent);
    outline-offset: 2px;
}
```

**2. Add skip-to-content link:**

**HTML (add at very top of body):**
```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

**CSS:**
```css
.skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--notice-accent);
    color: var(--notice-black);
    padding: 8px;
    z-index: 10000;
}

.skip-link:focus {
    top: 0;
}
```

**3. Add ARIA labels:**
```html
<nav class="notice-nav" aria-label="Main navigation">
<section class="notice-team" id="team" aria-labelledby="team-title">
    <h2 id="team-title" class="section-title">OUR TEAM</h2>
</section>
```

### Dark Mode Toggle

**If you wanted to add a dark mode option:**

**HTML:**
```html
<button id="theme-toggle" class="notice-btn">Toggle Dark Mode</button>
```

**CSS (add to main.css):**
```css
/* Light mode (default) */
:root {
    --notice-bg-primary: #1a1919;
    --notice-text-primary: #ffffff;
}

/* Dark mode */
:root[data-theme="dark"] {
    --notice-bg-primary: #000000;
    --notice-text-primary: #e0e0e0;
}
```

**JavaScript (add to main.js):**
```javascript
document.getElementById('theme-toggle').addEventListener('click', function() {
    const root = document.documentElement;
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', newTheme);
    
    // Save preference
    localStorage.setItem('theme', newTheme);
});

// Load saved preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
}
```

---

## Quick Reference Cheat Sheet

### Most Common Tasks

| Task | File | Line(s) | What to Change |
|------|------|---------|----------------|
| Change accent color | `main.css` | 36 | `--notice-yellow: #fbc516;` |
| Add team member | `notice-about.html` | 70-76 | Copy and edit team member block |
| Update hero text | `notice-about.html` | 34 | Text inside `<h1>` |
| Change hero image | `main.css` | 202 | `background-image: url(...)` |
| Add nav link | `notice-about.html` | 14-22 | Add `<a href="...">` |
| Update social links | `notice-about.html` | 162-181 | Edit `<a href="...">` |
| Change grid columns | `main.css` | 574 | `repeat(3, 1fr)` → change number |
| Update spacing | `main.css` | 3-11 | Change spacing variable values |

### CSS Selector Quick Reference

| Selector | Meaning | Example |
|----------|---------|---------|
| `.class` | Elements with class | `.team-member` |
| `#id` | Element with specific id | `#about` |
| `element` | All elements of type | `nav`, `section`, `a` |
| `.class1 .class2` | `.class2` inside `.class1` | `.nav-container .nav-links` |
| `.class1.class2` | Element with both classes | `.notice-btn.intro-cta-btn` |
| `.class:hover` | When hovering over element | `.team-member:hover` |
| `@media (max-width: 768px)` | Styles for screens ≤768px | Mobile styles |

### Common CSS Properties

| Property | Purpose | Example Values |
|----------|---------|----------------|
| `color` | Text color | `#fbc516`, `var(--notice-yellow)` |
| `background-color` | Background color | `#1a1919`, `transparent` |
| `font-size` | Text size | `16px`, `1rem`, `var(--font-size-lg)` |
| `padding` | Inner spacing | `16px`, `1rem 2rem` |
| `margin` | Outer spacing | `0 auto`, `1rem 0` |
| `display` | Layout type | `flex`, `grid`, `block` |
| `position` | Position type | `fixed`, `absolute`, `relative` |
| `opacity` | Transparency | `0` (invisible) to `1` (solid) |
| `transform` | Visual transformation | `translateY(-4px)`, `scale(1.1)` |
| `transition` | Animation speed | `all 0.3s ease` |

---

## Getting Help

### Before Asking for Help

1. **Check the browser console:**
   - Right-click → Inspect → Console tab
   - Look for error messages in red
   
2. **Test in a different browser:**
   - Some issues are browser-specific
   
3. **Clear cache and try again:**
   - Hard refresh: Ctrl+Shift+R (Windows) / Cmd+Shift+R (Mac)
   
4. **Undo recent changes:**
   - If it worked before, what did you change?

### Useful Resources

**Learning HTML/CSS:**
- MDN Web Docs: https://developer.mozilla.org/
- CSS Tricks: https://css-tricks.com/
- W3Schools: https://www.w3schools.com/

**Testing and Debugging:**
- Chrome DevTools Guide: https://developer.chrome.com/docs/devtools/
- Can I Use (browser support): https://caniuse.com/
- Color contrast checker: https://webaim.org/resources/contrastchecker/

**Design Resources:**
- Color palette generator: https://coolors.co/
- Google Fonts: https://fonts.google.com/
- Font Awesome icons: https://fontawesome.com/

---

## Version History

**Version 1.0** - Initial documentation
- Complete code explanation
- Common tasks guide
- Troubleshooting section

---

## Credits

**Design System:** Notice Coalition branding
**Fonts:** Google Fonts (Roboto)
**Icons:** Font Awesome
**Development:** TCIA Team

---

**Last Updated:** October 30, 2025

**Questions?** If this documentation doesn't answer your question, please contact the development team with:
1. What you're trying to do
2. What you've already tried
3. Screenshots of any errors
4. Which browser and device you're using

---

**Made with ❤️ for the Notice Coalition**

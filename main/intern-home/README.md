# Intern Home Page - Complete Documentation

## Table of Contents
1. [Overview](#overview)
2. [File Structure](#file-structure)
3. [CSS Architecture](#css-architecture)
   - [CSS Variables (Design Tokens)](#css-variables-design-tokens)
   - [Page Sections](#page-sections)
   - [Responsive Design](#responsive-design)
4. [JavaScript Functionality](#javascript-functionality)
5. [Common Modifications Guide](#common-modifications-guide)
6. [Component Details](#component-details)
7. [Troubleshooting](#troubleshooting)

---

## Overview

The Intern Home page (`internships.html`) is a single-page application that showcases TCIA's internship program. It features:
- **Hero section** with call-to-action buttons
- **Sticky navigation** that highlights the current section
- **Tabbed content** for program information
- **FAQ accordion** for common questions
- **Application cards** linking to internship positions

The page is built with vanilla HTML, CSS, and JavaScript for maximum compatibility and performance.

---

## File Structure

```
intern-home/
├── internships.html    # Main HTML structure
├── css/
│   └── main.css       # All styling and responsive design
├── js/
│   └── main.js        # Interactive functionality
└── README.md          # This file
```

**External Dependencies:**
- None! The page uses pure vanilla JavaScript and CSS.

---

## CSS Architecture

### CSS Variables (Design Tokens)

All design values are stored as CSS variables in the `:root` selector (lines 2-90 in `main.css`). This makes the page easy to customize.

#### **Spacing Variables**
Control all gaps, margins, and padding throughout the page:

```css
--spacing-xs: 0.25rem;    /* 4px - tiny gaps */
--spacing-sm: 0.5rem;     /* 8px - small spacing */
--spacing-md: 1rem;       /* 16px - medium spacing */
--spacing-lg: 1.5rem;     /* 24px - large spacing */
--spacing-xl: 2rem;       /* 32px - extra large */
--spacing-2xl: 3rem;      /* 48px - section padding */
--spacing-3xl: 4rem;      /* 64px - major sections */
--spacing-4xl: 5rem;      /* 80px - hero spacing */
```

**Example:** To increase space between sections, change `--spacing-4xl` from `5rem` to `6rem`.

#### **Color Variables**

**TCIA Brand Colors:**
```css
--tcia-red: #ec1a3c;      /* Primary accent - borders, hover states */
--tcia-yellow: #f3b54a;   /* Interactive elements, highlights */
--tcia-green: #01752d;    /* (Available but not currently used) */
--tcia-teal: #02a69e;     /* (Available but not currently used) */
--tcia-navy: #061531;     /* Main background color */
--tcia-white: #f4f4f4;    /* Text color, light backgrounds */
```

**NOTICE Brand Colors:**
```css
--notice-yellow: #fbc516; /* NOTICE accent color */
--notice-black: #1a1919;  /* (Available) */
--notice-grey: #808285;   /* (Available) */
```

**Background Tint Options** (for subtle section backgrounds):
```css
--tcia-bg-navy-10: #e8eaef;     /* Light navy tint */
--tcia-bg-teal-10: #e6f5f4;     /* Light teal tint */
--tcia-bg-yellow-10: #fef8ed;   /* Light yellow tint */
--tcia-bg-yellow-20: #fdf1db;   /* Used in apply section */
```

#### **Typography Variables**

**Font Families:**
```css
--font-headline: "Interstate Condensed Bold"  /* Large titles (h1, h2, h3) */
--font-body: "Interstate Condensed Regular"   /* Body text, paragraphs */
--font-alt-bold: "Neuzeit Grotesk Bold"      /* Subtitles, emphasis */
--font-alt-regular: "Neuzeit Grotesk Regular" /* Navigation, labels */
--font-notice-primary: 'Roboto'              /* NOTICE branding */
```

**Font Sizes:**
```css
--font-size-xs: 0.75rem;    /* 12px - tiny text */
--font-size-sm: 0.875rem;   /* 14px - small text, nav items */
--font-size-med: 1rem;      /* 16px - base size */
--font-size-base: 1.25rem;  /* 20px - body text */
--font-size-lg: 1.125rem;   /* 18px - descriptions */
--font-size-xl: 1.25rem;    /* 20px - subheadings */
--font-size-2xl: 1.5rem;    /* 24px - section subtitles */
--font-size-3xl: 2rem;      /* 32px - section labels */
--font-size-4xl: 2.5rem;    /* 40px - section titles */
--font-size-8xl: 4.5rem;    /* 72px - (available) */
--font-size-12xl: 6rem;     /* 96px - hero title */
```

**Responsive Breakpoints:**
```css
--mobile: 480px;   /* Small phones */
--tablet: 768px;   /* Tablets and small laptops */
--desktop: 1024px; /* Desktop screens */
```

---

### Page Sections

Each section has distinct styling. Here's how they work:

#### **1. Hero Section** (`.hero-section`)
**Location:** Lines 124-152 in `main.css`

The hero is a full-screen welcome banner with:
- **Background image** with dark overlay
- **Flexbox centering** for content
- **Minimum height** of 80vh (80% of viewport height)

```css
.hero-section {
    min-height: 80vh;
    background: linear-gradient(rgba(6, 21, 49, 0.3), rgba(6, 21, 49, 0.3)),
                url('YOUR_IMAGE_URL');
    background-size: cover;        /* Image fills container */
    background-position: center;   /* Centers the image */
    display: flex;
    flex-direction: column;        /* Stack items vertically */
    align-items: center;           /* Center horizontally */
    justify-content: center;       /* Center vertically */
}
```

**How to change the hero background:**
1. Replace the URL in line 127 of `main.css`
2. Adjust the overlay darkness by changing `rgba(6, 21, 49, 0.3)` - the last number (0.3) controls opacity (0 = transparent, 1 = fully dark)

#### **2. CTA Buttons** (`.cta-button`)
**Location:** Lines 160-178 in `main.css`

Call-to-action buttons with hover effects:

```css
.cta-button {
    width: 200px;
    height: 80px;
    background: var(--tcia-white);
    border-radius: 8px;
    transition: transform 0.3s ease;  /* Smooth animation */
}

.cta-button:hover {
    transform: translateY(-5px);  /* Moves up 5px on hover */
}
```

**The `.notice-disabled` modifier** (lines 720-752) adds:
- Lower opacity (70%)
- Disabled cursor
- Tooltip on hover showing "No Current NOTICE Openings"

#### **3. Sticky Navigation** (`.nav-section`)
**Location:** Lines 212-273 in `main.css`

The navigation sticks to the top when scrolling:

```css
.nav-section {
    position: sticky;    /* Stays at top when scrolling */
    top: 0;             /* Distance from top */
    z-index: 100;       /* Appears above other content */
}
```

**Underline animation** on nav links (lines 259-273):
```css
.nav-links a::after {
    content: '';
    position: absolute;
    bottom: -2px;
    width: 0;                          /* Starts with no width */
    height: 2px;
    background-color: var(--tcia-yellow);
    transition: width 0.3s ease;       /* Animates width change */
}

.nav-links a:hover::after {
    width: 100%;                       /* Expands to full width */
}
```

#### **4. Back to Top Button** (`.back-to-top`)
**Location:** Lines 276-300 in `main.css`

A floating button that appears when scrolling down:

```css
.back-to-top {
    position: fixed;           /* Stays in place when scrolling */
    bottom: 2rem;
    right: 2rem;
    opacity: 0;               /* Hidden by default */
    transition: opacity 0.3s ease;
}

.back-to-top.visible {
    opacity: 1;               /* Shown via JavaScript */
}
```

The JavaScript adds the `.visible` class when you scroll more than 300px down.

#### **5. Program Section Tabs** (`.program-section`)
**Location:** Lines 348-465 in `main.css`

Tab-based content switcher:

```css
.program-content {
    display: none;           /* Hidden by default */
}

.program-content.active {
    display: grid;           /* Shown when active */
    grid-template-columns: 1fr 1fr;  /* Two equal columns */
    gap: var(--spacing-4xl);
}
```

**Tab indicator** (lines 386-394):
```css
.program-nav-item.active::after {
    content: '';
    position: absolute;
    bottom: -1px;
    width: 100%;
    height: 2px;
    background-color: var(--tcia-yellow);  /* Yellow underline */
}
```

#### **6. FAQ Accordion** (`.faq-section`)
**Location:** Lines 467-534 in `main.css`

Expandable question/answer pairs:

```css
.faq-answer {
    display: none;           /* Hidden by default */
}

.faq-item.active .faq-answer {
    display: block;          /* Shown when item is active */
}

.faq-toggle {
    transition: transform 0.3s ease;
}

.faq-item.active .faq-toggle {
    transform: rotate(45deg);  /* "+" becomes "×" when active */
}
```

#### **7. Apply Section Cards** (`.apply-section`)
**Location:** Lines 536-607 in `main.css`

Two-column grid of application cards:

```css
.apply-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);  /* 2 equal columns */
    gap: var(--spacing-2xl);
}
```

**Card hover effects:**
```css
.apply-card.tcia-card:hover {
    transform: translateY(-4px);                    /* Lifts up */
    background-color: rgba(236, 26, 60, 0.05);     /* Subtle red tint */
    box-shadow: 0 4px 12px rgba(236, 26, 60, 0.1); /* Shadow appears */
}
```

The `.notice-card` has minimal hover effect since it's currently disabled.

---

### Responsive Design

The page has **three responsive breakpoints**:

#### **Tablet (768px and below)**
**Location:** Lines 610-672 in `main.css`

Changes:
- Hero title shrinks from 96px → 40px
- CTA buttons stack vertically
- Decorative lines hidden
- Program content switches to single column
- Navigation wraps to multiple lines
- Apply cards stack vertically

```css
@media screen and (max-width: 768px) {
    .hero-title {
        font-size: var(--font-size-4xl);  /* Smaller on mobile */
    }
    
    .program-content.active {
        grid-template-columns: 1fr;  /* Single column */
    }
}
```

#### **Small Mobile (480px and below)**
**Location:** Lines 674-710 in `main.css`

Additional changes:
- Hero title shrinks further to 32px
- Navigation becomes vertical
- Back to top button moves closer to edge
- All text sizes reduce

---

## JavaScript Functionality

The JavaScript (`js/main.js`) adds all interactive features. Here's how each part works:

### **1. Update Internship Links** (Lines 2-9)

```javascript
const INTERNSHIP_SEARCH_URL = '/internship-search';

document.querySelectorAll('.cta-button, .apply-card').forEach(link => {
    link.href = INTERNSHIP_SEARCH_URL;
    link.target = "_blank";
});
```

**What it does:**
- Finds all CTA buttons and apply cards
- Updates their `href` to point to the internship search page
- Opens links in a new tab (`target="_blank"`)

**How to change the URL:**
Simply modify line 3:
```javascript
const INTERNSHIP_SEARCH_URL = '/your-new-url';
```

### **2. Smooth Scrolling** (Lines 11-18)

```javascript
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();                              // Stop normal link behavior
        const section = document.querySelector(this.getAttribute('href'));
        section.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to section
    });
});
```

**What it does:**
- Finds all navigation links
- When clicked, smoothly scrolls to the target section instead of jumping

**How it works:**
1. `e.preventDefault()` stops the normal jump behavior
2. Gets the `href` attribute (e.g., `#internships`)
3. Finds the element with that ID
4. Scrolls to it smoothly

### **3. Back to Top Button Visibility** (Lines 20-28)

```javascript
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {           // If scrolled more than 300px
        backToTop.classList.add('visible');  // Show button
    } else {
        backToTop.classList.remove('visible'); // Hide button
    }
});
```

**What it does:**
- Monitors scroll position
- Shows back-to-top button after scrolling 300px down
- Hides it when near the top

**How to change the threshold:**
Modify line 23:
```javascript
if (window.scrollY > 500) {  // Now appears after 500px
```

### **4. Active Navigation Highlighting** (Lines 30-47)

```javascript
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    // Find which section is currently visible
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 100) {  // 100px offset
            current = section.getAttribute('id');
        }
    });

    // Update nav link styling
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});
```

**What it does:**
- Tracks which section is currently visible
- Highlights the corresponding navigation link
- Updates as you scroll through the page

**How it works:**
1. Gets all sections with IDs
2. Checks which section is currently in view (with 100px offset)
3. Removes `active` class from all nav links
4. Adds `active` class to the link matching the current section

### **5. Tab Switching** (Lines 49-67)

```javascript
document.querySelectorAll('.program-nav-item').forEach(tab => {
    tab.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active from all tabs and content
        document.querySelectorAll('.program-nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelectorAll('.program-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Add active to clicked tab and its content
        tab.classList.add('active');
        const contentId = tab.getAttribute('href');  // e.g., "#who-we-hire"
        document.querySelector(contentId).classList.add('active');
    });
});
```

**What it does:**
- Handles clicking on program tabs (WHO WE HIRE, INTERNSHIP TIMING)
- Shows the corresponding content
- Hides other content

**How it works:**
1. Finds all tab buttons
2. When clicked, removes `active` from all tabs and content
3. Adds `active` to clicked tab
4. Shows the matching content panel

### **6. FAQ Accordion** (Lines 69-85)

```javascript
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Toggle clicked item (only if it wasn't already open)
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});
```

**What it does:**
- Handles clicking FAQ questions
- Opens the clicked question's answer
- Closes all other questions (accordion behavior)

**How it works:**
1. Checks if clicked item was already open
2. Closes all FAQ items
3. Opens clicked item (unless it was already open)
4. The CSS handles showing/hiding answers and rotating the "+" icon

---

## Common Modifications Guide

### **Change Brand Colors**

**Example:** Change the yellow accent to orange

```css
/* In main.css, line 42 */
--tcia-yellow: #ff8c00;  /* Changed from #f3b54a */
```

This will update:
- Navigation highlights
- Section numbers
- Button hover states
- FAQ toggle icons

### **Change Hero Background Image**

```css
/* In main.css, line 127 */
background: linear-gradient(rgba(6, 21, 49, 0.3), rgba(6, 21, 49, 0.3)),
            url('YOUR_NEW_IMAGE_URL_HERE');
```

**Tips:**
- Use high-resolution images (at least 1920px wide)
- Adjust the overlay opacity (the `0.3` value) to make text more readable
- Use `background-position: top` or `bottom` to adjust focal point

### **Add a New FAQ Question**

In `internships.html`, add this inside a `.faq-category`:

```html
<div class="faq-item">
    <button class="faq-question">
        Your question here?
        <span class="faq-toggle">+</span>
    </button>
    <div class="faq-answer">
        <p>Your answer here.</p>
    </div>
</div>
```

No JavaScript changes needed! The event listener automatically finds all `.faq-question` elements.

### **Add a New Program Tab**

**Step 1:** Add navigation item in `internships.html` (line 42):
```html
<a href="#your-new-tab" class="program-nav-item">YOUR TAB NAME</a>
```

**Step 2:** Add content section:
```html
<div id="your-new-tab" class="program-content">
    <div class="program-image">
        <img src="YOUR_IMAGE_URL" alt="Description">
    </div>
    <div class="program-text">
        <h3>YOUR TAB NAME</h3>
        <p>Your content here.</p>
    </div>
</div>
```

No JavaScript changes needed! The tab switcher works with any elements matching the classes.

### **Change When Back-to-Top Button Appears**

```javascript
/* In main.js, line 23 */
if (window.scrollY > 500) {  // Changed from 300 to 500
```

### **Change Spacing Between Sections**

```css
/* In main.css, adjust spacing variables */
--spacing-4xl: 6rem;  /* Increased from 5rem */
```

All sections using `var(--spacing-4xl)` will automatically update.

### **Make Navigation Not Sticky**

```css
/* In main.css, line 213 */
.nav-section {
    position: relative;  /* Changed from sticky */
    /* ... rest stays the same */
}
```

### **Change Font Sizes Globally**

Increase all body text:
```css
/* In main.css, line 27 */
--font-size-lg: 1.25rem;  /* Changed from 1.125rem */
```

Increase hero title:
```css
/* In main.css, line 33 */
--font-size-12xl: 7rem;  /* Changed from 6rem */
```

### **Disable NOTICE Button**

The button is already disabled with the `.notice-disabled` class. To re-enable:

**In HTML (line 13):**
```html
<!-- Remove the notice-disabled class -->
<a href="#notice-positions" class="cta-button">
```

**In JavaScript (line 6):**
The button will automatically get the correct link.

### **Change Link Opening Behavior**

To open links in the same tab instead of new tab:

```javascript
/* In main.js, line 8 */
link.target = "_self";  // Changed from "_blank"
```

---

## Component Details

### **Connecting Lines Decoration**

The decorative lines above the CTA buttons use CSS pseudo-elements:

```css
.connecting-lines::before,
.connecting-lines::after {
    content: '';              /* Creates empty element */
    position: absolute;
    width: 2px;
    height: 30px;
    background: var(--tcia-white);
}

.connecting-lines::before {
    left: 25%;
    transform: rotate(30deg);  /* Angles to the left */
}

.connecting-lines::after {
    right: 25%;
    transform: rotate(-30deg); /* Angles to the right */
}
```

**To remove:** Add `.connecting-lines { display: none; }` to CSS.

### **Custom List Bullets**

Program lists use custom bullets:

```css
.program-list {
    list-style: none;  /* Remove default bullets */
}

.program-list li::before {
    content: "○";                     /* Hollow circle */
    color: var(--tcia-yellow);        /* Yellow color */
    position: absolute;
    left: -20px;                      /* Position to the left */
}
```

**To change the bullet:**
```css
content: "▸";  /* Triangle */
content: "●";  /* Filled circle */
content: "→";  /* Arrow */
```

### **Text Shadow for Readability**

Section labels use text shadows to stand out over backgrounds:

```css
.section-label {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);  /* Shadow for depth */
    -webkit-text-stroke: 0.5px rgba(0, 0, 0, 0.3); /* Subtle outline */
}
```

**Parameters explained:**
- `2px` = horizontal offset
- `2px` = vertical offset  
- `4px` = blur radius
- `rgba(0, 0, 0, 0.5)` = shadow color and opacity

### **Grid Layouts**

The page uses CSS Grid for responsive layouts:

```css
.apply-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);  /* 2 equal columns */
    gap: var(--spacing-2xl);                /* Space between items */
}
```

**To make 3 columns:**
```css
grid-template-columns: repeat(3, 1fr);
```

**To make unequal columns:**
```css
grid-template-columns: 2fr 1fr;  /* Left is twice as wide */
```

---

## Troubleshooting

### **Navigation Links Not Working**

**Symptoms:** Clicking nav links does nothing or jumps weirdly

**Fixes:**
1. Check that JavaScript is loading (open browser console, look for errors)
2. Verify section IDs match navigation hrefs:
   ```html
   <!-- Navigation -->
   <a href="#internships">Internships</a>
   
   <!-- Must match section ID -->
   <section id="internships">
   ```
3. Make sure `defer` attribute is on the script tag

### **Back to Top Button Not Appearing**

**Symptoms:** Button never shows when scrolling

**Fixes:**
1. Check that the element exists in HTML:
   ```html
   <a href="#top" class="back-to-top">↑</a>
   ```
2. Verify JavaScript is running (check console for errors)
3. Try scrolling more than 300px down
4. Check CSS: `.back-to-top.visible` should have `opacity: 1`

### **Tabs Not Switching**

**Symptoms:** Clicking tabs doesn't change content

**Fixes:**
1. Verify tab `href` matches content `id`:
   ```html
   <a href="#who-we-hire" class="program-nav-item">WHO WE HIRE</a>
   <div id="who-we-hire" class="program-content">
   ```
2. Check that content has `program-content` class
3. Check browser console for JavaScript errors

### **FAQ Accordion Not Opening**

**Symptoms:** Clicking questions doesn't show answers

**Fixes:**
1. Verify HTML structure:
   ```html
   <div class="faq-item">
       <button class="faq-question">
           Question text
           <span class="faq-toggle">+</span>
       </button>
       <div class="faq-answer">
           <p>Answer text</p>
       </div>
   </div>
   ```
2. Check that JavaScript is loaded
3. Verify CSS: `.faq-item.active .faq-answer` should have `display: block`

### **Mobile Layout Broken**

**Symptoms:** Page looks wrong on phones/tablets

**Fixes:**
1. Add viewport meta tag to page header (if not in parent template):
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   ```
2. Test at specific widths:
   - Under 768px = tablet styles
   - Under 480px = mobile styles
3. Check browser console for CSS errors

### **Images Not Loading**

**Symptoms:** Broken image icons or missing backgrounds

**Fixes:**
1. Check image URLs are correct and accessible
2. For external images, ensure no CORS issues
3. Check image file formats are supported (JPEG, PNG, WebP, GIF)
4. Verify URLs don't have spaces (use `%20` instead)

### **Hover Effects Not Working**

**Symptoms:** No animations when hovering over elements

**Fixes:**
1. Check CSS transitions are defined:
   ```css
   .element {
       transition: transform 0.3s ease;  /* Required! */
   }
   ```
2. Verify hover styles exist:
   ```css
   .element:hover {
       transform: translateY(-5px);
   }
   ```
3. On touch devices, hover effects won't work (this is normal)

### **Fonts Look Wrong**

**Symptoms:** Text appears in default system fonts

**Fixes:**
1. Check that font files are loaded (if using custom fonts)
2. Verify font-family names are spelled correctly
3. Make sure fallback fonts are specified:
   ```css
   font-family: "Interstate", Arial, sans-serif;  /* Arial is fallback */
   ```

### **Sticky Navigation Not Sticking**

**Symptoms:** Navigation scrolls away instead of staying at top

**Fixes:**
1. Verify CSS:
   ```css
   .nav-section {
       position: sticky;  /* Not fixed! */
       top: 0;
       z-index: 100;
   }
   ```
2. Check that parent element doesn't have `overflow: hidden`
3. On older browsers, use the iOS fix (lines 712-717 in CSS)

### **Colors Look Different Than Expected**

**Symptoms:** Colors don't match the brand guide

**Fixes:**
1. Check `:root` variables are correct (lines 35-73 in CSS)
2. Verify you're using variables, not hardcoded colors:
   ```css
   /* Good */
   color: var(--tcia-yellow);
   
   /* Bad - won't update with theme */
   color: #f3b54a;
   ```
3. Check for `rgba()` overrides that might change colors
4. Verify screen color calibration/color profile

---

## Quick Reference: CSS Class Names

### **Layout Classes**
- `.internships-main` - Main wrapper for entire page
- `.container` - Max-width content wrapper (1200px)

### **Section Classes**
- `.hero-section` - Top banner section
- `.nav-section` - Sticky navigation
- `.internships-section` - Intro section with background image
- `.program-section` - Tabbed content section
- `.faq-section` - FAQ accordion section
- `.apply-section` - Application cards section

### **Component Classes**
- `.cta-button` - Call-to-action button
- `.notice-disabled` - Disabled state for NOTICE button
- `.nav-links` - Navigation link container
- `.nav-number` - Number prefix in nav (01, 02, 03)
- `.back-to-top` - Floating back-to-top button
- `.program-nav-item` - Tab button
- `.program-content` - Tab content panel
- `.faq-item` - Single FAQ item
- `.faq-question` - FAQ question button
- `.faq-answer` - FAQ answer content
- `.faq-toggle` - Plus/minus icon
- `.apply-card` - Application card
- `.tcia-card` - TCIA-specific card styling
- `.notice-card` - NOTICE-specific card styling

### **State Classes** (Added via JavaScript)
- `.active` - Currently selected/visible element
- `.visible` - Element is shown (used for back-to-top button)

---

## Browser Support

This page works on:
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Android)

**Features that may not work on older browsers:**
- CSS Grid (IE11 and below)
- CSS Variables (IE11 and below)
- `position: sticky` (IE11 and below)

For broader support, consider using autoprefixer and CSS Grid polyfills.

---

## Performance Tips

### **Image Optimization**
- Use WebP format when possible (smaller file size)
- Compress images before uploading
- Use appropriate image sizes (don't use 4K images for small elements)

### **Loading Performance**
- The `defer` attribute on the script tag ensures it doesn't block page rendering
- CSS loads in `<head>` for immediate styling
- Images use `loading="lazy"` if needed (not currently implemented)

### **Animation Performance**
- All animations use `transform` and `opacity` (GPU-accelerated)
- Avoid animating `width`, `height`, `margin` (causes reflow)

---

## Need More Help?

If you're stuck after reading this documentation:

1. **Check the browser console** (F12 or Right-click → Inspect) for error messages
2. **Test in a different browser** to rule out browser-specific issues
3. **Validate your HTML** at https://validator.w3.org/
4. **Check CSS specificity** if styles aren't applying as expected

**Common debugging tools:**
- Browser DevTools (F12)
- Console for JavaScript errors
- Elements tab to inspect styles
- Network tab to check if files are loading

---

## Glossary

**Accordion:** A UI pattern where clicking an item expands it and collapses others (like the FAQ section)

**CSS Variables:** Custom properties defined in `:root` that can be reused (e.g., `var(--tcia-yellow)`)

**Flexbox:** A CSS layout method for arranging items in rows or columns

**Grid:** A CSS layout method for creating two-dimensional layouts

**Pseudo-element:** CSS-generated content like `::before` and `::after`

**rem:** A CSS unit relative to root font size (1rem = 16px by default)

**Sticky positioning:** CSS that makes an element stick to the viewport when scrolling

**Transition:** CSS animation between two states (e.g., on hover)

**z-index:** CSS property controlling stack order (higher numbers appear on top)

---

**Last Updated:** November 2025
**Version:** 1.0


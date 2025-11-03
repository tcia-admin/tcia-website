# Book Club - Complete Documentation

## Table of Contents
1. [Overview](#overview)
2. [Common Updates](#common-updates)
3. [Content Management](#content-management)
4. [Customization](#customization)
5. [Technical Details](#technical-details)
6. [Troubleshooting](#troubleshooting)

---

## Overview

The TCIA Book Club page is a comic book-themed website for the Futures Lab Afrofuturist Book Club. It features:
- **Two-page navigation** - Home and Library views
- **Current book display** - Featured book with meeting info
- **Past books showcase** - Books previously discussed
- **Facilitator profile** - Dr. Tanya N. Clark with interactive elements
- **Comic book aesthetics** - Hand-drawn typography and texture overlays

**No dependencies** - Pure HTML, CSS, and JavaScript.

---

## Common Updates

### 1. Update Meeting Date & Time

**Most Common Task** - Do this for each new meeting.

**Location:** Lines 54-65 in `book-club.html`

```html
<div class="comic-panel panel-single" style="background-color: var(--sunshine-yellow); color: var(--sketch-black); text-align: center;">
    <h2 style="font-family: var(--font-title); font-weight: bold; font-size: 2.2rem; margin-bottom: 1rem; color: var(--sketch-black);">
        Next Meeting: October 25th
    </h2>
    <p style="font-size: 1.3rem; font-weight: 600; margin: 0;">
        10am CST / 11am EST via Zoom
    </p>
    <p style="font-size: 1rem; margin-top: 0.5rem;">
        Sign up below to get the Zoom link in your email!
    </p>
</div>
```

**Update These Lines:**
- **Line 57**: Change `October 25th` to your new date
- **Line 60**: Change time/timezone if needed

**Example:**
```html
Next Meeting: November 15th
```

```html
2pm CST / 3pm EST via Zoom
```

---

### 2. Change Current Book

**Do this when starting a new book.**

**Location:** Lines 106-127 in `book-club.html`

```html
<div style="display: flex; gap: 2rem; margin-bottom: 2rem;">
    <div style="flex: 1; text-align: center; background: transparent; padding: 1.5rem;">
        <img src="BOOK_COVER_IMAGE_URL" 
             alt="Book Title" 
             style="max-width: 250px; width: 100%; height: auto; border: 3px solid var(--sketch-black); border-radius: 8px; box-shadow: 0 4px 12px rgba(26, 24, 22, 0.2);">
    </div>

    <div class="comic-panel texture-canvas-grain" style="flex: 2; background-color: var(--canvas-white);">
        <h2 style="font-family: var(--font-title); font-size: 2.2rem; color: var(--peach-accent); margin-bottom: 1rem; font-weight: 700;">
            Current Book: The Ballad of Black Tom
        </h2>
        <h3 style="color: var(--electric-purple); margin-bottom: 1.5rem; font-size: 1.3rem; font-weight: 600;">
            by Victor LaValle
        </h3>
        <div style="background: var(--electric-purple); color: var(--canvas-white); padding: 1rem; border-radius: 8px; margin-top: 1rem;">
            <p style="margin: 0; font-weight: 600; text-align: center;">
                Get ready for our October 25th discussion!
            </p>
        </div>
    </div>
</div>
```

**Update These Parts:**

1. **Line 109**: Change image URL
   ```html
   <img src="https://your-image-url.com/book-cover.jpg"
   ```

2. **Line 110**: Change alt text
   ```html
   alt="New Book Title"
   ```

3. **Line 115**: Change book title
   ```html
   Current Book: Your New Book Title
   ```

4. **Line 117**: Change author name
   ```html
   by Author Name
   ```

5. **Line 121**: Update meeting date
   ```html
   Get ready for our November 15th discussion!
   ```

**Complete Example:**
```html
<img src="https://images.example.com/kindred-cover.jpg" 
     alt="Kindred by Octavia Butler">
```
```html
Current Book: Kindred
```
```html
by Octavia E. Butler
```
```html
Get ready for our December 10th discussion!
```

---

### 3. Add Book to "Books We've Explored" (Home Page)

**Do this after discussing a book.**

**Location:** Lines 129-165 in `book-club.html`

**Current Structure:**
```html
<div style="display: flex; gap: 2rem; margin-bottom: 2rem; flex-wrap: wrap;">
    <!-- Binti card already here -->
    
    <!-- ADD NEW BOOK HERE -->
</div>
```

**Template to Add:**
```html
<!-- New Book Title -->
<div style="flex: 1; min-width: 300px;">
    <div class="comic-panel texture-canvas-grain" style="background-color: var(--canvas-white); height: 100%; display: flex; flex-direction: column;">
        <div style="text-align: center; margin-bottom: 1rem;">
            <img src="BOOK_COVER_URL" 
                 alt="Book Title" 
                 style="max-width: 200px; width: 100%; height: auto; border: 3px solid var(--sketch-black); border-radius: 8px; box-shadow: 0 4px 12px rgba(26, 24, 22, 0.2);">
        </div>
        <h3 style="font-family: var(--font-title); font-size: 1.8rem; color: var(--peach-accent); margin-bottom: 0.5rem; font-weight: 700; text-align: center;">
            Book Title
        </h3>
        <h4 style="color: var(--electric-purple); margin-bottom: 1rem; font-size: 1.1rem; font-weight: 600; text-align: center;">
            by Author Name
        </h4>
        <p class="body-text" style="flex-grow: 1;">
            Brief description of the book and what makes it special. This can be 2-3 sentences about the plot or themes.
        </p>
        <div style="background: var(--vibrant-green); color: var(--canvas-white); padding: 0.75rem; border-radius: 8px; margin-top: 1rem; text-align: center;">
            <p style="margin: 0; font-weight: 600; font-size: 0.9rem;">
                ✓ Discussed Month Year
            </p>
        </div>
    </div>
</div>
```

**Example - Adding "Kindred":**
```html
<!-- Kindred -->
<div style="flex: 1; min-width: 300px;">
    <div class="comic-panel texture-canvas-grain" style="background-color: var(--canvas-white); height: 100%; display: flex; flex-direction: column;">
        <div style="text-align: center; margin-bottom: 1rem;">
            <img src="https://images.example.com/kindred-cover.jpg" 
                 alt="Kindred book cover" 
                 style="max-width: 200px; width: 100%; height: auto; border: 3px solid var(--sketch-black); border-radius: 8px; box-shadow: 0 4px 12px rgba(26, 24, 22, 0.2);">
        </div>
        <h3 style="font-family: var(--font-title); font-size: 1.8rem; color: var(--peach-accent); margin-bottom: 0.5rem; font-weight: 700; text-align: center;">
            Kindred
        </h3>
        <h4 style="color: var(--electric-purple); margin-bottom: 1rem; font-size: 1.1rem; font-weight: 600; text-align: center;">
            by Octavia E. Butler
        </h4>
        <p class="body-text" style="flex-grow: 1;">
            A powerful time-travel narrative where Dana, a Black woman living in 1970s California, is repeatedly pulled back to a pre-Civil War Maryland plantation. She must navigate the brutal realities of slavery while trying to survive and return home.
        </p>
        <div style="background: var(--vibrant-green); color: var(--canvas-white); padding: 0.75rem; border-radius: 8px; margin-top: 1rem; text-align: center;">
            <p style="margin: 0; font-weight: 600; font-size: 0.9rem;">
                ✓ Discussed October 2025
            </p>
        </div>
    </div>
</div>
```

**Where to Add:**
Paste the new book card **after line 164** (after the closing `</div>` of the Binti card, before the closing parent div).

---

### 4. Add Book to Library Page

**Do this after discussing a book to keep the library updated.**

**Location:** Lines 253-302 in `book-club.html`

The library uses the **same template** as "Books We've Explored" above.

**Where to Add:**
Paste the new book card **after line 276** (after the Binti card in the library grid).

**Note:** The library has a helpful template in HTML comments (lines 279-301) you can copy and fill in.

---

## Content Management

### Update Sign-Up Link

**Location:** Line 97 in `book-club.html`

```html
<a href="https://app.youform.com/forms/ohwp8dkw" class="mystical-button">
    Sign Up for Book Club
</a>
```

Change the URL to your new form/registration link.

---

### Change Book Club Description

**Location:** Lines 77-82 in `book-club.html`

```html
<h2>What is TCIA's Book Club?</h2>
<p class="body-text">
    The Twin Cities Innovation Alliance, TCIA, in collaboration with Dr. Tanya Clark...
</p>
```

Edit the paragraph text to update the description.

---

### Update Dr. Clark's Information

**Hover Quote:**

**Location:** Lines 183-188 in `book-club.html`

```html
<div class="hover-speech-bubble">
    <h4>"Why is Afrofuturism Important to You?"</h4>
    <p>"My love for speculative genres began in childhood..."</p>
</div>
```

**Mobile Quote Panel:**

**Location:** Lines 207-217 in `book-club.html`

```html
<div class="comic-panel panel-single mobile-quote-panel">
    <h3>"Why is Afrofuturism Important To You?"</h3>
    <p>"My love for speculative genres began in childhood..."</p>
</div>
```

Update both locations to keep the quote consistent.

**Bio Text:**

**Location:** Lines 200-227 in `book-club.html`

Edit the three text blocks that describe Dr. Clark's background.

---

## Customization

### Change Colors

**Location:** Lines 2-20 in `css/main.css`

```css
:root {
    /* Main Colors */
    --navy-background: #1A3070;
    --dark-blue-panel: #03143F;
    --peach-accent: #ff9b82;
    --canvas-cream: #faf7f2;
    --canvas-white: #f5f2ed;
    
    /* Accent Colors */
    --bright-coral: #ef4444;
    --vibrant-green: #10b981;
    --electric-purple: #8b5cf6;
    --sunshine-yellow: #f59e0b;
}
```

**Examples:**

**Change accent color:**
```css
--peach-accent: #ff6b9d;  /* More pink */
```

**Change background:**
```css
--navy-background: #2a1a5e;  /* Deeper purple */
```

**Change button color:**
```css
--vibrant-green: #059669;  /* Darker green */
```

---

### Change Fonts

**Current Fonts:**
- Titles: `Courier New` (monospace)
- Body: `Kalam` (handwritten)
- Clean: `Inter` (sans-serif)

**Location:** Lines 22-24 in `css/main.css`

```css
--font-title: 'Courier New', monospace;
--font-body: 'Kalam', cursive;
--font-clean: 'Inter', sans-serif;
```

**To use Google Fonts:**

1. Add to `<head>` in HTML (after line 11):
```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font+Name&display=swap" rel="stylesheet">
```

2. Update CSS:
```css
--font-title: 'Your Font Name', monospace;
```

---

### Adjust Button Style

**Location:** Lines 211-238 in `css/main.css`

```css
.mystical-button {
    background: var(--peach-accent);
    border: 3px solid var(--sketch-black);
    padding: 1rem 2rem;
    font-size: 1.2rem;
    border-radius: 6px;
}
```

**Examples:**

**Larger buttons:**
```css
padding: 1.5rem 3rem;
font-size: 1.4rem;
```

**More rounded:**
```css
border-radius: 12px;
```

**Different color:**
```css
background: var(--vibrant-green);
```

---

### Add New Page/Tab

**Step 1:** Add navigation tab

**Location:** After line 33 in `book-club.html`

```html
<li data-chapter="new-page">
    <span class="tab-text">New Page</span>
</li>
```

**Step 2:** Add page content

**Location:** After line 310 in `book-club.html`

```html
<!-- New Page -->
<div class="page hidden" data-page="new-page">
    <div class="comic-panel panel-single">
        <h1>New Page Title</h1>
        <p>Your content here...</p>
    </div>
</div>
```

**Step 3:** Remove "Coming Soon" tab (optional)

Delete lines 33-35.

---

## Technical Details

### Navigation System

**JavaScript:** `js/main.js`

```javascript
function turnToPage(targetChapter) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
        page.classList.remove('current-page');
    });
    
    // Show target page
    const targetPage = document.querySelector(`[data-page="${targetChapter}"]`);
    targetPage.classList.remove('hidden');
    targetPage.classList.add('current-page');
}
```

**How it works:**
1. Click navigation tab with `data-chapter="library"`
2. JavaScript finds matching page with `data-page="library"`
3. Shows that page, hides others

---

### Texture Classes

**Currently Used:**

**`.texture-canvas-grain`** - Subtle paper texture
```css
/* Applied to most content panels */
```

**`.texture-canvas-linen`** - Linen weave pattern
```css
/* Applied to book spine navigation */
```

**`.texture-white-stipple`** - White dots on navy
```css
/* Applied to body background */
```

**Usage:**
```html
<div class="comic-panel texture-canvas-grain">
    Content here
</div>
```

---

### Responsive Design

**Breakpoints:**

**Desktop** (>768px):
- Side navigation spine
- Two-column layouts
- Hover effects active

**Mobile** (≤768px):
- Top navigation bar
- Single column stacking
- Touch-friendly buttons
- Mobile-only quote panel

**Small Mobile** (≤480px):
- Smaller text sizes
- Reduced padding
- Optimized button sizes

---

### Interactive Elements

**Hover Speech Bubble:**

Desktop only - hover over Dr. Clark's image to see quote.

**Location:** Lines 183-188 in `book-club.html`

**Mobile Alternative:**

Mobile users see the quote in a separate panel instead.

**Location:** Lines 207-217 in `book-club.html`

---

## Quick Reference

### Book Card Template

```html
<div style="flex: 1; min-width: 300px;">
    <div class="comic-panel texture-canvas-grain" style="background-color: var(--canvas-white); height: 100%; display: flex; flex-direction: column;">
        <div style="text-align: center; margin-bottom: 1rem;">
            <img src="COVER_URL" alt="Book Title" style="max-width: 200px; width: 100%; height: auto; border: 3px solid var(--sketch-black); border-radius: 8px; box-shadow: 0 4px 12px rgba(26, 24, 22, 0.2);">
        </div>
        <h3 style="font-family: var(--font-title); font-size: 1.8rem; color: var(--peach-accent); margin-bottom: 0.5rem; font-weight: 700; text-align: center;">
            Book Title
        </h3>
        <h4 style="color: var(--electric-purple); margin-bottom: 1rem; font-size: 1.1rem; font-weight: 600; text-align: center;">
            by Author Name
        </h4>
        <p class="body-text" style="flex-grow: 1;">
            Description here.
        </p>
        <div style="background: var(--vibrant-green); color: var(--canvas-white); padding: 0.75rem; border-radius: 8px; margin-top: 1rem; text-align: center;">
            <p style="margin: 0; font-weight: 600; font-size: 0.9rem;">
                ✓ Discussed Month Year
            </p>
        </div>
    </div>
</div>
```

---

## Troubleshooting

### Pages Not Switching

**Check:**
1. Navigation has `data-chapter="name"`
2. Page has matching `data-page="name"`
3. JavaScript file loaded (line 13)

**Test:**
Open browser console (F12) and type:
```javascript
turnToPage('library')
```

---

### Navigation Not Showing on Mobile

**Check:**
1. Viewport width < 768px
2. Navigation bar at top (not side)

**Force mobile view:**
Use browser DevTools → Toggle device toolbar

---

### Images Not Loading

**Check:**
1. Image URL is complete and starts with `https://`
2. Image is publicly accessible
3. No CORS restrictions

**Example good URL:**
```html
https://images.squarespace-cdn.com/content/...
```

---

### Button Hover Not Working

**Check:**
1. Using correct class: `.mystical-button`
2. Not on mobile (hover disabled on touch devices)
3. CSS file loaded

---

### Layout Breaking on Mobile

**Check:**
1. All flex containers set to `flex-direction: column` on mobile
2. Images have `max-width: 100%`
3. No fixed widths on mobile

**Quick fix:**
Add to inline styles:
```html
<div style="display: flex; flex-direction: column;">
```

---

### Speech Bubble Not Appearing

**Desktop:**
1. Hover over image, don't click
2. Wait 0.3 seconds for animation

**Mobile:**
Speech bubble is hidden - users see mobile quote panel instead.

---

### Text Overlapping

**Check:**
1. Sufficient padding in panels: `padding: 1.5rem`
2. Line height adequate: `line-height: 1.6`
3. Margin between elements: `margin-bottom: 1rem`

---

### Debug Mode

**Enable visual debugging:**

**Location:** Line 21 in `book-club.html`

Change:
```html
<body class="texture-white-stipple">
```

To:
```html
<body class="texture-white-stipple debug-mode">
```

**Shows:**
- Red tint on current page
- Yellow panels with red borders
- Green tint on main area
- Blue container border
- Red banner at top

**Remember to remove when done!**

---

## Step-by-Step: Monthly Update

**Before each meeting:**

1. **Update meeting date** (2 locations)
   - Line 57: Next meeting header
   - Line 121: Current book discussion date

2. **Test the page**
   - Open in browser
   - Check date displays correctly
   - Click navigation tabs

**After discussing a book:**

1. **Move current book to past books**
   - Copy current book section (lines 107-127)
   - Paste as new card in "Books We've Explored" (after line 164)
   - Change "Current Book:" to book title
   - Add "✓ Discussed [Month Year]" badge

2. **Update current book with next book**
   - Change image URL (line 109)
   - Change title (line 115)
   - Change author (line 117)
   - Update meeting date (line 121)

3. **Add to library**
   - Copy the past book card
   - Paste in library grid (after line 276)

4. **Test everything**
   - Check home page
   - Switch to library
   - Verify all images load
   - Test on mobile

---

## File Locations

```
book-club/
├── book-club.html          
├── css/
│   └── main.css           
└── js/
    └── main.js            
```

---

## Browser Support

**Fully Supported:**
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

**Features:**
- CSS Flexbox (IE 10+)
- CSS Grid (IE 11+)
- Custom properties (Chrome 49+, Firefox 31+)

---

## Accessibility

**Implemented:**
- ✅ Semantic HTML structure
- ✅ Alt text on all images
- ✅ Keyboard navigation support
- ✅ `prefers-reduced-motion` support
- ✅ Touch-friendly button sizes (44px min)
- ✅ Clear focus states

**Recommendations:**
- Keep alt text descriptive
- Maintain color contrast (WCAG AA)
- Test with keyboard only
- Test with screen reader

---

**Last Updated:** November 2025  
**Maintainer:** TCIA Development Team  
**Theme:** Comic Book / Afrofuturism


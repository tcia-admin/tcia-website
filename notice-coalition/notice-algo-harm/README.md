# Notice Coalition Algorithmic Harm Timeline - Complete Documentation

## Table of Contents
1. [Overview](#overview)
2. [File Structure](#file-structure)
3. [How to Make Common Changes](#how-to-make-common-changes)
4. [CSS Architecture Explained](#css-architecture-explained)
5. [JavaScript Functionality](#javascript-functionality)
6. [HTML Structure Guide](#html-structure-guide)
7. [Visual Features Explained](#visual-features-explained)
8. [Troubleshooting](#troubleshooting)
9. [Advanced Customization](#advanced-customization)
10. [Quick Reference Cheat Sheet](#quick-reference-cheat-sheet)

---

## Overview

The Algorithmic Harm Timeline is a visually engaging, scrollable page that displays a chronological sequence of events related to algorithmic harm. The page features a dark aesthetic with smooth animations and visual feedback as users scroll through the timeline.

**Key Features:**
- Vertical timeline with full-width images
- Horizontal progress bar at the top showing scroll progress
- Vertical progress indicator on the side
- Back-to-top button that appears after scrolling
- Smooth fade-in animations as timeline items come into view
- Fully responsive design (works on desktop, tablet, and mobile)
- Performance-optimized with requestAnimationFrame

**Design Philosophy:**
- Minimalist interface that keeps focus on the timeline content
- Continuous vertical scroll (no pagination)
- Visual indicators help users understand their position in the timeline
- All timeline graphics are pre-designed images (no text overlay needed)

---

## File Structure

```
notice-algo-harm/
├── algo-harm-timeline.html    # Main HTML file (128 lines)
├── css/
│   └── main.css              # All styling (110 lines)
└── js/
    └── main.js               # Interactive features (54 lines)
```

**External Dependencies:**
- None! This page is completely self-contained

**Asset Loading:**
The HTML loads external CSS and JavaScript from GitHub Pages:
```html
<link rel="stylesheet" href="https://tcia-admin.github.io/tcia-website/notice-coalition/notice-algo-harm/css/main.css">
<script src="https://tcia-admin.github.io/tcia-website/notice-coalition/notice-algo-harm/js/main.js"></script>
```

---

## How to Make Common Changes

### 1. Adding a New Timeline Event

**Location:** Lines 10-126 in `algo-harm-timeline.html`

**Template to copy:**
```html
<div class="timeline-item">
    <div class="timeline-content">
        <img src="YOUR_IMAGE_URL_HERE" alt="Timeline Event DESCRIPTION">
    </div>
</div>
```

**Step-by-step:**
1. Scroll to the end of the timeline (just before the closing `</div>` for `.timeline`)
2. Copy the entire `<div class="timeline-item">...</div>` block
3. Paste it where you want the new event (timeline flows top to bottom)
4. Replace:
   - `YOUR_IMAGE_URL_HERE` with your image URL
   - `Timeline Event DESCRIPTION` with a brief description for accessibility

**Example - Adding event #24:**
```html
<div class="timeline-item">
    <div class="timeline-content">
        <img src="https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/new-image-id/24.png?content-type=image%2Fpng" alt="Timeline Event 24">
    </div>
</div>
```

**Important Notes:**
- Timeline items appear in the order they're written (top to bottom)
- Each image should be the same width for consistency (current: 1000px max-width)
- Images can be different heights - the layout adapts automatically
- Alt text is important for accessibility and SEO

### 2. Removing a Timeline Event

**How to:**
1. Find the timeline item you want to remove (search for the image URL)
2. Delete the entire `<div class="timeline-item">...</div>` block
3. That's it! The JavaScript will automatically adapt to the new number of items

**Example - Removing event #5:**
Find and delete:
```html
<div class="timeline-item">
    <div class="timeline-content">
        <img src="https://images.squarespace-cdn.com/content/5b9081c58ab7224793278e1d/e83908d0-89b8-48fa-979a-7d605ec83bae/5.png?content-type=image%2Fpng" alt="Timeline Event 5">
    </div>
</div>
```

### 3. Changing the Background Color

**Location:** Lines 11, 16, 24, 30, 36 in `main.css`

All background colors are set to `#1a1919` (very dark grey). To change them all at once, do a find-and-replace:

**Find:** `#1a1919`
**Replace with:** Your new color (e.g., `#000000` for pure black, `#2a2a2a` for lighter grey)

**Pro Tip:** For easy theme changes, you could convert these to CSS variables:

```css
:root {
    --timeline-bg: #1a1919;
}

.ndauwu-algo-harm {
    background-color: var(--timeline-bg);
}
```

### 4. Customizing the Progress Bar Colors

**Location:** Lines 61 and 75 in `main.css`

The progress indicators use a gradient from blue to green:

```css
/* Horizontal bar at top */
.scroll-progress-horizontal {
    background: linear-gradient(90deg, #3498db 0%, #2ecc71 100%);
}

/* Vertical indicator on side */
.scroll-progress-vertical {
    background: linear-gradient(180deg, #3498db 0%, #2ecc71 100%);
}
```

**Color breakdown:**
- `#3498db` - Blue (starting color)
- `#2ecc71` - Green (ending color)

**Example - Change to purple-to-pink gradient:**
```css
background: linear-gradient(90deg, #9b59b6 0%, #e91e63 100%);
```

**Example - Solid color (no gradient):**
```css
background: #fbc516;  /* Notice Coalition yellow */
```

### 5. Adjusting the Back-to-Top Button

**Location:** Lines 82-108 in `main.css`

**Change when it appears:**
```javascript
// In js/main.js, line 37
if (window.scrollY > 500) {  // Change 500 to higher/lower value
```
- **Higher number** (e.g., 1000) = button appears later
- **Lower number** (e.g., 200) = button appears sooner

**Change button size:**
```css
/* In main.css, lines 85-87 */
.back-to-top {
    width: 40px;   /* Change to 50px for larger */
    height: 40px;  /* Change to 50px for larger */
}
```

**Change button position:**
```css
/* In main.css, lines 84-85 */
.back-to-top {
    bottom: 20px;  /* Distance from bottom */
    right: 20px;   /* Distance from right */
}
```

**Example - Move to bottom-left corner:**
```css
.back-to-top {
    bottom: 20px;
    left: 20px;    /* Change 'right' to 'left' */
}
```

**Change button colors:**
```css
/* In main.css, line 89 */
.back-to-top {
    background: linear-gradient(45deg, #3498db 0%, #2ecc71 100%);
    /* Change to: */
    background: #fbc516;  /* Solid color */
    /* Or: */
    background: linear-gradient(45deg, #ff6b6b 0%, #4ecdc4 100%);  /* Different gradient */
}
```

### 6. Adjusting Fade-In Animation

**Speed of fade-in:**
```javascript
// In js/main.js, line 20
item.style.transition = 'all 0.5s ease-in-out';
// Change 0.5s to:
// 0.3s for faster
// 1s for slower
```

**Distance items move when fading in:**
```javascript
// In js/main.js, line 19
item.style.transform = 'translateY(20px)';
// Change 20px to:
// 10px for subtle movement
// 40px for more dramatic entrance
```

**Disable fade-in animation completely:**
```javascript
// In js/main.js, comment out or remove lines 17-21:
/*
timelineItems.forEach(item => {
    item.style.opacity = 0;
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'all 0.5s ease-in-out';
    observer.observe(item);
});
*/
```

### 7. Adjusting Timeline Width

**Location:** Line 21 in `main.css`

```css
.timeline {
    max-width: 1000px;  /* Maximum width of timeline */
}
```

**Examples:**
- `max-width: 800px;` - Narrower timeline
- `max-width: 1400px;` - Wider timeline
- `max-width: 100%;` - Full width (no max)

**Note:** Images will scale to fit whatever width you choose.

---

## CSS Architecture Explained

### The Box Model

Every element on the page is a box. Understanding this helps you modify spacing and layout.

```
┌─────────────────────────────┐
│  Margin (transparent)       │  ← Space outside the element
│  ┌───────────────────────┐  │
│  │  Border               │  │  ← Visible border (can be 0)
│  │  ┌─────────────────┐  │  │
│  │  │  Padding        │  │  │  ← Space inside the element
│  │  │  ┌───────────┐  │  │  │
│  │  │  │  Content  │  │  │  │  ← The actual content (text, images)
│  │  │  └───────────┘  │  │  │
│  │  └─────────────────┘  │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
```

**Example from the timeline:**
```css
.timeline-item {
    margin: 0;           /* No space outside */
    width: 100%;         /* Full width of parent */
    background-color: #1a1919;  /* Dark background */
}
```

### Position: Fixed (UI Elements)

Three elements use `position: fixed` to stay visible while scrolling:
1. Horizontal progress bar (top)
2. Vertical progress indicator (side)
3. Back-to-top button (bottom-right)

**How it works:**
```css
.scroll-progress-horizontal {
    position: fixed;   /* Removes from normal flow */
    top: 0;           /* Stick to top of screen */
    left: 0;          /* Stick to left edge */
    width: 100%;      /* Full width */
    z-index: 1000;    /* Appear above other content */
}
```

**Visual diagram:**
```
┌────────────────────────────┐
│ [Progress Bar - Fixed]     │ ← Stays at top
├────────────────────────────┤
│                            │
│   [Timeline Content]       │ ← Scrolls normally
│   (Scrolls up/down)        │
│                         [↑]│ ← Button fixed at bottom-right
└────────────────────────────┘
```

**z-index explained:**
Think of z-index as layers stacked on top of each other:
```
z-index: 1000  ← Fixed UI elements (on top)
z-index: 1     ← Timeline content
z-index: 0     ← Background (bottom)
```

### Full-Width Container Technique

**The Challenge:**
The page might be inside a container with limited width, but we want the timeline to be full-width.

**The Solution (lines 11-16 in main.css):**
```css
.ndauwu-algo-harm {
    position: relative;
    width: 100vw;                      /* 100% of viewport width */
    margin-left: calc(-50vw + 50%);    /* Break out left */
    margin-right: calc(-50vw + 50%);   /* Break out right */
}
```

**How `calc(-50vw + 50%)` works:**

If the parent container is 800px centered in a 1200px viewport:
- `-50vw` = move left by 600px (half of viewport)
- `+50%` = move right by 400px (half of parent)
- Result: element aligns with left edge of viewport

**Visual diagram:**
```
BEFORE (constrained):
    ┌────────────┐
    │ Container  │
    │ ┌────────┐ │
    │ │Timeline│ │  ← Stuck inside container
    │ └────────┘ │
    └────────────┘

AFTER (full-width):
┌──────────────────┐
│    Timeline      │  ← Full viewport width
└──────────────────┘
```

### Transform Property

The `transform` property is used extensively for animations without triggering expensive reflows.

**Common transforms in this page:**

**1. Scale (for progress bar):**
```css
transform: scaleX(0);  /* Squeezed to 0 width */
transform: scaleX(0.5);  /* Half width */
transform: scaleX(1);  /* Full width */
```

**Visual:**
```
scaleX(0):   |
scaleX(0.5): |=============
scaleX(1):   |==========================
```

**2. Translate (for movement):**
```css
transform: translateY(-50%);  /* Move up by 50% of element height */
transform: translateY(20px);  /* Move down 20 pixels */
transform: translateY(0);     /* Original position */
```

**3. Combined transforms:**
```css
/* Multiple transforms in one declaration */
transform: translateX(-50%) scale(0);  /* Center horizontally AND scale to 0 */
transform: translateX(-50%) scale(1);  /* Center horizontally AND full size */
```

**Why use transform instead of changing position?**
- **Performance:** Transforms are handled by GPU (faster)
- **Smooth:** No reflow of other elements
- **Compatible:** Works well with transitions

### Transitions and Animations

**Transition syntax:**
```css
transition: property duration timing-function;
```

**Examples from the page:**

**1. Progress bar (line 66):**
```css
.scroll-progress-horizontal {
    transition: transform 0.1s ease;
}
```
- **Property:** `transform` (only animate this property)
- **Duration:** `0.1s` (100 milliseconds - very fast)
- **Timing:** `ease` (smooth acceleration)

**2. Back-to-top button (line 94):**
```css
.back-to-top {
    transition: opacity 0.3s ease;
}
```
- **Property:** `opacity` (fade in/out)
- **Duration:** `0.3s` (300 milliseconds)
- **Timing:** `ease` (smooth)

**3. Timeline items (set via JavaScript):**
```javascript
item.style.transition = 'all 0.5s ease-in-out';
```
- **Property:** `all` (animate all properties)
- **Duration:** `0.5s` (500 milliseconds)
- **Timing:** `ease-in-out` (slow start, slow end)

**Timing function comparison:**
```
ease:        ───╱╲───  (most common, natural feeling)
linear:      ───────   (constant speed)
ease-in:     ___╱──    (slow start, fast end)
ease-out:    ──╲___    (fast start, slow end)
ease-in-out: ___╱╲__   (slow start AND slow end)
```

### Opacity for Fade Effects

Opacity controls transparency: `0` = invisible, `1` = fully visible

**Back-to-top button fade:**
```css
.back-to-top {
    opacity: 0;  /* Hidden by default */
}

.back-to-top.visible {
    opacity: 0.9;  /* 90% visible when class added */
}

.back-to-top:hover {
    opacity: 1;  /* 100% visible on hover */
}
```

**Values:**
- `0` = Completely invisible (but still takes up space)
- `0.5` = 50% transparent (semi-see-through)
- `1` = Completely opaque (solid)

**Opacity vs. Display:**
- `opacity: 0` - Invisible but still clickable/present
- `display: none` - Removed from page entirely

### Flexbox for Button Centering

**Center content inside the back-to-top button:**
```css
.back-to-top {
    display: flex;              /* Enable flexbox */
    align-items: center;        /* Center vertically */
    justify-content: center;    /* Center horizontally */
}
```

**Visual:**
```
WITHOUT flexbox:
┌──────────┐
│↑         │  ← Arrow in corner
└──────────┘

WITH flexbox:
┌──────────┐
│    ↑     │  ← Arrow centered
└──────────┘
```

### Overflow Control

**Prevent horizontal scrolling (lines 1-9 in main.css):**
```css
html, body {
    overflow-x: hidden;  /* No horizontal scrollbar */
    overscroll-behavior-x: none;  /* No horizontal overscroll */
    touch-action: pan-y pinch-zoom;  /* Only vertical touch scrolling */
}
```

**Why this matters:**
- Prevents accidental horizontal scrolling on touch devices
- Ensures timeline stays vertically oriented
- Improves mobile user experience

---

## JavaScript Functionality

The JavaScript file (`js/main.js`) contains 54 lines that handle three main features:
1. Fade-in animations for timeline items
2. Scroll progress tracking
3. Back-to-top button functionality

### Architecture Overview

```javascript
document.addEventListener('DOMContentLoaded', function() {
    // 1. Cache DOM elements (lines 2-5)
    // 2. Set up Intersection Observer (lines 7-15)
    // 3. Initialize timeline items (lines 17-22)
    // 4. Track scroll progress (lines 24-43)
    // 5. Handle back-to-top clicks (lines 45-51)
});
```

### Feature 1: Fade-In Animations

**How it works - Step by Step:**

**Step 1: Wait for page to load**
```javascript
document.addEventListener('DOMContentLoaded', function() {
    // Code runs after HTML is fully loaded
});
```

**Why:** Ensures all elements exist before we try to manipulate them.

**Step 2: Cache DOM elements (lines 2-5)**
```javascript
const timelineItems = document.querySelectorAll('.timeline-item');
const backToTopButton = document.querySelector('.back-to-top');
const progressHorizontal = document.querySelector('.scroll-progress-horizontal');
const progressVertical = document.querySelector('.scroll-progress-vertical');
```

**What this does:**
- Finds all timeline items (returns a NodeList/array)
- Finds the back-to-top button (returns single element)
- Finds both progress indicators (returns single elements)
- Stores them in variables for easy access later

**Difference between querySelector and querySelectorAll:**
```javascript
querySelector('.class')     // Returns FIRST matching element
querySelectorAll('.class')  // Returns ALL matching elements
```

**Step 3: Create Intersection Observer (lines 8-15)**
```javascript
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
});
```

**What is an Intersection Observer?**
It watches elements and triggers code when they enter/exit the viewport (visible screen area).

**Visual explanation:**
```
┌──────────────────┐  ← Top of viewport
│                  │
│ [Visible Item] ✓ │  ← isIntersecting = true
│                  │
├──────────────────┤  ← Bottom of viewport
│ [Hidden Item]  ✗ │  ← isIntersecting = false
└──────────────────┘
```

**When timeline item becomes visible:**
1. Observer detects item entered viewport
2. Sets `opacity: 1` (fade in)
3. Sets `transform: translateY(0)` (move to original position)
4. Transition animates these changes smoothly

**Step 4: Initialize and observe timeline items (lines 17-22)**
```javascript
timelineItems.forEach(item => {
    item.style.opacity = 0;                      // Start invisible
    item.style.transform = 'translateY(20px)';   // Start 20px lower
    item.style.transition = 'all 0.5s ease-in-out';  // Smooth animation
    observer.observe(item);                       // Start watching it
});
```

**Animation sequence:**
```
INITIAL STATE (set by JavaScript):
- opacity: 0
- translateY(20px)
↓
USER SCROLLS
↓
ITEM ENTERS VIEWPORT
↓
OBSERVER TRIGGERS:
- opacity: 1
- translateY(0)
↓
TRANSITION ANIMATES (0.5s)
↓
FINAL STATE: Item fully visible in original position
```

### Feature 2: Scroll Progress Tracking

**The unified scroll handler (lines 25-43):**

```javascript
window.addEventListener('scroll', () => {
    requestAnimationFrame(() => {
        // Progress calculations and updates
    });
});
```

**Why requestAnimationFrame?**
- **Better performance:** Syncs with browser's repaint cycle (~60fps)
- **Smoother animations:** No visual stuttering
- **Battery efficient:** Browser can optimize when to run
- **Standard practice:** Industry best practice for scroll animations

**Without requestAnimationFrame:**
```
Scroll event fires: ▌▌▌▌▌▌▌▌▌▌ (constantly, irregularly)
Screen repaints:    ▌  ▌  ▌   (only some updates visible)
Result: Wasted calculations, choppy appearance
```

**With requestAnimationFrame:**
```
Scroll event fires: ▌▌▌▌▌▌▌▌▌▌
Batched by RAF:     ▌  ▌  ▌   (only when needed)
Screen repaints:    ▌  ▌  ▌   (perfectly synced)
Result: Smooth, efficient
```

**Calculate scroll progress (lines 27-28):**
```javascript
const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
const scrolled = window.scrollY / windowHeight;
```

**Breaking this down:**

**1. Total scrollable distance:**
```javascript
document.documentElement.scrollHeight  // Total page height
- window.innerHeight                   // Visible height
= windowHeight                         // How much can be scrolled
```

**Visual:**
```
┌─────────────┐  ← scrollHeight = 5000px
│             │
│   [Screen]  │  ← innerHeight = 800px
│             │
│             │
│             │  windowHeight = 5000 - 800 = 4200px
│             │  (total scrollable distance)
│             │
└─────────────┘
```

**2. Current scroll percentage:**
```javascript
window.scrollY     // How far scrolled (in pixels)
/ windowHeight     // Total scrollable distance
= scrolled         // Percentage (0 to 1)
```

**Examples:**
- At top: `scrollY = 0` → `scrolled = 0/4200 = 0` (0%)
- Halfway: `scrollY = 2100` → `scrolled = 2100/4200 = 0.5` (50%)
- At bottom: `scrollY = 4200` → `scrolled = 4200/4200 = 1` (100%)

**Update horizontal progress bar (line 31):**
```javascript
progressHorizontal.style.transform = `scaleX(${scrolled})`;
```

**Visual:**
```
scrolled = 0:    [                          ]  0% width
scrolled = 0.25: [======                    ]  25% width
scrolled = 0.5:  [=============             ]  50% width
scrolled = 0.75: [====================      ]  75% width
scrolled = 1:    [==========================]  100% width
```

**Update vertical progress indicator (line 34):**
```javascript
progressVertical.style.top = `${scrolled * window.innerHeight}px`;
```

**Why multiply by window.innerHeight?**
The vertical indicator should move from top to bottom of the *visible* screen as you scroll through the entire page.

**Visual:**
```
┌─────────────┐
│ ●           │  scrolled = 0 → top = 0px (top of screen)
│             │
│      ●      │  scrolled = 0.5 → top = 400px (middle of screen)
│             │
│           ● │  scrolled = 1 → top = 800px (bottom of screen)
└─────────────┘
```

**Show/hide back-to-top button (lines 37-41):**
```javascript
if (window.scrollY > 500) {
    backToTopButton.classList.add('visible');
} else {
    backToTopButton.classList.remove('visible');
}
```

**How this works:**
- When scrolled more than 500px down: add `visible` class
- When less than 500px: remove `visible` class
- CSS handles the fade effect via `opacity` transition

**State diagram:**
```
┌──────────────────────────────────┐
│ scrollY < 500                    │
│ Button: opacity = 0 (hidden)     │
└──────────────────────────────────┘
            ↓ Scroll down past 500px
┌──────────────────────────────────┐
│ scrollY > 500                    │
│ Button: opacity = 0.9 (visible)  │
└──────────────────────────────────┘
            ↓ Scroll back up
┌──────────────────────────────────┐
│ scrollY < 500                    │
│ Button: opacity = 0 (hidden)     │
└──────────────────────────────────┘
```

### Feature 3: Back-to-Top Functionality

**The click handler (lines 46-51):**
```javascript
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
```

**Breaking this down:**

**1. Listen for clicks:**
```javascript
backToTopButton.addEventListener('click', () => { ... });
```
Whenever someone clicks the button, run this code.

**2. Scroll to top:**
```javascript
window.scrollTo({
    top: 0,           // Scroll to 0 pixels from top (the very top)
    behavior: 'smooth'  // Animate smoothly (not instant)
});
```

**Alternative (instant jump):**
```javascript
window.scrollTo({ top: 0, behavior: 'auto' });  // No animation
```

**Visual:**
```
USER AT BOTTOM:
┌────────────┐
│            │
│ Content    │
│            │
│         [↑]│ ← Click!
└────────────┘
      ↓
SMOOTH SCROLL UP
      ↓
USER AT TOP:
┌────────────┐
│ Timeline   │ ← Animated scroll to here
│            │
└────────────┘
```

### Performance Optimizations

**1. DOM element caching (lines 2-5):**
```javascript
// GOOD: Query once, reuse many times
const progressHorizontal = document.querySelector('.scroll-progress-horizontal');
// ... later in scroll handler:
progressHorizontal.style.transform = `scaleX(${scrolled})`;

// BAD: Query every time (slow!)
document.querySelector('.scroll-progress-horizontal').style.transform = `scaleX(${scrolled})`;
```

**Why cache?**
- `querySelector` searches the entire DOM tree (expensive)
- Scroll events fire dozens of times per second
- Caching = search once, use forever

**2. requestAnimationFrame (line 26):**
Already covered above, but worth repeating:
- Batches updates to match screen refresh rate
- Prevents unnecessary calculations
- Essential for smooth scroll performance

**3. Intersection Observer vs. scroll listener:**
```javascript
// EFFICIENT: Intersection Observer
// Only checks visibility when needed
const observer = new IntersectionObserver(callback);
observer.observe(element);

// INEFFICIENT: Scroll listener for each element
// Would check every element on every scroll
window.addEventListener('scroll', () => {
    timelineItems.forEach(item => {
        // Check if item is visible (very expensive!)
    });
});
```

**Intersection Observer benefits:**
- Browser optimizes visibility checks
- No manual calculations needed
- Automatically stops watching when not needed

---

## HTML Structure Guide

### Overall Page Structure

```html
<!-- External CSS link -->
<link rel="stylesheet" href="...">

<!-- External JavaScript link -->
<script src="..."></script>

<!-- UI Elements (fixed position) -->
<div class="scroll-progress-horizontal"></div>
<div class="scroll-progress-vertical"></div>
<button class="back-to-top">↑</button>

<!-- Main Content -->
<section class="ndauwu-algo-harm">
    <div class="timeline">
        <!-- Timeline items (23 total) -->
        <div class="timeline-item">...</div>
        <div class="timeline-item">...</div>
        ...
    </div>
</section>
```

### Element Hierarchy

```
section.ndauwu-algo-harm          ← Main container (full-width)
  └── div.timeline                ← Timeline container (max-width: 1000px)
      ├── div.timeline-item       ← Individual event container
      │   └── div.timeline-content  ← Content wrapper
      │       └── img             ← Timeline image
      ├── div.timeline-item
      │   └── div.timeline-content
      │       └── img
      └── ... (23 total)
```

**Why this structure?**
- **Separation of concerns:** Container (full-width) separate from content (max-width)
- **Flexibility:** Easy to add decorative elements outside timeline
- **Consistency:** Same pattern for all timeline items

### Class Naming Convention

**Pattern:** Descriptive, hyphenated names

| Class | Purpose | Level |
|-------|---------|-------|
| `.ndauwu-algo-harm` | Main section identifier | Container |
| `.timeline` | Timeline container | Container |
| `.timeline-item` | Individual event | Item |
| `.timeline-content` | Content wrapper | Item part |
| `.scroll-progress-horizontal` | Top progress bar | UI element |
| `.scroll-progress-vertical` | Side progress indicator | UI element |
| `.back-to-top` | Back-to-top button | UI element |

**Modifier class:**
- `.visible` - Added to back-to-top button when visible

### Semantic HTML

**What's used:**
- `<section>` - Main content section
- `<div>` - Generic containers (appropriate here since timeline items are decorative)
- `<button>` - Interactive button element (not `<a>` or `<div>`)
- `<img>` - Images with alt text

**Why `<button>` for back-to-top?**
```html
<!-- CORRECT: Semantic button -->
<button class="back-to-top">↑</button>

<!-- WRONG: Div styled as button -->
<div class="back-to-top">↑</div>
```

**Benefits:**
- Keyboard accessible by default (Tab key)
- Screen readers announce it as a button
- Space/Enter keys trigger click
- Better SEO and accessibility

### Image Best Practices

**Current implementation:**
```html
<img src="https://images.squarespace-cdn.com/..." alt="Timeline Event 1">
```

**Alt text guidelines:**
1. **Descriptive:** "Timeline Event 1" tells what it is
2. **Concise:** Keep under 125 characters
3. **Meaningful:** Describes the purpose, not just "image"

**Better alt text examples:**
```html
<!-- Generic (current) -->
<img src="..." alt="Timeline Event 1">

<!-- Descriptive (better) -->
<img src="..." alt="2019: First documented case of algorithmic bias">

<!-- Very descriptive (best) -->
<img src="..." alt="January 2019: Study reveals facial recognition bias">
```

**Image optimization:**
- Host on CDN for fast loading
- Use appropriate dimensions (1000px width max)
- Compress images (keep under 500KB each)
- Consider WebP format for better compression

---

## Visual Features Explained

### 1. Horizontal Progress Bar

**What it looks like:**
```
┌────────────────────────────────┐
█████████████                    │  ← Blue-to-green gradient bar
└────────────────────────────────┘
```

**How it works:**
- Fixed at top of screen
- Width scales from 0% to 100% as you scroll
- `scaleX()` transform grows from left to right
- 6px tall, blue-to-green gradient
- 90% opaque (slightly see-through)

**CSS:**
```css
.scroll-progress-horizontal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 6px;
    background: linear-gradient(90deg, #3498db 0%, #2ecc71 100%);
    opacity: 0.9;
    transform: scaleX(0);  /* Grows via JavaScript */
}
```

### 2. Vertical Progress Indicator

**What it looks like:**
```
Right side of screen:
│
│  ← Indicator moves down as you scroll
●
│
│
```

**How it works:**
- Fixed on right side of screen (calculated position)
- Moves from top to bottom of visible screen
- 3px wide, 50px tall
- Same blue-to-green gradient as horizontal bar
- Position updates on scroll

**CSS:**
```css
.scroll-progress-vertical {
    position: fixed;
    right: calc(50% - 520px);  /* Right side of timeline content */
    top: 50%;                   /* Updated by JavaScript */
    width: 3px;
    height: 50px;
    background: linear-gradient(180deg, #3498db 0%, #2ecc71 100%);
}
```

**Why `calc(50% - 520px)`?**
- Timeline max-width is 1000px
- Half of 1000px = 500px
- Add 20px margin = 520px
- Position indicator 520px from center = right edge of content

### 3. Back-to-Top Button

**What it looks like:**
```
       ┌────┐
       │ ↑  │  ← Circular button with up arrow
       └────┘
```

**States:**

**1. Hidden (default):**
- `opacity: 0` (invisible)
- Still positioned, just transparent

**2. Visible (after scrolling 500px):**
- `opacity: 0.9` (visible but slightly transparent)
- Fades in over 0.3 seconds

**3. Hover:**
- `opacity: 1` (fully opaque)
- Visual feedback that it's interactive

**CSS:**
```css
.back-to-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    border-radius: 50%;  /* Makes it circular */
    background: linear-gradient(45deg, #3498db 0%, #2ecc71 100%);
    color: white;
    font-size: 20px;
    display: flex;       /* Centers the arrow */
    align-items: center;
    justify-content: center;
    cursor: pointer;     /* Shows hand cursor on hover */
}
```

### 4. Timeline Item Fade-In

**Animation sequence:**

**Initial state (set by JavaScript):**
```css
opacity: 0;
transform: translateY(20px);  /* 20px below final position */
```

**When entering viewport:**
```css
opacity: 1;
transform: translateY(0);  /* Move to final position */
transition: all 0.5s ease-in-out;  /* Animate over 0.5 seconds */
```

**Visual:**
```
BEFORE (hidden):
┌────────────────┐ ← Viewport bottom
│                │
│  [Item] ↓      │  ← 20px below, invisible
│       (hidden) │
└────────────────┘

DURING (fading in):
┌────────────────┐
│  [Item] ↑      │  ← Moving up, fading in
│    (fading)    │
└────────────────┘

AFTER (visible):
┌────────────────┐
│  [Item]        │  ← Final position, fully visible
└────────────────┘
```

### 5. Full-Width Dark Background

**Visual effect:**
```
┌─────────────────────────────────────┐
│ ┌───────────────────────────────┐   │  ← Page container
│ │   DARK BACKGROUND (full-width)│   │
│ │   ┌───────────────┐           │   │
│ │   │  Timeline     │           │   │  ← Timeline content (max 1000px)
│ │   │  (centered)   │           │   │
│ │   └───────────────┘           │   │
│ └───────────────────────────────┘   │
└─────────────────────────────────────┘
```

**Achieved with:**
```css
.ndauwu-algo-harm {
    width: 100vw;  /* Full viewport width */
    margin-left: calc(-50vw + 50%);  /* Break out of parent */
    margin-right: calc(-50vw + 50%);
    background-color: #1a1919;
}

.timeline {
    max-width: 1000px;  /* Constrain content */
    margin: 0 auto;     /* Center it */
}
```

---

## Troubleshooting

### Common Issues and Solutions

#### Issue: Progress bar doesn't update when scrolling

**Possible causes:**
1. JavaScript file not loaded
2. JavaScript error in console
3. Class names don't match

**Solutions:**

**Check if JavaScript loaded:**
```javascript
// Open browser console (F12) and type:
console.log(document.querySelector('.scroll-progress-horizontal'));
// Should show: <div class="scroll-progress-horizontal"></div>
// If null: JavaScript hasn't run or element missing
```

**Check for errors:**
1. Open DevTools (F12)
2. Go to Console tab
3. Look for red error messages
4. Fix any errors before progress bar will work

**Verify class names match:**
- HTML: `<div class="scroll-progress-horizontal">`
- JavaScript: `querySelector('.scroll-progress-horizontal')`
- Must match exactly (case-sensitive!)

#### Issue: Timeline items don't fade in

**Possible causes:**
1. Intersection Observer not supported (very old browsers)
2. JavaScript error before observer setup
3. Items already visible on load

**Solutions:**

**Browser support check:**
```javascript
// Add this at top of main.js for debugging:
if ('IntersectionObserver' in window) {
    console.log('Intersection Observer supported!');
} else {
    console.log('Intersection Observer NOT supported');
    // Consider a polyfill or fallback
}
```

**Fallback for old browsers:**
```javascript
// If browser doesn't support Intersection Observer
if (!('IntersectionObserver' in window)) {
    // Show all items immediately
    timelineItems.forEach(item => {
        item.style.opacity = 1;
        item.style.transform = 'translateY(0)';
    });
}
```

**Items visible on load:**
If first few items are already in viewport, they might appear faded in instantly. This is normal! Scroll down to see others fade in.

#### Issue: Back-to-top button doesn't appear

**Checklist:**
1. Have you scrolled down more than 500px?
2. Is the button in the HTML?
3. Check CSS for `opacity` and `z-index`
4. Verify JavaScript adds `visible` class

**Debug in console:**
```javascript
// Check button exists
console.log(document.querySelector('.back-to-top'));

// Check current scroll position
console.log(window.scrollY);  // Should be > 500 to show button

// Manually add visible class to test
document.querySelector('.back-to-top').classList.add('visible');
// If button appears, JavaScript isn't running properly
```

**Quick fix - Lower threshold:**
```javascript
// In main.js, line 37, change 500 to 100:
if (window.scrollY > 100) {  // Button appears sooner
```

#### Issue: Images don't load

**Possible causes:**
1. Broken image URLs
2. CORS issues (cross-origin restrictions)
3. Squarespace CDN issues

**Solutions:**

**Test image URLs:**
1. Copy image URL from HTML
2. Paste into new browser tab
3. If image doesn't load, URL is broken

**Check browser console:**
- Look for messages like: `Failed to load resource: net::ERR_NAME_NOT_RESOLVED`
- Indicates URL is incorrect or server is down

**Replace broken images:**
```html
<!-- Old (broken) -->
<img src="https://broken-url.com/image.png" alt="Event 1">

<!-- New (working) -->
<img src="https://your-working-cdn.com/image.png" alt="Event 1">
```

#### Issue: Layout breaks on mobile

**Common causes:**
1. Images too large
2. Fixed widths causing overflow
3. Progress indicators positioned incorrectly

**Solutions:**

**Images already responsive:**
```css
.timeline-content img {
    width: 100%;  /* Already set! */
    height: auto;
}
```

**Test on mobile:**
1. Open DevTools (F12)
2. Click device toolbar icon (Ctrl/Cmd + Shift + M)
3. Select "iPhone" or other mobile device
4. Test at various sizes

**Fix vertical progress indicator on mobile:**
```css
/* Hide on small screens if it overlaps */
@media screen and (max-width: 768px) {
    .scroll-progress-vertical {
        display: none;
    }
}
```

#### Issue: Scroll is jumpy or laggy

**Causes:**
- Too many high-resolution images
- JavaScript errors
- Browser struggling with animations

**Solutions:**

**Optimize images:**
1. Compress images (use TinyPNG or similar)
2. Target: < 500KB per image
3. Use appropriate resolution (1000px width is enough)

**Simplify animations:**
```javascript
// Reduce fade-in distance for smoother animation
item.style.transform = 'translateY(10px)';  // Instead of 20px

// Speed up transition
item.style.transition = 'all 0.3s ease-in-out';  // Instead of 0.5s
```

**Disable animations on slow devices:**
```css
/* Respect user's motion preferences */
@media (prefers-reduced-motion: reduce) {
    * {
        animation: none !important;
        transition: none !important;
    }
}
```

#### Issue: Changes to CSS/JS don't appear

**Likely causes:**
1. Browser cache showing old version
2. Editing wrong file
3. CDN hasn't updated

**Solutions:**

**Hard refresh:**
- Windows/Linux: `Ctrl + Shift + R` or `Ctrl + F5`
- Mac: `Cmd + Shift + R`

**Clear cache completely:**
1. Open DevTools (F12)
2. Right-click refresh button
3. Select "Empty Cache and Hard Reload"

**Check which files are loaded:**
1. Open DevTools → Network tab
2. Refresh page
3. Look for `main.css` and `main.js`
4. Click on them to see their contents
5. Verify your changes are there

**Bypass CDN for testing:**
```html
<!-- Temporary: Load from local files -->
<link rel="stylesheet" href="css/main.css">
<script src="js/main.js"></script>

<!-- Production: Load from CDN -->
<link rel="stylesheet" href="https://tcia-admin.github.io/...">
```

---

## Advanced Customization

### Adding a Title/Header Section

**Add before the timeline:**

```html
<section class="ndauwu-algo-harm">
    <!-- NEW: Title section -->
    <div class="timeline-header">
        <h1>Algorithmic Harm Timeline</h1>
        <p>A chronological history of documented algorithmic harm</p>
    </div>
    
    <!-- Existing timeline -->
    <div class="timeline">
        ...
    </div>
</section>
```

**Style it:**

```css
.timeline-header {
    text-align: center;
    padding: 80px 20px 40px;
    max-width: 800px;
    margin: 0 auto;
}

.timeline-header h1 {
    font-size: 3rem;
    color: #ffffff;
    margin-bottom: 1rem;
}

.timeline-header p {
    font-size: 1.25rem;
    color: #808285;
    line-height: 1.6;
}
```

### Adding Timeline Sections/Categories

**Group timeline items by category:**

```html
<div class="timeline">
    <!-- Section 1 -->
    <div class="timeline-section">
        <h2 class="section-label">2019 Events</h2>
        <div class="timeline-item">...</div>
        <div class="timeline-item">...</div>
    </div>
    
    <!-- Section 2 -->
    <div class="timeline-section">
        <h2 class="section-label">2020 Events</h2>
        <div class="timeline-item">...</div>
        <div class="timeline-item">...</div>
    </div>
</div>
```

**Style section labels:**

```css
.timeline-section {
    margin-bottom: 40px;
}

.section-label {
    font-size: 1.5rem;
    color: #3498db;
    text-align: center;
    margin: 40px 0 20px;
    padding: 10px;
    border-bottom: 2px solid #3498db;
}
```

### Custom Progress Bar Styles

**Rounded ends:**

```css
.scroll-progress-horizontal {
    height: 8px;  /* Slightly taller */
    border-radius: 4px;  /* Rounded ends */
}
```

**Multiple color stops:**

```css
.scroll-progress-horizontal {
    background: linear-gradient(90deg, 
        #ff0000 0%,    /* Red */
        #ff9900 25%,   /* Orange */
        #ffff00 50%,   /* Yellow */
        #00ff00 75%,   /* Green */
        #0000ff 100%   /* Blue */
    );
}
```

**Animated gradient:**

```css
.scroll-progress-horizontal {
    background: linear-gradient(90deg, #3498db, #2ecc71, #3498db);
    background-size: 200% 100%;
    animation: gradient-shift 3s ease infinite;
}

@keyframes gradient-shift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}
```

### Alternative Animation Styles

**Slide in from left:**

```javascript
// Change in main.js, line 19:
item.style.transform = 'translateX(-50px)';  // Start 50px to the left

// And line 12:
entry.target.style.transform = 'translateX(0)';  // Slide to normal position
```

**Scale up:**

```javascript
// Change in main.js:
item.style.transform = 'scale(0.8)';  // Start smaller
// ...
entry.target.style.transform = 'scale(1)';  // Grow to full size
```

**Rotate in:**

```javascript
item.style.transform = 'rotateX(90deg)';  // Start rotated
item.style.transformOrigin = 'top';       // Rotate from top edge
// ...
entry.target.style.transform = 'rotateX(0deg)';  // Rotate to flat
```

**Combine multiple:**

```javascript
item.style.transform = 'translateY(20px) scale(0.95) rotateX(10deg)';
// ...
entry.target.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
```

### Adding Scroll Indicator at Start

**Encourage users to scroll:**

```html
<div class="scroll-indicator">
    <div class="scroll-arrow">↓</div>
    <span>Scroll to explore timeline</span>
</div>
```

**CSS:**

```css
.scroll-indicator {
    position: fixed;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    color: white;
    opacity: 1;
    transition: opacity 0.3s ease;
    z-index: 999;
}

.scroll-indicator.hidden {
    opacity: 0;
    pointer-events: none;
}

.scroll-arrow {
    font-size: 2rem;
    animation: bounce 2s infinite;
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}
```

**JavaScript to hide after scrolling:**

```javascript
// Add to main.js:
const scrollIndicator = document.querySelector('.scroll-indicator');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        scrollIndicator.classList.add('hidden');
    }
});
```

### Dark Mode Toggle

**Add toggle button:**

```html
<button class="theme-toggle">🌙</button>
```

**CSS:**

```css
:root {
    --bg-color: #1a1919;
    --text-color: #ffffff;
}

[data-theme="light"] {
    --bg-color: #f0f0f0;
    --text-color: #000000;
}

body {
    background-color: var(--bg-color);
    color: var(--text-color);
    transition: background-color 0.3s ease, color 0.3s ease;
}

.theme-toggle {
    position: fixed;
    top: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 50%;
    background: #333;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    z-index: 1001;
}
```

**JavaScript:**

```javascript
const themeToggle = document.querySelector('.theme-toggle');
const root = document.documentElement;

themeToggle.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    root.setAttribute('data-theme', newTheme);
    themeToggle.textContent = newTheme === 'light' ? '☀️' : '🌙';
    
    // Save preference
    localStorage.setItem('theme', newTheme);
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    root.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'light' ? '☀️' : '🌙';
}
```

### Adding Timeline Dates/Labels

**Overlay text on images:**

```html
<div class="timeline-item">
    <div class="timeline-content">
        <div class="timeline-date">January 2019</div>
        <img src="..." alt="Timeline Event 1">
    </div>
</div>
```

**CSS:**

```css
.timeline-content {
    position: relative;  /* Make this the positioning context */
}

.timeline-date {
    position: absolute;
    top: 20px;
    left: 20px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 8px 16px;
    border-radius: 4px;
    font-size: 0.9rem;
    font-weight: bold;
    z-index: 10;
}
```

### Responsive Adjustments

**Hide vertical progress on mobile:**

```css
@media screen and (max-width: 768px) {
    .scroll-progress-vertical {
        display: none;
    }
}
```

**Adjust timeline width on mobile:**

```css
@media screen and (max-width: 768px) {
    .timeline {
        max-width: 100%;  /* Full width on mobile */
        padding: 0 10px;  /* Small side padding */
    }
}
```

**Smaller back-to-top button on mobile:**

```css
@media screen and (max-width: 768px) {
    .back-to-top {
        width: 35px;
        height: 35px;
        bottom: 15px;
        right: 15px;
        font-size: 18px;
    }
}
```

---

## Quick Reference Cheat Sheet

### Most Common Tasks

| Task | File | Line(s) | What to Change |
|------|------|---------|----------------|
| Add timeline event | `algo-harm-timeline.html` | 10-126 | Copy timeline-item block |
| Remove timeline event | `algo-harm-timeline.html` | 10-126 | Delete timeline-item block |
| Change background color | `main.css` | 11, 16, 24, 30, 36 | Change `#1a1919` |
| Change progress colors | `main.css` | 61, 75 | Change gradient colors |
| Adjust fade-in speed | `main.js` | 20 | Change `0.5s` value |
| Change when button appears | `main.js` | 37 | Change `500` (pixels) |
| Adjust timeline width | `main.css` | 21 | Change `max-width: 1000px` |
| Change fade-in distance | `main.js` | 19 | Change `translateY(20px)` |

### CSS Classes Reference

| Class | Purpose | Type |
|-------|---------|------|
| `.ndauwu-algo-harm` | Main container | Section |
| `.timeline` | Timeline wrapper | Container |
| `.timeline-item` | Individual event | Item |
| `.timeline-content` | Content wrapper | Item part |
| `.scroll-progress-horizontal` | Top progress bar | UI element |
| `.scroll-progress-vertical` | Side indicator | UI element |
| `.back-to-top` | Scroll-to-top button | UI element |
| `.visible` | Shows back-to-top button | Modifier |

### JavaScript Functions Overview

| Function/Feature | Lines | Purpose |
|------------------|-------|---------|
| DOMContentLoaded listener | 1-52 | Waits for page load |
| DOM element caching | 2-5 | Stores element references |
| Intersection Observer | 8-15 | Watches for visibility |
| Timeline initialization | 17-22 | Sets up fade-in effect |
| Scroll handler | 25-43 | Updates progress indicators |
| Back-to-top handler | 46-51 | Scrolls to top on click |

### Color Reference

| Element | Color Code | Description |
|---------|------------|-------------|
| Background | `#1a1919` | Very dark grey |
| Progress start | `#3498db` | Blue |
| Progress end | `#2ecc71` | Green |
| Button text | `#ffffff` | White |

### Key Measurements

| Property | Value | Element |
|----------|-------|---------|
| Timeline max-width | 1000px | `.timeline` |
| Progress bar height | 6px | `.scroll-progress-horizontal` |
| Progress indicator width | 3px | `.scroll-progress-vertical` |
| Progress indicator height | 50px | `.scroll-progress-vertical` |
| Button size | 40x40px | `.back-to-top` |
| Button trigger | 500px scroll | JavaScript |
| Fade-in duration | 0.5s | JavaScript |
| Fade-in distance | 20px | JavaScript |

### Browser DevTools Shortcuts

| Action | Windows/Linux | Mac |
|--------|---------------|-----|
| Open DevTools | F12 or Ctrl+Shift+I | Cmd+Option+I |
| Hard refresh | Ctrl+Shift+R | Cmd+Shift+R |
| Device toolbar | Ctrl+Shift+M | Cmd+Shift+M |
| Console | Ctrl+Shift+J | Cmd+Option+J |

---

## Getting Help

### Debugging Checklist

Before asking for help, try these steps:

1. **Check browser console:**
   - Press F12 → Console tab
   - Look for red error messages
   
2. **Test in different browser:**
   - Chrome, Firefox, Safari
   - Some issues are browser-specific
   
3. **Verify files are loaded:**
   - F12 → Network tab → Refresh page
   - Look for `main.css` and `main.js`
   - Should both show status 200 (success)
   
4. **Clear cache:**
   - Hard refresh: Ctrl+Shift+R (Windows) / Cmd+Shift+R (Mac)
   
5. **Test on different device:**
   - Desktop vs. mobile
   - Use DevTools device simulator

### Common Console Messages

**"Cannot read property 'style' of null"**
- Element doesn't exist in HTML
- Check class names match exactly
- Ensure HTML loads before JavaScript runs

**"Failed to load resource: 404"**
- File not found
- Check URLs in HTML are correct
- Verify files are uploaded to server

**"Uncaught SyntaxError"**
- JavaScript syntax error
- Missing bracket, parenthesis, or quote
- Use code editor with syntax highlighting

### Useful Resources

**Learning HTML/CSS/JavaScript:**
- MDN Web Docs: https://developer.mozilla.org/
- JavaScript.info: https://javascript.info/
- CSS Tricks: https://css-tricks.com/

**Testing Tools:**
- Chrome DevTools: https://developer.chrome.com/docs/devtools/
- Can I Use (browser support): https://caniuse.com/
- WebAIM (accessibility): https://webaim.org/

**Performance:**
- PageSpeed Insights: https://pagespeed.web.dev/
- TinyPNG (image compression): https://tinypng.com/
- GTmetrix: https://gtmetrix.com/

**Debugging JavaScript:**
```javascript
// Add these to main.js for debugging:

// Check if elements exist
console.log('Timeline items:', timelineItems.length);
console.log('Back to top:', backToTopButton);

// Track scroll progress
window.addEventListener('scroll', () => {
    console.log('Scroll Y:', window.scrollY);
});

// Verify observer is working
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        console.log('Item visible:', entry.isIntersecting);
    });
});
```

---

## Accessibility Considerations

### Current Implementation

**Good:**
- Semantic `<button>` element
- Image alt text
- Keyboard accessible
- Smooth scroll respects user preferences

**Could improve:**
- Add ARIA labels
- Support reduced motion preferences
- Improve color contrast for text overlays
- Add skip navigation

### Improvements to Consider

**1. Respect reduced motion:**

```css
/* Add to main.css */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
```

**2. Add ARIA labels:**

```html
<section class="ndauwu-algo-harm" aria-label="Algorithmic Harm Timeline">
    <div class="timeline" role="list">
        <div class="timeline-item" role="listitem">
            ...
        </div>
    </div>
</section>

<button class="back-to-top" aria-label="Scroll to top">↑</button>
```

**3. Keyboard navigation for progress:**

```html
<div class="scroll-progress-horizontal" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" aria-label="Page scroll progress"></div>
```

```javascript
// Update aria-valuenow in scroll handler:
const percentage = Math.round(scrolled * 100);
progressHorizontal.setAttribute('aria-valuenow', percentage);
```

**4. Focus styles:**

```css
.back-to-top:focus {
    outline: 3px solid #3498db;
    outline-offset: 3px;
}
```

---

## Performance Optimization

### Current Optimizations

✅ **requestAnimationFrame for scroll**
- Syncs with browser refresh rate
- Prevents layout thrashing

✅ **Intersection Observer for visibility**
- More efficient than scroll listeners
- Browser-optimized

✅ **Transform for animations**
- GPU-accelerated
- Doesn't trigger reflow

✅ **Cached DOM queries**
- Query once, reuse many times
- Faster than repeated queries

### Additional Optimizations

**Lazy load images:**

```html
<img src="..." alt="..." loading="lazy">
```

**Add will-change hint:**

```css
.timeline-item {
    will-change: opacity, transform;
}

/* Remove after animation */
.timeline-item.animated {
    will-change: auto;
}
```

**Debounce scroll handler:**

```javascript
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = requestAnimationFrame(() => {
        // Update logic here
    });
});
```

**Use CSS containment:**

```css
.timeline-item {
    contain: layout style paint;
}
```

---

## Version History

**Version 1.0** - October 30, 2025
- Initial comprehensive documentation
- Complete CSS and JavaScript explanation
- Common tasks guide
- Troubleshooting section
- Advanced customization examples

---

## Credits

**Design:** Notice Coalition
**Development:** TCIA Team
**Timeline Graphics:** Embedded images from Squarespace CDN

---

**Last Updated:** October 30, 2025

**Questions?** If this documentation doesn't answer your question, please contact the development team with:
1. What you're trying to accomplish
2. What you've already tried
3. Screenshots of any errors
4. Browser console output (if applicable)
5. Which browser and device you're using

---

**Made for the Notice Coalition Algorithmic Harm Timeline**


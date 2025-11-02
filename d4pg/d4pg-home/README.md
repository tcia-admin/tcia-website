# D4PG Home Page

## 📋 Table of Contents

- [Overview](#overview)
- [File Structure](#file-structure)
- [Quick Start Guide](#quick-start-guide)
- [Design System](#design-system)
- [Page Sections](#page-sections)
- [JavaScript Features](#javascript-features)
- [CSS Architecture](#css-architecture)
- [Common Tasks](#common-tasks)
- [Troubleshooting](#troubleshooting)
- [Advanced Customization](#advanced-customization)

---

## Overview

The D4PG home page is a modern, responsive website built with vanilla HTML, CSS, and JavaScript. It features:

- **Responsive Design**: Works on all devices (mobile, tablet, desktop)
- **Interactive Carousels**: Speaker and workshop showcases
- **Dynamic Content**: Loads speaker bios and workshop data from JSON files
- **Photo Gallery**: Lazy-loaded images with caching
- **Modal Windows**: Speaker details, schedule sidebar, image viewer
- **Smooth Animations**: Professional transitions and effects

**Technology Stack:**
- Pure HTML5 (no frameworks)
- CSS3 with CSS Variables for theming
- Vanilla JavaScript ES6+ (no jQuery or libraries)
- External data loaded via JSON APIs

---

## File Structure

```
d4pg-home/
├── d4pg-home.html          # Main HTML file
├── js/
│   └── main.js             # All JavaScript functionality
├── css/
│   └── main.css            # All styles and responsive design
└── README.md               # This file
```

### External Resources

The page loads some resources from hosted URLs:
- **CSS**: `https://tcia-admin.github.io/tcia-website/d4pg/d4pg-home/css/main.css`
- **JS**: `https://tcia-admin.github.io/tcia-website/d4pg/d4pg-home/js/main.js`
- **Speaker Data**: `https://tcia-admin.github.io/tcia-server-files/d4pg-bios-2025.json`
- **Workshop Data**: `https://tcia-admin.github.io/tcia-server-files/d4pg-schedule-day[1-3].json`

---

## Quick Start Guide

### For Non-Technical Users

**To change text content:**
1. Open `d4pg-home.html` in a text editor
2. Find the text you want to change (use Ctrl+F / Cmd+F)
3. Edit the text between the HTML tags
4. Save the file

**Example - Changing the About section:**
```html
<!-- BEFORE -->
<p>Data For Public Good (D4PG) is a collective space...</p>

<!-- AFTER -->
<p>Your new text here...</p>
```

**To change colors:**
1. Open `css/main.css`
2. Find the `:root` section at the top
3. Change the color values
4. Save the file

---

## Design System

### Color Palette

All colors are defined as CSS variables in `css/main.css`. This makes it easy to update the entire site's color scheme from one location.

```css
:root {
    /* Brand Colors */
    --d4pg-navy: #051335;        /* Dark background */
    --d4pg-blue: #1f3070;        /* Medium blue */
    --d4pg-light-blue: #989fd5;  /* Light blue/purple */
    --d4pg-coral: #ff7f6d;       /* Buttons & accents */
    --d4pg-yellow: #f3e04b;      /* Highlights */
    --d4pg-green: #4adb97;       /* Success/positive */
    --d4pg-pink: #ff3dc8;        /* Accents */
    --d4pg-white: #ffffff;       /* Text */
}
```

**How to change colors:**

1. **Change primary button color:**
```css
/* Find this line and change the hex code */
--d4pg-coral: #ff7f6d;  /* Change to your color */
```

2. **Change background color:**
```css
--d4pg-navy: #051335;  /* Change to your color */
```

3. Save the file - all buttons, links, and elements using that variable will update automatically!

### Typography

Font sizes use a consistent scale:

```css
:root {
    --font-size-xs: 0.75rem;    /* 12px */
    --font-size-sm: 0.875rem;   /* 14px */
    --font-size-med: 1rem;      /* 16px */
    --font-size-base: 1.25rem;  /* 20px */
    --font-size-lg: 1.5rem;     /* 24px */
    --font-size-xl: 1.75rem;    /* 28px */
    --font-size-2xl: 2.5rem;    /* 40px */
    --font-size-3xl: 3.5rem;    /* 56px */
}
```

**Font families:**
```css
--font-primary: "All Round Gothic", Arial, sans-serif;
--font-secondary: "Proxima Nova", sans-serif;
--font-accent: "Poppins", "Helvetica Neue", Arial, sans-serif;
```

### Spacing System

Consistent spacing throughout the site:

```css
:root {
    --spacing-xs: 0.25rem;   /* 4px */
    --spacing-sm: 0.5rem;    /* 8px */
    --spacing-md: 1rem;      /* 16px */
    --spacing-lg: 1.5rem;    /* 24px */
    --spacing-xl: 2rem;      /* 32px */
    --spacing-2xl: 3rem;     /* 48px */
    --spacing-3xl: 4rem;     /* 64px */
    --spacing-4xl: 5rem;     /* 80px */
}
```

---

## Page Sections

The page is divided into distinct sections, each with its own purpose:

### 1. Navigation Bar (`nav-section`)

**Purpose**: Sticky navigation that stays at top while scrolling

**Key Elements:**
- Logo and year (2025)
- Navigation links (About, Speakers, Workshops, Community)
- Gallery button
- Schedule button
- Mobile hamburger menu

**How to edit navigation links:**
```html
<div class="nav-links" id="navLinks">
    <a href="#about"><span class="nav-number">01</span> About</a>
    <a href="#speakers-promo"><span class="nav-number">02</span> Speakers</a>
    <!-- Add your new link here -->
    <a href="#your-section"><span class="nav-number">05</span> Your Section</a>
</div>
```

### 2. Multimedia/Sizzle Reel Section

**Purpose**: Showcase conference video with description

**Key Elements:**
- Title and description text
- YouTube video embed with custom play button overlay

**How to change the video:**
```html
<!-- Find this iframe and replace the src URL -->
<iframe 
    src="https://www.youtube.com/embed/YOUR-VIDEO-ID-HERE" 
    title="D4PG Sizzle Reel" 
    allowfullscreen>
</iframe>
```

### 3. About Section (`about-section`)

**Purpose**: Explain what D4PG is and what attendees will gain

**Key Elements:**
- Section title
- Info cards with descriptions
- Images with click-to-enlarge functionality

**How to add a new benefit:**
```html
<ul class="card-list">
    <li>Learn about resources and tools</li>
    <li>Your new benefit here</li>
</ul>
```

### 4. Donation Section (`donation-section`)

**Purpose**: Encourage financial support with embedded donation form

**Key Elements:**
- Benefits list
- Embedded iframe form
- Security badge

**How to change the donation form:**
```html
<!-- Find this iframe and replace the src -->
<iframe 
    src="https://app.youform.com/forms/YOUR-FORM-ID"
    title="Support D4PG - Donation Form">
</iframe>
```

### 5. Speakers Section (`speakers-promo`)

**Purpose**: Showcase speakers with interactive carousel and modal bios

**Key Components:**
- Speaker carousel (auto-rotates)
- Click-to-view-bio functionality
- Modal with full biography, social links, and publications

**How to add a new speaker:**

1. **Add speaker card to HTML:**
```html
<div class="speaker" data-speaker-id="speaker-new-person">
    <img src="URL-TO-PHOTO" alt="Speaker Name">
</div>
```

2. **Add speaker data to JSON file** (hosted separately):
```json
{
  "id": "speaker-new-person",
  "name": "Jane Doe",
  "pronouns": "she/her",
  "title": "Director of Innovation",
  "photo": "URL-TO-PHOTO",
  "bio": [
    "First paragraph of bio...",
    "Second paragraph..."
  ],
  "social": {
    "personal": [
      {
        "type": "twitter",
        "url": "https://twitter.com/username"
      }
    ]
  }
}
```

**Speaker carousel settings:**
- Auto-rotates every 10 seconds
- Pauses on hover
- Shows 4 speakers on desktop, 3 on tablet, 2 on mobile, 1 on small mobile
- Manual navigation with arrow buttons

### 6. Workshops Section (`workshops-section`)

**Purpose**: Display workshop schedule with interactive day tabs

**Key Features:**
- Day tabs (Day 1, Day 2, Day 3)
- Workshop carousel with time and presenter
- Auto-rotating display (30 seconds per workshop)

**Workshop Data Loading:**
The workshops are loaded from JSON files:
- `d4pg-schedule-day1.json`
- `d4pg-schedule-day2.json`
- `d4pg-schedule-day3.json`

**JSON Structure:**
```json
{
  "events": [
    {
      "type": "workshop",
      "title": "Workshop Title",
      "description": "Workshop description...",
      "startTime": "10:00",
      "endTime": "11:30",
      "people": {
        "speakers": [
          {"name": "Presenter Name"}
        ]
      }
    }
  ]
}
```

### 7. Community Section (`community-engagement-section`)

**Purpose**: Promote community membership (currently shows "Coming Soon")

**How to enable when ready:**
1. Change the disabled button to active
2. Add link to community platform
3. Update "Coming Soon" text

### 8. Gallery Drawer

**Purpose**: Photo gallery that slides in from the side

**Key Features:**
- Lazy loading (images load as you scroll)
- Caching (stores images for 1 hour)
- Masonry layout (Pinterest-style)
- Click to enlarge

**How gallery images are loaded:**
1. Checks localStorage cache first
2. If cache is fresh (< 1 hour), uses cached images
3. Otherwise, fetches from proxy endpoint
4. Falls back to hardcoded images if fetch fails

**Fallback images array** (in `js/main.js`):
```javascript
const fallbackGalleryImages = [
    'https://images.squarespace-cdn.com/content/...',
    'https://images.squarespace-cdn.com/content/...',
    // Add more URLs here
];
```

---

## JavaScript Features

All JavaScript is in `js/main.js`. Here's what each feature does:

### 1. Smooth Scrolling Navigation

**What it does:** When you click a navigation link, the page smoothly scrolls to that section.

**Code location:** Lines 2-28

**How it works:**
```javascript
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault(); // Stop normal jump
        const section = document.querySelector(this.getAttribute('href'));
        section.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll
    });
});
```

**To disable smooth scrolling:**
Change `behavior: 'smooth'` to `behavior: 'auto'`

### 2. Active Navigation Highlighting

**What it does:** Highlights the current section in the navigation bar as you scroll.

**Code location:** Lines 11-28

**How it works:**
- Listens for scroll events
- Checks which section is currently in view
- Adds 'active' class to corresponding nav link

### 3. Speaker Carousel

**What it does:** Rotates through speaker photos automatically, with manual controls.

**Code location:** Lines 31-179

**Key settings you can change:**

```javascript
// Auto-scroll interval (10 seconds)
autoScrollInterval = setInterval(() => {
    // Auto-scroll code...
}, 10000); // Change this number (milliseconds)

// Speakers per page by screen size
if (screenWidth <= 480) {
    speakersPerPage = 1; // Mobile
} else if (screenWidth <= 768) {
    speakersPerPage = 2; // Tablet
} else if (screenWidth <= 1024) {
    speakersPerPage = 3; // Small desktop
} else {
    speakersPerPage = 4; // Large desktop
}
```

**Carousel controls:**
- **Auto-rotation**: Every 10 seconds
- **Pause on hover**: Stops rotating when mouse hovers over speakers
- **Manual arrows**: Left and right buttons
- **Responsive**: Adjusts number of visible speakers based on screen size

### 4. Speaker Bio Modal

**What it does:** Shows detailed speaker biography when clicking a speaker photo.

**Code location:** Lines 277-629

**Features:**
- Loads speaker data from JSON file
- Markdown formatting support (**bold**, *italic*, [links](url))
- Social media links with icons
- Book/publication showcases
- Keyboard accessible (Tab, Enter, Escape)

**Markdown formatting in bios:**
```javascript
// **bold** → <strong>bold</strong>
// *italic* → <em>italic</em>
// __underline__ → <u>underline</u>
// [text](url) → <a href="url">text</a>
```

**Social media icons supported:**
- Instagram, Twitter/X, LinkedIn, GitHub
- YouTube, Facebook, Mastodon, TikTok
- Bluesky, Generic website

### 5. Workshop Carousel & Day Tabs

**What it does:** Displays workshops organized by day with rotating preview.

**Code location:** Lines 634-863

**Settings:**
```javascript
const ROTATION_TIME = 30000; // 30 seconds per workshop
```

**Workshop tag auto-generation:**
The code automatically assigns category tags based on workshop title keywords:

```javascript
function generateWorkshopTag(title) {
    const lowerTitle = title.toLowerCase();
    
    if (lowerTitle.includes('data') || lowerTitle.includes('sovereignty')) {
        return 'Data Justice';
    } else if (lowerTitle.includes('ai') || lowerTitle.includes('algorithm')) {
        return 'AI Ethics';
    } else if (lowerTitle.includes('afrofutur')) {
        return 'Afrofuturism';
    }
    // ... more categories
}
```

**To add a new category:**
```javascript
else if (lowerTitle.includes('your-keyword')) {
    return 'Your Category';
}
```

### 6. Gallery Drawer with Image Caching

**What it does:** Side-sliding photo gallery with smart loading and caching.

**Code location:** Lines 868-1168

**Cache settings:**
```javascript
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds
```

**How caching works:**
1. User opens gallery
2. Check if images exist in localStorage
3. Check if cache timestamp is less than 1 hour old
4. If yes, use cached images (instant load)
5. If no, fetch fresh images from server
6. Store new images in cache with timestamp

**To adjust cache duration:**
```javascript
const CACHE_DURATION = 2 * 60 * 60 * 1000; // 2 hours
```

**Gallery features:**
- **Lazy loading**: Images load only when scrolled into view
- **Intersection Observer**: Efficient scrolling performance
- **Masonry layout**: Pinterest-style grid
- **Click to enlarge**: Full-screen image modal
- **Escape key**: Close with keyboard

### 7. Mobile Schedule Sidebar

**What it does:** Full-height sidebar that slides in with iframe schedule.

**Code location:** Lines 181-211, 271-302

**How to change schedule URL:**
```javascript
iframe.src = '/your-schedule-page-url';
```

### 8. Image Modal/Lightbox

**What it does:** Click any about section image to view full-screen.

**Code location:** Lines 224-268

**Features:**
- Click to open
- Click outside to close
- Escape key to close
- Smooth animations
- Image caption support

---

## CSS Architecture

### Responsive Breakpoints

The site adapts to different screen sizes using media queries:

```css
/* Mobile (Portrait) */
@media screen and (max-width: 480px) { /* 480px and smaller */ }

/* Tablet */
@media screen and (max-width: 768px) { /* 768px and smaller */ }

/* Small Desktop */
@media screen and (max-width: 1024px) { /* 1024px and smaller */ }

/* Medium Desktop */
@media screen and (max-width: 1200px) { /* 1200px and smaller */ }

/* Large Desktop */
@media screen and (min-width: 1400px) { /* 1400px and larger */ }
```

### Layout System

**Container:**
```css
.container {
    max-width: 2000px;
    margin: 0 auto;
    padding: 0 1rem;
}
```

**Grid layouts:**
```css
/* Two-column grid */
.about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr; /* Equal columns */
    gap: 2rem;
}

/* On mobile, stack vertically */
@media screen and (max-width: 768px) {
    .about-grid {
        grid-template-columns: 1fr; /* Single column */
    }
}
```

### Animation System

**Smooth transitions:**
```css
.button {
    transition: all 0.3s ease; /* Smooth change over 0.3 seconds */
}

.button:hover {
    transform: translateY(-3px); /* Move up 3px */
    box-shadow: 0 6px 20px rgba(0,0,0,0.3); /* Add shadow */
}
```

**Keyframe animations:**
```css
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.element {
    animation: fadeIn 0.5s ease;
}
```

---

## Common Tasks

### Task 1: Change Site Colors

**Step-by-step:**

1. Open `css/main.css`
2. Find the `:root` section (top of file)
3. Change the color values:

```css
:root {
    /* Change these hex codes to your colors */
    --d4pg-coral: #YOUR_COLOR;  /* Buttons */
    --d4pg-navy: #YOUR_COLOR;   /* Background */
    --d4pg-white: #YOUR_COLOR;  /* Text */
}
```

4. Save the file
5. Refresh your browser (Ctrl+F5 / Cmd+Shift+R)

**Color tool recommendations:**
- [Coolors.co](https://coolors.co) - Color palette generator
- [Adobe Color](https://color.adobe.com) - Professional color wheels

### Task 2: Update Speaker Photos/Bios

**Option A: Update the HTML (photos only)**

1. Open `d4pg-home.html`
2. Find the speaker section (search for "speaker-row")
3. Update image URLs:

```html
<div class="speaker" data-speaker-id="speaker-name">
    <img src="NEW_IMAGE_URL" alt="Speaker Name">
</div>
```

**Option B: Update JSON (full bio)**

1. Access the JSON file at: `tcia-server-files/d4pg-bios-2025.json`
2. Add or update speaker objects:

```json
{
  "speakers": [
    {
      "id": "speaker-jane-doe",
      "name": "Jane Doe",
      "pronouns": "she/her",
      "title": "Executive Director",
      "photo": "https://your-image-url.jpg",
      "bio": [
        "Paragraph 1 of bio...",
        "Paragraph 2 with **bold** and *italic* text."
      ],
      "social": {
        "personal": [
          {
            "type": "linkedin",
            "url": "https://linkedin.com/in/username"
          }
        ]
      },
      "promotional": {
        "books": [
          {
            "title": "Book Title",
            "cover_image": "URL",
            "description": "Book description",
            "purchase_url": "https://buy-link",
            "label": "Buy Now"
          }
        ]
      }
    }
  ]
}
```

3. Save the JSON file
4. The site will automatically load the new data

### Task 3: Add a New Section

**Step-by-step:**

1. **Add HTML section:**

```html
<!-- Add before the closing </section> tag -->
<section id="your-new-section" class="your-section-class">
    <div class="container">
        <h2 class="section-title">Your Section Title</h2>
        <p>Your content here...</p>
    </div>
</section>
```

2. **Add navigation link:**

```html
<div class="nav-links">
    <!-- Existing links -->
    <a href="#your-new-section"><span class="nav-number">05</span> New Section</a>
</div>
```

3. **Add CSS styling:**

```css
.your-section-class {
    padding: 4rem 1.5rem;
    background-color: var(--d4pg-navy);
}

/* Mobile responsive */
@media screen and (max-width: 768px) {
    .your-section-class {
        padding: 2rem 1rem;
    }
}
```

### Task 4: Customize Speaker Carousel Speed

**To change rotation speed:**

1. Open `js/main.js`
2. Find this line (around line 144):

```javascript
autoScrollInterval = setInterval(() => {
    // rotation code
}, 10000); // ← Change this number
```

3. Change the number (in milliseconds):
   - 5000 = 5 seconds
   - 10000 = 10 seconds (current)
   - 15000 = 15 seconds

**To change pause time after manual navigation:**

```javascript
setTimeout(() => {
    startAutoScroll();
}, 10000); // ← Change this number
```

### Task 5: Update Workshop Data

Workshops load from three JSON files. Update the appropriate file:

**File structure:**
```json
{
  "date": "2025-07-16",
  "events": [
    {
      "type": "workshop",
      "title": "Workshop Title Here",
      "description": "Detailed description of the workshop...",
      "startTime": "10:00",
      "endTime": "11:30",
      "location": "Room Name",
      "people": {
        "speakers": [
          {"name": "Facilitator Name"}
        ]
      }
    }
  ]
}
```

**Time format:** Use 24-hour format (e.g., "14:30" for 2:30 PM)

### Task 6: Add Gallery Images

**Option A: Update fallback images (quick):**

1. Open `js/main.js`
2. Find `fallbackGalleryImages` array (around line 971)
3. Add your image URLs:

```javascript
const fallbackGalleryImages = [
    'https://your-image-1.jpg',
    'https://your-image-2.jpg',
    'https://your-image-3.jpg',
    // Add more here
];
```

**Option B: Update proxy endpoint:**

If you have a dynamic gallery source, update the fetch URL:

```javascript
const response = await fetch('/your-gallery-endpoint');
```

### Task 7: Change Fonts

**Step 1: Load the font**

Add to the top of `css/main.css` or in your HTML `<head>`:

```css
/* Google Fonts example */
@import url('https://fonts.googleapis.com/css2?family=Your+Font:wght@400;700&display=swap');
```

**Step 2: Update font variables**

```css
:root {
    --font-primary: "Your Font Name", Arial, sans-serif;
    --font-accent: "Your Accent Font", sans-serif;
}
```

### Task 8: Customize Button Styles

**Find button styles in CSS:**

```css
.promo-button {
    background-color: var(--d4pg-coral);
    color: white;
    padding: 15px 30px;
    border-radius: 8px; /* Rounded corners */
    font-size: 1.2rem;
    text-transform: uppercase;
}

.promo-button:hover {
    background-color: var(--d4pg-yellow);
    transform: translateY(-2px); /* Lift effect */
}
```

**To make buttons more rounded:**
```css
border-radius: 50px; /* Fully rounded pill shape */
```

**To remove hover effects:**
```css
.promo-button:hover {
    /* Comment out or remove transform */
    /* transform: translateY(-2px); */
}
```

---

## Troubleshooting

### Problem: JavaScript not working

**Check:**
1. Is the script tag present in HTML?
   ```html
   <script src="https://tcia-admin.github.io/tcia-website/d4pg/d4pg-home/js/main.js" defer></script>
   ```

2. Open browser console (F12) - are there errors?

3. Check if file path is correct

4. Make sure `defer` attribute is present

### Problem: Styles not loading

**Check:**
1. Is the CSS link present in HTML?
   ```html
   <link rel="stylesheet" href="https://tcia-admin.github.io/tcia-website/d4pg/d4pg-home/css/main.css">
   ```

2. Clear browser cache (Ctrl+Shift+R / Cmd+Shift+R)

3. Check browser console for 404 errors

4. Verify file path is correct

### Problem: Speaker bios not loading

**Check:**
1. JSON file URL is correct: `https://tcia-admin.github.io/tcia-server-files/d4pg-bios-2025.json`

2. JSON file is valid (use [JSONLint](https://jsonlint.com) to validate)

3. Speaker `data-speaker-id` in HTML matches `id` in JSON

4. Browser console for error messages

**Common JSON errors:**
```json
// ❌ WRONG - Missing comma
{
  "name": "Jane Doe"
  "title": "Director"
}

// ✅ CORRECT
{
  "name": "Jane Doe",
  "title": "Director"
}
```

### Problem: Workshop carousel not working

**Check:**
1. All three JSON files exist:
   - `d4pg-schedule-day1.json`
   - `d4pg-schedule-day2.json`
   - `d4pg-schedule-day3.json`

2. JSON format is correct (must have `events` array)

3. Events have `type: "workshop"`

4. Browser console for error messages

### Problem: Mobile navigation not opening

**Check:**
1. Function `toggleMobileNav()` exists in JavaScript

2. Button has correct `onclick` attribute:
   ```html
   <button class="nav-toggle" onclick="toggleMobileNav()">
   ```

3. Element with `id="navLinks"` exists

### Problem: Gallery images not loading

**Possible causes:**
1. **Cache issue**: Clear localStorage
   - Open browser console
   - Type: `localStorage.clear()`
   - Press Enter

2. **Proxy endpoint down**: Site will use fallback images

3. **Network issues**: Check browser Network tab (F12)

**To debug:**
```javascript
// Check cache in browser console:
console.log(localStorage.getItem('d4pg_gallery_images'));

// Clear cache manually:
localStorage.removeItem('d4pg_gallery_images');
localStorage.removeItem('d4pg_gallery_timestamp');
```

### Problem: Carousel arrows not showing

**Cause**: Not enough speakers to paginate

**Solution**: The code automatically hides arrows when there's only one page of speakers. This is normal behavior.

### Problem: Modal won't close

**Check:**
1. Close button exists and has correct ID
2. Escape key handler is attached
3. Outside-click handler is attached

**Force close via console:**
```javascript
// Open browser console and type:
document.getElementById('speakerModal').classList.remove('active');
document.body.style.overflow = '';
```

---

## Advanced Customization

### Adding Animation Effects

**Fade-in on scroll:**

1. **Add CSS:**
```css
.fade-in-section {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-in-section.visible {
    opacity: 1;
    transform: translateY(0);
}
```

2. **Add JavaScript:**
```javascript
// Add to DOMContentLoaded event
const fadeElements = document.querySelectorAll('.fade-in-section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
});

fadeElements.forEach(el => observer.observe(el));
```

3. **Add class to HTML elements:**
```html
<section class="fade-in-section">
    <!-- Content will fade in when scrolled into view -->
</section>
```

### Creating Custom Modal Windows

**1. Add HTML structure:**
```html
<div class="custom-modal" id="myModal">
    <div class="custom-modal-content">
        <button class="modal-close" onclick="closeMyModal()">×</button>
        <h2>Modal Title</h2>
        <p>Modal content here...</p>
    </div>
</div>
```

**2. Add CSS:**
```css
.custom-modal {
    display: none; /* Hidden by default */
    position: fixed;
    z-index: 2000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    align-items: center;
    justify-content: center;
}

.custom-modal.active {
    display: flex;
}

.custom-modal-content {
    background: white;
    padding: 2rem;
    border-radius: 15px;
    max-width: 600px;
    position: relative;
}

.modal-close {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
}
```

**3. Add JavaScript:**
```javascript
function openMyModal() {
    document.getElementById('myModal').classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeMyModal() {
    document.getElementById('myModal').classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeMyModal();
    }
});
```

### Implementing Dark Mode Toggle

**1. Add toggle button:**
```html
<button onclick="toggleDarkMode()" class="dark-mode-toggle">
    🌙 Dark Mode
</button>
```

**2. Add CSS variables for dark mode:**
```css
/* Light mode (default) */
:root {
    --bg-color: #ffffff;
    --text-color: #000000;
}

/* Dark mode */
[data-theme="dark"] {
    --bg-color: #000000;
    --text-color: #ffffff;
}

/* Use variables */
body {
    background-color: var(--bg-color);
    color: var(--text-color);
}
```

**3. Add JavaScript:**
```javascript
function toggleDarkMode() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme); // Save preference
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
});
```

### Adding Countdown Timer

**Example: Conference countdown timer**

**1. Add HTML:**
```html
<div class="countdown-timer">
    <div class="countdown-item">
        <span class="countdown-value" id="days">00</span>
        <span class="countdown-label">Days</span>
    </div>
    <div class="countdown-item">
        <span class="countdown-value" id="hours">00</span>
        <span class="countdown-label">Hours</span>
    </div>
    <div class="countdown-item">
        <span class="countdown-value" id="minutes">00</span>
        <span class="countdown-label">Minutes</span>
    </div>
    <div class="countdown-item">
        <span class="countdown-value" id="seconds">00</span>
        <span class="countdown-label">Seconds</span>
    </div>
</div>
```

**2. Add CSS:**
```css
.countdown-timer {
    display: flex;
    gap: 2rem;
    justify-content: center;
    padding: 2rem;
}

.countdown-item {
    text-align: center;
}

.countdown-value {
    display: block;
    font-size: 3rem;
    font-weight: bold;
    color: var(--d4pg-coral);
}

.countdown-label {
    font-size: 1rem;
    text-transform: uppercase;
}
```

**3. Add JavaScript:**
```javascript
function startCountdown() {
    // Set conference date (YYYY, MM-1, DD, HH, MM, SS)
    const conferenceDate = new Date(2025, 6, 16, 9, 0, 0); // July 16, 2025, 9:00 AM
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = conferenceDate - now;
        
        if (distance < 0) {
            document.querySelector('.countdown-timer').innerHTML = 
                '<h2>Conference is happening now! 🎉</h2>';
            return;
        }
        
        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update display
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
    
    // Update immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Start countdown when page loads
document.addEventListener('DOMContentLoaded', startCountdown);
```

### Performance Optimization Tips

**1. Lazy load images:**

Already implemented for gallery! To add to other images:

```html
<img src="placeholder.jpg" data-src="actual-image.jpg" class="lazy-load" alt="Description">
```

```javascript
const lazyImages = document.querySelectorAll('.lazy-load');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy-load');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));
```

**2. Minimize repaints/reflows:**

Use CSS transforms instead of position changes:

```css
/* ❌ Causes reflow */
.element:hover {
    top: -5px;
}

/* ✅ Better performance */
.element:hover {
    transform: translateY(-5px);
}
```

**3. Debounce scroll events:**

```javascript
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Use for scroll events
window.addEventListener('scroll', debounce(() => {
    // Your scroll handler
}, 150)); // Wait 150ms after scroll stops
```

---

## Accessibility Checklist

Make your site accessible to all users:

### ✅ Keyboard Navigation
- All interactive elements should be reachable via Tab key
- Enter/Space should activate buttons
- Escape should close modals

**Already implemented:**
- Speaker cards are keyboard accessible
- Modals close with Escape
- Tab navigation works throughout

### ✅ Screen Reader Support

**Use semantic HTML:**
```html
<!-- ❌ Bad -->
<div onclick="doSomething()">Click me</div>

<!-- ✅ Good -->
<button onclick="doSomething()">Click me</button>
```

**Add ARIA labels:**
```html
<button aria-label="Close modal" class="close-btn">×</button>
<img src="photo.jpg" alt="Descriptive text about image">
```



### ✅ Focus Indicators

Never remove focus outlines without replacement:

```css
/* ❌ Bad - removes focus indicator */
button:focus {
    outline: none;
}

/* ✅ Good - provides alternative focus indicator */
button:focus {
    outline: 2px solid var(--d4pg-coral);
    outline-offset: 2px;
}
```

---

## Browser Compatibility

**Tested and working on:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 90+)

**Features that may need polyfills for older browsers:**
- CSS Grid (IE11 needs prefixes)
- Intersection Observer (IE11 needs polyfill)
- Async/Await (IE11 not supported)
- CSS Custom Properties (IE11 not supported)

**To support IE11**, add these polyfills before your script:

```html
<script src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver,Promise"></script>
```

---

## Testing Your Changes

### Before Publishing:

1. **Test all screen sizes:**
   - Desktop (1920px, 1440px, 1024px)
   - Tablet (768px)
   - Mobile (375px, 414px)

2. **Test all browsers:**
   - Chrome
   - Firefox
   - Safari
   - Edge

3. **Test all interactions:**
   - [ ] Click all navigation links
   - [ ] Open speaker modal
   - [ ] Navigate speaker carousel
   - [ ] Switch workshop days
   - [ ] Open gallery
   - [ ] Enlarge images
   - [ ] Test mobile menu
   - [ ] Open schedule sidebar

4. **Check console for errors:**
   - Open DevTools (F12)
   - Check Console tab
   - Should have no red errors

5. **Test keyboard navigation:**
   - Tab through all interactive elements
   - Press Enter on buttons
   - Press Escape to close modals

### Browser DevTools Tips:

**Chrome DevTools:**
1. Press F12 to open
2. Click "Toggle device toolbar" (Ctrl+Shift+M)
3. Select different devices to test responsive design

**View on actual devices:**
1. Find your local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Open site on phone: `http://YOUR-IP:PORT/d4pg-home.html`

---

## Resources & Further Learning

### HTML
- [MDN HTML Basics](https://developer.mozilla.org/en-US/docs/Learn/HTML)
- [HTML Elements Reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Element)

### CSS
- [CSS Tricks](https://css-tricks.com)
- [MDN CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

### JavaScript
- [JavaScript.info](https://javascript.info) - Modern JavaScript tutorial
- [MDN JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS)

### Design Tools
- [Figma](https://figma.com) - Design mockups
- [Coolors](https://coolors.co) - Color palettes
- [Google Fonts](https://fonts.google.com) - Free fonts

### Testing Tools
- [BrowserStack](https://browserstack.com) - Test on real devices
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Performance audit
- [WAVE](https://wave.webaim.org) - Accessibility checker

---

## Support & Contact

### Need Help?

**For technical issues:**
1. Check the [Troubleshooting](#troubleshooting) section
2. Search for error messages in browser console
3. Review similar examples in the code

**For design questions:**
1. Review the [Design System](#design-system) section
2. Check existing patterns in the CSS
3. Test changes in browser DevTools first

**For content updates:**
1. Follow the [Common Tasks](#common-tasks) guides
2. Make small changes and test frequently
3. Keep backups before major edits

---

## Version History

**Version 2.0** (Current)
- Cleaned up unused code (hero section, word cloud)
- Consolidated DOMContentLoaded listeners
- Removed debug console.logs
- Added external JS file reference
- Optimized CSS (removed ~230 lines of unused code)

**Version 1.0**
- Initial D4PG 2025 home page
- Speaker carousel and modal system
- Workshop day tabs
- Gallery drawer with caching
- Full responsive design


---

## Appendix: Complete Code Examples

### Example 1: Complete Speaker Card with Modal

**HTML:**
```html
<div class="speaker" data-speaker-id="speaker-example">
    <img src="https://example.com/photo.jpg" alt="Jane Doe">
</div>
```

**JSON (in d4pg-bios-2025.json):**
```json
{
  "id": "speaker-example",
  "name": "Jane Doe",
  "pronouns": "she/her",
  "title": "Director of Innovation at Tech for Good",
  "photo": "https://example.com/photo.jpg",
  "bio": [
    "Jane Doe is a leading voice in ethical AI and community technology. With over 15 years of experience, she has **pioneered** new approaches to [data sovereignty](https://example.com) and digital rights.",
    "She currently serves as Director of Innovation at *Tech for Good*, where she leads initiatives on algorithmic accountability."
  ],
  "social": {
    "personal": [
      {
        "type": "twitter",
        "url": "https://twitter.com/janedoe"
      },
      {
        "type": "linkedin",
        "url": "https://linkedin.com/in/janedoe"
      },
      {
        "type": "website",
        "url": "https://janedoe.com",
        "display": "janedoe.com"
      }
    ]
  },
  "promotional": {
    "books": [
      {
        "title": "Ethical AI: A Guide for Communities",
        "cover_image": "https://example.com/book-cover.jpg",
        "description": "A practical guide to understanding and implementing ethical AI principles in community organizations.",
        "purchase_url": "https://bookstore.com/ethical-ai",
        "label": "Buy Book"
      }
    ]
  }
}
```

### Example 2: Complete Workshop JSON Entry

```json
{
  "date": "2025-07-16",
  "events": [
    {
      "type": "workshop",
      "title": "Building Data Sovereignty in Your Community",
      "description": "Learn practical strategies for establishing data sovereignty protocols and policies in community organizations. This hands-on workshop covers data governance frameworks, community consent models, and technical infrastructure options.",
      "startTime": "10:00",
      "endTime": "11:30",
      "location": "Workshop Room A",
      "people": {
        "speakers": [
          {"name": "Jane Doe"},
          {"name": "John Smith"}
        ]
      },
      "materials": "Laptop recommended but not required"
    }
  ]
}
```

### Example 3: Complete Section with Responsive Grid

**HTML:**
```html
<section id="features" class="features-section">
    <div class="container">
        <h2 class="section-title">Conference Features</h2>
        
        <div class="features-grid">
            <div class="feature-card">
                <div class="feature-icon">🎤</div>
                <h3>Expert Speakers</h3>
                <p>Learn from leaders in technology and social justice.</p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">🛠️</div>
                <h3>Hands-On Workshops</h3>
                <p>Build practical skills in interactive sessions.</p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">🤝</div>
                <h3>Networking</h3>
                <p>Connect with changemakers from across sectors.</p>
            </div>
        </div>
    </div>
</section>
```

**CSS:**
```css
.features-section {
    padding: 4rem 1.5rem;
    background: linear-gradient(135deg, var(--d4pg-navy) 0%, var(--d4pg-blue) 100%);
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    margin-top: 3rem;
}

.feature-card {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 15px;
    padding: 2rem;
    text-align: center;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.feature-card:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.1);
    border-color: var(--d4pg-coral);
}

.feature-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.feature-card h3 {
    color: var(--d4pg-white);
    margin-bottom: 1rem;
}

.feature-card p {
    color: var(--d4pg-light-blue);
    line-height: 1.6;
}

/* Tablet */
@media screen and (max-width: 768px) {
    .features-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
}
```



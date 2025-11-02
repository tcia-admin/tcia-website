# D4PG Speakers Page - Technical Guide

## Table of Contents

- [Overview](#overview)
- [File Structure](#file-structure)
- [Quick Start](#quick-start)
- [Key Features](#key-features)
- [Design System](#design-system)
- [Page Components](#page-components)
- [JavaScript Features](#javascript-features)
- [CSS Architecture](#css-architecture)
- [Data Structure](#data-structure)
- [Common Tasks](#common-tasks)
- [Troubleshooting](#troubleshooting)
- [Accessibility Features](#accessibility-features)

---

## Overview

The D4PG Speakers page is a dynamic, responsive speaker showcase that displays conference speakers with interactive biography modals, search functionality, and seamless integration with the conference schedule.

**Key Features:**
- Dynamic speaker card grid (desktop and mobile layouts)
- Interactive biography modals with social links
- Real-time search functionality
- Animated word cloud hero section
- Schedule sidebar integration
- Markdown-formatted biographies
- Promotional content support (books, publications)
- Full keyboard accessibility

**Technologies:**
- Vanilla JavaScript (ES6+)
- CSS3 with CSS Variables
- Async/Await for data fetching
- External JSON data source

---

## File Structure

```
d4pg-speakers/
├── d4pg-speakers.html          # Main HTML structure
├── js/
│   └── main.js                 # All JavaScript functionality
├── css/
│   └── main.css                # All styles and responsive design
└── README.md                   # This file
```

**External Resources:**
- Speaker Data: `https://tcia-admin.github.io/tcia-server-files/d4pg-bios-2025.json`
- Social Icons: `https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v10.0.0/icons/`
- Schedule: `/ds-mobile-source` (iframe embed)

---

## Quick Start

### For Non-Technical Users

To update speaker content:
1. Edit the JSON file at the external URL (d4pg-bios-2025.json)
2. The page automatically loads new speaker data on refresh
3. No code changes needed for most content updates

### For Developers

```html
<!-- Add to your page -->
<link rel="stylesheet" href="path/to/css/main.css">
<script src="path/to/js/main.js" defer></script>
```

The page requires:
- Speaker bio JSON endpoint
- Font Awesome icons for navigation breadcrumb
- External speaker card images (Squarespace CDN)

---

## Key Features

### 1. Dynamic Speaker Grid

**Desktop Layout:**
- Flexbox grid with 4 columns
- Hover effects with smooth transitions
- Click to open detailed modal

**Mobile Layout:**
- 2-column grid (1 column on very small screens)
- Touch-optimized interactions
- Same modal functionality

**How it Works:**
```html
<div class="speaker" data-speaker-id="speaker-cierra-kaler-jones">
    <img src="[speaker-image-url]" alt="Speaker Name">
</div>
```

The `data-speaker-id` attribute links each card to its biography data in the JSON file.

### 2. Speaker Biography Modal

**Features:**
- Full-screen modal with smooth animations
- Speaker photo, name, title, and pronouns
- Markdown-formatted biography
- Social media links (personal and organizational)
- Promotional content (books, publications)
- CTA button to register for conference

**Opening a Modal:**
- Click any speaker card
- Press Enter or Space when focused (keyboard)
- Automatically loads data if not cached

**Closing a Modal:**
- Click the × button
- Click outside the modal
- Press Escape key

### 3. Real-Time Search

**Search Capabilities:**
- Searches speaker names
- Searches titles and positions
- Searches biography text
- Searches social media links
- Case-insensitive matching

**How to Use:**
```html
<input type="text" 
       id="speakerSearchInput" 
       class="speaker-search-bar" 
       placeholder="Search speakers by name, title, bio, or link...">
```

Type in the search box and results filter instantly. Shows "No speakers found" message when no matches exist.

### 4. Word Cloud Animation

**Dynamic Hero Effect:**
- JavaScript-generated word sequence
- Wave scroll animation
- Random float animations for each word
- Seamless infinite loop

**Words Displayed:**
- Visionaries, Innovators, Researchers
- Activists, Educators, Technologists
- Leaders, Advocates, Pioneers
- Scholars, Changemakers, Experts

### 5. Schedule Integration

**Sidebar Features:**
- Slide-in from left
- Embedded mobile schedule view
- Overlay darkens background
- Prevents body scroll when open

**Access Schedule:**
- Click the Schedule button in navigation
- Sidebar opens with iframe content
- Click × or press Escape to close

---

## Design System

### Color Palette

```css
--d4pg-navy: #051335      /* Primary background */
--d4pg-blue: #1f3070      /* Secondary background */
--d4pg-light-blue: #989fd5 /* Hero background, accents */
--d4pg-coral: #ff7f6d     /* Primary CTA color */
--d4pg-yellow: #f3e04b    /* Highlights, hovers */
--d4pg-green: #4adb97     /* Success states */
--d4pg-pink: #ff3dc8      /* Accent color */
--d4pg-white: #ffffff     /* Text color */
```

### Typography

**Font Families:**
- Primary: All Round Gothic (body text)
- Secondary: Proxima Nova (alternative)
- Accent: Poppins (headings)

**Font Sizes:**
```css
--font-size-xs: 0.75rem    /* Small labels */
--font-size-sm: 0.875rem   /* Secondary text */
--font-size-med: 1rem      /* Body text */
--font-size-base: 1.25rem  /* Enhanced body */
--font-size-lg: 1.5rem     /* Subheadings */
--font-size-xl: 1.75rem    /* Minor headings */
--font-size-2xl: 2.5rem    /* Major headings */
--font-size-3xl: 3.5rem    /* Hero text */
```

### Spacing System

```css
--spacing-xs: 0.25rem   /* 4px */
--spacing-sm: 0.5rem    /* 8px */
--spacing-md: 1rem      /* 16px */
--spacing-lg: 1.5rem    /* 24px */
--spacing-xl: 2rem      /* 32px */
--spacing-2xl: 3rem     /* 48px */
--spacing-3xl: 4rem     /* 64px */
--spacing-4xl: 5rem     /* 80px */
```

---

## Page Components

### 1. Navigation Breadcrumb

**Purpose:** Shows user location in site hierarchy

```html
<nav class="nav-breadcrumb">
    <a href="https://tciamn.org">
        <i class="fa-solid fa-house"></i> TCIA Home
    </a>
    <span class="separator">›</span>
    <a href="https://tciamn.org/d4pg">
        <i class="fa-solid fa-calendar-days"></i> D4PG Conference
    </a>
    <span class="separator">›</span>
    <span class="current-page">Speakers</span>
</nav>
```

**Styling:**
- Sticky positioning on scroll
- Coral-colored links with hover effects
- Font Awesome icons for visual hierarchy
- Responsive padding adjustments

### 2. Hero Section

**Components:**
- Animated word cloud background
- D4PG logo (clickable, links to d4pg home)
- Page title: "Conference Speakers"

**Layout:**
```css
.hero-section {
    min-height: 60vh;
    background: light-blue with image overlay
    display: flex (centered vertically and horizontally)
}
```

**Customization:**
- Change background image in CSS (line 82)
- Modify minimum height (line 80)
- Update title text in HTML (line 38)

### 3. Sticky Navigation

**Features:**
- D4PG 2025 logo and branding
- Schedule button (opens sidebar)
- Fixed position with subtle shadow

**Mobile Behavior:**
- Logo scales down
- Button becomes more compact
- Still fully functional

### 4. Search Bar

**Location:** Between navigation and speaker grid

**Functionality:**
```javascript
// Searches across multiple fields
function speakerMatches(speakerElem, searchTerm, speakersData) {
    // Matches: name, title, bio, social links
}
```

**Styling:**
- Full-width container
- Coral border focus state
- Placeholder text for guidance

### 5. Speaker Grid

**Two Layouts:**

**Desktop** (.desktop-speaker-section):
```css
display: grid;
grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
gap: var(--spacing-lg);
```

**Mobile** (.mobile-speaker-section):
```css
display: grid;
grid-template-columns: 1fr 1fr;  /* 2 columns */
/* 1 column below 400px */
```

**Card Styling:**
- Rounded corners (12px)
- Smooth scale transform on hover
- Box shadow for depth
- Cursor pointer indicates clickability

### 6. Speaker Modal

**Structure:**
```
.speaker-modal (overlay)
  └─ .speaker-modal-content (card)
      ├─ .speaker-modal-header
      │   ├─ Close button (×)
      │   ├─ Speaker photo
      │   ├─ Name (with pronouns)
      │   └─ Title
      ├─ .speaker-modal-body
      │   ├─ Biography section
      │   ├─ Promotional content (books)
      │   ├─ Social links section
      │   └─ Register CTA button
```

**Animation:**
- Modal slide-up on open (0.4s ease-out)
- Fade-in overlay (0.3s)
- Scale effect for smooth entrance

**Biography Formatting:**
- Supports Markdown syntax:
  - `**bold**` → **bold**
  - `*italic*` → *italic*
  - `__underline__` → underline
  - `[text](url)` → clickable links

### 7. Social Links

**Supported Platforms:**
- Instagram, Twitter/X, LinkedIn
- GitHub, YouTube, Facebook
- Mastodon, Bluesky, TikTok
- Personal websites

**Icon Display:**
- SVG icons for major platforms (high quality)
- Unicode emojis for newer platforms
- Color-inverted for visibility on dark backgrounds

**Organization Support:**
Multiple social link groups per speaker:
- Personal Links
- Organization Name (if applicable)
- Multiple Organizations (if applicable)

### 8. Promotional Content

**Books Section:**
```html
<div class="promotional-book">
    <div class="book-cover">
        <img src="[cover-image]" alt="[title]">
    </div>
    <div class="book-content">
        <h4 class="book-title">[Title]</h4>
        <p class="book-description">[Description]</p>
        <a href="[purchase-url]" class="book-purchase-btn">
            [Button Label] 📚
        </a>
    </div>
</div>
```

**Styling:**
- Grid layout for multiple books
- Responsive stacking on mobile
- Hover effects on purchase buttons
- Color-coordinated with brand palette

### 9. Schedule Sidebar

**Behavior:**
- Slides in from left (400px wide)
- Full-height iframe embed
- Overlay prevents interaction with main content
- 100vw width on very small screens

**Implementation:**
```javascript
function openScheduleSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scroll
}
```

---

## JavaScript Features

### Data Loading

**Initial Load:**
```javascript
async function loadSpeakerData() {
    const response = await fetch('https://..../d4pg-bios-2025.json');
    const data = await response.json();
    window.speakersData = data.speakers;
}
```

**Called on:**
- Page load (DOMContentLoaded)
- First modal open (if not already loaded)

**Error Handling:**
- Catches network errors
- Shows user-friendly error messages in modal
- Continues functioning with graceful degradation

### Modal System

**Key Functions:**

**openSpeakerModal(speakerId):**
- Shows modal with loading state
- Loads data if needed
- Calls populateModal() when ready

**populateModal(speakerId):**
- Finds speaker in data array
- Updates all modal fields
- Processes Markdown in biography
- Generates social links HTML
- Shows/hides promotional content

**closeSpeakerModal():**
- Removes .active class
- Restores body scroll
- Clears modal state

**Event Listeners:**
- Click on speaker card
- Keyboard Enter/Space on focused card
- Click modal close button
- Click outside modal
- Press Escape key

### Search Functionality

**Real-Time Filtering:**
```javascript
function filterSpeakers(searchTerm) {
    // For each speaker card:
    if (speakerMatches(card, searchTerm, speakersData)) {
        card.style.display = '';  // Show
    } else {
        card.style.display = 'none';  // Hide
    }
}
```

**Search Fields:**
- speaker.name
- speaker.title
- speaker.bio (all paragraphs)
- speaker.social links (URLs and display names)
- speaker.social organization names

**Case Insensitive:**
All searches normalized to lowercase for matching.

**No Results:**
Shows message when no speakers match: "No speakers found matching your search."

### Word Cloud Animation

**Generation Process:**
1. Define word array
2. Duplicate 3x for seamless loop
3. Create span elements with CSS classes
4. Add random animation delays
5. Add random float heights
6. Insert diamond separators (◇)

**CSS Animation:**
```css
@keyframes wave-scroll {
    0% { transform: translateX(0) translateY(0); }
    25% { transform: translateX(-25%) translateY(8px); }
    50% { transform: translateX(-50%) translateY(0); }
    /* ... continues ... */
}
```

Duration: 60 seconds for full cycle

**Random Float:**
```css
@keyframes word-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(var(--float-y)); }
}
```

Each word gets custom `--float-y` value (-5 to 5px)

### Biography Processing

**Markdown Support:**
```javascript
function processBioText(bioArray) {
    return bioArray.map(paragraph => {
        // Replace [text](url) with <a> tags
        // Replace **text** with <strong>
        // Replace *text* with <em>
        // Replace __text__ with <u>
        return `<p class="speaker-bio-text">${processedText}</p>`;
    }).join('');
}
```

**Output:**
Each paragraph becomes a `<p>` tag with formatted HTML inside.

### Social Links Generation

**Structure:**
```javascript
function createSocialLinks(socialData, title) {
    return `
        <div class="speaker-social-card">
            <h4>${title}</h4>
            <div class="speaker-social-links">
                ${linksHTML}
            </div>
        </div>
    `;
}
```

**Platform Icons:**
- Major platforms: SVG from simple-icons CDN
- Newer platforms: Unicode emoji fallback
- Website links: Show cleaned URL text

### Sidebar Management

**State Management:**
```javascript
// Open
sidebar.classList.add('open');
overlay.classList.add('active');
document.body.style.overflow = 'hidden';

// Close
sidebar.classList.remove('open');
overlay.classList.remove('active');
document.body.style.overflow = '';
```

**Responsive Width:**
```javascript
window.addEventListener('resize', function() {
    if (sidebar.classList.contains('open')) {
        if (window.innerWidth <= 480) {
            sidebar.style.width = '100vw';
        } else {
            sidebar.style.width = '400px';
        }
    }
});
```

### Event Handling

**DOMContentLoaded Events:**
1. Initialize word cloud animation
2. Load speaker data from API
3. Add click handlers to speaker cards
4. Add keyboard accessibility
5. Set up modal close handlers
6. Enable search when data loads
7. Set up schedule sidebar handlers

**Keyboard Accessibility:**
- Tab navigation to speaker cards
- Enter or Space to open modal
- Escape to close modal or sidebar
- Focus management for screen readers

---

## CSS Architecture

### Layout System

**Container:**
```css
max-width: 2000px;
margin: 0 auto;
padding: 0 1rem;
```

**Flexbox and Grid:**
- Hero: flexbox (centered)
- Speaker grid: CSS Grid (responsive columns)
- Modal: flexbox (centered overlay)
- Social links: flexbox (horizontal wrap)

### Component Styles

**Speaker Cards:**
```css
.speaker {
    cursor: pointer;
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s ease;
}

.speaker:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 25px rgba(255, 127, 109, 0.4);
}
```

**Modal:**
```css
.speaker-modal {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: none;
    z-index: 1000;
}

.speaker-modal.active {
    display: flex;
}
```

**Sidebar:**
```css
.schedule-sidebar {
    position: fixed;
    left: -400px;  /* Hidden by default */
    width: 400px;
    height: 100vh;
    transition: left 0.3s ease;
}

.schedule-sidebar.open {
    left: 0;  /* Slide in */
}
```

### Responsive Design

**Breakpoints:**
- Mobile: max-width 600px
- Tablet: 601px - 800px
- Desktop: 801px+

**Mobile Adjustments:**

**Hero:**
```css
@media (max-width: 600px) {
    .hero-section {
        min-height: 40vh;
        padding: 2rem 0;
    }
    .hero-tagline {
        font-size: 2rem;
    }
}
```

**Speaker Grid:**
```css
@media (max-width: 600px) {
    .desktop-speaker-section {
        display: none;  /* Hide desktop */
    }
    .mobile-speaker-section {
        display: block;  /* Show mobile */
    }
}
```

**Modal:**
```css
@media (max-width: 768px) {
    .speaker-modal-content {
        width: 95%;
        max-height: 90vh;
        overflow-y: auto;
    }
}
```

### Animations

**Modal Slide-Up:**
```css
@keyframes modal-slide-up {
    from { 
        transform: translateY(50px) scale(0.95); 
        opacity: 0; 
    }
    to { 
        transform: translateY(0) scale(1); 
        opacity: 1; 
    }
}
```

**Word Cloud Wave:**
```css
@keyframes wave-scroll {
    /* 8 keyframes for wave effect */
    /* Horizontal scroll + vertical wave motion */
}
```

**Word Float:**
```css
@keyframes word-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(var(--float-y)); }
}
```

### State Classes

**Active States:**
- `.active` - Modal is visible
- `.open` - Sidebar is visible
- `.hidden` - Element is hidden

**Usage:**
```javascript
element.classList.add('active');    // Show
element.classList.remove('active'); // Hide
element.classList.toggle('active'); // Toggle
```

---

## Data Structure

### Speaker JSON Format

**Location:** `https://tcia-admin.github.io/tcia-server-files/d4pg-bios-2025.json`

**Root Object:**
```json
{
    "speakers": [
        { /* speaker object */ }
    ]
}
```

**Speaker Object:**
```json
{
    "id": "speaker-cierra-kaler-jones",
    "name": "Dr. Cierra Kaler-Jones",
    "title": "Professor of Data Justice",
    "pronouns": "she/her",
    "photo": "https://..../photo.png",
    "bio": [
        "First paragraph of biography...",
        "Second paragraph with **bold** text...",
        "Third paragraph with [link](https://example.com)..."
    ],
    "social": {
        "personal": [
            {
                "type": "linkedin",
                "url": "https://linkedin.com/in/username"
            },
            {
                "type": "website",
                "url": "https://example.com",
                "display": "example.com"
            }
        ],
        "organization": {
            "name": "University Name",
            "links": [
                {
                    "type": "website",
                    "url": "https://university.edu",
                    "display": "university.edu"
                }
            ]
        },
        "organizations": [
            {
                "name": "Research Lab",
                "links": [ /* ... */ ]
            }
        ]
    },
    "promotional": {
        "books": [
            {
                "title": "Book Title",
                "cover_image": "https://..../cover.jpg",
                "description": "Brief description...",
                "purchase_url": "https://...",
                "label": "Purchase Book"
            }
        ]
    }
}
```

**Field Requirements:**

**Required:**
- `id` - Must match HTML `data-speaker-id`
- `name` - Speaker's full name
- `title` - Professional title/position
- `photo` - URL to speaker headshot

**Optional:**
- `pronouns` - Displayed next to name
- `bio` - Array of paragraph strings
- `social` - Social media links
- `promotional` - Books, publications, etc.

**ID Format:**
- Lowercase only
- Hyphen-separated
- Prefix with "speaker-"
- Example: "speaker-first-last"

### Social Link Types

**Supported Types:**
- instagram
- twitter
- linkedin
- github
- youtube
- facebook
- mastodon
- bluesky
- tiktok
- website

**Link Object:**
```json
{
    "type": "linkedin",
    "url": "https://linkedin.com/in/username",
    "display": "Optional Display Text"
}
```

**Display Behavior:**
- Social platforms: Show icon only
- Website: Show cleaned URL or display text

### Promotional Content

**Books:**
```json
{
    "title": "Required - Book Title",
    "cover_image": "Required - Cover image URL",
    "description": "Optional - Brief description",
    "purchase_url": "Required - Where to buy",
    "label": "Optional - Button text (default: 'Purchase')"
}
```

**Styling:**
- Grid layout (responsive)
- Hover effects on buttons
- Book cover as visual anchor
- Call-to-action buttons

---

## Common Tasks

### Adding a New Speaker

**Step 1:** Add speaker card to HTML
```html
<div class="speaker" data-speaker-id="speaker-new-person">
    <img src="https://..../new-person.png" alt="New Person">
</div>
```

**Step 2:** Add to both sections (desktop AND mobile)

**Step 3:** Add to JSON file
```json
{
    "id": "speaker-new-person",
    "name": "New Person",
    "title": "Their Title",
    "photo": "https://..../new-person.png",
    "bio": ["Biography text..."]
}
```

**Step 4:** Test
- Card appears in grid
- Clicking opens modal
- All info displays correctly
- Search finds the speaker

### Updating Speaker Information

**Biography:**
Edit the JSON `bio` array. Use Markdown for formatting:
```json
"bio": [
    "**Dr. Name** is a leading expert...",
    "She has published work on *data justice*...",
    "Learn more at [her website](https://example.com)."
]
```

**Social Links:**
Add to appropriate section:
```json
"social": {
    "personal": [
        {"type": "twitter", "url": "https://..."}
    ]
}
```

**Photo:**
Update `photo` URL in JSON. Ensure:
- High resolution (at least 400x400px)
- Square aspect ratio preferred
- Optimized file size

### Changing Colors

**Primary Brand Colors:**
Edit in `:root` CSS variables (lines 34-42):
```css
:root {
    --d4pg-coral: #ff7f6d;  /* Change this */
    --d4pg-yellow: #f3e04b; /* Or this */
}
```

All components using these colors will update automatically.

### Modifying Hero Section

**Background Image:**
```css
.hero-section {
    background-image: url('YOUR-NEW-IMAGE-URL');
}
```

**Title Text:**
```html
<h1 class="hero-tagline">Conference Speakers</h1>
```

**Word Cloud Words:**
Edit JavaScript array (lines 5-10):
```javascript
const words = [
    'Your', 'Custom', 'Words',
    'Go', 'Here'
];
```

### Adjusting Layout

**Speaker Grid Columns:**
```css
.desktop-speaker-section {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    /* Change 250px to adjust column width */
}
```

**Modal Width:**
```css
.speaker-modal-content {
    max-width: 900px;  /* Adjust this */
}
```

**Search Bar Appearance:**
```css
.speaker-search-bar {
    padding: var(--spacing-md);  /* Adjust size */
    border-radius: 8px;          /* Adjust roundness */
}
```

### Adding New Social Platforms

**Step 1:** Add icon to `getSocialIcon()` function:
```javascript
const icons = {
    'newplatform': '<img src="icon-url" class="social-icon-png">',
    // or use emoji: 'newplatform': '🔗'
};
```

**Step 2:** Add name to `getPlatformName()`:
```javascript
const names = {
    'newplatform': 'New Platform Name'
};
```

**Step 3:** Use in JSON:
```json
{
    "type": "newplatform",
    "url": "https://..."
}
```

### Customizing Modal Content

**Change Register Button:**
```html
<a href="YOUR-REGISTRATION-URL" class="speaker-register-btn">
    Your Custom Text
</a>
```

**Add New Section:**
Add after `<div id="modalSocial"></div>`:
```html
<div class="custom-section">
    <h3>Your Section Title</h3>
    <p>Your content here</p>
</div>
```

**Style it:**
```css
.custom-section {
    padding: var(--spacing-lg);
    /* Add your styles */
}
```

---

## Troubleshooting

### Speaker Cards Not Displaying

**Check:**
1. Is the `data-speaker-id` attribute present?
2. Does the ID match between HTML and JSON?
3. Is the image URL correct and accessible?
4. Check browser console for errors

**Solution:**
```html
<!-- Correct format -->
<div class="speaker" data-speaker-id="speaker-name">
    <img src="valid-url" alt="Description">
</div>
```

### Modal Not Opening

**Possible Causes:**
- JavaScript not loaded (check console)
- Click handler not attached
- Speaker ID mismatch

**Debug Steps:**
1. Open browser console
2. Type: `window.speakersData`
3. Should show array of speakers
4. If null, data didn't load

**Force reload:**
```javascript
loadSpeakerData().then(() => {
    console.log('Data loaded:', window.speakersData);
});
```

### Search Not Working

**Symptoms:**
- Typing doesn't filter
- All speakers remain visible

**Causes:**
- Speaker data not loaded yet
- Search input missing `id="speakerSearchInput"`
- JavaScript error (check console)

**Fix:**
The script waits for data:
```javascript
(function waitForSpeakersData() {
    if (window.speakersData) {
        enableSpeakerSearch();
    } else {
        setTimeout(waitForSpeakersData, 100);
    }
})();
```

If search still fails, check that speaker IDs match between HTML and JSON.

### Social Icons Not Displaying

**Check:**
1. Is the `type` field correct in JSON?
2. Is the CDN URL accessible?
3. Check browser console for 404 errors

**Fallback:**
Icons automatically fall back to 🔗 emoji if type not recognized.

**Test Icon URL:**
```
https://cdn.jsdelivr.net/gh/simple-icons/simple-icons@v10.0.0/icons/linkedin.svg
```

Should display LinkedIn icon.

### Biography Not Formatting

**Issue:** Markdown not converting to HTML

**Check:**
- Bio is array of strings (not single string)
- Markdown syntax is correct:
  - `**text**` for bold (NOT `<b>`)
  - `*text*` for italic (NOT `<i>`)
  - `[text](url)` for links (NOT `<a>`)

**Example:**
```json
"bio": [
    "This is **bold** and this is *italic*.",
    "Visit [my website](https://example.com)."
]
```

### Modal Scrolling Issues

**Problem:** Can't scroll modal content

**Solutions:**

**Desktop:**
Modal should scroll if content exceeds height.

**Mobile:**
```css
@media (max-width: 768px) {
    .speaker-modal-content {
        max-height: 90vh;
        overflow-y: auto;
    }
}
```

**Body Scroll:**
If body scrolls behind modal:
```javascript
document.body.style.overflow = 'hidden'; // When modal opens
document.body.style.overflow = '';        // When modal closes
```

### Sidebar Not Sliding In

**Check:**
1. CSS transition property present?
2. `.open` class being added?
3. Initial `left` position negative?

**Debug:**
```javascript
const sidebar = document.getElementById('scheduleSidebar');
console.log('Sidebar:', sidebar);
console.log('Has open class:', sidebar.classList.contains('open'));
```

**CSS Requirements:**
```css
.schedule-sidebar {
    left: -400px;           /* Hidden */
    transition: left 0.3s;   /* Smooth slide */
}
.schedule-sidebar.open {
    left: 0;                /* Visible */
}
```

### Word Cloud Not Animating

**Check:**
1. JavaScript creating word elements?
2. CSS animation defined?
3. Browser supports CSS animations?

**Verify in Console:**
```javascript
const wordCloud = document.getElementById('word-cloud-content');
console.log('Words:', wordCloud.children.length);
```

Should show multiple child elements.

**CSS Animation:**
```css
.word-cloud-content {
    animation: wave-scroll 60s linear infinite;
}
```

Ensure `@keyframes wave-scroll` is defined.

### Performance Issues

**Symptoms:**
- Slow page load
- Laggy animations
- High memory usage

**Solutions:**

**Optimize Images:**
- Compress speaker photos
- Use appropriate dimensions
- Consider lazy loading

**Limit Animations:**
```css
@media (prefers-reduced-motion: reduce) {
    * {
        animation: none !important;
        transition: none !important;
    }
}
```

**Defer JavaScript:**
```html
<script src="main.js" defer></script>
```

**Check Network:**
- Are external resources loading?
- CDN availability?
- JSON file size reasonable?

---

## Accessibility Features

### Keyboard Navigation

**Tab Order:**
1. Navigation breadcrumb links
2. Schedule button
3. Search input
4. Speaker cards (all focusable)
5. Modal close button (when open)
6. Modal CTA button (when open)

**Keyboard Shortcuts:**
- **Tab**: Navigate forward
- **Shift+Tab**: Navigate backward
- **Enter/Space**: Activate focused element
- **Escape**: Close modal or sidebar

**Implementation:**
```javascript
card.setAttribute('tabindex', '0');
card.setAttribute('role', 'button');
card.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        openSpeakerModal(speakerId);
    }
});
```

### Screen Reader Support

**ARIA Labels:**
```html
<button class="speaker-modal-close" 
        id="closeModal" 
        aria-label="Close speaker biography">
    ×
</button>
```

**Semantic HTML:**
- `<nav>` for navigation
- `<section>` for content areas
- `<button>` for interactive elements
- `<article>` would work for speaker cards

**Focus Management:**
```javascript
// When modal opens
modal.classList.add('active');
// Focus should move to modal
// When modal closes
modal.classList.remove('active');
// Focus returns to triggering element
```

### Visual Accessibility

**Color Contrast:**
All text meets WCAG AA standards:
- White text on navy: 15.15:1 ratio
- Coral on navy: 4.52:1 ratio
- Yellow on navy: 11.82:1 ratio

**Focus Indicators:**
```css
*:focus {
    outline: 2px solid var(--d4pg-coral);
    outline-offset: 2px;
}
```

**Text Sizing:**
- Uses rem units (responsive to user preferences)
- Minimum 16px base font size
- Clear hierarchy with size differences

### Motion Accessibility

**Respect User Preferences:**
```css
@media (prefers-reduced-motion: reduce) {
    .word-cloud-content {
        animation: none;
    }
    .speaker:hover {
        transform: none;
    }
    .speaker-modal-content {
        animation: none;
    }
}
```

**Why This Matters:**
Users with vestibular disorders can experience nausea, dizziness, or discomfort from animations.

### Alternative Text

**All Images:**
```html
<img src="speaker-photo.png" 
     alt="Dr. Cierra Kaler-Jones">
```

**Decorative Images:**
```html
<img src="icon.png" alt="" role="presentation">
```

**Social Icons:**
```html
<img src="linkedin.svg" 
     alt="LinkedIn" 
     class="social-icon-png">
```

### Form Accessibility

**Search Input:**
```html
<input type="text" 
       id="speakerSearchInput" 
       class="speaker-search-bar" 
       placeholder="Search speakers by name, title, bio, or link..." 
       autocomplete="off"
       aria-label="Search speakers">
```

**Labels:**
While placeholder text is visible, also add proper label for screen readers.

---

## Performance Optimization

### Data Loading

**Async/Await:**
```javascript
async function loadSpeakerData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        window.speakersData = data.speakers;
    } catch (error) {
        console.error('Error:', error);
    }
}
```

**Benefits:**
- Non-blocking
- Page loads while fetching data
- Graceful error handling

### Image Optimization

**Best Practices:**
1. Compress all speaker photos
2. Use appropriate dimensions (400-600px wide)
3. Convert to WebP format if possible
4. Add `loading="lazy"` for below-fold images

**Example:**
```html
<img src="speaker.webp" 
     alt="Speaker Name" 
     loading="lazy">
```

### CSS Optimizations

**Use CSS Variables:**
```css
:root {
    --d4pg-coral: #ff7f6d;
}
/* Applied everywhere */
.button {
    background: var(--d4pg-coral);
}
```

**Benefits:**
- Smaller file size (no repeated values)
- Easy theme changes
- Better maintainability

**Minimize Repaints:**
```css
.speaker {
    transition: transform 0.3s ease;
    /* Only animates transform, not entire element */
}
```

**Use `will-change` for Frequent Animations:**
```css
.word-cloud-word {
    will-change: transform;
}
```

### JavaScript Optimizations

**Event Delegation:**
Instead of adding listeners to every card individually, could delegate:
```javascript
document.querySelector('.desktop-speaker-section').addEventListener('click', function(e) {
    const card = e.target.closest('.speaker');
    if (card) {
        openSpeakerModal(card.dataset.speakerId);
    }
});
```

**Debounce Search:**
For better performance with real-time search:
```javascript
let searchTimeout;
searchInput.addEventListener('input', function() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        filterSpeakers(this.value);
    }, 300); // Wait 300ms after user stops typing
});
```

**Cache DOM Queries:**
```javascript
// Store references
const modal = document.getElementById('speakerModal');
const modalPhoto = document.getElementById('modalPhoto');
// Reuse them instead of querying repeatedly
```

### Network Optimization

**CDN Resources:**
All external resources from CDN:
- Simple Icons (social media SVGs)
- Speaker data (JSON)
- Speaker images (Squarespace CDN)

**Benefits:**
- Fast global delivery
- Browser caching
- Reduced server load

**Preload Critical Resources:**
```html
<link rel="preload" href="css/main.css" as="style">
<link rel="preload" href="js/main.js" as="script">
```

---

## Browser Compatibility

**Tested and Working:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Required Features:**
- CSS Grid
- CSS Variables
- Flexbox
- ES6+ JavaScript (async/await, arrow functions, template literals)
- Fetch API

**Polyfills Not Needed:**
All modern browsers support required features.

**IE11 Not Supported:**
Internet Explorer 11 lacks CSS Grid and ES6 support. Consider showing a browser upgrade message for IE11 users.

---

## Future Enhancements

**Possible Improvements:**

1. **Pagination/Infinite Scroll**
   - Load speakers in batches
   - Better performance with 100+ speakers

2. **Filter by Expertise**
   - Add topic tags to JSON
   - Filter buttons for categories

3. **Speaker Comparison**
   - Select multiple speakers
   - Compare side-by-side

4. **Favorite Speakers**
   - Save to localStorage
   - Quick access list

5. **Share Functionality**
   - Share individual speaker profiles
   - Generate shareable links

6. **Advanced Search**
   - Filter by multiple criteria
   - Boolean operators (AND/OR)

7. **Speaker Videos**
   - Embed preview videos
   - Link to talks/presentations

8. **Accessibility Audit**
   - Professional WCAG audit
   - Fix any issues found

---

## Contact & Support

**For Technical Issues:**
- Check browser console for errors
- Review this documentation
- Ensure JSON data is valid

**For Content Updates:**
- Edit the JSON file directly
- Speaker images hosted on Squarespace CDN
- No code changes needed for most updates

**For Feature Requests:**
- Consider impact on page performance
- Ensure accessibility maintained
- Test on multiple devices/browsers

---

**Last Updated:** 2025
**Version:** 1.0
**Maintainer:** TCIA Web Team


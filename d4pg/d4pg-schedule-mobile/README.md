# D4PG Mobile Schedule - Guide

## Table of Contents

- [Overview](#overview)
- [File Structure](#file-structure)
- [Quick Start](#quick-start)
- [Key Differences from Desktop](#key-differences-from-desktop)
- [Mobile-Specific Features](#mobile-specific-features)
- [Design System](#design-system)
- [Page Components](#page-components)
- [JavaScript Features](#javascript-features)
- [CSS Architecture](#css-architecture)
- [Data Structure](#data-structure)
- [Common Tasks](#common-tasks)
- [Troubleshooting](#troubleshooting)
- [Performance Tips](#performance-tips)

---

## Overview

The D4PG mobile schedule is a touch-optimized, mobile-first version of the conference schedule. It shares the same data source as the desktop version but presents it in a card-based, vertically scrolling layout optimized for small screens.

**Key Features:**
- Card-based event display
- Touch-friendly filter drawer
- Countdown timer to conference start
- Workshop carousels with swipe support
- Event detail modals
- Dark/light theme toggle
- Canvas background animation
- Real-time current event tracking

**Technology:**
- Vanilla HTML5, CSS3, JavaScript ES6+
- JSON data files (shared with desktop version)
- No dependencies or frameworks

**Note:** For detailed information about shared features like data structure, speaker matching, and general architecture, see the [main schedule README](../d4pg-schedule/README.md).

---

## File Structure

```
d4pg-schedule-mobile/
├── d4pg-schedule-mobile.html   # Main HTML (152 lines)
├── js/
│   └── main.js                 # All JavaScript (1223 lines)
├── css/
│   └── main.css               # All styles (1406 lines)
└── README.md                   # This file
```

**Data files** (shared with desktop):
- `d4pg-schedule.json` - Configuration
- `d4pg-schedule-day1.json` - Day 1 events
- `d4pg-schedule-day2.json` - Day 2 events
- `d4pg-schedule-day3.json` - Day 3 events
- `d4pg-bios-2025.json` - Speaker information

**External Resources:**
```
Base URL: https://tcia-admin.github.io/tcia-server-files/
```

---

## Quick Start

### For Non-Technical Users

**To change event information:**
1. Edit the same JSON files used by desktop version
2. Changes appear automatically on both desktop and mobile
3. See [main README](../d4pg-schedule/README.md#data-structure) for JSON structure

**To change colors:**
1. Open `css/main.css`
2. Edit the `:root` CSS variables at the top
3. Save the file

**To test mobile view:**
- Resize browser to 768px or smaller
- Or use browser DevTools device emulation

---

## Key Differences from Desktop

| Feature | Desktop | Mobile |
|---------|---------|--------|
| Layout | Timeline with time badges | Vertical card stack |
| Navigation | Sidebar filters | Bottom drawer filters |
| Events | Inline on timeline | Cards with expand modals |
| Workshops | Large carousel | Swipeable carousel |
| Background | Static | Animated canvas |
| Theme | Fixed | Toggle dark/light |
| Time Display | Header tracker | Sticky time tracker |
| Countdown | Not present | Countdown to conference |

**When to Use:**
- Mobile version: Screens ≤ 768px wide
- Desktop version: Screens > 768px wide

---

## Mobile-Specific Features

### 1. Countdown Timer

**Location:** Below header, above day navigation

**Purpose:** Shows time remaining until conference starts

**Features:**
- Days, hours, minutes, seconds
- Animating pulse effect
- Switches to "LIVE NOW" when conference begins
- Conference start: July 16, 2025, 8:00 AM

**How to change conference date:**
```javascript
// In main.js, around line 1114
const conferenceDate = new Date(2025, 6, 16, 8, 0, 0);
// Format: (year, month-1, day, hour, minute, second)
```

### 2. Theme Toggle

**Location:** Fixed bottom-left button (sun icon)

**Purpose:** Switch between dark and light modes

**Implementation:**
- Toggles `.light-mode` class on body
- Changes canvas background colors
- Updates event card backgrounds
- Persists during session (not saved)

**To disable:**
Comment out theme toggle button in HTML or hide with CSS:
```css
.theme-toggle { display: none; }
```

### 3. Canvas Background

**Purpose:** Animated dot pattern background

**Features:**
- Light gray base with blue dots
- Gradient overlay
- Responsive to window resize
- Different colors in light mode

**Performance note:** Redraws on resize; may impact older devices

### 4. Filter Drawer

**Location:** Slides up from bottom when filter button tapped

**Features:**
- Filter by event type (keynote, panel, workshop, etc.)
- Filter by location (Main Auditorium, Workshop Rooms, etc.)
- Closes when tapping outside
- Animated slide-in transition

**Behavior:**
- All filters start active
- Selecting a specific type/location filters immediately
- Can select multiple filters simultaneously

### 5. Event Cards with Expand Modals

**Purpose:** Compact card view with detailed modal expansion

**Card shows:**
- Event time and location
- Event title
- First speaker (+count of additional)
- Expand icon (corner brackets)

**Modal shows:**
- Full event description
- All speakers/panelists/moderators with titles
- Color-coded event type badge
- Close button

**To expand:** Tap the corner bracket icon on any card

### 6. Workshop Carousels

**Purpose:** Display concurrent workshops in swipeable carousel

**Features:**
- Horizontal slides (one workshop per slide)
- Swipe left/right to navigate
- Dot indicators showing position
- Counter (e.g., "1 / 3")
- Auto-advance every 12 seconds
- Pauses on touch interaction

**Navigation:**
- Swipe gestures (primary)
- Arrow buttons (backup)
- Dot indicators (direct access)

### 7. Time Tracker

**Purpose:** Shows current time and what's happening now

**Display:**
- Current time (updates every minute)
- "NOW: [Event Title]" when event is active
- "NEXT: [Event Title] (time)" for upcoming events
- Scrolling text if content overflows

**Logic:**
- Only shows current events during conference dates
- Before conference: "Conference begins July 16, 2025"
- Updates every 5 minutes

### 8. Youth Summit Banner

**Location:** Day 3 schedule only

**Purpose:** Highlight special youth summit event

**Styling:**
- Gradient background (coral to yellow)
- Large title text
- Time and location details
- Positioned above day 3 events

---

## Design System

### Color Palette

```css
:root {
    /* D4PG Brand Colors */
    --d4pg-navy: #0a1835;
    --d4pg-blue: #182654;
    --d4pg-light-blue: #8a91c7;
    --d4pg-coral: #ff8977;
    --d4pg-yellow: #f3e04b;
    --d4pg-green: #4adb97;
    --d4pg-pink: #ff3dc8;
    --d4pg-white: #f5f5f5;
}
```

**Event Type Colors:**
- Keynote: Coral (4px left border)
- Panel: Light blue (4px left border)
- Workshop: Yellow (4px left border)
- Break: Green (4px left border)
- Social: Pink (4px left border)

### Typography

```css
:root {
    --font-primary: "All Round Gothic", Arial, sans-serif;
    --font-secondary: "Proxima Nova", sans-serif;
    --font-accent: "Quicksand", sans-serif;
}
```

### Spacing

```css
:root {
    --spacing-xs: 0.25rem;  /* 4px */
    --spacing-sm: 0.5rem;   /* 8px */
    --spacing-md: 1rem;     /* 16px */
    --spacing-lg: 1.5rem;   /* 24px */
    --spacing-xl: 2rem;     /* 32px */
}
```

---

## Page Components

### 1. Mobile Header

**Contains:**
- D4PG logo (links to main D4PG site)
- Stacked title: "CONFERENCE" / "SCHEDULE"
- Gradient background

**Styling:**
- Gradient from light blue to white
- 10% border radius
- Centered content

### 2. Countdown Container

**Components:**
- Countdown title
- Four digit displays (days, hours, minutes, seconds)
- "LIVE NOW" indicator (hidden until active)
- Pulsing background animation

**Updates:** Every second via JavaScript

### 3. Day Navigation

**Three buttons:**
- Day 1 (July 16)
- Day 2 (July 17)
- Day 3 (July 18)

**Active state:**
- Coral color
- Elevated appearance
- Bottom border accent

### 4. Time Tracker

**Two sections:**
- Current time display (left)
- Now/Next event display (right)

**Scrolling text:**
- Enabled automatically when content overflows
- Pauses on hover
- Duration calculated based on content length

### 5. Events Container

**Layout:**
- Vertical stack of event cards
- Loading message on initial load
- "No events" message if day empty
- Hidden by default for day 2 and 3

### 6. Event Cards

**Structure:**
```html
<div class="event-card [type]">
    <div class="expand-icon"><span></span></div>
    <div class="event-time">
        <span>[Time Range]</span>
        <span>[Location]</span>
    </div>
    <div class="event-content">
        <h3 class="event-title">[Title]</h3>
        <div class="event-speakers">[Speakers]</div>
    </div>
</div>
```

**States:**
- Default: Semi-transparent background
- Current: Scaled up, "NOW" badge, glowing shadow
- Hover: Slight elevation

### 7. Workshop Carousel

**Container structure:**
```html
<div class="concurrent-workshops-container">
    <div class="workshops-header">[Time] | Concurrent Workshops</div>
    <div class="workshops-carousel">
        <div class="workshops-slides">
            <div class="workshop-slide">[Card]</div>
            <!-- More slides... -->
        </div>
    </div>
    <div class="workshops-navigation">[Prev] [Dots] [Counter] [Next]</div>
</div>
```

**Yellow accent:** 4px left border

### 8. Filter Drawer

**Sections:**
- Title: "Filter Events"
- Event Type filters
- Location filters

**Behavior:**
- Slides up from bottom: `transform: translateY(0)`
- Closes on outside click
- Fixed position with high z-index

### 9. Event Modal

**Full-screen overlay:**
- Dark background (95% opacity)
- Centered content card
- Slide-up animation on open

**Content:**
- Event type badge
- Time and location
- Full title
- Complete description
- All speakers with roles

### 10. Fixed Buttons

**Filter button (bottom-right):**
- Coral circular button
- Filter icon
- Opens drawer

**Theme toggle (bottom-left):**
- Light blue circular button
- Sun icon
- Toggles light mode

---

## JavaScript Features

All JavaScript in `main.js` (1223 lines). Key systems:

### 1. Configuration & Data Loading

**Lines 3-11:**
```javascript
const CONFIG = {
    urlPrefix: 'https://tcia-admin.github.io/tcia-server-files/',
    scheduleFile: 'd4pg-schedule.json',
    dayFiles: {
        day1: 'd4pg-schedule-day1.json',
        day2: 'd4pg-schedule-day2.json',
        day3: 'd4pg-schedule-day3.json'
    }
};
```

**Data loading** (Lines 415-445):
- Loads main schedule configuration
- Fetches all three day files in parallel
- Stores in `scheduleData` object
- Error handling with fallback messages

### 2. Test Mode System

**Purpose:** Simulate conference dates for testing

**Activation:**
- URL parameter: `?test-mode=true`
- URL parameter: `?simulate-date=2025-07-16T10:15:00`

**Features:**
- Visual indicator showing test mode
- Overrides current date/time
- Enables current event highlighting
- Useful for testing time-based features

### 3. Time Utilities

**Key functions:**
- `getCurrentTime()` - Returns real or simulated time
- `isDuringConference()` - Checks if now is during conference dates
- `getConferenceDay()` - Determines which day (day1/day2/day3)
- `timeToMinutes()` - Converts "HH:MM" to minutes for comparison
- `formatTime()` - Converts 24-hour to 12-hour with AM/PM

### 4. Event Rendering

**Main functions:**
- `renderDayEvents()` - Renders all events for a day
- `createEventCard()` - Creates single event card element
- `groupEventsByTime()` - Groups concurrent workshops
- `createConcurrentWorkshopsCarousel()` - Creates workshop carousel

**Rendering logic:**
```javascript
const timeBlocks = groupEventsByTime(events);

timeBlocks.forEach(timeBlock => {
    const workshops = timeBlock.events.filter(e => e.type === 'workshop');
    
    if (workshops.length > 1) {
        // Create carousel for concurrent workshops
        const carousel = createConcurrentWorkshopsCarousel(timeBlock);
        container.appendChild(carousel);
    } else {
        // Create individual event cards
        timeBlock.events.forEach(event => {
            const card = createEventCard(event);
            container.appendChild(card);
        });
    }
});
```

### 5. Workshop Carousel System

**Lines 580-785:**

**Features:**
- Swipe gesture support
- Touch start/move/end handlers
- Visual feedback during swipe
- Snap to nearest slide
- Auto-advance with pause on interaction

**Settings:**
```javascript
// Auto-advance: 12 seconds
autoAdvanceInterval = setInterval(() => {...}, 12000);

// Pause after interaction: 10-15 seconds
setTimeout(resumeAutoAdvance, 10000);
```

**Swipe detection:**
- Minimum distance: 30% of carousel width
- Requires horizontal swipe > vertical swipe
- Prevents page scrolling during horizontal swipes

### 6. Filter System

**Lines 467-605:**

**How it works:**
1. Get active type and location filters
2. Loop through all event cards and carousels
3. Show if matches filters, hide if not
4. For carousels, filter individual workshop slides

**Special handling:**
- "All" option shows everything
- Multiple filters can be active
- Filters persist when switching days
- Workshop carousels hide if no workshops match

### 7. Current Event Tracking

**Lines 94-131:**

**Logic:**
```javascript
function updateCurrentEvent() {
    // Clear existing "current" markers
    document.querySelectorAll('.event-card.current').forEach(card => {
        card.classList.remove('current');
    });
    
    // Only during conference dates
    if (!isDuringConference()) return;
    
    // Find event where current time is between start and end
    for (const event of dayEvents) {
        if (currentMinutes >= startMinutes && currentMinutes < endMinutes) {
            // Mark this event as current
            eventCard.classList.add('current');
            break;
        }
    }
}
```

**Runs:** Every time data loads or day switches

### 8. Event Modal System

**Lines 900-1036:**

**Opens when:** User taps expand icon on any event card

**Process:**
1. Find event data by ID
2. Populate modal with event details
3. Handle speakers/panelists/moderators differently
4. Add color-coded type badge
5. Show modal with animation
6. Prevent body scrolling

**Close triggers:**
- Tap X button
- Tap outside modal

### 9. Countdown Timer

**Lines 1067-1112:**

**Updates every second:**
```javascript
function updateCountdown() {
    const now = new Date();
    const diff = conferenceDate - now;
    
    if (diff <= 0) {
        // Show "LIVE NOW"
        countdownDigits.style.display = 'none';
        countdownLive.style.display = 'inline-block';
    } else {
        // Calculate and display time units
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        // ... etc
    }
}
```

### 10. Canvas Background

**Lines 847-887:**

**Draws:**
- Light gray background
- 150 random blue dots
- Linear gradient overlay

**Updates:** On window resize

**In light mode:**
- Changes to white background
- Dots become darker

### 11. Time Tracker Updates

**Lines 1176-1221:**

**Display logic:**
```javascript
if (currentEvent) {
    // Show "NOW: [title] • NEXT: [title] (time)"
} else if (isDuringConference()) {
    // Show "NEXT: [title] (time)"
} else {
    // Show "Conference begins July 16, 2025"
}
```

**Scrolling text:**
- Measures content width vs container width
- Enables animation if overflow detected
- Calculates duration based on length (~50px per second)

### 12. Day Switching

**Lines 395-413:**

**Process:**
```javascript
function switchDay(dayKey) {
    // Hide all day containers
    document.querySelectorAll('.events-container').forEach(container => {
        container.style.display = 'none';
    });
    
    // Show selected day
    document.getElementById(dayKey).style.display = 'block';
    
    // Update current event highlighting
    updateCurrentEvent();
    
    // Re-apply filters
    filterEvents();
}
```

---

## CSS Architecture

Total: 1406 lines of CSS in `main.css`

### Layout System

**Mobile-first approach:**
- No media queries needed for mobile (it's the default)
- Responsive adjustments for very small screens (≤600px, ≤480px, ≤340px)

**Main structure:**
```css
body {
    /* No fixed positioning, allows natural scroll */
    overflow-x: hidden;
}

.events-container {
    /* Vertical stack of cards */
    padding: var(--spacing-md);
}

.event-card {
    /* Individual card */
    margin-bottom: var(--spacing-md);
}
```

### Card System

**Base event card:**
```css
.event-card {
    background-color: rgba(24, 38, 84, 0.15);
    border-radius: 12px;
    position: relative;
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease;
    max-height: 300px;
}

.event-card::before {
    /* Color-coded left border */
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
}
```

**Current event styling:**
```css
.event-card.current {
    transform: scale(1.02);
    box-shadow: 0 5px 20px rgba(255, 137, 119, 0.4);
}

.event-card.current::after {
    content: 'NOW';
    position: absolute;
    top: -10px;
    right: 15px;
    background-color: var(--d4pg-coral);
    /* ... badge styling ... */
    animation: pulse-badge 2s infinite;
}
```

### Modal System

**Full-screen overlay:**
```css
.event-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(10, 24, 53, 0.95);
    z-index: 1000;
    display: none;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.event-modal.active {
    display: block;
    opacity: 1;
}

.modal-content {
    max-width: 600px;
    margin: 5vh auto;
    animation: modal-slide-up 0.3s ease-out;
}

@keyframes modal-slide-up {
    from { transform: translateY(30px); opacity: 0.7; }
    to { transform: translateY(0); opacity: 1; }
}
```

### Carousel System

**Workshop carousel:**
```css
.workshops-carousel {
    overflow: hidden;
}

.workshops-slides {
    display: flex;
    transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.workshop-slide {
    flex: 0 0 100%;
    width: 100%;
}
```

**Navigation:**
```css
.workshop-nav-btn {
    background: var(--d4pg-yellow);
    border-radius: 50%;
    width: 35px;
    height: 35px;
}

.workshop-indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
}

.workshop-indicator.active {
    background: var(--d4pg-yellow);
    transform: scale(1.4);
}
```

### Filter Drawer

**Slide-up animation:**
```css
.filter-drawer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(10, 24, 53, 0.95);
    transform: translateY(100%);
    transition: transform 0.3s ease;
    z-index: 99;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    max-height: 70vh;
    overflow-y: auto;
}

.filter-drawer.open {
    transform: translateY(0);
}
```

### Fixed Buttons

**Circular floating buttons:**
```css
.filter-button,
.theme-toggle {
    position: fixed;
    bottom: var(--spacing-md);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    z-index: 100;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.filter-button {
    right: var(--spacing-md);
    background-color: var(--d4pg-coral);
}

.theme-toggle {
    left: var(--spacing-md);
    background-color: var(--d4pg-light-blue);
}
```

### Animations

**Pulse effects:**
```css
@keyframes pulse {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.2); opacity: 0.7; }
    100% { transform: scale(1); opacity: 1; }
}

@keyframes pulse-badge {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
}

@keyframes pulse-countdown {
    0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.3; }
    50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.5; }
    100% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.3; }
}
```

**Scrolling text:**
```css
@keyframes scroll-text {
    0% { transform: translateX(100%); }
    100% { transform: translateX(-100%); }
}

.now-event.scrolling .now-event-content {
    animation: scroll-text var(--scroll-duration) linear infinite;
}
```

### Light Mode

**Theme toggle changes:**
```css
body.light-mode {
    color: var(--d4pg-blue);
    background-color: #f5f5f5;
}

body.light-mode .event-card {
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);
}

body.light-mode .event-title {
    color: var(--d4pg-blue);
    text-shadow: none;
}

/* Canvas background changes via JavaScript */
```

### Responsive Adjustments

**Very small screens:**
```css
@media (max-width: 600px) {
    .youth-summit-banner {
        font-size: 0.95rem;
        padding: 1rem 0.5rem;
    }
    
    .youth-summit-title {
        font-size: 1.1rem;
    }
}

@media (max-width: 340px) {
    .stacked-title span {
        font-size: 1.4rem;
    }
}
```

---

## Data Structure

**Uses the same JSON structure as desktop version.**

See [main schedule README](../d4pg-schedule/README.md#data-structure) for complete documentation.

**Quick reference:**

```json
{
  "type": "workshop",
  "title": "Event Title",
  "description": "Event description...",
  "startTime": "14:00",
  "endTime": "15:30",
  "location": "Workshop Room A",
  "people": {
    "speakers": [
      {
        "name": "Speaker Name",
        "title": "Optional Title"
      }
    ]
  }
}
```

**Event types:**
- `keynote`, `panel`, `workshop`, `break`, `social`

**Time format:** 24-hour (HH:MM)

**Location names:** Must match filter options

---

## Common Tasks

### Task 1: Change Conference Date

**Edit countdown timer:**
```javascript
// In main.js, around line 1114
const conferenceDate = new Date(2025, 6, 16, 8, 0, 0);
//                               (year, month-1, day, hour, min, sec)
```

**Edit time tracking:**
```javascript
// In main.js, around lines 65-67
const conferenceStart = new Date(2025, 6, 16);
const conferenceEnd = new Date(2025, 6, 19);
```

**Update day navigation in HTML:**
```html
<button class="day-button" data-day="day1">
    <div class="day-number">1</div>
    <div class="day-text">JULY 16</div>
</button>
```

### Task 2: Adjust Carousel Speed

**Change auto-advance timing:**
```javascript
// In main.js, around line 764
autoAdvanceInterval = setInterval(() => {
    // ... carousel logic ...
}, 12000); // Change this number (milliseconds)

// Change pause after interaction, around line 791
setTimeout(resumeAutoAdvance, 15000); // Change this number
```

**Common values:**
- 8000 = 8 seconds
- 12000 = 12 seconds (current)
- 15000 = 15 seconds

### Task 3: Modify Youth Summit Banner

**Edit HTML directly:**
```html
<div class="youth-summit-banner">
    <div class="youth-summit-title">Youth Summit</div>
    <div class="youth-summit-details">
        <span class="youth-summit-time">10:00 AM – 3:00 PM</span>
        <span class="youth-summit-location">Campus Center</span>
    </div>
</div>
```

**Move to different day:**
- Banner is hardcoded in day 3 container
- Cut/paste to different day container in HTML

### Task 4: Change Filter Options

**Add new event type filter:**
```html
<!-- Add to filter drawer in HTML -->
<button class="type-pill">Custom Type</button>
```

**Add new location filter:**
```html
<!-- Add to second .type-filters section -->
<button class="type-pill">New Location</button>
```

Filters are generated dynamically from event data, so just adding events with new types/locations will work automatically.

### Task 5: Disable Theme Toggle

**Option A - Hide the button:**
```css
.theme-toggle {
    display: none !important;
}
```

**Option B - Remove from HTML:**
Delete the theme toggle button element (around line 103-107 in HTML)

**Option C - Disable functionality:**
```javascript
// Comment out theme toggle listener in main.js (around line 1037)
// themeToggle.addEventListener('click', function() { ... });
```

### Task 6: Adjust Card Display

**Change card height:**
```css
.event-card {
    max-height: 300px; /* Change this value */
}
```

**Add more details to card:**
```javascript
// In createEventCard() function, add after speakers:
const description = document.createElement('div');
description.className = 'event-description-preview';
description.textContent = event.description.substring(0, 100) + '...';
eventCard.querySelector('.event-content').appendChild(description);
```

### Task 7: Change Background Animation

**Adjust dot count:**
```javascript
// In drawCanvas() function, around line 899
for (let i = 0; i < 150; i++) { // Change this number
    // ... dot drawing code ...
}
```

**Change dot color:**
```javascript
// Around line 898
ctx.fillStyle = 'rgba(138, 145, 199, 0.9)'; // Change this color
```

**Disable animation:**
```javascript
// In DOMContentLoaded, comment out canvas initialization:
// resizeCanvas();
// window.addEventListener('resize', resizeCanvas);
```

### Task 8: Modify Time Tracker Display

**Change update frequency:**
```javascript
// In DOMContentLoaded, around line 844
setInterval(updateTimeTracker, 60000); // Change to 30000 for 30 seconds
```

**Change scrolling speed:**
```javascript
// In enableScrollingIfNeeded(), around line 1171
const duration = Math.max(8, scrollDistance / 50); // Change 50 to adjust speed
```

### Task 9: Customize Modal Appearance

**Change modal background:**
```css
.event-modal {
    background-color: rgba(10, 24, 53, 0.95); /* Change opacity or color */
}
```

**Change modal width:**
```css
.modal-content {
    max-width: 600px; /* Change this value */
}
```

**Add custom content to modal:**
```javascript
// In event modal click handler, after description:
if (eventData.customField) {
    const custom = document.createElement('div');
    custom.className = 'modal-custom';
    custom.textContent = eventData.customField;
    modalBody.appendChild(custom);
}
```

### Task 10: Test Current Event Highlighting

**Enable test mode:**

Visit the page with URL parameters:
```
?test-mode=true&simulate-date=2025-07-16T10:15:00
```

This will:
- Show test mode indicator in top-left
- Set simulated date/time
- Highlight events that would be current at that time
- Show appropriate "NOW" badges

---

## Troubleshooting

### Problem: Schedule not loading

**Check:**
1. Open browser console (F12) - any errors?
2. Check Network tab for failed requests
3. Verify `urlPrefix` in `CONFIG` object is correct
4. Test JSON files are valid at [JSONLint](https://jsonlint.com)

**Common causes:**
- Wrong URL prefix
- CORS issues (must be served from web server)
- Invalid JSON syntax

### Problem: Events not displaying

**Check:**
1. Does `scheduleData.days` have data?
   - Console: `console.log(scheduleData)`
2. Are events filtered out?
   - Click "All" filter to reset
3. Is day container hidden?
   - Check `display` style on container

### Problem: Carousel not working

**Check:**
1. Do workshops have identical start/end times?
2. Are there at least 2 concurrent workshops?
3. Any JavaScript errors in console?
4. Is carousel initialization running?

**Debug:**
```javascript
// Check if carousel exists
document.querySelectorAll('.concurrent-workshops-container').length
```

### Problem: Swipe gestures not responding

**Check:**
1. Is device touch-enabled?
2. Are touch event listeners attached?
3. Is carousel in view (not hidden by filter)?

**Test:**
- Try arrow buttons instead
- Check for JavaScript errors
- Try in different mobile browser

### Problem: Current event not highlighting

**Check:**
1. Is current date during conference?
2. Is computer's clock correct?
3. Are event times in 24-hour format?
4. Is `isDuringConference()` returning true?

**Force test:**
```
?test-mode=true&simulate-date=2025-07-16T10:00:00
```

### Problem: Modal won't close

**Force close via console:**
```javascript
document.querySelector('.event-modal').classList.remove('active');
document.body.style.overflow = '';
```

**Check:**
- Is X button visible?
- Is click handler attached?
- Try tapping outside modal

### Problem: Filter drawer stuck

**Force close via console:**
```javascript
document.querySelector('.filter-drawer').classList.remove('open');
```

**Check:**
- Is filter button working?
- Any JavaScript errors?
- Try refreshing page

### Problem: Countdown not updating

**Check:**
1. Is conference date in future?
2. Any console errors?
3. Is `setInterval` running?

**Test:**
```javascript
// Check if conference date is set
new Date(2025, 6, 16, 8, 0, 0)
```

### Problem: Theme toggle not working

**Check:**
1. Is button visible?
2. Is click handler attached?
3. Is `.light-mode` class toggling?

**Test:**
```javascript
// Toggle manually
document.body.classList.toggle('light-mode');
```

### Problem: Canvas not rendering

**Check:**
1. Is canvas element in HTML?
2. Does canvas have correct ID?
3. Any errors in console?
4. Is browser supported?

**Fallback:**
Canvas is decorative only. If it fails, page still works.

---

## Performance Tips

### 1. Optimize for Older Devices

**Reduce canvas complexity:**
```javascript
// Use fewer dots
for (let i = 0; i < 75; i++) { // Instead of 150
```

**Disable animations:**
```css
/* Remove animations on slow devices */
@media (prefers-reduced-motion: reduce) {
    * {
        animation: none !important;
        transition: none !important;
    }
}
```

### 2. Reduce Auto-Advance Frequency

**Slower carousel:**
```javascript
// Change from 12 seconds to 20 seconds
setInterval(() => {...}, 20000);
```

### 3. Lazy Load Speaker Photos

Already implemented:
```javascript
img.loading = 'lazy';
```

### 4. Minimize Reflows

**Current time updates:**
- Already optimized to once per minute
- Could reduce to once per 5 minutes if needed

### 5. Reduce Memory Usage

**Clear unused data:**
```javascript
// After rendering, if memory is concern:
scheduleData.days[otherDay] = null;
```

---

## Testing Checklist

**Functionality:**
- [ ] All days load and display correctly
- [ ] Day navigation switches properly
- [ ] Event cards display with correct information
- [ ] Expand icons open modals
- [ ] Modals close (X button and outside click)
- [ ] Filters show/hide events correctly
- [ ] Workshop carousels swipe and navigate
- [ ] Countdown timer counts down
- [ ] Current event highlights when in date range
- [ ] Time tracker updates
- [ ] Theme toggle switches modes
- [ ] Filter drawer opens/closes

**Touch Interactions:**
- [ ] Swipe gestures work on carousels
- [ ] Tap targets are large enough (44x44px minimum)
- [ ] No accidental activations
- [ ] Smooth scrolling

**Visual:**
- [ ] All colors match brand guidelines
- [ ] Text is readable on all backgrounds
- [ ] Icons display correctly
- [ ] Animations are smooth
- [ ] Canvas background renders

**Cross-Browser:**
- [ ] Safari (iOS)
- [ ] Chrome (Android)
- [ ] Firefox Mobile
- [ ] Samsung Internet

**Performance:**
- [ ] Page loads in < 3 seconds
- [ ] Scrolling is smooth
- [ ] No lag when switching days
- [ ] Memory usage is reasonable

---

## Resources

### Tools
- [JSONLint](https://jsonlint.com) - Validate JSON
- [BrowserStack](https://browserstack.com) - Test on real devices
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/) - Mobile emulation

### Documentation
- [Main Schedule README](../d4pg-schedule/README.md) - Detailed schedule docs
- [Touch Events](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events) - MDN
- [CSS Animations](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations) - MDN

---

## Version History

**Version 1.1** (Current)
- Removed console.log statements (20 removed)
- Removed commented-out HTML (1 line)
- Removed commented-out CSS (3 sections)
- Removed unused CSS rules (.modal-speaker-avatar)
- Cleaned up excessive blank lines
- Total reduction: ~34 lines

**Version 1.0**
- Initial mobile schedule implementation
- Card-based layout
- Touch-optimized interactions
- Workshop carousels with swipe support
- Event detail modals
- Theme toggle
- Countdown timer
- Canvas background
- Filter drawer
- Current event tracking

---

Thank you for maintaining the D4PG mobile schedule page. This README should provide everything needed to make updates and customizations. For questions about data structure or shared features, refer to the [main schedule README](../d4pg-schedule/README.md).


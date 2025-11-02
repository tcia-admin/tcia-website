# D4PG Schedule Page - Complete Guide

A comprehensive guide to understanding, customizing, and maintaining the Data For Public Good (D4PG) 2025 conference schedule page.

## Table of Contents

- [Overview](#overview)
- [File Structure](#file-structure)
- [Quick Start Guide](#quick-start-guide)
- [Design System](#design-system)
- [Page Architecture](#page-architecture)
- [JavaScript Features](#javascript-features)
- [CSS Architecture](#css-architecture)
- [Data Structure](#data-structure)
- [Common Tasks](#common-tasks)
- [Troubleshooting](#troubleshooting)
- [Advanced Customization](#advanced-customization)

---

## Overview

The D4PG schedule page is a dynamic, interactive conference schedule built with vanilla HTML, CSS, and JavaScript. It features:

- **Three-Day Schedule**: Organized day-by-day with smooth transitions
- **Event Filtering**: Filter by event type and location
- **Workshop Carousels**: Auto-rotating showcase for concurrent workshops
- **Speaker Photo Modals**: Hover over speaker names to see photos and titles
- **Real-Time Updates**: Shows current and upcoming events
- **Responsive Design**: Includes a separate mobile view for smaller screens
- **Interactive Hero**: Draggable tagline with physics (desktop only)
- **Word Cloud Animation**: Animated scrolling text banner

**Technology Stack:**
- Pure HTML5
- CSS3 with CSS Variables
- Vanilla JavaScript ES6+
- JSON data files for schedule content

---

## File Structure

```
d4pg-schedule/
├── d4pg-schedule.html          # Main HTML file
├── js/
│   └── main.js                 # All JavaScript functionality (1745 lines)
├── css/
│   └── main.css               # All styles (2111 lines)
├── d4pg-schedule.json          # Configuration file
├── d4pg-schedule-day1.json     # Day 1 schedule data
├── d4pg-schedule-day2.json     # Day 2 schedule data
├── d4pg-schedule-day3.json     # Day 3 schedule data
└── README.md                   # This file
```

### External Resources

The page loads resources from hosted URLs:
- **CSS**: `https://tcia-admin.github.io/tcia-website/d4pg/d4pg-schedule/css/main.css`
- **JS**: `https://tcia-admin.github.io/tcia-website/d4pg/d4pg-schedule/js/main.js`
- **Schedule Data**: `https://tcia-admin.github.io/tcia-website/d4pg/d4pg-schedule/d4pg-schedule-day[1-3].json`
- **Speaker Bios**: `https://tcia-admin.github.io/tcia-website/d4pg/d4pg-schedule/d4pg-bios-2025.json`

---

## Quick Start Guide

### For Non-Technical Users

**To change event information:**
1. Open the appropriate day's JSON file (`d4pg-schedule-day1.json`, etc.)
2. Find the event you want to modify
3. Edit the text between the quotes
4. Save the file

**Example - Changing an event time:**
```json
{
  "startTime": "10:00",
  "endTime": "11:30"
}
```

**To change colors:**
1. Open `css/main.css`
2. Find the `:root` section at the top
3. Change the hex color values
4. Save the file

---

## Design System

### Color Palette

All colors are defined as CSS variables for easy site-wide updates.

```css
:root {
    /* Brand Colors */
    --d4pg-navy: #0a1835;        /* Dark background */
    --d4pg-blue: #182654;        /* Medium blue */
    --d4pg-light-blue: #8a91c7;  /* Light blue/purple */
    --d4pg-coral: #ff8977;       /* Buttons & accents */
    --d4pg-yellow: #f3e04b;      /* Highlights */
    --d4pg-green: #4adb97;       /* Success indicators */
    --d4pg-pink: #ff3dc8;        /* Social events */
    --d4pg-white: #f5f5f5;       /* Text */
}
```

**Event Type Colors:**
- **Keynote**: Coral left border (`--d4pg-coral`)
- **Panel**: Light blue left border (`--d4pg-light-blue`)
- **Workshop**: Yellow left border (`--d4pg-yellow`)
- **Break**: Green left border (`--d4pg-green`)
- **Social**: Pink left border (`--d4pg-pink`)

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
--font-accent: "Quicksand", sans-serif;
```

### Spacing System

```css
:root {
    --spacing-xs: 0.25rem;   /* 4px */
    --spacing-sm: 0.5rem;    /* 8px */
    --spacing-md: 1rem;      /* 16px */
    --spacing-lg: 1.5rem;    /* 24px */
    --spacing-xl: 2rem;      /* 32px */
    --spacing-2xl: 3rem;     /* 48px */
    --spacing-3xl: 4rem;     /* 64px */
}
```

---

## Page Architecture

### 1. Navigation Breadcrumb

**Purpose**: Shows user location and provides quick links back

**Key Elements:**
- Home link to TCIA
- D4PG Conference link
- Current page indicator

**How to modify:**
```html
<nav class="nav-breadcrumb">
    <a href="https://tciamn.org">
        <i class="fa-solid fa-house"></i>
        TCIA Home
    </a>
    <span class="separator">›</span>
    <a href="https://tciamn.org/d4pg">
        <i class="fa-solid fa-calendar-days"></i>
        D4PG Conference
    </a>
</nav>
```

### 2. Hero Section with Word Cloud

**Purpose**: Visual header with animated word cloud

**Features:**
- D4PG logo
- "CONFERENCE SCHEDULE" tagline (draggable on desktop)
- Animated word cloud with professional personas

**Word cloud words:**
```javascript
const words = [
    'Artists', 'Problem Solvers', 'Entrepreneurs', 
    'Gamers', 'Educators', 'Technologists',
    'Creators', 'Innovators', 'Designers',
    'Developers', 'Advocates', 'Visionaries'
];
```

**To change words:**
Edit the `words` array in `js/main.js` (around line 1562)

### 3. Day Navigation

**Purpose**: Switch between conference days

**Features:**
- Three day buttons with dates
- Active state highlighting
- Animated wave divider

**How it works:**
Each button has a `data-day` attribute that corresponds to a schedule JSON file:
```html
<button class="day-button active" data-day="day1">
    <span class="day-number">1</span>
    <span class="day-text">Day 1 (July 16)</span>
</button>
```

### 4. Time Tracker

**Purpose**: Shows current time and what's happening now

**Components:**
- Current time display (updates every minute)
- "Happening Now" section
- "Next" event preview

**How it works:**
- Compares current time to event start/end times
- Highlights matching events on the timeline
- Updates automatically every 5 minutes

### 5. Filter Sidebar

**Purpose**: Filter events by type and location

**Filter Types:**
- **Event Type**: Keynotes, Panels, Workshops, Breaks, Social Events
- **Location**: Main Auditorium, Dining Hall, Workshop Rooms, Main Hall

**How filtering works:**
1. User checks/unchecks filters
2. JavaScript updates `activeTypeFilters` and `activeLocationFilters` arrays
3. Events are shown/hidden based on matching data attributes
4. Active filters appear as removable pills

### 6. Schedule Timeline

**Purpose**: Display events in chronological order

**Features:**
- Vertical timeline with connecting line
- Time badges on the left
- Event blocks with details
- Color-coded by event type

**Event block structure:**
```html
<div class="event-block keynote" data-type="keynote" data-location="main-auditorium">
    <div class="event-time">...</div>
    <div class="event-content">
        <h3 class="event-title">Event Title</h3>
        <div class="event-location">Location</div>
        <div class="event-description">Description</div>
        <div class="event-people">Speakers</div>
    </div>
</div>
```

### 7. Workshop Carousel

**Purpose**: Display concurrent workshops in a rotating carousel

**Features:**
- Auto-rotates every 15 seconds
- Manual navigation (arrows and dots)
- Pauses on hover
- Shows speaker photos on hover

**Carousel controls:**
- Previous/Next buttons
- Dot indicators showing position
- Counter (e.g., "1 / 3")

---

## JavaScript Features

All JavaScript is in `js/main.js` (1745 lines). Here's what each feature does:

### 1. Schedule Data Loading

**What it does:** Fetches schedule and speaker data from JSON files

**Code location:** Lines 10-65

**How it works:**
```javascript
Promise.all([
    fetch(urlPrefix + schedulefile).then(response => response.json()),
    fetch(urlPrefix + biosfile).then(response => response.json())
])
.then(([scheduleData, biosData]) => {
    conferenceData = scheduleData;
    speakerBiosData = biosData;
    // Initialize page...
});
```

**Caching system:**
- First load fetches from server
- Data stored in `scheduleCache` object
- Subsequent day switches use cached data
- Significantly improves performance

### 2. Day Navigation System

**What it does:** Loads and displays the selected day's schedule

**Code location:** Lines 52-111

**Key function: `loadDaySchedule(day)`**
1. Updates active day button
2. Shows correct day schedule container
3. Checks if schedule already loaded
4. Loads from cache or fetches from server
5. Renders events to timeline

### 3. Event Rendering Engine

**What it does:** Converts JSON data into HTML elements

**Code location:** Lines 113-913

**Key functions:**
- `renderSchedule(data, day)` - Main rendering function
- `groupEventsByTime(events)` - Groups concurrent events
- `createEventElement(event)` - Creates single event block
- `createConcurrentEventsGroup(timeBlock)` - Creates concurrent event container
- `createWorkshopCarousel(workshops)` - Creates carousel for concurrent workshops

**Event grouping logic:**
```javascript
// Events with same start and end times are grouped
const timeBlocks = groupEventsByTime(data.events);

timeBlocks.forEach(timeBlock => {
    if (timeBlock.events.length === 1) {
        // Single event - render normally
    } else {
        // Multiple concurrent events - create carousel
    }
});
```

### 4. Workshop Carousel System

**What it does:** Creates interactive carousels for concurrent workshops

**Code location:** Lines 238-514

**Features:**
- Slide navigation with smooth transitions
- Auto-advance every 15 seconds
- Pauses on hover or focus
- 20-second pause after manual navigation
- Keyboard navigation (arrow keys)

**Carousel settings:**
```javascript
// Auto-advance interval
autoAdvanceInterval = setInterval(() => {
    goToSlide(currentSlide + 1);
}, 15000); // 15 seconds

// Pause duration after manual navigation
setTimeout(resumeAutoAdvance, 20000); // 20 seconds
```

**To change carousel speed:**
Edit the interval values in `initializeCarousel()` function (lines 449-514)

### 5. Speaker Photo Modal System

**What it does:** Shows speaker photos and titles on hover

**Code location:** Lines 598-678

**How it works:**
1. Matches speaker names in schedule to bios data
2. Creates hidden modal div with photo
3. Shows modal when user hovers over name
4. Animated border cycles through brand colors

**Speaker matching algorithm:**
```javascript
function findSpeakerInfo(speakerName) {
    // Clean up name for matching
    const cleanName = speakerName.trim().toLowerCase();
    
    // Try exact match first
    // Then try partial matches for variations
    // Filters out titles (Dr., Prof., etc.)
    
    return speaker ? { photo, title, name } : null;
}
```

**To disable speaker photos:**
Comment out the modal creation in `addEventPeople()` function

### 6. Filter System

**What it does:** Shows/hides events based on user selections

**Code location:** Lines 915-1138

**How filtering works:**
```javascript
let activeTypeFilters = ['all'];
let activeLocationFilters = ['all'];

function updateEventVisibility() {
    eventBlocks.forEach(event => {
        const eventType = event.getAttribute('data-type');
        const eventLocation = event.getAttribute('data-location');
        
        const typeMatches = activeTypeFilters.includes('all') || 
            activeTypeFilters.includes(eventType);
        const locationMatches = activeLocationFilters.includes('all') || 
            activeLocationFilters.includes(eventLocation);
        
        if (typeMatches && locationMatches) {
            event.style.display = 'block';
        } else {
            event.style.display = 'none';
        }
    });
}
```

**Filter behavior:**
- Checking "All Events" unchecks specific types
- Checking a specific type unchecks "All Events"
- Must always have at least one filter active
- Same logic applies to location filters

### 7. Mini Sidebar System

**What it does:** Provides a collapsible filter sidebar

**Code location:** Lines 1140-1250

**Features:**
- Fixed position on left side
- Toggle button with icon animation
- Opens/closes filter sidebar
- Mobile overlay on small screens

**Toggle behavior:**
- Hamburger icon when closed
- X icon when open
- On mobile: full-screen overlay behind sidebar
- On desktop: pushes content to the right

### 8. Time Tracking System

**What it does:** Updates current time and highlights active events

**Code location:** Lines 1404-1499

**Two main functions:**

**`updateCurrentTime()`** - Updates clock display
- Runs every 60 seconds
- Shows 12-hour format (AM/PM)
- Displays in time tracker header

**`updateCurrentEvents()`** - Highlights current and upcoming events
- Runs every 5 minutes
- Compares current time to event times
- Adds 'current' class to active events
- Updates "Happening Now" and "Next" displays

**Time format conversion:**
```javascript
function formatTimeTo12Hour(time24) {
    // Converts "14:30" to "2:30 PM"
    // Handles edge cases (midnight, noon)
    // Returns formatted string
}
```

### 9. Mobile Embed System

**What it does:** Shows mobile-optimized view on small screens

**Code location:** Lines 1528-1550

**How it works:**
- Detects screen width <= 768px
- Hides desktop version
- Shows iframe with mobile schedule
- Prevents scrolling on body

**Mobile embed URL:**
```javascript
iframe.src = '/ds-mobile-source';
```

### 10. Swipe Gestures

**What it does:** Enables swipe to open/close sidebar on mobile

**Code location:** Lines 1277-1310

**Gesture detection:**
- Swipe right (70px+): Opens sidebar
- Swipe left (70px+): Closes sidebar
- Only active on touch devices

### 11. Interactive Hero Features

**Two special interactive elements (desktop only):**

**Word Cloud Animation** (Lines 1560-1599)
- Infinite horizontal scroll with wave motion
- 60-second animation cycle
- Words float vertically while scrolling
- Diamond separators between words

**Draggable Tagline** (Lines 1601-1744)
- Click and drag the "CONFERENCE SCHEDULE" text
- Physics simulation with momentum
- Bounces off boundaries
- Double-click to reset position
- Rotation based on velocity

---

## CSS Architecture

The CSS file is 2111 lines and uses a modular structure.

### Responsive Breakpoints

```css
/* Mobile (Portrait) */
@media screen and (max-width: 480px) { }

/* Tablet / Mobile */
@media screen and (max-width: 768px) { }

/* Small Desktop */
@media screen and (max-width: 1024px) { }

/* Medium Desktop */
@media screen and (max-width: 1200px) { }

/* Large Desktop */
@media screen and (min-width: 1400px) { }
```

**Mobile strategy:**
On screens 768px and below, the page switches to a mobile-optimized iframe view.

### Layout System

**Main layout structure:**
```css
.schedule-layout {
    display: flex;
    /* Filter sidebar + main content */
}

.main-content {
    flex: 1;
    /* Day navigation, time tracker, schedule */
}
```

**Sidebar positioning:**
```css
.mini-sidebar {
    position: fixed;
    left: 0;
    width: 60px;
}

.filter-sidebar {
    position: fixed;
    left: -280px; /* Hidden by default */
    width: 280px;
}

.filter-sidebar.open {
    left: 60px; /* Slides out next to mini sidebar */
}
```

### Timeline System

**Visual structure:**
```
  [Time Badge]----[Dot]--[Event Block]
      10:00           •   Welcome & Opening
                          Main Auditorium
      |
  [Time Badge]----[Dot]--[Event Block]
     11:30            •   Keynote Address
                          Main Auditorium
```

**CSS implementation:**
```css
.timeline {
    position: relative;
    padding-left: 300px; /* Space for time badges */
}

.timeline::before {
    /* Vertical connecting line */
    content: '';
    position: absolute;
    width: 4px;
    background: gradient;
    left: 200px;
}

.event-time {
    /* Time badge */
    position: absolute;
    left: -377px;
    width: 180px;
}

.event-time::after {
    /* Dot on timeline */
    content: '';
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    right: -100px;
}

.event-block {
    /* Event card */
    margin-bottom: var(--spacing-lg);
    padding: var(--spacing-lg);
}
```

### Animation System

**Button hover effects:**
```css
.day-button {
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.day-button:hover {
    transform: translateY(-2px) scale(1.05);
}

.day-button.active {
    transform: translateY(-3px) scale(1.05);
}
```

**Speaker photo modal animation:**
```css
.speaker-photo-modal {
    transform: translateX(-50%) scale(0);
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.speaker-name-with-photo:hover .speaker-photo-modal {
    transform: translateX(-50%) scale(1);
    opacity: 1;
}

/* Animated border cycles through brand colors */
@keyframes d4pg-glow-border {
    0% { border-color: var(--d4pg-navy); }
    12.5% { border-color: var(--d4pg-blue); }
    25% { border-color: var(--d4pg-light-blue); }
    37.5% { border-color: var(--d4pg-coral); }
    50% { border-color: var(--d4pg-yellow); }
    62.5% { border-color: var(--d4pg-green); }
    75% { border-color: var(--d4pg-pink); }
    87.5% { border-color: var(--d4pg-white); }
    100% { border-color: var(--d4pg-navy); }
}
```

**Word cloud animation:**
```css
@keyframes wave-scroll {
    0% { transform: translateX(0) translateY(0); }
    25% { transform: translateX(-25%) translateY(8px); }
    50% { transform: translateX(-50%) translateY(0); }
    75% { transform: translateX(-75%) translateY(-8px); }
    100% { transform: translateX(-100%) translateY(0); }
}

.word-cloud-content {
    animation: wave-scroll 60s linear infinite;
}
```

### Component Styling

**Event blocks by type:**
```css
.event-block.keynote {
    border-left: 4px solid var(--d4pg-coral);
}

.event-block.panel {
    border-left: 4px solid var(--d4pg-light-blue);
}

.event-block.workshop {
    border-left: 4px solid var(--d4pg-yellow);
}
```

**Workshop carousel:**
```css
.workshop-carousel {
    overflow: hidden;
    min-height: 320px;
}

.workshop-slides {
    display: flex;
    transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.workshop-slide {
    flex: 0 0 100%;
}
```

---

## Data Structure

### Schedule JSON Format

Each day's schedule is stored in a separate JSON file:

**File naming:**
- `d4pg-schedule-day1.json`
- `d4pg-schedule-day2.json`
- `d4pg-schedule-day3.json`

**Basic structure:**
```json
{
  "date": "2025-07-16",
  "events": [
    {
      "type": "keynote",
      "title": "Opening Keynote",
      "description": "Description of the event...",
      "startTime": "09:00",
      "endTime": "10:00",
      "location": "Main Auditorium",
      "people": {
        "speakers": [
          {
            "name": "Jane Doe",
            "title": "Executive Director"
          }
        ]
      },
      "tags": ["AI", "Ethics"]
    }
  ]
}
```

### Event Types

Valid event types:
- `"keynote"` - Major presentations
- `"panel"` - Panel discussions
- `"workshop"` - Interactive sessions
- `"break"` - Meals and breaks
- `"social"` - Social events

### People Data Structure

**For keynotes and workshops:**
```json
"people": {
  "speakers": [
    {
      "name": "Jane Doe",
      "title": "Optional title"
    }
  ]
}
```

**For panels:**
```json
"people": {
  "moderator": {
    "name": "Moderator Name",
    "title": "Optional title"
  },
  "panelists": [
    {"name": "Panelist 1"},
    {"name": "Panelist 2"}
  ]
}
```

### Location Values

Standard location names (must match filter system):
- `"Main Auditorium"` → `data-location="main-auditorium"`
- `"Dining Hall"` → `data-location="dining-hall"`
- `"Workshop Room A"` → `data-location="workshop-a"`
- `"Workshop Room B"` → `data-location="workshop-b"`
- `"Main Hall"` → `data-location="main-hall"`

**Important:** Locations are converted to lowercase with spaces replaced by hyphens for filtering.

### Speaker Bios JSON

**Structure of `d4pg-bios-2025.json`:**
```json
{
  "speakers": [
    {
      "id": "speaker-jane-doe",
      "name": "Jane Doe",
      "pronouns": "she/her",
      "title": "Executive Director, Organization Name",
      "photo": "https://url-to-photo.jpg",
      "bio": [
        "First paragraph...",
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
  ]
}
```

**Note:** The photo modal system automatically matches speaker names from the schedule to this bios file.

---

## Common Tasks

### Task 1: Add a New Event

**Step 1: Add to appropriate day's JSON file**

```json
{
  "type": "workshop",
  "title": "Introduction to Data Sovereignty",
  "description": "Learn the basics of data sovereignty and community ownership.",
  "startTime": "14:00",
  "endTime": "15:30",
  "location": "Workshop Room A",
  "people": {
    "speakers": [
      {"name": "John Smith"}
    ]
  },
  "tags": ["Data Justice", "Beginner"]
}
```

**Step 2: Save and refresh**
- The page will automatically load and display the new event
- It will appear on the timeline in chronological order
- Filters will include it based on type and location

### Task 2: Change Event Times

**Find the event in the JSON file:**
```json
{
  "startTime": "10:00",
  "endTime": "11:30"
}
```

**Change to new times:**
```json
{
  "startTime": "14:00",
  "endTime": "15:30"
}
```

**Time format:** Always use 24-hour format (HH:MM)
- "09:00" for 9:00 AM
- "14:30" for 2:30 PM
- "17:00" for 5:00 PM

### Task 3: Update Speaker Information

**Option A: Change in schedule JSON** (affects only that event)
```json
"people": {
  "speakers": [
    {
      "name": "Updated Name",
      "title": "New Title"
    }
  ]
}
```

**Option B: Update speaker bio** (affects all appearances)

Edit `d4pg-bios-2025.json`:
```json
{
  "name": "Jane Doe",
  "title": "New Title Here",
  "photo": "https://new-photo-url.jpg"
}
```

### Task 4: Add Concurrent Workshops

**To create concurrent workshops** (same start and end times):

```json
{
  "events": [
    {
      "type": "workshop",
      "title": "Workshop A",
      "startTime": "14:00",
      "endTime": "15:30",
      "location": "Workshop Room A"
    },
    {
      "type": "workshop",
      "title": "Workshop B",
      "startTime": "14:00",
      "endTime": "15:30",
      "location": "Workshop Room B"
    },
    {
      "type": "workshop",
      "title": "Workshop C",
      "startTime": "14:00",
      "endTime": "15:30",
      "location": "Main Hall"
    }
  ]
}
```

The system automatically detects same times and creates a carousel.

### Task 5: Change Site Colors

**Open `css/main.css` and edit the `:root` section:**

```css
:root {
    /* Change these hex codes */
    --d4pg-coral: #YOUR_COLOR;     /* Buttons, keynotes */
    --d4pg-yellow: #YOUR_COLOR;    /* Workshops, highlights */
    --d4pg-light-blue: #YOUR_COLOR; /* Panels */
    --d4pg-green: #YOUR_COLOR;     /* Breaks */
    --d4pg-pink: #YOUR_COLOR;      /* Social events */
}
```

**Color affects:**
- Event type border colors
- Button backgrounds
- Time badge backgrounds
- Filter pill colors
- Speaker modal borders

### Task 6: Adjust Timeline Spacing

**To change timeline positioning:**

```css
.timeline {
    padding-left: 300px; /* Space for time badges */
}

.timeline::before {
    left: 200px; /* Position of vertical line */
}

.event-time {
    left: -377px; /* Position of time badge */
    width: 180px; /* Width of time badge */
}
```

**For mobile:**
```css
@media screen and (max-width: 768px) {
    .timeline {
        padding-left: 160px;
    }
    .event-time {
        left: -160px;
        width: 90px;
    }
}
```

### Task 7: Change Workshop Carousel Speed

**Open `js/main.js` and find the carousel initialization** (around line 456):

```javascript
// Auto-advance interval
autoAdvanceInterval = setInterval(() => {
    // Carousel logic
}, 15000); // Change this number (milliseconds)

// Pause after manual navigation
setTimeout(resumeAutoAdvance, 20000); // Change this number
```

**Common values:**
- 10000 = 10 seconds
- 15000 = 15 seconds (current)
- 20000 = 20 seconds
- 30000 = 30 seconds

### Task 8: Add a New Location

**Step 1: Add to filter sidebar in HTML:**
```html
<div class="sidebar-filter-option">
    <input type="checkbox" id="sidebar-loc-new-room" 
           class="sidebar-filter-checkbox" 
           data-filter-location="new-room">
    <label for="sidebar-loc-new-room" class="sidebar-filter-label">
        New Room Name
    </label>
</div>
```

**Step 2: Use in schedule JSON:**
```json
{
  "location": "New Room Name"
}
```

The location name will be automatically converted to `data-location="new-room-name"` for filtering.

### Task 9: Disable Interactive Features

**To disable draggable hero:**
Comment out the initialization in `js/main.js`:
```javascript
document.addEventListener('DOMContentLoaded', function() {
    // ... other code ...
    
    // initializeDraggableHero(); // Comment this out
});
```

**To disable speaker photo modals:**
Comment out in the `addEventPeople()` function:
```javascript
// const photoModal = createSpeakerPhotoModal(speakerInfo);
// personName.appendChild(photoModal);
```

**To disable auto-scrolling word cloud:**
Remove the animation from CSS:
```css
.word-cloud-content {
    /* animation: wave-scroll 60s linear infinite; */
}
```

### Task 10: Change Date Display

**Update day navigation in HTML:**
```html
<button class="day-button active" data-day="day1">
    <span class="day-number">1</span>
    <span class="day-text">Day 1 (YOUR DATE HERE)</span>
</button>
```

**Update day title in HTML:**
```html
<h2 class="day-title">Day 1 - YOUR FULL DATE HERE</h2>
```

**Update date in JSON file:**
```json
{
  "date": "2025-07-16"
}
```

---

## Troubleshooting

### Problem: Schedule not loading

**Check:**
1. Are JSON file URLs correct in `js/main.js`?
   ```javascript
   const urlPrefix = 'https://tcia-admin.github.io/tcia-website/d4pg/d4pg-schedule/';
   ```

2. Open browser console (F12) - are there errors?

3. Verify JSON files are valid using [JSONLint](https://jsonlint.com)

4. Check network tab in DevTools for 404 errors

**Common JSON errors:**
```json
// WRONG - Missing comma
{
  "title": "Event Name"
  "startTime": "10:00"
}

// CORRECT
{
  "title": "Event Name",
  "startTime": "10:00"
}
```

### Problem: Events not filtering correctly

**Check:**
1. Does event have correct `type` value?
   ```json
   "type": "workshop"  // Must be: keynote, panel, workshop, break, social
   ```

2. Is location properly formatted?
   ```json
   "location": "Workshop Room A"  // Spaces and capitals OK
   ```

3. Are filter checkboxes in HTML?
   - Event type must have matching checkbox
   - Location must have matching checkbox

### Problem: Speaker photos not showing

**Check:**
1. Is speaker name spelled exactly the same in schedule and bios?
   ```json
   // Schedule
   "name": "Jane Doe"
   
   // Bios (must match)
   "name": "Jane Doe"
   ```

2. Is photo URL valid and accessible?
   ```json
   "photo": "https://valid-url.com/photo.jpg"
   ```

3. Check browser console for image load errors

**Debug speaker matching:**
The system is forgiving with matching:
- Ignores case differences
- Handles titles (Dr., Prof., etc.)
- Matches partial names

### Problem: Workshop carousel not working

**Check:**
1. Do workshops have identical start and end times?
   ```json
   // All must match exactly
   "startTime": "14:00",
   "endTime": "15:30"
   ```

2. Are all workshops marked as `"type": "workshop"`?

3. Open console - any JavaScript errors?

### Problem: Timeline positioning is off

**Likely causes:**
1. Browser zoom level
2. Screen resolution
3. Missing CSS file

**Fix:**
1. Check that CSS file is loading
2. Verify browser zoom is at 100%
3. Try clearing browser cache (Ctrl+Shift+R / Cmd+Shift+R)

### Problem: Mobile view not working

**Check:**
1. Is mobile embed URL correct?
   ```javascript
   iframe.src = '/ds-mobile-source';
   ```

2. Is screen width actually <= 768px?

3. Are there CSS overrides preventing the switch?

**Force mobile view for testing:**
1. Open DevTools (F12)
2. Click device toolbar icon
3. Select mobile device

### Problem: Time tracker shows wrong events

**Check:**
1. Are event times in 24-hour format?
   ```json
   "startTime": "14:00"  // CORRECT (2:00 PM)
   "startTime": "2:00"   // WRONG
   ```

2. Is your computer's clock correct?

3. Are times in the correct timezone?

**Time tracker updates:**
- Current time: Every 60 seconds
- Current events: Every 5 minutes

### Problem: Sidebar won't open/close

**Check:**
1. Is mini sidebar visible?
2. Click the toggle button (hamburger icon)
3. Check browser console for errors

**Force close via console:**
```javascript
document.querySelector('.filter-sidebar').classList.remove('open');
```

### Problem: Day navigation buttons not working

**Check:**
1. Do buttons have `data-day` attribute?
2. Do day IDs match JSON filenames?
   - Button: `data-day="day1"`
   - File: `d4pg-schedule-day1.json`
   - Container: `id="day1"`

3. Are click handlers attached?

**Test in console:**
```javascript
// Should load day 1
loadDaySchedule('day1');
```

---

## Advanced Customization

### Adding Custom Event Types

**Step 1: Choose a color**
```css
:root {
    --d4pg-custom: #YOUR_COLOR;
}
```

**Step 2: Add event type styling**
```css
.event-block.custom-type {
    border-left: 4px solid var(--d4pg-custom);
}
```

**Step 3: Add filter checkbox**
```html
<div class="sidebar-filter-option">
    <input type="checkbox" id="sidebar-custom" 
           class="sidebar-filter-checkbox" 
           data-filter="custom-type">
    <label for="sidebar-custom" class="sidebar-filter-label">
        Custom Events
    </label>
</div>
```

**Step 4: Use in JSON**
```json
{
  "type": "custom-type",
  "title": "My Custom Event"
}
```

### Creating Multi-Column Timeline

**For side-by-side tracks:**

```css
.timeline {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
}

.event-block {
    margin-left: 0; /* Remove left offset */
}

/* Position time badge at top of each event */
.event-time {
    position: relative;
    left: 0;
    top: 0;
}
```

### Adding Event Details Expansion

**Already implemented!** Toggle buttons appear when events have a `details` field:

```json
{
  "title": "Workshop Title",
  "description": "Brief description...",
  "details": "Extended details shown when expanded..."
}
```

The system automatically adds a "Show Details" button.

### Implementing Event Search

**Add search input to HTML:**
```html
<div class="schedule-search">
    <input type="text" id="event-search" placeholder="Search events...">
</div>
```

**Add search functionality to JavaScript:**
```javascript
document.getElementById('event-search').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const events = document.querySelectorAll('.event-block');
    
    events.forEach(event => {
        const title = event.querySelector('.event-title').textContent.toLowerCase();
        const description = event.querySelector('.event-description').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            event.style.display = 'block';
        } else {
            event.style.display = 'none';
        }
    });
});
```

### Adding Event Bookmarking

**Store favorites in localStorage:**
```javascript
function toggleFavorite(eventId) {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (favorites.includes(eventId)) {
        favorites = favorites.filter(id => id !== eventId);
    } else {
        favorites.push(eventId);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoriteButton(eventId);
}
```

**Add favorite button to events:**
```javascript
const favoriteBtn = document.createElement('button');
favoriteBtn.className = 'favorite-btn';
favoriteBtn.innerHTML = '⭐';
favoriteBtn.onclick = () => toggleFavorite(event.id);
eventElement.appendChild(favoriteBtn);
```

### Implementing Export to Calendar

**Add download button:**
```html
<button onclick="exportToICS()">Download Schedule</button>
```

**Generate ICS file:**
```javascript
function exportToICS() {
    let icsContent = 'BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//D4PG//Schedule//EN\n';
    
    // Get all events
    const events = getAllEvents();
    
    events.forEach(event => {
        icsContent += 'BEGIN:VEVENT\n';
        icsContent += `DTSTART:${formatDateForICS(event.startTime)}\n`;
        icsContent += `DTEND:${formatDateForICS(event.endTime)}\n`;
        icsContent += `SUMMARY:${event.title}\n`;
        icsContent += `LOCATION:${event.location}\n`;
        icsContent += `DESCRIPTION:${event.description}\n`;
        icsContent += 'END:VEVENT\n';
    });
    
    icsContent += 'END:VCALENDAR';
    
    // Download file
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'd4pg-schedule.ics';
    a.click();
}
```

### Adding Print Stylesheet

**Optimize for printing:**
```css
@media print {
    /* Hide interactive elements */
    .filter-sidebar,
    .mini-sidebar,
    .nav-breadcrumb,
    .time-tracker,
    .workshop-nav,
    .day-nav-container {
        display: none !important;
    }
    
    /* Show all days */
    .day-schedule {
        display: block !important;
        page-break-after: always;
    }
    
    /* Simplify event blocks */
    .event-block {
        page-break-inside: avoid;
        border: 1px solid #000;
        background: white !important;
    }
    
    /* Static timeline */
    .timeline::before {
        display: none;
    }
    
    .event-time {
        position: static;
        background: white;
        color: black;
    }
}
```

### Creating Custom Timeline Markers

**Add current time indicator:**
```javascript
function addCurrentTimeMarker() {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    
    // Calculate position on timeline
    const firstEventTime = 540; // 9:00 AM in minutes
    const pixelsPerMinute = 2;
    const position = (currentMinutes - firstEventTime) * pixelsPerMinute;
    
    // Create marker
    const marker = document.createElement('div');
    marker.className = 'current-time-marker';
    marker.style.top = position + 'px';
    
    document.querySelector('.timeline').appendChild(marker);
}
```

**Style the marker:**
```css
.current-time-marker {
    position: absolute;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--d4pg-coral);
    z-index: 50;
}

.current-time-marker::before {
    content: 'NOW';
    position: absolute;
    left: 10px;
    top: -20px;
    background: var(--d4pg-coral);
    color: white;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 10px;
    font-weight: bold;
}
```

---

## Performance Optimization

### Caching Strategy

The schedule uses a smart caching system:

**What's cached:**
- Schedule data for each day
- Speaker bio information
- User's filter selections (in memory)

**Cache duration:**
- Session-based (cleared on page reload)
- No localStorage persistence for schedule data

**Benefits:**
- Instant switching between days
- Reduced server requests
- Faster page interactions

### Lazy Loading Images

Speaker photos use lazy loading:
```javascript
img.loading = 'lazy';
```

This delays loading images until they're needed (when user hovers over name).

### Debounced Resize Handler

Window resize events are debounced to prevent excessive function calls:
```javascript
window.addEventListener('resize', function() {
    clearTimeout(window.resizeTimeout);
    window.resizeTimeout = setTimeout(handleMobileEmbed, 100);
});
```

### Efficient Event Filtering

Filters use data attributes for O(1) lookups:
```javascript
const eventType = event.getAttribute('data-type');
const typeMatches = activeTypeFilters.includes(eventType);
```

No need to search through all event properties.

---

## Accessibility Features

### Keyboard Navigation

**Implemented:**
- Tab through all interactive elements
- Enter/Space to activate buttons
- Arrow keys for carousel navigation
- Escape to close (when applicable)

**Workshop carousel keyboard controls:**
```javascript
carouselContainer.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevBtn.click();
    } else if (e.key === 'ArrowRight') {
        nextBtn.click();
    }
});
```

### ARIA Labels

**Carousel navigation:**
```html
<button class="workshop-nav-btn prev-btn" 
        aria-label="Previous workshop">
    ‹
</button>
```

**Speaker cards:**
```javascript
card.setAttribute('role', 'button');
card.setAttribute('aria-label', `View ${speaker.name} biography`);
```

### Screen Reader Support

Use semantic HTML:
```html
<nav>Navigation</nav>
<main>Main content</main>
<section>Section</section>
<article>Event</article>
```

Add descriptive text for icons:
```html
<button aria-label="Toggle filters">
    <i class="fa-solid fa-bars" aria-hidden="true"></i>
</button>
```

### Focus Management

Visible focus indicators:
```css
button:focus {
    outline: 2px solid var(--d4pg-coral);
    outline-offset: 2px;
}
```

### Color Contrast

All text meets WCAG AA standards:
- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum

Check contrast: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

## Browser Compatibility

**Tested and working:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 90+)

**Features requiring modern browsers:**
- CSS Grid
- CSS Custom Properties
- Intersection Observer
- Fetch API
- Arrow Functions
- Template Literals

**Fallback behavior:**
- Mobile screens (≤768px) use iframe embed
- No polyfills needed for target browsers

---

## Testing Checklist

Before deploying changes:

**Functionality:**
- [ ] All three days load correctly
- [ ] Day navigation switches properly
- [ ] Event filtering works (type and location)
- [ ] Speaker photos appear on hover
- [ ] Workshop carousels rotate
- [ ] Time tracker updates
- [ ] Sidebar opens and closes
- [ ] Mobile view displays correctly

**Data:**
- [ ] All event times are correct
- [ ] Speaker names match between files
- [ ] Locations are spelled consistently
- [ ] JSON files are valid (no syntax errors)

**Visual:**
- [ ] Timeline displays properly
- [ ] Colors match brand guidelines
- [ ] Responsive design works on all sizes
- [ ] Print view is usable

**Performance:**
- [ ] Page loads quickly
- [ ] Day switching is instant (after first load)
- [ ] No console errors
- [ ] Images load efficiently

**Accessibility:**
- [ ] Tab navigation works throughout
- [ ] Buttons have visible focus
- [ ] ARIA labels are present
- [ ] Color contrast is sufficient

---

## Resources

### JSON Validation
- [JSONLint](https://jsonlint.com) - Validate JSON syntax

### CSS Tools
- [CSS Tricks](https://css-tricks.com) - CSS reference and guides
- [Can I Use](https://caniuse.com) - Browser compatibility checker

### Color Tools
- [Coolors](https://coolors.co) - Color palette generator
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

### JavaScript
- [MDN Web Docs](https://developer.mozilla.org) - JavaScript reference
- [JavaScript.info](https://javascript.info) - Modern JavaScript tutorial

### Testing
- [BrowserStack](https://browserstack.com) - Cross-browser testing
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Performance audit

---

## Version History

**Version 2.0** (Current)
- Consolidated DOMContentLoaded listeners (6 to 1)
- Removed console.log statements (3 removed)
- Removed incomplete highlightCurrentTimeOnTimeline function
- Cleaned up CSS (removed 25 lines of unused styles)
- Removed empty media query blocks
- Better code organization

**Version 1.0**
- Initial D4PG 2025 schedule page
- Three-day schedule system
- Workshop carousel implementation
- Speaker photo modals
- Filter sidebar with mini sidebar
- Real-time event tracking
- Mobile-optimized view
- Interactive hero features

---

## Appendix: Complete Examples

### Example 1: Complete Event Entry

```json
{
  "type": "panel",
  "title": "The Future of Data Justice",
  "description": "Leading voices discuss the intersection of data rights, community ownership, and ethical AI.",
  "startTime": "14:00",
  "endTime": "15:30",
  "location": "Main Auditorium",
  "people": {
    "moderator": {
      "name": "Dr. Jane Smith",
      "title": "Professor of Data Ethics"
    },
    "panelists": [
      {"name": "John Doe"},
      {"name": "Maria Garcia"},
      {"name": "Ahmed Hassan"}
    ]
  },
  "tags": ["Data Justice", "AI Ethics", "Community"],
  "details": "This panel will explore current challenges and future directions in data justice work. Audience Q&A will follow."
}
```

### Example 2: Day Schedule File

```json
{
  "date": "2025-07-16",
  "events": [
    {
      "type": "break",
      "title": "Registration & Breakfast",
      "description": "Check in and enjoy breakfast before the conference begins.",
      "startTime": "08:00",
      "endTime": "09:00",
      "location": "Dining Hall"
    },
    {
      "type": "keynote",
      "title": "Opening Keynote",
      "description": "Welcome to D4PG 2025!",
      "startTime": "09:00",
      "endTime": "10:00",
      "location": "Main Auditorium",
      "people": {
        "speakers": [
          {"name": "Conference Director"}
        ]
      }
    },
    {
      "type": "workshop",
      "title": "Workshop A",
      "startTime": "10:30",
      "endTime": "12:00",
      "location": "Workshop Room A"
    },
    {
      "type": "workshop",
      "title": "Workshop B",
      "startTime": "10:30",
      "endTime": "12:00",
      "location": "Workshop Room B"
    }
  ]
}
```

### Example 3: Filter Sidebar HTML

```html
<div class="filter-sidebar">
    <div class="sidebar-header">
        <h3 class="sidebar-title">FILTER</h3>
    </div>
    
    <div class="active-filters">
        <div class="active-filters-title">Active filters</div>
        <div class="active-filter-pills">
            <!-- Dynamic pills appear here -->
        </div>
    </div>
    
    <div class="sidebar-filter-group">
        <h4 class="sidebar-filter-heading">Event Type</h4>
        <div class="sidebar-filter-options">
            <div class="sidebar-filter-option">
                <input type="checkbox" 
                       id="sidebar-all" 
                       class="sidebar-filter-checkbox" 
                       data-filter="all" 
                       checked>
                <label for="sidebar-all" 
                       class="sidebar-filter-label">
                    All Events
                </label>
            </div>
            <!-- More options... -->
        </div>
    </div>
</div>
```

### Example 4: Custom Event Rendering

```javascript
function createCustomEventElement(event) {
    const eventElement = document.createElement('div');
    eventElement.className = `event-block ${event.type}`;
    eventElement.setAttribute('data-type', event.type);
    eventElement.setAttribute('data-location', event.location);
    
    // Time display
    const timeDisplay = createFormattedTimeDisplay(
        event.startTime, 
        event.endTime
    );
    eventElement.appendChild(timeDisplay);
    
    // Content container
    const content = document.createElement('div');
    content.className = 'event-content';
    
    // Title
    const title = document.createElement('h3');
    title.className = 'event-title';
    title.textContent = event.title;
    content.appendChild(title);
    
    // Location
    const location = document.createElement('div');
    location.className = 'event-location';
    location.textContent = event.location;
    content.appendChild(location);
    
    // Description
    const description = document.createElement('div');
    description.className = 'event-description';
    description.innerHTML = event.description;
    content.appendChild(description);
    
    // Add custom field
    if (event.customField) {
        const custom = document.createElement('div');
        custom.className = 'event-custom';
        custom.textContent = event.customField;
        content.appendChild(custom);
    }
    
    eventElement.appendChild(content);
    return eventElement;
}
```

---

Thank you for maintaining the D4PG schedule page. Keep this README updated as you make changes to help future developers understand the system.


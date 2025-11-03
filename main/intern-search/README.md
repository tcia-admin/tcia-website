# Intern Search Page - Complete Documentation

## Table of Contents
1. [Overview](#overview)
2. [File Structure](#file-structure)
3. [CSS Architecture](#css-architecture)
   - [CSS Variables (Design Tokens)](#css-variables-design-tokens)
   - [Page Sections](#page-sections)
   - [Responsive Design](#responsive-design)
4. [JavaScript Functionality](#javascript-functionality)
   - [Data Structure](#data-structure)
   - [Core Functions](#core-functions)
   - [Event Handlers](#event-handlers)
5. [Common Modifications Guide](#common-modifications-guide)
6. [Component Details](#component-details)
7. [LocalStorage Usage](#localstorage-usage)
8. [Troubleshooting](#troubleshooting)

---

## Overview

The Intern Search page (`intern-search-page.html`) is an interactive job board for displaying and filtering internship positions. It features:
- **Hero section** with search and filter functionality
- **Dynamic position listing** from JavaScript data
- **Real-time search** by keywords
- **Filter dropdowns** for department and type
- **Detailed role view** for each position
- **Application tracking** using localStorage
- **Back button** to return to internship main page

The page is built with vanilla HTML, CSS, and JavaScript with no external dependencies.

---

## File Structure

```
intern-search/
├── intern-search-page.html    # Main HTML structure
├── css/
│   └── main.css              # All styling and responsive design
├── js/
│   └── main.js               # Position data, filtering, and interactivity
└── README.md                 # This file
```

**External Dependencies:**
- None! Pure vanilla JavaScript and CSS.

---

## CSS Architecture

### CSS Variables (Design Tokens)

All design values are stored as CSS variables in the `:root` selector (lines 2-93 in `main.css`). This makes the page easy to customize.

#### **Spacing Variables**
Control all gaps, margins, and padding:

```css
--spacing-xs: 0.25rem;    /* 4px - tiny gaps */
--spacing-sm: 0.5rem;     /* 8px - small spacing */
--spacing-md: 1rem;       /* 16px - medium spacing */
--spacing-lg: 1.5rem;     /* 24px - large spacing */
--spacing-xl: 2rem;       /* 32px - extra large */
--spacing-2xl: 3rem;      /* 48px - section padding */
--spacing-3xl: 4rem;      /* 64px - major sections */
--spacing-4xl: 5rem;      /* 80px - hero spacing */
--spacing-5xl: 6rem;      /* 96px - larger sections */
--spacing-6xl: 7rem;      /* 112px - column gaps */
--spacing-7xl: 8rem;      /* 128px - maximum spacing */
```

**Example:** To increase the gap between position columns, modify `--spacing-7xl`.

#### **Color Variables**

**TCIA Brand Colors:**
```css
--tcia-red: #ec1a3c;      /* Accent color */
--tcia-yellow: #f3b54a;   /* Interactive elements, highlights, buttons */
--tcia-green: #01752d;    /* (Available) */
--tcia-teal: #02a69e;     /* (Available) */
--tcia-navy: #061531;     /* Main background color */
--tcia-white: #f4f4f4;    /* Text color, light elements */
```

**NOTICE Brand Colors:**
```css
--notice-yellow: #fbc516; /* (Available) */
--notice-black: #1a1919;  /* (Available) */
--notice-grey: #808285;   /* (Available) */
```

#### **Typography Variables**

**Font Families:**
```css
--font-headline: "Interstate Condensed Bold"  /* Large titles */
--font-body: "Interstate Condensed Regular"   /* Body text */
--font-alt-bold: "Neuzeit Grotesk Bold"      /* Buttons, emphasis */
--font-alt-regular: "Neuzeit Grotesk Regular" /* Secondary text */
--font-notice-primary: 'Roboto'              /* NOTICE branding */
```

**Font Sizes:**
```css
--font-size-xs: 0.75rem;    /* 12px - tiny text */
--font-size-sm: 0.875rem;   /* 14px - small text */
--font-size-med: 1rem;      /* 16px - base size */
--font-size-base: 1.25rem;  /* 20px - body text */
--font-size-lg: 1.125rem;   /* 18px - list items */
--font-size-xl: 1.25rem;    /* 20px - subheadings */
--font-size-2xl: 1.5rem;    /* 24px - section subtitles */
--font-size-3xl: 2rem;      /* 32px - section headings */
--font-size-4xl: 2.5rem;    /* 40px - page titles */
--font-size-12xl: 6rem;     /* 96px - hero title */
```

---

### Page Sections

#### **1. Hero Section** (`.hero-section`)
**Location:** Lines 131-152 in `main.css`

Full-screen banner with search functionality:
```css
.hero-section {
    min-height: 80vh;                 /* 80% of viewport height */
    background: linear-gradient(...), url('...');  /* Overlay + image */
    background-size: cover;           /* Fill the container */
    background-position: center;      /* Center the image */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
```

**Contains:**
- Hero back button (top-left corner)
- Hero title ("JOIN THE TEAM")
- Search box with button
- Filter dropdowns

#### **2. Hero Back Button** (`.hero-back-button`)
**Location:** Lines 683-737 in `main.css`

Positioned button to return to main internships page:
```css
.hero-back-button {
    position: absolute;              /* Positioned relative to hero */
    top: var(--spacing-xl);
    left: var(--spacing-xl);
    background: rgba(0, 0, 0, 0.2); /* Semi-transparent */
    backdrop-filter: blur(4px);      /* Blur background behind */
    border-radius: 8px;
}
```

**Features:**
- Blur effect for readability
- Hover animation (lifts up 2px)
- Drop shadow for depth

#### **3. Search Container** (`.search-container`)
**Location:** Lines 167-218 in `main.css`

Centered search box with integrated button:
```css
.search-box {
    position: relative;               /* For absolute button positioning */
    width: 100%;
    max-width: 600px;
}

.search-input {
    width: 100%;
    height: 60px;
    background: rgba(255, 255, 255, 0.1);  /* Translucent background */
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.search-button {
    position: absolute;               /* Positioned inside input */
    right: var(--spacing-md);
    top: 50%;
    transform: translateY(-50%);      /* Vertically centered */
}
```

#### **4. Filter Dropdowns** (`.filter-dropdown`)
**Location:** Lines 219-295 in `main.css`

Custom dropdown filters for department and type:

```css
.filter-button {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    cursor: pointer;
}

.dropdown-content {
    position: absolute;
    top: 100%;                        /* Below the button */
    display: none;                    /* Hidden by default */
    opacity: 0;
    visibility: hidden;
}

.dropdown-content.show {
    display: block;                   /* Shown when active */
    opacity: 1;
    visibility: visible;
}
```

**Features:**
- Animated arrow rotation when open
- Checkboxes for multi-select
- Click outside to close

#### **5. Positions List** (`.positions-list`)
**Location:** Lines 297-356 in `main.css`

Table-like grid display of positions:

```css
.positions-header {
    display: grid;
    grid-template-columns: 2fr 1fr;   /* Title wider than department */
    gap: var(--spacing-7xl);          /* Large gap for spacing */
}

.position-row {
    display: grid;
    grid-template-columns: 2fr 1fr;   /* Match header */
    transition: background-color 0.3s ease;
}

.position-row:hover {
    background-color: rgba(255, 255, 255, 0.05);  /* Subtle highlight */
}
```

**Arrow Icon Animation:**
```css
.arrow-icon {
    opacity: 0;                       /* Hidden by default */
    transform: translateX(-10px);     /* Shifted left */
    transition: all 0.3s ease;
}

.position-row:hover .arrow-icon {
    opacity: 1;                       /* Visible on hover */
    transform: translateX(0);         /* Slides into place */
}
```

#### **6. Role Description** (`.role-description`)
**Location:** Lines 358-452 in `main.css`

Detailed view when clicking a position:

```css
.role-description {
    display: none;                    /* Hidden by default */
}
```

Shown via JavaScript by setting `display: block`.

**Sections:**
- `.role-title` - Position name
- `.role-description-text` - Job details (HTML injected)
- `.role-requirements` - Qualifications (HTML injected)
- `.application-note` - Additional instructions
- `.apply-button` - Opens application form

**Custom List Styling:**
```css
.role-description-text li::before,
.role-requirements li::before {
    content: "•";                     /* Bullet point */
    color: var(--tcia-yellow);        /* Yellow accent */
    position: absolute;
    left: -20px;
}
```

#### **7. Apply Button** (`.apply-button`)
**Location:** Lines 438-452 in `main.css`

Primary action button:
```css
.apply-button {
    background-color: var(--tcia-yellow);
    color: var(--tcia-white);
    transition: background-color 0.3s ease;
}

.apply-button:hover {
    background-color: var(--tcia-white);
    color: var(--tcia-navy);          /* Inverted colors */
}
```

**Disabled State** (when already applied):
Set via JavaScript:
```javascript
button.disabled = true;
button.style.backgroundColor = '#888';
button.style.cursor = 'not-allowed';
```

#### **8. Application Message** (`.application-message`)
**Location:** Lines 739-787 in `main.css`

Modal overlay for notifications:
```css
.application-message {
    position: fixed;                  /* Covers entire viewport */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);  /* Dark overlay */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;                    /* Above everything */
    animation: fadeIn 0.3s ease;
}
```

---

### Responsive Design

#### **Tablet (768px and below)**
**Location:** Lines 540-622 in `main.css`

Changes:
- Hero height reduced to 60vh
- Search filters stack vertically
- Filter buttons full width
- Position row gaps reduced
- Font sizes decrease

```css
@media screen and (max-width: 768px) {
    .hero-section {
        min-height: 60vh;             /* Shorter on mobile */
    }
    
    .search-filters {
        flex-direction: column;       /* Stack filters */
        width: 100%;
    }
    
    .filter-button {
        width: 100%;                  /* Full width */
        justify-content: space-between;
    }
}
```

#### **Small Mobile (480px and below)**
**Location:** Lines 624-668 in `main.css`

Additional changes:
- Position columns adjust to 1.5fr 1fr
- Arrow icons hidden
- Search input height reduced
- Role section spacing decreased

---

## JavaScript Functionality

### Data Structure

#### **Filter Options** (Lines 3-12)
Defines available filter choices:
```javascript
const filterOptions = {
    department: [
        { value: 'tcia', label: 'TCIA' },
        { value: 'notice coalition', label: 'NOTICE COALITION' }
    ],
    type: [
        { value: 'intern', label: 'Intern' },
        { value: 'regular', label: 'Regular' }
    ]
};
```

**How to add new options:**
```javascript
department: [
    { value: 'new-dept', label: 'New Department' },
    // ... existing options
]
```

#### **Positions Array** (Lines 14-202)
Contains all job positions:
```javascript
const positions = [
    {
        id: 1,                        // Unique identifier
        title: "Position Title",      // Display name
        department: "TCIA",           // Filter category
        type: "intern",               // Filter category
        description: `<p>HTML content...</p>`,  // Job details
        requirements: `<ul>...</ul>`, // Qualifications
        applicationNote: `<p>...</p>`, // Instructions
        url: "/positions/slug"        // Future use
    },
    // ... more positions
];
```

**Properties explained:**
- `id`: Used for tracking applications in localStorage
- `title`: Shown in position list and detail view
- `department`: Must match filter value (case-insensitive)
- `type`: Must match filter value
- `description`: HTML string (supports p, ul, li tags)
- `requirements`: HTML string (can be empty)
- `applicationNote`: Shown below requirements
- `url`: Reserved for future direct links

#### **Active Filters** (Lines 204-208)
Tracks currently selected filters:
```javascript
const activeFilters = {
    department: new Set(),    // Empty = show all
    type: new Set()          // Empty = show all
};
```

Uses JavaScript `Set` for efficient add/remove operations.

---

### Core Functions

#### **1. filterPositions()** (Lines 210-226)
Filters positions based on search term and active filters:

```javascript
function filterPositions(searchTerm = '') {
    return positions.filter(position => {
        // Search in title or department
        const matchesSearch = 
            position.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            position.department.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Check department filters
        const matchesDepartment = 
            activeFilters.department.size === 0 ||  // No filters = match all
            activeFilters.department.has(position.department.toLowerCase());
        
        // Check type filters
        const matchesType = 
            activeFilters.type.size === 0 ||
            activeFilters.type.has(position.type);
        
        // Must match ALL conditions
        return matchesSearch && matchesDepartment && matchesType;
    });
}
```

**Logic:**
- Empty filters = show everything
- All conditions must be true (AND logic)
- Department filters use OR logic (any selected department matches)
- Case-insensitive search

#### **2. renderPositions()** (Lines 228-250)
Displays positions in the list:

```javascript
function renderPositions(positionsToRender = positions) {
    const container = document.getElementById('positions-container');
    container.innerHTML = '';  // Clear existing
    
    positionsToRender.forEach(position => {
        const positionElement = document.createElement('a');
        positionElement.href = 'javascript:void(0)';  // Prevent navigation
        positionElement.className = 'position-row';
        positionElement.innerHTML = `
            <div class="position-cell position-title">${position.title}</div>
            <div class="position-cell">
                ${position.department}
                <svg class="arrow-icon">...</svg>
            </div>
        `;
        
        // Add click handler
        positionElement.addEventListener('click', () => showRoleDescription(position));
        
        container.appendChild(positionElement);
    });
}
```

**Key points:**
- Creates `<a>` elements (for accessibility)
- Uses `javascript:void(0)` to prevent page reload
- Attaches click handler to each position
- SVG arrow icon included in HTML

#### **3. showRoleDescription()** (Lines 460-546)
Shows detailed view of a position:

```javascript
function showRoleDescription(position) {
    const positionsList = document.querySelector('.positions-list');
    const roleDescription = document.querySelector('.role-description');
    
    // Update title
    roleDescription.querySelector('.role-title').textContent = position.title;
    
    // Update description (with HTML)
    const descriptionText = roleDescription.querySelector('.role-description-text');
    if (position.description && position.description.trim()) {
        descriptionText.innerHTML = position.description;
        descriptionText.closest('.role-section').style.display = 'block';
    } else {
        descriptionText.closest('.role-section').style.display = 'none';
    }
    
    // Update requirements (similar logic)
    // ... requirements code ...
    
    // Check if user already applied
    const appliedPositions = JSON.parse(localStorage.getItem('appliedPositions') || '[]');
    const applyButton = roleDescription.querySelector('.apply-button');
    
    if (appliedPositions.includes(position.id)) {
        // Disable button
        applyButton.disabled = true;
        applyButton.textContent = 'Application Submitted';
        applyButton.style.backgroundColor = '#888';
        applyButton.style.cursor = 'not-allowed';
        
        // Show note
        const noteElement = document.createElement('div');
        noteElement.className = 'application-submitted-note';
        noteElement.innerHTML = '<p>You have already submitted an application.</p>';
        applyButton.insertAdjacentElement('afterend', noteElement);
    } else {
        // Reset button
        applyButton.disabled = false;
        applyButton.textContent = 'Apply Now';
    }
    
    // Hide list, show details
    positionsList.style.display = 'none';
    roleDescription.style.display = 'block';
}
```

**Features:**
- Dynamically updates content
- Hides empty sections
- Checks localStorage for previous applications
- Disables button if already applied
- Toggles visibility between list and detail

#### **4. closeAllDropdowns()** (Lines 450-457)
Closes all filter dropdowns:

```javascript
function closeAllDropdowns() {
    document.querySelectorAll('.dropdown-content').forEach(dropdown => {
        dropdown.classList.remove('show');
    });
    document.querySelectorAll('.filter-button').forEach(button => {
        button.classList.remove('active');
    });
}
```

**Used when:**
- Clicking outside dropdowns
- Opening a different dropdown

#### **5. showApplicationMessage()** (Lines 416-447)
Displays notification overlay:

```javascript
function showApplicationMessage(message) {
    // Remove existing message
    const existingMessage = document.querySelector('.application-message');
    if (existingMessage) existingMessage.remove();
    
    // Create new message
    const messageElement = document.createElement('div');
    messageElement.className = 'application-message';
    messageElement.innerHTML = `
        <div class="message-content">
            <button class="message-close">&times;</button>
            <p>${message}</p>
        </div>
    `;
    
    document.body.appendChild(messageElement);
    
    // Close button handler
    messageElement.querySelector('.message-close').addEventListener('click', () => {
        messageElement.remove();
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(messageElement)) {
            messageElement.remove();
        }
    }, 5000);
}
```

---

### Event Handlers

#### **1. Populate Dropdowns** (Lines 254-272)
Runs on page load to create filter options:

```javascript
function populateDropdowns() {
    Object.keys(filterOptions).forEach(filterType => {
        const dropdown = document.getElementById(`${filterType}-dropdown`);
        const options = filterOptions[filterType];
        
        options.forEach(option => {
            const label = document.createElement('label');
            label.className = 'dropdown-item';
            label.innerHTML = `
                <input type="checkbox" name="${filterType}" value="${option.value}">
                <span>${option.label}</span>
            `;
            dropdown.appendChild(label);
        });
    });
}
```

**Generates:**
```html
<label class="dropdown-item">
    <input type="checkbox" name="department" value="tcia">
    <span>TCIA</span>
</label>
```

#### **2. Checkbox Change Handler** (Lines 278-296)
Handles filter checkbox changes:

```javascript
document.addEventListener('change', function(event) {
    if (event.target.matches('.dropdown-item input[type="checkbox"]')) {
        const filterType = event.target.name;     // 'department' or 'type'
        const filterValue = event.target.value;   // e.g., 'tcia'
        
        if (event.target.checked) {
            activeFilters[filterType].add(filterValue);    // Add to Set
        } else {
            activeFilters[filterType].delete(filterValue); // Remove from Set
        }
        
        // Refilter and render
        const searchTerm = document.querySelector('.search-input')?.value || '';
        const filteredPositions = filterPositions(searchTerm);
        renderPositions(filteredPositions);
    }
});
```

#### **3. Search Input Handler** (Lines 299-306)
Real-time search as user types:

```javascript
const searchInput = document.querySelector('.search-input');
searchInput.addEventListener('input', function(e) {
    const searchTerm = e.target.value;
    const filteredPositions = filterPositions(searchTerm);
    renderPositions(filteredPositions);
});
```

#### **4. Click Outside to Close** (Lines 309-313)
Closes dropdowns when clicking elsewhere:

```javascript
document.addEventListener('click', function(event) {
    if (!event.target.closest('.filter-dropdown')) {
        closeAllDropdowns();
    }
});
```

**Logic:**
- `closest()` checks if click is inside a filter dropdown
- If not, close all dropdowns

#### **5. Filter Button Toggle** (Lines 316-330)
Opens/closes dropdowns:

```javascript
filterButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        event.stopPropagation();  // Don't trigger document click
        
        const dropdown = this.parentElement.querySelector('.dropdown-content');
        const isOpen = dropdown.classList.contains('show');
        
        closeAllDropdowns();  // Close all first
        
        if (!isOpen) {
            dropdown.classList.add('show');
            this.classList.add('active');  // Rotates arrow
        }
    });
});
```

#### **6. Apply Button Handler** (Lines 333-348)
Shows application form (assumes Squarespace form):

```javascript
document.querySelector('.apply-button').addEventListener('click', () => {
    const formWrapper = document.querySelector('.form-wrapper');
    const mainSection = document.querySelector('.intern-search-main');
    
    // Move form to bottom
    mainSection.appendChild(formWrapper);
    
    // Show form
    formWrapper.classList.add('show');
    
    // Scroll to form
    formWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Add padding
    mainSection.style.paddingBottom = '4rem';
});
```

**Note:** Assumes a `.form-wrapper` element exists (injected by Squarespace or manually added).

#### **7. Back Button Handler** (Lines 351-364)
Returns to position list:

```javascript
document.querySelector('.back-button').addEventListener('click', () => {
    const positionsList = document.querySelector('.positions-list');
    const roleDescription = document.querySelector('.role-description');
    const formWrapper = document.querySelector('.form-wrapper');
    const mainSection = document.querySelector('.intern-search-main');
    
    // Show list, hide details and form
    positionsList.style.display = 'block';
    roleDescription.style.display = 'none';
    formWrapper.classList.remove('show');
    
    // Reset padding
    mainSection.style.paddingBottom = 'var(--spacing-4xl)';
});
```

#### **8. Form Submit Prevention** (Lines 367-413)
Prevents duplicate applications:

```javascript
document.addEventListener('click', function(event) {
    const submitButton = event.target.closest('.form-submit-button');
    if (submitButton) {
        // Get current position
        const currentPositionTitle = document.querySelector('.role-title').textContent;
        const currentPosition = positions.find(p => p.title === currentPositionTitle);
        
        if (!currentPosition) return;
        
        // Check if already applied
        const appliedPositions = JSON.parse(localStorage.getItem('appliedPositions') || '[]');
        
        if (appliedPositions.includes(currentPosition.id)) {
            // Prevent submission
            event.preventDefault();
            event.stopPropagation();
            
            showApplicationMessage('You have already applied for this position.');
        } else {
            // Allow submission and record it
            const form = submitButton.closest('form');
            form.addEventListener('submit', function() {
                appliedPositions.push(currentPosition.id);
                localStorage.setItem('appliedPositions', JSON.stringify(appliedPositions));
                
                // Hide form after 5 seconds
                setTimeout(function() {
                    const mainSection = document.querySelector('.intern-search-main');
                    const formWrapper = document.querySelector('.form-wrapper');
                    
                    if (mainSection && formWrapper) {
                        mainSection.style.paddingBottom = 'var(--spacing-4xl)';
                        formWrapper.classList.remove('show');
                    }
                }, 5000);
            });
        }
    }
});
```

---

## Common Modifications Guide

### **Add a New Position**

Add to the `positions` array in `main.js`:

```javascript
{
    id: 6,  // Increment the highest ID
    title: "UX/UI Design Intern",
    department: "TCIA",
    type: "intern",
    description: `
        <p>Job description paragraph 1.</p>
        <p>Job description paragraph 2.</p>
        <ul>
            <li>Responsibility 1</li>
            <li>Responsibility 2</li>
        </ul>
    `,
    requirements: `
        <ul>
            <li>Requirement 1</li>
            <li>Requirement 2</li>
        </ul>
    `,
    applicationNote: `<p>Please attach portfolio when applying.</p>`,
    url: "/positions/ux-ui-intern"
}
```

**Tips:**
- Use backticks (\`) for multi-line strings
- HTML is allowed in description/requirements
- Keep `id` unique for localStorage tracking
- `department` and `type` must match filter values

### **Add a New Filter Category**

**Step 1:** Add to `filterOptions` (line 3):
```javascript
const filterOptions = {
    department: [...],
    type: [...],
    location: [  // New filter
        { value: 'remote', label: 'Remote' },
        { value: 'onsite', label: 'On-Site' },
        { value: 'hybrid', label: 'Hybrid' }
    ]
};
```

**Step 2:** Add to HTML (after line 44):
```html
<div class="filter-dropdown">
    <button class="filter-button" id="location-filter">
        Location
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="2"/>
        </svg>
    </button>
    <div class="dropdown-content" id="location-dropdown"></div>
</div>
```

**Step 3:** Add to `activeFilters` (line 205):
```javascript
const activeFilters = {
    department: new Set(),
    type: new Set(),
    location: new Set()  // New filter
};
```

**Step 4:** Update `filterPositions()` (line 210):
```javascript
const matchesLocation = activeFilters.location.size === 0 ||
                       activeFilters.location.has(position.location);

return matchesSearch && matchesDepartment && matchesType && matchesLocation;
```

**Step 5:** Add `location` property to all positions.

### **Change Search Behavior**

To search in more fields:

```javascript
function filterPositions(searchTerm = '') {
    return positions.filter(position => {
        const matchesSearch = 
            position.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            position.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
            position.description.toLowerCase().includes(searchTerm.toLowerCase());  // Added
        // ... rest of function
    });
}
```

### **Change Hero Background**

```css
/* In main.css, line 148 */
.hero-section {
    background: linear-gradient(rgba(6, 21, 49, 0.3), rgba(6, 21, 49, 0.3)),
                url('YOUR_NEW_IMAGE_URL');
}
```

### **Change Application Tracking Duration**

Currently, applications are tracked forever in localStorage. To clear after a time period:

```javascript
// In showRoleDescription(), replace localStorage check with:
const appliedPositions = JSON.parse(localStorage.getItem('appliedPositions') || '{}');
const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);

if (appliedPositions[position.id] && appliedPositions[position.id] > thirtyDaysAgo) {
    // Already applied within 30 days
}

// When recording application:
appliedPositions[position.id] = Date.now();  // Store timestamp
localStorage.setItem('appliedPositions', JSON.stringify(appliedPositions));
```

### **Change Column Widths**

```css
/* In main.css, lines 304 and 321 */
.positions-header,
.position-row {
    grid-template-columns: 3fr 1fr;  /* Make title even wider */
}
```

### **Customize Apply Button Colors**

```css
/* In main.css, line 438 */
.apply-button {
    background-color: var(--tcia-red);     /* Changed from yellow */
    color: var(--tcia-white);
}

.apply-button:hover {
    background-color: var(--tcia-yellow);  /* Swap colors */
    color: var(--tcia-navy);
}
```

### **Change Auto-Close Timing for Messages**

```javascript
/* In showApplicationMessage(), line 442 */
setTimeout(() => {
    if (document.body.contains(messageElement)) {
        messageElement.remove();
    }
}, 10000);  // Changed from 5000ms to 10000ms (10 seconds)
```

---

## Component Details

### **Filter Dropdown Mechanics**

The filter dropdown uses pure CSS for show/hide:

```css
.dropdown-content {
    display: none;           /* Hidden */
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease, visibility 0.2s ease;
}

.dropdown-content.show {
    display: block;          /* Shown when class added */
    opacity: 1;
    visibility: visible;
}
```

JavaScript toggles the `.show` class.

### **Checkbox Styling**

Modern checkbox with accent color:

```css
.dropdown-item input[type="checkbox"] {
    margin-right: var(--spacing-sm);
    accent-color: var(--tcia-yellow);  /* Modern CSS property */
}
```

**Browser support:** Chrome 93+, Firefox 92+, Safari 15.4+

For older browsers, consider custom checkbox styling.

### **Search Input Placeholder**

Translucent placeholder text:

```css
.search-input::placeholder {
    color: rgba(255, 255, 255, 0.6);  /* 60% opacity white */
}
```

### **Backdrop Blur Effect**

The hero back button uses backdrop filter:

```css
.hero-back-button {
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);  /* Safari prefix */
}
```

**Browser support:** Chrome 76+, Firefox 103+, Safari 9+

Degrades gracefully without blur on unsupported browsers.

### **Grid vs Flexbox**

**Grid used for:**
- Position list (consistent columns)
- Fixed header alignment

**Flexbox used for:**
- Search filters (wrapping)
- Hero content (centering)
- Buttons (alignment)

### **Smooth Scrolling**

Applied globally:

```css
html {
    scroll-behavior: smooth;
}
```

Works with:
- `scrollIntoView({ behavior: 'smooth' })`
- Anchor link navigation

---

## LocalStorage Usage

### **Data Structure**

```javascript
// Stored as JSON array
localStorage.setItem('appliedPositions', JSON.stringify([1, 3, 5]));

// Retrieved and parsed
const appliedPositions = JSON.parse(localStorage.getItem('appliedPositions') || '[]');
```

### **When Data is Saved**

Application IDs are added to localStorage:
1. When form is successfully submitted
2. After form validation passes
3. Before form sends to server

### **When Data is Checked**

Position IDs are checked:
1. When opening a role description
2. Before allowing form submission

### **Clearing Application History**

**For testing:**
```javascript
// In browser console
localStorage.removeItem('appliedPositions');
```

**For users:**
Create a "Clear Application History" button:

```html
<button onclick="localStorage.removeItem('appliedPositions'); location.reload();">
    Clear Application History
</button>
```

### **Privacy Considerations**

- **Data stored:** Position IDs only (no personal information)
- **Persistence:** Remains until browser data cleared
- **Cross-device:** Does NOT sync across devices
- **Incognito:** Cleared when incognito window closed

---

## Troubleshooting

### **Positions Not Showing**

**Symptoms:** Empty position list

**Fixes:**
1. Check browser console for JavaScript errors
2. Verify `positions-container` ID exists in HTML:
   ```html
   <div id="positions-container"></div>
   ```
3. Ensure JavaScript is loaded (check Network tab)
4. Confirm `renderPositions()` is called on page load

### **Filters Not Working**

**Symptoms:** Checking filters doesn't update list

**Fixes:**
1. Verify filter values match position properties:
   ```javascript
   // In filterOptions
   { value: 'tcia', label: 'TCIA' }
   
   // In position
   department: "TCIA"  // Case-insensitive match
   ```
2. Check that dropdown IDs match:
   ```html
   <div id="department-dropdown"></div>  <!-- Must match -->
   ```
   ```javascript
   document.getElementById(`${filterType}-dropdown`)
   ```
3. Ensure checkboxes have correct `name` attribute

### **Search Not Working**

**Symptoms:** Typing doesn't filter positions

**Fixes:**
1. Check that search input has correct class:
   ```html
   <input class="search-input">
   ```
2. Verify event listener is attached:
   ```javascript
   const searchInput = document.querySelector('.search-input');
   if (searchInput) { /* ... */ }
   ```
3. Test search function in console:
   ```javascript
   console.log(filterPositions('web'));
   ```

### **Application Tracking Not Working**

**Symptoms:** Can apply multiple times to same position

**Fixes:**
1. Check browser supports localStorage:
   ```javascript
   if (typeof(Storage) !== "undefined") {
       // Supported
   }
   ```
2. Verify localStorage isn't disabled (some browsers/privacy modes)
3. Check position IDs are unique
4. Inspect localStorage in DevTools (Application → Local Storage)

### **Dropdown Won't Close**

**Symptoms:** Dropdown stays open when clicking outside

**Fixes:**
1. Ensure click listener is on `document`:
   ```javascript
   document.addEventListener('click', function(event) { ... });
   ```
2. Check `closest()` is working (not supported in IE):
   ```javascript
   if (!event.target.closest('.filter-dropdown')) { ... }
   ```
3. Verify `closeAllDropdowns()` removes `.show` class

### **Mobile Layout Issues**

**Symptoms:** Elements overlap or don't fit on mobile

**Fixes:**
1. Add viewport meta tag (if not in parent template):
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   ```
2. Test at specific breakpoints (768px, 480px)
3. Check that media queries are at the end of CSS file
4. Verify no `!important` overriding mobile styles

### **Back Button Not Working**

**Symptoms:** Clicking back button does nothing

**Fixes:**
1. Check back button class matches:
   ```html
   <button class="back-button">
   ```
2. Verify event listener is attached after DOM loads
3. Ensure `.positions-list` and `.role-description` exist
4. Check JavaScript console for errors

### **HTML Not Rendering in Descriptions**

**Symptoms:** Tags show as plain text

**Fixes:**
1. Use `innerHTML` not `textContent`:
   ```javascript
   element.innerHTML = position.description;  // ✓
   element.textContent = position.description;  // ✗
   ```
2. Check for HTML escaping in position data
3. Verify no CSP (Content Security Policy) blocking

### **Styles Not Applying**

**Symptoms:** Elements don't look right

**Fixes:**
1. Check CSS file is loaded (Network tab)
2. Verify class names match exactly (case-sensitive)
3. Inspect element to see computed styles
4. Check for CSS specificity issues
5. Look for typos in class names

### **Form Not Showing**

**Symptoms:** Apply button doesn't open form

**Fixes:**
1. Check that `.form-wrapper` element exists:
   ```javascript
   const formWrapper = document.querySelector('.form-wrapper');
   console.log(formWrapper);  // Should not be null
   ```
2. Verify form is injected by Squarespace
3. Check CSS for form wrapper:
   ```css
   .form-wrapper.show {
       display: block;
       opacity: 1;
   }
   ```

---

## Advanced Features

### **Keyboard Navigation**

Consider adding keyboard support for accessibility:

```javascript
// Close dropdown on Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeAllDropdowns();
    }
});

// Navigate positions with arrow keys
document.addEventListener('keydown', function(event) {
    const positions = document.querySelectorAll('.position-row');
    const activeIndex = Array.from(positions).findIndex(p => 
        p === document.activeElement
    );
    
    if (event.key === 'ArrowDown' && activeIndex < positions.length - 1) {
        positions[activeIndex + 1].focus();
        event.preventDefault();
    } else if (event.key === 'ArrowUp' && activeIndex > 0) {
        positions[activeIndex - 1].focus();
        event.preventDefault();
    }
});
```

### **Loading States**

Add loading indicator while positions load:

```javascript
function renderPositions(positionsToRender = positions) {
    const container = document.getElementById('positions-container');
    
    // Show loading
    container.innerHTML = '<div class="loading">Loading positions...</div>';
    
    // Simulate async load
    setTimeout(() => {
        container.innerHTML = '';
        // ... render positions
    }, 100);
}
```

### **Empty State**

Show message when no positions match:

```javascript
function renderPositions(positionsToRender = positions) {
    const container = document.getElementById('positions-container');
    container.innerHTML = '';
    
    if (positionsToRender.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>No positions found matching your criteria.</p>
                <button onclick="location.reload()">Reset Filters</button>
            </div>
        `;
        return;
    }
    
    // ... render positions
}
```

### **URL Parameters**

Auto-select filter from URL:

```javascript
// On page load
const urlParams = new URLSearchParams(window.location.search);
const dept = urlParams.get('department');

if (dept) {
    // Check the checkbox
    const checkbox = document.querySelector(`input[value="${dept}"]`);
    if (checkbox) {
        checkbox.checked = true;
        activeFilters.department.add(dept);
        
        // Filter positions
        const filtered = filterPositions('');
        renderPositions(filtered);
    }
}
```

**Usage:** `intern-search-page.html?department=tcia`

---

## Performance Tips

### **Avoid Re-renders**

Cache DOM queries:

```javascript
// At top of file
const positionsContainer = document.getElementById('positions-container');
const searchInput = document.querySelector('.search-input');

// Reuse throughout
function renderPositions() {
    positionsContainer.innerHTML = '';  // Faster than re-querying
}
```

### **Debounce Search**

Delay filtering until user stops typing:

```javascript
let searchTimeout;
searchInput.addEventListener('input', function(e) {
    clearTimeout(searchTimeout);
    
    searchTimeout = setTimeout(() => {
        const searchTerm = e.target.value;
        const filteredPositions = filterPositions(searchTerm);
        renderPositions(filteredPositions);
    }, 300);  // Wait 300ms after last keystroke
});
```

### **Lazy Load Positions**

Only render visible positions:

```javascript
let currentPage = 0;
const POSITIONS_PER_PAGE = 10;

function renderPositionsPage(positionsToRender) {
    const start = currentPage * POSITIONS_PER_PAGE;
    const end = start + POSITIONS_PER_PAGE;
    const pagePositions = positionsToRender.slice(start, end);
    
    // Render pagePositions
    // Add "Load More" button if more exist
}
```

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
- `closest()` method (IE11 - use polyfill)
- `Set` data structure (IE11 - use array instead)
- `accent-color` CSS (older browsers - custom checkbox needed)
- `backdrop-filter` (older browsers - degrades gracefully)

---

## Quick Reference: Key Classes

### **Layout**
- `.intern-search-main` - Main wrapper
- `.hero-section` - Top banner
- `.hero-content` - Centered hero content
- `.positions-list` - Position table section
- `.role-description` - Detail view section

### **Search & Filters**
- `.search-container` - Search box wrapper
- `.search-input` - Text input field
- `.search-button` - Search icon button
- `.filter-dropdown` - Filter container
- `.filter-button` - Filter trigger
- `.dropdown-content` - Filter menu
- `.dropdown-item` - Filter option

### **Positions**
- `.positions-header` - Table header
- `.header-cell` - Header column
- `.position-row` - Position item (clickable)
- `.position-cell` - Position column
- `.position-title` - Position name
- `.arrow-icon` - Hover arrow

### **Role Detail**
- `.role-container` - Detail wrapper
- `.back-button` - Return to list
- `.role-title` - Position name
- `.role-section` - Content section
- `.role-description-text` - Job details
- `.role-requirements` - Qualifications
- `.apply-button` - Application CTA
- `.application-note` - Additional info

### **State Classes** (Added by JavaScript)
- `.show` - Visible dropdown
- `.active` - Active filter button

---

## Glossary

**Accordion:** UI pattern where one item expands while others collapse

**Backdrop Filter:** CSS effect that blurs/modifies content behind an element

**Debounce:** Delay execution until user stops an action (e.g., typing)

**LocalStorage:** Browser storage that persists between sessions

**Set:** JavaScript data structure for unique values with fast add/remove

**Template Literals:** JavaScript strings with backticks allowing multi-line and variables

**Event Delegation:** Attaching listeners to parent instead of each child

**Grid:** CSS layout system for two-dimensional layouts

**Flexbox:** CSS layout system for one-dimensional layouts

**CSS Variables:** Custom properties reusable throughout CSS

**Smooth Scrolling:** Animated scroll instead of instant jump

---

**Last Updated:** November 2025
**Version:** 1.0


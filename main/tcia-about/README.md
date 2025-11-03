# TCIA About Page - Complete Documentation

## Table of Contents
1. [Overview](#overview)
2. [File Structure](#file-structure)
3. [Page Sections](#page-sections)
4. [CSS Architecture](#css-architecture)
5. [JavaScript Functionality](#javascript-functionality)
6. [Common Modifications](#common-modifications)
7. [Adding/Removing Team Members](#addingremoving-team-members)
8. [Troubleshooting](#troubleshooting)

---

## Overview

The TCIA About Page is an interactive team showcase featuring:
- **Animated star background** using HTML5 Canvas
- **Organizational pillars** in circular arrangement
- **Team member cards** with flip animation
- **Detailed member popup** with full bio
- **Mobile responsive** with horizontal scrolling
- **Performance optimized** with lazy loading

**Dependencies:**
- Three.js (r128) - 3D graphics library
- GSAP (3.9.1) - Animation library

---

## File Structure

```
tcia-about/
├── about.html              # Main HTML structure
├── css/
│   └── main.css           # All styling (585 lines)
└── js/
    └── tcia-about-new.js  # Interactive functionality (500+ lines)
```

---

## Page Sections

### 1. **Title Section** (`#main-title`)
Large centered page title.

**To change:**
Edit in JavaScript data (line 157 in `tcia-about-new.js`):
```javascript
mainTitle: "TWIN CITIES INNOVATION ALLIANCE"
```

### 2. **Who We Are** (`#who-we-are-container`)
Description of the organization.

**To change:**
Edit in JavaScript data (lines 158-160):
```javascript
whoWeAreTitle: "WHO WE ARE",
whoWeAreStatement: "First paragraph...",
whoWeAreStatement2: "Second paragraph..."
```

### 3. **Mission** (`#mission-container`)
Organization mission statement.

**To change:**
Edit in JavaScript data (lines 161-162):
```javascript
missionTitle: "MISSION",
missionStatement: "Your mission text here..."
```

### 4. **Quote** (`#org-quote`)
Inspirational quote with attribution.

**To change:**
Edit in JavaScript data (lines 163-164):
```javascript
orgQuoteText: "Quote text here",
orgQuoteAuthor: "- Author Name"
```

### 5. **Organizational Pillars** (`#org-pillars`)
Circular arrangement of core values (hidden on mobile).

**To change:**
Edit `pillars` array (lines 171-176 in `tcia-about-new.js`):
```javascript
pillars: [
    "Community",
    "Innovation", 
    "Equity",
    "Excellence"
]
```

**Add more pillars:**
Simply add to array - positioning auto-calculates.

### 6. **Team Members** (`#team-members`)
Interactive cards with flip animation.

See [Adding/Removing Team Members](#addingremoving-team-members) section.

---

## CSS Architecture

### Color Scheme
```css
:root {
    --text-color: #ffffff;           /* White text */
    --bg-color: #000000;             /* Black background */
    --card-bg: rgba(255, 255, 255, 0.1);  /* Translucent cards */
    --primary-color: #00ffff;        /* Cyan accent */
}
```

**To change colors:**
Edit `:root` variables in `main.css` (lines 2-15).

### Card Dimensions
```css
--card-width: 250px;    /* Team card width */
--card-height: 350px;   /* Team card height */
```

### Layout Structure

**Desktop:**
- Cards positioned absolutely with JavaScript
- Cards scattered across viewport
- Flip on hover

**Mobile (< 768px):**
- Horizontal scrolling
- Cards in a row
- Swipe to view

---

## JavaScript Functionality

### Key Objects

#### **pageContent** (Line 154)
All text content for the page:
```javascript
const pageContent = {
    mainTitle: "Page Title",
    whoWeAreTitle: "Section Title",
    // ... etc
}
```

#### **pillars** (Line 171)
Array of organizational values:
```javascript
const pillars = ["Value 1", "Value 2", "Value 3"];
```

#### **teamMembers** (Line 179)
Array of team member objects:
```javascript
const teamMembers = [
    {
        name: "John Doe",
        codename: "The Architect",
        role: "CEO",
        specialty: "Leadership",
        image: "https://...",
        bio: "Full biography...",
        isBoardMember: true  // Optional: adds gold border
    }
]
```

### Core Functions

#### **setupStarBackground()** (Line 8)
Creates animated starfield canvas.

**Performance:**
- Throttled to 30 FPS
- Disabled on mobile
- Fades out when scrolling past section

#### **createPillars()** (Line 488)
Generates circular pillar arrangement.

**Math:**
- 360° divided by number of pillars
- Positioned around circle center
- Each pillar 200px wide

#### **populateTeamMembers()** (Line 217)
Generates team member cards dynamically.

**Process:**
1. Creates card HTML structure
2. Positions cards (desktop only)
3. Adds flip animation
4. Attaches click handler for popup

#### **showMemberPopup()** (Line 287)
Opens detailed member view.

**Features:**
- Full-screen overlay
- Side-by-side layout (desktop)
- Drop cap in bio text
- Close on background click or X button

---

## Common Modifications

### Change Page Title

**Location:** `js/tcia-about-new.js` line 157

```javascript
const pageContent = {
    mainTitle: "YOUR NEW TITLE"
}
```

### Update Mission Statement

**Location:** `js/tcia-about-new.js` line 162

```javascript
missionStatement: "Your new mission statement here..."
```

### Change Colors

**Background color:**
```css
/* main.css line 4 */
--bg-color: #1a1a2e;  /* Dark blue instead of black */
```

**Accent color:**
```css
/* main.css line 11 */
--primary-color: #ff6b6b;  /* Red instead of cyan */
```

### Adjust Card Size

```css
/* main.css lines 13-14 */
--card-width: 300px;   /* Wider cards */
--card-height: 400px;  /* Taller cards */
```

### Hide Organizational Pillars

Already hidden on mobile. To hide on desktop:

```css
/* main.css line 99 */
#org-pillars {
    display: none;  /* Add this line */
}
```

### Change Star Background

**Disable completely:**
```css
/* main.css line 28 */
#star-background {
    display: none;
}
```

**Adjust star count:**
```javascript
/* tcia-about-new.js line 84 */
const starCount = Math.min(window.innerWidth * window.innerHeight / 3000, 300);
// Change 300 to your preferred maximum
```

---

## Adding/Removing Team Members

### Add a Team Member

**Step 1:** Add to `teamMembers` array in `tcia-about-new.js` (after line 179):

```javascript
{
    name: "Jane Smith",
    codename: "The Innovator",
    role: "CTO",
    specialty: "Technology",
    image: "https://example.com/jane.jpg",
    bio: "<p>Jane's biography paragraph 1.</p><p>Paragraph 2.</p>",
    isBoardMember: false  // true = gold border
}
```

**Field Guide:**
- `name`: Real name (appears on card front)
- `codename`: Nickname/title (shown on card front)
- `role`: Job title (shown on card front)
- `specialty`: Area of expertise (shown in popup)
- `image`: Full URL to photo (square images work best)
- `bio`: HTML formatted biography (use `<p>` tags)
- `isBoardMember`: `true` for gold border, `false` for regular

**Step 2:** Save file. Changes appear on page reload.

### Remove a Team Member

Delete the entire object from the `teamMembers` array:

```javascript
const teamMembers = [
    // DELETE THIS ENTIRE BLOCK:
    {
        name: "Person to Remove",
        // ... all their data
    },
    // Keep other members
]
```

### Reorder Team Members

Change order in array - first member appears first on page:

```javascript
const teamMembers = [
    { name: "First Person" },   // Shows first
    { name: "Second Person" },  // Shows second
    { name: "Third Person" }    // Shows third
]
```

### Update Team Member Info

Find the member in array and edit their values:

```javascript
{
    name: "John Doe",
    role: "NEW ROLE HERE",  // Change this
    bio: "<p>Updated bio here</p>"  // Change this
}
```

---

## Troubleshooting

### Team Members Not Showing

**Check:**
1. JavaScript loaded?
   - Open browser console (F12)
   - Look for errors

2. Image URLs working?
   - Right-click card → Inspect
   - Check image src

3. Array syntax correct?
   - Missing comma between objects?
   - All quotes closed?

**Test:**
```javascript
console.log(teamMembers.length);  // Should show number of members
```

### Star Background Not Animating

**Check:**
1. Canvas element exists?
   ```html
   <canvas id="star-background"></canvas>
   ```

2. On mobile device?
   - Star background disabled on mobile by default

3. Browser supports canvas?
   - Modern browsers (Chrome, Firefox, Safari) required

### Card Images Not Loading

**Common issues:**
- Wrong URL
- Image blocked by CORS
- Slow internet connection

**Fix:**
Use direct image URLs (not requiring authentication):
```javascript
image: "https://images.unsplash.com/photo-..."  // Good
image: "/protected/image.jpg"  // May not work
```

### Popup Not Opening

**Check:**
1. Click handler attached?
2. Popup element exists in HTML?
3. JavaScript errors in console?

**Debug:**
```javascript
// Add to tcia-about-new.js after line 287
console.log('Popup opened for:', member.name);
```

### Mobile Scroll Not Working

**Check:**
1. On actual mobile device (not just narrow browser)?
2. Touch events enabled?
3. Cards positioned correctly?

**CSS fix:**
```css
/* Ensure horizontal scroll */
#team-members {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
}
```

### Cards Overlapping (Desktop)

Cards are positioned randomly. If they overlap too much:

**Adjust spacing in JavaScript** (line 231):
```javascript
const x = Math.random() * (containerWidth - cardWidth - 100);
// Increase 100 to 200 for more spacing
```

### Pillars Not Appearing

**Check:**
1. Not on mobile? (Hidden by default on small screens)
2. Array has items?
3. Container exists?

**Debug:**
```javascript
console.log('Pillar count:', pillars.length);
```

---

## Performance Tips

### Optimize Images

**Recommended:**
- Format: JPEG or WebP
- Size: 500x500px (max)
- Quality: 80%
- File size: < 100KB

**Tools:**
- TinyPNG.com (compression)
- Squoosh.app (format conversion)

### Reduce Star Count

For slower devices:

```javascript
/* tcia-about-new.js line 84 */
const starCount = Math.min(window.innerWidth * window.innerHeight / 5000, 150);
// Increased denominator = fewer stars
// Reduced max = lower ceiling
```

### Disable Animations

For better accessibility:

```css
/* main.css end of file */
@media (prefers-reduced-motion: reduce) {
    .team-member-card, .card-inner {
        transform: none;
        transition: none;
    }
    #star-background {
        display: none;
    }
}
```

---

## Advanced Customization

### Change Card Colors

**Front of card:**
```css
/* main.css line 188 */
.card-front {
    background: linear-gradient(145deg, #667eea, #764ba2);
    /* Change these hex colors */
}
```

**Back of card:**
```css
/* main.css line 193 */
.card-back {
    background: linear-gradient(145deg, #764ba2, #667eea);
}
```

### Custom Pillar Positions

For specific positions instead of circle:

```javascript
// Replace createPillars() function
function createPillars() {
    const positions = [
        { left: '10%', top: '20%' },
        { left: '50%', top: '10%' },
        { left: '90%', top: '20%' }
    ];
    
    pillars.forEach((text, index) => {
        const pillarElement = document.createElement('div');
        pillarElement.classList.add('pillar');
        pillarElement.style.left = positions[index].left;
        pillarElement.style.top = positions[index].top;
        // ... rest of code
    });
}
```

### Add Custom Animation

Bounce cards on load:

```css
/* Add to main.css */
@keyframes bounceIn {
    0% { transform: scale(0); opacity: 0; }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); opacity: 1; }
}

.team-member-card {
    animation: bounceIn 0.6s ease-out;
}
```

### Track Member Clicks

Add analytics:

```javascript
// In showMemberPopup() after line 332
if (typeof gtag !== 'undefined') {
    gtag('event', 'view_member', {
        event_category: 'team',
        event_label: member.name
    });
}
```

---

## HTML Structure Reference

### Main Container
```html
<section id="about-page">
    <canvas id="star-background"></canvas>
    <div id="content">
        <!-- All content here -->
    </div>
</section>
```

### Team Card Structure
```html
<div class="team-member-card">
    <div class="card-inner">
        <div class="card-front">
            <img class="member-image">
            <div class="member-name">Name</div>
            <div class="member-codename">Codename</div>
            <h3 class="member-role">Role</h3>
        </div>
        <div class="card-back">
            <p>Click for details</p>
        </div>
    </div>
</div>
```

### Popup Structure
```html
<div id="member-popup" class="member-popup">
    <div class="popup-content">
        <span class="close">&times;</span>
        <div class="info-column">
            <!-- Member details -->
        </div>
        <div class="image-column">
            <img class="popup-image">
        </div>
    </div>
</div>
```

---

## CSS Class Reference

### Layout Classes
- `.team-member-card` - Individual team member card
- `.card-inner` - Inner wrapper for 3D flip
- `.card-front` - Front face of card
- `.card-back` - Back face of card (hover to see)

### Text Classes
- `.member-name` - Name on card
- `.member-codename` - Nickname on card (removed in current version)
- `.member-role` - Job title on card
- `.member-image` - Profile photo

### Popup Classes
- `.member-popup` - Full-screen overlay
- `.popup-content` - Main popup container
- `.info-column` - Left side (text info)
- `.image-column` - Right side (photo)
- `.popup-bio` - Biography text area
- `.drop-cap` - Large first letter in bio

### Special Classes
- `.board-member` - Adds gold border (auto-applied if `isBoardMember: true`)
- `.show` - Makes popup visible (added by JavaScript)
- `.close` - Close button (X)

---

## Quick Reference Card

### Edit Content
**Location:** `js/tcia-about-new.js`
- Lines 154-176: Page text
- Lines 179+: Team members

### Edit Styling
**Location:** `css/main.css`
- Lines 2-15: Color variables
- Lines 13-14: Card dimensions
- Lines 188-206: Card colors

### Common Values
```javascript
// Team member template
{
    name: "Full Name",
    codename: "Optional Nickname",
    role: "Job Title",
    specialty: "Area of Expertise",
    image: "https://image-url.com/photo.jpg",
    bio: "<p>Biography paragraph 1.</p><p>Paragraph 2.</p>",
    isBoardMember: false
}
```

---

## Browser Support

**Fully Supported:**
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

**Partial Support:**
- ⚠️ IE11: No canvas animations, basic layout only

**Mobile:**
- ✅ iOS Safari 14+
- ✅ Chrome Android 90+

---

## Version Notes

**Current Version:** 2.0

**Recent Changes:**
- Removed unused navigation code
- Removed `.glow` class (unused)
- Optimized mobile performance
- Added lazy loading for images
- Improved error handling

---

**Last Updated:** November 2025  
**Maintainer:** TCIA Development Team


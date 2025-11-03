# Resource Library - Complete Documentation

## Table of Contents
1. [Overview](#overview)
2. [File Structure](#file-structure)
3. [Two Main Views](#two-main-views)
4. [Adding Content](#adding-content)
5. [Customization](#customization)
6. [How It Works](#how-it-works)
7. [Troubleshooting](#troubleshooting)

---

## Overview

The Resource Library is a searchable, filterable database featuring:
- **Resource List** - Sortable table of external resources
- **Materials** - Featured documents with images and descriptions
- **Topic filtering** - Quick access by category (AI, Education, D4PG)
- **Search** - Real-time filtering by title
- **Popup system** - Detailed view with related references

**No dependencies** - Pure HTML, CSS, and JavaScript.

---

## File Structure

```
res-lib/
├── resource-library.html    # Main HTML (399 lines)
├── css/
│   └── main.css            # All styling (413 lines)
└── js/
    └── main.js             # Interactivity (144 lines)
```

---

## Two Main Views

### 1. Resource List (Default)

**Shows:**
- Topic filter boxes
- Search bar
- Sortable table of resources

**Use for:**
- External links
- Academic papers
- Articles
- Reports

### 2. Materials

**Shows:**
- Featured materials with images
- Full descriptions
- Multiple download links
- Related references (in popup)

**Use for:**
- Your own publications
- Key documents
- Infographics
- Important reports

---

## Adding Content

### Add a Resource (Resource List)

**Location:** `resource-library.html` (inside `<tbody>` starting at line 234)

```html
<tr class="resource-row" data-topic="AI">
    <td>
        <a href="https://example.com/resource.pdf" target="_blank">
            Title of the Resource Here
        </a>
    </td>
    <td>Organization Name</td>
</tr>
```

**Fields:**
- `data-topic` - Filter category: `"AI"`, `"AI In Education"`, or `"D4PG"`
- `href` - Full URL to resource
- `target="_blank"` - Opens in new tab
- First `<td>` - Resource title
- Second `<td>` - Source organization

**Example:**
```html
<tr class="resource-row" data-topic="AI In Education">
    <td>
        <a href="https://www.example.edu/ai-teaching-guide.pdf" target="_blank">
            Complete Guide to AI in the Classroom
        </a>
    </td>
    <td>State Education Department</td>
</tr>
```

### Add a Material (Materials Section)

**Location:** `resource-library.html` (inside materials section starting at line 42)

```html
<div class="materials-item" data-topic="">
    <div class="materials-image">
        <img src="IMAGE_URL_HERE" alt="IMAGE_DESCRIPTION">
    </div>
    <div class="materials-info">
        <h3 class="materials-title">Material Title Here</h3>
        <p class="materials-description">First paragraph of description.</p>
        <p class="materials-description">Second paragraph if needed.</p>
        <a href="DOCUMENT_URL" class="learn-more-button" target="_blank">
            Read The Report
        </a>
    </div>
</div>
```

**Fields:**
- `data-topic` - Leave empty `""` or set to topic for reference linking
- `src` - Image URL (square images work best, ~500x500px)
- `alt` - Image description for accessibility
- `.materials-title` - Main title
- `.materials-description` - One or more paragraphs
- `.learn-more-button` - Link to document (add multiple if needed)

**Multiple Buttons Example:**
```html
<a href="https://example.com/report.pdf" class="learn-more-button" target="_blank">
    Read The Report
</a>
<a href="https://example.com/flipbook" class="learn-more-button" target="_blank">
    View The Flipbook
</a>
<a href="/interactive-timeline" class="learn-more-button">
    View Interactive Timeline
</a>
```

### Add a Reference (for Materials)

**Location:** `resource-library.html` (inside references section starting at line 163)

```html
<tr class="reference-row" data-topic="History of AI">
    <td>
        <a href="https://example.com/article" target="_blank">
            Article Title Here
        </a>
    </td>
    <td>Source Name</td>
</tr>
```

**Purpose:**
References show in popup when clicking a material that matches `data-topic`.

**Topic Matching:**
```html
<!-- Material -->
<div class="materials-item" data-topic="History of AI">

<!-- Matching Reference -->
<tr class="reference-row" data-topic="History of AI">
```

### Add a Topic Box

**Location:** `resource-library.html` (inside topics section starting at line 20)

```html
<div class="topic-box" data-topic="YOUR_TOPIC">
    <h4>Display Name</h4>
</div>
```

**Example:**
```html
<div class="topic-box" data-topic="Ethics">
    <h4>AI Ethics</h4>
</div>
```

**Then:**
Add resources with matching `data-topic`:
```html
<tr class="resource-row" data-topic="Ethics">
```

---

## Customization

### Change Colors

**Location:** `css/main.css` (lines 2-9)

```css
:root {
    --primary-color: #1a3070;      /* Navy blue (topics, borders) */
    --secondary-color: #f3b54a;    /* Gold (hover, headers) */
    --accent-color: #ec1a3c;       /* Red (buttons) */
    --darker-accent-color: #c91633; /* Dark red (button hover) */
    --background-color: #f8f8f8;   /* Light gray (page background) */
    --text-color: #333;            /* Dark gray (text) */
}
```

**To change button color:**
```css
--accent-color: #28a745;  /* Green buttons */
```

**To change topic boxes:**
```css
--primary-color: #6c757d;  /* Gray topic boxes */
```

### Adjust Topic Grid

**Desktop (4 columns):**
```css
/* main.css line 18 */
grid-template-columns: repeat(4, 1fr);  /* Change 4 to 3 or 5 */
```

**Already responsive:**
- 3 columns at 1200px
- 2 columns at 900px
- 1 column at 600px

### Change Table Striping

**Location:** `css/main.css` (lines 172-180)

```css
/* Even rows */
.resources-table tr:nth-child(even) {
    background-color: var(--primary-color);  /* Navy */
    color: white;
}

/* Odd rows */
.resources-table tr:nth-child(odd) {
    background-color: white;  /* White */
    color: var(--primary-color);
}
```

### Adjust Spacing

**Between materials:**
```css
/* main.css line 87 */
margin-bottom: 40px;  /* Increase for more space */
```

**Navigation bar margin:**
```css
/* main.css line 308 */
margin-bottom: 80px;  /* Space below nav bar */
```

---

## How It Works

### Navigation System

**Two tabs:**
1. **Resource List** - Shows topics, search, and table
2. **Materials** - Shows featured materials

**JavaScript:**
```javascript
// Clicking "Resource List"
resourcesSection.classList.remove('hidden');  // Show table
materialsSection.classList.add('hidden');     // Hide materials

// Clicking "Materials"
materialsSection.classList.remove('hidden');  // Show materials
resourcesSection.classList.add('hidden');     // Hide table
```

### Topic Filtering

**Click a topic box:**

```javascript
function filterItems(topic) {
    // Show only rows matching topic
    resourceRows.forEach(row => {
        row.style.display = 
            row.getAttribute('data-topic') === topic ? '' : 'none';
    });
}
```

**"Show All Resources" button:**
Removes all filters and displays everything.

### Search Functionality

**Real-time filtering:**

```javascript
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    resourceRows.forEach(row => {
        const title = row.querySelector('td').textContent.toLowerCase();
        row.style.display = title.includes(searchTerm) ? '' : 'none';
    });
});
```

**Searches:**
- Resource titles only
- Case-insensitive
- Updates as you type

### Table Sorting

**Click column headers to sort:**

Headers show arrows:
- ▲ Ascending
- ▼ Descending

**Currently supports:**
- Title (alphabetical)
- Source (alphabetical)

### Popup System

**Click a material:**

1. Clones material info
2. Finds matching references by `data-topic`
3. Shows popup with both
4. Blurs background
5. Prevents scrolling

**Close popup:**
- Click "Close" button
- JavaScript handles cleanup

---

## Quick Reference

### Resource Template
```html
<tr class="resource-row" data-topic="CATEGORY">
    <td><a href="URL" target="_blank">Title</a></td>
    <td>Source</td>
</tr>
```

### Material Template
```html
<div class="materials-item" data-topic="">
    <div class="materials-image">
        <img src="IMAGE_URL" alt="Description">
    </div>
    <div class="materials-info">
        <h3 class="materials-title">Title</h3>
        <p class="materials-description">Description text.</p>
        <a href="URL" class="learn-more-button" target="_blank">
            Button Text
        </a>
    </div>
</div>
```

### Reference Template
```html
<tr class="reference-row" data-topic="CATEGORY">
    <td><a href="URL" target="_blank">Title</a></td>
    <td>Source</td>
</tr>
```

### Topic Box Template
```html
<div class="topic-box" data-topic="CATEGORY">
    <h4>Display Name</h4>
</div>
```

---

## Troubleshooting

### Resources Not Filtering

**Check:**
1. `data-topic` matches exactly (case-sensitive)
2. Topic box has same `data-topic`

**Example:**
```html
<!-- Won't work - mismatch -->
<div class="topic-box" data-topic="AI">
<tr class="resource-row" data-topic="ai">  <!-- lowercase won't match -->

<!-- Works - exact match -->
<div class="topic-box" data-topic="AI">
<tr class="resource-row" data-topic="AI">
```

### Search Not Working

**Check:**
1. Search input has `id="search-input"`
2. Resource rows have class `resource-row`
3. JavaScript file loaded

**Test:**
Open browser console (F12) and type:
```javascript
document.getElementById('search-input')  // Should show element
```

### Materials Not Appearing

**Check:**
1. Click "Materials" tab
2. Materials section exists with `id="materials-section"`
3. Items have class `materials-item`

### Popup Not Opening

**Check:**
1. Overlay exists: `<div class="overlay" id="popup-overlay">`
2. Clicking inside `.materials-item`
3. JavaScript loaded

**Debug:**
```javascript
// In browser console
document.getElementById('popup-overlay')  // Should show element
```

### Images Not Loading

**Check:**
1. Image URL is correct and accessible
2. URL starts with `http://` or `https://`
3. No CORS restrictions

**Good:**
```html
<img src="https://images.example.com/photo.jpg">
```

**Bad:**
```html
<img src="/local-file.jpg">  <!-- May not work -->
```

### Table Not Sorting

**Check:**
1. Headers have `data-sort` attribute
2. Clicking the header text (not empty space)

**Example:**
```html
<th data-sort="title">Title</th>  <!-- Clickable -->
```

### Links Not Opening in New Tab

**Add `target="_blank"`:**
```html
<a href="URL" target="_blank">Text</a>
```

### Colors Not Changing

**Check:**
1. Using CSS variables:
   ```css
   background-color: var(--primary-color);  /* Good */
   background-color: #1a3070;  /* Won't update with theme */
   ```

2. Variable defined in `:root` section

### Mobile Layout Issues

**Already responsive:**
- Topic grid adjusts automatically
- Tables scroll horizontally if needed
- Popup adapts to screen size

**Force mobile test:**
Open browser DevTools (F12) → Toggle device toolbar

---

## Advanced Tips

### Add External Links in Descriptions

```html
<p class="materials-description">
    This report is from 
    <a href="https://example.org" target="_blank">Example Organization</a>,
    exploring key topics.
</p>
```

### Bold Text in Descriptions

```html
<p class="materials-description">
    This is <strong>very important</strong> information.
</p>
```

### Multiple References Per Material

Set same `data-topic` on material and all related references:

```html
<!-- Material -->
<div class="materials-item" data-topic="AI Ethics">

<!-- References (all show in popup) -->
<tr class="reference-row" data-topic="AI Ethics">
<tr class="reference-row" data-topic="AI Ethics">
<tr class="reference-row" data-topic="AI Ethics">
```

### Hide References in Popup

Leave `data-topic=""` on material - popup won't show references section.

### Reorder Materials

Move entire `<div class="materials-item">` blocks - first in HTML shows first on page.

### Remove a Topic

1. Delete topic box from HTML
2. Resources remain but won't be filterable by that topic
3. Keep as `data-topic` for organization

---

## CSS Class Reference

### Layout Classes
- `.resource-topics` - Topic boxes container
- `.topic-box` - Individual topic filter
- `.materials-section` - Materials view container
- `.materials-item` - Single material block
- `.resources-section` - Resource table container
- `.references-section` - References table container

### Component Classes
- `.materials-image` - Image wrapper
- `.materials-info` - Text content wrapper
- `.materials-title` - Material heading
- `.materials-description` - Description paragraph
- `.learn-more-button` - Action buttons
- `.return-button` - Back to top button

### Navigation Classes
- `.navigation-bar` - Top nav bar
- `.nav-options` - Tab buttons container
- `.nav-item` - Individual tab
- `.selected` - Active tab/filter

### Table Classes
- `.resources-table` - Resource data table
- `.references-table` - Reference data table
- `.resource-row` - Table row (resource)
- `.reference-row` - Table row (reference)

### Popup Classes
- `.overlay` - Full-screen popup background
- `.popup` - Popup content box
- `.close-button` - Close popup button

### State Classes
- `.hidden` - Hides element
- `.blur-background` - Blurs content (when popup open)
- `.popup-open` - Added to body (prevents scrolling)
- `.selected` - Active nav item or filter

---

## Performance Tips

### Optimize Images

**Recommended:**
- Format: JPEG or WebP
- Size: 500x500px
- Quality: 75-80%
- File size: < 150KB

**Tools:**
- TinyJPG.com
- Squoosh.app

### Reduce Materials

If page loads slowly:
- Keep materials under 20 items
- Use lazy loading for images
- Compress all images

### External Links

All resource links open in new tabs - this:
- Keeps your page open
- Improves user experience
- Reduces bounce rate

---

## Browser Support

**Fully Supported:**
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

**Features:**
- CSS Grid (IE11+)
- Modern JavaScript (ES6+)
- Flexbox (IE10+)

---

## Common Tasks

### Change "Resource List" Text

**Location:** `resource-library.html` line 10

```html
<h3 class="nav-item selected" id="resource-list">
    Your Text Here
</h3>
```

### Change "Materials" Text

**Location:** `resource-library.html` line 11

```html
<h3 class="nav-item" id="materials">
    Your Text Here
</h3>
```

### Change "Resources Home" Link

**Location:** `resource-library.html` line 13

```html
<a href="/your-page" class="learn-more-button nav-home">
    Your Text
</a>
```

### Add More Columns to Table

**Location:** `resource-library.html` lines 229-232

```html
<thead>
    <tr>
        <th data-sort="title">Title</th>
        <th data-sort="source">Source</th>
        <th data-sort="year">Year</th>  <!-- New column -->
    </tr>
</thead>
```

**Then update each row:**
```html
<tr class="resource-row" data-topic="AI">
    <td><a href="URL">Title</a></td>
    <td>Source</td>
    <td>2024</td>  <!-- New data -->
</tr>
```

### Change Search Placeholder

**Location:** `resource-library.html` line 35

```html
<input type="text" id="search-input" placeholder="Type to search...">
```

### Change "Show All" Button Text

**Location:** `resource-library.html` line 36

```html
<button id="show-all">Display Everything</button>
```

---

## Version Notes

**Current Version:** 1.0

**Features:**
- Dual-view navigation
- Topic filtering
- Real-time search
- Sortable tables
- Popup with references
- Fully responsive
- No dependencies

---

**Last Updated:** November 2025  
**Maintainer:** TCIA Development Team


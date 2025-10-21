# Notice Coalition Media Gallery
## Comprehensive Documentation

This document explains how the Media Gallery page works, both for programmers and for artists/content managers who want to understand and update the gallery.

---

## 📁 File Structure

```
NOTICE_COALITION/
├── notice-media-gallery.html    # Main HTML file
├── js/
│   ├── main.js                  # Navigation functionality
│   └── gallery.js               # Gallery, filtering, and modal functionality
├── css/
│   └── main.css                 # All styling (hosted externally)
└── README.md                    # This file
```

---

##  How the CSS Works

The CSS uses a **CSS Variables** system for easy customization and consistency across the entire page.

### Color System

The page uses the Notice Coalition brand colors:
- **Notice Yellow** (`#fbc516`) - Accent color for buttons, links, and highlights
- **Notice Black** (`#1a1919`) - Primary background color
- **Notice Grey** (`#808285`) - Secondary text color
- **Notice White** (`#ffffff`) - Primary text color

### Layout System

1. **Container-Based Layout**: All content is wrapped in `.section-content` which:
   - Has a max-width of 1200px
   - Centers content automatically
   - Adds responsive padding

2. **Fixed Navigation**: The nav bar stays at the top of the page as you scroll
   - Uses `position: fixed` 
   - Has a z-index of 1000 to stay above other content
   - Includes a shadow for depth

3. **Masonry Grid**: The gallery uses a CSS column-based masonry layout
   - **Desktop (>1200px)**: 4 columns
   - **Tablet (768px-1200px)**: 3 columns
   - **Mobile (480px-768px)**: 2 columns
   - **Small Mobile (<480px)**: 1 column

### Key CSS Features

**Responsive Images**:
```css
.gallery-thumbnail {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;  /* Makes images fill their container without distortion */
    opacity: 0;         /* Hidden until loaded */
    transition: opacity 0.3s ease-in-out;
}
```

**Filter Buttons**:
- Transparent background with yellow border when inactive
- Solid yellow background with black text when active
- Smooth transitions between states

**Modal Overlay**:
- Semi-transparent black background (`rgba(0, 0, 0, 0.8)`)
- Centers images using flexbox
- Only appears on desktop (disabled on mobile for better UX)

---

## How the JavaScript Works

### File 1: `main.js` - Navigation

**Purpose**: Handles smooth scrolling for internal page links

**How it works**:
1. Waits for the page to load (`DOMContentLoaded`)
2. Finds all navigation links
3. For links that start with `#` (same-page links):
   - Prevents default jump behavior
   - Calculates the scroll position accounting for the fixed nav bar
   - Smoothly scrolls to that section

**Example**: Clicking "About" in the nav smoothly scrolls to the About section instead of jumping instantly.

---

### File 2: `gallery.js` - Main Gallery Functionality

This file handles all gallery features and is organized into several parts:

#### Part 1: Data Storage

**categoryData Object**:
```javascript
{
    categories: [
        {
            id: 'impact-ai-fellowship-event',      // Machine-readable ID
            name: 'IMPACT OF AI FELLOWSHIP EVENT',  // Display name
            description: '...'                      // Long description
        },
        // ... more categories
    ]
}
```

**galleryData Object**:
```javascript
{
    images: [
        {
            imageUrl: 'https://...',     // Full-size image URL
            thumbnail: 'https://...',    // Thumbnail URL (usually same as imageUrl)
            categories: ['impact-ai-fellowship-event'],  // Array of category IDs
            year: 2025                   // Year for filtering
        },
        // ... more images
    ]
}
```

#### Part 2: Image Loading (`populateGalleryGrid`)

**Purpose**: Creates gallery items and loads images efficiently

**How it works**:

1. **Intersection Observer** (Lazy Loading):
   - Only loads images when they're about to appear on screen
   - Saves bandwidth and improves initial page load
   - When an image enters viewport:
     - Sets the `src` and `srcset` attributes
     - Calculates the image's aspect ratio
     - Adjusts container padding to prevent layout shift
     - Fades in the image

2. **Responsive Images**:
   ```javascript
   // Creates multiple image sizes for different screens
   smallUrl   // 300w - for mobile
   mediumUrl  // 500w - for tablets
   largeUrl   // 800w - for small desktop
   full       // 1200w - for large desktop
   ```

3. **Dynamic Creation**:
   - Loops through each image in `galleryData`
   - Creates HTML for each gallery item
   - Attaches category and year information as data attributes
   - Appends to the gallery grid

#### Part 3: Modal Functionality (`initializeModal`)

**Purpose**: Shows full-size images when clicked (desktop only)

**How it works**:

1. **Opening**:
   - User clicks an image on desktop (>768px screen width)
   - Gets the full-size URL from the image
   - Displays modal overlay
   - Prevents page scrolling

2. **Closing**:
   - Click outside the image
   - Click the X button
   - Press Escape key
   - Re-enables page scrolling
   - Clears the image after animation

**Why Mobile is Disabled**: On mobile, clicking images would interfere with scrolling and take up the entire small screen.

#### Part 4: Filter System (`initializeFilters`)

**Purpose**: Lets users show only specific categories or years of images

**How it works**:

1. **UI Setup**:
   - Creates filter buttons from `categoryData`
   - Adds an "All" button for each filter type
   - Sets up toggle functionality for collapsible sections

2. **State Tracking**:
   ```javascript
   let currentYear = 'all';
   let currentCategory = 'all';
   ```
   - Tracks what filters are currently active
   - Updates when user clicks filter buttons

3. **Filter Logic** (`filterGallery`):
   - For each gallery item:
     - Checks if it matches the selected category
     - Checks if it matches the selected year
     - Shows item if BOTH match (or if filter is "all")
     - Hides item if either doesn't match

4. **Clear Filters**:
   - Resets both filters to "all"
   - Shows all images again

#### Part 5: Initialization (`initializeGallery`)

**Purpose**: Starts everything when the page loads

**Execution Order**:
1. `populateGalleryGrid()` - Creates all gallery items
2. `initializeFilters()` - Sets up filter buttons and logic  
3. `initializeModal()` - Prepares modal for image viewing
4. Opens filter section by default for better UX

---

## For Content Managers: How to Add New Content

### Adding a New Image

1. **Upload your image** to Squarespace or your image host
2. **Copy the image URL**
3. **Open** `/Users/darthwafer/Code/TCIA/website/NOTICE_COALITION/js/gallery.js`
4. **Find** the `galleryData` object (around line 184)
5. **Add** your new image entry:

```javascript
{
    imageUrl: 'YOUR_IMAGE_URL_HERE',
    categories: ['category-id-here'],  // Use existing category IDs
    thumbnail: 'YOUR_IMAGE_URL_HERE',  // Usually same as imageUrl
    year: 2025                         // Current year
},
```

**Important**: Make sure to add a comma after the previous image entry!

### Adding a New Category

1. **Open** `/Users/darthwafer/Code/TCIA/website/NOTICE_COALITION/js/gallery.js`
2. **Find** the `categoryData` object (around line 169)
3. **Add** your new category:

```javascript
{
    id: 'my-new-category',                    // No spaces, use hyphens
    name: 'MY NEW CATEGORY',                  // Display name (all caps)
    description: 'Description of category'    // Optional long description
},
```

4. **Use this ID** when adding images to this category

### Changing Colors

1. **Open** the CSS file (hosted at the URL in the HTML)
2. **Find** the `:root` section at the top
3. **Change** the color values:

```css
:root {
    --notice-yellow: #fbc516;  /* Change to your accent color */
    --notice-black: #1a1919;   /* Change to your background color */
    --notice-grey: #808285;    /* Change to your secondary text color */
    --notice-white: #ffffff;   /* Change to your primary text color */
}
```

All buttons, links, and highlights will automatically update!

---

##  For Programmers: Technical Details

### Performance Optimizations

1. **Lazy Loading**: Images only load when visible (Intersection Observer API)
2. **Responsive Images**: Multiple sizes via `srcset` for optimal bandwidth usage
3. **Debounced Scrolling**: Smooth scroll calculations are optimized
4. **Efficient Filtering**: Uses data attributes for O(n) filtering

### Browser Support

- **Modern Browsers**: Full support (Chrome, Firefox, Safari, Edge)
- **Intersection Observer**: Polyfill not included (degrades gracefully to immediate loading)
- **CSS Grid/Flexbox**: Widely supported
- **Mobile**: Touch-optimized, modal disabled on small screens

### Customization Points

**Breakpoints** (in CSS):
```css
--mobile: 480px;
--tablet: 768px;
--desktop: 1024px;
```

**Lazy Load Threshold** (in gallery.js):
```javascript
{
    rootMargin: '50px 0px',  // Start loading 50px before visible
    threshold: 0.1            // Trigger when 10% visible
}
```

**Animation Timing**:
```javascript
setTimeout(() => {
    modalImage.src = '';
}, 300);  // Matches CSS transition time
```

### Event Flow

```
Page Load
    ↓
DOMContentLoaded fires
    ↓
initializeGallery()
    ├── populateGalleryGrid()
    │       ├── Creates gallery items
    │       └── Sets up Intersection Observer
    ├── initializeFilters()
    │       ├── Creates filter buttons
    │       └── Attaches click handlers
    └── initializeModal()
            └── Prepares modal handlers

User Interaction
    ├── Scroll → Lazy load images
    ├── Click Filter → filterGallery()
    ├── Click Image → Open modal (desktop only)
    └── Press Escape → Close modal
```

### Data Flow

```
galleryData (static) → populateGalleryGrid() → DOM Elements
                                                     ↓
User Clicks Filter → Updates state → filterGallery() → Shows/Hides Elements
                                                     ↓
                              Uses data-categories attribute to match
```

---

## 🐛 Common Issues and Solutions

### Images Not Loading
**Problem**: Images don't appear  
**Solution**: 
- Check that image URLs are correct and publicly accessible
- Verify the image URLs don't have CORS restrictions
- Open browser console (F12) to check for errors

### Filters Not Working  
**Problem**: Clicking filters doesn't change what's displayed  
**Solution**:
- Ensure category IDs in `categoryData` match the IDs in image `categories` arrays
- Check browser console for JavaScript errors
- Verify that `data-categories` attributes are being set correctly

### Modal Won't Close
**Problem**: Modal stays open  
**Solution**:
- Check that you're not accidentally clicking the image itself (only overlay/X should close)
- Try pressing Escape key
- Refresh the page

### Layout Breaks on Mobile
**Problem**: Gallery looks wrong on small screens  
**Solution**:
- Clear browser cache
- Check that the CSS file is loading correctly
- Verify responsive breakpoints in CSS

---

## Additional Resources

- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
- [CSS Columns (Masonry)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Columns)


---

*Last Updated: October 2025*
*Version: 1.0*


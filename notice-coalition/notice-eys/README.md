# Ending Youth Surveillance Speaker Series

This directory contains the Ending Youth Surveillance speaker series page for the NOTICE Coalition website.

## Structure

```
notice-eys/
├── css/
│   └── main.css          # All styles for the speaker series page
├── js/
│   └── main.js           # All JavaScript functionality
├── ending-youth-surveillance.html  # Main HTML page
└── README.md
```

## Asset Loading

The HTML file loads external assets from the GitHub Pages deployment:

```html
<!-- Load Assets -->
<link rel="stylesheet" href="https://tcia-admin.github.io/tcia-website/notice-coalition/notice-eys/css/main.css">
<script src="https://tcia-admin.github.io/tcia-website/notice-coalition/notice-eys/js/main.js"></script>
```

## Features

### CSS (`css/main.css`)
- CSS custom properties (variables) for consistent theming
- Responsive design with mobile-first approach
- Alternating section backgrounds
- Speaker card layouts with hover effects
- Video embed containers with 16:9 aspect ratio
- Modal styling for registration forms
- Navigation bar with fixed positioning

### JavaScript (`js/main.js`)
- **Navigation Smooth Scroll**: Smooth scrolling to section anchors with nav height offset
- **Modal Functionality**: Registration form modal with open/close handlers
- **Event Countdown**: Automatic countdown calculator for upcoming events

## Design Principles

Following the NOTICE Coalition design guidelines:
- Self-contained reusable components
- Visually engaging with attention-capturing elements
- Value-focused content
- Meaningful engagement
- Visual clarity and conciseness
- Fully responsive design
- Professional business-appropriate styling

## Maintenance

When adding new speakers or events:
1. Add speaker card HTML in the appropriate section
2. Include `data-event-datetime` attribute for countdown functionality
3. Ensure images follow the established aspect ratios
4. Test modal registration links

## Color Scheme

- **Primary Background**: `#1a1919` (Notice Black)
- **Secondary Background**: `#242424` (Slightly lighter for layering)
- **Accent Color**: `#fbc516` (Notice Yellow)
- **Text Primary**: `#ffffff` (White)
- **Text Secondary**: `#808285` (Grey)


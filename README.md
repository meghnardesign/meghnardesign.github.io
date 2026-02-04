# Personal Portfolio Website

## Project Overview

This is a personal portfolio website created as part of Assignment 2 for an upper-level Computer Science course. The website showcases a professional portfolio with interactive visualizations and demonstrates competency in web development fundamentals including HTML, CSS, and JavaScript.

## Purpose

The website serves as a digital resume and portfolio platform that:
- Presents personal and professional information in an organized, accessible manner
- Demonstrates web design and development skills
- Showcases data visualization capabilities
- Provides an interactive experience for potential employers or collaborators

## Technologies Used

### Frontend
- **HTML5**: Semantic markup for structure and accessibility
- **CSS3**: Responsive design with modern layout techniques
  - CSS Grid and Flexbox for layout
  - Responsive units (rem, vw, clamp) for scalability
  - CSS animations and transitions for interactivity
- **JavaScript (ES6+)**: Dynamic functionality and interactivity
  - DOM manipulation
  - Event handling
  - Form validation
  - Intersection Observer API for animations
- **SVG**: Vector graphics for visualizations

### Tools & Platforms
- Git & GitHub for version control
- VS Code for development
- Responsive Design Testing Tools

## Project Structure

```
A2-Personal-Website/
├── index.html              # Homepage with personal information
├── visualizations.html     # Data visualization portfolio page
├── style.css              # Responsive styling
├── main.js                # Interactive functionality and form handling
├── vis.js                 # SVG visualization generation
└── README.md              # This file
```

## File Descriptions

### index.html
The main homepage featuring:
- Navigation bar with smooth scrolling
- Hero section with personal introduction
- About me section
- Education section with degree information
- Technical skills organized by category
- Experience/timeline section
- Contact form with validation
- Footer with links

**Key Features:**
- Semantic HTML5 structure
- Accessible form elements
- Mobile-friendly navigation with hamburger menu
- Links to social profiles and GitHub

### visualizations.html
Portfolio page featuring:
- Navigation matching the main site
- Two distinct SVG visualizations:
  1. **Programming Language Popularity Chart**: Interactive bar chart showing popularity metrics
  2. **Interactive Pattern Generator**: Creative SVG art with hover interactions
- Information cards explaining each visualization

**Key Features:**
- Dynamic SVG generation using JavaScript
- Interactive hover effects
- Responsive scaling of visualizations
- Educational descriptions

### style.css
Comprehensive styling system featuring:
- CSS reset and base styles
- Typography with responsive font sizes using `clamp()`
- Responsive grid and flexbox layouts
- Navigation styling with active states
- Component styling (cards, forms, buttons)
- Animation and transition effects
- Media queries for mobile, tablet, and desktop

**Responsive Design Approach:**
- Mobile-first methodology
- Breakpoints at 768px and 480px
- Responsive units (rem, %, vw, clamp)
- Flexible typography scaling

### main.js
Interactive functionality including:
- Navigation menu toggle and management
- Active link highlighting on scroll
- Form validation with real-time feedback
- Email validation with regex
- Custom alert notifications
- Smooth scroll behavior
- Intersection Observer for scroll animations
- Keyboard accessibility support

**Features:**
- Form validation for name, email, and message fields
- Error handling and user feedback
- Debounced scroll event listeners
- CSS-in-JS for animations

### vis.js
SVG visualization generation including:
- **Data Visualization**: Creates bar chart from data array
  - Responsive scaling
  - Interactive hover effects
  - Animated value labels
  - Grid lines and axes
- **Creative Art**: Interactive pattern with circles
  - Gradient fills
  - Hover interactions
  - Animated transformations
  - Responsive sizing

**Visualization Features:**
- Dynamic SVG element creation
- Data-driven visualization
- Interactive elements
- Responsive resize handling

## Design Features

### Responsive Design
- Fluid typography using `clamp()` function
- Responsive grid layouts with `auto-fit` and `minmax()`
- Mobile hamburger menu for navigation
- Touch-friendly interface elements
- Tested at multiple breakpoints

### User Interface
- Clean, professional color scheme
- Consistent spacing and typography
- Smooth transitions and animations
- Hover states for interactivity
- Focus states for accessibility

### Interactivity
- Form validation with immediate feedback
- Smooth scroll navigation
- Intersection Observer animations on scroll
- Interactive SVG visualizations
- Hamburger menu toggle
- External link management

## How to Navigate the Site

1. **Homepage** (`index.html`):
   - Use the navigation bar to jump to different sections
   - Scroll to explore all content
   - Fill out the contact form to get in touch

2. **Visualizations** (`visualizations.html`):
   - View two different types of SVG visualizations
   - Hover over elements for interactivity
   - Read descriptions to understand the visualizations

3. **Navigation**:
   - On desktop: Use the horizontal menu
   - On mobile: Click the hamburger menu to toggle the navigation menu
   - All navigation items use smooth scrolling

## Features Implemented

### HTML/Semantic Structure
- ✅ Proper semantic HTML elements
- ✅ Accessible form structure
- ✅ Image alt text
- ✅ Proper heading hierarchy
- ✅ Navigation landmarks

### CSS/Styling
- ✅ Responsive design using modern CSS
- ✅ Mobile-first approach
- ✅ Responsive units (rem, vw, clamp)
- ✅ Animations and transitions
- ✅ Consistent color scheme and typography
- ✅ Professional layout

### JavaScript/Interactivity
- ✅ Form validation
- ✅ Navigation interactivity
- ✅ Smooth scrolling
- ✅ Scroll-based animations
- ✅ SVG generation and manipulation
- ✅ Event listeners and handlers

### Visualizations
- ✅ SVG bar chart with data
- ✅ Creative SVG art with interactivity
- ✅ Responsive visualization scaling
- ✅ Hover effects and animations

## Accessibility

The website includes several accessibility features:
- Semantic HTML structure
- Proper heading hierarchy
- Form labels and validation messages
- Focus states on interactive elements
- Alt text for images
- Keyboard navigation support
- Color contrast considerations

## Browser Compatibility

The website is compatible with:
- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Considerations

- Responsive SVG sizing that adapts to viewport
- Debounced resize event listeners
- CSS animations instead of JavaScript animations where possible
- Lazy loading for images
- Minimal dependencies (vanilla JavaScript)

## Challenges & Solutions

### Challenge 1: Responsive SVG Visualizations
**Solution**: Implemented viewBox attribute and preserveAspectRatio to scale SVGs responsively without distortion. Added resize listener with debouncing to regenerate visualizations on viewport changes.

### Challenge 2: Form Validation & User Feedback
**Solution**: Created custom validation functions with regex patterns for email validation. Implemented visual feedback through alert notifications and field styling.

### Challenge 3: Navigation Highlighting on Scroll
**Solution**: Used Intersection Observer API combined with scroll event listeners to dynamically update active navigation link based on current viewport position.

### Challenge 4: Mobile Navigation
**Solution**: Implemented hamburger menu that toggles navigation visibility on mobile devices using CSS media queries and JavaScript event listeners.

### Challenge 5: Cross-browser SVG Compatibility
**Solution**: Used standard SVG namespace (`http://www.w3.org/2000/svg`) for element creation and tested across multiple browsers for consistent rendering.

## Future Enhancements

Potential improvements for future versions:
- Backend form submission
- Additional visualization types (pie charts, line graphs)
- Animation library integration (GSAP, Framer Motion)
- Dark mode toggle
- Multi-language support
- Animated scroll indicators
- Project showcase gallery
- Blog functionality
- Analytics integration

## Submission Details

**Repository**: [GitHub Link](https://github.com/meghnarajamohan)
**Live Website**: [Deployed Website Link]

**Included Files**:
- Complete source code
- README documentation (this file)
- Summary PDF document with challenges and solutions

## Credits

Developed by: Meghna Rajamohan
Course: Upper-level Computer Science Course
Academic Year: 2025-2026

## License

This project is created for educational purposes.

---

**Last Updated**: February 3, 2026

# Portfolio - SCSS Setup Guide

## 📁 Project Structure

```
Portfolio/
├── scss/                    # SCSS source files
│   ├── main.scss           # Main entry file (imports all partials)
│   ├── _variables.scss     # Global variables (colors, spacing, etc.)
│   ├── _mixins.scss        # Reusable mixins and utilities
│   ├── _global.scss        # Global and base styles
│   ├── _animations.scss    # Animation keyframes
│   ├── _cursor.scss        # Custom cursor styles
│   ├── _navbar.scss        # Navigation bar styles
│   ├── _hero.scss          # Hero section styles
│   └── _sections.scss      # All other section styles
├── css/                     # Compiled CSS output
│   └── styles.css          # (Auto-generated from scss/main.scss)
├── js/                      # JavaScript files
├── index.html              # Main HTML file
├── package.json            # npm dependencies and scripts
└── README.md               # This file
```

## 🚀 Getting Started

### 1. Install Node.js
If you haven't already, download and install [Node.js](https://nodejs.org/)

### 2. Install Dependencies
Navigate to your project folder in terminal and run:

```bash
npm install
```

This will install Sass compiler.

### 3. Watch for Changes (Development)
To automatically compile SCSS to CSS whenever you make changes:

```bash
npm start
```

or 

```bash
npm run sass
```

The command will watch the `scss` folder and compile to `css/styles.css` automatically.

### 4. One-Time Build (Production)
To compile SCSS to CSS just once:

```bash
npm run sass:build
```

## 📝 SCSS Features Used

### Variables
All colors, spacing, breakpoints, and other constants are defined in `_variables.scss`:

```scss
$accent-gold: #d4af37;
$spacing-lg: 2rem;
```

### Mixins
Reusable code blocks for common patterns like gradients, animations, responsive design:

```scss
@include gradient-text($accent-gold, $accent-purple);
@include flex-center;
@include respond-to('md') { /* responsive styles */ }
```

### Nesting
Cleaner, more organized code structure:

```scss
.navbar {
    .container { }
    .nav-links {
        a {
            &:hover { }
        }
    }
}
```

### Organization
Each component has its own file for better maintainability.

## 🎨 Customization

### Change Colors
Edit `scss/_variables.scss`:

```scss
$accent-gold: #your-color;
$primary-bg: #your-color;
```

### Add New Animations
Add to `scss/_animations.scss` and use with:

```scss
animation: yourAnimationName 2s ease-out;
```

### Create New Sections
1. Create a new file: `scss/_section-name.scss`
2. Import it in `scss/main.scss`
3. Start coding with access to all variables and mixins!

## 📚 Resources

- [Sass Documentation](https://sass-lang.com/documentation)
- [SCSS Guide](https://sass-lang.com/guide)
- [npm Scripts](https://docs.npmjs.com/cli/v7/using-npm/scripts)

## 💡 Tips

1. **Keep variables DRY** - If you use a value more than once, make it a variable
2. **Use mixins for repetition** - Saves time and ensures consistency
3. **Organize by components** - One file per major component
4. **Comment your code** - Helps future you understand what you wrote

## 🔄 Workflow

1. Make changes to `.scss` files
2. Sass auto-compiles to `css/styles.css`
3. Browser auto-refreshes (if you have live reload)
4. See your changes instantly!

---

Happy styling! 🎨

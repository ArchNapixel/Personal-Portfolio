# 🚀 Quick Start Guide - SCSS Setup

## What I've Done

✅ Converted your CSS to a professional SCSS architecture
✅ Organized styles into logical components
✅ Created reusable variables and mixins
✅ Set up automatic compilation workflow

## Next Steps - Run These Commands in Terminal

### 1. **Navigate to your portfolio folder**
```bash
cd "c:\Users\Arch Coles\Desktop\Projects\Portfolio"
```

### 2. **Install Sass compiler**
```bash
npm install
```
*(This creates a `node_modules` folder - don't delete it!)*

### 3. **Start watching for changes**
```bash
npm start
```
*(Keep this terminal open while developing)*

### 4. **In your browser**
- Refresh `index.html`
- Your styles are now compiled from SCSS → CSS automatically!

---

## 📂 File Structure

**You now have:**
- `scss/` - Your editable source files (write here!)
- `css/styles.css` - Auto-generated compiled output (don't edit!)
- `package.json` - npm configuration

**Edit these files:**
```
scss/_variables.scss      ← Colors, spacing, sizes
scss/_mixins.scss         ← Reusable utilities
scss/_hero.scss           ← Hero section
scss/_navbar.scss         ← Navigation
scss/_sections.scss       ← Projects, Skills, Contact, etc.
scss/_animations.scss     ← Keyframe animations
```

---

## 🎯 Key Benefits

✨ **Variables** - Change colors globally in one place
✨ **Mixins** - Reuse code patterns (gradients, flexbox, etc.)
✨ **Nesting** - Cleaner, organized code
✨ **Organization** - Each component in its own file

---

## 💡 Example: Changing All Gold Accents

**Before (CSS):** Find and replace in 20+ places ❌

**Now (SCSS):** 
1. Edit `scss/_variables.scss`
2. Change: `$accent-gold: #d4af37;`
3. Save → Auto-compiled → Done! ✅

---

## 🆘 Common Issues

**Q: "npm: command not found"**
→ Install Node.js from https://nodejs.org/

**Q: "SCSS not compiling"**
→ Make sure `npm start` is running in terminal

**Q: "Browser not showing changes"**
→ Hard refresh: `Ctrl + Shift + R` (Windows)

---

## 📚 Useful Commands

```bash
npm start              # Watch mode (keep terminal open)
npm run sass:build     # One-time compile
npm install sass       # Install Sass (if needed)
```

---

**You're all set!** Start editing the `scss/` files and your portfolio will update automatically. 🎨

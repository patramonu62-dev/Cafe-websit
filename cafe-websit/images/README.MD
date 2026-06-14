# ☕ Aroma Café — Website Editing Guide

## File Structure
```
cafe-website/
├── index.html          ← Main page (edit content here)
├── css/
│   ├── base.css        ← Colors, fonts, navbar, hero styles
│   ├── animations.css  ← All animation keyframes & effects
│   └── sections.css    ← About, Menu, Gallery, Contact, Footer
├── js/
│   ├── animations.js   ← Steam canvas, particles, scroll reveal
│   └── main.js         ← Nav, tabs, form, ripple, parallax
├── images/             ← Put all your café photos here
│   ├── cafe-interior.jpg
│   ├── gallery-1.jpg
│   ├── gallery-2.jpg
│   ├── gallery-3.jpg
│   ├── gallery-4.jpg
│   └── gallery-5.jpg
└── README.md           ← This guide
```

---

## ✏️ How to Edit

### 1. Change Café Name
Search for `"Aroma Café"` in `index.html` — replace all 3 instances with your café name.

### 2. Change Hero Tagline
In `index.html`, find:
```html
<h1 class="hero__title">
  Where Every<br />
  <em>Sip Tells</em><br />
  a Story
</h1>
```
Replace with your own tagline.

### 3. Add Your Photos
Drop your photos into the `images/` folder with these names:
- `cafe-interior.jpg` — shown in the About section
- `gallery-1.jpg` to `gallery-5.jpg` — shown in the Gallery grid

### 4. Update Menu Items
In `index.html`, find the `<!-- EDIT: Update menu items -->` comment.
Each menu card looks like:
```html
<div class="menu-card" data-category="coffee">
  <div class="menu-card__emoji">☕</div>
  <h3>Item Name</h3>
  <p>Description</p>
  <span class="menu-card__price">$4.50</span>
</div>
```
Change categories: `coffee`, `teas`, `food`, `specials`

### 5. Update Contact Info
Find the `<!-- EDIT: Update all contact details below -->` comment in `index.html` and update:
- Address
- Opening hours
- Phone & email
- Social media links

### 6. Change Colors
In `css/base.css`, find `:root {}` at the top:
```css
--gold:    #C9A84C;   /* Accent gold — change to your brand color */
--espresso: #1A0F0A;  /* Dark background */
--cream:   #F5EDD6;   /* Light background */
```

---

## ✨ Features Included

| Feature | Description |
|---|---|
| Page loader | Animated coffee cup loader on first visit |
| Steam canvas | Soft gold steam animation in hero |
| Floating particles | Subtle drifting symbols in hero |
| Scroll reveal | All sections animate in as you scroll |
| Animated counters | Numbers count up when visible |
| Menu tabs | Filter menu by Coffee / Teas / Food / Specials |
| Parallax hero | Text moves on scroll for depth |
| Gallery lightbox | Click gallery photos to enlarge |
| Ripple buttons | Material-style click ripple on all buttons |
| Sticky nav | Hides on scroll down, appears on scroll up |
| Mobile menu | Full-screen menu with smooth transition |
| Form animation | Success state animation on reservation submit |

---

## 📱 Responsive
- ✅ Mobile (320px+)
- ✅ Tablet (768px)
- ✅ Desktop (1200px+)
- ✅ Reduced motion respected

---

Made with ☕ love.
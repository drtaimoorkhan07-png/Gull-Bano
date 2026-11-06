# 🌸 Gull Bano – A Garden of Love
### *A Romantic Botanical Tribute Website Crafted with Eternal Love*

> *"Her name means 'flower', and in my life's garden, she is the eternal bloom."*

A luxury, romantic, botanical personal tribute website for **Gull Bano**. Designed and engineered with HTML5, CSS3, and vanilla modern JavaScript (zero build step). It opens directly in any browser by double-clicking `index.html`.

---

## ✨ Signature Features & Botanical Effects

1. **🌸 Living Botanical Aesthetic**:
   - Soft, luxurious, botanical palette: Blush pink (`#F8C8DC`), Rose (`#E75480`), Deep magenta (`#A8325E`), Lavender (`#CDB4DB`), Cream (`#FFF8F0`), Sage green (`#A3B18A`), Gold accent (`#D4AF37`), and Dark plum (`#3D1F2E`).
   - Delicate watercolor and paper texture overlay.
   - Glassmorphism cards with frosted blur, soft shadows, and rounded corners (20–28px).
   - Rich SVG botanical illustrations: blooming roses, star jasmine, lavender, peonies, and golden vines.

2. **🍃 60 FPS Falling Petals Canvas**:
   - Smooth canvas simulation of drifting, tumbling pink and cream rose petals with organic wind sway.
   - Automatically pauses on tab blur / `visibilitychange` to conserve CPU and battery.

3. **✨ Cursor Sparkle & Petal Trail**:
   - Delicate petal sparkle trail that floats behind fine mouse pointers (automatically disabled on touch screens).

4. **🌿 Staggered Hero Bloom & Wind Sway**:
   - Interactive hero rose blooms open on page load with staggered petal expansion and sways gently in a continuous wind loop.
   - Clickable Easter egg: clicking the rose unleashes a 50-petal celebration shower!

5. **📜 10 Page Sections (in exact requested order)**:
   - **Navbar**: Sticky frosted glass on scroll, "Gull Bano" elegant script logo, smooth slide-in mobile menu.
   - **Hero**: Big animated heading with gold shimmer effect, typewriter subtitle (*"A flower in my life's garden 🌸"*), "Enter Her Garden" smooth-scroll button.
   - **About Her**: Circular/arch-framed portrait surrounded by an animated floral wreath and royal floral crest, heartfelt paragraph, and 6 botanical highlight fact cards (Name meaning, Favorite flower, Favorite colors, Superpower, Favorite food, Favorite season).
   - **Our Story (Timeline)**: Vertical timeline with flower markers; cards slide in alternately from left and right with milestones: *When Our Paths Crossed*, *Two Hearts One Soul (Our Wedding)*, *Laughter Under the Stars (Special Memory)*, and *Today & Into Eternity*.
   - **Gallery**: Responsive photo mosaic with floral hover frames, interactive lightbox with next/prev/close, keyboard arrows/Esc navigation, and mobile touch swipe.
   - **Why I Love You / Her Qualities**: 6 interactive 3D flip-cards with botanical icons (Kindness, Patience, Beauty, Strength, Love, Care).
   - **Love Letter**: Interactive 3D wax-seal envelope that breaks open on click, unfolding a handwritten letter on soft textured parchment.
   - **Wishes & Dua**: Heartfelt prayers presented in a gilded floral frame with authentic Arabic calligraphy, Urdu script (`Noto Nastaliq Urdu`), and English translation with full RTL (`dir="rtl"`) support.
   - **Special Counter**: Live "Days We've Been Together" counter (years, days, hours, minutes, seconds) updating every second, plus live countdown to the next celebration milestone.
   - **Contact / Footer**: Floral crest, "Forever yours ❤️", "Send Love" heart button with live counter and petal shower, and *"Made with love for Gull Bano"*.

6. **🌙 Day / Night Garden Modes**:
   - Switch between sunlit pastel watercolor garden and moonlit deep plum garden with firefly luminescence.

7. **🎵 Dual-Mode Ambient Music**:
   - Floating music button that plays your custom MP3 (`assets/audio/garden-ambient.mp3`) or seamlessly falls back to a built-in harmonic harp arpeggiator synthesized via the Web Audio API.

8. **🌸 Flower Back-to-Top Button**:
   - Smoothly glides back to the top of the garden with a burst of petals.

---

## 📁 File Structure

```text
test project/
├── index.html                  # Master HTML5 tribute document (can open directly)
├── css/
│   └── style.css               # Design system, CSS variables, keyframe animations, glassmorphism
├── js/
│   └── main.js                 # Botanical animation engine, petals canvas, audio, counters, lightbox
├── assets/
│   ├── images/
│   │   ├── gullbano.jpg        # Main portrait (replace with photo of Gull Bano)
│   │   ├── gullbano.svg        # Scalable botanical vector portrait placeholder
│   │   ├── gallery-1.jpg..6.jpg# Photo gallery memories (replace with your photos)
│   │   └── gallery-1.svg..6.svg# High-res SVG floral placeholders
│   └── audio/
│       ├── README.txt          # Instructions for adding background music
│       └── garden-ambient.mp3  # (Optional) Drop your romantic MP3 here
├── serve.js                    # Zero-dependency local Node static server
├── README.md                   # This master documentation
└── streetwear_store_backup/    # Safe backup of previous streetwear store files
```

---

## 🚀 How to Run the Website

### Option 1: Direct Double-Click (No Build Step Required!)
1. Open your file explorer to this directory.
2. Double-click **`index.html`**.
3. It opens instantly in your default web browser (Chrome, Safari, Edge, Firefox)!

### Option 2: Using the Included Node Server
```bash
node serve.js
```
Then open your browser to **`http://localhost:8080/`**.

### Option 3: Using Python
```bash
python -m http.server 8080
```

---

## 🎨 How to Personalize for Gull Bano

### 1. Replacing Her Photos
Drop your photos into the `assets/images/` directory:
- **`assets/images/gullbano.jpg`**: Her main portrait displayed inside the royal floral wreath in the *About Her* section.
- **`assets/images/gallery-1.jpg` through `gallery-6.jpg`**: Your favorite memories together shown in the photo gallery.

*(Note: High-quality illustrated SVG placeholders are included so the website renders beautifully even before adding custom photos!)*

### 2. Changing Dates & Names (`js/main.js`)
Open `js/main.js` and edit lines 11–35:
```javascript
const TRIBUTE_CONFIG = {
  // Your beloved wife's name
  partnerName: "Gull Bano",

  // The day your journey began (YYYY-MM-DD)
  togetherStartDate: "2023-04-14T00:00:00",

  // Next milestone (e.g. Next Wedding Anniversary or Her Birthday)
  nextCelebrationDate: "2027-04-14T00:00:00",
  celebrationTitle: "Next Wedding Anniversary",

  // Typewriter phrases in the hero section
  typewriterPhrases: [
    "A flower in my life's garden 🌸",
    "My heart's quiet serenity & peace 🕊️",
    "The sweetest fragrance in all my days 🌷",
    "My beloved wife, my eternal home 💖"
  ]
};
```

### 3. Adding Your Romantic Song
Save your audio file as:
- `assets/audio/garden-ambient.mp3`

*(If you don't add an MP3, the site automatically generates a soothing harmonic acoustic harp chord progression using the Web Audio API!)*

### 4. Customizing Text, Milestones & Love Letter
Open `index.html`:
- **Our Story**: Search for `id="story"` and edit the milestone dates and descriptions.
- **Love Letter**: Search for `id="letter"` and personalize the handwritten love letter with your own words.
- **Facts**: Search for `facts-grid` to adjust her favorite flower, colors, and food.

---

## 🌐 How to Deploy for Free

### Method A: Netlify Drop (Fastest – 30 seconds)
1. Go to [Netlify Drop](https://app.netlify.com/drop).
2. Drag and drop this entire project folder into the browser.
3. Your tribute website is live instantly with free HTTPS to share with Gull Bano!

### Method B: GitHub Pages
1. Create a repository on [GitHub](https://github.com/).
2. Push or upload these files (`index.html`, `css/`, `js/`, `assets/`).
3. In your repo, go to **Settings** > **Pages** > Branch: **`main`** / Folder: **`/(root)`** > Click **Save**.
4. Your website will be live at `https://<your-username>.github.io/<repo-name>/`.

---

## 📱 Responsiveness & Standards
- **Breakpoints**: 320px (Mobile SE), 480px, 768px (Tablet), 1024px (Laptop), 1440px+ (4K Desktop).
- **Reduced Motion**: Respects `prefers-reduced-motion` to tone down animations for sensitive users.
- **Semantic & Accessible**: Full ARIA labels, semantic landmark tags, and high-contrast night/day modes.
- **Zero Console Errors**: Clean vanilla JavaScript architecture.

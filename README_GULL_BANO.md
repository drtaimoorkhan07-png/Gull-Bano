# 🌸 Gull Bano – A Garden of Love
### *A Personal Romantic Botanical Tribute Website*

> *"Her name means 'flower', and in my life's garden, she is the eternal bloom."*

---

## ✨ Features & Highlights

- **🌸 Living Botanical Aesthetic**: Custom botanical color palette (blush pink, soft rose, gold shimmer, deep magenta, lavender, and sage green) with delicate glassmorphism and floral SVG artwork.
- **🍃 60fps Falling Petals Canvas**: Smooth, physics-based tumbling rose petals with wind drift that automatically pauses when the browser tab is hidden to conserve battery and CPU.
- **✨ Cursor Sparkle & Petal Trail**: Interactive floating floral trail following mouse movements (automatically disabled on mobile/touch devices).
- **💌 Interactive Wax-Seal Love Letter**: Click the 3D wax seal to break the seal, unfold the envelope flap, and slide out a heartfelt handwritten letter on vintage deckle-edge paper.
- **✨ Her Qualities Flip-Cards**: 6 interactive 3D flip-cards with floral icons (Kindness, Patience, Beauty, Strength, Love, Care) that rotate on click or hover.
- **🖼️ Photo Mosaic Gallery & Lightbox**: Responsive photo grid with hover floral frames, full-screen lightbox with navigation, keyboard arrow/Esc controls, and touch swipe gestures for mobile.
- **🤲 Sacred Wishes & Bilingual Dua**: Bilingual presentation in English and authentic Quranic/Urdu calligraphy with full Right-to-Left (`dir="rtl"`) support.
- **⏳ Real-time Live Counters**:
  - Live "Days We've Been Together" counter updating years, days, hours, minutes, and seconds every single second.
  - Live countdown to your next anniversary or her birthday.
- **🌙 Day / Night Garden Modes**: Switch between sunlit pastel watercolor and moonlit deep plum garden with glowing floral luminescence and fireflies.
- **🎵 Dual-Mode Ambient Music**: Floating audio player that plays your custom MP3 or seamlessly falls back to a built-in soothing Web Audio harmonic harp arpeggiator.
- **💖 Celebration Shower Easter Eggs**: Click the hero rose or the "Send Love" heart button to unleash an eruption of floating petals and hearts.

---

## 🚀 How to Run the Website

### Option 1: Direct Double-Click (No Build Step Required!)
Because this project is built with standard HTML5, CSS3, and vanilla JavaScript:
1. Open your file explorer to this folder.
2. Double-click `index.html`.
3. It opens directly in Chrome, Safari, Edge, or Firefox!

### Option 2: Run with a Local Server
If you prefer running a local development server:
```bash
# Using Node.js (npx serve)
npx serve .

# OR using Python (if installed)
python -m http.server 3000
```
Then visit `http://localhost:3000` in your browser.

---

## 🎨 How to Customize Content

### 1. Replacing Photos
Drop your photos into the `assets/images/` folder:
- **`assets/images/gullbano.jpg`**: Main portrait of Gull Bano (shown in the circular floral wreath under the About section).
- **`assets/images/gallery-1.jpg` through `gallery-6.jpg`**: Photos for the memory gallery.

*Note: High-quality SVG placeholders are already active in case any photo is missing, so there are never broken image icons!*

### 2. Changing Dates & Config (`js/main.js`)
Open `js/main.js` and edit the configuration object at lines 11–32:
```javascript
const TRIBUTE_CONFIG = {
  // Your beloved wife's name
  partnerName: "Gull Bano",

  // The day your journey began (YYYY-MM-DD)
  togetherStartDate: "2023-04-14T00:00:00",

  // Next celebration milestone (e.g. Next Wedding Anniversary or Her Birthday)
  nextCelebrationDate: "2027-04-14T00:00:00",
  celebrationTitle: "Next Wedding Anniversary",
  ...
};
```

### 3. Adding Background Music
Drop your favorite romantic audio track into:
- `assets/audio/garden-ambient.mp3`

*(If no file is provided, the website automatically synthesizes a gentle romantic acoustic harp melody via Web Audio!)*

### 4. Customizing Text & Story Milestones
Open `index.html`:
- **Our Story**: Search for `id="story"` and edit the dates, titles, and stories for when you met, your wedding day, and favorite memories.
- **Love Letter**: Search for `id="letter"` and personalize the love letter text.
- **Facts**: Search for `facts-grid` to change favorite flower, color, or treat.

---

## 🌐 How to Deploy for Free

### Method A: Netlify (Easiest – 60 Seconds)
1. Go to [Netlify Drop](https://app.netlify.com/drop).
2. Drag and drop this entire project folder into the browser window.
3. Your site is instantly live with a free SSL link to share with Gull Bano!

### Method B: GitHub Pages
1. Create a free repository on [GitHub](https://github.com/).
2. Upload these files (`index.html`, `css/`, `js/`, `assets/`).
3. Go to **Settings** > **Pages** > Select `main` branch > Click **Save**.
4. Your website will be live at `https://<your-username>.github.io/<repo-name>/`.

### Method C: Vercel
1. Run `npx vercel` in this folder or connect your GitHub repository to [Vercel](https://vercel.com).
2. Deploy with zero configuration.

---

## 📱 Mobile & Browser Compatibility
- Tested and responsive across **320px (iPhone SE)**, **480px (mobile)**, **768px (iPad/Tablet)**, **1024px (Laptop)**, and **4K Desktop**.
- Respects `prefers-reduced-motion` for accessibility.
- Works flawlessly across Chrome, Edge, Safari, and Firefox.


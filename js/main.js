/**
 * ============================================================================
 * GULL BANO – A GARDEN OF LOVE
 * Interactive Script & Botanical Animation Engine
 * ============================================================================
 */

/* ============================================================================
   USER CONFIGURATION – CUSTOMIZE YOUR DATES & DETAILS HERE
   ============================================================================ */
const TRIBUTE_CONFIG = {
  // Your beloved wife's name
  partnerName: "Gull Bano",

  // The day your journey began (YYYY-MM-DD or full ISO date string)
  // Edit this to your actual anniversary or meeting date!
  togetherStartDate: "2023-04-14T00:00:00",

  // Next celebration milestone (e.g. Next Wedding Anniversary or Her Birthday)
  nextCelebrationDate: "2027-04-14T00:00:00",
  celebrationTitle: "Next Wedding Anniversary",

  // Typewriter rotating tributes in the hero section
  typewriterPhrases: [
    "A flower in my life's garden 🌸",
    "My heart's quiet serenity & peace 🕊️",
    "The sweetest fragrance in all my days 🌷",
    "My beloved wife, my eternal home 💖",
    "Grace, kindness, and beauty in full bloom ✨"
  ],

  // Background music audio file location (optional)
  // If no file exists, the built-in Web Audio romantic harp synthesizer plays automatically!
  audioFile: "assets/audio/garden-ambient.mp3"
};

/* ============================================================================
   INITIALIZATION ON DOM READY
   ============================================================================ */
document.addEventListener("DOMContentLoaded", () => {
  initPreloader();
  initPetalCanvas();
  initCursorTrail();
  initTypewriter();
  initNavigation();
  initThemeToggle();
  initCounters();
  initLoveLetter();
  initFlipCards();
  initGalleryLightbox();
  initAudioSystem();
  initCelebrationShower();
  initHoverPetals();
  initBackToTop();
  initScrollAnimations();
});

/* ============================================================================
   1. PRELOADER
   ============================================================================ */
function initPreloader() {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;

  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.classList.add("fade-out");
      setTimeout(() => {
        preloader.remove();
      }, 800);
    }, 600);
  });

  // Safety fallback if load event already fired or delayed
  setTimeout(() => {
    if (preloader && !preloader.classList.contains("fade-out")) {
      preloader.classList.add("fade-out");
    }
  }, 2500);
}

/* ============================================================================
   2. FALLING PETALS CANVAS ENGINE (60 FPS, Soft Physics, Tab-Aware)
   ============================================================================ */
function initPetalCanvas() {
  const canvas = document.getElementById("petals-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Petal color palettes (Blush pink, soft rose, cream, gold shimmer)
  const petalColors = [
    { r: 248, g: 200, b: 220, a: 0.75 }, // Blush pink
    { r: 231, g: 84,  b: 128, a: 0.65 }, // Rose
    { r: 255, g: 248, b: 240, a: 0.7  }, // Cream
    { r: 205, g: 180, b: 219, a: 0.65 }, // Lavender
    { r: 247, g: 231, b: 180, a: 0.6  }  // Soft gold
  ];

  const totalPetals = window.innerWidth < 768 ? 26 : 45;
  const petals = [];

  class Petal {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -20 - Math.random() * 50;
      this.size = Math.random() * 12 + 10;
      this.speedY = Math.random() * 1.2 + 0.8;
      this.speedX = Math.random() * 0.8 - 0.4;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = (Math.random() - 0.5) * 1.5;
      this.flip = Math.random() * 360;
      this.flipSpeed = Math.random() * 1.8 + 0.8;
      this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
      this.swayAngle = Math.random() * Math.PI * 2;
      this.swaySpeed = Math.random() * 0.02 + 0.01;
    }

    update() {
      this.swayAngle += this.swaySpeed;
      this.x += Math.sin(this.swayAngle) * 0.7 + this.speedX;
      this.y += this.speedY;
      this.rotation += this.rotationSpeed;
      this.flip += this.flipSpeed;

      // Recycle when falling past screen
      if (this.y > height + 30 || this.x < -30 || this.x > width + 30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.scale(Math.sin((this.flip * Math.PI) / 180), 1);

      ctx.beginPath();
      // Draw organic petal teardrop shape
      ctx.moveTo(0, -this.size);
      ctx.bezierCurveTo(
        this.size * 0.9, -this.size * 0.8,
        this.size * 1.1, this.size * 0.5,
        0, this.size
      );
      ctx.bezierCurveTo(
        -this.size * 1.1, this.size * 0.5,
        -this.size * 0.9, -this.size * 0.8,
        0, -this.size
      );

      ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.color.a})`;
      ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0.3)`;
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.closePath();
      ctx.restore();
    }
  }

  for (let i = 0; i < totalPetals; i++) {
    petals.push(new Petal());
  }

  let animationFrameId;
  let isPaused = false;

  function render() {
    if (!isPaused) {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < petals.length; i++) {
        petals[i].update();
        petals[i].draw();
      }
    }
    animationFrameId = requestAnimationFrame(render);
  }

  render();

  // Pause when tab is inactive to preserve CPU / battery
  document.addEventListener("visibilitychange", () => {
    isPaused = document.hidden;
  });
}

/* ============================================================================
   3. CURSOR SPARKLE & PETAL TRAIL (Fine pointer only)
   ============================================================================ */
function initCursorTrail() {
  if (!window.matchMedia("(pointer: fine)").matches) return;

  const colors = ["#F8C8DC", "#E75480", "#D4AF37", "#CDB4DB", "#FFF8F0"];
  let lastMove = 0;

  window.addEventListener("mousemove", (e) => {
    const now = performance.now();
    if (now - lastMove < 35) return; // Throttle to 30fps
    lastMove = now;

    const sparkle = document.createElement("div");
    sparkle.className = "cursor-sparkle";
    const size = Math.random() * 8 + 6;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const dx = (Math.random() - 0.5) * 40;
    const dy = Math.random() * 25 + 10;

    sparkle.style.width = `${size}px`;
    sparkle.style.height = `${size}px`;
    sparkle.style.left = `${e.clientX}px`;
    sparkle.style.top = `${e.clientY}px`;
    sparkle.style.backgroundColor = color;
    sparkle.style.boxShadow = `0 0 10px ${color}`;
    sparkle.style.setProperty("--dx", `${dx}px`);
    sparkle.style.setProperty("--dy", `${dy}px`);

    document.body.appendChild(sparkle);

    setTimeout(() => {
      sparkle.remove();
    }, 800);
  });
}

/* ============================================================================
   4. TYPEWRITER SUBTITLE
   ============================================================================ */
function initTypewriter() {
  const target = document.getElementById("hero-typewriter");
  if (!target) return;

  const phrases = TRIBUTE_CONFIG.typewriterPhrases;
  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typeSpeed = 70;
  const deleteSpeed = 35;
  const pauseEnd = 2400;

  function tick() {
    const currentPhrase = phrases[phraseIdx];

    if (isDeleting) {
      charIdx--;
      target.textContent = currentPhrase.substring(0, charIdx);
    } else {
      charIdx++;
      target.textContent = currentPhrase.substring(0, charIdx);
    }

    let delay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIdx === currentPhrase.length) {
      delay = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      delay = 400;
    }

    setTimeout(tick, delay);
  }

  tick();
}

/* ============================================================================
   5. NAVIGATION & MOBILE DRAWER
   ============================================================================ */
function initNavigation() {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger-btn");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Sticky blur on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile menu toggle
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
      const isExpanded = hamburger.classList.contains("active");
      hamburger.setAttribute("aria-expanded", isExpanded);
    });

    // Close when a link is clicked
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Active section indicator on scroll
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset;
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute("id");
      const link = document.querySelector(`.nav-link[href*="#${sectionId}"]`);
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((l) => l.classList.remove("active"));
        if (link) link.classList.add("active");
      }
    });
  });
}

/* ============================================================================
   6. DAY / NIGHT GARDEN MODE TOGGLE
   ============================================================================ */
function initThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const savedTheme = localStorage.getItem("gullbano_theme") || "day";

  if (savedTheme === "night") {
    document.documentElement.setAttribute("data-theme", "night");
    updateThemeIcon("night");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "night" ? "day" : "night";
      
      if (newTheme === "night") {
        document.documentElement.setAttribute("data-theme", "night");
      } else {
        document.documentElement.removeAttribute("data-theme");
      }
      
      localStorage.setItem("gullbano_theme", newTheme);
      updateThemeIcon(newTheme);
      triggerPetalBurst(window.innerWidth / 2, 80, 25);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === "night") {
      // Moon / Firefly icon
      themeIcon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor"/>`;
    } else {
      // Sun / Blossom icon
      themeIcon.innerHTML = `<circle cx="12" cy="12" r="5" fill="currentColor"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`;
    }
  }
}

/* ============================================================================
   7. LIVE "DAYS TOGETHER" COUNTER & ANNIVERSARY COUNTDOWN
   ============================================================================ */
function initCounters() {
  const startDate = new Date(TRIBUTE_CONFIG.togetherStartDate);
  const nextMilestone = new Date(TRIBUTE_CONFIG.nextCelebrationDate);

  const yearsEl = document.getElementById("count-years");
  const daysEl = document.getElementById("count-days");
  const hoursEl = document.getElementById("count-hours");
  const minsEl = document.getElementById("count-mins");
  const secsEl = document.getElementById("count-secs");

  const cdDaysEl = document.getElementById("cd-days");
  const cdHoursEl = document.getElementById("cd-hours");
  const cdMinsEl = document.getElementById("cd-mins");
  const cdSecsEl = document.getElementById("cd-secs");

  function update() {
    const now = new Date();

    // 1. Elapsed Time Since Together
    let diffMs = now - startDate;
    if (diffMs < 0) diffMs = 0;

    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const years = Math.floor(totalDays / 365.25);
    const remDays = Math.floor(totalDays % 365.25);
    const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diffMs / (1000 * 60)) % 60);
    const secs = Math.floor((diffMs / 1000) % 60);

    if (yearsEl) yearsEl.textContent = String(years).padStart(2, "0");
    if (daysEl) daysEl.textContent = String(remDays).padStart(2, "0");
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
    if (minsEl) minsEl.textContent = String(mins).padStart(2, "0");
    if (secsEl) secsEl.textContent = String(secs).padStart(2, "0");

    // 2. Countdown to Next Celebration
    let cdDiff = nextMilestone - now;
    if (cdDiff <= 0) {
      // Reached or passed: celebrate!
      if (cdDaysEl) cdDaysEl.textContent = "00";
      if (cdHoursEl) cdHoursEl.textContent = "00";
      if (cdMinsEl) cdMinsEl.textContent = "00";
      if (cdSecsEl) cdSecsEl.textContent = "00";
    } else {
      const cDays = Math.floor(cdDiff / (1000 * 60 * 60 * 24));
      const cHours = Math.floor((cdDiff / (1000 * 60 * 60)) % 24);
      const cMins = Math.floor((cdDiff / (1000 * 60)) % 60);
      const cSecs = Math.floor((cdDiff / 1000) % 60);

      if (cdDaysEl) cdDaysEl.textContent = String(cDays).padStart(2, "0");
      if (cdHoursEl) cdHoursEl.textContent = String(cHours).padStart(2, "0");
      if (cdMinsEl) cdMinsEl.textContent = String(cMins).padStart(2, "0");
      if (cdSecsEl) cdSecsEl.textContent = String(cSecs).padStart(2, "0");
    }
  }

  update();
  setInterval(update, 1000);
}

/* ============================================================================
   8. INTERACTIVE LOVE LETTER & WAX SEAL
   ============================================================================ */
function initLoveLetter() {
  const envelope = document.getElementById("letter-envelope");
  const flapTop = document.getElementById("envelope-flap-top");
  const waxSeal = document.getElementById("wax-seal");
  const letterPaper = document.getElementById("letter-paper");
  const closeBtn = document.getElementById("letter-close-btn");

  if (!envelope || !letterPaper) return;

  let isOpen = false;

  function openLetter(e) {
    if (isOpen) return;
    isOpen = true;

    // Trigger celebration petal explosion at seal location
    const rect = waxSeal ? waxSeal.getBoundingClientRect() : envelope.getBoundingClientRect();
    triggerPetalBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 40);

    if (flapTop) {
      flapTop.style.transform = "rotateX(180deg)";
      flapTop.style.zIndex = "1";
    }
    if (waxSeal) {
      waxSeal.style.opacity = "0";
      waxSeal.style.pointerEvents = "none";
    }

    setTimeout(() => {
      letterPaper.classList.add("open");
      letterPaper.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 400);
  }

  function closeLetter() {
    isOpen = false;
    letterPaper.classList.remove("open");

    setTimeout(() => {
      if (flapTop) {
        flapTop.style.transform = "rotateX(0deg)";
        flapTop.style.zIndex = "5";
      }
      if (waxSeal) {
        waxSeal.style.opacity = "1";
        waxSeal.style.pointerEvents = "auto";
      }
      envelope.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 300);
  }

  envelope.addEventListener("click", openLetter);
  if (waxSeal) waxSeal.addEventListener("click", openLetter);
  if (closeBtn) {
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeLetter();
    });
  }
}

/* ============================================================================
   9. HER QUALITIES – 3D INTERACTIVE FLIP CARDS
   ============================================================================ */
function initFlipCards() {
  const cards = document.querySelectorAll(".quality-card");

  cards.forEach((card) => {
    // Click or tap to toggle flip state
    card.addEventListener("click", (e) => {
      card.classList.toggle("flipped");
      const isFlipped = card.classList.contains("flipped");
      card.setAttribute("aria-expanded", isFlipped);

      const rect = card.getBoundingClientRect();
      triggerPetalBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 10);
    });

    // Keyboard support (Space / Enter)
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.classList.toggle("flipped");
      }
    });
  });
}

/* ============================================================================
   10. PHOTO GALLERY LIGHTBOX (Swipe, Keyboard, Zoom)
   ============================================================================ */
function initGalleryLightbox() {
  const modal = document.getElementById("gallery-lightbox");
  if (!modal) return;

  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxCount = document.getElementById("lightbox-count");
  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");

  const cards = document.querySelectorAll(".gallery-card");
  if (!cards.length) return;

  let currentIndex = 0;
  const galleryItems = Array.from(cards).map((card) => {
    const img = card.querySelector(".gallery-img");
    const title = card.querySelector(".gallery-caption-title")?.textContent || "Special Memory";
    return {
      src: img?.getAttribute("src") || "",
      alt: img?.getAttribute("alt") || "",
      title: title
    };
  });

  function showImage(index) {
    if (index < 0) index = galleryItems.length - 1;
    if (index >= galleryItems.length) index = 0;
    currentIndex = index;

    const item = galleryItems[currentIndex];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt;
    lightboxTitle.textContent = item.title;
    lightboxCount.textContent = `Photo ${currentIndex + 1} of ${galleryItems.length}`;
  }

  function openLightbox(index) {
    showImage(index);
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  cards.forEach((card, idx) => {
    card.addEventListener("click", () => openLightbox(idx));
  });

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  if (prevBtn) prevBtn.addEventListener("click", () => showImage(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => showImage(currentIndex + 1));

  // Close on backdrop click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeLightbox();
  });

  // Keyboard navigation
  window.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showImage(currentIndex - 1);
    if (e.key === "ArrowRight") showImage(currentIndex + 1);
  });

  // Touch Swipe for Mobile
  let touchStartX = 0;
  let touchEndX = 0;

  modal.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  modal.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const threshold = 50;
    if (touchEndX < touchStartX - threshold) {
      showImage(currentIndex + 1); // Swipe left = next
    } else if (touchEndX > touchStartX + threshold) {
      showImage(currentIndex - 1); // Swipe right = prev
    }
  }
}

/* ============================================================================
   11. DUAL-MODE AUDIO SYSTEM (Ambient File OR Web Audio Harp Synthesizer)
   ============================================================================ */
function initAudioSystem() {
  const toggleBtn = document.getElementById("audio-toggle");
  const statusLabel = document.getElementById("audio-status");
  if (!toggleBtn) return;

  let isPlaying = false;
  let audioElement = null;
  let synthInterval = null;
  let audioCtx = null;

  // Try creating standard audio element
  try {
    audioElement = new Audio(TRIBUTE_CONFIG.audioFile);
    audioElement.loop = true;
    audioElement.volume = 0.4;
  } catch (err) {
    audioElement = null;
  }

  // Web Audio Romantic Harp Arpeggiator Fallback
  function playHarpNote(freq, delaySec = 0) {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime + delaySec;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now);

    // Warm harmonics
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 2.3);
  }

  // Romantic acoustic chord progression (Cmaj9 - Am9 - Fmaj7 - Gsus4)
  const chordNotes = [
    [261.63, 329.63, 392.00, 493.88], // C, E, G, B
    [220.00, 261.63, 329.63, 392.00], // A, C, E, G
    [174.61, 220.00, 261.63, 329.63], // F, A, C, E
    [196.00, 261.63, 293.66, 392.00]  // G, C, D, G
  ];
  let chordIndex = 0;

  function startSynthesizer() {
    chordIndex = 0;
    playChordStep();
    synthInterval = setInterval(playChordStep, 3600);
  }

  function playChordStep() {
    const chord = chordNotes[chordIndex];
    chord.forEach((freq, idx) => {
      playHarpNote(freq, idx * 0.45);
      // Soft high octave chime
      if (idx === 3) playHarpNote(freq * 2, 1.8);
    });
    chordIndex = (chordIndex + 1) % chordNotes.length;
  }

  function stopSynthesizer() {
    if (synthInterval) {
      clearInterval(synthInterval);
      synthInterval = null;
    }
  }

  toggleBtn.addEventListener("click", () => {
    if (!isPlaying) {
      // Play Audio
      isPlaying = true;
      toggleBtn.classList.add("playing");
      if (statusLabel) statusLabel.textContent = "Music: On";

      // Try playing audio file first
      let playedFile = false;
      if (audioElement) {
        audioElement.play().then(() => {
          playedFile = true;
        }).catch(() => {
          // File not found or blocked: seamlessly activate harmonic harp synth!
          startSynthesizer();
        });
      } else {
        startSynthesizer();
      }
    } else {
      // Pause Audio
      isPlaying = false;
      toggleBtn.classList.remove("playing");
      if (statusLabel) statusLabel.textContent = "Music: Off";

      if (audioElement) audioElement.pause();
      stopSynthesizer();
    }
  });
}

/* ============================================================================
   12. INTERACTIVE CELEBRATION PETAL BURST / EASTER EGGS
   ============================================================================ */
function triggerPetalBurst(originX, originY, count = 35) {
  const colors = ["#F8C8DC", "#E75480", "#A8325E", "#CDB4DB", "#D4AF37", "#FFF8F0"];

  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.className = "cursor-sparkle";
    const size = Math.random() * 16 + 10;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 180 + 60;
    const dx = Math.cos(angle) * velocity;
    const dy = Math.sin(angle) * velocity + Math.random() * 80;

    p.style.width = `${size}px`;
    p.style.height = `${size * 1.3}px`;
    p.style.left = `${originX}px`;
    p.style.top = `${originY}px`;
    p.style.backgroundColor = color;
    p.style.borderRadius = "50% 50% 50% 0";
    p.style.boxShadow = `0 0 12px ${color}`;
    p.style.setProperty("--dx", `${dx}px`);
    p.style.setProperty("--dy", `${dy}px`);
    p.style.animationDuration = `${Math.random() * 0.6 + 0.8}s`;

    document.body.appendChild(p);

    setTimeout(() => {
      p.remove();
    }, 1400);
  }
}

function initCelebrationShower() {
  // 1. Hero blooming flower easter egg
  const heroFlower = document.getElementById("hero-bloom-flower");
  if (heroFlower) {
    heroFlower.addEventListener("click", (e) => {
      const rect = heroFlower.getBoundingClientRect();
      triggerPetalBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 50);
    });
  }

  // 2. Footer "Send Love" heart button
  const sendLoveBtn = document.getElementById("btn-send-love");
  const loveCountEl = document.getElementById("love-count");
  let loveCount = parseInt(localStorage.getItem("gullbano_love_count") || "1000", 10);

  if (loveCountEl) loveCountEl.textContent = loveCount.toLocaleString();

  if (sendLoveBtn) {
    sendLoveBtn.addEventListener("click", (e) => {
      loveCount++;
      if (loveCountEl) loveCountEl.textContent = loveCount.toLocaleString();
      localStorage.setItem("gullbano_love_count", loveCount);

      const rect = sendLoveBtn.getBoundingClientRect();
      triggerPetalBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 60);

      // Micro heart bounce
      sendLoveBtn.style.transform = "scale(1.15)";
      setTimeout(() => {
        sendLoveBtn.style.transform = "";
      }, 250);
    });
  }
}

/* ============================================================================
   13. BACK TO TOP BUTTON WITH SCROLL PROGRESS RING
   ============================================================================ */
function initBackToTop() {
  const btn = document.getElementById("back-to-top");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  });

  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    triggerPetalBurst(window.innerWidth - 60, window.innerHeight - 60, 20);
  });
}

/* ============================================================================
   13. CARD HOVER PETAL DRIFT EFFECT
   ============================================================================ */
function initHoverPetals() {
  if (!window.matchMedia("(pointer: fine)").matches) return;
  const cards = document.querySelectorAll(
    ".timeline-card, .quality-card, .portrait-card, .fact-card, .counter-box, .envelope"
  );
  let lastHover = 0;

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      const now = performance.now();
      if (now - lastHover < 350) return; // Gentle rate limit
      lastHover = now;
      const rect = card.getBoundingClientRect();
      triggerPetalBurst(rect.left + rect.width / 2, rect.top + 25, 6);
    });
  });
}

/* ============================================================================
   14. SCROLL-TRIGGERED BLOOMING & GSAP / INTERSECTION OBSERVER
   ============================================================================ */
function initScrollAnimations() {
  // Check if GSAP and ScrollTrigger are loaded via CDN
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    // Stagger timeline milestone cards: slide in alternately from left and right
    gsap.utils.toArray(".timeline-item").forEach((item, index) => {
      const isOdd = index % 2 === 0;
      const xOffset = window.innerWidth > 768 ? (isOdd ? -75 : 75) : -35;
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none none"
        },
        opacity: 0,
        x: xOffset,
        duration: 0.9,
        ease: "power2.out"
      });
    });

    // Scroll-triggered blooming of flowers & vines along section dividers
    gsap.utils.toArray(".floral-divider").forEach((divider) => {
      const icon = divider.querySelector(".floral-divider-icon");
      const lines = divider.querySelectorAll(".floral-divider-line");
      if (icon) {
        gsap.from(icon, {
          scrollTrigger: {
            trigger: divider,
            start: "top 90%",
            toggleActions: "play none none none"
          },
          scale: 0,
          rotation: -180,
          opacity: 0,
          duration: 1,
          ease: "back.out(2)"
        });
      }
      if (lines.length) {
        gsap.from(lines, {
          scrollTrigger: {
            trigger: divider,
            start: "top 90%",
            toggleActions: "play none none none"
          },
          scaleX: 0,
          duration: 1.1,
          ease: "power2.out"
        });
      }
    });

    // Portrait wreath blooming
    gsap.from(".floral-wreath-svg", {
      scrollTrigger: {
        trigger: ".about-portrait-wrapper",
        start: "top 80%",
        toggleActions: "play none none none"
      },
      scale: 0.88,
      rotation: -8,
      opacity: 0,
      duration: 1.2,
      ease: "power2.out"
    });

    // Parallax hero layers
    gsap.to(".parallax-flower-1", {
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 1
      },
      y: 120,
      rotation: 25
    });

    gsap.to(".parallax-flower-2", {
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 1.2
      },
      y: 90,
      rotation: -20
    });

  } else {
    // Graceful IntersectionObserver Fallback
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll(".timeline-card, .quality-card, .gallery-card, .counter-box").forEach((el) => {
      observer.observe(el);
    });
  }
}


/**
 * =============================================================================
 * LMAR K STREETWEAR — CENTRAL PRODUCT CATALOG
 * =============================================================================
 * Single source of truth for all store inventory.
 * To add or edit products, simply modify the array below.
 *
 * Product Schema:
 * - id: unique numeric ID
 * - name: product title
 * - slug: URL-friendly identifier
 * - category: 'shirts' | 't-shirts' | 'caps' | 'hoodies' | 'accessories'
 * - price: current selling price in PKR (Rs.)
 * - oldPrice: previous price for discount badge calculation (or null)
 * - sizes: available size array ['S', 'M', 'L', 'XL', 'XXL'] or ['Adjustable']
 * - colors: array of { name: string, hex: string }
 * - images: array of image URLs [0: primary, 1: hover/alt view, 2+: gallery]
 * - description: detailed product copy
 * - details: bullet points (fabric GSM, fit, care instructions)
 * - rating: customer review average (1.0 to 5.0)
 * - reviewsCount: total review count
 * - stock: inventory count (<5 displays low stock alert)
 * - tags: searchable tag pills
 * - isNew: boolean for "NEW" badge
 * - isSale: boolean for "SALE" badge
 * - isFeatured: boolean for homepage showcase
 * =============================================================================
 */

const LMAR_PRODUCTS = [
  // ==================== T-SHIRTS & SHIRTS ====================
  {
    id: 1,
    name: "Heavyweight Boxy Drop-Tee – Obsidian",
    slug: "heavyweight-boxy-drop-tee-obsidian",
    category: "t-shirts",
    price: 2499,
    oldPrice: 3299,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Obsidian Black", hex: "#121212" },
      { name: "Washed Slate", hex: "#475569" },
      { name: "Bone White", hex: "#F3F3EE" }
    ],
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Engineered from 280 GSM ultra-heavy combed cotton with a structured drop-shoulder drape. Designed for daily streetwear rotation with pre-shrunk anti-fade pigment dye.",
    details: [
      "280 GSM 100% Combed Compact Cotton",
      "Signature boxy silhouette with dropped shoulders",
      "Thick 1.25-inch high-ribbed crew neckline",
      "Pre-shrunk vintage enzyme wash",
      "Machine wash cold inside-out, tumble dry low"
    ],
    rating: 4.9,
    reviewsCount: 128,
    stock: 4,
    tags: ["Best Seller", "Heavyweight", "Oversized", "Drop-Shoulder"],
    isNew: true,
    isSale: true,
    isFeatured: true
  },
  {
    id: 2,
    name: "Architectural Oxford Button-Down",
    slug: "architectural-oxford-button-down",
    category: "shirts",
    price: 3899,
    oldPrice: 4899,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Crisp White", hex: "#FFFFFF" },
      { name: "Sky Chambray", hex: "#7AA2C8" },
      { name: "Midnight Navy", hex: "#0F1E36" }
    ],
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Modern street tailoring meets heritage prep. Cut with a relaxed boxy hem and structured collar that maintains its posture all day. Matte horn-effect buttons and minimal branding.",
    details: [
      "100% Premium Long-Staple Egyptian Cotton Oxford",
      "Relaxed modern fit, straight hem with side vents",
      "Reinforced collar stays & mother-of-pearl buttons",
      "Chest pocket with tonal minimal 'LM' embroidery",
      "Warm iron or steam recommended"
    ],
    rating: 4.8,
    reviewsCount: 94,
    stock: 12,
    tags: ["Classic", "Tailored", "Workwear", "Minimal"],
    isNew: false,
    isSale: true,
    isFeatured: true
  },
  {
    id: 3,
    name: "Raw Distressed Graphic Tee – 'DISTORTION'",
    slug: "raw-distressed-graphic-tee-distortion",
    category: "t-shirts",
    price: 2799,
    oldPrice: null,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Washed Charcoal", hex: "#262626" },
      { name: "Vintage White", hex: "#EDE8DD" }
    ],
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80"
    ],
    description: "An archival tribute to underground Tokyo rave culture. Features hand-distressed collar edges, tactile plastisol screen print, and our heavyweight 260 GSM single jersey base.",
    details: [
      "260 GSM Single Jersey Combed Cotton",
      "Cracked vintage screen print on chest & back",
      "Subtle collar grind and distressed hem detailing",
      "Relaxed skater cut",
      "Hand or delicate machine wash cold"
    ],
    rating: 5.0,
    reviewsCount: 76,
    stock: 3,
    tags: ["Graphic", "Heavyweight", "Vintage Wash", "Streetwear"],
    isNew: true,
    isSale: false,
    isFeatured: true
  },
  {
    id: 4,
    name: "Riviera Cuban Collar Linen Shirt",
    slug: "riviera-cuban-collar-linen-shirt",
    category: "shirts",
    price: 3699,
    oldPrice: 4299,
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Sand Beige", hex: "#D6C7B2" },
      { name: "Olive Moss", hex: "#556B2F" },
      { name: "Pitch Black", hex: "#111111" }
    ],
    images: [
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Breathable pure French linen tailored with an open camp collar and airy drape. Perfect for hot summer afternoons and coastal night outs.",
    details: [
      "100% Pure Normandy Flax Linen",
      "Relaxed camp/Cuban collar with loop button",
      "Natural shell buttons with cross-stitching",
      "Side hem split for effortless movement"
    ],
    rating: 4.7,
    reviewsCount: 52,
    stock: 8,
    tags: ["Linen", "Summer", "Cuban Collar", "Resort"],
    isNew: false,
    isSale: true,
    isFeatured: false
  },
  {
    id: 5,
    name: "Tactical Pique Heavyweight Polo",
    slug: "tactical-pique-heavyweight-polo",
    category: "shirts",
    price: 3299,
    oldPrice: 3899,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Military Olive", hex: "#3D4837" },
      { name: "Jet Black", hex: "#181818" },
      { name: "Heather Grey", hex: "#8E8E93" }
    ],
    images: [
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1625910513413-5a043c7ccfc6?w=800&auto=format&fit=crop&q=80"
    ],
    description: "A rugged reimagining of the polo shirt. Knitted from double-pique cotton with a structured zip placket and high-density rubberized LMAR K chest badge.",
    details: [
      "260 GSM Double-Knit Cotton Pique",
      "Matte gunmetal YKK zip collar closure",
      "Ribbed collar and cuffs with anti-curl reinforcement",
      "Rubberized matte micro-logo at left chest"
    ],
    rating: 4.8,
    reviewsCount: 68,
    stock: 15,
    tags: ["Polo", "Athletic", "Smart Casual", "Zip Placket"],
    isNew: false,
    isSale: true,
    isFeatured: false
  },

  // ==================== CAPS & HEADWEAR ====================
  {
    id: 6,
    name: "LMAR K 3D-Embroidered Pro Snapback",
    slug: "lmar-k-3d-embroidered-pro-snapback",
    category: "caps",
    price: 1999,
    oldPrice: 2499,
    sizes: ["Adjustable (One Size)"],
    colors: [
      { name: "Matte Black", hex: "#141414" },
      { name: "Racing Orange", hex: "#FF5A1F" },
      { name: "Forest Camo", hex: "#4B5320" }
    ],
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Our signature headwear staple. Structured 6-panel crown crafted with heavy acrylic wool blend, featuring high-density 3D puff embroidery of the iconic LMAR K crest.",
    details: [
      "80% Acrylic / 20% Wool Heavyweight Twill",
      "High-density 3D puff embroidery front logo",
      "Classic green under-visor for vintage authenticity",
      "Durable snapback closure with woven rear tab",
      "Internal moisture-wicking sweatband"
    ],
    rating: 4.9,
    reviewsCount: 215,
    stock: 6,
    tags: ["Best Seller", "Headwear", "Snapback", "Streetwear"],
    isNew: true,
    isSale: true,
    isFeatured: true
  },
  {
    id: 7,
    name: "Vintage Washed Unstructured Dad Cap",
    slug: "vintage-washed-unstructured-dad-cap",
    category: "caps",
    price: 1699,
    oldPrice: 2199,
    sizes: ["Adjustable (One Size)"],
    colors: [
      { name: "Washed Khaki", hex: "#C3B091" },
      { name: "Faded Sage", hex: "#77815C" },
      { name: "Washed Black", hex: "#292929" }
    ],
    images: [
      "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Relaxed low-profile fit crafted from mineral-washed chino cotton. Features antique brass strap clasp and minimal tonal embroidery on the side panel.",
    details: [
      "100% Washed Chino Cotton Twill",
      "Unstructured 6-panel low crown profile",
      "Pre-curved visor with 8 rows of stitching",
      "Antique brass tri-glide buckle strap closure"
    ],
    rating: 4.8,
    reviewsCount: 143,
    stock: 19,
    tags: ["Dad Cap", "Vintage", "Minimal", "Adjustable"],
    isNew: false,
    isSale: true,
    isFeatured: true
  },
  {
    id: 8,
    name: "Tactical Mesh-Back Trucker Cap",
    slug: "tactical-mesh-back-trucker-cap",
    category: "caps",
    price: 1899,
    oldPrice: null,
    sizes: ["Adjustable (One Size)"],
    colors: [
      { name: "Black / Black Mesh", hex: "#1C1C1C" },
      { name: "White / Navy", hex: "#EAEAEA" }
    ],
    images: [
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Foam-backed polyester front panel paired with breathable nylon truck mesh. High-crown silhouette branded with our rubberized high-voltage hazard emblem.",
    details: [
      "Poly-foam front with breathable athletic rear mesh",
      "High-crown structured trucker profile",
      "Curved bill with double edge piping",
      "Snapback closure with ergonomic fit"
    ],
    rating: 4.7,
    reviewsCount: 88,
    stock: 11,
    tags: ["Trucker", "Mesh", "Breathable", "Summer"],
    isNew: true,
    isSale: false,
    isFeatured: false
  },
  {
    id: 9,
    name: "Reversible Utility Street Bucket Hat",
    slug: "reversible-utility-street-bucket-hat",
    category: "caps",
    price: 2199,
    oldPrice: 2699,
    sizes: ["S/M", "L/XL"],
    colors: [
      { name: "Stealth Black / Safety Orange", hex: "#181818" },
      { name: "Stone Grey / Olive", hex: "#7B7B7B" }
    ],
    images: [
      "https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Two aesthetics in one piece. Reverse from stealth ripstop black to electric safety orange within seconds. Fitted with side daisy chains for attaching utility gear.",
    details: [
      "Water-repellent tactical ripstop nylon blend",
      "Reversible 2-in-1 dual colorway construction",
      "Reinforced brim with multi-row topstitching",
      "Concealed breathable mesh eyelets"
    ],
    rating: 4.9,
    reviewsCount: 61,
    stock: 5,
    tags: ["Bucket Hat", "Reversible", "Techwear", "Water-Repellent"],
    isNew: true,
    isSale: true,
    isFeatured: true
  },
  {
    id: 10,
    name: "Ribbed Merino-Blend Street Beanie",
    slug: "ribbed-merino-blend-street-beanie",
    category: "caps",
    price: 1499,
    oldPrice: 1999,
    sizes: ["One Size"],
    colors: [
      { name: "Charcoal Marl", hex: "#333333" },
      { name: "Electric Orange", hex: "#FF5A1F" },
      { name: "Army Green", hex: "#424D37" }
    ],
    images: [
      "https://images.unsplash.com/photo-1618354691792-d1d42acfd860?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Chunky 7-gauge fisherman rib beanie with a fold-over cuff and woven silicone LMAR K label. Ultra-soft itch-free yarn that molds to your head shape.",
    details: [
      "50% Fine Merino Wool / 50% Anti-Pill Acrylic",
      "Heavyweight 7-gauge fisherman ribbed knit",
      "Adjustable fold-over cuff styling",
      "Thermal heat-retention weave"
    ],
    rating: 4.9,
    reviewsCount: 110,
    stock: 14,
    tags: ["Beanie", "Winter", "Merino", "Knit"],
    isNew: false,
    isSale: true,
    isFeatured: false
  },

  // ==================== HOODIES & JACKETS ====================
  {
    id: 11,
    name: "460 GSM Heavyweight French Terry Hoodie",
    slug: "460-gsm-heavyweight-french-terry-hoodie",
    category: "hoodies",
    price: 4999,
    oldPrice: 6499,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Washed Carbon", hex: "#1F1F1F" },
      { name: "Oatmeal Melange", hex: "#DDD7CE" },
      { name: "Electric Ochre", hex: "#D67A1D" }
    ],
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=80"
    ],
    description: "The holy grail of streetwear hoodies. Weighing an insane 460 GSM, this heavyweight French Terry hoodie stands on its own with zero slouching. Double-layered crossover hood and kangaroo pouch.",
    details: [
      "460 GSM 100% Combed Cotton French Terry",
      "Double-lined self-fabric hood (seamless no-drawstring aesthetic)",
      "Thick 2x2 elastane ribbing at cuffs and waist",
      "Overlock safety stitch on all seams for lifetime durability",
      "Pre-shrunk vintage stone washed"
    ],
    rating: 5.0,
    reviewsCount: 340,
    stock: 2,
    tags: ["Best Seller", "460 GSM", "Heavyweight", "Luxury Streetwear"],
    isNew: true,
    isSale: true,
    isFeatured: true
  },
  {
    id: 12,
    name: "Tactical Windbreaker Shell Jacket",
    slug: "tactical-windbreaker-shell-jacket",
    category: "hoodies",
    price: 4799,
    oldPrice: 5899,
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Matte Black", hex: "#151515" },
      { name: "Steel Grey / Ice", hex: "#636E72" }
    ],
    images: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Engineered for unpredictable city weather. Waterproof ripstop exterior with taped YKK zippers, storm flap collar, cinch bungee cords, and internal phone harness.",
    details: [
      "DWR Water-Repellent Ripstop Nylon",
      "Waterproof heat-welded YKK Aquaguard zips",
      "Adjustable bungee toggles at hood and hem",
      "Ventilated back yoke with moisture-wicking mesh"
    ],
    rating: 4.8,
    reviewsCount: 84,
    stock: 7,
    tags: ["Jackets", "Techwear", "Waterproof", "Outerwear"],
    isNew: true,
    isSale: true,
    isFeatured: true
  },
  {
    id: 13,
    name: "Oversized Minimalist Zip-Up Hoodie",
    slug: "oversized-minimalist-zip-up-hoodie",
    category: "hoodies",
    price: 4499,
    oldPrice: null,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Shadow Grey", hex: "#353839" },
      { name: "Off White", hex: "#FAF8F5" }
    ],
    images: [
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Two-way two-tone metal zip allows custom styling from the top or bottom. Clean drop shoulders with deep hand-warmer pockets.",
    details: [
      "400 GSM Heavy Brushed Fleece",
      "Heavy duty two-way custom gunmetal zipper",
      "Generous oversized boxy cut",
      "Subtle embossed tonal back logo"
    ],
    rating: 4.9,
    reviewsCount: 71,
    stock: 9,
    tags: ["Zip Hoodie", "Fleece", "Layering", "Minimal"],
    isNew: false,
    isSale: false,
    isFeatured: false
  },

  // ==================== ACCESSORIES ====================
  {
    id: 14,
    name: "Ballistic Nylon Crossbody Street Sling",
    slug: "ballistic-nylon-crossbody-street-sling",
    category: "accessories",
    price: 2699,
    oldPrice: 3499,
    sizes: ["One Size (4.5L)"],
    colors: [
      { name: "Tactical Black", hex: "#0E0E0E" },
      { name: "Coyote Tan", hex: "#8B7355" }
    ],
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Crafted from bullet-tough 1000D Cordura-grade ballistic nylon. Quick-release magnetic Fidlock-style buckle, waterproof zips, and padded tablet partition.",
    details: [
      "1000D Waterproof Ballistic Nylon",
      "Fidlock quick-release magnetic clasp",
      "3 zippered compartments with key tether",
      "Adjustable seatbelt-weave web strap"
    ],
    rating: 4.9,
    reviewsCount: 156,
    stock: 5,
    tags: ["Bag", "Crossbody", "Sling", "Tactical"],
    isNew: true,
    isSale: true,
    isFeatured: true
  },
  {
    id: 15,
    name: "Heavyweight Canvas Daily Tote Bag",
    slug: "heavyweight-canvas-daily-tote-bag",
    category: "accessories",
    price: 1899,
    oldPrice: 2299,
    sizes: ["One Size (18L)"],
    colors: [
      { name: "Raw Ecru Canvas", hex: "#F3EDE2" },
      { name: "Washed Jet Black", hex: "#1A1A1A" }
    ],
    images: [
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Built from industrial 16oz cotton duck canvas with reinforced cross-box handle stitching. Fits a 16-inch laptop with room for shoes, books, and daily essentials.",
    details: [
      "16oz Heavyweight Unbleached Cotton Duck Canvas",
      "Internal zippered security pocket for cards & keys",
      "Reinforced 1.5-inch wide shoulder carry straps",
      "Silk-screened typography motto: 'WEAR THE ATTITUDE'"
    ],
    rating: 4.7,
    reviewsCount: 92,
    stock: 16,
    tags: ["Tote", "Canvas", "Eco", "Everyday"],
    isNew: false,
    isSale: true,
    isFeatured: false
  },
  {
    id: 16,
    name: "Cushioned Streetwear Crew Socks (3-Pack)",
    slug: "cushioned-streetwear-crew-socks-3-pack",
    category: "accessories",
    price: 1299,
    oldPrice: 1699,
    sizes: ["US 7-12 / One Size"],
    colors: [
      { name: "Trio Pack (Black / White / Heather)", hex: "#2B2B2B" }
    ],
    images: [
      "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1582966772680-860e372bb558?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Maximum cushioning underfoot with ribbed calf support that stays up all day without pinching. Jacquard-knitted LMAR K typography down the rear calf.",
    details: [
      "80% Combed Cotton / 17% Polyester / 3% Spandex",
      "Terry loop heel and forefoot cushioning",
      "Seamless linked toe box prevents blister rubbing",
      "Engineered arch compression band"
    ],
    rating: 4.9,
    reviewsCount: 184,
    stock: 22,
    tags: ["Socks", "Accessories", "Essentials", "Pack"],
    isNew: true,
    isSale: true,
    isFeatured: false
  },
  {
    id: 17,
    name: "Matte Metal Logo Key Carabiner & Lanyard",
    slug: "matte-metal-logo-key-carabiner-lanyard",
    category: "accessories",
    price: 999,
    oldPrice: 1299,
    sizes: ["One Size"],
    colors: [
      { name: "Matte Stealth Black", hex: "#111111" },
      { name: "Safety Orange Webbing", hex: "#FF5A1F" }
    ],
    images: [
      "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Laser-engraved anodized zinc alloy carabiner clip mounted on heavy mil-spec woven nylon webbing. Never lose your keys again.",
    details: [
      "Anodized high-tensile zinc alloy clasp",
      "High-density Jacquard woven logo webbing",
      "Split stainless key ring and quick bottle-opener hook",
      "Total length: 18cm"
    ],
    rating: 4.8,
    reviewsCount: 65,
    stock: 25,
    tags: ["Keychain", "Carabiner", "Techwear", "Gift"],
    isNew: false,
    isSale: true,
    isFeatured: false
  },
  {
    id: 18,
    name: "Oversized Acid-Wash Acid Skull Tee",
    slug: "oversized-acid-wash-acid-skull-tee",
    category: "t-shirts",
    price: 2699,
    oldPrice: 3499,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Acid Oil Wash", hex: "#383B3E" },
      { name: "Acid Rust", hex: "#704838" }
    ],
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Every piece undergoes an individual mineral chemical bath for a 1-of-1 acid marble patina. Features cracked cyberpunk skull artwork printed with discharge ink.",
    details: [
      "270 GSM Heavyweight Jersey",
      "Unique acid marble wash on every garment",
      "Soft-hand breathable discharge graphic print",
      "Thick neck ribbing and dropped shoulder line"
    ],
    rating: 4.9,
    reviewsCount: 147,
    stock: 7,
    tags: ["Acid Wash", "Oversized", "Graphic", "Statement"],
    isNew: true,
    isSale: true,
    isFeatured: true
  },
  {
    id: 19,
    name: "Classic 5-Panel Street Camp Cap",
    slug: "classic-5-panel-street-camp-cap",
    category: "caps",
    price: 1899,
    oldPrice: null,
    sizes: ["Adjustable (One Size)"],
    colors: [
      { name: "Jet Black", hex: "#161616" },
      { name: "Sage Olive", hex: "#5C6B57" }
    ],
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Clean skater staple with a flat bill and square woven box logo label. Side brass eyelets provide steady airflow through hot city streets.",
    details: [
      "Durable water-resistant cotton nylon blend",
      "Low profile 5-panel camp cap geometry",
      "Flat square visor with reinforced stitching",
      "Nylon web strap with quick-release clip"
    ],
    rating: 4.8,
    reviewsCount: 97,
    stock: 14,
    tags: ["5-Panel", "Camp Cap", "Skate", "Minimal"],
    isNew: false,
    isSale: false,
    isFeatured: false
  },
  {
    id: 20,
    name: "Heavy Corduroy Overshirt Jacket",
    slug: "heavy-corduroy-overshirt-jacket",
    category: "shirts",
    price: 4299,
    oldPrice: 5299,
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Caramel Tan", hex: "#9E6D38" },
      { name: "Forest Emerald", hex: "#1F3D2F" },
      { name: "Pitch Black", hex: "#111111" }
    ],
    images: [
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Thick 8-wale plush corduroy jacket cut broad across the chest for seamless layering over t-shirts and hoodies. Twin utility flap chest pockets with horn buttons.",
    details: [
      "Heavy 8-Wale 100% Cotton Corduroy",
      "Dual button-down chest flap pockets",
      "Reinforced elbow patches & curved shirt-tail hem",
      "Lined collar band for non-chafing comfort"
    ],
    rating: 4.9,
    reviewsCount: 89,
    stock: 4,
    tags: ["Corduroy", "Overshirt", "Layering", "Heavyweight"],
    isNew: true,
    isSale: true,
    isFeatured: true
  }
];

// Helper functions for easy querying
function getProductById(id) {
  return LMAR_PRODUCTS.find(p => p.id === parseInt(id, 10)) || null;
}

function getProductsByCategory(category) {
  if (!category || category === "all") return LMAR_PRODUCTS;
  return LMAR_PRODUCTS.filter(p => p.category.toLowerCase() === category.toLowerCase());
}

function getFeaturedProducts(limit = 8) {
  return LMAR_PRODUCTS.filter(p => p.isFeatured).slice(0, limit);
}

function getNewArrivals(limit = 8) {
  return LMAR_PRODUCTS.filter(p => p.isNew).slice(0, limit);
}

function getSaleProducts(limit = 8) {
  return LMAR_PRODUCTS.filter(p => p.isSale).slice(0, limit);
}

// Currency formatter for Pakistan Rupee (Rs. 2,499)
function formatPKR(amount) {
  if (isNaN(amount) || amount === null || amount === undefined) return "Rs. 0";
  return "Rs. " + Number(amount).toLocaleString("en-PK");
}

// Export for module/vanilla window
if (typeof window !== "undefined") {
  window.LMAR_PRODUCTS = LMAR_PRODUCTS;
  window.getProductById = getProductById;
  window.getProductsByCategory = getProductsByCategory;
  window.getFeaturedProducts = getFeaturedProducts;
  window.getNewArrivals = getNewArrivals;
  window.getSaleProducts = getSaleProducts;
  window.formatPKR = formatPKR;
}


/**
 * =============================================================================
 * LMAR K STREETWEAR — CART, WISHLIST & CHECKOUT ENGINE
 * =============================================================================
 * Handles persistent state for Cart, Wishlist, Order history, and Coupons.
 * Integrates slide-out cart drawer, dynamic calculations, and WhatsApp order.
 * =============================================================================
 */

const LMAR_CONFIG = {
  FREE_SHIPPING_THRESHOLD: 2999,
  STANDARD_SHIPPING_FEE: 250,
  WHATSAPP_NUMBER: "923001234567", // Replace with store owner's WhatsApp number (with country code, no +)
  STORE_NAME: "LMAR K Streetwear",
  CURRENCY_SYMBOL: "Rs. "
};

class CartManager {
  constructor() {
    this.cartKey = "lmark_cart";
    this.wishlistKey = "lmark_wishlist";
    this.appliedCouponKey = "lmark_coupon";
    this.ordersKey = "lmark_orders";
    this.recentKey = "lmark_recent";

    this.coupons = {
      "LMARK10": { type: "percent", value: 10, label: "10% Welcome Discount" },
      "STREET20": { type: "percent", value: 20, label: "20% Streetwear Drop Sale" },
      "FREESHIP": { type: "shipping", value: 100, label: "Free Standard Delivery" }
    };

    this.cart = this.loadCart();
    this.wishlist = this.loadWishlist();
    this.appliedCoupon = this.loadCoupon();

    this.init();
  }

  init() {
    this.updateBadges();
    this.renderMiniCart();
    this.bindGlobalEvents();
  }

  // ==================== STORAGE HELPERS ====================
  loadCart() {
    try {
      const data = localStorage.getItem(this.cartKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Error loading cart:", e);
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem(this.cartKey, JSON.stringify(this.cart));
      this.updateBadges();
      this.renderMiniCart();
      window.dispatchEvent(new CustomEvent("lmark:cartUpdated", { detail: { cart: this.cart } }));
    } catch (e) {
      console.error("Error saving cart:", e);
    }
  }

  loadWishlist() {
    try {
      const data = localStorage.getItem(this.wishlistKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  saveWishlist() {
    try {
      localStorage.setItem(this.wishlistKey, JSON.stringify(this.wishlist));
      this.updateBadges();
      window.dispatchEvent(new CustomEvent("lmark:wishlistUpdated", { detail: { wishlist: this.wishlist } }));
    } catch (e) {
      console.error("Error saving wishlist:", e);
    }
  }

  loadCoupon() {
    try {
      const code = localStorage.getItem(this.appliedCouponKey);
      return code && this.coupons[code] ? { code, ...this.coupons[code] } : null;
    } catch (e) {
      return null;
    }
  }

  saveCoupon(couponObj) {
    if (couponObj) {
      localStorage.setItem(this.appliedCouponKey, couponObj.code);
      this.appliedCoupon = couponObj;
    } else {
      localStorage.removeItem(this.appliedCouponKey);
      this.appliedCoupon = null;
    }
    window.dispatchEvent(new CustomEvent("lmark:couponUpdated", { detail: { coupon: this.appliedCoupon } }));
  }

  // ==================== CART ACTIONS ====================
  addItem(productId, size = null, color = null, quantity = 1, openDrawer = true) {
    const product = window.getProductById ? window.getProductById(productId) : null;
    if (!product) {
      this.toast("Product not found", "error");
      return;
    }

    const chosenSize = size || (product.sizes && product.sizes.length ? product.sizes[0] : "One Size");
    const chosenColor = color || (product.colors && product.colors.length ? product.colors[0].name : "Standard");

    // Check if item with same ID, size, and color exists
    const existingIndex = this.cart.findIndex(
      item => item.id === product.id && item.size === chosenSize && item.color === chosenColor
    );

    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += quantity;
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: product.images[0],
        size: chosenSize,
        color: chosenColor,
        quantity: quantity
      });
    }

    this.saveCart();
    this.toast(`Added "${product.name}" (${chosenSize}) to cart!`, "success");
    this.animateCartBadge();

    if (openDrawer) {
      this.openCartDrawer();
    }
  }

  removeItem(index) {
    if (index >= 0 && index < this.cart.length) {
      const removed = this.cart.splice(index, 1)[0];
      this.saveCart();
      this.toast(`Removed "${removed.name}" from cart`, "info");
    }
  }

  updateQuantity(index, quantity) {
    if (index >= 0 && index < this.cart.length) {
      if (quantity <= 0) {
        this.removeItem(index);
      } else {
        this.cart[index].quantity = Math.min(10, Math.max(1, quantity));
        this.saveCart();
      }
    }
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  // ==================== WISHLIST ACTIONS ====================
  toggleWishlist(productId) {
    const id = parseInt(productId, 10);
    const index = this.wishlist.indexOf(id);
    const product = window.getProductById ? window.getProductById(id) : null;
    const name = product ? product.name : "Item";

    if (index > -1) {
      this.wishlist.splice(index, 1);
      this.saveWishlist();
      this.toast(`Removed "${name}" from wishlist`, "info");
      return false; // Removed
    } else {
      this.wishlist.push(id);
      this.saveWishlist();
      this.toast(`Saved "${name}" to wishlist!`, "success");
      return true; // Added
    }
  }

  isInWishlist(productId) {
    return this.wishlist.includes(parseInt(productId, 10));
  }

  // ==================== RECENTLY VIEWED ====================
  addRecentlyViewed(productId) {
    try {
      let recent = JSON.parse(localStorage.getItem(this.recentKey) || "[]");
      recent = recent.filter(id => id !== productId);
      recent.unshift(productId);
      if (recent.length > 8) recent = recent.slice(0, 8);
      localStorage.setItem(this.recentKey, JSON.stringify(recent));
    } catch (e) {
      // Ignore
    }
  }

  getRecentlyViewed() {
    try {
      return JSON.parse(localStorage.getItem(this.recentKey) || "[]");
    } catch (e) {
      return [];
    }
  }

  // ==================== CALCULATIONS ====================
  getSubtotal() {
    return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getShippingFee() {
    if (this.cart.length === 0) return 0;
    if (this.appliedCoupon && this.appliedCoupon.type === "shipping") return 0;
    const subtotal = this.getSubtotal();
    return subtotal >= LMAR_CONFIG.FREE_SHIPPING_THRESHOLD ? 0 : LMAR_CONFIG.STANDARD_SHIPPING_FEE;
  }

  getDiscountAmount() {
    if (!this.appliedCoupon) return 0;
    const subtotal = this.getSubtotal();
    if (this.appliedCoupon.type === "percent") {
      return Math.round((subtotal * this.appliedCoupon.value) / 100);
    }
    return 0;
  }

  getTotal() {
    const subtotal = this.getSubtotal();
    if (subtotal === 0) return 0;
    const shipping = this.getShippingFee();
    const discount = this.getDiscountAmount();
    return Math.max(0, subtotal + shipping - discount);
  }

  getItemCount() {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  applyCoupon(code) {
    const cleanCode = code ? code.trim().toUpperCase() : "";
    if (!cleanCode) {
      return { success: false, message: "Please enter a coupon code" };
    }
    if (this.coupons[cleanCode]) {
      this.saveCoupon({ code: cleanCode, ...this.coupons[cleanCode] });
      this.toast(`Coupon "${cleanCode}" applied successfully!`, "success");
      return { success: true, message: `Applied ${this.coupons[cleanCode].label}` };
    } else {
      return { success: false, message: "Invalid coupon code. Try 'LMARK10' or 'STREET20'" };
    }
  }

  removeCoupon() {
    this.saveCoupon(null);
    this.toast("Coupon removed", "info");
  }

  // ==================== BADGE UPDATES ====================
  updateBadges() {
    const cartCount = this.getItemCount();
    const wishlistCount = this.wishlist.length;

    document.querySelectorAll(".cart-count-badge").forEach(el => {
      el.textContent = cartCount;
      el.style.display = cartCount > 0 ? "inline-flex" : "none";
    });

    document.querySelectorAll(".wishlist-count-badge").forEach(el => {
      el.textContent = wishlistCount;
      el.style.display = wishlistCount > 0 ? "inline-flex" : "none";
    });

    // Update heart icons on cards if visible
    document.querySelectorAll("[data-wishlist-btn]").forEach(btn => {
      const pid = parseInt(btn.dataset.productId, 10);
      if (this.isInWishlist(pid)) {
        btn.classList.add("active");
        btn.setAttribute("aria-label", "Remove from Wishlist");
      } else {
        btn.classList.remove("active");
        btn.setAttribute("aria-label", "Add to Wishlist");
      }
    });
  }

  animateCartBadge() {
    document.querySelectorAll(".cart-count-badge").forEach(badge => {
      badge.classList.remove("bounce-anim");
      void badge.offsetWidth; // Trigger reflow
      badge.classList.add("bounce-anim");
    });
  }

  // ==================== MINI CART DRAWER ====================
  openCartDrawer() {
    const drawer = document.getElementById("cartDrawer");
    const overlay = document.getElementById("drawerOverlay");
    if (drawer && overlay) {
      this.renderMiniCart();
      drawer.classList.add("is-open");
      overlay.classList.add("is-open");
      document.body.style.overflow = "hidden";
    }
  }

  closeCartDrawer() {
    const drawer = document.getElementById("cartDrawer");
    const overlay = document.getElementById("drawerOverlay");
    if (drawer && overlay) {
      drawer.classList.remove("is-open");
      overlay.classList.remove("is-open");
      document.body.style.overflow = "";
    }
  }

  renderMiniCart() {
    const container = document.getElementById("miniCartItems");
    const subtotalEl = document.getElementById("miniCartSubtotal");
    const freeShippingBar = document.getElementById("freeShippingProgress");
    const freeShippingText = document.getElementById("freeShippingText");
    const checkoutBtn = document.getElementById("miniCartCheckoutBtn");

    if (!container) return;

    if (this.cart.length === 0) {
      container.innerHTML = `
        <div class="empty-cart-state">
          <div class="empty-icon"><i class="fa-solid fa-bag-shopping"></i></div>
          <h3>Your Bag is Empty</h3>
          <p>Explore the new season drop and level up your streetwear rotation.</p>
          <a href="shop.html" class="btn btn-primary btn-sm">Explore Collection</a>
        </div>
      `;
      if (subtotalEl) subtotalEl.textContent = "Rs. 0";
      if (freeShippingBar) freeShippingBar.style.width = "0%";
      if (freeShippingText) {
        freeShippingText.innerHTML = `Free shipping on orders over <strong>${window.formatPKR(LMAR_CONFIG.FREE_SHIPPING_THRESHOLD)}</strong>`;
      }
      if (checkoutBtn) {
        checkoutBtn.classList.add("disabled");
        checkoutBtn.setAttribute("disabled", "true");
      }
      return;
    }

    if (checkoutBtn) {
      checkoutBtn.classList.remove("disabled");
      checkoutBtn.removeAttribute("disabled");
    }

    const subtotal = this.getSubtotal();
    if (subtotalEl) subtotalEl.textContent = window.formatPKR(subtotal);

    // Free shipping calculation
    const progress = Math.min(100, Math.round((subtotal / LMAR_CONFIG.FREE_SHIPPING_THRESHOLD) * 100));
    if (freeShippingBar) freeShippingBar.style.width = `${progress}%`;
    if (freeShippingText) {
      if (subtotal >= LMAR_CONFIG.FREE_SHIPPING_THRESHOLD) {
        freeShippingText.innerHTML = `🎉 <strong>Congratulations!</strong> You've unlocked <strong>FREE Delivery</strong>!`;
      } else {
        const remaining = LMAR_CONFIG.FREE_SHIPPING_THRESHOLD - subtotal;
        freeShippingText.innerHTML = `Add <strong>${window.formatPKR(remaining)}</strong> more to claim <strong>FREE Delivery</strong>!`;
      }
    }

    // Render items
    container.innerHTML = this.cart.map((item, idx) => `
      <div class="mini-cart-item" data-index="${idx}">
        <div class="mini-cart-thumb">
          <img src="${item.image}" alt="${item.name}" loading="lazy">
        </div>
        <div class="mini-cart-info">
          <h4 class="mini-cart-title">
            <a href="product.html?id=${item.id}">${item.name}</a>
          </h4>
          <div class="mini-cart-meta">
            <span class="meta-pill">Size: ${item.size}</span>
            <span class="meta-pill">${item.color}</span>
          </div>
          <div class="mini-cart-price">${window.formatPKR(item.price)}</div>
          <div class="mini-cart-controls">
            <div class="qty-stepper">
              <button type="button" class="qty-btn minus" data-action="decrease" data-index="${idx}" aria-label="Decrease quantity">
                <i class="fa-solid fa-minus"></i>
              </button>
              <span class="qty-num">${item.quantity}</span>
              <button type="button" class="qty-btn plus" data-action="increase" data-index="${idx}" aria-label="Increase quantity">
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
            <button type="button" class="mini-cart-remove" data-action="remove" data-index="${idx}" aria-label="Remove item">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </div>
      </div>
    `).join("");

    // Attach listeners
    container.querySelectorAll("[data-action='increase']").forEach(btn => {
      btn.onclick = () => {
        const idx = parseInt(btn.dataset.index, 10);
        this.updateQuantity(idx, this.cart[idx].quantity + 1);
      };
    });

    container.querySelectorAll("[data-action='decrease']").forEach(btn => {
      btn.onclick = () => {
        const idx = parseInt(btn.dataset.index, 10);
        this.updateQuantity(idx, this.cart[idx].quantity - 1);
      };
    });

    container.querySelectorAll("[data-action='remove']").forEach(btn => {
      btn.onclick = () => {
        const idx = parseInt(btn.dataset.index, 10);
        this.removeItem(idx);
      };
    });
  }

  // ==================== GLOBAL EVENT LISTENERS ====================
  bindGlobalEvents() {
    // Open cart drawer triggers
    document.querySelectorAll("[data-open-cart]").forEach(el => {
      el.addEventListener("click", e => {
        e.preventDefault();
        this.openCartDrawer();
      });
    });

    // Close cart drawer triggers
    document.querySelectorAll("[data-close-cart]").forEach(el => {
      el.addEventListener("click", e => {
        e.preventDefault();
        this.closeCartDrawer();
      });
    });

    const overlay = document.getElementById("drawerOverlay");
    if (overlay) {
      overlay.addEventListener("click", () => this.closeCartDrawer());
    }

    // Escape key closes drawers and modals
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") {
        this.closeCartDrawer();
      }
    });

    // Delegated Quick Add and Wishlist clicks
    document.addEventListener("click", e => {
      const quickAddBtn = e.target.closest("[data-quick-add]");
      if (quickAddBtn) {
        e.preventDefault();
        const pid = parseInt(quickAddBtn.dataset.quickAdd, 10);
        this.addItem(pid, null, null, 1, true);
        return;
      }

      const wishlistBtn = e.target.closest("[data-wishlist-btn]");
      if (wishlistBtn) {
        e.preventDefault();
        const pid = parseInt(wishlistBtn.dataset.productId, 10);
        this.toggleWishlist(pid);
        return;
      }
    });
  }

  // ==================== ORDER / CHECKOUT ====================
  saveOrder(orderData) {
    try {
      const orders = JSON.parse(localStorage.getItem(this.ordersKey) || "[]");
      orders.unshift(orderData);
      localStorage.setItem(this.ordersKey, JSON.stringify(orders));
      return true;
    } catch (e) {
      console.error("Failed to save order:", e);
      return false;
    }
  }

  getOrders() {
    try {
      return JSON.parse(localStorage.getItem(this.ordersKey) || "[]");
    } catch (e) {
      return [];
    }
  }

  /**
   * Generates a pre-filled direct WhatsApp ordering link
   */
  generateWhatsAppLink(orderData) {
    const itemsText = orderData.items.map((item, i) =>
      `${i + 1}. *${item.name}* | Size: ${item.size} | Color: ${item.color} | Qty: ${item.quantity} | ${window.formatPKR(item.price * item.quantity)}`
    ).join("\n");

    const message = `*🔥 NEW ORDER — LMAR K STREETWEAR*\n` +
      `*Order ID:* ${orderData.orderId}\n` +
      `*Date:* ${new Date(orderData.date).toLocaleString()}\n\n` +
      `*CUSTOMER DETAILS:*\n` +
      `👤 Name: ${orderData.customer.name}\n` +
      `📞 Phone: ${orderData.customer.phone}\n` +
      `📍 City: ${orderData.customer.city}\n` +
      `🏠 Address: ${orderData.customer.address}\n` +
      `💬 Notes: ${orderData.customer.notes || "None"}\n\n` +
      `*ORDER SUMMARY:*\n${itemsText}\n\n` +
      `Subtotal: ${window.formatPKR(orderData.subtotal)}\n` +
      `Shipping: ${orderData.shipping === 0 ? "FREE" : window.formatPKR(orderData.shipping)}\n` +
      (orderData.discount > 0 ? `Discount: -${window.formatPKR(orderData.discount)}\n` : "") +
      `*TOTAL PAYABLE:* ${window.formatPKR(orderData.total)}\n` +
      `*PAYMENT METHOD:* ${orderData.paymentMethod.toUpperCase()}\n\n` +
      `_Please confirm my order and share dispatch tracking details. Thank you!_`;

    return `https://wa.me/${LMAR_CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  // ==================== TOAST NOTIFICATIONS ====================
  toast(message, type = "success") {
    let container = document.getElementById("toastContainer");
    if (!container) {
      container = document.createElement("div");
      container.id = "toastContainer";
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast-item toast-${type}`;

    let icon = "fa-circle-check";
    if (type === "error") icon = "fa-circle-exclamation";
    if (type === "info") icon = "fa-circle-info";

    toast.innerHTML = `
      <i class="fa-solid ${icon}"></i>
      <div class="toast-message">${message}</div>
      <button type="button" class="toast-close" aria-label="Dismiss">&times;</button>
    `;

    container.appendChild(toast);

    toast.querySelector(".toast-close").addEventListener("click", () => {
      toast.classList.add("fade-out");
      setTimeout(() => toast.remove(), 300);
    });

    // Auto dismiss after 3.8s
    setTimeout(() => {
      if (toast.parentElement) {
        toast.classList.add("fade-out");
        setTimeout(() => toast.remove(), 300);
      }
    }, 3800);
  }
}

// Instantiate global cart engine
if (typeof window !== "undefined") {
  window.cartManager = new CartManager();
}


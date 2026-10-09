"use strict";

/*
 * OTR Perfumes - Luxury Fragrance Experience & WhatsApp Ordering
 */

// Global Configuration
const DEFAULT_WHATSAPP_NUMBER = "201012345678";
const FREE_DELIVERY_THRESHOLD = 1500;
const DELIVERY_FEE = 60;
const MAX_QUANTITY = 99;

// Coupons registry
const AVAILABLE_COUPONS = {
    "OTR10": { type: "percent", value: 10, label: "خصم 10% على المشتريات" },
    "VIP50": { type: "fixed", value: 50, label: "خصم 50 ج.م" },
    "FREE":  { type: "free_shipping", value: 0, label: "شحن مجاني لكافة الطلبات" }
};

// Enriched Products Catalog
const products = [
    {
        id: 1,
        name: "عود ملكي",
        category: "men",
        categoryName: "عطر رجالي نيش",
        rating: 4.9,
        reviews: 124,
        badge: "الأكثر مبيعًا",
        image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=85",
        concentration: "Extrait de Parfum (إكستري دي بارفان)",
        longevity: "14 - 18 ساعة",
        sillage: "ملكي وفواح جداً",
        description: "توليفة شرقية ملكية تعكس الفخامة والهيبة المطلقة، يمتزج فيها العود الكمبودي المعتق بأنقى نفحات الزعفران الكشميري والورد الطائفي ليمنحك حضوراً آسراً في كل مناسبة.",
        topNotes: "البرغموت الإيطالي، الزعفران الكشميري، الهيل الأخضر",
        heartNotes: "الورد الطائفي، البخور الملكي، خشب الأرز النقي",
        baseNotes: "العود الكمبودي المعتق، العنبر الرمادي، المسك، خشب الصندل",
        sizes: [
            { size: "50ml", label: "50 مل", price: 1250, oldPrice: 1450 },
            { size: "100ml", label: "100 مل", price: 1950, oldPrice: 2250 }
        ]
    },
    {
        id: 2,
        name: "مسك أبيض",
        category: "women",
        categoryName: "عطر نسائي فاخر",
        rating: 4.8,
        reviews: 86,
        badge: "اختيار مميز",
        image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=85",
        concentration: "Eau de Parfum (أو دو بارفان)",
        longevity: "10 - 12 ساعة",
        sillage: "هادئ وجذاب",
        description: "عبير نقي وناعم يفيض بالنظافة والأنوثة الرقيقة، مستوحى من نسمات الصباح الباكر وبياض الياسمين والمسك الحريري الفاخر لراحة تدوم طوال اليوم.",
        topNotes: "زهر البرتقال، الفريزيا البيضاء، الخوخ المخملي",
        heartNotes: "المسك الحريري، الياسمين الأبيض، زنبق الوادي",
        baseNotes: "المسك الأبيض الصافي، خشب الصندل، الفانيليا الهادئة",
        sizes: [
            { size: "50ml", label: "50 مل", price: 890, oldPrice: null },
            { size: "100ml", label: "100 مل", price: 1390, oldPrice: null }
        ]
    },
    {
        id: 3,
        name: "عنبر ليلي",
        category: "unisex",
        categoryName: "عطر مشترك للجنسين",
        rating: 4.7,
        reviews: 58,
        badge: "سحر المساء",
        image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=800&q=85",
        concentration: "Eau de Parfum Intense",
        longevity: "12 - 16 ساعة",
        sillage: "قوي وغامض",
        description: "عطر ليلي ساحر يجمع بين دفء العنبر وغموض التوابل الشرقية مع لمسة مخملية من الجلود وحبوب التونكا، صُمم خصيصاً للأمسيات الراقية والمناسبات الخاصة.",
        topNotes: "الفلفل الوردي، البرتقال المر، المندرين الإيطالي",
        heartNotes: "العنبر الداكن، الباتشولي، القرفة السيلانية",
        baseNotes: "حبوب التونكا، الجلد الأسود، اللابدانوم، الفانيليا المدغشقرية",
        sizes: [
            { size: "50ml", label: "50 مل", price: 1100, oldPrice: null },
            { size: "100ml", label: "100 مل", price: 1720, oldPrice: null }
        ]
    },
    {
        id: 4,
        name: "ورد شرقي",
        category: "women",
        categoryName: "عطر نسائي زهري",
        rating: 4.9,
        reviews: 73,
        badge: "عرض خاص",
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=85",
        concentration: "Eau de Parfum",
        longevity: "12 - 14 ساعة",
        sillage: "فواح ومميز",
        description: "باقة ملكية من أندر بتلات الورد الدمشقي مع لمسات توت العليق والعنبر الذهبي الدافئ، يمنحك تألقاً لا يقاوم وشعوراً دائماً بالانتعاش والجاذبية.",
        topNotes: "توت العليق، الورد الدمشقي، التوت البري",
        heartNotes: "الورد التركي، الجيرانيوم، البنفسج",
        baseNotes: "العود الخفيف، العنبر الذهبي، المسك، الباتشولي",
        sizes: [
            { size: "50ml", label: "50 مل", price: 950, oldPrice: 1100 },
            { size: "100ml", label: "100 مل", price: 1490, oldPrice: 1700 }
        ]
    },
    {
        id: 5,
        name: "خشب الصندل",
        category: "men",
        categoryName: "عطر رجالي خشبي",
        rating: 4.6,
        reviews: 41,
        badge: "جديد",
        image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=800&q=85",
        concentration: "Eau de Parfum",
        longevity: "12 - 15 ساعة",
        sillage: "أنيق ومركز",
        description: "توازن مذهل بين النقاء الخشبي والعمق الدخاني الهادئ، يمزج خشب الصندل الميسوري النادر مع الأرز والسوسن ليمنحك ثقة وأناقة تدوم طوال اليوم.",
        topNotes: "الهيل الأخضر، البرغموت، البابيروس",
        heartNotes: "خشب الصندل الميسوري، خشب الأرز الأطلسي، البنفسج",
        baseNotes: "الجلد، العنبر، السوسن، نجيل الهند",
        sizes: [
            { size: "50ml", label: "50 مل", price: 1350, oldPrice: null },
            { size: "100ml", label: "100 مل", price: 2100, oldPrice: null }
        ]
    },
    {
        id: 6,
        name: "زهرة الفانيليا",
        category: "women",
        categoryName: "عطر نسائي غني",
        rating: 4.8,
        reviews: 62,
        badge: "الأكثر طلباً",
        image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=800&q=85",
        concentration: "Eau de Parfum",
        longevity: "10 - 14 ساعة",
        sillage: "حلو ودافئ",
        description: "رائحة دافئة تغمرك بسحر فانيليا مدغشقر النقية ولمسات اللوز المحمص والأوركيد، يبعث على الراحة والسكينة ويمنحك حضوراً لطيفاً يأسر القلوب.",
        topNotes: "اللوز المحمص، الأوركيد، البرغموت المشرق",
        heartNotes: "فانيليا مدغشقر النقية، السكر المكرمل، الكاكاو الفاخر",
        baseNotes: "المسك الدافئ، حبوب التونكا، خشب الأرز الهادئ",
        sizes: [
            { size: "50ml", label: "50 مل", price: 990, oldPrice: null },
            { size: "100ml", label: "100 مل", price: 1550, oldPrice: null }
        ]
    },
    {
        id: 7,
        name: "أمبر كلاسيك",
        category: "unisex",
        categoryName: "عطر مشترك أرستقراطي",
        rating: 4.5,
        reviews: 29,
        badge: "كلاسيكي",
        image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=85",
        concentration: "Eau de Parfum",
        longevity: "11 - 13 ساعة",
        sillage: "منعش وأنيق",
        description: "توليفة أرستقراطية تجمع بين انتعاش الأعشاب العطرية ودفء بلورات العنبر الكلاسيكية، مناسب لجميع الأوقات والأجواء الرسمية واجتماعات العمل.",
        topNotes: "المريمية، الخزامى الجبلي، الليمون الصقلي",
        heartNotes: "العنبر البلوري، جوزة الطيب، زنبق الوادي",
        baseNotes: "نجيل الهند، طحلب البلوط، خشب الصندل",
        sizes: [
            { size: "50ml", label: "50 مل", price: 1150, oldPrice: null },
            { size: "100ml", label: "100 مل", price: 1790, oldPrice: null }
        ]
    },
    {
        id: 8,
        name: "ليذر نايت",
        category: "men",
        categoryName: "عطر رجالي كاريزمي",
        rating: 4.9,
        reviews: 91,
        badge: "فاخر",
        image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=85",
        concentration: "Extrait de Parfum",
        longevity: "14 - 16 ساعة",
        sillage: "كاريزمي وقوي",
        description: "تجسيد للفخامة والجرأة القيادية، يمتزج فيه الجلد الإيطالي الفاخر بنفحات توت العليق والزعفران والكشمير لأصحاب البصمة الواثقة في كل مكان.",
        topNotes: "الزعفران، توت العرعر، الجريب فروت",
        heartNotes: "الجلد الإيطالي، البنفسج الأسود، زهرة الأوسمانثوس",
        baseNotes: "نجيل الهند الهايتي، توت العليق، خشب الكشمير",
        sizes: [
            { size: "50ml", label: "50 مل", price: 1450, oldPrice: null },
            { size: "100ml", label: "100 مل", price: 2280, oldPrice: null }
        ]
    }
];

// Helper DOM selector
const $ = (selector) => document.querySelector(selector);

// DOM Elements
const productGrid = $("#productGrid");
const productTotal = $("#productTotal");
const searchInput = $("#searchInput");
const clearSearch = $("#clearSearch");
const sortSelect = $("#sortSelect");
const emptyMessage = $("#emptyMessage");

const cartDrawer = $("#cartDrawer");
const cartItems = $("#cartItems");
const cartCount = $("#cartCount");
const cartSubtotal = $("#cartSubtotal");
const discountRow = $("#discountRow");
const cartDiscount = $("#cartDiscount");
const deliveryCost = $("#deliveryCost");
const cartTotal = $("#cartTotal");
const deliveryProgress = $("#deliveryProgress");
const cartCouponInput = $("#cartCouponInput");
const applyCartCoupon = $("#applyCartCoupon");
const couponStatusMessage = $("#couponStatusMessage");

const productModal = $("#productModal");
const productModalContent = $("#productModalContent");
const closeProductModal = $("#closeProductModal");

const checkoutModal = $("#checkoutModal");
const checkoutForm = $("#checkoutForm");
const checkoutSummary = $("#checkoutSummary");
const checkoutError = $("#checkoutError");

const whatsappConfigModal = $("#whatsappConfigModal");
const whatsappConfigForm = $("#whatsappConfigForm");
const wpInput = $("#wpInput");
const editWhatsappBtn = $("#editWhatsappBtn");
const closeWpModal = $("#closeWpModal");
const whatsappDisplayNum = $("#whatsappDisplayNum");

const overlay = $("#overlay");
const toast = $("#toast");

// State Variables
let activeCategory = "all";
let favoritesOnly = false;
let cart = [];
let favorites = new Set();
let appliedCoupon = null;
let toastTimer = null;
let lastFocusedElement = null;

// Modal Active State
let currentModalProductId = null;
let currentModalSelectedSize = "50ml";
let currentModalQuantity = 1;

// Business WhatsApp Number
let whatsappNumber = readStorage("otrWhatsApp", DEFAULT_WHATSAPP_NUMBER);

// Helpers
function formatPrice(amount) {
    return new Intl.NumberFormat("ar-EG", {
        maximumFractionDigits: 0
    }).format(amount) + " ج.م";
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}

function getProduct(id) {
    return products.find(product => product.id === Number(id));
}

function getProductSizeInfo(product, sizeKey) {
    if (!product || !product.sizes) return null;
    return product.sizes.find(s => s.size === sizeKey) || product.sizes[0];
}

function readStorage(key, fallback) {
    try {
        const value = localStorage.getItem(key);
        return value === null ? fallback : JSON.parse(value);
    } catch {
        return fallback;
    }
}

function writeStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch {
        showToast("تعذر حفظ البيانات في الذاكرة المحلية.");
        return false;
    }
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.classList.remove("visible");
    }, 2800);
}

// WhatsApp Display Helper
function updateWhatsappUI() {
    if (whatsappDisplayNum) {
        whatsappDisplayNum.textContent = "+" + whatsappNumber.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, "$1 $2 $3 $4");
    }
}

// Restore Saved State
function restoreCart() {
    const saved = readStorage("otrCart", []);
    if (!Array.isArray(saved)) return [];

    return saved
        .filter(item =>
            item &&
            Number.isInteger(item.id) &&
            getProduct(item.id) &&
            Number.isInteger(item.quantity) &&
            item.quantity >= 1 &&
            item.quantity <= MAX_QUANTITY
        )
        .map(item => ({
            id: item.id,
            size: item.size || "50ml",
            quantity: item.quantity
        }));
}

function restoreFavorites() {
    const saved = readStorage("otrFavorites", []);
    if (!Array.isArray(saved)) return new Set();

    return new Set(
        saved.filter(id => Number.isInteger(id) && Boolean(getProduct(id)))
    );
}

function restoreCoupon() {
    const code = readStorage("otrCoupon", null);
    if (code && AVAILABLE_COUPONS[code]) {
        return code;
    }
    return null;
}

cart = restoreCart();
favorites = restoreFavorites();
appliedCoupon = restoreCoupon();
updateWhatsappUI();

// Catalog Filtering & Rendering
function getFilteredProducts() {
    const query = searchInput.value.trim().toLocaleLowerCase("ar");

    let result = products.filter(product => {
        const defaultSize = product.sizes[0];
        const onSale = defaultSize.oldPrice !== null;

        const matchesCategory =
            activeCategory === "all" ||
            (activeCategory === "sale"
                ? onSale
                : product.category === activeCategory);

        const matchesFavorites = !favoritesOnly || favorites.has(product.id);

        const searchableText = [
            product.name,
            product.categoryName,
            product.description,
            product.topNotes,
            product.heartNotes,
            product.baseNotes
        ].join(" ").toLocaleLowerCase("ar");

        const matchesSearch = !query || searchableText.includes(query);

        return matchesCategory && matchesFavorites && matchesSearch;
    });

    switch (sortSelect.value) {
        case "price-asc":
            result.sort((a, b) => a.sizes[0].price - b.sizes[0].price);
            break;
        case "price-desc":
            result.sort((a, b) => b.sizes[0].price - a.sizes[0].price);
            break;
        case "rating":
            result.sort((a, b) => b.rating - a.rating);
            break;
        case "name":
            result.sort((a, b) => a.name.localeCompare(b.name, "ar"));
            break;
        default:
            break;
    }

    return result;
}

function renderProducts() {
    const filtered = getFilteredProducts();

    productGrid.innerHTML = filtered.map(product => {
        const isFavorite = favorites.has(product.id);
        const defaultSize = product.sizes[0];
        const onSale = defaultSize.oldPrice !== null;
        const badgeClass = onSale ? "sale" : "";

        return `
            <article class="product-card" data-product-id="${product.id}">
                <div class="product-image" data-open-modal="${product.id}" title="عرض تفاصيل العطر">
                    <img
                        src="${product.image}"
                        alt="${escapeHTML(product.name)}"
                        loading="lazy"
                        decoding="async"
                    >

                    ${product.badge ? `
                        <span class="product-badge ${badgeClass}">
                            ${escapeHTML(product.badge)}
                        </span>
                    ` : ""}

                    <button
                        class="favorite-button ${isFavorite ? "is-favorite" : ""}"
                        data-favorite="${product.id}"
                        aria-label="${isFavorite ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}: ${escapeHTML(product.name)}"
                        aria-pressed="${isFavorite}"
                        type="button"
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M20.8 8.8c0 5.2-8.8 10.2-8.8 10.2S3.2 14 3.2 8.8A4.6 4.6 0 0 1 12 6.6a4.6 4.6 0 0 1 8.8 2.2Z"/>
                        </svg>
                    </button>

                    <button class="quickview-button" data-open-modal="${product.id}" type="button">
                        نظرة سريعة 👁️
                    </button>

                    <button
                        class="add-button"
                        data-quick-add="${product.id}"
                        type="button"
                    >
                        <span aria-hidden="true">+</span>
                        أضف 50 مل للسلة
                    </button>
                </div>

                <div class="product-info">
                    <div class="product-info-top">
                        <div>
                            <h3 data-open-modal="${product.id}">${escapeHTML(product.name)}</h3>
                            <span class="product-category">${escapeHTML(product.categoryName)}</span>
                        </div>

                        <div class="product-rating" aria-label="التقييم ${product.rating} من 5">
                            ★ ${product.rating.toFixed(1)}
                            <span>(${product.reviews})</span>
                        </div>
                    </div>

                    <div class="product-price-row">
                        <span class="product-price">${formatPrice(defaultSize.price)}</span>
                        ${onSale ? `<span class="old-price">${formatPrice(defaultSize.oldPrice)}</span>` : ""}
                    </div>

                    <p class="notes-preview">
                        <strong>النفحات:</strong> ${escapeHTML(product.topNotes.split("،")[0])}، ${escapeHTML(product.heartNotes.split("،")[0])}
                    </p>
                </div>
            </article>
        `;
    }).join("");

    productTotal.textContent = `${new Intl.NumberFormat("ar-EG").format(filtered.length)} عطور`;
    emptyMessage.hidden = filtered.length !== 0;
    clearSearch.hidden = searchInput.value.length === 0;
}

function setActiveCategory(category) {
    activeCategory = category;
    favoritesOnly = false;

    $("#categoryFilters")
        .querySelectorAll("[data-category]")
        .forEach(button => {
            const active = button.dataset.category === category;
            button.classList.toggle("active", active);
            button.setAttribute("aria-pressed", String(active));
        });

    renderProducts();
}

// Favorites Logic
function saveFavorites() {
    writeStorage("otrFavorites", [...favorites]);
    $("#favoriteCount").textContent = favorites.size;
}

function toggleFavorite(id) {
    if (!getProduct(id)) return;

    if (favorites.has(id)) {
        favorites.delete(id);
        showToast("تمت إزالة العطر من المفضلة.");
    } else {
        favorites.add(id);
        showToast("تمت إضافة العطر إلى المفضلة.");
    }

    saveFavorites();
    renderProducts();
}

$("#favoritesToggle").addEventListener("click", () => {
    favoritesOnly = !favoritesOnly;

    if (favoritesOnly) {
        activeCategory = "all";
        $("#categoryFilters")
            .querySelectorAll("[data-category]")
            .forEach(button => {
                const active = button.dataset.category === "all";
                button.classList.toggle("active", active);
                button.setAttribute("aria-pressed", String(active));
            });

        $("#products").scrollIntoView({ behavior: "smooth" });

        if (favorites.size === 0) {
            showToast("لم تضف أي عطور إلى المفضلة بعد.");
        }
    }

    renderProducts();
});

// Product Details & Olfactory Pyramid Modal
function openProductModal(productId) {
    const product = getProduct(productId);
    if (!product) return;

    currentModalProductId = product.id;
    currentModalSelectedSize = "50ml";
    currentModalQuantity = 1;

    lastFocusedElement = document.activeElement;

    renderProductModal();

    productModal.classList.add("open");
    productModal.removeAttribute("inert");
    productModal.setAttribute("aria-hidden", "false");
    updateOverlay();

    closeProductModal.focus();
}

function closeProductModalView() {
    productModal.classList.remove("open");
    productModal.setAttribute("inert", "");
    productModal.setAttribute("aria-hidden", "true");
    updateOverlay();

    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
        lastFocusedElement.focus();
    }
}

function renderProductModal() {
    const product = getProduct(currentModalProductId);
    if (!product) return;

    const selectedSizeInfo = getProductSizeInfo(product, currentModalSelectedSize);

    productModalContent.innerHTML = `
        <div class="modal-visual">
            <img src="${product.image}" alt="${escapeHTML(product.name)}">
            ${product.badge ? `<span class="modal-badge">${escapeHTML(product.badge)}</span>` : ""}
        </div>

        <div class="modal-details">
            <div class="modal-header">
                <span class="modal-category-tag">${escapeHTML(product.categoryName)}</span>
                <h2 id="modalPerfumeName">${escapeHTML(product.name)}</h2>
                <div class="modal-rating-row">
                    <span class="stars">★ ${product.rating.toFixed(1)} (${product.reviews} تقييم)</span>
                    <span class="modal-concentration">${escapeHTML(product.concentration)}</span>
                </div>
            </div>

            <p class="modal-desc">${escapeHTML(product.description)}</p>

            <!-- الهرم العطري -->
            <div class="pyramid-section">
                <div class="pyramid-title">
                    <span>الهرم العطري والمكونات النادرة</span>
                    <span>✦</span>
                </div>
                <div class="pyramid-step">
                    <strong>القمة (الافتتاحية):</strong>
                    <span>${escapeHTML(product.topNotes)}</span>
                </div>
                <div class="pyramid-step">
                    <strong>القلب (الجوهر):</strong>
                    <span>${escapeHTML(product.heartNotes)}</span>
                </div>
                <div class="pyramid-step">
                    <strong>القاعدة (الثبات):</strong>
                    <span>${escapeHTML(product.baseNotes)}</span>
                </div>
            </div>

            <!-- المواصفات والثبات -->
            <div class="spec-badges">
                <div class="spec-badge">
                    <small>درجة الثبات</small>
                    <strong>${escapeHTML(product.longevity)}</strong>
                </div>
                <div class="spec-badge">
                    <small>الفوحان والانتشار</small>
                    <strong>${escapeHTML(product.sillage)}</strong>
                </div>
                <div class="spec-badge">
                    <small>التركيز الفعلي</small>
                    <strong>زيت نقي مركز</strong>
                </div>
            </div>

            <!-- اختيار الحجم -->
            <div class="volume-selector-group">
                <span class="volume-label">اختر سعة الزجاجة:</span>
                <div class="volume-options">
                    ${product.sizes.map(s => `
                        <button
                            type="button"
                            class="volume-btn ${s.size === currentModalSelectedSize ? "active" : ""}"
                            data-select-size="${s.size}"
                        >
                            <strong>${escapeHTML(s.label)}</strong>
                            <span>${formatPrice(s.price)}</span>
                        </button>
                    `).join("")}
                </div>
            </div>

            <!-- السعر وزر الإضافة -->
            <div class="modal-price-action">
                <div class="modal-price-box">
                    <span class="modal-current-price">${formatPrice(selectedSizeInfo.price * currentModalQuantity)}</span>
                    ${selectedSizeInfo.oldPrice ? `
                        <span class="modal-old-price">${formatPrice(selectedSizeInfo.oldPrice * currentModalQuantity)}</span>
                    ` : ""}
                </div>

                <div class="modal-cta-group">
                    <div class="modal-qty-selector">
                        <button type="button" id="modalQtyMinus" aria-label="تقليل الكمية">−</button>
                        <span id="modalQtyVal">${currentModalQuantity}</span>
                        <button type="button" id="modalQtyPlus" aria-label="زيادة الكمية">+</button>
                    </div>

                    <button type="button" class="modal-add-cart-btn glow-hover" id="modalAddToCart">
                        أضف إلى السلة <span>←</span>
                    </button>
                </div>
            </div>
        </div>
    `;

    // Bind size selectors
    productModalContent.querySelectorAll("[data-select-size]").forEach(btn => {
        btn.addEventListener("click", () => {
            currentModalSelectedSize = btn.dataset.selectSize;
            renderProductModal();
        });
    });

    // Bind quantity buttons
    $("#modalQtyPlus").addEventListener("click", () => {
        if (currentModalQuantity < MAX_QUANTITY) {
            currentModalQuantity++;
            renderProductModal();
        }
    });

    $("#modalQtyMinus").addEventListener("click", () => {
        if (currentModalQuantity > 1) {
            currentModalQuantity--;
            renderProductModal();
        }
    });

    // Add to cart from modal
    $("#modalAddToCart").addEventListener("click", () => {
        addToCart(currentModalProductId, currentModalSelectedSize, currentModalQuantity);
        closeProductModalView();
        openCart();
    });
}

// Cart Calculations & Coupon Engine
function getCartDetails() {
    const quantity = cart.reduce((sum, item) => sum + item.quantity, 0);

    const subtotal = cart.reduce((sum, item) => {
        const product = getProduct(item.id);
        if (!product) return sum;
        const sizeInfo = getProductSizeInfo(product, item.size);
        return sum + (sizeInfo ? sizeInfo.price * item.quantity : 0);
    }, 0);

    let discount = 0;
    let isFreeShippingCoupon = false;

    if (appliedCoupon && AVAILABLE_COUPONS[appliedCoupon]) {
        const coupon = AVAILABLE_COUPONS[appliedCoupon];
        if (coupon.type === "percent") {
            discount = Math.round((subtotal * coupon.value) / 100);
        } else if (coupon.type === "fixed") {
            discount = Math.min(subtotal, coupon.value);
        } else if (coupon.type === "free_shipping") {
            isFreeShippingCoupon = true;
        }
    }

    let delivery = 0;
    if (subtotal > 0) {
        if (isFreeShippingCoupon || subtotal >= FREE_DELIVERY_THRESHOLD) {
            delivery = 0;
        } else {
            delivery = DELIVERY_FEE;
        }
    }

    const total = Math.max(0, subtotal - discount) + delivery;

    return {
        quantity,
        subtotal,
        discount,
        delivery,
        total,
        isFreeShippingCoupon
    };
}

function saveCart() {
    writeStorage("otrCart", cart);
}

function addToCart(id, size = "50ml", quantity = 1) {
    const product = getProduct(id);
    if (!product) return;

    const existing = cart.find(item => item.id === product.id && item.size === size);

    if (existing) {
        if (existing.quantity + quantity > MAX_QUANTITY) {
            showToast("وصلت إلى الحد الأقصى للكمية.");
            return;
        }
        existing.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            size: size,
            quantity: quantity
        });
    }

    saveCart();
    renderCart();

    const sizeInfo = getProductSizeInfo(product, size);
    showToast(`تمت إضافة ${product.name} (${sizeInfo.label}) إلى السلة.`);
}

function changeQuantity(id, size, change) {
    const item = cart.find(item => item.id === Number(id) && item.size === size);
    if (!item) return;

    const nextQuantity = item.quantity + change;

    if (nextQuantity > MAX_QUANTITY) {
        showToast("وصلت إلى الحد الأقصى للكمية.");
        return;
    }

    if (nextQuantity <= 0) {
        removeFromCart(id, size);
        return;
    }

    item.quantity = nextQuantity;
    saveCart();
    renderCart();
}

function removeFromCart(id, size) {
    cart = cart.filter(item => !(item.id === Number(id) && item.size === size));
    saveCart();
    renderCart();
    showToast("تم حذف العطر من السلة.");
}

function applyCouponCode(code) {
    const cleanCode = (code || "").trim().toUpperCase();
    if (!cleanCode) {
        couponStatusMessage.className = "coupon-status error";
        couponStatusMessage.textContent = "يرجى إدخال كود الخصم أولاً.";
        return;
    }

    if (AVAILABLE_COUPONS[cleanCode]) {
        appliedCoupon = cleanCode;
        writeStorage("otrCoupon", appliedCoupon);
        cartCouponInput.value = "";
        couponStatusMessage.className = "coupon-status success";
        couponStatusMessage.textContent = `تم تطبيق الكود: ${AVAILABLE_COUPONS[cleanCode].label}`;
        renderCart();
        showToast(`تم تفعيل كود الخصم: ${cleanCode}`);
    } else {
        couponStatusMessage.className = "coupon-status error";
        couponStatusMessage.textContent = "عذراً، هذا الكود غير صالح أو انتهت صلاحيته.";
    }
}

function removeCoupon() {
    appliedCoupon = null;
    writeStorage("otrCoupon", null);
    couponStatusMessage.className = "coupon-status";
    couponStatusMessage.textContent = "";
    renderCart();
    showToast("تمت إزالة كود الخصم.");
}

function renderCart() {
    const details = getCartDetails();

    cartCount.textContent = details.quantity;
    cartSubtotal.textContent = formatPrice(details.subtotal);

    if (details.discount > 0) {
        discountRow.hidden = false;
        cartDiscount.textContent = `-${formatPrice(details.discount)}`;
    } else {
        discountRow.hidden = true;
    }

    deliveryCost.textContent = details.subtotal === 0
        ? "—"
        : details.delivery === 0
            ? "مجاني"
            : formatPrice(details.delivery);

    cartTotal.textContent = formatPrice(details.total);
    $("#checkoutButton").disabled = cart.length === 0;

    // Coupon pill in cart
    if (appliedCoupon && AVAILABLE_COUPONS[appliedCoupon]) {
        couponStatusMessage.innerHTML = `
            <span class="coupon-applied-pill">
                ✓ ${appliedCoupon} (${AVAILABLE_COUPONS[appliedCoupon].label})
                <button type="button" id="removeCouponBtn" title="إزالة الكوبون">✕</button>
            </span>
        `;
        const removeBtn = $("#removeCouponBtn");
        if (removeBtn) {
            removeBtn.addEventListener("click", removeCoupon);
        }
    }

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <p>سلتك فارغة حاليًا.</p>
                <p>استكشف العطور واختر عطرك المفضل.</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => {
            const product = getProduct(item.id);
            if (!product) return "";
            const sizeInfo = getProductSizeInfo(product, item.size);

            return `
                <article class="cart-item">
                    <img src="${product.image}" alt="${escapeHTML(product.name)}">

                    <div>
                        <h3>${escapeHTML(product.name)}</h3>
                        <span class="cart-item-size-tag">${escapeHTML(sizeInfo.label)}</span>

                        <p class="cart-item-price">
                            ${formatPrice(sizeInfo.price * item.quantity)}
                        </p>

                        <div class="quantity-controls">
                            <button
                                type="button"
                                data-minus="${product.id}"
                                data-size="${item.size}"
                                aria-label="تقليل كمية ${escapeHTML(product.name)}"
                            >−</button>

                            <span>${item.quantity}</span>

                            <button
                                type="button"
                                data-plus="${product.id}"
                                data-size="${item.size}"
                                aria-label="زيادة كمية ${escapeHTML(product.name)}"
                            >+</button>
                        </div>
                    </div>

                    <button
                        class="remove-button"
                        type="button"
                        data-remove="${product.id}"
                        data-size="${item.size}"
                        aria-label="حذف ${escapeHTML(product.name)}"
                    >×</button>
                </article>
            `;
        }).join("");
    }

    // Delivery progress indicator
    const remaining = Math.max(0, FREE_DELIVERY_THRESHOLD - details.subtotal);
    const progress = Math.min(100, (details.subtotal / FREE_DELIVERY_THRESHOLD) * 100);

    let progressText;
    if (details.subtotal === 0) {
        progressText = `أضف منتجات بقيمة ${formatPrice(FREE_DELIVERY_THRESHOLD)} لتحصل على توصيل مجاني.`;
    } else if (details.isFreeShippingCoupon) {
        progressText = "🎉 تم تطبيق الشحن المجاني بواسطة كوبون الخصم!";
    } else if (remaining > 0) {
        progressText = `أضف منتجات بقيمة ${formatPrice(remaining)} إضافية للحصول على توصيل مجاني.`;
    } else {
        progressText = "رائع! طلبيتك مؤهلة للشحن المجاني ✦";
    }

    deliveryProgress.innerHTML = `
        <p>${progressText}</p>
        <div
            class="progress-track"
            role="progressbar"
            aria-label="التقدم نحو التوصيل المجاني"
            aria-valuemin="0"
            aria-valuemax="${FREE_DELIVERY_THRESHOLD}"
            aria-valuenow="${Math.min(details.subtotal, FREE_DELIVERY_THRESHOLD)}"
        >
            <div class="progress-bar" style="width: ${details.isFreeShippingCoupon ? 100 : progress}%"></div>
        </div>
    `;

    if (checkoutModal.classList.contains("open")) {
        renderCheckoutSummary();
    }
}

// Overlay & Modals Control
function updateOverlay() {
    const isOpen =
        cartDrawer.classList.contains("open") ||
        checkoutModal.classList.contains("open") ||
        productModal.classList.contains("open") ||
        whatsappConfigModal.classList.contains("open");

    overlay.classList.toggle("visible", isOpen);
    document.body.classList.toggle("no-scroll", isOpen);
}

function openCart() {
    lastFocusedElement = document.activeElement;
    closeCheckout(false);
    closeProductModalView();

    cartDrawer.classList.add("open");
    cartDrawer.removeAttribute("inert");
    cartDrawer.setAttribute("aria-hidden", "false");
    updateOverlay();
    $("#closeCart").focus();
}

function closeCart(restoreFocus = true) {
    cartDrawer.classList.remove("open");
    cartDrawer.setAttribute("inert", "");
    cartDrawer.setAttribute("aria-hidden", "true");
    updateOverlay();

    if (restoreFocus && lastFocusedElement && typeof lastFocusedElement.focus === "function") {
        lastFocusedElement.focus();
    }
}

function openCheckout() {
    if (cart.length === 0) {
        showToast("أضف عطرًا إلى السلة أولًا.");
        return;
    }

    closeCart(false);
    lastFocusedElement = $("#cartToggle");

    checkoutError.textContent = "";
    checkoutForm.reset();
    renderCheckoutSummary();

    checkoutModal.classList.add("open");
    checkoutModal.removeAttribute("inert");
    checkoutModal.setAttribute("aria-hidden", "false");
    updateOverlay();
    $("#customerName").focus();
}

function closeCheckout(restoreFocus = true) {
    checkoutModal.classList.remove("open");
    checkoutModal.setAttribute("inert", "");
    checkoutModal.setAttribute("aria-hidden", "true");
    updateOverlay();

    if (restoreFocus && lastFocusedElement && typeof lastFocusedElement.focus === "function") {
        lastFocusedElement.focus();
    }
}

function renderCheckoutSummary() {
    const details = getCartDetails();

    const lines = cart.map(item => {
        const product = getProduct(item.id);
        if (!product) return "";
        const sizeInfo = getProductSizeInfo(product, item.size);

        return `
            <p>
                • ${escapeHTML(product.name)} (${escapeHTML(sizeInfo.label)}) × ${item.quantity}
                — ${formatPrice(sizeInfo.price * item.quantity)}
            </p>
        `;
    }).join("");

    checkoutSummary.innerHTML = `
        <div style="margin-bottom:8px; font-weight:700; color:var(--accent-dark);">تفاصيل الطلب:</div>
        ${lines}
        <hr style="border:0; border-top:1px dashed var(--border); margin:8px 0;">
        <p>قيمة العطور: ${formatPrice(details.subtotal)}</p>
        ${details.discount > 0 ? `<p style="color:var(--success);">كود الخصم (${appliedCoupon}): -${formatPrice(details.discount)}</p>` : ""}
        <p>رسوم التوصيل: ${details.delivery === 0 ? "مجاني ✦" : formatPrice(details.delivery)}</p>
        <p style="font-size:13px; font-weight:800; margin-top:6px; color:var(--text);">الإجمالي المستحق: ${formatPrice(details.total)}</p>
    `;
}

// WhatsApp Config Modal
function openWpModal() {
    wpInput.value = whatsappNumber;
    whatsappConfigModal.classList.add("open");
    whatsappConfigModal.removeAttribute("inert");
    whatsappConfigModal.setAttribute("aria-hidden", "false");
    updateOverlay();
    wpInput.focus();
}

function closeWpModalView() {
    whatsappConfigModal.classList.remove("open");
    whatsappConfigModal.setAttribute("inert", "");
    whatsappConfigModal.setAttribute("aria-hidden", "true");
    updateOverlay();
}

editWhatsappBtn.addEventListener("click", openWpModal);
closeWpModal.addEventListener("click", closeWpModalView);

whatsappConfigForm.addEventListener("submit", event => {
    event.preventDefault();
    const newNum = wpInput.value.replace(/\D/g, "").trim();
    if (newNum.length >= 10 && newNum.length <= 15) {
        whatsappNumber = newNum;
        writeStorage("otrWhatsApp", whatsappNumber);
        updateWhatsappUI();
        closeWpModalView();
        showToast("تم تحديث رقم واتساب المتجر بنجاح.");
    } else {
        alert("يرجى إدخال رقم هاتف دولي صحيح (بين 10 إلى 15 رقماً بدون رموز).");
    }
});

// Event Delegation & Handlers
$("#categoryFilters").addEventListener("click", event => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    setActiveCategory(button.dataset.category);
});

productGrid.addEventListener("click", event => {
    const modalTrigger = event.target.closest("[data-open-modal]");
    const quickAdd = event.target.closest("[data-quick-add]");
    const favoriteButton = event.target.closest("[data-favorite]");

    if (favoriteButton) {
        event.stopPropagation();
        toggleFavorite(Number(favoriteButton.dataset.favorite));
        return;
    }

    if (quickAdd) {
        event.stopPropagation();
        addToCart(Number(quickAdd.dataset.quickAdd), "50ml", 1);
        return;
    }

    if (modalTrigger) {
        event.stopPropagation();
        openProductModal(Number(modalTrigger.dataset.openModal));
    }
});

// Search and Sort
searchInput.addEventListener("input", renderProducts);
sortSelect.addEventListener("change", renderProducts);

clearSearch.addEventListener("click", () => {
    searchInput.value = "";
    renderProducts();
    searchInput.focus();
});

$("#resetFilters").addEventListener("click", () => {
    searchInput.value = "";
    sortSelect.value = "featured";
    favoritesOnly = false;
    setActiveCategory("all");
});

$("#searchToggle").addEventListener("click", () => {
    $("#products").scrollIntoView({ behavior: "smooth" });
    setTimeout(() => searchInput.focus(), 350);
});

// Cart Drawer Events
cartItems.addEventListener("click", event => {
    const plus = event.target.closest("[data-plus]");
    const minus = event.target.closest("[data-minus]");
    const remove = event.target.closest("[data-remove]");

    if (plus) {
        changeQuantity(plus.dataset.plus, plus.dataset.size, 1);
    }
    if (minus) {
        changeQuantity(minus.dataset.minus, minus.dataset.size, -1);
    }
    if (remove) {
        removeFromCart(remove.dataset.remove, remove.dataset.size);
    }
});

applyCartCoupon.addEventListener("click", () => {
    applyCouponCode(cartCouponInput.value);
});

cartCouponInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        event.preventDefault();
        applyCouponCode(cartCouponInput.value);
    }
});

$("#cartToggle").addEventListener("click", openCart);
$("#closeCart").addEventListener("click", () => closeCart());
$("#checkoutButton").addEventListener("click", openCheckout);
$("#closeCheckout").addEventListener("click", () => closeCheckout());
closeProductModal.addEventListener("click", closeProductModalView);

overlay.addEventListener("click", () => {
    closeCheckout(false);
    closeCart(false);
    closeProductModalView();
    closeWpModalView();
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeCheckout(false);
        closeCart(false);
        closeProductModalView();
        closeWpModalView();
        toast.classList.remove("visible");
    }
});

// Mobile Navigation
const navLinks = $("#navLinks");
const menuToggle = $("#menuToggle");

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "إغلاق القائمة" : "فتح القائمة");
});

navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

// Newsletter
$("#newsletterForm").addEventListener("submit", event => {
    event.preventDefault();
    const input = $("#newsletterEmail");
    const message = $("#newsletterMessage");

    if (!input.checkValidity()) {
        input.reportValidity();
        return;
    }

    message.textContent = "شكرًا لانضمامك! تم تسجيل بريدك للاستفادة من العروض الخاصة.";
    input.value = "";
    showToast("تم الاشتراك بنجاح.");
});

// WhatsApp Order Dispatch
checkoutForm.addEventListener("submit", event => {
    event.preventDefault();
    checkoutError.textContent = "";

    if (!checkoutForm.checkValidity()) {
        checkoutForm.reportValidity();
        return;
    }

    if (cart.length === 0) {
        checkoutError.textContent = "السلة فارغة. أضف عطرًا قبل متابعة الطلب.";
        return;
    }

    const formData = new FormData(checkoutForm);
    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const address = String(formData.get("address") || "").trim();
    const notes = String(formData.get("notes") || "").trim();

    if (!name || !phone || !address) {
        checkoutError.textContent = "يرجى استكمال جميع بيانات الاسم ورقم الهاتف والعنوان.";
        return;
    }

    const details = getCartDetails();

    const orderLines = cart.map(item => {
        const product = getProduct(item.id);
        if (!product) return "";
        const sizeInfo = getProductSizeInfo(product, item.size);
        return `• عطر: ${product.name} (${sizeInfo.label}) × ${item.quantity} = ${formatPrice(sizeInfo.price * item.quantity)}`;
    }).filter(Boolean);

    const messageLines = [
        "🌟 طلب جديد من متجر OTR Perfumes 🌟",
        "------------------------------------",
        ...orderLines,
        "------------------------------------",
        `👤 الاسم: ${name}`,
        `📱 الهاتف: ${phone}`,
        `📍 العنوان: ${address}`,
        notes ? `📝 ملاحظات: ${notes}` : null,
        "------------------------------------",
        `💰 قيمة المنتجات: ${formatPrice(details.subtotal)}`,
        appliedCoupon && details.discount > 0 ? `🎟️ كود الخصم (${appliedCoupon}): -${formatPrice(details.discount)}` : null,
        `🚚 رسوم التوصيل: ${details.delivery === 0 ? "مجاني" : formatPrice(details.delivery)}`,
        `💵 الإجمالي النهائي: ${formatPrice(details.total)}`,
        "------------------------------------",
        "يرجى تأكيد استلام الطلب وتحديد موعد الشحن. شكراً لكم!"
    ].filter(Boolean);

    const message = messageLines.join("\n");
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    const newWindow = window.open(whatsappURL, "_blank", "noopener,noreferrer");

    if (!newWindow) {
        checkoutError.textContent = "يرجى السماح بالنوافذ المنبثقة لفتح تطبيق واتساب ومتابعة الطلب.";
        return;
    }

    showToast("جاري فتح واتساب لتأكيد طلبك...");
    closeCheckout();
});

// Initial Render
saveFavorites();
renderProducts();
renderCart();

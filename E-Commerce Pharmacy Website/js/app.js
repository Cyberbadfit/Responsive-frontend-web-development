// Medicine Data
const medicines = [
    {
        id: 1,
        name: "Paracetamol 500mg",
        company: "Cipla",
        price: 25,
        originalPrice: 35,
        image: "https://www.biofieldpharma.com/wp-content/uploads/2023/06/BIOFIELD-NIMOSET-P-TAB-1-scaled.jpg",
        description: "Effective pain reliever and fever reducer. Suitable for headaches, muscle aches, arthritis, backache, toothaches, colds, and fevers.",
        salts: "Paracetamol (Acetaminophen)",
        discount: "29% OFF"
    },
    {
        id: 2,
        name: "Azithromycin 250mg",
        company: "Sun Pharma",
        price: 800,
        originalPrice: 900,
        image: "https://mma.prnewswire.com/media/1631214/SOAR_IMAGEcrop.jpg?p=twitter",
        description: "Cetaphil is a widely used skincare brand owned by the Swiss company Galderma, famous for its dermatologist-recommended, non-irritating, and hypoallergenic products.",
        salts: "Cetaphil",
        discount: "20% OFF"
    },
    {
        id: 3,
        name: "Vitamin D3 60K",
        company: "Abbott",
        price: 85,
        originalPrice: 110,
        image: "https://store.genericaadhaar.com/uploads/product/medium_1780912014_vitamin-d3-cholecalciferol-60000-iu-gm-sachet-geno-d3-sachet-ga.webp",
        description: "High potency vitamin D supplement for bone health, immune support, and calcium absorption. Weekly dosage.",
        salts: "Cholecalciferol",
        discount: "23% OFF"
    },
    {
        id: 4,
        name: "Omeprazole 20mg",
        company: "Dr. Reddy's",
        price: 45,
        originalPrice: 60,
        image: "https://cpimg.tistatic.com/05528771/b/4/extra-05528771.jpg",
        description: "Proton pump inhibitor used to treat frequent heartburn, GERD, and stomach ulcers. Provides 24-hour relief.",
        salts: "Omeprazole Magnesium",
        discount: "25% OFF"
    },
    {
        id: 5,
        name: "Cetirizine 10mg",
        company: "Alkem",
        price: 18,
        originalPrice: 25,
        image: "https://store.genericaadhaar.com/uploads/product/medium_1770719256_cetirizine-hydrochloride-10-mg-tabs-swascetri-10mg-ga.webp",
        description: "Antihistamine providing relief from allergy symptoms including sneezing, runny nose, itchy eyes, and skin rashes.",
        salts: "Cetirizine Hydrochloride",
        discount: "28% OFF"
    },
    {
        id: 6,
        name: "Metformin 500mg",
        company: "USV",
        price: 55,
        originalPrice: 75,
        image: "https://store.genericaadhaar.com/uploads/product/medium_1770200175_metformin-hydrochloride-500-mg-sr-tabs-ga.webp",
        description: "First-line medication for Type 2 diabetes. Helps control blood sugar levels and improves insulin sensitivity.",
        salts: "Metformin Hydrochloride",
        discount: "27% OFF"
    }
];

// State Management
let cart = JSON.parse(localStorage.getItem('unityCart')) || [];
let currentUser = JSON.parse(localStorage.getItem('unityUser')) || null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderBanner();
    renderProducts(medicines);
    updateCartCount();
    
    // Check auth state
    if(currentUser) {
        updateNavForUser();
    }
});

// Navigation
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(sec => {
        sec.classList.remove('active');
    });
    
    // Show target section
    document.getElementById(sectionId).classList.add('active');
    
    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Close mobile menu
    document.getElementById('nav-toggle').checked = false;
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Banner Auto-Scroll
function renderBanner() {
    const track = document.getElementById('bannerTrack');
    const bannerItems = [...medicines, ...medicines]; // Duplicate for infinite scroll
    
    bannerItems.forEach(med => {
        const item = document.createElement('div');
        item.className = 'banner-item';
        item.innerHTML = `
            <img src="${med.image}" alt="${med.name}">
            <span class="discount-badge">${med.discount}</span>
        `;
        track.appendChild(item);
    });
}

// Product Rendering
function renderProducts(products) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';
    
    products.forEach(med => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.onclick = () => openProductModal(med);
        card.innerHTML = `
            <img src="${med.image}" alt="${med.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${med.name}</h3>
                <p class="product-desc">${med.description.substring(0, 60)}...</p>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                    <span class="product-price">₹${med.price}</span>
                    <span style="text-decoration: line-through; color: #999; font-size: 0.9rem;">₹${med.originalPrice}</span>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Search Functionality
function searchMedicines() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = medicines.filter(med => 
        med.name.toLowerCase().includes(query) || 
        med.salts.toLowerCase().includes(query) ||
        med.company.toLowerCase().includes(query)
    );
    renderProducts(filtered);
}

// Product Modal
function openProductModal(medicine) {
    const modal = document.getElementById('productModal');
    const detail = document.getElementById('productDetail');
    
    detail.innerHTML = `
        <img src="${medicine.image}" alt="${medicine.name}" class="detail-image">
        <div class="detail-info">
            <h2>${medicine.name}</h2>
            <p style="color: #666; margin-bottom: 10px;">by ${medicine.company}</p>
            <p style="background: #e8f5e9; padding: 10px; border-radius: 8px; display: inline-block; color: #2e7d32; font-weight: 500;">
                <i class="fas fa-flask"></i> ${medicine.salts}
            </p>
            <div class="detail-price">
                ₹${medicine.price} 
                <span style="font-size: 1rem; color: #999; text-decoration: line-through; margin-left: 10px;">
                    ₹${medicine.originalPrice}
                </span>
                <span style="color: #ff4444; font-size: 1rem; margin-left: 10px;">${medicine.discount}</span>
            </div>
            <p class="detail-desc">${medicine.description}</p>
            
            <div class="detail-actions">
                <button class="btn-cart" onclick="event.stopPropagation(); addToCart(${medicine.id})">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
                <button class="btn-buy" onclick="event.stopPropagation(); buyNow(${medicine.id})">
                    <i class="fas fa-bolt"></i> Buy Now
                </button>
            </div>
            
            <div class="reviews">
                <h3>Customer Reviews</h3>
                <div class="review-item">
                    <div class="review-header">
                        <strong>Rahul Sharma</strong>
                        <span class="stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></span>
                    </div>
                    <p>Very effective medicine. Fast delivery by Unity Medics!</p>
                </div>
                <div class="review-item">
                    <div class="review-header">
                        <strong>Priya Patel</strong>
                        <span class="stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="far fa-star"></i></span>
                    </div>
                    <p>Good packaging and genuine product. Recommended.</p>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
    document.getElementById('overlay').style.display = 'block';
}

// Cart Functions
function addToCart(medicineId) {
    const medicine = medicines.find(m => m.id === medicineId);
    const existingItem = cart.find(item => item.id === medicineId);
    
    if(existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({...medicine, quantity: 1});
    }
    
    saveCart();
    updateCartCount();
    showNotification('Added to cart!');
    
    // Add click animation
    const btn = event.target.closest('button');
    btn.classList.add('btn-click-anim');
    setTimeout(() => btn.classList.remove('btn-click-anim'), 300);
}

function removeFromCart(medicineId) {
    cart = cart.filter(item => item.id !== medicineId);
    saveCart();
    renderCart();
    updateCartCount();
}

function updateQuantity(medicineId, change) {
    const item = cart.find(item => item.id === medicineId);
    if(item) {
        item.quantity += change;
        if(item.quantity <= 0) {
            removeFromCart(medicineId);
        } else {
            saveCart();
            renderCart();
        }
    }
}

function saveCart() {
    localStorage.setItem('unityCart', JSON.stringify(cart));
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    
    if(sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        overlay.style.display = 'none';
    } else {
        renderCart();
        sidebar.classList.add('open');
        overlay.style.display = 'block';
    }
}

function renderCart() {
    const container = document.getElementById('cartItems');
    const totalEl = document.getElementById('cartTotal');
    
    if(cart.length === 0) {
        container.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        totalEl.textContent = '0';
        return;
    }
    
    container.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        total += item.price * item.quantity;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${item.price}</div>
                <div class="quantity-control">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <div class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </div>
        `;
        container.appendChild(div);
    });
    
    totalEl.textContent = total;
}

function buyNow(medicineId) {
    addToCart(medicineId);
    toggleCart();
}

function checkout() {
    if(cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    const total = document.getElementById('cartTotal').textContent;
    
    alert(`Order placed successfully! Total: ₹${total}\nPayment Method: ${paymentMethod.toUpperCase()}\n\nThank you for choosing Unity Medics.`);
    
    cart = [];
    saveCart();
    updateCartCount();
    toggleCart();
}

// Auth Functions
function openAuthModal() {
    document.getElementById('authModal').style.display = 'flex';
    document.getElementById('overlay').style.display = 'block';
}

function switchTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const tabs = document.querySelectorAll('.tab-btn');
    
    tabs.forEach(t => t.classList.remove('active'));
    
    if(tab === 'login') {
        loginForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
        tabs[0].classList.add('active');
    } else {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
        tabs[1].classList.add('active');
    }
}

function handleLogin(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    // Mock login
    currentUser = { email: email, name: email.split('@')[0] };
    localStorage.setItem('unityUser', JSON.stringify(currentUser));
    
    closeModal('authModal');
    updateNavForUser();
    showNotification('Welcome back, ' + currentUser.name + '!');
}

function handleSignup(e) {
    e.preventDefault();
    const name = e.target.querySelector('input[type="text"]').value;
    const email = e.target.querySelector('input[type="email"]').value;
    
    currentUser = { email: email, name: name };
    localStorage.setItem('unityUser', JSON.stringify(currentUser));
    
    closeModal('authModal');
    updateNavForUser();
    showNotification('Account created successfully!');
}

function updateNavForUser() {
    const navLinks = document.querySelector('.nav-menu');
    // Replace login link with user name
    const loginLink = navLinks.querySelector('a[onclick="openAuthModal()"]');
    if(loginLink && currentUser) {
        loginLink.innerHTML = `<i class="fas fa-user"></i> ${currentUser.name}`;
        loginLink.onclick = () => {
            if(confirm('Logout?')) {
                currentUser = null;
                localStorage.removeItem('unityUser');
                location.reload();
            }
        };
    }
}

// Chat Functions
function openChat() {
    document.getElementById('chatWidget').classList.remove('hidden');
}

function closeChat() {
    document.getElementById('chatWidget').classList.add('hidden');
}

function handleChat(e) {
    if(e.key === 'Enter') sendMessage();
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const body = document.getElementById('chatBody');
    const msg = input.value.trim();
    
    if(!msg) return;
    
    // User message
    const userDiv = document.createElement('div');
    userDiv.className = 'chat-msg user';
    userDiv.innerHTML = `<p>${msg}</p><span class="time">Just now</span>`;
    body.appendChild(userDiv);
    
    input.value = '';
    body.scrollTop = body.scrollHeight;
    
    // Auto reply
    setTimeout(() => {
        const replyDiv = document.createElement('div');
        replyDiv.className = 'chat-msg support';
        replyDiv.innerHTML = `<p>Thanks for reaching out! Our support team will assist you shortly. For urgent medical queries, please call our 24/7 helpline.</p><span class="time">Just now</span>`;
        body.appendChild(replyDiv);
        body.scrollTop = body.scrollHeight;
    }, 1000);
}

// Contact Form
function handleRequestSubmit(e) {
    e.preventDefault();
    alert('Thank you! Your medicine request has been submitted. Our team will verify and add it soon.');
    e.target.reset();
}

// Modal Utilities
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

function closeAll() {
    document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
    document.getElementById('cartSidebar').classList.remove('open');
    document.getElementById('overlay').style.display = 'none';
}

function showNotification(message) {
    const notif = document.createElement('div');
    notif.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: var(--primary);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 5000;
        animation: slideUp 0.3s ease;
    `;
    notif.textContent = message;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
}

// Close modals on outside click
window.onclick = function(event) {
    if(event.target.classList.contains('modal')) {
        closeAll();
    }
}
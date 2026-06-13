// ==========================================
// 1. DATA (DỮ LIỆU SẢN PHẨM)
// ==========================================
const products = [
    { id: 1, name: "Lời Hứa Màu Hồng", price: 45.00, tag: "Mới Về", category: "fresh", image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=600&q=80" },
    { id: 2, name: "Sương Mù Tím", price: 55.00, tag: "Tươi", category: "fresh", image: "https://images.unsplash.com/photo-1469046200769-654a1be7ff80?auto=format&fit=crop&w=600&q=80" },
    { id: 3, name: "Cẩm Tú Cầu Bầu Trời", price: 38.00, tag: "Hoa Lụa", category: "artificial", image: "https://images.unsplash.com/photo-1490750967868-88cb4aca8fba?auto=format&fit=crop&w=600&q=80" },
    { id: 4, name: "Niềm Vui Rực Rỡ", price: 65.00, tag: "Bán Chạy", category: "fresh", image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=600&q=80" }
];

// ==========================================
// 2. HÀM DÙNG CHUNG (GLOBAL FUNCTIONS)
// ==========================================

// Lấy & Lưu Giỏ Hàng (localStorage)
const getCart = () => JSON.parse(localStorage.getItem('joyful_cart')) || [];
const saveCart = (cart) => localStorage.setItem('joyful_cart', JSON.stringify(cart));

// Cập nhật số lượng trên icon Header
function updateCartCount() {
    const countBadge = document.getElementById('cart-count');
    if (!countBadge) return;
    
    const totalItems = getCart().reduce((sum, item) => sum + item.quantity, 0);
    countBadge.innerText = totalItems;
    countBadge.style.display = totalItems > 0 ? 'flex' : 'none';
}

// Thêm sản phẩm vào giỏ
window.addToCart = function(productId) {
    const cart = getCart();
    const product = products.find(p => p.id === productId);
    
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        existingItem ? existingItem.quantity += 1 : cart.push({ ...product, quantity: 1 });
        
        saveCart(cart);
        updateCartCount();
        alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
    }
}

// Kiểm tra Đăng Nhập
function checkAuthStatus() {
    const authLink = document.getElementById('auth-link');
    if (!authLink) return;

    if (localStorage.getItem('joyful_auth') === 'true') {
        authLink.innerHTML = `<span class="material-icons" style="color: var(--primary);">face</span>`;
        authLink.onclick = (e) => {
            e.preventDefault();
            localStorage.removeItem('joyful_auth');
            alert("Đã đăng xuất!");
            window.location.reload();
        };
    } else {
        authLink.innerHTML = `<span class="material-icons">person_outline</span>`;
        authLink.href = "auth.html"; 
    }
}

// ==========================================
// 3. LOGIC RIÊNG CHO TỪNG TRANG
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    // Luôn chạy 2 hàm này ở mọi trang
    updateCartCount();
    checkAuthStatus();

    // --- TRANG CỬA HÀNG (shop.html) ---
    const shopGrid = document.getElementById('shop-grid');
    if (shopGrid) {
        const renderShop = (filter = 'all') => {
            const items = filter === 'all' ? products : products.filter(p => p.category === filter);
            shopGrid.innerHTML = items.map(p => `
                <div class="card">
                    <img src="${p.image}" alt="${p.name}" style="width:100%; border-radius:8px;">
                    <h3>${p.name}</h3>
                    <p>$${p.price.toFixed(2)}</p>
                    <button onclick="addToCart(${p.id})">Thêm vào giỏ</button>
                </div>
            `).join('');
        };
        
        renderShop(); // Chạy lần đầu
        
        // Nút lọc hoa tươi / hoa lụa
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => renderShop(btn.dataset.filter));
        });
    }

    // --- TRANG GIỎ HÀNG (cart.html) ---
    const cartItems = document.getElementById('cart-items');
    if (cartItems) {
        const totalEl = document.getElementById('cart-total');
        
        // Hàm hiển thị giỏ hàng
        window.renderCartPage = function() {
            const cart = getCart();
            if (cart.length === 0) {
                cartItems.innerHTML = '<p>Giỏ hàng đang trống.</p>';
                totalEl.innerText = '$0.00';
                return;
            }
            
            let total = 0;
            cartItems.innerHTML = cart.map(item => {
                total += item.price * item.quantity;
                return `
                    <div class="cart-item" style="display:flex; justify-content:space-between; margin-bottom:1rem;">
                        <span>${item.name} (x${item.quantity})</span>
                        <span>$${(item.price * item.quantity).toFixed(2)}</span>
                        <div>
                            <button onclick="updateQty(${item.id}, -1)">-</button>
                            <button onclick="updateQty(${item.id}, 1)">+</button>
                            <button onclick="removeItem(${item.id})">Xóa</button>
                        </div>
                    </div>
                `;
            }).join('');
            totalEl.innerText = `$${total.toFixed(2)}`;
        };

        // Hàm tăng/giảm số lượng
        window.updateQty = function(id, change) {
            let cart = getCart();
            const item = cart.find(i => i.id === id);
            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) cart = cart.filter(i => i.id !== id);
                saveCart(cart);
                updateCartCount();
                renderCartPage();
            }
        };

        // Hàm xóa hẳn sản phẩm
        window.removeItem = function(id) {
            saveCart(getCart().filter(i => i.id !== id));
            updateCartCount();
            renderCartPage();
        };

        renderCartPage(); // Chạy lần đầu
    }

    // --- TRANG ĐĂNG NHẬP (auth.html) ---
    const authForm = document.getElementById('login-form');
    if (authForm) {
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            localStorage.setItem('joyful_auth', 'true');
            window.location.href = "index.html"; 
        });
    }
});
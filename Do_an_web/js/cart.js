// Phụ trách: Huỳnh Hoàng Thanh Danh - B2408063

function renderCart() {
    const cartItemsContainer = document.querySelector(".cart-items-list");
    const alertEl = document.getElementById("alert");
    const subtotalEl = document.getElementById("aside-subtotal");
    const totalEl = document.getElementById("aside-total");

    // Chỉ thực thi nếu đang ở trang có danh sách giỏ hàng
    if (!cartItemsContainer) return;
    
    // Xóa tất cả các phần tử sản phẩm cũ để render lại
    const cards = cartItemsContainer.querySelectorAll(".product-card");
    cards.forEach(card => card.remove());

    const cartKey = getCartKey();
    if (!cartKey) {
        if (alertEl) alertEl.style.display = "block";
        if (subtotalEl) subtotalEl.textContent = "0 VNĐ";
        if (totalEl) totalEl.textContent = "0 VNĐ";
        return;
    }

    let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    // Lọc bỏ các sản phẩm rác/không hợp lệ bằng vòng lặp for thủ công
    let validCart = [];
    for (let i = 0; i < cart.length; i++) {
        if (cart[i] && cart[i].name) {
            validCart.push(cart[i]);
        }
    }
    cart = validCart;
    localStorage.setItem(getCartKey(), JSON.stringify(cart));

    // Trường hợp giỏ hàng trống
    if (cart.length === 0) {
        if (alertEl) alertEl.style.display = "block";
        if (subtotalEl) subtotalEl.textContent = "0 VNĐ";
        if (totalEl) totalEl.textContent = "0 VNĐ";
        return;
    }

    // Ẩn thông báo giỏ hàng trống
    if (alertEl) alertEl.style.display = "none";

    let subtotal = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        const card = document.createElement("div");
        card.className = "product-card";
        card.dataset.index = index;

        // --- Khối ảnh sản phẩm ---
        const imgWrapper = document.createElement("div");
        imgWrapper.className = "product-img-wrapper";

        const img = document.createElement("img");
        img.src = item.image;
        img.alt = item.name;
        img.className = "product-image";
        imgWrapper.appendChild(img);

        // --- Khối thông tin sản phẩm ---
        const details = document.createElement("div");
        details.className = "product-details";

        const nameEl = document.createElement("h3");
        nameEl.className = "product-name";
        nameEl.textContent = item.name;
        details.appendChild(nameEl);

        const taglineEl = document.createElement("p");
        taglineEl.className = "product-tagline";
        taglineEl.textContent = item.tagline || "Hàng mới về";
        details.appendChild(taglineEl);

        // Chỉ thêm dòng size nếu sản phẩm có thông tin size
        if (item.size) {
            const sizeEl = document.createElement("p");
            sizeEl.className = "product-size";
            sizeEl.textContent = "Size: " + item.size;
            details.appendChild(sizeEl);
        }

        const priceEl = document.createElement("span");
        priceEl.className = "product-price";
        priceEl.textContent = formatMoney(item.price);
        details.appendChild(priceEl);

        // --- Khối nút hành động (tăng/giảm số lượng, xoá) ---
        const actions = document.createElement("div");
        actions.className = "product-actions";

        const numsWrapper = document.createElement("div");
        numsWrapper.className = "product_nums";

        const removeQtyBtn = document.createElement("button");
        removeQtyBtn.className = "remove-qty-btn";
        const removeIcon = document.createElement("span");
        removeIcon.className = "material-icons";
        removeIcon.textContent = "remove";
        removeQtyBtn.appendChild(removeIcon);

        const qtyText = document.createElement("p");
        qtyText.className = "product_nums_text";
        qtyText.textContent = item.quantity;

        const addQtyBtn = document.createElement("button");
        addQtyBtn.className = "add-qty-btn";
        const addIcon = document.createElement("span");
        addIcon.className = "material-icons";
        addIcon.textContent = "add";
        addQtyBtn.appendChild(addIcon);

        numsWrapper.appendChild(removeQtyBtn);
        numsWrapper.appendChild(qtyText);
        numsWrapper.appendChild(addQtyBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-item-btn";
        const deleteIcon = document.createElement("span");
        deleteIcon.className = "material-icons";
        deleteIcon.textContent = "delete_outline";
        deleteBtn.appendChild(deleteIcon);

        actions.appendChild(numsWrapper);
        actions.appendChild(deleteBtn);

        // --- Ghép các khối lại thành 1 card hoàn chỉnh ---
        card.appendChild(imgWrapper);
        card.appendChild(details);
        card.appendChild(actions);

        cartItemsContainer.appendChild(card);

        // Gắn sự kiện trực tiếp lên từng nút vừa tạo
        addQtyBtn.addEventListener("click", function () {
            let currentCart = JSON.parse(localStorage.getItem(getCartKey())) || [];
            currentCart[index].quantity++;
            localStorage.setItem(getCartKey(), JSON.stringify(currentCart));
            renderCart();
            updateCartBadge();
        });

        removeQtyBtn.addEventListener("click", function () {
            let currentCart = JSON.parse(localStorage.getItem(getCartKey())) || [];
            if (currentCart[index].quantity > 1) {
                currentCart[index].quantity--;
                localStorage.setItem(getCartKey(), JSON.stringify(currentCart));
                renderCart();
                updateCartBadge();
            }
        });

        deleteBtn.addEventListener("click", function () {
            // Hiệu ứng dịch sang phải và mờ dần trước khi xóa
            card.classList.add("product-card--removing");

            setTimeout(() => {
                let currentCart = JSON.parse(localStorage.getItem(getCartKey())) || [];
                const deletedName = currentCart[index].name;
                currentCart.splice(index, 1);
                localStorage.setItem(getCartKey(), JSON.stringify(currentCart));
                renderCart();
                updateCartBadge();
                showToast(`Đã xoá "${deletedName}" khỏi giỏ hàng`);
            }, 300);
        });
    });

    // Cập nhật giá trị hiển thị ở cột Tóm tắt đơn hàng bên phải
    const formattedSubtotal = formatMoney(subtotal);
    if (subtotalEl) subtotalEl.textContent = formattedSubtotal;
    if (totalEl) totalEl.textContent = formattedSubtotal;
}

// Giả lập chức năng đặt hàng/thanh toán tại trang Giỏ Hàng.

function initCheckout() {
    const checkoutBtn = document.querySelector(".btn-checkout");
    if (!checkoutBtn) return;

    checkoutBtn.addEventListener("click", function () {
        let cart = JSON.parse(localStorage.getItem(getCartKey())) || [];
        if (cart.length === 0) {
            showToast("Giỏ hàng của bạn đang trống!");
            return;
        }

        // Giả lập gửi thành công, xóa dữ liệu giỏ hàng
        showToast("Đặt hàng thành công! Đang xử lý đơn hàng...");
        localStorage.removeItem(getCartKey());

        setTimeout(() => {
            renderCart();
            updateCartBadge();
        }, 1200);
    });
}
document.addEventListener("DOMContentLoaded", function () {
    requireLogin(); // Kiểm tra đăng nhập khi vào trang giỏ hàng
    updateCartBadge();
    updateAuthUI();
    renderCart();
    initCheckout();
});

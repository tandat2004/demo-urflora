//Hà Tấn Đạt - B2410712
//định dạng tiền tệ VND
function formatMoney(money) {
    return money.toLocaleString('vi-VN') + " VNĐ";
}
//Hiển thị thông báo nổi 
function showToast(message) {
    let container = document.getElementById("toast-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "toast-container";
        container.className = "toast-container";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = "toast";

    const icon = document.createElement("span");
    icon.className = "material-icons toast__icon";
    icon.textContent = "shopping_bag";

    const messageSpan = document.createElement("span");
    messageSpan.className = "toast__message";
    messageSpan.textContent = message;

    toast.appendChild(icon);
    toast.appendChild(messageSpan);
    container.appendChild(toast);

    // setTimeout để đảm bảo CSS được load kịp
    setTimeout(() => {
        toast.classList.add("toast--visible");
    }, 10);

    // ẩn Toast sau 2.8 giây
    setTimeout(() => {
        toast.classList.remove("toast--visible");
        toast.classList.add("toast--hiding");
        setTimeout(() => {
            toast.remove();
            if (container.children.length === 0) {
                container.remove();
            }
        }, 350);
    }, 2800);
}
// Trả về key localStorage riêng cho giỏ hàng của từng tài khoản
// Chưa đăng nhập -> trả về null (không có giỏ hàng riêng)
function getCartKey() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser || !currentUser.email) return null;
    return "cart_" + currentUser.email;
}
//kiểm tra đăng nhập chưa, yêu cầu đăng nhập
function requireLogin() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
        showToast("Vui lòng đăng nhập để mua hàng!");
        setTimeout(() => {
            window.location.href = "auth.html";
        }, 1200);
        return false;
    }
    return true;
}
   

//Cập nhật số lượng hiển thị trên icon giỏ hàng

function updateCartBadge() {
    const cartCountEl = document.getElementById("cart-count");
    if (!cartCountEl) return;

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    // chưa đăng nhập thì không hiển thị số lượng giỏ hàng
    if (!currentUser) {
        cartCountEl.style.display = "none";
        return;
    }

    const cart = JSON.parse(localStorage.getItem(getCartKey())) || [];
    let totalQty = 0;
    for (let i = 0; i < cart.length; i++) {
        totalQty += cart[i].quantity || 0;
    }
    cartCountEl.textContent = totalQty;
    cartCountEl.style.display = "";
}
// Kiểm tra sản phẩm đã có trong giỏ chưa theo id
function isExistedInCart(item, cartItemArr) {
    let myIndex = -1;
    for (let i = 0; i < cartItemArr.length; i++) {
        if (cartItemArr[i].id === item.id && cartItemArr[i].size === item.size) {
            myIndex = i;
            break;
        }
    }
    return myIndex;
}

// Xử lý khi bấm nút add cảt trên giỏ hàng
function orderSelectedProduct(evt) {
    if (!requireLogin()) return;
    const linkClicked = evt.currentTarget;         
    const info = linkClicked.previousElementSibling;   
    const card = linkClicked.closest(".card");

    const id = info.children[0].textContent.trim();               
    const name = info.children[1].textContent.trim();            
    const price = Number(info.children[2].textContent.replace(/[^0-9]/g, ""));

    const image = card.querySelector("img")?.getAttribute("src") || "";
    const badge = card.querySelector(".badge");
    const tagline = badge ? badge.textContent.trim() : "Nổi bật";

    const newItem = { id, name, price, image, tagline, size: "Tiêu chuẩn", quantity: 1 };

    if (typeof Storage === "undefined") {
        alert("Trình duyệt không hỗ trợ Local Storage.");
        return;
    }

    let cart = JSON.parse(localStorage.getItem(getCartKey())) || [];
    const index = isExistedInCart(newItem, cart);
    if (index >= 0) cart[index].quantity++;
    else cart.push(newItem);

    localStorage.setItem(getCartKey(), JSON.stringify(cart));
    updateCartBadge();
    showToast(`Đã thêm "${name}" vào giỏ hàng`);
}

// Gắn addEventListener cho TẤT CẢ nút .add-cart
function addEventToAllCartButtons() {
    const add2CartList = document.getElementsByClassName("add-cart");
    for (let i = 0; i < add2CartList.length; i++) {
        add2CartList[i].addEventListener("click", orderSelectedProduct, false);
    }
}

// Gắn sự kiện lọc sản phẩm bằng các nút "pill"
function initCategoryFilter() {
    const filterPills = document.querySelectorAll('.pill');
    const productCards = document.querySelectorAll('.card');
    if (filterPills.length === 0) return;

    filterPills.forEach(pill => {
        pill.addEventListener('click', function () {
            filterPills.forEach(p => p.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (filterValue === 'all' || filterValue === cardCategory) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}
// nếu chưa đăng nhập thì không được click dô giỏ hàng để sang trang giỏ hàng
function initCartLinkGuard() {
    const cartLink = document.getElementById("cart-link");
    if (!cartLink) return;

    cartLink.addEventListener("click", function (e) {
        if (!requireLogin()) {
            e.preventDefault();
        }
    });
}

function updateAuthUI() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const authLink = document.getElementById("auth-link");
    if (authLink && currentUser) {
        authLink.href = "javascript:void(0);"; // Ngăn chuyển trang auth.html trực tiếp khi click
        authLink.classList.add("auth-link--logged-in");

        authLink.textContent = "";

        const avatarIcon = document.createElement("span");
        avatarIcon.className = "material-icons auth-link__avatar";
        avatarIcon.textContent = "account_circle";

        const nameSpan = document.createElement("span");
        nameSpan.className = "auth-link__name";
        nameSpan.textContent = currentUser.name;

        authLink.appendChild(avatarIcon);
        authLink.appendChild(nameSpan);

        // Chỉ tạo dropdown nếu chưa tồn tại
        if (!document.getElementById("header-user-dropdown")) {
            const dropdown = document.createElement("div");
            dropdown.id = "header-user-dropdown";
            dropdown.className = "user-dropdown";

            const dropAvatar = document.createElement("span");
            dropAvatar.className = "material-icons user-dropdown__avatar";
            dropAvatar.textContent = "account_circle";

            const dropName = document.createElement("h4");
            dropName.className = "user-dropdown__name";
            dropName.textContent = currentUser.name;

            const dropEmail = document.createElement("p");
            dropEmail.className = "user-dropdown__email";
            dropEmail.textContent = currentUser.email;

            const divider = document.createElement("hr");
            divider.className = "user-dropdown__divider";

            const logoutBtn = document.createElement("button");
            logoutBtn.id = "btn-header-logout";
            logoutBtn.className = "user-dropdown__logout-btn";
            logoutBtn.textContent = "Đăng xuất";

            dropdown.appendChild(dropAvatar);
            dropdown.appendChild(dropName);
            dropdown.appendChild(dropEmail);
            dropdown.appendChild(divider);
            dropdown.appendChild(logoutBtn);

            // Thay cho insertAdjacentHTML('beforeend', ...): dùng appendChild
            authLink.appendChild(dropdown);

            authLink.addEventListener("click", function (e) {
                e.stopPropagation();
                dropdown.classList.toggle("user-dropdown--open");
            });

            dropdown.addEventListener("click", function (e) {
                e.stopPropagation();
            });

            document.addEventListener("click", function () {
                dropdown.classList.remove("user-dropdown--open");
            });

            logoutBtn.addEventListener("click", function () {
                localStorage.removeItem("currentUser");
                localStorage.removeItem(getCartKey());
                updateCartBadge();
                showToast("Đã đăng xuất tài khoản!");
                setTimeout(() => { window.location.href = "index.html"; }, 1000);
            });
        }
    }
    initCartLinkGuard();
}

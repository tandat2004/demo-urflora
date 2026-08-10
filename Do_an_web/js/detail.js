//    Phụ trách: Nguyễn Hoàng Hiền Hậu - B2407526
const params = new URLSearchParams(window.location.search);
const productId = params.get('id');
var currentQty = 1;
var currentProduct = null;
function loadProduct() {
    const productMap = Object.fromEntries(products.map(p => [p.id, p]));
    const product = productMap[productId];
    if (!product) {
        console.error(`Không tìm thấy sản phẩm với id = "${productId}"`);
        return;
    }

    currentProduct = product;
    renderProduct(product);
}
function renderProduct(product) {
    // thông tin cơ bản
    document.getElementById("ProductName").textContent = product.name;
    document.getElementById("ProductDesc").textContent = product.description;
    document.getElementById("ProductBreadcrumb").textContent = product.name;

    const badgeEl = document.getElementById("ProductBadge");
    if (badgeEl) badgeEl.textContent = product.badge || "";

    //ảnh
    const mainImg = document.getElementById("ProductImg");
    mainImg.src = product.mainImage;
    mainImg.alt = product.name;

    //ảnh nhỏ
    renderGallery(product);

    // kích thuocws
    renderSizes(product);

    // số lượng mặc định
    currentQty = 1;
    const quantityVal = document.getElementById("quantity-val");
    if (quantityVal) quantityVal.textContent = currentQty;

    // giá ban đầu
    updatePrice();
    // gắn sự kiện cho nút tăng/giảm số lượng và nút thêm vào giỏ hàng
    initQuantityButtons();
    initProductDetailAddToCart();
}
function renderGallery(product) {
    const smallImgRow = document.getElementById("SmallImgRow");
    smallImgRow.innerHTML = ""; // xoá ảnh cũ của sản phẩm trước (nếu có)

    product.gallery.forEach(function (imgSrc, index) {
        const col = document.createElement("div");
        col.className = "small-img-col" + (index === 0 ? " active" : "");

        const img = document.createElement("img");
        img.src = imgSrc;
        img.className = "small-img";
        img.alt = product.name;

        col.appendChild(img);
        smallImgRow.appendChild(col);
    });

    attachGalleryClickEvents();
}
//Gắn sự kiện click cho ảnh nhỏ để thay đổi ảnh chính
function attachGalleryClickEvents() {
    const productImg = document.getElementById("ProductImg");
    const smallImgs = document.getElementsByClassName("small-img");

    for (let i = 0; i < smallImgs.length; i++) {
        smallImgs[i].addEventListener("click", function () {
            productImg.src = this.src;
            for (let j = 0; j < smallImgs.length; j++) {
                smallImgs[j].parentElement.classList.remove("active");
            }
            this.parentElement.classList.add("active");
        });
    }
}

//Sinh động các input radio chọn size theo mảng product.sizes
function renderSizes(product) {
    const sizeGroup = document.getElementById("SizeGroup");
    sizeGroup.innerHTML = ""; // xoá size cũ của sản phẩm trước (nếu có)

    product.sizes.forEach(function (size, index) {
        const wrapper = document.createElement("div");
        wrapper.className = "size-option";

        const input = document.createElement("input");
        input.type = "radio";
        input.id = "size-" + size.id;
        input.name = "product-size";
        input.value = size.id;
        input.setAttribute("data-extra", size.extra);
        if (index === 0) input.checked = true; // mặc định chọn size đầu tiên

        const label = document.createElement("label");
        label.setAttribute("for", input.id);
        label.textContent = size.extra > 0
            ? `${size.label} (+${formatMoney(size.extra)})`
            : size.label;

        wrapper.appendChild(input);
        wrapper.appendChild(label);
        sizeGroup.appendChild(wrapper);

        input.addEventListener("change", updatePrice);
    });
}
//cập nhật giá và số lương
function updatePrice() {
    if (!currentProduct) return;

    const priceElement = document.getElementById("ProductPrice");
    const sizeRadios = document.querySelectorAll('input[name="product-size"]');

    let extraPrice = 0;
    sizeRadios.forEach(function (radio) {
        if (radio.checked) {
            extraPrice = parseInt(radio.getAttribute("data-extra"));
        }
    });

    const totalPrice = (currentProduct.basePrice + extraPrice) * currentQty;
    priceElement.textContent = formatMoney(totalPrice);
}

//gắn sự kiện nút tăng giảm
var quantityButtonsInitialized = false;
function initQuantityButtons() {
    if (quantityButtonsInitialized) return; // tránh gắn trùng sự kiện
    quantityButtonsInitialized = true;

    const quantityVal = document.getElementById("quantity-val");
    const btnDecrease = document.getElementById("btn-decrease");
    const btnIncrease = document.getElementById("btn-increase");

    btnIncrease.addEventListener("click", function () {
        currentQty++;
        quantityVal.textContent = currentQty;
        updatePrice();
    });

    btnDecrease.addEventListener("click", function () {
        if (currentQty > 1) {
            currentQty--;
            quantityVal.textContent = currentQty;
            updatePrice();
        }
    });
}

var addToCartInitialized = false;
function initProductDetailAddToCart() {
    if (addToCartInitialized) return; // tránh gắn trùng sự kiện
    addToCartInitialized = true;

    const addToCartDetailBtn = document.getElementById("btn-add-to-cart");
    if (!addToCartDetailBtn) return;

    addToCartDetailBtn.addEventListener("click", function (e) {
        e.preventDefault();
        if (!requireLogin()) return;
        if (!currentProduct) return;

        const qtyEl = document.getElementById("quantity-val");
        const imgEl = document.getElementById("ProductImg");
        const quantity = qtyEl ? parseInt(qtyEl.textContent) : 1;
        const image = imgEl ? imgEl.getAttribute("src") : currentProduct.mainImage;

        // Tìm size đang được chọn trong các nút radio
        let sizeLabel = "Tiêu chuẩn";
        let extraPrice = 0;
        const selectedRadio = document.querySelector('input[name="product-size"]:checked');
        if (selectedRadio) {
            const labelEl = document.querySelector(`label[for="${selectedRadio.id}"]`);
            if (labelEl) {
                // Cắt chuỗi để loại bỏ thông tin giá cộng thêm
                sizeLabel = labelEl.textContent.split("(")[0].trim();
            }
            extraPrice = parseInt(selectedRadio.getAttribute("data-extra") || 0);
        }

        const pricePerUnit = currentProduct.basePrice + extraPrice;

        const newItem = {
            id: currentProduct.id,
            name: currentProduct.name,
            price: pricePerUnit,
            image: image,
            tagline: currentProduct.badge || "Nổi bật",
            size: sizeLabel,
            quantity: quantity
        };

        let cart = JSON.parse(localStorage.getItem(getCartKey())) || [];
        let existedIndex = isExistedInCart(newItem, cart);

        if (existedIndex !== -1) {
            cart[existedIndex].quantity += quantity;
        } else {
            cart.push(newItem);
        }

        localStorage.setItem(getCartKey(), JSON.stringify(cart));
        updateCartBadge();
        showToast(`Đã thêm ${quantity} x "${currentProduct.name}" (${sizeLabel}) vào giỏ hàng`);
    });
}
document.addEventListener("DOMContentLoaded", function () {
    updateCartBadge();
    updateAuthUI();
    loadProduct();
});

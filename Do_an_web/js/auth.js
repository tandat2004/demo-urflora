// Phụ trách: Nguyễn Đặng Hoàng Yến - B2306050
// cập nhật giao diện đã đăng nhập
function renderAuthProfileBox() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const formBox = document.querySelector(".form-box");
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const tabs = document.querySelector(".tabs");

    if (formBox && currentUser && loginForm) {
        // Ẩn toàn bộ các form đăng ký, đăng nhập và thanh chuyển tab cũ
        loginForm.style.display = "none";
        if (registerForm) registerForm.style.display = "none";
        if (tabs) tabs.style.display = "none";
        if (!document.getElementById("page-profile-box")) {
            const profileBox = document.createElement("div");
            profileBox.id = "page-profile-box";
            profileBox.className = "profile-box";

            const icon = document.createElement("span");
            icon.className = "material-icons profile-box__icon";
            icon.textContent = "account_circle";

            const title = document.createElement("h2");
            title.className = "profile-box__title";
            title.textContent = `Xin chào, ${currentUser.name}!`;

            const email = document.createElement("p");
            email.className = "profile-box__email";
            email.textContent = currentUser.email;

            const status = document.createElement("div");
            status.className = "profile-box__status";
            status.textContent = "Bạn đã đăng nhập thành công!, đang chuyển hướng về trang chủ.";

            const logoutBtn = document.createElement("button");
            logoutBtn.className = "submit-btn profile-box__logout-btn";
            logoutBtn.id = "btn-page-logout";
            logoutBtn.textContent = "Đăng xuất tài khoản";

            profileBox.appendChild(icon);
            profileBox.appendChild(title);
            profileBox.appendChild(email);
            profileBox.appendChild(status);
            profileBox.appendChild(logoutBtn);

            formBox.appendChild(profileBox);

            // Xử lý nút Đăng xuất tại khung form của trang auth.html
            logoutBtn.addEventListener("click", function () {
                localStorage.removeItem("currentUser");
                showToast("Đã đăng xuất tài khoản thành công!");
                setTimeout(() => { window.location.href = "index.html"; }, 1000);
            });
        }
    }
}

// Xử lý sự kiện đăng ký tài khoản
function initRegisterForm() {
    const btnRegister = document.getElementById("btn-register");
    if (!btnRegister) return;

    btnRegister.addEventListener("click", function (e) {
        e.preventDefault();

        const name = document.getElementById("reg-name").value.trim();
        const email = document.getElementById("reg-email").value.trim();
        const pass = document.getElementById("reg-password").value;
        const confirmPass = document.getElementById("reg-confirm-password").value;

        if (!name || !email || !pass || !confirmPass) {
            showToast("Vui lòng điền đầy đủ thông tin!");
            return;
        }

        if (pass !== confirmPass) {
            showToast("Mật khẩu xác nhận không khớp!");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        let isExist = false;
        for (let i = 0; i < users.length; i++) {
            if (users[i].email === email) {
                isExist = true;
                break;
            }
        }
        if (isExist) {
            showToast("Email này đã được sử dụng!");
            return;
        }

        users.push({ name: name, email: email, pass: pass });
        localStorage.setItem("users", JSON.stringify(users));

        showToast("Đăng ký thành công! Vui lòng đăng nhập.");

        document.getElementById("reg-name").value = "";
        document.getElementById("reg-email").value = "";
        document.getElementById("reg-password").value = "";
        document.getElementById("reg-confirm-password").value = "";

        if (typeof showLogin === "function") {
            showLogin();
        }
    });
}
//Xử lý sự kiện submit form Đăng nhập.

function initLoginForm() {
    const btnLogin = document.getElementById("btn-login");
    if (!btnLogin) return;

    btnLogin.addEventListener("click", function (e) {
        e.preventDefault();

        const email = document.getElementById("login-email").value.trim();
        const pass = document.getElementById("login-password").value;

        if (!email || !pass) {
            showToast("Vui lòng nhập Email và Mật khẩu!");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];
        let user = null;
        for (let i = 0; i < users.length; i++) {
            if (users[i].email === email && users[i].pass === pass) {
                user = users[i];
                break;
            }
        }

        if (user) {
            localStorage.setItem("currentUser", JSON.stringify({ name: user.name, email: user.email }));
            showToast(`Đăng nhập thành công. Chào mừng ${user.name}!`);

            // Đồng bộ giao diện ngay lập tức 
            updateAuthUI();
            renderAuthProfileBox();

            // Chuyển hướng về trang chủ sau 1.5 giây
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1500);
        } else {
            showToast("Email hoặc mật khẩu không chính xác!");
        }
    });
}
function showLogin(){ // Hàm hiển thị form đăng nhập
    document.getElementById("login-form").style.display="block";
            // Hiện form đăng nhập
    document.getElementById("register-form").style.display="none";
            // Ẩn form đăng ký
    document.querySelectorAll(".tabs button")[0].classList.add("active");
            // Thêm class active cho nút Sign In
    document.querySelectorAll(".tabs button")[1].classList.remove("active");
            // Xóa class active khỏi Sign Up
}
function showRegister(){ // Hàm hiển thị form đăng ký
    document.getElementById("login-form").style.display="none";
            // Ẩn đăng nhập
    document.getElementById("register-form").style.display="block";
            // Hiện đăng ký
    document.querySelectorAll(".tabs button")[1].classList.add("active");
            // Thêm class active cho nút Sign Up
    document.querySelectorAll(".tabs button")[0].classList.remove("active");
            // Bỏ class active khỏi nút Sign In
}
function initTabButtons() {
    const btnTabLogin = document.getElementById("btn-tab-login");
    const btnTabRegister = document.getElementById("btn-tab-register");
    if (btnTabLogin) btnTabLogin.addEventListener("click", showLogin);
    if (btnTabRegister) btnTabRegister.addEventListener("click", showRegister);
}
document.addEventListener("DOMContentLoaded", function () {
    updateCartBadge();
    updateAuthUI();
    renderAuthProfileBox();
    initRegisterForm();
    initLoginForm();
    initTabButtons();
});

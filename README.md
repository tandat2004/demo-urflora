# 🌸 Đồ Án Web: Cửa Hàng Hoa URFLORA

Chào anh em! Đây là repository chứa source code chuẩn của nhóm mình. Mọi người đọc kỹ hướng dẫn dưới đây trước khi bắt tay vào code để dự án ghép lại không bị lỗi hay vỡ giao diện nhé.

## 📂 Cấu Trúc Thư Mục

*   **`css/`**: Chứa toàn bộ các file định dạng giao diện.
*   **`images/`**: Chứa logo và hình ảnh sử dụng trong web (hoa, banner...).
*   **`*.html`**: Các file giao diện của từng trang (Trang chủ, Sản phẩm, Giỏ hàng...).
*   **`script.js`**: File xử lý logic giỏ hàng (Đã được code sẵn, không cần đụng vào).

---

Để dễ ghép code cuối kỳ, mọi người **BẮT BUỘC** tuân thủ 3 luật sau:

### 1. Vùng An Toàn (Chỉ sửa code trong `<main>`)
*   Phần Header (Thanh menu, Logo) và Footer (Chân trang) đã được code chuẩn form. **Tuyệt đối không sửa, không xóa** bất kỳ dòng code nào ở khu vực `<header>` và `<footer>`.
*   Mọi người **CHỈ** được phép thêm, bớt, sửa nội dung HTML bên trong cặp thẻ:
```html
    <main class="main-content"> 
        <!-- CODE CỦA BẠN NẰM Ở ĐÂY -->
    </main>
```

### 2. Viết CSS đúng file quy định
*   Tuyệt đối **KHÔNG** sửa các file CSS dùng chung như: `main.css`, `header.css`, `footer.css`, `root.css`.
*   Bạn làm trang nào thì **chỉ viết CSS vào file của trang đó** (Ví dụ: Làm trang Sản phẩm thì chỉ viết vào `shop.css`, làm trang Giỏ hàng thì chỉ viết vào `cart.css`).

### 3. Quy tắc hình ảnh và Icon
*   Nếu cần thêm ảnh mới, hãy bỏ ảnh vào thư mục `images/` rồi gọi đường dẫn `src="images/ten-anh.jpg"`. (Nên nén ảnh cho nhẹ trước khi tải lên).
*   Web đang dùng bộ Icon của Google. Muốn lấy icon mới, hãy vào [Google Material Icons](https://fonts.google.com/icons), copy tên icon và để vào thẻ: `<span class="material-icons">tên_icon</span>`.

---

## 🚀 Cách Chạy Dự Án

1.  Mở thư mục code bằng phần mềm **Visual Studio Code**.
2.  Cài đặt Extension có tên là **Live Server**.
3.  Mở file HTML của trang bạn đang làm (VD: `shop.html`), click chuột phải vào màn hình code và chọn **"Open with Live Server"**.
4.  Trình duyệt sẽ tự mở web lên. Mỗi lần bạn bấm `Ctrl + S` (Lưu code), web sẽ tự động cập nhật giao diện mới nhất.

Chúc anh em code mượt mà và không bug! 🚀

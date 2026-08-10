//Hà Tấn Đạt - B2410712
const products = [
  {
    id: "SP01",
    name: "Lời Hứa Màu Hồng",
    category: "fresh",
    badge: "Tươi",
    basePrice: 45000,
    description: "Sự bùng nổ của mẫu đơn hồng rực để thắp sáng bất kỳ căn phòng nào.",
    mainImage: "images/maudonhong.jpg",
    gallery: ["images/maudonhong.jpg"],
    sizes: [
      { id: "standard", label: "Tiêu chuẩn", extra: 0 },
      { id: "deluxe", label: "Cao cấp", extra: 40000 }
    ]
  },
  {
    id: "SP02",
    name: "Sương Mù Tím",
    category: "fresh",
    badge: "Tươi",
    basePrice: 55000,
    description: "Cát tường tím thanh lịch nhẹ nhàng mang lại cảm giác bình lặng.",
    mainImage: "images/cattuongtim.jpg",
    gallery: ["images/cattuongtim.jpg"],
    sizes: [
      { id: "standard", label: "Tiêu chuẩn", extra: 0 },
      { id: "deluxe", label: "Cao cấp", extra: 40000 }
    ]
  },
  {
    id: "SP03",
    name: "Cẩm Tú Cầu Xanh",
    category: "artificial",
    badge: "Hoa lụa",
    basePrice: 100000,
    description: "Niềm vui vô tận từ những bông hoa giả cao cấp và sang trọng.",
    mainImage: "images/camtucau.jpg",
    gallery: ["images/camtucau.jpg"],
    sizes: [
      { id: "standard", label: "Tiêu chuẩn", extra: 0 },
      { id: "deluxe", label: "Cao cấp", extra: 40000 }
    ]
  },
  {
    id: "SP04",
    name: "Trộn Niềm Vui",
    category: "fresh",
    badge: "Bán chạy",
    basePrice: 65000,
    description: "Một thiết kế cứ ngỡ như từ anime ChainSaw Man ra.",
    mainImage: "images/hoadenji.png",
    gallery: ["images/hoadenji.png"],
    sizes: [
      { id: "standard", label: "Tiêu chuẩn", extra: 0 },
      { id: "deluxe", label: "Cao cấp", extra: 40000 }
    ]
  },
  {
    id: "SP05",
    name: "Hoa hồng đỏ",
    category: "fresh",
    badge: "Bán chạy",
    basePrice: 85000,
    description: "Màu đỏ của hoa tươi",
    mainImage: "images/hoa1.jpg",
    gallery: ["images/hoa1.jpg"],
    sizes: [
      { id: "standard", label: "Tiêu chuẩn", extra: 0 },
      { id: "deluxe", label: "Cao cấp", extra: 40000 }
    ]
  },
  {
    id: "SP06",
    name: "Hoa màu tím",
    category: "fresh",
    badge: "Bán chạy",
    basePrice: 90000,
    description: "Hoa màu tím, mộng mơ.",
    mainImage: "images/hoa2.jpg",
    gallery: ["images/hoa2.jpg"],
    sizes: [
      { id: "standard", label: "Tiêu chuẩn", extra: 0 },
      { id: "deluxe", label: "Cao cấp", extra: 40000 }
    ]
  },
  {
    id: "SP07",
    name: "Hoa hồng",
    category: "fresh",
    badge: "Bán chạy",
    basePrice: 65000,
    description: "...",
    mainImage: "images/hoa3.jpg",
    gallery: ["images/hoa3.jpg"],
    sizes: [
      { id: "standard", label: "Tiêu chuẩn", extra: 0 },
      { id: "deluxe", label: "Cao cấp", extra: 40000 }
    ]
  },
  {
    id: "SP08",
    name: "Hoa lụa",
    category: "artificial",
    badge: "Bán chạy",
    basePrice: 100000,
    description: "Hoa lụa là hoa giả á.",
    mainImage: "images/hoa4.jpg",
    gallery: ["images/hoa4.jpg"],
    sizes: [
      { id: "standard", label: "Tiêu chuẩn", extra: 0 },
      { id: "deluxe", label: "Cao cấp", extra: 40000 }
    ]
  },
  {
    id: "SP09",
    name: "Hoa sương mù",
    category: "artificial",
    badge: "Bán chạy",
    basePrice: 65000,
    description: "Hoa sương mù, mộng mơ.",
    mainImage: "images/hoa5.png",
    gallery: ["images/hoa5.png"],
    sizes: [
      { id: "standard", label: "Tiêu chuẩn", extra: 0 },
      { id: "deluxe", label: "Cao cấp", extra: 40000 }
    ]
  },
  {
    id: "SP10",
    name: "Hoa tặng người yêu",
    category: "fresh",
    badge: "Bán chạy",
    basePrice: 65000,
    description: "Dành tặng cho bà chả húiii.",
    mainImage: "images/hoa6.jpg",
    gallery: ["images/hoa6.jpg"],
    sizes: [
      { id: "standard", label: "Tiêu chuẩn", extra: 0 },
      { id: "deluxe", label: "Cao cấp", extra: 40000 }
    ]
  }
];

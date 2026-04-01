// ====================== DỮ LIỆU SẢN PHẨM ======================
const products = [
    // ===== QUẦN ÁO =====
    { id: 1, name: "Sơ mi nam trắng công sở", category: "Sơ mi nam", price: 299000, image: "883c5458084721ad471f72f19c78d1c1.jpg" },
    { id: 2, name: "Sơ mi nam xanh dài tay", category: "Sơ mi nam", price: 329000, image: "vn-11134207-820l4-mgxfn82c6yh5b7.jpg" },
    { id: 3, name: "Quần âu nam đen", category: "Quần âu nam", price: 399000, image: "f8f71a038f9baa48ddee565d16bf76a9.jpg" },
    { id: 4, name: "Quần âu nam xám", category: "Quần âu nam", price: 429000, image: "mf6259_e961411c54ae4aa7ab9efc560a03b263.jpg" },
    { id: 5, name: "Quần short nam thể thao", category: "Quần short nam", price: 199000, image: "sg-11134201-22120-cvvh4u46q7kvff.jpg" },
    { id: 6, name: "Quần short nam kaki", category: "Quần short nam", price: 249000, image: "5eee2a1da5e88.jpeg" },

    { id: 7, name: "Áo phông nữ basic", category: "Áo phông nữ", price: 159000, image: "vn-11134207-7r98o-ls1gbbmhm5z808.jpg" },
    { id: 8, name: "Áo phông nữ form rộng", category: "Áo phông nữ", price: 179000, image: "vn-11134207-7ras8-mb7wkbve0yxk65.jpg" },
    { id: 9, name: "Chân váy chữ A", category: "Chân váy", price: 279000, image: "f224b9a7e2e4aefab13354921c86e498.jpg" },
    { id: 10, name: "Chân váy jean nữ", category: "Chân váy", price: 319000, image: "vn-11134207-7qukw-lhihcijfeflx50.jpg" },
    { id: 11, name: "Đầm nữ mùa hè", category: "Đầm", price: 449000, image: "sg-11134201-7rd4m-lvlbs8ahg1bpfe.jpg" },
    { id: 12, name: "Đầm nữ công sở", category: "Đầm", price: 499000, image: "604fa75a969a5a2281c4610ecb87c6c6.jpg" },

    // ===== PHỤ KIỆN =====
    { id: 13, name: "Mũ bucket thời trang", category: "Phụ kiện", price: 149000, image: "vn-11134207-7ras8-m26qt7q87wl021.jpg" },
    { id: 14, name: "Túi tote vải canvas", category: "Phụ kiện", price: 189000, image: "vn-11134207-7qukw-lgf1zu8s2bjra5.jpg" },
    { id: 15, name: "Đồng hồ dây da nam", category: "Phụ kiện", price: 890000, image: "vn-11134201-23030-rbaqayihnhov62.jpg" },

    // ===== GIÀY DÉP =====
    { id: 16, name: "Giày sneaker trắng basic", category: "Giày dép", price: 499000, image: "fd0512e6e37f028cde81663a39eb6b60.jpg_720x720q80.jpg" },
    { id: 17, name: "Giày thể thao nam đế êm", category: "Giày dép", price: 599000, image: "vn-11134207-7r98o-ltbup5f2rhs4db.jpg" },
    { id: 18, name: "Sandal nữ quai mảnh", category: "Giày dép", price: 279000, image: "sg-11134201-7ra3q-m5blpqgfbwiga4.jpg" },
    { id: 19, name: "Giày boots cổ thấp", category: "Giày dép", price: 749000, image: "416e36fea94fdb0e254103c3602a7b0d.jpg" }
];

// Gán type hot hoặc sale ngẫu nhiên
products.forEach(product => {
    if (!product.type) {
        product.type = Math.random() < 0.5 ? "hot" : "sale";
    }
});

// ====================== Khoi tao dom khi ss ======================
document.addEventListener('DOMContentLoaded', () => {

    // ====================== BIẾN CHUNG ======================
    let cart = [];
    const CART_STORAGE_KEY = "myCart";

    // ====================== Gio hang ======================
    function loadCartFromStorage() {
        const saved = localStorage.getItem(CART_STORAGE_KEY);
        if (saved) cart = JSON.parse(saved);
    }

    function saveCartToStorage() {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }

    function updateCartCount() {
        const countEl = document.getElementById("cart-count");
        if (countEl) {
            const count = cart.reduce((sum, item) => sum + item.quantity, 0);
            countEl.textContent = count;
        }
    }

    function displayCart() {
        const container = document.getElementById("cart-items");
        if (!container) return;

        container.innerHTML = "";

        if (cart.length === 0) {
            container.innerHTML = `<p>Giỏ hàng trống</p>`;
            updateTotal();
            return;
        }

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            container.innerHTML += `
                <div class="card">
                    <img src="${item.image}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>${item.price.toLocaleString('vi-VN')}đ</p>
                    <div class="quantity-control">
                        <button class="reduce" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase" data-id="${item.id}">+</button>
                    </div>
                    <p class="item-total">${itemTotal.toLocaleString('vi-VN')} đ</p>
                    <button class="del" data-id="${item.id}">Xóa</button>
                </div>
            `;
        });

        updateTotal();
    }

    function updateTotal() {
        const totalEl = document.getElementById("total-price");
        if (!totalEl) return;
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        totalEl.textContent = total.toLocaleString('vi-VN') + " đ";
    }

    // ====================== Hien thi san pham ======================
    function displayProducts(list, container) {
        if (!container) return;
        container.innerHTML = "";

        if (list.length === 0) {
            container.innerHTML = `<p class="no-product">Không có sản phẩm phù hợp</p>`;
            return;
        }

        list.forEach(product => {
            container.innerHTML += `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p class="price">${product.price.toLocaleString('vi-VN')}đ</p>
                    <button class="addtocart" data-id="${product.id}">Thêm vào giỏ</button>
                </div>
            `;
        });
    }
    // ====================== Hien thi tat ca san pham ======================
    let currentAllList = [];

    function getAllProducts(categoryFilter = null) {
        if (!categoryFilter) return [...products];

        return products.filter(product => {
            if (categoryFilter === "clothing") {
                return !["Phụ kiện", "Giày dép"].includes(product.category);
            } else if (categoryFilter === "accessory") {
                return product.category === "Phụ kiện";
            } else if (categoryFilter === "shoes") {
                return product.category === "Giày dép";
            }
            return true;
        });
    }

    function showAllProducts(categoryFilter = null) {
        currentAllList = getAllProducts(categoryFilter);
        const containerAll = document.getElementById("container-all");
        displayProducts(currentAllList, containerAll);
    }
    // ====================== Loc san pham ======================
    function getFilteredProducts(type, categoryFilter = null) {
        return products.filter(product => {
            const matchType = product.type === type;
            let matchCategory = true;

            if (categoryFilter) {
                if (categoryFilter === "clothing") {
                    matchCategory = !["Phụ kiện", "Giày dép"].includes(product.category);
                } else if (categoryFilter === "accessory") {
                    matchCategory = product.category === "Phụ kiện";
                } else if (categoryFilter === "shoes") {
                    matchCategory = product.category === "Giày dép";
                }
            }
            return matchType && matchCategory;
        });
    }

    // ====================== Xu ly click toan bo trang ======================
    document.addEventListener('click', function (e) {
        // Thêm vào giỏ
        if (e.target.classList.contains('addtocart')) {
            const id = Number(e.target.dataset.id);
            const product = products.find(p => p.id === id);
            if (!product) return;

            const existing = cart.find(item => item.id === id);
            if (existing) {
                existing.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }

            saveCartToStorage();
            updateCartCount();
            displayCart();
        }

        // Tăng / Giảm / Xóa trong giỏ
        if (e.target.classList.contains('increase')) {
            const id = Number(e.target.dataset.id);
            const item = cart.find(i => i.id === id);
            if (item) item.quantity++;
        }
        if (e.target.classList.contains('reduce')) {
            const id = Number(e.target.dataset.id);
            const item = cart.find(i => i.id === id);
            if (item) {
                if (item.quantity > 1) item.quantity--;
                else cart = cart.filter(i => i.id !== id);
            }
        }
        if (e.target.classList.contains('del')) {
            const id = Number(e.target.dataset.id);
            cart = cart.filter(i => i.id !== id);
        }

        if (['increase', 'reduce', 'del'].some(cls => e.target.classList.contains(cls))) {
            saveCartToStorage();
            updateCartCount();
            displayCart();
        }
    });

    // ====================== Phan chi chay o file index.html ======================
    const isIndex = !!document.querySelector(".slides");

    if (isIndex) {
        // Slider
        const slides = document.querySelector(".slides");
        const totalSlides = document.querySelectorAll(".slides img").length || 0;
        let slideIndex = 0;

        const nextBtn = document.getElementById("next");
        const prevBtn = document.getElementById("prev");

        if (nextBtn) nextBtn.onclick = () => {
            slideIndex = (slideIndex + 1) % totalSlides;
            if (slides) slides.style.transform = `translateX(-${slideIndex * 100}%)`;
        };
        if (prevBtn) prevBtn.onclick = () => {
            slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
            if (slides) slides.style.transform = `translateX(-${slideIndex * 100}%)`;
        };

        // Mở giỏ hàng
        const shoppingCartBtn = document.querySelector(".shopping-cart");
        const overlay = document.querySelector(".overlay");
        const exitBtn = document.getElementById("exit");

        if (shoppingCartBtn && overlay) {
            shoppingCartBtn.addEventListener('click', () => overlay.classList.add("active"));
        }
        if (exitBtn && overlay) {
            exitBtn.addEventListener('click', () => overlay.classList.remove("active"));
        }
        if (overlay) {
            overlay.addEventListener("click", (e) => {
                if (e.target === overlay) overlay.classList.remove("active");
            });
        }
    }

    // ====================== Phan chay tren ca hot va sale ======================
    const containerHot = document.querySelector(".product-container");
    const containerSale = document.querySelector(".product-container2");

    let currentHotList = [];
    let currentSaleList = [];

    function showHotProducts(categoryFilter = null) {
        currentHotList = getFilteredProducts("hot", categoryFilter);
        displayProducts(currentHotList, containerHot);
    }

    function showSaleProducts(categoryFilter = null) {
        currentSaleList = getFilteredProducts("sale", categoryFilter);
        displayProducts(currentSaleList, containerSale);
    }

    // Tìm kiếm (chỉ khi có ô input)
    const searchInput = document.getElementById('input');
    const searchBtn = document.getElementById('search');

    function performSearch() {
        if (!searchInput) return;
        const keyword = searchInput.value.trim().toLowerCase();

        if (keyword === "") {
            if (containerHot) showHotProducts();
            if (containerSale) showSaleProducts();
            return;
        }

        const filtered = products.filter(p => p.name.toLowerCase().includes(keyword));

        if (containerHot) displayProducts(filtered, containerHot);
        if (containerSale) displayProducts(filtered, containerSale);
    }

    if (searchBtn) searchBtn.addEventListener('click', performSearch);
    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === "Enter") performSearch();
        });
    }

    // ====================== filter+sort hot va sale ======================
    // Nút "Tất cả", Quần áo, Phụ kiện, Giày dép
    const classifyBtns = document.querySelectorAll(".classify1, .classify2");
    classifyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            classifyBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const id = btn.id;

            if (id === "all-product" || id === "all-product2") {
                if (id === "all-product") showHotProducts();
                else showSaleProducts();
            }
            else if (id === "clothes" || id === "clothes2") {
                if (id === "clothes") showHotProducts("clothing");
                else showSaleProducts("clothing");
            }
            else if (id === "accessory" || id === "accessory2") {
                if (id === "accessory") showHotProducts("accessory");
                else showSaleProducts("accessory");
            }
            else if (id === "shoes" || id === "shoes2") {
                if (id === "shoes") showHotProducts("shoes");
                else showSaleProducts("shoes");
            }
        });
    });

    // Lọc giá
    const filterBtn = document.getElementById("filter");
    if (filterBtn) {
        filterBtn.addEventListener("click", () => {
            const min = Number(document.getElementById("minPrice")?.value) || 0;
            const max = Number(document.getElementById("maxPrice")?.value) || Infinity;
            const filtered = currentHotList.filter(p => p.price >= min && p.price <= max);
            displayProducts(filtered, containerHot);
        });
    }

    const filterBtn2 = document.getElementById("filter2");
    if (filterBtn2) {
        filterBtn2.addEventListener("click", () => {
            const min = Number(document.getElementById("minPrice2")?.value) || 0;
            const max = Number(document.getElementById("maxPrice2")?.value) || Infinity;
            const filtered = currentSaleList.filter(p => p.price >= min && p.price <= max);
            displayProducts(filtered, containerSale);
        });
    }

    // ====================== (Sort) ======================
    function sortList(list, ascending = true) {
        return [...list].sort((a, b) => ascending ? a.price - b.price : b.price - a.price);
    }

    // Sort cho trang Hot Trend
    const asc = document.getElementById("ascending");
    if (asc) {
        asc.addEventListener('click', () => {
            const sorted = sortList(currentHotList, true);
            displayProducts(sorted, containerHot);
        });
    }

    const desc = document.getElementById("descending");
    if (desc) {
        desc.addEventListener('click', () => {
            const sorted = sortList(currentHotList, false);
            displayProducts(sorted, containerHot);
        });
    }

    // Sort cho trang Khuyến mãi (Sale)
    const asc2 = document.getElementById("ascending2");
    if (asc2) {
        asc2.addEventListener('click', () => {
            const sorted = sortList(currentSaleList, true);
            displayProducts(sorted, containerSale);
        });
    }

    const desc2 = document.getElementById("descending2");
    if (desc2) {
        desc2.addEventListener('click', () => {
            const sorted = sortList(currentSaleList, false);
            displayProducts(sorted, containerSale);
        });
    }
    // ====================== Phan loai + loc gia + sap xep cho trang tat ca sp ======================

    // 1. Phân loại (Tất cả / Quần áo / Phụ kiện / Giày dép)
    const classifyAllBtns = document.querySelectorAll(".classify3");
    classifyAllBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            classifyAllBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const id = btn.id;

            if (id === "all-product3") {
                showAllProducts();
            } else if (id === "clothes3") {
                showAllProducts("clothing");
            } else if (id === "accessory3") {
                showAllProducts("accessory");
            } else if (id === "shoes3") {
                showAllProducts("shoes");
            }
        });
    });

    // 2. Lọc theo giá cho trang Tất cả
    const filterBtn3 = document.getElementById("filter3");
    if (filterBtn3) {
        filterBtn3.addEventListener("click", () => {
            const min = Number(document.getElementById("minPrice3")?.value) || 0;
            const max = Number(document.getElementById("maxPrice3")?.value) || Infinity;

            const filtered = currentAllList.filter(p => p.price >= min && p.price <= max);
            displayProducts(filtered, document.getElementById("container-all"));
        });
    }

    // 3. Sắp xếp ↑ ↓ cho trang Tất cả (đảm bảo hoạt động)
    const asc3 = document.getElementById("all-ascending");
    if (asc3) {
        asc3.addEventListener('click', () => {
            const sorted = sortList(currentAllList, true);
            displayProducts(sorted, document.getElementById("container-all"));
        });
    }

    const desc3 = document.getElementById("all-descending");
    if (desc3) {
        desc3.addEventListener('click', () => {
            const sorted = sortList(currentAllList, false);
            displayProducts(sorted, document.getElementById("container-all"));
        });
    }

    // ====================== Khoi tao ======================
    loadCartFromStorage();
    updateCartCount();

    // Hiển thị sản phẩm theo trang
    if (containerHot) showHotProducts();
    if (containerSale) showSaleProducts();
    if (isIndex) {
        // Trang chủ → hiển thị tất cả sản phẩm
        showAllProducts();
        displayCart();
    }
    if (isIndex) {
        displayCart();   // hiển thị giỏ nếu có overlay
    }
});

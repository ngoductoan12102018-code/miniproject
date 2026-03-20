const products = [
    {
        id: 1,
        name: "Sơ mi nam trắng công sở",
        category: "Sơ mi nam",
        price: 25,
        image: "883c5458084721ad471f72f19c78d1c1.jpg"
    },
    {
        id: 2,
        name: "Sơ mi nam xanh dài tay",
        category: "Sơ mi nam",
        price: 28,
        image: "vn-11134207-820l4-mgxfn82c6yh5b7.jpg"
    },
    {
        id: 3,
        name: "Quần âu nam đen",
        category: "Quần âu nam",
        price: 35,
        image: "f8f71a038f9baa48ddee565d16bf76a9.jpg"
    },
    {
        id: 4,
        name: "Quần âu nam xám",
        category: "Quần âu nam",
        price: 38,
        image: "mf6259_e961411c54ae4aa7ab9efc560a03b263.jpg"
    },
    {
        id: 5,
        name: "Quần short nam thể thao",
        category: "Quần short nam",
        price: 20,
        image: "sg-11134201-22120-cvvh4u46q7kvff.jpg"
    },
    {
        id: 6,
        name: "Quần short nam kaki",
        category: "Quần short nam",
        price: 22,
        image: "5eee2a1da5e88.jpeg"
    },
    {
        id: 7,
        name: "Áo phông nữ basic",
        category: "Áo phông nữ",
        price: 18,
        image: "vn-11134207-7r98o-ls1gbbmhm5z808.jpg"
    },
    {
        id: 8,
        name: "Áo phông nữ form rộng",
        category: "Áo phông nữ",
        price: 19,
        image: "vn-11134207-7ras8-mb7wkbve0yxk65.jpg"
    },
    {
        id: 9,
        name: "Chân váy chữ A",
        category: "Chân váy",
        price: 24,
        image: "f224b9a7e2e4aefab13354921c86e498.jpg"
    },
    {
        id: 10,
        name: "Chân váy jean nữ",
        category: "Chân váy",
        price: 27,
        image: "vn-11134207-7qukw-lhihcijfeflx50.jpg"
    },
    {
        id: 11,
        name: "Đầm nữ mùa hè",
        category: "Đầm",
        price: 40,
        image: "sg-11134201-7rd4m-lvlbs8ahg1bpfe.jpg"
    },
    {
        id: 12,
        name: "Đầm nữ công sở",
        category: "Đầm",
        price: 45,
        image: "604fa75a969a5a2281c4610ecb87c6c6.jpg"
    }

];

const slides = document.querySelector(".slides");
let total = document.querySelectorAll(".slides img").length;
const next = document.getElementById("next");
const prev = document.getElementById("prev");
let index = 0;
next.onclick = function () {
    index++;

    if (index >= total) {
        index = 0;
    }

    slides.style.transform = `translateX(-${index * 100}vw)`;
};

prev.onclick = function () {
    index--;

    if (index < 0) {
        index = total - 1;
    }

    slides.style.transform = `translateX(-${index * 100}vw)`;
};
/*hien thi danh sach san pham*/
const container = document.querySelector(".product-container");

function displayProducts(list) {
    container.innerHTML = ""; // Xóa các sản phẩm cũ

    for (let i = 0; i < list.length; i++) {
        container.innerHTML += `
            <div class="product-card">
                <img src="${list[i].image}" alt="picture">
                <h3>${list[i].name}</h3>
                <p>${list[i].price}đ</p>
                <button class="add-to-cart">Thêm vào giỏ</button>
            </div>
        `;
    }
}

displayProducts(products);
/*click nut button doi thanh mau cam*/
const classify1 = document.querySelectorAll(".classify1");
for (let i = 0; i < classify1.length; i++) {
    classify1[i].addEventListener('click', function() {
        for (let j = 0; j < classify1.length; j++) {
            classify1[j].classList.remove('active');
        }
        this.classList.add('active');
    });
}
const classify2 = document.querySelectorAll(".classify2");
for (let i = 0; i < classify2.length; i++) {
    classify2[i].addEventListener('click', function() {
        for (let j = 0; j < classify2.length; j++) {
            classify2[j].classList.remove('active');
        }
        this.classList.add('active');
    });
}
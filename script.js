// ===== GIỎ HÀNG + LOCAL STORAGE =====
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(name, price, btn) {
  cart.push({ name, price });
  saveCart();
  renderCart();

  // animation nút
  if (btn) {
    btn.innerText = "✔ Đã thêm";
    btn.style.background = "green";

    setTimeout(() => {
      btn.innerText = "Thêm";
      btn.style.background = "#ff5722";
    }, 1000);
  }
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
}

function renderCart() {
  let cartList = document.getElementById("cart");
  let total = 0;

  cartList.innerHTML = "";

  cart.forEach((item, index) => {
    total += item.price;

    let li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - ${item.price.toLocaleString()}đ 
      <button onclick="removeItem(${index})">❌</button>
    `;
    cartList.appendChild(li);
  });

  document.getElementById("total").innerText =
    "Tổng: " + total.toLocaleString() + "đ";

  // hiệu ứng giỏ hàng
  cartList.classList.add("shake");
  setTimeout(() => {
    cartList.classList.remove("shake");
  }, 200);

  // gửi dữ liệu vào form Netlify
  let cartData = document.getElementById("cartData");
  if (cartData) {
    cartData.value = JSON.stringify(cart);
  }
}

// load khi mở trang
renderCart();


// ===== SLIDER =====
let images = [
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
  "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f"
];

let currentIndex = 0;

setInterval(() => {
  currentIndex = (currentIndex + 1) % images.length;

  let slide = document.getElementById("slide");
  if (slide) {
    slide.src = images[currentIndex];
  }
}, 2000);
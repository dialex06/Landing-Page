let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(name, price) {
  cart.push({ name, price });
  saveCart();
  renderCart();
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

  document.getElementById("cartData").value = JSON.stringify(cart);
}

// load khi mở trang
renderCart();
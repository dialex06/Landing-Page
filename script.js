const products = [
  {
    name: "Áo thun",
    price: 100000,
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400"
  },
  {
    name: "Quần jeans",
    price: 300000,
    img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400"
  },
  {
    name: "Giày",
    price: 500000,
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"
  }
];
function renderProducts(){
  const container = document.getElementById("productContainer");
  container.innerHTML = "";

  products.forEach((p, index)=>{
    container.innerHTML += `
      <div class="product">
        <img src="${p.img}">
        <h4>${p.name}</h4>
        <p>${p.price.toLocaleString()}đ</p>
      </div>
    `;
  });
}

// GỌI HÀM
renderProducts();

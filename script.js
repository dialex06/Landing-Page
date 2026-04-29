const products = [
 {name:"Áo thun trắng", price:100000, category:"áo", img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"},
 {name:"Quần jeans xanh", price:300000, category:"quần", img:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246"},
 {name:"Áo hoodie", price:250000, category:"áo", img:"https://images.unsplash.com/photo-1512436991641-6745cdb1723f"},
 {name:"Áo sơ mi", price:200000, category:"áo", img:"https://images.unsplash.com/photo-1523381210434-271e8be1f52b"},
 {name:"Quần short", price:150000, category:"quần", img:"https://images.unsplash.com/photo-1520975916090-3105956dac38"},
 {name:"Quần kaki", price:180000, category:"quần", img:"https://images.unsplash.com/photo-1520975916090-3105956dac38"},
 {name:"Áo khoác", price:350000, category:"áo", img:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246"},
 {name:"Quần thể thao", price:120000, category:"quần", img:"https://images.unsplash.com/photo-1512436991641-6745cdb1723f"},
 {name:"Áo ba lỗ", price:80000, category:"áo", img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"},
 {name:"Quần jean rách", price:320000, category:"quần", img:"https://images.unsplash.com/photo-1523381210434-271e8be1f52b"}
];

// ===== Cart =====
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(name, price, btn){
    cart.push({name, price});
    saveCart();
    renderCart();

    if(btn){
        btn.innerText = "✓ Đã thêm";
        btn.style.background = "green";

        setTimeout(()=>{
            btn.innerText = "Thêm";
            btn.style.background = "#ff5722";
        },1000);
    }
}

function removeItem(index){
    cart.splice(index,1);
    saveCart();
    renderCart();
}

function renderCart(){
    let cartList = document.getElementById("cart");
    let total = 0;

    cartList.innerHTML = "";

    cart.forEach((item,i)=>{
        total += item.price;

        let li = document.createElement("li");
        li.innerHTML = `
            ${item.name} - ${item.price.toLocaleString()}đ
            <button onclick="removeItem(${i})">X</button>
        `;
        cartList.appendChild(li);
    });

    document.getElementById("total").innerText =
        "Tổng: " + total.toLocaleString() + "đ";
}

// ===== Products Render =====
let currentCategory = "all",
    currentPage = 1,
    itemsPerPage = 6;

function renderProducts(){
    let container = document.getElementById("productContainer");

    let filtered = products.filter(p =>
        currentCategory == "all" || p.category == currentCategory
    );

    let searchVal =
        document.getElementById("searchInput").value.toLowerCase();

    if(searchVal){
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(searchVal)
        );
    }

    const totalPages =
        Math.ceil(filtered.length / itemsPerPage);

    if(currentPage > totalPages) currentPage = 1;

    const start = (currentPage-1)*itemsPerPage,
          end   = start + itemsPerPage;

    let show = filtered.slice(start,end);

    container.innerHTML = "";

    show.forEach(item=>{
        container.innerHTML += `
        <div class="card">
            <img src="${item.img}">
            <h3>${item.name}</h3>
            <p>${item.price.toLocaleString()}đ</p>
            <button onclick="addToCart(
                '${item.name}',
                ${item.price},
                this
            )">Thêm</button>
        </div>
        `;
    });

    renderPagination(totalPages);
}

function filterCategory(cat){
    currentCategory = cat;
    currentPage = 1;
    renderProducts();
}

function searchProduct(){
    currentPage = 1;
    renderProducts();
}

// ===== Pagination =====
function renderPagination(totalPages){
    let page = document.getElementById("pagination");

    if(!page) return;

    page.innerHTML = "";

    for(let i=1;i<=totalPages;i++){
        page.innerHTML += `
        <button onclick="goPage(${i})">
            ${i}
        </button>`;
    }
}

function goPage(i){
    currentPage = i;
    renderProducts();
}

// ===== Checkout =====
document
.getElementById("checkoutBtn")
.onclick = function(){

    if(cart.length == 0){
        alert("Giỏ hàng trống!");
        return;
    }

    alert("Thanh toán thành công!");
    cart = [];
    saveCart();
    renderCart();
};

// ===== Start =====
renderProducts();
renderCart();

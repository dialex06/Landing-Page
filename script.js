// ===== Products Data =====
const products=[
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
let cart=JSON.parse(localStorage.getItem("cart"))||[];
function saveCart(){ localStorage.setItem("cart",JSON.stringify(cart)); }
function addToCart(name,price,btn){ cart.push({name,price}); saveCart(); renderCart();
if(btn){ btn.innerText="✔ Đã thêm"; btn.style.background="green"; setTimeout(()=>{btn.innerText="Thêm"; btn.style.background="#ff5722"},1000);} }
function removeItem(index){ cart.splice(index,1); saveCart(); renderCart(); }
function renderCart(){ let cartList=document.getElementById("cart"); let total=0; cartList.innerHTML=""; cart.forEach((item,i)=>{ total+=item.price; let li=document.createElement("li"); li.innerHTML=`${item.name} - ${item.price.toLocaleString()}đ <button onclick="removeItem(${i})">❌</button>`; cartList.appendChild(li); }); document.getElementById("total").innerText="Tổng: "+total.toLocaleString()+"đ"; cartList.classList.add("shake"); setTimeout(()=>{cartList.classList.remove("shake");},200); }

// ===== Products Render =====
let currentCategory="all", currentPage=1, itemsPerPage=6;
function renderProducts(){
  let container=document.getElementById("productContainer");
  let filtered=products.filter(p=>currentCategory==="all"||p.category===currentCategory);
  let searchVal=document.getElementById("searchInput").value.toLowerCase();
  if(searchVal) filtered=filtered.filter(p=>p.name.toLowerCase().includes(searchVal));
  const totalPages=Math.ceil(filtered.length/itemsPerPage);
  if(currentPage>totalPages) currentPage=1;
  const start=(currentPage-1)*itemsPerPage, end=start+itemsPerPage;
  const paginated=filtered.slice(start,end);

  container.innerHTML="";
  paginated.forEach(p=>{
    const card=document.createElement("div");
    card.className="card";
    card.innerHTML=`
      <img src="${p.img}" alt="${p.name}">
      <h4>${p.name}</h4>
      <p>${p.price.toLocaleString()}đ</p>
      <button onclick="addToCart('${p.name}',${p.price},this)">Thêm</button>
      <button class="detailsBtn">Xem chi tiết</button>
    `;
    container.appendChild(card);
  });

  // Pagination buttons
  let pagHTML="<div style='text-align:center;margin:10px'>";
  for(let i=1;i<=totalPages;i++) pagHTML+=`<button onclick="gotoPage(${i})" ${i===currentPage?'style="font-weight:bold"':''}>${i}</button>`;
  pagHTML+="</div>";
  container.innerHTML+=pagHTML;
}

function filterCategory(cat){ currentCategory=cat; currentPage=1; renderProducts(); }
function searchProduct(){ currentPage=1; renderProducts(); }
function gotoPage(page){ currentPage=page; renderProducts(); }

// ===== Slider =====
let images=[
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
  "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f"
];
let index=0; setInterval(()=>{ index=(index+1)%images.length; document.getElementById("slide").src=images[index]; },2000);

// Initial Render
renderProducts(); renderCart();
function checkout() {
  if(cart.length === 0){
    alert("Giỏ hàng trống!");
    return;
function checkout(){
  if(cart.length===0){ 
    alert("Giỏ hàng trống!"); 
    return; 
  }
  
  let total = cart.reduce((sum, item) => sum + item.price, 0);
  
  // Demo alert; sau này có thể tích hợp Stripe/Netlify
  alert(`Bạn đã thanh toán thành công! Tổng: ${total.toLocaleString()}đ`);
  
  // Clear giỏ hàng

  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  if(!name || !phone){ 
    alert("Vui lòng điền Tên và Số điện thoại!"); 
    return; 
  }

  const total = cart.reduce((sum,item)=>sum+item.price,0);

  // Tạo nội dung hóa đơn
  let bill = `
    <h2>🎫 HÓA ĐƠN MUA HÀNG</h2>
    <p><strong>Khách hàng:</strong> ${name}</p>
    <p><strong>SĐT:</strong> ${phone}</p>
    <hr>
    <ul>
  `;
  cart.forEach(item => {
    bill += `<li>${item.name} - ${item.price.toLocaleString()}đ</li>`;
  });
  bill += `</ul><hr>
    <p><strong>Tổng:</strong> ${total.toLocaleString()}đ</p>
  `;

  // Mở popup in bill
  const printWindow = window.open('', '', 'width=400,height=600');
  printWindow.document.write(bill);
  printWindow.document.close();
  printWindow.print();

  // Clear cart
  cart = [];
  saveCart();
  renderCart();

  // Xóa form
  document.getElementById("customerName").value = '';
  document.getElementById("customerPhone").value = '';
}

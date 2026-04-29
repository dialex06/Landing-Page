const products = [
{name:"Áo thun trắng",price:100000,img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"},
{name:"Quần jeans xanh",price:300000,img:"https://images.unsplash.com/photo-1541099649105-f69ad21f3246"},
{name:"Áo hoodie",price:250000,img:"https://images.unsplash.com/photo-1512436991641-6745cdb1723f"},
{name:"Áo sơ mi",price:200000,img:"https://images.unsplash.com/photo-1523381210434-271e8be1f52b"},
{name:"Quần short",price:150000,img:"https://images.unsplash.com/photo-1520975916090-3105956dac38"},
{name:"Quần kaki",price:180000,img:"https://images.unsplash.com/photo-1506629905607-d9d0e1d1b4d6"},
{name:"Áo khoác",price:350000,img:"https://images.unsplash.com/photo-1496747611176-843222e1e57c"},
{name:"Quần thể thao",price:120000,img:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f"},
{name:"Áo ba lỗ",price:80000,img:"https://images.unsplash.com/photo-1483985988355-763728e1935b"},
{name:"Quần jean rách",price:320000,img:"https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb"},
{name:"Áo polo",price:190000,img:"https://images.unsplash.com/photo-1507679799987-c73779587ccf"},
{name:"Áo len",price:270000,img:"https://images.unsplash.com/photo-1529139574466-a303027c1d8b"}
];

let cart=[];

// Render sản phẩm
function renderProducts(){

 let key=document.getElementById("search").value.toLowerCase();

 let html="";

 products.filter(p=>p.name.toLowerCase().includes(key))
 .forEach((p,i)=>{

 html+=`
 <div class="card">
   <img src="${p.img}">
   <h3>${p.name}</h3>
   <p>${p.price.toLocaleString()}đ</p>
   <button onclick="addCart(${i})">Thêm</button>
 </div>
 `;
 });

 document.getElementById("products").innerHTML=html;
}

// Thêm giỏ
function addCart(i){
 cart.push(products[i]);
 renderCart();
}

// Xóa
function removeCart(i){
 cart.splice(i,1);
 renderCart();
}

// Render giỏ
function renderCart(){

 let html="";
 let total=0;

 cart.forEach((p,i)=>{
 total+=p.price;

 html+=`
 <li>
   ${p.name} - ${p.price.toLocaleString()}đ
   <button class="del" onclick="removeCart(${i})">X</button>
 </li>
 `;
 });

 document.getElementById("cart").innerHTML=html;
 document.getElementById("total").innerText=
 "Tổng: "+total.toLocaleString()+"đ";
}

// Thanh toán
function checkout(){

 let name=document.getElementById("name").value;
 let phone=document.getElementById("phone").value;

 if(name=="" || phone==""){
   alert("Nhập tên và số điện thoại");
   return;
 }

 if(cart.length==0){
   alert("Chưa có sản phẩm");
   return;
 }

 let total=0;
 let detail="";

 cart.forEach(p=>{
   total+=p.price;
   detail+=`${p.name} - ${p.price.toLocaleString()}đ\n`;
 });

 let bill=`
=======================
      HÓA ĐƠN
=======================
Khách hàng: ${name}
SĐT: ${phone}

Sản phẩm:
${detail}

TỔNG TIỀN: ${total.toLocaleString()}đ

Cảm ơn quý khách!
=======================
`;

 document.getElementById("bill").innerText=bill;

 window.print();

 cart=[];
 renderCart();
}

renderProducts();

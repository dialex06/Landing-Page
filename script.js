const products = [
  let total = 0;

  cart.forEach((item, i)=>{
    total += item.price;
    cartEl.innerHTML += `
      <li>
        ${item.name} - ${item.price.toLocaleString()}đ
        <button onclick="removeItem(${i})">X</button>
      </li>
    `;
  });

  totalEl.innerText = "Tổng: " + total.toLocaleString() + "đ";
}

function removeItem(index){
  cart.splice(index,1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function checkout(){
  const name = document.getElementById("customerName").value;
  const phone = document.getElementById("customerPhone").value;

  if(!name || !phone){
    alert("Nhập đầy đủ thông tin!");
    return;
  }

  let total = cart.reduce((sum, item)=> sum + item.price, 0);

  let billWindow = window.open('', '', 'width=400,height=600');
  billWindow.document.write(`
    <h2>HÓA ĐƠN</h2>
    <p>Khách: ${name}</p>
    <p>SĐT: ${phone}</p>
    <hr>
    ${cart.map(i=> `<p>${i.name} - ${i.price}đ</p>`).join('')}
    <hr>
    <h3>Tổng: ${total}đ</h3>
  `);

  localStorage.removeItem("cart");
  cart = [];
  renderCart();
}

renderProducts();
renderCart();

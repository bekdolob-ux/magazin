let products = JSON.parse(localStorage.getItem("products")) || [];
let today = new Date().toLocaleDateString();
let savedDate = localStorage.getItem("todayDate");

if (savedDate !== today) {
  localStorage.setItem("todayDate", today);
  localStorage.setItem("todaySales", 0);
  localStorage.setItem("todayCount", 0);
}

let todaySales = Number(localStorage.getItem("todaySales")) || 0;
let todayCount = Number(localStorage.getItem("todayCount")) || 0;
let total = localStorage.getItem("total") || 0;

document.getElementById("total").textContent = total;
document.getElementById("todaySales").textContent = todaySales;
document.getElementById("todayCount").textContent = todayCount;
function login() {
  const pin = document.getElementById("pinInput").value;
  if (pin === "1234") {
    document.getElementById("login").style.display = "none";
    document.getElementById("app").style.display = "block";
    renderProducts();
  } else {
    alert("PIN туура эмес");
  }
}

function addProduct() {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const qty = document.getElementById("qty").value;

  if (!name || !price || !qty) return;

  products.push({
    name: name,
    price: Number(price),
    qty: Number(qty)
  });

  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();
}

function renderProducts() {
  const container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach((p, index) => {
    container.innerHTML += `
    <div style="margin-bottom:15px;background:white;padding:12px;border-radius:12px;">
      
      <strong>${p.name}</strong> - ${p.price} сом
      
      <br>📦 Калдык: ${p.qty}
     
      <br>
<span style="font-weight:bold;color:${p.qty === 0 ? 'red' : p.qty <= 2 ? 'orange' : 'green'}">
${p.qty === 0 ? '🔴 Жок' : p.qty <= 2 ? '🟡 Аз калды' : '🟢 Бар'}
</span>

      <br>

      <button onclick="sell(${index})"
        ${p.qty <= 0 ? "disabled" : ""}
        style="margin-top:8px;background:#ffc107;padding:8px;border:none;border-radius:8px;">
        ${p.qty <= 0 ? "Түгөндү" : "Сатуу"}
      </button>

      <button onclick="removeProduct(${index})"
        style="margin-top:8px;background:#e53935;color:white;padding:8px;border:none;border-radius:8px;">
        🗑 Өчүрүү
      </button>

    </div>
    `;
  });
}

function sell(index) {
  if (products[index].qty <= 0) return;

  products[index].qty -= 1;
  total = Number(total) + products[index].price;
todaySales += products[index].price;
todayCount += 1;

localStorage.setItem("todaySales", todaySales);
localStorage.setItem("todayCount", todayCount);
  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("total", total);
document.getElementById("todaySales").textContent = todaySales;
document.getElementById("todayCount").textContent = todayCount;
  document.getElementById("total").textContent = total;
  renderProducts();
}

function removeProduct(index) {
  if (confirm("Чын эле өчүрөсүзбү?")) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    renderProducts();
  }
}

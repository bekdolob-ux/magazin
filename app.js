let products = JSON.parse(localStorage.getItem("products")) || [];
let total = localStorage.getItem("total") || 0;

document.getElementById("total").textContent = total;

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
      <div style="margin-bottom:10px;">
        ${p.name} - ${p.price} сом 
        <br>📦 Калдык: ${p.qty}
        <button onclick="sell(${index})" ${p.qty <= 0 ? "disabled" : ""}>
          ${p.qty <= 0 ? "Түгөндү" : "Сатуу"}
        </button>
      </div>
    `;
  });
}

function sell(index) {
  if (products[index].qty <= 0) return;

  products[index].qty -= 1;
  total = Number(total) + products[index].price;

  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("total", total);

  document.getElementById("total").textContent = total;
  renderProducts();
}

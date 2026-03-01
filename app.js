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

  if (!name || !price) return;

  products.push({ name, price: Number(price) });
  localStorage.setItem("products", JSON.stringify(products));

  renderProducts();
}

function renderProducts() {
  const container = document.getElementById("products");
  container.innerHTML = "";

  products.forEach((p, index) => {
    container.innerHTML += `
      <div>
        ${p.name} - ${p.price} сом
        <button onclick="sell(${index})">Сатуу</button>
      </div>
    `;
  });
}

function sell(index) {
  total = Number(total) + products[index].price;
  localStorage.setItem("total", total);
  document.getElementById("total").textContent = total;
}

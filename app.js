let products = JSON.parse(localStorage.getItem("products")) || [];

const list = document.getElementById("list");
const totalSpan = document.getElementById("total");

function save() {
    localStorage.setItem("products", JSON.stringify(products));
}

function render() {
    list.innerHTML = "";
    let total = 0;

    products.forEach((product, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${product.name} - ${product.price} сом
            <button class="delete" onclick="removeProduct(${index})">X</button>
        `;
        list.appendChild(li);
        total += product.price;
    });

    totalSpan.textContent = total;
}

function addProduct() {
    const nameInput = document.getElementById("name");
    const priceInput = document.getElementById("price");

    const name = nameInput.value.trim();
    const price = Number(priceInput.value);

    if (!name || !price) return;

    products.push({ name, price });

    nameInput.value = "";
    priceInput.value = "";

    save();
    render();
}

function removeProduct(index) {
    products.splice(index, 1);
    save();
    render();
}

document.getElementById("addBtn").addEventListener("click", addProduct);

document.getElementById("price").addEventListener("keypress", function(e){
    if(e.key === "Enter") addProduct();
});

render();

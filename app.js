let total = 0;

function addProduct() {
    const name = document.getElementById("name").value;
    const price = Number(document.getElementById("price").value);

    if (name === "" || price === 0) return;

    const li = document.createElement("li");
    li.textContent = name + " - " + price + " сом";
    document.getElementById("list").appendChild(li);

    total += price;
    document.getElementById("total").textContent = total;

    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
}

let products=JSON.parse(localStorage.getItem("products"))||[];
let dayTotal=0;
let dayProfit=0;

function save(){
localStorage.setItem("products",JSON.stringify(products));
}

function showTab(tab){
document.querySelectorAll(".section").forEach(s=>s.classList.remove("active"));
document.getElementById(tab).classList.add("active");
}

function render(){
const adminList=document.getElementById("adminList");
const select=document.getElementById("productSelect");
adminList.innerHTML="";
select.innerHTML="";

products.forEach((p,index)=>{
adminList.innerHTML+=`
<tr>
<td>${p.name}</td>
<td>${p.stock}</td>
<td>${p.price}</td>
</tr>
`;

select.innerHTML+=`
<option value="${index}">${p.name}</option>
`;
});
}

function addProduct(){
const name=document.getElementById("a_name").value;
const cost=Number(document.getElementById("a_cost").value);
const price=Number(document.getElementById("a_price").value);
const stock=Number(document.getElementById("a_stock").value);

if(!name||!cost||!price||!stock)return;

products.push({name,cost,price,stock});
save();
render();
}

function sellProduct(){
const index=document.getElementById("productSelect").value;
const qty=Number(document.getElementById("sellQty").value);

if(!products[index]||qty<=0)return;

if(products[index].stock<qty){
alert("Калдык жетишсиз!");
return;
}

products[index].stock-=qty;
dayTotal+=products[index].price*qty;
dayProfit+=(products[index].price-products[index].cost)*qty;

document.getElementById("dayTotal").textContent=dayTotal;
document.getElementById("dayProfit").textContent=dayProfit;

save();
render();
}

showTab("admin");
render();

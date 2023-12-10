
// var box="";

// for(var i=0 ; i <10 ; i++ ){
//     box+=`<div class="col-md-4">
//     <img class="w-100" src="1_New1.jpg" alt="">
//     <h2>Lorem, ipsum.</h2>
//     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, nisi?</p>
//   </div> `;
// }

// document.getElementById("colContainer").innerHTML=box



/*============================CRUD operations====================================== */
// varibals for INPUT 
var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");

var tBody = document.getElementById("tBody");

var productIndex;

// Array
var allproducts=[];

// localStorage
if(localStorage.getItem("products") != null){
    allproducts = JSON.parse(localStorage.getItem("products"));
    displayAllProduct();
}

// INVOKE : <button onclick="addProduct()"
function addProduct(){
    if(validateProductName() == true)
    {
        var product={
            productName:productName.value,
            productPrice:productPrice.value,
            productCategory:productCategory.value,
            productDescription:productDescription.value,
        }
    allproducts.push(product);
    localStorage.setItem("products", JSON.stringify(allproducts))
    displayAllProduct();
    clearForm();
    console.log(allproducts); 
    } 
    else{
        alert("productName invalid")
    }   
}

// clearForm
function clearForm(){
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productDescription.value = "";
}

function displayAllProduct(){
    var box=``;
    for(var i=0 ; i<allproducts.length ; i++){
        box+=`
        <tr>
        <td>${allproducts[i].productName}</td>
        <td>${allproducts[i].productPrice}</td>
        <td>${allproducts[i].productCategory}</td>
        <td>${allproducts[i].productDescription}</td>
        <td> <button onclick="deleteProduct(${i})" class="btn btn-outline-danger btn-sm">Delete</button></td>
        <td> <button onclick="updateProduct(${i})" class="btn btn-outline-info btn-sm">Update</button></td>
        </tr>
        `
    }
    tBody.innerHTML=box;
}


function deleteProduct(index)
{
allproducts.splice(index,1);
localStorage.setItem("products", JSON.stringify(allproducts))
displayAllProduct();
}

function searchProducts(term)
{
    var box=""
    for(var i=0 ; i<allproducts.length ; i++){
        if(allproducts[i].productName.toLowerCase().includes(term.toLowerCase()) === true)
        {
            box+=`
            <tr>
            <td>${allproducts[i].productName}</td>
            <td>${allproducts[i].productPrice}</td>
            <td>${allproducts[i].productCategory}</td>
            <td>${allproducts[i].productDescription}</td>
            <td> <button onclick="deleteProduct(${i})" class="btn btn-outline-danger btn-sm">Delete</button></td>
            <td> <button onclick="updateProduct(${i})" class="btn btn-outline-info btn-sm">Update</button></td>
            </tr>
            `
        }
        }
        tBody.innerHTML=box;
    }


function updateProduct(index){
  productIndex=index; 
    document.getElementById("addBtn").classList.replace("d-block", "d-none");
    document.getElementById("updateBtn").classList.replace("d-none", "d-block");

productName.value=allproducts[index].productName;
productPrice.value=allproducts[index].productPrice;
productCategory.value=allproducts[index].productCategory;
productDescription.value=allproducts[index].productDescription;
}

function sendUpdate(){

allproducts[productIndex].productName=productName.value;
allproducts[productIndex].productPrice=productPrice.value;
allproducts[productIndex].productCategory=productCategory.value;
allproducts[productIndex].productDescription=productDescription.value;


localStorage.setItem("products", JSON.stringify(allproducts))

displayAllProduct();
document.getElementById("updateBtn").classList.replace("d-block", "d-none");
document.getElementById("addBtn").classList.replace("d-none", "d-block");
clearForm()
}

function validateProductName(){
    var regex= /^[A-Z][a-z]{3,10}$/;
    return regex.test(productName.value)
}
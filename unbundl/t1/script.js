// Sample product data
const products = [
    { name: "Product 1", price: 10.99 },
    // Define Products 2 to 12 here
];

// Initialize variables
const customPack = [];
let totalPrice = 0;

// Function to render products
function renderProducts() {
    const productsDiv = document.querySelector(".products");
    productsDiv.innerHTML = "";

    products.forEach((product, index) => {
        const card = document.createElement("div");
        card.classList.add("product-card");
        card.innerHTML = `
            <img src="product${index + 1}.jpg" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: $${product.price.toFixed(2)}</p>
            <button onclick="addToCustomPack(${index})">Add to Pack</button>
        `;
        productsDiv.appendChild(card);
    });
}

// Function to add product to custom pack
function addToCustomPack(index) {
    if (customPack.length >= 8) {
        alert("You can't add more than 8 products.");
        return;
    }

    const selectedProduct = products[index];
    customPack.push(selectedProduct);
    totalPrice += selectedProduct.price;

    // Store cart data in localStorage
    localStorage.setItem('cartItems', JSON.stringify(customPack));
    localStorage.setItem('totalPrice', totalPrice);

    // Update total price in the cart
    const totalPriceElement = document.querySelector("#total-price");
    totalPriceElement.textContent = totalPrice.toFixed(2);

    // Display a toast message
    showToast("Product added to custom pack.");
}

// Function to display a toast message
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = "show";
    setTimeout(function () {
        toast.className = toast.className.replace("show", "");
    }, 3000);
}

// Initialize the UI
window.onload = function () {
    renderProducts();
};

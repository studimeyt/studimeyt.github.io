// Sample product data
const products = [
    { name: "Whittaker's", price: 10.99 },
    { name: "Toblerone", price: 12.99 },
    { name: "Hershey's", price: 8.99 },
    { name: "m&m's", price: 9.99 },
    { name: "Maltesers", price: 11.99 },
    { name: "KitKat", price: 7.99 },
    { name: "Chupa Chups", price: 13.99 },
    { name: "Werther's Original", price: 6.99 },
    { name: "Godiva", price: 14.99 },
    { name: "E. Wedel", price: 5.99 },
    { name: "Lindt", price: 16.99 },
    { name: "Cadbury", price: 4.99 }
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

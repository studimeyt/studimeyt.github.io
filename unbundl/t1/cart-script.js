// cart-script.js

// Function to display custom pack in cart.html
function displayCustomPack() {
    // Retrieve custom pack items and total price from localStorage
    const customPack = JSON.parse(localStorage.getItem('cartItems')) || [];
    const totalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;

    // Update the cart section in cart.html
    const customPackList = document.querySelector("#custom-pack");
    const totalPriceElement = document.querySelector("#total-price");

    customPackList.innerHTML = "";
    customPack.forEach(product => {
        const listItem = document.createElement("li");
        listItem.textContent = `${product.name} - $${product.price.toFixed(2)}`;
        listItem.classList.add("list-group-item"); // Add the list-group-item class
        customPackList.appendChild(listItem);
    });


    totalPriceElement.textContent = totalPrice.toFixed(2);
}

// Function to empty the cart
function emptyCart() {
    localStorage.removeItem('cartItems');
    localStorage.removeItem('totalPrice');
    displayCustomPack();
}

// Call the function to display custom pack when cart.html is loaded
window.onload = function () {
    displayCustomPack();
};

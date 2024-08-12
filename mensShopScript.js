
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartCountElement = document.getElementById("cart-count");
const cartItemsElement = document.getElementById("cart-items");
const cartTotalElement = document.getElementById("cart-total");
const cartButton = document.getElementById("cart-button");
const modal = document.getElementById("cart-modal");
const closeModal = document.querySelector(".close");

// Función para actualizar el número de productos en el carrito
function updateCartCount() {
    cartCountElement.textContent = cart.length;
}

// Función para calcular y actualizar el total del carrito
function updateCartTotal() {
    let total = 0;
    cart.forEach(item => {
        total += parseFloat(item.price);
    });
    cartTotalElement.textContent = total.toFixed(2);
}

// Función para renderizar los productos en el carrito
function renderCart() {
    cartItemsElement.innerHTML = ""; // Limpia el contenido anterior
    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - $${item.price}`;
        const removeButton = document.createElement("button");
        removeButton.innerHTML = "🗑️";
        removeButton.style.marginLeft = "10px";
        removeButton.addEventListener("click", function () {
            removeFromCart(index);
        });
        li.appendChild(removeButton);
        cartItemsElement.appendChild(li);
    });
    updateCartCount();
    updateCartTotal();
}

// Función para agregar un producto al carrito
function addToCart(product) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart)); // Guarda el carrito en LocalStorage
    renderCart();
}

// Función para eliminar un producto del carrito
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart)); // Actualiza el LocalStorage
    renderCart();
}

// Evento para abrir el modal
cartButton.addEventListener("click", function () {
    modal.style.display = "flex";
});

// Evento para cerrar el modal
closeModal.addEventListener("click", function () {
    modal.style.display = "none";
});

// Evento para agregar productos al carrito
const addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach(button => {
    button.addEventListener("click", function (e) {
        const productElement = e.target.parentElement;
        const name = productElement.querySelector("h3").textContent;
        const price = productElement.querySelector("p").textContent.replace("$", "");
        const product = { name, price };
        addToCart(product); // Agrega el producto al carrito
    });
});

// Renderiza el carrito al cargar la página para mostrar el contenido de LocalStorage
renderCart();

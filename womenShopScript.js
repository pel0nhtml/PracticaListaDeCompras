document.addEventListener("DOMContentLoaded", function () {
    let cart = [];
    const cartCountElement = document.getElementById('cart-count');
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartButton = document.getElementById('cart-button');
    const modal = document.getElementById('cart-modal');
    const closeModal = document.querySelector('.close');

    function updateCartCount() {
        cartCountElement.textContent = cart.length;
    }

    function updateCartTotal() {
        let total = 0;
        cart.forEach(item => {
            total += parseFloat(item.price);
        });
        cartTotalElement.textContent = total.toFixed(2);
    }

    function renderCart() {
        cartItemsElement.innerHTML = '';
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price}`;
            const removeButton = document.createElement('button');
            removeButton.textContent = '🗑️';
            removeButton.addEventListener('click', function () {
                removeFromCart(index);
            });
            li.appendChild(removeButton);
            cartItemsElement.appendChild(li);
        });
        updateCartCount();
        updateCartTotal();
    }

    function addToCart(product) {
        cart.push(product);
        renderCart();
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        renderCart();
    }

    cartButton.addEventListener('click', function () {
        modal.style.display = 'flex';
    });

    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            const productElement = e.target.parentElement;
            const name = productElement.querySelector('h3').textContent;
            const price = productElement.querySelector('p').textContent.replace('$', '');
            const product = { name, price };
            addToCart(product);
        });
    });
});

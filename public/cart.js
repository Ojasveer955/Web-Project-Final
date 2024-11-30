// Select elements
const cartItems = document.querySelector(".cart-items");
const cartSubtotal = document.getElementById("cart-subtotal");
const itemCount = document.getElementById("item-count");
const savedItems = document.getElementById("saved-items");
const savedCount = document.getElementById("saved-count");

// Update subtotal
function updateSubtotal() {
  let subtotal = 0;
  const items = document.querySelectorAll(".cart-item");
  items.forEach(item => {
    const price = parseFloat(item.dataset.price);
    const quantity = parseInt(item.querySelector(".quantity-value").textContent);
    subtotal += price * quantity;
  });
  cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
  itemCount.textContent = `${items.length} items`;
}

// Increase quantity
function increaseQuantity(event) {
  const quantityElement = event.target.parentElement.querySelector(".quantity-value");
  let quantity = parseInt(quantityElement.textContent);
  quantity++;
  quantityElement.textContent = quantity;
  updateSubtotal();
}

// Decrease quantity
function decreaseQuantity(event) {
  const quantityElement = event.target.parentElement.querySelector(".quantity-value");
  let quantity = parseInt(quantityElement.textContent);
  if (quantity > 1) {
    quantity--;
    quantityElement.textContent = quantity;
    updateSubtotal();
  }
}

// Delete item
function deleteItem(event) {
  const cartItem = event.target.closest(".cart-item");
  cartItem.remove();
  updateSubtotal();
}

// Save for Later
function saveForLater(event) {
  const cartItem = event.target.closest(".cart-item");
  const clonedItem = cartItem.cloneNode(true);

  // Remove cart-specific actions and move to "Saved for Later"
  clonedItem.querySelector(".save-for-later").remove();
  clonedItem.querySelector(".quantity").remove();
  clonedItem.querySelector(".delete").addEventListener("click", () => clonedItem.remove());

  savedItems.appendChild(clonedItem);
  savedCount.textContent = savedItems.children.length;

  // Remove item from cart
  cartItem.remove();
  updateSubtotal();
}

// Add event listeners
cartItems.addEventListener("click", event => {
  if (event.target.classList.contains("increase")) {
    increaseQuantity(event);
  } else if (event.target.classList.contains("decrease")) {
    decreaseQuantity(event);
  } else if (event.target.classList.contains("delete")) {
    deleteItem(event);
  } else if (event.target.classList.contains("save-for-later")) {
    saveForLater(event);
  }
});

// Initial subtotal calculation
updateSubtotal();

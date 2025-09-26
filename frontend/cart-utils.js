function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function updateCartCount() {
  const cart = getCart();
  const countSpan = document.querySelector(".item-count");
  if (countSpan) {
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    countSpan.textContent = totalQty > 0 ? totalQty : "";
  }
}

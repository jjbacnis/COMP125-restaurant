(function () {
  const TAX_RATE = 0.13;

  function calculateOrder() {
    const rows = document.querySelectorAll('#order-table tbody tr');
    const orderedItems = document.getElementById('ordered-items');
    const subtotalElement = document.getElementById('subtotal');
    const taxElement = document.getElementById('tax');
    const totalElement = document.getElementById('total');

    let subtotal = 0;
    const listItems = [];

    rows.forEach((row) => {
      const itemName = row.dataset.item;
      const price = Number(row.dataset.price);
      const quantityInput = row.querySelector('input[type="number"]');
      const quantity = Math.max(0, Number(quantityInput.value) || 0);

      if (quantityInput.value !== String(quantity)) {
        quantityInput.value = String(quantity);
      }

      if (quantity > 0) {
        const lineTotal = price * quantity;
        subtotal += lineTotal;
        listItems.push(`<li>${itemName} x ${quantity} = $${lineTotal.toFixed(2)}</li>`);
      }
    });

    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;

    orderedItems.innerHTML = listItems.length ? listItems.join('') : '<li>No items selected yet.</li>';
    subtotalElement.textContent = subtotal.toFixed(2);
    taxElement.textContent = tax.toFixed(2);
    totalElement.textContent = total.toFixed(2);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const quantityInputs = document.querySelectorAll('#order-table input[type="number"]');
    const calculateButton = document.getElementById('calculate-btn');

    quantityInputs.forEach((input) => {
      input.addEventListener('input', calculateOrder);
    });

    calculateButton.addEventListener('click', calculateOrder);
    calculateOrder();
  });
})();

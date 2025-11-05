document.addEventListener('DOMContentLoaded', () => {
  const nameEl = document.getElementById('name');
  const qtyEl = document.getElementById('qty');
  const priceEl = document.getElementById('price');
  const addBtn = document.getElementById('add');
  const listEl = document.getElementById('list');

  let items = JSON.parse(localStorage.getItem('inventory') || '[]');

  function save() {
    localStorage.setItem('inventory', JSON.stringify(items));
  }

  function render() {
    listEl.innerHTML = '';
    items.forEach((item, i) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.name}</td>
        <td><input type="number" min="0" value="${item.qty}" class="qty"></td>
        <td>${item.price.toFixed(2)}</td>
        <td><button class="action-btn">Delete</button></td>
      `;

      row.querySelector('.qty').addEventListener('change', e => {
        item.qty = parseInt(e.target.value) || 0;
        save();
      });

      row.querySelector('.action-btn').addEventListener('click', () => {
        items.splice(i, 1);
        save();
        render();
      });

      listEl.appendChild(row);
    });
  }

  addBtn.addEventListener('click', () => {
    const name = nameEl.value.trim();
    const qty = parseInt(qtyEl.value);
    const price = parseFloat(priceEl.value);

    if (!name || isNaN(qty) || qty <= 0 || isNaN(price)) {
      alert('Please fill all fields correctly.');
      return;
    }

    const existing = items.find(p => p.name.toLowerCase() === name.toLowerCase());
    if (existing) {
      existing.qty += qty;
      existing.price = price; // update price if changed
    } else {
      items.push({ name, qty, price });
    }

    save();
    render();

    nameEl.value = '';
    qtyEl.value = '';
    priceEl.value = '';
    nameEl.focus();
  });
const aiBtn = document.getElementById('ai-check');
const aiResult = document.getElementById('ai-result');

aiBtn.addEventListener('click', () => {
  if (items.length === 0) {
    aiResult.textContent = "No data available yet.";
    return;
  }

  // “AI” logic — finds products with low quantity (<5)
  const lowStock = items.filter(item => item.qty < 5);

  if (lowStock.length === 0) {
    aiResult.textContent = "✅ All products are well stocked!";
  } else {
    const names = lowStock.map(i => `${i.name} (Qty: ${i.qty})`).join(', ');
    aiResult.textContent = `⚠️ Restock suggested for: ${names}`;
  }
});

  render();
});

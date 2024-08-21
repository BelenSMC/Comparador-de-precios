let products = [];
const units = {
    cc: 1,
    ml: 1,
    L: 1000,
    gr: 1,
    Kg: 1000
};

function convertToStandard(value, unit) {
    return value * units[unit];
}

function addProduct() {
    const cost = parseFloat(document.getElementById('cost').value);
    const value = parseFloat(document.getElementById('value').value);
    const unit = document.getElementById('unit').value;

    if (isNaN(cost) || isNaN(value)) {
        alert('Por favor, ingresa valores válidos.');
        return;
    }

    products.push({ cost, value: convertToStandard(value, unit) });
    updateProductList();
}

function updateProductList() {
    products.sort((a, b) => a.cost / a.value - b.cost / b.value);
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach((product, index) => {
        const item = document.createElement('li');
        item.className = 'product';
        item.classList.add(index === 0 ? 'low-value' : 'high-value');
        item.innerHTML = `
            Producto ${index + 1}: ${product.cost} CLP / ${product.value} (Volumen/Peso)
            <button class="delete" onclick="removeProduct(${index})">Eliminar</button>
        `;
        productList.appendChild(item);
    });
}

function removeProduct(index) {
    products.splice(index, 1);
    updateProductList();
}

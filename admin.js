document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById("admin-product-modal");
    var span = document.getElementsByClassName("close")[0];
    var productsContainer = document.getElementById("admin-products");
    var form = document.getElementById("admin-product-form");
    var deleteButton = document.getElementById("delete-button");
    var addButton = document.getElementById("add-product-button");

    var products = JSON.parse(localStorage.getItem('products')) || [
        {id: 1, name: 'Одеяло 1', img: 'product1.jpg', price: 1000},
        {id: 2, name: 'Одеяло 2', img: 'product2.jpg', price: 1500},
    ];

    function saveProducts() {
        localStorage.setItem('products', JSON.stringify(products));
    }

    function loadProducts() {
        productsContainer.innerHTML = '';
        products.forEach(product => {
            var productElement = document.createElement("div");
            productElement.className = "admin-product";
            productElement.innerHTML = `
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.price} руб</p>
                <button onclick="editProduct(${product.id})">Редактировать</button>
            `;
            productsContainer.appendChild(productElement);
        });
    }

    loadProducts();

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    addButton.onclick = function() {
        document.getElementById("product-id").value = '';
        document.getElementById("product-name").value = '';
        document.getElementById("product-img").value = '';
        document.getElementById("product-price").value = '';
        modal.style.display = "block";
        deleteButton.style.display = 'none';
    }

    window.editProduct = function(productId) {
        var product = products.find(p => p.id === productId);
        document.getElementById("product-id").value = product.id;
        document.getElementById("product-name").value = product.name;
        document.getElementById("product-img").value = product.img;
        document.getElementById("product-price").value = product.price;
        modal.style.display = "block";
        deleteButton.style.display = 'inline-block';
    }

    form.onsubmit = function(event) {
        event.preventDefault();
        var productId = document.getElementById("product-id").value;
        var productName = document.getElementById("product-name").value;
        var productImg = document.getElementById("product-img").value;
        var productPrice = document.getElementById("product-price").value;
        var productFile = document.getElementById("product-file").files[0];

        if (productFile) {
            var reader = new FileReader();
            reader.onload = function(e) {
                productImg = e.target.result;
                saveOrUpdateProduct(productId, productName, productImg, productPrice);
            }
            reader.readAsDataURL(productFile);
        } else {
            saveOrUpdateProduct(productId, productName, productImg, productPrice);
        }
    }

    function saveOrUpdateProduct(productId, productName, productImg, productPrice) {
        if (productId) {
            var product = products.find(p => p.id == productId);
            product.name = productName;
            product.img = productImg;
            product.price = productPrice;
        } else {
            var newProduct = {
                id: products.length ? Math.max(...products.map(p => p.id)) + 1 : 1,
                name: productName,
                img: productImg,
                price: productPrice
            };
            products.push(newProduct);
        }

        modal.style.display = "none";
        saveProducts();
        loadProducts();
    }

    deleteButton.onclick = function() {
        var productId = document.getElementById("product-id").value;
        products = products.filter(p => p.id != productId);
        modal.style.display = "none";
        saveProducts();
        loadProducts();
    }
});
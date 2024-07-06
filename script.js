document.addEventListener('DOMContentLoaded', function() {
    const productsContainer = document.getElementById("products-container");
    let cartItems = [];
    let totalSum = 0;

    // Функция для загрузки продуктов
    function loadProducts() {
        const products = JSON.parse(localStorage.getItem('products')) || [];

        productsContainer.innerHTML = '';

        products.forEach(product => {
            const productElement = createProductElement(product);
            productsContainer.appendChild(productElement);
        });
    }

    // Функция для создания HTML элемента продукта
    function createProductElement(product) {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${formatPrice(product.price)} руб</p>
            <button class="add-to-cart-btn" data-name="${product.name}" data-price="${product.price}">Добавить в корзину</button>
        `;
        productElement.querySelector('.add-to-cart-btn').addEventListener('click', addToCart);
        return productElement;
    }

    // Функция для добавления продукта в корзину
    function addToCart(event) {
        const productName = event.target.dataset.name;
        const productPrice = parseFloat(event.target.dataset.price);

        const existingItem = cartItems.find(item => item.name === productName);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartItems.push({ name: productName, price: productPrice, quantity: 1 });
        }

        renderCart();
    }

    // Функция для отображения корзины
    function renderCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = '';
        totalSum = 0;

        cartItems.forEach(item => {
            const itemElement = document.createElement('li');
            itemElement.textContent = `${item.name} x ${item.quantity} = ${formatPrice(item.price * item.quantity)}`;
            cartItemsContainer.appendChild(itemElement);
            totalSum += item.price * item.quantity;
        });

        document.getElementById('total-price').textContent = `Общая сумма: ${formatPrice(totalSum)}`;
    }

   // Функция для отправки данных о заказе в Telegram
   async function sendOrderToTelegram() {
    const botToken = '6358572761:AAHgq1oVtyshwH7RCskxvzysWF7DaDWrnxE'; // Замените на ваш Bot API token
    const chatId = '6812593469'; // Замените на ваш chat_id

    let message = `Новый заказ:\n\n`;
    cartItems.forEach(item => {
        message += `${item.name} x ${item.quantity} = ${formatPrice(item.price * item.quantity)}\n`;
    });
    message += `\nОбщая сумма: ${formatPrice(totalSum)}`;

    try {
        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
            }),
        });

        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status} ${response.statusText}`);
        }

        // Очищаем корзину после успешной отправки заказа
        cartItems = [];
        renderCart();

        alert('Заказ успешно отправлен в Telegram!');
    } catch (error) {
        console.error('Ошибка при отправке заказа в Telegram:', error.message);
        alert('Произошла ошибка при отправке заказа в Telegram. Пожалуйста, попробуйте позже.');
    }
}

    // Функция для форматирования цены
    function formatPrice(price) {
        return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(price);
    }

    // Обработка нажатия кнопки "Купить"
    document.getElementById('checkout-btn').addEventListener('click', function() {
        sendOrderToTelegram();
    });

    loadProducts();
});
document.addEventListener('DOMContentLoaded', function() {
    const adminLink = document.getElementById('admin-link');
    const adminModal = document.getElementById('admin-login-modal');

    adminLink.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior
        openAdminModal();
    });

    const adminLoginForm = document.getElementById('admin-login-form');
    adminLoginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const adminUsername = document.getElementById('admin-username').value;
        const adminPassword = document.getElementById('admin-password').value;

        // Perform admin authentication (replace with your logic)
        if (adminUsername === '123' && adminPassword === '123') {
            window.location.href = 'admin.html';
        } else {
            alert('Неправильное имя пользователя или пароль.');
        }
    });

    function openAdminModal() {
        adminModal.style.display = 'block';
        const closeBtn = adminModal.querySelector('.close');
        closeBtn.addEventListener('click', function() {
            closeModal(adminModal);
        });
    }

    function closeModal(modal) {
        modal.style.display = 'none';
    }

    // Add additional functionality as needed
});

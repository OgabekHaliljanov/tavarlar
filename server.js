const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let products = [
    {id: 1, name: 'Одеяло 1', img: 'product1.jpg', price: 1000},
    {id: 2, name: 'Одеяло 2', img: 'product2.jpg', price: 1500},
    // Добавьте больше продуктов по необходимости
];

app.get('/products', (req, res) => {
    res.json(products);
});

app.put('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    if (product) {
        product.name = req.body.name;
        product.img = req.body.img;
        product.price = req.body.price;
        res.json(product);
    } else {
        res.status(404).send('Product not found');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Parse incoming JSON request bodies into req.body
app.use(express.json());

// In-memory "database". Resets every time the server restarts.
let products = [
  { id: 1, name: 'Laptop', price: 1299.99, inStock: true },
  { id: 2, name: 'Wireless Mouse', price: 24.5, inStock: true },
  { id: 3, name: 'Mechanical Keyboard', price: 89.0, inStock: false },
];

let nextId = products.length + 1;

// GET /products -> return the full list
app.get('/products', (req, res) => {
  res.json(products);
});

// POST /products -> add a new product from the JSON body
app.post('/products', (req, res) => {
  const { name, price, inStock } = req.body;

  // Basic validation so bad input gets a clear 400 instead of a broken record
  if (typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: '"name" is required and must be a non-empty string.' });
  }
  if (typeof price !== 'number' || Number.isNaN(price) || price < 0) {
    return res.status(400).json({ error: '"price" is required and must be a number >= 0.' });
  }

  const product = {
    id: nextId++,
    name: name.trim(),
    price,
    inStock: typeof inStock === 'boolean' ? inStock : true,
  };

  products.push(product);

  // 201 Created, and echo back the product so the client sees the generated id
  res.status(201).json(product);
});

// Friendly root route so hitting http://localhost:3000 isn't a 404
app.get('/', (req, res) => {
  res.json({
    message: 'Products API',
    routes: ['GET /products', 'POST /products'],
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

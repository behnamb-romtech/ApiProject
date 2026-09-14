# Express Products API

A minimal Express.js API with two routes backed by an in-memory list of products.

| Method | Route       | Description                          |
| ------ | ----------- | ------------------------------------ |
| GET    | `/products` | Returns the list of products         |
| POST   | `/products` | Adds a new product from a JSON body  |

## Setup

```bash
npm install
npm start
```

The server listens on `http://localhost:3000` (override with the `PORT` env var).

## Testing with Postman

1. Start the server with `npm start`.
2. In Postman, click **Import** and select `products-api.postman_collection.json`.
3. Run **GET /products** — you should see the three seeded products with status `200 OK`.
4. Run **POST /products** — the Body tab is already set to **raw → JSON**:

   ```json
   {
     "name": "Monitor",
     "price": 199.99,
     "inStock": true
   }
   ```

   You should get `201 Created` back with the new product and its generated `id`.
5. Run **GET /products** again — the new product is now in the list.
6. Run **POST /products (invalid - missing price)** to see the `400 Bad Request` validation response.

### Doing it manually instead of importing

- **GET:** set the method to `GET`, URL `http://localhost:3000/products`, hit **Send**.
- **POST:** set the method to `POST`, URL `http://localhost:3000/products`, go to
  **Body → raw** and pick **JSON** from the dropdown (this sets the
  `Content-Type: application/json` header — without it `express.json()` will not
  parse the body and `req.body` comes through empty). Paste the JSON above and **Send**.

## Notes

The product list lives in memory, so anything you add is lost when the server
restarts. Swapping `products` for a real database is the natural next step.

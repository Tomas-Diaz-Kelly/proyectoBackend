import express from 'express';



const app = express();
app.use(express.json());

const pm = new ProductManager({ filePath: '../db/productos.json' });

app.get('/products', async (req, res) => {
    const { limit } = req.query;
    try {
        const products = await pm.getProducts();
        const limitedProducts = limit ? products.slice(0, parseInt(limit, 10)) : products;
        res.json(limitedProducts);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/products/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        const product = await pm.getProductById(parseInt(pid, 10));
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

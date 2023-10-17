class ProductManager {
    constructor() {
        this.products = [];
    }

    addProduct({ title, description, price, thumbnail, stock }) {
        if (!title || !description || !price || !thumbnail || !stock) {
            console.log("Error: Todos los campos son obligatorios.");
            return;
        }

        const id = this.products.length + 1; // ID autoincrementable
        const newProduct = new Product({ id, title, description, price, thumbnail, stock });
        this.products.push(newProduct);
        console.log("Producto agregado con éxito.");
    }

    getProductById(productId) {
        const product = this.products.find(product => product.id === productId);
        if (product) {
            console.log('Producto encontrado:');
            console.log(product);
        } else {
            console.log('Producto no encontrado.');
        }
    }
}

class Product {
    constructor({ id, title, description, price, thumbnail, stock }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.stock = stock;
    }
}

const manager = new ProductManager();

manager.addProduct({
    title: "Producto 1",
    description: "Descripción del producto 1",
    price: 29.99,
    thumbnail: "imagen.jpg",
    stock: 30
});

manager.addProduct({
    title: "Producto 2",
    description: "Descripción del producto 2",
    price: 39.99,
    thumbnail: "imagen2.jpg",
    stock: 20
});

manager.addProduct({
    title: "Producto 3",
    description: "Descripción del producto 3",
    price: 19.99,
    thumbnail: "imagen3.jpg",
    stock: 25
});

console.log(manager.products);

// Busca el producto por ID
manager.getProductById(2); 

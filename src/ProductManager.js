import {promises as fs } from 'fs';


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

class ProductManager {
    #products;

    constructor({ filePath }) {
        this.filePath = filePath;
        this.#products = [];
    }

    async #loadProducts() {
        try {
            const data = await fs.readFile(this.filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error al cargar productos desde el archivo:', error);
            return [];
        }
    }
    
    async #saveProducts() {
        try {
            const productsJson = JSON.stringify(this.#products, null, 2);
            await fs.writeFile(this.filePath, productsJson);
        } catch (error) {
            console.error('Error al guardar productos en el archivo:', error);
        }
    }
    

    async addProduct({ title, description, price, thumbnail, stock }) {
        this.#products = await this.#loadProducts();
        const id = this.#products.length > 0 ? this.#products[this.#products.length - 1].id + 1 : 1;
        const newProduct = new Product({ id, title, description, price, thumbnail, stock });
        this.#products.push(newProduct);
        await this.#saveProducts();
        return newProduct;
    }

    async getProducts() {
        this.#products = await this.#loadProducts();
        return this.#products;
    }

    async getProductById(productId) {
        this.#products = await this.#loadProducts();
        return this.#products.find(product => product.id === productId);
    }

    async updateProduct(productId, updatedProduct) {
        this.#products = await this.#loadProducts();
        const index = this.#products.findIndex(product => product.id === productId);
        if (index !== -1) {
            const updatedProductInstance = new Product({ id: productId, ...updatedProduct });
            this.#products[index] = updatedProductInstance;
            await this.#saveProducts();
            return updatedProductInstance;
        } else {
            console.log('Producto no encontrado.');
            return null; 
        }
    }
    

    async deleteProduct(productId) {
        this.#products = await this.#loadProducts();
        const index = this.#products.findIndex(product => product.id === productId);
        if (index !== -1) {
            const deletedProduct = this.#products.splice(index, 1)[0];
            await this.#saveProducts();
            return deletedProduct;
        } else {
            console.log('Producto no encontrado.');
            return null;
        }
    }
}


async function main() {
    const pm = new ProductManager({ filePath: 'productos.json' });

    await pm.addProduct({
        title: 'Producto 1',
        description: 'Descripción del producto 1',
        price: 29.99,
        thumbnail: 'imagen.jpg',
        stock: 30
    });

    await pm.addProduct({
        title: 'Producto 2',
        description: 'Descripción del producto 2',
        price: 39.99,
        thumbnail: 'imagen2.jpg',
        stock: 20
    });

    console.log('Productos:', await pm.getProducts());

    const updatedProduct = await pm.updateProduct(1, {
        title: 'Producto 1 Actualizado',
        price: 39.99
    });
    console.log('Producto actualizado:', updatedProduct);

    const deletedProduct = await pm.deleteProduct(2);
    console.log('Producto eliminado:', deletedProduct);

    console.log('Productos actualizados:', await pm.getProducts());
}

main();

class ProductManager {
    constructor() {
        this.products = [];
    }
    

    addProduct({ title, description, price, thumbnail, code, stock }) {
        const isCodeUnique = !this.products.some(product => product.code === code);

        if (isCodeUnique) {
            const newProduct = new Product({ title, description, price, thumbnail, code, stock });
            this.products.push(newProduct);
            console.log("Producto agregado con éxito.");
        } else {
            console.log("Error: Ya existe un producto con el mismo código.");
            
        }
    }

    


    getProductById(productCode) {
        const product = this.products.find(product => product.code === productCode);
        if (product) {
            console.log('Hay un producto que se repite ');
            console.log(product); 
        } else {
            console.log('Not found');
            
        }
    }
    
}

class Product {
    constructor({ title, description, price, thumbnail, code, stock }) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

const manager = new ProductManager();


manager.addProduct({
    title: "Producto 1",
    description: "Descripción del producto 1",
    price: 29.99,
    thumbnail: "imagen.jpg",
    code: "A001",
    stock: 30
});
// Aca la validacion -----------------------------------------------------------------------
manager.addProduct({
    title: "Producto 1",
    description: "Descripción del producto 1",
    price: 29.99,
    thumbnail: "imagen.jpg",
    code: "A001",
    stock: 30
});
//------------------------------------------------------------------------------------------

manager.addProduct({
    title: "Producto 2",
    description: "Descripción del producto 2",
    price: 39.99,
    thumbnail: "imagen2.jpg",
    code: "A002",
    stock: 20
});


manager.addProduct({
    title: "Producto 3",
    description: "Descripción del producto 3",
    price: 19.99,
    thumbnail: "imagen3.jpg",
    code: "A003",
    stock: 25
});

console.log(manager.products);

// Aca imprimo en consola el "Not found"

manager.getProductById('A004');




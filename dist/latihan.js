import express, {} from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const HOST = process.env.HOST;
const PORT = process.env.PORT;
app.use(express.json());
let products = [
    { id: 1, nama: "Laptop Gaming", deskripsi: "Intel i7, RTX 3060", harga: 15000000 },
    { id: 2, nama: "Keyboard Mekanikal", deskripsi: "Blue Switch, RGB", harga: 800000 },
    { id: 3, nama: "Mouse Wireless", deskripsi: "Ergonomic, Silent Click", harga: 300000 }
];
app.get('/', (_req, res) => {
    res.json({
        message: "Selamat datang di API E-Commerce!",
        hari: 3,
        status: "Server hidup!"
    });
});
app.get('/api/products', (_req, res) => {
    res.json({
        status: true,
        jumlah: products.length,
        data: products
    });
});
app.get('/api/products/:id', (req, res) => {
    if (!req.params.id) {
        res.json({
            message: "id tidak ditemukan"
        });
        return;
    }
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    if (!product) {
        res.json({
            status: false,
            message: "product tidak ditemukan"
        });
    }
    res.json({
        status: true,
        data: product
    });
});
app.get('/api/search', (req, res) => {
    const { name, max_price } = req.query;
    let result = products;
    if (name) {
        result = result.filter(p => p.nama.toLowerCase().includes(name.toLowerCase()));
    }
    if (max_price) {
        result = result.filter(p => p.harga <= Number(max_price));
    }
    res.json({
        success: true,
        filtered_result: result
    });
});
app.post('/api/products', (req, res) => {
    const { nama, deskripsi, harga } = req.body;
    const newProduct = {
        id: products.length + 1,
        nama,
        deskripsi,
        harga: Number(harga)
    };
    products.push(newProduct);
    res.status(201).json({
        success: true,
        message: "Produk berhasil ditambahkan",
        data: newProduct
    });
});
app.listen(PORT, () => {
    console.log(`server running at ${HOST}, ${PORT}`);
});
//# sourceMappingURL=latihan.js.map
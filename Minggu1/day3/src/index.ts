import type { Request, Response } from 'express';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT

app.use(express.json());

let users = [
  { id: 1, nama: "zidane zidan", email: "yami@gmail.com", umur: 25 },
  { id: 2, nama: "marko mambu", email: "Markoliar@gmail.com", umur: 30 },
  { id: 3, nama: "riski", email: "riskisokkeras@gmail.com", umur: 20 }
];

// ===============================
// 1. ROUTE GET – Home
// ===============================
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: "Selamat datang di API Users!",
    status: "Server aktif!"
  });
});

// ===============================
// 2. ROUTE GET – Semua Users
// ===============================
app.get('/api/users', (_req: Request, res: Response) => {
  res.json({
    success: true,
    jumlah: users.length,
    data: users
  });
});

// ===============================
// 3. ROUTE GET – User by ID (Route Params)
// ===============================
app.get('/api/users/:id', (req: Request, res: Response) => {
  const id = parseInt(String(req.params.id));
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User tidak ditemukan"
    });
  }

  res.json({
    success: true,
    data: user
  });
});

// ===============================
// 4. ROUTE GET – Search User (Query String)
// ===============================
app.get('/api/search-users', (req: Request, res: Response) => {
  const { name, max_age } = req.query;

  let result = users;

  if (name) {
    result = result.filter(u =>
      u.nama.toLowerCase().includes((name as string).toLowerCase())
    );
  }

  if (max_age) {
    result = result.filter(u => u.umur <= Number(max_age));
  }

  res.json({
    success: true,
    filtered_result: result
  });
});

// ===============================
// 5. ROUTE POST – Tambah User Baru
// ===============================
app.post('/api/users', (req: Request, res: Response) => {
  const { nama, email, umur } = req.body;

  const newUser = {
    id: users.length + 1,
    nama,
    email,
    umur: Number(umur)
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    message: "User berhasil ditambahkan",
    data: newUser
  });
});

// ===============================
// 6. ROUTE PUT – Update User
// ===============================
app.put('/api/users/:id', (req: Request, res: Response) => {
  const id = parseInt(String(req.params.id));
  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: "User tidak ditemukan" });
  }

  users[index] = { ...users[index], ...req.body };

  res.json({
    success: true,
    message: "User berhasil diupdate",
    data: users[index]
  });
});

// ===============================
// 7. ROUTE DELETE – Hapus User
// ===============================
app.delete('/api/users/:id', (req: Request, res: Response) => {
  const id = parseInt(String(req.params.id));
  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ success: false, message: "User tidak ditemukan" });
  }

  const deleted = users.splice(index, 1);

  res.json({
    success: true,
    message: "User berhasil dihapus",
    data: deleted[0]
  });
});

// ===============================
// Jalankan Server
// ===============================
app.listen(PORT, () => {
  console.log(`Server Users → http://localhost:${PORT}`);
});

# Project Setup Guide

## Backend (BE) Setup

Untuk menjalankan backend, terdapat dua metode yang dapat digunakan:

### 1. Menggunakan Migration dengan Golang
1. Pastikan Go telah terinstal di sistem Anda.
2. Jalankan perintah berikut untuk menjalankan migration:
   ```sh
   go run main.go
   ```
3. Backend akan berjalan sesuai dengan konfigurasi yang telah ditentukan.

### 2. Menggunakan Import SQL Manual
1. Database SQL telah disediakan dalam folder `database`.
2. Import file SQL ke dalam database yang digunakan, misalnya dengan MySQL:
   ```sh
   mysql -u username -p database_name < database/dump.sql
   ```
3. Pastikan koneksi database sesuai dengan konfigurasi yang digunakan dalam aplikasi backend.

---

## Frontend (FE) Setup

Frontend dapat dijalankan langsung menggunakan Live Server di VSCode dengan langkah-langkah berikut:
1. Install ekstensi **Live Server** di VSCode.
2. Buka folder proyek frontend di VSCode.
3. Klik kanan pada `index.html` dan pilih **Open with Live Server**.
4. Frontend akan terbuka di browser dan siap digunakan.

---

## Catatan
- Pastikan semua dependensi backend telah terinstal sebelum menjalankan aplikasi.
- Periksa konfigurasi database sebelum mengimpor SQL secara manual.
- Jika menggunakan migration, pastikan struktur database sudah sesuai dengan yang dibutuhkan oleh aplikasi.

---
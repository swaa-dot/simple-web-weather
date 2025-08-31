# Aplikasi Cuaca dengan OpenWeatherMap API

Aplikasi web yang menampilkan informasi cuaca berdasarkan lokasi pengguna atau kota yang dicari. Dibuat menggunakan HTML, CSS, dan JavaScript dengan memanfaatkan API dari OpenWeatherMap.

## Fitur

- ✅ Pencarian cuaca berdasarkan nama kota
- ✅ Deteksi otomatis lokasi pengguna (geolokasi)
- ✅ Tampilan suhu dalam derajat Celsius
- ✅ Informasi kelembapan dan kecepatan angin
- ✅ Ikon cuaca yang sesuai dengan kondisi
- ✅ Tampilan responsif untuk berbagai perangkat
- ✅ Dukungan pencarian multi-bahasa
- ✅ Pilihan lokasi ketika ada beberapa hasil pencarian

## Cara Menggunakan

1. **Dapatkan API Key**:
   - Daftar akun di [OpenWeatherMap](https://openweathermap.org/api)
   - Dapatkan API key gratis dari dashboard

2. **Setup Aplikasi**:
   - Download atau clone repository ini
   - Buka file `script.js`
   - Ganti `API_KEY_ANDA_DISINI` dengan API key yang Anda dapatkan

3. **Jalankan Aplikasi**:
   - Buka file `index.html` di browser web
   - Aplikasi siap digunakan

## Cara Kerja

### 1. Pencarian Berdasarkan Kota
- Pengguna memasukkan nama kota di kolom pencarian
- Aplikasi mengirim request ke API geolokasi:
```bash
http://api.openweathermap.org/geo/1.0/direct?q={city}&limit=5&appid={API key}
```
- Jika ditemukan beberapa lokasi, pengguna dapat memilih salah satunya
- Koordinat lokasi digunakan untuk mengambil data cuaca

### 2. Deteksi Lokasi Otomatis
- Pengguna menekan tombol lokasi (ikon panah)
- Browser meminta izin akses lokasi
- Jika diizinkan, aplikasi mendapatkan koordinat latitude dan longitude
- Koordinat digunakan untuk mengambil data cuaca

### 3. Mendapatkan Data Cuaca
- Aplikasi mengirim request ke API cuaca:
```bash
https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&appid={API key}
```
- Data cuaca ditampilkan dalam antarmuka pengguna

## Struktur File
aplikasi-cuaca/
├── index.html # Struktur HTML aplikasi
├── style.css # Gaya dan layout aplikasi
└── script.js # Logika JavaScript dan API calls

## API yang Digunakan

1. **Geocoding API** - Mendapatkan koordinat dari nama kota
```bash
http://api.openweathermap.org/geo/1.0/direct?q={city}&limit=5&appid={API key}
```
2. **Current Weather Data API** - Mendapatkan data cuaca terkini
```
https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&units=metric&appid={API key}
```

## Customization

### Mengubah Tampilan
- Edit file `style.css` untuk mengubah warna, font, atau layout
- Warna utama aplikasi dapat diubah dengan memodifikasi nilai di `linear-gradient`


### Bahasa
- Aplikasi secara default menggunakan bahasa Indonesia
- Untuk mengubah bahasa, modifikasi teks dalam file `index.html` dan `script.js`

## Browser Support

Aplikasi ini mendukung semua browser modern yang memiliki fitur:
- Geolocation API
- Fetch API
- CSS Flexbox
- ES6 JavaScript

## Troubleshooting

### API Key Tidak Bekerja
- Pastikan API key sudah diaktivasi (mungkin butuh waktu beberapa jam)
- Periksa konsol browser untuk pesan error terkait API

### Geolokasi Tidak Berfungsi
- Pastikan browser mengizinkan akses lokasi
- Beberapa browser mungkin memerlukan koneksi HTTPS untuk geolokasi

### Kota Tidak Ditemukan
- Coba gunakan nama kota dalam bahasa Inggris
- Gunakan format "Kota, Negara" (contoh: "Surabaya, ID")

## Kontribusi

Silakan fork repository ini dan ajukan pull request untuk perbaikan atau fitur tambahan.

## Lisensi

Proyek ini menggunakan lisensi MIT. Lihat file LICENSE untuk detail lengkap.

## Sumber Daya

- [OpenWeatherMap API Documentation](https://openweathermap.org/api)
- [Font Awesome Icons](https://fontawesome.com/)
- [Google Fonts](https://fonts.google.com/)

---

Dibuat dengan ❤️ menggunakan HTML, CSS, dan JavaScript.
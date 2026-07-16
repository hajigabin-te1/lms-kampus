// =========================================================================
// 1. GLOBAL API RESPONSE WRAPPER
// =========================================================================
// Ini adalah pembungkus utama. Karena temanmu berjanji format balikan API-nya
// selalu konsisten (ada status, message, data), kita gunakan Generic <T>
// agar isi 'data' bisa berubah-ubah secara dinamis sesuai request.
export interface ApiResponse<T> {
  status: "success" | "error";
  message: string;
  data?: T; // Tanda "?" artinya opsional (kalau error, data biasanya kosong)
  errors?: Record<string, string[]>; // Menangkap error validasi form dari Laravel (misal: email salah format)
}

// =========================================================================
// 2. DATA UTAMA / RESOURCES (Sesuai database Laravel)
// =========================================================================

// Definisi data profil Mahasiswa
export interface User {
  id: number;
  name: string;
  email: string;
  prodi: string; // Contoh: "Administrasi Bisnis"
  nim: string;
}

// Definisi data Jadwal / Mata Kuliah
export interface Course {
  course_id: number;
  title: string;
  time_start: string; // Contoh: "08:00"
  time_end: string; // Contoh: "10:30"
  room: string; // Contoh: "Lab Komputer"
}

// =========================================================================
// 3. SPECIAL DATA STRUCTURES
// =========================================================================

// Struktur data khusus yang didapat HANYA saat sukses Login
// (Dapat token sekaligus info user-nya)
export interface LoginData {
  token: string;
  user: User; // Kita panggil kembali interface User di atas
}

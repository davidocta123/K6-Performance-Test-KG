import http from 'k6/http';
import { check, sleep } from 'k6';
import { Counter } from 'k6/metrics';

// Konfigurasi untuk menentukan jumlah virtual users (VUs) dan durasi tes
export const options = {
  vus: 2,  // jumlah virtual users yang berjalan secara bersamaan
  duration: '1m',  // durasi tes yang akan berjalan selama 1 menit
};

// Membuat custom metric counter
const errorCount = new Counter('http_errors');

export default function () {
  // Melakukan request HTTP GET ke URL target
  let res = http.get('https://kampusgratis.id/proses/penyaluran-kerja-dan-magang?_rsc=1cmfx');

  // Mengecek apakah status respons adalah 200 (OK)
  let checkRes = check(res, {
    'is status 200': (r) => r.status === 200,
    'response time is less than 200ms': (r) => r.timings.duration < 200,
  });

  // Jika pengecekan gagal, tambahkan ke counter error
  if (!checkRes) {
    errorCount.add(1);
  }

  // Menunggu 1 detik sebelum virtual user berikutnya dieksekusi
  sleep(1); 
}

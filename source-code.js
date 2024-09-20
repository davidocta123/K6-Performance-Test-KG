// Jalankan skrip ini menggunakan perintah berikut:
// k6 run source-code.js --summary-export report.json > output-ver.txt

// Mengimpor modul HTTP dari k6 untuk melakukan permintaan HTTP
import http from 'k6/http';

// Mengimpor fungsi htmlReport dari repository k6-reporter untuk menghasilkan laporan dalam format HTML
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js"; 

// Mendefinisikan URL endpoint API yang akan diuji
const url = 'https://api.kampusgratis.id/api/v1/guides/frequently-asked-questions'; // Gantilah dengan URL API atau situs web yang ingin diuji

// Menentukan skenario uji, termasuk jumlah pengguna dan durasi setiap tahap
export let options = {
  stages: [
    { target: 10, duration: '10s' }, // Mencapai 10 pengguna selama 10 detik
    { target: 20, duration: '10s' }, // Mencapai 20 pengguna selama 10 detik
    {
      target: 30, duration: '10s' }, // Mencapai 30 pengguna selama 10 detik
    { target: 20, duration: '10s' }, // Mengurangi ke 20 pengguna selama 10 detik
    { target: 10, duration: '10s' }, // Mengurangi ke 10 pengguna selama 10 detik
    { target: 0, duration: '10s' },  // Menurunkan ke 0 pengguna selama 10 detik
  ],
};

// Mendefinisikan fungsi uji yang akan dipanggil selama pengujian
function defaultFunction() {
  // Melakukan permintaan HTTP GET ke URL yang ditentukan
  http.get(url);
}

// Menetapkan fungsi uji default untuk dieksekusi selama pengujian
export default defaultFunction;



// Menyediakan fungsi untuk menangani ringkasan hasil pengujian dan menghasilkan laporan HTML
 export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data), // Menyimpan laporan HTML sebagai 'summary.html'
  };
}



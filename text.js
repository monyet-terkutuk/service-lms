const urlString = "https://youtu.be/Ll_71n60vAM?si=yRRn3T-N5UCwpelA";

// Membuat objek URL dari URL string
const url = new URL(urlString);

// Mengambil komponen yang diinginkan
const pathName = url.pathname;

// Mendapatkan kata terakhir dari pathName
const components = pathName.split("/"); // Membagi berdasarkan tanda '/' dalam pathName
const kalimatIni = components[components.length - 1]; // Mengambil komponen terakhir

console.log(kalimatIni);

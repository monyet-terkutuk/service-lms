module.exports = (link) => {
  const urlString = link;

  // Membuat objek URL dari URL string
  const url = new URL(urlString);

  // Mengambil komponen yang diinginkan
  const pathName = url.pathname;

  // Mendapatkan kata terakhir dari pathName
  const components = pathName.split("/"); // Membagi berdasarkan tanda '/' dalam pathName
  const splitLink = components[components.length - 1]; // Mengambil komponen terakhir

  return splitLink;
};

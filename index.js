const express = require("express");
const app = express();

// Rute dasar (opsional)
app.get("/", (req, res) => {
  res.send("Timestamp Microservice");
});

// Rute utama sesuai dengan proyek FreeCodeCamp
app.get("/api/:date?", (req, res) => {
  const dateParam = req.params.date;
  let date;

  if (!dateParam) {
    // Jika tidak ada parameter, gunakan waktu sekarang
    date = new Date();
  } else if (!isNaN(dateParam)) {
    // Jika input berupa UNIX timestamp (dalam milidetik)
    date = new Date(parseInt(dateParam));
  } else {
    // Jika input berupa string tanggal biasa
    date = new Date(dateParam);
  }

  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Jalankan server di port 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

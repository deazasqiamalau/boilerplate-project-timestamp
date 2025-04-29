const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/:date?", (req, res) => {
  let dateInput = req.params.date;

  // Jika tidak ada parameter
  if (!dateInput) {
    const now = new Date();
    return res.json({ unix: now.getTime(), utc: now.toUTCString() });
  }

  // Coba parse sebagai integer jika isinya angka
  if (!isNaN(dateInput)) {
    dateInput = parseInt(dateInput);
  }

  const dateObj = new Date(dateInput);

  if (dateObj.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  return res.json({ unix: dateObj.getTime(), utc: dateObj.toUTCString() });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Listening on port " + port);
});

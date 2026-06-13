const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const QRCode = require("qrcode");

const app = express();
const PORT = 3000;

// Update this to match your computer's current Wi-Fi IPv4 address
// (find it with `ipconfig` on Windows, or `ifconfig` / `ip a` on Mac/Linux)
const computerIp = "192.168.18.5";

// Make sure the uploads folder exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// Configure multer to keep original file extensions
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // e.g. ".jpg"
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

// Serve static files (like index.html) from the project folder
app.use(express.static(__dirname));

// Home page - serves the upload form
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Handle file upload
app.post("/upload", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("Please select a file.");
  }

  const fileId = req.file.filename;
  const downloadLink = `http://${computerIp}:${PORT}/file/${fileId}`;

  try {
    const qrCodeDataUrl = await QRCode.toDataURL(downloadLink);

    res.send(`
  <html>
  <head>
    <link rel="stylesheet" href="/style2.css">
  </head>
  <body>
    <div class="container">
      <h2>File uploaded successfully!</h2>
      <p>Open this link on the other Device :</p>
      <a href="${downloadLink}">${downloadLink}</a>
      <br><br>
      <p>Or scan this QR code:</p>
      <img src="${qrCodeDataUrl}" alt="QR code for download link" />
      <br><br>
      <a href="/" class="button">Upload another file</a>
      </div>
  </body>
  </html>
`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating QR code.");
  }
});

// Handle file download
app.get("/file/:id", (req, res) => {
  const filePath = path.join(__dirname, "uploads", req.params.id);

  res.download(filePath, (error) => {
    if (error && !res.headersSent) {
      res.status(404).send("File not found.");
    }
  });
});

// Start the server, accessible from other devices on the network
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Device B can connect at http://${computerIp}:${PORT}`);
});
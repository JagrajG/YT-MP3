const express = require("express");
const YTDlpWrap = require("yt-dlp-wrap").default;
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.static("public")); // Serve static files from the public directory

// Middleware to log each request to the server
app.use((req, res, next) => {
  console.log(`Received request on ${req.method} ${req.url}`);
  next();
});

app.get("/convert", async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) {
    console.log("No video URL provided");
    return res
      .status(400)
      .json({ success: false, message: "No video URL provided" });
  }

  const ytDlpWrap = new YTDlpWrap();
  const outputFilename = `output-${Date.now()}.mp3`;
  const outputPath = path.join(__dirname, "downloads", outputFilename);

  try {
    await ytDlpWrap.exec([
      videoUrl,
      "-x", // Extract audio
      "--audio-format",
      "mp3",
      "-o",
      outputPath, // Specify the output path
    ]);
    console.log("Conversion successful");
    res.json({ success: true, downloadUrl: `/downloads/${outputFilename}` });
  } catch (error) {
    console.error("Conversion Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to convert video" });
  }
});

// Serve the downloads directory as static files
app.use("/downloads", express.static(path.join(__dirname, "downloads")));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

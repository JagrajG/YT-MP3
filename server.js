const express = require("express");
const YTDlpWrap = require("yt-dlp-wrap").default;
const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.get("/convert", async (req, res) => {
  const videoUrl = req.query.url;
  const ytDlpWrap = new YTDlpWrap();

  try {
    const output = `output-${Date.now()}.mp3`;
    await ytDlpWrap.exec([
      videoUrl,
      "-x",
      "--audio-format",
      "mp3",
      "-o",
      output,
    ]);
    res.json({ success: true, downloadUrl: `/${output}` });
  } catch (error) {
    console.error("Conversion Error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to convert video" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

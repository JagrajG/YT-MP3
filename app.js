document.addEventListener("DOMContentLoaded", function () {
  const convertButton = document.querySelector(".btn");
  const inputElement = document.getElementById("input");

  convertButton.addEventListener("click", function () {
    const url = inputElement.value;
    if (!url.trim()) {
      alert("Please enter a YouTube URL.");
      return;
    }

    fetch(`/convert?url=${encodeURIComponent(url)}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Conversion successful! Download link: " + data.downloadUrl);
        } else {
          alert("Failed to convert video: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error: " + error.message);
      });
  });
});

// menampilkan preview gambar
document.getElementById("uploadImage").addEventListener("change", function () {
  const file = document.getElementById("uploadImage").files[0];
  const preview = document.getElementById("imagePreview");

  if (file) {
    const previewURL = URL.createObjectURL(file);

    preview.src = previewURL;
    preview.style.display = "block";

    preview.onload = function () {
      URL.revokeObjectURL(previewURL);
    };
  } else {
    preview.style.display = "none";
  }
});

const qualitySlider = document.getElementById('quality');
const qualityValue = document.getElementById('qualityValue');

qualitySlider.addEventListener('input', () => {
  qualityValue.textContent = qualitySlider.value;
});

function compressImage() {
  const fileInput = document.getElementById('upload');
  const canvas = document.getElementById('canvas');
  const result = document.getElementById('result');

  if (!fileInput.files[0]) {
    alert("Please select an image file!");
    return;
  }

  const reader = new FileReader();
  reader.readAsDataURL(fileInput.files[0]);

  reader.onload = function (e) {
    const img = new Image();
    img.src = e.target.result;

    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const compressedData = canvas.toDataURL('image/jpeg', qualitySlider.value / 100);

      result.innerHTML = `
        <h3>Compressed Image:</h3>
        <img src="${compressedData}" alt="Compressed Image" />
        <a href="${compressedData}" download="compressed.jpg">
          <button>Download Compressed Image</button>
        </a>
      `;
    };
  };
}


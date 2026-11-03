/**
 * Încarcă o imagine și elimină fundalul negru solid.
 */
export function loadTransparentSpriteSheet(imageSrc) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Eliminăm fundalul negru (inclusiv mici artefacte de compresie în nuanțe foarte închise)
        const isBlackBackground = r < 15 && g < 15 && b < 15;

        // Păstrăm accentele luminoase (cum ar fi roșul aprins de pe armură)
        const isVibrantColor = (r > g + 20) || (r > 80 && g < 40 && b < 40);

        if (isBlackBackground && !isVibrantColor) {
          data[i + 3] = 0; // Alpha = 0 (complet invizibil)
        }
      }

      ctx.putImageData(imgData, 0, 0);
      resolve(canvas);
    };

    img.onerror = (err) => reject(err);
  });
}
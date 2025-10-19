
export const validateImage = (file) => {
  const acceptedTypes = ['image/jpeg', 'image/png','image/jpg','image/webp'];
  return file && acceptedTypes.includes(file.type);
};

export const processImage = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 400;
        const MAX_HEIGHT = 400;
        canvas.width = MAX_WIDTH;
        canvas.height = MAX_HEIGHT;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, MAX_WIDTH, MAX_HEIGHT);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Erro ao converter a imagem para Blob.'));
            }
          },
          'image/webp',
          0.9
        );
      };

      img.onerror = (error) => {
        reject(error);
      };
    };

    reader.onerror = (error) => {
      reject(error);
    };
  });
};
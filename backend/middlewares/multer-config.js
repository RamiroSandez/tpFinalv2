const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log("Archivo recibido:", file);
    if (!file.mimetype.startsWith("image/")) {
      console.error("Error: Archivo no es una imagen.");
      return cb(new Error("Solo se permiten imágenes"));
    }
    cb(null, true);
  },
});

module.exports = upload;

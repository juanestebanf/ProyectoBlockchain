const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

    destination(req, file, cb) {

        cb(null, "uploads/");

    },

    filename(req, file, cb) {

        const nombre =
            Date.now() +
            path.extname(file.originalname);

        cb(null, nombre);

    }

});

const fileFilter = (req, file, cb) => {

    const permitidos = [

        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp"

    ];

    if (permitidos.includes(file.mimetype)) {

        cb(null, true);

    } else {

        cb(
            new Error("Solo se permiten imágenes.")
        );

    }

};

module.exports = multer({

    storage,

    fileFilter

});
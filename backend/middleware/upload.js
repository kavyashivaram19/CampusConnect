// =======================================================
// SECTION 1 : IMPORTS
// =======================================================

const multer = require("multer");

// =======================================================
// SECTION 2 : STORAGE CONFIGURATION
// =======================================================

const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        cb(null, "uploads/");

    },

    filename: function (req, file, cb) {

        const uniqueName =
            Date.now() + "-" + file.originalname;

        cb(null, uniqueName);

    }

});

// =======================================================
// SECTION 3 : MULTER
// =======================================================

const upload = multer({

    storage

});

// =======================================================
// SECTION 4 : EXPORT
// =======================================================

module.exports = upload;
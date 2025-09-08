import multer from "fastify-multer";
import path from "path";
import crypto from "crypto";

const storage = multer.diskStorage({
  destination: path.resolve(__dirname, "..", "..", "uploads"),
  filename: (req, file, callback) => {
    const fileHash = crypto.randomBytes(8).toString("hex");
    const fileName = `${fileHash}-${file.originalname}`;
    callback(null, fileName);
  },
});

export const upload = multer({ storage });

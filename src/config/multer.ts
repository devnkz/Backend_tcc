import multer from "fastify-multer";
import crypto from "crypto";
import fs from "fs";

const uploadPath = "/tmp/uploads";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadPath);
  },
  filename: (req, file, callback) => {
    const fileHash = crypto.randomBytes(8).toString("hex");
    const fileName = `${fileHash}-${file.originalname}`;
    callback(null, fileName);
  },
});

export const upload = multer({ storage });

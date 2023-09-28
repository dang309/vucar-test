import multer from "multer";

import path from "path";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, global.INFO.TEMP_PATH);
  },
  filename(req, file, cb) {
    const ext = path.extname(file?.originalname);
    const { systemId, assetId } = req.body;
    const fileName = `${systemId}_${assetId}${ext}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

export default upload;

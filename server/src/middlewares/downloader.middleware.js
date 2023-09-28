import path from "path";
import Utility from "../utils/utils.js";

const downloader = async (req, _, next) => {
  const { systemId, assetId, url } = req.body;
  const tempPath = global.INFO.TEMP_PATH;

  const originalname = url.split("/").pop().split("?")[0];
  const ext = path.extname(url);
  const fileName = `${systemId}_${assetId}${ext}`;

  const { path: filePath, size } = await Utility.download(url, tempPath, {
    fileName,
  });

  req.file = {
    originalname,
    path: filePath,
    size,
    filename: fileName,
  };
  req.body = {
    ...req.body,
    systemId,
    assetId,
  };
  return next();
};

export default downloader;

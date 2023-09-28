import path from "path";
import sharp from "../config/sharp.js";
import {
  MAX_SCALE_DIMENSION,
  MAX_SCALE_THUMBNAIL_DIMENSION,
} from "../constants/asset.js";
import Utility from "../utils/utils.js";

const transcode = async (req, res, next) => {
  const file = req.file;
  const { systemId, assetId } = req.body;

  const fileName = path.parse(file.filename).name;

  const originalMetadata = await sharp(file.path).metadata();
  const { width, height } = originalMetadata;

  let shouldScale = false; // if width or height greater than 1820, then scale it down to 1820;
  let scaleBy = ""; // if width > height, then scale by width. Otherwise, scale by height;

  const assetPath = Utility.generateHierarchyPathByTimestamp("assets");

  if (width > height) {
    scaleBy = "width";
  } else {
    scaleBy = "height";
  }

  if (width > MAX_SCALE_DIMENSION || height > MAX_SCALE_DIMENSION) {
    shouldScale = true;
  }

  if (shouldScale) {
    await sharp(file.path)
      .resize({ [scaleBy]: MAX_SCALE_DIMENSION })
      .jpeg({ quality: 100 })
      .toFile(`${global.INFO.STORAGE_PATH}/${assetPath}/${fileName}.jpg`);
  } else {
    await sharp(file.path)
      .jpeg({ quality: 100 })
      .toFile(`${global.INFO.STORAGE_PATH}/${assetPath}/${fileName}.jpg`);
  }

  // generate thumbnail
  await sharp(file.path)
    .resize({
      [scaleBy]: MAX_SCALE_THUMBNAIL_DIMENSION,
    })
    .jpeg({ quality: 100 })
    .toFile(`${global.INFO.STORAGE_PATH}/${assetPath}/${fileName}_thumb.jpg`);

  const scaledMetadata = await sharp(
    `${global.INFO.STORAGE_PATH}/${assetPath}/${fileName}.jpg`
  ).metadata();
  req.body = {
    ...req.body,
    systemId,
    assetId,
    width: scaledMetadata.width,
    height: scaledMetadata.height,
    size: file.size,
    originalName: file.originalname,
    path: `${assetPath}/${fileName}.jpg`,
    thumbPath: `${assetPath}/${fileName}_thumb.jpg`,
  };

  return next();
};

export default transcode;

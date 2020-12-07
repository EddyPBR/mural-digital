import fs from "fs";
import path from "path";

import "dotenv/config";

// const PORT = process.env.PORT;
const HOST = process.env.HOST;

const verifyImage = (file_url: string) => {
  const directory = path.resolve(__dirname, "..", "..", "public", "assets");

  if (!directory) return false;

  try {
    const files = fs.readdirSync(directory);

    const imagesList = files.map(
      (file) => `${HOST}/public/assets/${file}`
    );

    if (!imagesList) return false;

    return imagesList.includes(file_url) ? true : false;
  } catch (error) {
    return false;
  }
};

export default verifyImage;

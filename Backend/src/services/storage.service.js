import imagekit, { ImageKit } from "@imagekit/nodejs";
import { config } from "../config/config.js"

const client = new imagekit({ privateKey: config.IMAGEKIT_PRIVATE_KEY });

export const uploadFile = async ({ buffer, fileName, folder = "snitch" }) => {
    const result = await client.files.upload({
        file: await ImageKit.toFile(buffer),
        fileName,
        folder
    });
    return result;
}

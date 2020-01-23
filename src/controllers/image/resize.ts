import Jimp from 'jimp';
import { RequestHandler } from 'express';
import { Readable } from 'stream';

function bufferToStream(binary: Buffer) {
  const readableInstanceStream = new Readable({
    read() {
      this.push(binary);
      this.push(null);
    },
  });

  return readableInstanceStream;
}
const imageResizer: RequestHandler = (req, res) => {
  const { url } = req.body;

  try {
    if (url.length == 0) throw new Error('URL cannot be empty');
    Jimp.read(url, async (err, image) => {
      if (err) throw err;

      const modifiedImage = image.resize(50, 50);

      const mimeType = modifiedImage.getMIME();

      const buffer = await modifiedImage.getBufferAsync(mimeType);

      return res.send(Buffer.from(buffer).toString('base64'));
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default imageResizer;

const { Asset } = require('../../models');
const isBase64 = require('is-base64');
const base64Img = require('base64-img');

module.exports = async (req, res) => {
   const image = req.body.image;
   if (!isBase64(image, { mimeRequired: true })) {
      return res.status(400).json({
         status: 'error',
         message: 'Invalid image type base64'
      });
   }
   base64Img.img(image, './public/images', Date.now(), async (err, filepath) => {
      if (err) {
         return res.status(400).json({
            status: 'error',
            message: err.message
         });
      }
      const filename = filepath.split('/').pop();
      const asset = await Asset.create({ image: `images/${filename}` });
      return res.json({
         status: 'success',
         data: {
            id: asset.id,
            image: `${req.protocol}://${req.hostname}/images/${filename}`
         }
      })
   });
}
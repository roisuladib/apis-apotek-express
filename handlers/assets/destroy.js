const { Asset } = require('../../models');
const fs = require('fs');

module.exports = async (req, res) => {
   try {
      const id = req.params.id;
      const asset = await Asset.findByPk(id);
      if (!asset) {
         return res.status(404).json({
            status: 'error',
            message: 'Asset not found'
         });
      }
      fs.unlink(`./public/${asset.image}`, async err => {
         if (err) {
            return res.status(400).json({
               status: 'error',
               message: err.message
            });
         }
         await asset.destroy();
         return res.json({
            status: 'success',
            message: 'Asset deleted'
         });
      });
   } catch (error) {
      return error;
   }
}